import type { ReportPinOwner } from "./pin.service";
import { getSubmissionStatus } from "./reportReviewWorkflow";
import { prisma } from "@/lib/prisma"
import type { Prisma } from "@/generated/prisma/client"
import type { Role } from "@/generated/prisma/enums"
import { NotFoundError, ValidationError } from "@/shared/errors"
import type { VehicularDispatchReportInput } from "@/schemas/vehicularDispatchReport.schema"
import { prepareReportReview, type ReportReviewAction } from "@/services/reportReviewWorkflow"
import { saveVehicleOdometerFromDispatch } from "./vehicleOdometer.service"

const dispatchRecordInclude = {
  vehicle: { select: { vehicle_name: true, plate_number: true } },
  responders: { include: { user: { select: { name: true } } } },
  passengers: true,
} as const

type DispatchRecord = Prisma.VehicularDispatchGetPayload<{ include: typeof dispatchRecordInclude }>

function toDispatchRecord(dispatch: DispatchRecord) {
  return {
    dispatch_id: dispatch.dispatch_id,
    operation_id: dispatch.operation_id,
    patient_id: dispatch.patient_log_id,
    dispatch_date: dispatch.dispatch_date,
    createdAt: dispatch.createdAt,
    submitter_name: dispatch.submitter_name,
    depart_time: dispatch.depart_time,
    arrival_time: dispatch.arrival_time,
    vehicle_name: dispatch.vehicle?.vehicle_name ?? dispatch.vehicle_name ?? "Unknown vehicle",
    plate_number: dispatch.vehicle?.plate_number ?? "",
    driver_name: dispatch.driver_name ?? "",
    responders: [
      ...dispatch.responders.map((responder) => responder.user.name),
      ...dispatch.other_responders,
    ],
    from_location: dispatch.from_location ?? "",
    to_location: dispatch.to_location ?? "",
    transfers: dispatch.transfers.map((transfer) => transfer === "DROP_OFF" ? "Drop-Off" : "Pick-Up"),
    odometer_in: dispatch.odometer_in,
    odometer_out: dispatch.odometer_out,
    passengers: dispatch.passengers,
    status: dispatch.status,
    rejected_reason: dispatch.rejected_reason,
  }
}

async function findDispatchRecordById(id: string) {
  const dispatch = await prisma.vehicularDispatch.findFirst({
    // where: { dispatch_id: id, operation_id: null, patient_log_id: null, archive: null },
    where: { dispatch_id: id, archive: null },
    include: dispatchRecordInclude,
  })
  if (!dispatch) throw new NotFoundError("Vehicle dispatch", id)
  return toDispatchRecord(dispatch)
}

function getDateTime(date: string, time: string, period: "AM" | "PM") {
  const [hourText, minuteText] = time.split(":")
  let hour = Number(hourText)
  const minute = Number(minuteText)

  if (period === "AM" && hour === 12) hour = 0
  if (period === "PM" && hour !== 12) hour += 12

  return new Date(`${date}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`)
}

function getFormDateTime(date: string, time: string) {
  return new Date(`${date}T${time}:00`)
}

function toDateInputValue(date: Date | null | undefined): string {
  if (!date) return ""
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
}

function getTimeInputValue(date: Date | null | undefined) {
  if (!date) return { time: "", period: "AM" as const }
  const hour = date.getHours()
  return {
    time: `${String(hour % 12 || 12).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`,
    period: hour >= 12 ? "PM" as const : "AM" as const,
  }
}

function formatPassengerName(person: VehicularDispatchReportInput["passengers"][number]) {
  return [person.name.firstName, person.name.middleInitial, person.name.surname, person.name.suffix]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(" ")
}

function formatPassengerAddress(person: VehicularDispatchReportInput["passengers"][number]) {
  const { phase, package: packageNumber, block, lot } = person.address
  return [
    phase && `Phase ${phase}`,
    packageNumber && `Package ${packageNumber}`,
    block && `Block ${block}`,
    lot && `Lot ${lot}`,
  ].filter(Boolean).join(", ")
}

export const vehicularDispatchReportService = {
  async list() {
    const dispatches = await prisma.vehicularDispatch.findMany({
      where: { operation_id: null, patient_log_id: null, archive: null },
      // where: { archive: null },
      orderBy: [{ dispatch_date: "desc" }, { createdAt: "desc" }],
      include: dispatchRecordInclude,
    })

    return dispatches.map(toDispatchRecord)
  },

  async getById(id: string) {
    return findDispatchRecordById(id)
  },

  async review(id: string, actor: { userId: string; role: Role }, pin: string, action: ReportReviewAction, rejectedReason?: string) {
    const dispatch = await prisma.vehicularDispatch.findFirst({
      // where: { dispatch_id: id, operation_id: null, patient_log_id: null, archive: null },
      where: { dispatch_id: id, archive: null },
    })
    if (!dispatch) throw new NotFoundError("Vehicle dispatch", id)
    if (action === "reject" && !rejectedReason?.trim()) {
      throw new ValidationError("A rejection reason is required.")
    }
    const nextStatus = await prepareReportReview({ actor, pin, action, currentStatus: dispatch.status })
    await prisma.vehicularDispatch.update({
      where: { dispatch_id: id },
      data: { status: nextStatus, rejected_reason: action === "reject" ? rejectedReason!.trim() : null },
    })
    return findDispatchRecordById(id)
  },

  async getOptions() {
    const [vehicles, responders] = await Promise.all([
      prisma.vehicle.findMany({
        where: { status: "AVAILABLE" },
        orderBy: [{ vehicle_name: "asc" }, { plate_number: "asc" }],
        select: { vehicle_id: true, vehicle_name: true, plate_number: true, current_odometer: true },
      }),
      prisma.user.findMany({
        where: { isActive: true },
        orderBy: { name: "asc" },
        select: { user_id: true, name: true },
      }),
    ])
    return { vehicles, responders }
  },

  async getLatest() {
    const dispatch = await prisma.vehicularDispatch.findFirst({
      where: { operation_id: null, patient_log_id: null, archive: null },
      orderBy: { createdAt: "desc" },
      include: {
        vehicle: { select: { vehicle_id: true, vehicle_name: true } },
        passengers: true,
        responders: true,
      },
    })
    if (!dispatch) return null

    const departure = getTimeInputValue(dispatch.depart_time)
    const arrival = getTimeInputValue(dispatch.arrival_time)
    return {
      details: {
        submitterName: dispatch.submitter_name ?? "",
        date: toDateInputValue(dispatch.dispatch_date),
        time: `${String(dispatch.dispatch_date.getHours()).padStart(2, "0")}:${String(dispatch.dispatch_date.getMinutes()).padStart(2, "0")}`,
        responders: dispatch.responders.map((responder) => responder.user_id),
        otherResponders: dispatch.other_responders,
        transfers: dispatch.transfers.map((transfer) => transfer === "DROP_OFF" ? "Drop-Off" : "Pick-Up"),
      },
      dispatch: {
        from: dispatch.from_location ?? "",
        to: dispatch.to_location ?? "",
        vehicle: dispatch.vehicle?.vehicle_id ?? "other",
        vehicleOther: dispatch.vehicle ? "" : dispatch.vehicle_name ?? "",
        driver: dispatch.driver_name ?? "",
        departTime: departure.time,
        departPeriod: departure.period,
        arrivalTime: arrival.time,
        arrivalPeriod: arrival.period,
        odometerIn: dispatch.odometer_in == null ? "" : String(dispatch.odometer_in),
        odometerOut: dispatch.odometer_out == null ? "" : String(dispatch.odometer_out),
      },
      passengers: dispatch.passengers.map((passenger) => ({
        id: passenger.passenger_id,
        name: {
          firstName: passenger.first_name ?? passenger.full_name,
          middleInitial: passenger.middle_initial ?? "",
          surname: passenger.surname ?? "",
          suffix: passenger.suffix ?? "",
        },
        birthdate: toDateInputValue(passenger.birthdate),
        age: passenger.age,
        gender: passenger.sex === "MALE" ? "Male" : "Female",
        contactNumber: passenger.contact_no ?? "",
        address: {
          phase: passenger.address_phase ?? "",
          package: passenger.address_package ?? "",
          block: passenger.address_block ?? "",
          lot: passenger.address_lot ?? "",
        },
      })),
    }
  },

  async create(form: VehicularDispatchReportInput, owner: ReportPinOwner) {
    const submittedBy = owner.ownerId;
    const status = getSubmissionStatus(owner.ownerRole);
    const [vehicle, responders] = await Promise.all([
      form.dispatch.vehicle === "other" || form.dispatch.vehicle === "none"
        ? Promise.resolve(null)
        : prisma.vehicle.findFirst({
          where: { vehicle_id: form.dispatch.vehicle, status: "AVAILABLE" },
          select: { vehicle_id: true },
        }),
      prisma.user.findMany({
        where: { user_id: { in: form.details.responders }, isActive: true },
        select: { user_id: true },
      }),
    ])
    if (form.dispatch.vehicle !== "other" && form.dispatch.vehicle !== "none" && !vehicle) {
      throw new NotFoundError("Available vehicle", form.dispatch.vehicle)
    }
    if (responders.length !== form.details.responders.length) {
      throw new ValidationError("One or more selected responders are unavailable.", {
        responders: ["Refresh the form and select active responders."],
      })
    }

    const departure = getDateTime(form.details.date, form.dispatch.departTime, form.dispatch.departPeriod)
    const arrival = getDateTime(form.details.date, form.dispatch.arrivalTime, form.dispatch.arrivalPeriod)
    if (arrival < departure) arrival.setDate(arrival.getDate() + 1)

    return prisma.$transaction(async (transaction) => {
      if (vehicle && typeof form.dispatch.odometerIn === "number" && typeof form.dispatch.odometerOut === "number") {
        await saveVehicleOdometerFromDispatch(
          transaction,
          vehicle.vehicle_id,
          form.dispatch.odometerIn,
          form.dispatch.odometerOut,
        )
      }

      return transaction.vehicularDispatch.create({
      data: {
        dispatch_date: getFormDateTime(form.details.date, form.details.time),
        submitter_name: owner.ownerName,
        transfers: form.details.transfers.map((transfer) => transfer === "Drop-Off" ? "DROP_OFF" : "PICK_UP"),
        dispatch_type: form.details.transfers[0] === "Drop-Off" ? "DROP_OFF" : form.details.transfers[0] === "Pick-Up" ? "PICK_UP" : null,
        status,
        submitted_by: submittedBy,
        vehicle_id: vehicle?.vehicle_id ?? null,
        vehicle_name: form.dispatch.vehicle === "other" ? form.dispatch.vehicleOther?.trim() ?? null : null,
        driver_name: form.dispatch.vehicle === "none" ? null : form.dispatch.driver || null,
        from_location: form.dispatch.from,
        to_location: form.dispatch.to,
        depart_time: departure,
        arrival_time: arrival,
        odometer_in: typeof form.dispatch.odometerIn === "number" ? form.dispatch.odometerIn : null,
        odometer_out: typeof form.dispatch.odometerOut === "number" ? form.dispatch.odometerOut : null,
        responders: {
          create: form.details.responders.map((userId) => ({ user_id: userId })),
        },
        other_responders: form.details.otherResponders,
        passengers: {
          create: form.passengers.map((passenger) => ({
            full_name: formatPassengerName(passenger),
            first_name: passenger.name.firstName,
            middle_initial: passenger.name.middleInitial || null,
            surname: passenger.name.surname,
            suffix: passenger.name.suffix || null,
            age: passenger.age,
            birthdate: new Date(`${passenger.birthdate}T00:00:00`),
            sex: passenger.gender.toUpperCase() as "MALE" | "FEMALE",
            contact_no: passenger.contactNumber || null,
            address: formatPassengerAddress(passenger) || null,
            address_phase: passenger.address.phase || null,
            address_package: passenger.address.package || null,
            address_block: passenger.address.block || null,
            address_lot: passenger.address.lot || null,
          })),
        },
      },
      include: {
        vehicle: { select: { vehicle_id: true, vehicle_name: true, plate_number: true } },
        passengers: true,
      },
      })
    })
  },
}
