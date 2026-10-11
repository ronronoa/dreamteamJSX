import { prisma } from "@/lib/prisma";
import { ConflictError, NotFoundError, ValidationError } from "@/shared/errors";
import { Prisma } from "@/generated/prisma/client";
import type { OperationReportInput } from "@/schemas/operationReport.schema";
import type { PatientReportInput } from "@/schemas/patientReport.schema";

type UploadedFile = Express.Multer.File;

const REPORT_IMAGE_DIRECTORY = "/uploads/report-forms/";

function imageUrl(file: UploadedFile) {
  return `${REPORT_IMAGE_DIRECTORY}${file.filename}`;
}

function formatPersonName(name: {
  firstName: string;
  middleInitial: string;
  surname: string;
  suffix: string;
}) {
  return [name.firstName, name.middleInitial, name.surname, name.suffix]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(" ");
}

function getDateTime(date: string, time: string, period: "AM" | "PM") {
  const [hourText, minuteText] = time.split(":");
  let hour = Number(hourText);
  const minute = Number(minuteText);

  if (period === "AM" && hour === 12) hour = 0;
  if (period === "PM" && hour !== 12) hour += 12;

  return new Date(`${date}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`);
}

function formatAddress(address: OperationReportInput["people"][number]["address"]) {
  return [
    address.phase && `Phase ${address.phase}`,
    address.package && `Package ${address.package}`,
    address.block && `Block ${address.block}`,
    address.lot && `Lot ${address.lot}`,
  ].filter(Boolean).join(", ");
}

function getDateInputValue(date: Date | null | undefined) {
  if (!date) return "";
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function getTimeInputValue(date: Date | null | undefined) {
  if (!date) return { time: "", period: "AM" as const };
  const hour = date.getHours();
  return {
    time: `${hour % 12 || 12}:${String(date.getMinutes()).padStart(2, "0")}`,
    period: hour >= 12 ? "PM" as const : "AM" as const,
  };
}

function splitPersonName(fullName: string | null | undefined) {
  const parts = fullName?.trim().split(/\s+/).filter(Boolean) ?? [];
  if (parts.length === 0) return { firstName: "", middleInitial: "", surname: "", suffix: "" };
  if (parts.length === 1) return { firstName: parts[0] ?? "", middleInitial: "", surname: "", suffix: "" };
  if (parts.length === 2) return { firstName: parts[0] ?? "", middleInitial: "", surname: parts[1] ?? "", suffix: "" };
  if (parts.length === 3) {
    return { firstName: parts[0] ?? "", middleInitial: parts[1] ?? "", surname: parts[2] ?? "", suffix: "" };
  }
  return {
    firstName: parts[0] ?? "",
    middleInitial: parts.length > 3 ? parts[1] ?? "" : "",
    surname: parts.length > 3 ? parts[2] ?? "" : parts.slice(1, -1).join(" "),
    suffix: parts.length > 3 ? parts.at(-1) ?? "" : "",
  };
}

export const reportFormsService = {
  async getLatestOperationReport() {
    const operation = await prisma.operationLog.findFirst({
      where: { archive: null },
      orderBy: { createdAt: "desc" },
      include: {
        teamAssignments: true,
        responders: true,
        personsInvolved: true,
        inventoryEntries: true,
        inventoryItems: { include: { item: { select: { item_id: true, item_name: true, unit: true } } } },
        dispatches: { orderBy: { dispatch_date: "desc" }, take: 1 },
        images: true,
      },
    });
    if (!operation) return null;

    const dispatch = operation.dispatches[0];
    const depart = getTimeInputValue(dispatch?.depart_time);
    const arrival = getTimeInputValue(dispatch?.arrival_time);
    const inventoryFromEntries = await Promise.all(operation.inventoryEntries.map(async (entry) => {
      const stockItem = await prisma.inventoryItem.findFirst({
        where: { item_name: entry.item_name },
        orderBy: { createdAt: "desc" },
        select: { item_id: true, unit: true },
      });
      return {
        id: entry.entry_id,
        itemName: entry.item_name,
        quantity: entry.unit ? `${entry.quantity} ${entry.unit}` : String(entry.quantity),
        ...(stockItem ? { inventoryItemId: stockItem.item_id, unit: stockItem.unit } : {}),
      };
    }));
    const inventory = inventoryFromEntries.length > 0
      ? inventoryFromEntries
      : operation.inventoryItems.map((entry) => ({
        id: `${operation.operation_id}-${entry.item_id}`,
        itemName: entry.item.item_name,
        quantity: entry.item.unit ? `${entry.quantity} ${entry.item.unit}` : String(entry.quantity),
        inventoryItemId: entry.item.item_id,
        unit: entry.item.unit,
      }));

    return {
      pinNumber: null,
      operationDetails: {
        submitterName: operation.submitter_name ?? "",
        date: getDateInputValue(operation.operation_date),
        natureOfOperation: operation.nature_of_operation,
        nameOfCaller: splitPersonName(operation.name_of_caller),
        teamAssigned: operation.teamAssignments.map((assignment) => assignment.team_id),
        responders: operation.responders.map((responder) => responder.user_id),
      },
      dispatch: {
        from: dispatch?.from_location ?? "",
        to: dispatch?.to_location ?? "",
        vehicle: dispatch?.vehicle_id ?? "",
        driver: dispatch?.driver_name ?? "",
        departTime: depart.time,
        departPeriod: depart.period,
        arrivalTime: arrival.time,
        arrivalPeriod: arrival.period,
        odometerIn: dispatch?.odometer_in == null ? "" : String(dispatch.odometer_in),
        odometerOut: dispatch?.odometer_out == null ? "" : String(dispatch.odometer_out),
      },
      people: operation.personsInvolved.map((person) => ({
        id: person.person_id,
        name: splitPersonName(person.full_name),
        birthdate: getDateInputValue(person.birthdate),
        age: person.age,
        gender: person.sex === "MALE" ? "Male" : "Female",
        contactNumber: person.contact_no ?? "",
        address: {
          phase: person.address_phase ?? "",
          package: person.address_package ?? "",
          block: person.address_block ?? "",
          lot: person.address_lot ?? "",
        },
      })),
      operationDescription: { description: operation.event_description, images: [] },
      inventory,
    };
  },

  async getLatestPatientReport() {
    const patientLog = await prisma.patientLog.findFirst({
      where: { report_data: { not: Prisma.DbNull } },
      orderBy: { createdAt: "desc" },
      select: { report_data: true },
    });
    if (!patientLog || typeof patientLog.report_data !== "object" || patientLog.report_data === null || Array.isArray(patientLog.report_data)) {
      return null;
    }

    const reportData = patientLog.report_data as Record<string, unknown>;
    return {
      ...reportData,
      pinNumber: null,
      waiverForm: { images: [] },
    };
  },

  async getLastReportFormInventorySelection() {
    const [latestOperation, recentPatientLogs] = await Promise.all([
      prisma.operationLog.findFirst({
        where: {
          OR: [
            { inventoryItems: { some: {} } },
            { inventoryEntries: { some: {} } },
          ],
        },
        orderBy: { createdAt: "desc" },
        select: {
          createdAt: true,
          inventoryItems: {
            orderBy: { item_id: "desc" },
            take: 1,
            select: { item_id: true, quantity: true },
          },
          inventoryEntries: {
            orderBy: { entry_id: "desc" },
            take: 1,
            select: { item_name: true, quantity: true },
          },
        },
      }),
      prisma.patientLog.findMany({
        orderBy: { createdAt: "desc" },
        take: 100,
        select: { createdAt: true, report_data: true },
      }),
    ]);

    let operationSelection: { inventoryItemId: string; quantity: string; createdAt: Date } | null = null;
    const linkedInventoryItem = latestOperation?.inventoryItems[0];
    if (linkedInventoryItem && latestOperation) {
      operationSelection = {
        inventoryItemId: linkedInventoryItem.item_id,
        quantity: String(linkedInventoryItem.quantity),
        createdAt: latestOperation.createdAt,
      };
    }

    const operationEntry = latestOperation?.inventoryEntries[0];
    if (!operationSelection && operationEntry && latestOperation) {
      const stockItem = await prisma.inventoryItem.findFirst({
        where: { item_name: operationEntry.item_name },
        orderBy: { createdAt: "desc" },
        select: { item_id: true },
      });
      if (stockItem) {
        operationSelection = {
          inventoryItemId: stockItem.item_id,
          quantity: String(operationEntry.quantity),
          createdAt: latestOperation.createdAt,
        };
      }
    }

    let patientSelection: { inventoryItemId: string; quantity: string; createdAt: Date } | null = null;
    for (const patientLog of recentPatientLogs) {
      const reportData = patientLog.report_data;
      if (typeof reportData !== "object" || reportData === null || Array.isArray(reportData)) continue;
      const inventory = (reportData as Record<string, unknown>).inventory;
      if (!Array.isArray(inventory)) continue;

      const latestEntry = [...inventory].reverse().find((entry) => {
        if (typeof entry !== "object" || entry === null || Array.isArray(entry)) return false;
        const item = entry as Record<string, unknown>;
        return typeof item.inventoryItemId === "string" && typeof item.quantity === "string";
      }) as Record<string, unknown> | undefined;
      if (!latestEntry) continue;

      const amount = String(latestEntry.quantity).match(/^\s*(\d+)/)?.[1];
      if (!amount) continue;
      patientSelection = {
        inventoryItemId: latestEntry.inventoryItemId as string,
        quantity: amount,
        createdAt: patientLog.createdAt,
      };
      break;
    }

    if (!operationSelection) return patientSelection;
    if (!patientSelection) return operationSelection;
    return operationSelection.createdAt >= patientSelection.createdAt ? operationSelection : patientSelection;
  },

  async getPatientFormOptions() {
    const [teams, responders, vehicles] = await Promise.all([
      prisma.responseTeam.findMany({ orderBy: { team_name: "asc" }, select: { team_id: true, team_name: true } }),
      prisma.user.findMany({
        where: { isActive: true },
        orderBy: { name: "asc" },
        select: { user_id: true, name: true, team_id: true },
      }),
      prisma.vehicle.findMany({ where: { status: "AVAILABLE" }, orderBy: { vehicle_name: "asc" }, select: { vehicle_id: true, vehicle_name: true, plate_number: true } }),
    ]);
    return { teams, responders, vehicles };
  },

  async getOperationFormOptions() {
    const [teams, responders, vehicles, operationNatures] = await Promise.all([
      prisma.responseTeam.findMany({
        orderBy: { team_name: "asc" },
        select: { team_id: true, team_name: true },
      }),
      prisma.user.findMany({
        where: { isActive: true, team_id: { not: null } },
        orderBy: { name: "asc" },
        select: { user_id: true, name: true, team_id: true },
      }),
      prisma.vehicle.findMany({
        where: { status: "AVAILABLE" },
        orderBy: { vehicle_name: "asc" },
        select: { vehicle_id: true, vehicle_name: true, plate_number: true },
      }),
      prisma.operationNature.findMany({
        where: { isActive: true },
        orderBy: { name: "asc" },
        select: { name: true },
      }),
    ]);

    return { teams, responders, vehicles, operationNatures };
  },

  async createOperation(form: OperationReportInput, files: UploadedFile[]) {
    const teamIds = form.operationDetails.teamAssigned;
    const [teams, responders, operationNature] = await Promise.all([
      prisma.responseTeam.findMany({
        where: { team_id: { in: teamIds } },
        select: { team_id: true },
      }),
      prisma.user.findMany({
        where: {
          user_id: { in: form.operationDetails.responders },
          isActive: true,
          team_id: { in: teamIds },
        },
        select: { user_id: true },
      }),
      prisma.operationNature.findFirst({
        where: { name: form.operationDetails.natureOfOperation, isActive: true },
        select: { name: true },
      }),
    ]);
    if (teams.length !== new Set(teamIds).size) {
      throw new ValidationError("One or more selected teams are no longer available.", {
        teamAssigned: ["Refresh the form and select active teams."],
      });
    }
    if (responders.length !== new Set(form.operationDetails.responders).size) {
      throw new ValidationError("One or more selected responders are no longer available.", {
        responders: ["Refresh the form and select active responders."],
      });
    }
    if (!operationNature) {
      throw new ValidationError("Choose an available operation type.", {
        natureOfOperation: ["Refresh the form and choose an available operation type."],
      });
    }

    const teamId = teamIds[0];
    if (!teamId) {
      throw new ValidationError("Select at least one response team.", {
        teamAssigned: ["Select at least one response team."],
      });
    }

    const vehicle = await prisma.vehicle.findFirst({
      where: { vehicle_id: form.dispatch.vehicle, status: "AVAILABLE" },
      select: { vehicle_id: true },
    });
    if (!vehicle) throw new NotFoundError("Available vehicle", form.dispatch.vehicle);

    const imageRecords = files.map((file) => ({
      image_url: imageUrl(file),
      file_type: file.mimetype,
      uploaded_by: null,
    }));
    const departTime = getDateTime(
      form.operationDetails.date,
      form.dispatch.departTime,
      form.dispatch.departPeriod,
    );
    const arrivalTime = getDateTime(
      form.operationDetails.date,
      form.dispatch.arrivalTime,
      form.dispatch.arrivalPeriod,
    );
    if (arrivalTime < departTime) arrivalTime.setDate(arrivalTime.getDate() + 1);

    return prisma.$transaction(async (transaction) => {
      const operation = await transaction.operationLog.create({
        data: {
          team_id: teamId,
          operation_date: new Date(`${form.operationDetails.date}T00:00:00`),
          name_of_caller: formatPersonName(form.operationDetails.nameOfCaller),
          nature_of_operation: form.operationDetails.natureOfOperation,
          event_description: form.operationDescription.description,
          submitted_by: null,
          submitter_name: form.operationDetails.submitterName.trim(),
          teamAssignments: {
            create: teamIds.map((teamId) => ({ team_id: teamId })),
          },
          responders: {
            create: form.operationDetails.responders.map((userId) => ({ user_id: userId })),
          },
          personsInvolved: {
            create: form.people.map((person) => ({
              full_name: formatPersonName(person.name),
              age: person.age,
              birthdate: new Date(`${person.birthdate}T00:00:00`),
              sex: person.gender.toUpperCase() as "MALE" | "FEMALE",
              contact_no: person.contactNumber,
              address: formatAddress(person.address) || null,
              address_phase: person.address.phase || null,
              address_package: person.address.package || null,
              address_block: person.address.block || null,
              address_lot: person.address.lot || null,
            })),
          },
          inventoryEntries: {
            create: form.inventory.map((entry) => ({
              item_name: entry.itemName,
              quantity: entry.quantity.amount,
              unit: entry.quantity.unit,
            })),
          },
          dispatches: {
            create: {
              dispatch_date: new Date(`${form.operationDetails.date}T00:00:00`),
              submitted_by: null,
              vehicle_id: vehicle.vehicle_id,
              driver_name: form.dispatch.driver,
              from_location: form.dispatch.from,
              to_location: form.dispatch.to,
              depart_time: departTime,
              arrival_time: arrivalTime,
              odometer_in: form.dispatch.odometerIn,
              odometer_out: form.dispatch.odometerOut,
            },
          },
          ...(imageRecords.length > 0 ? { images: { create: imageRecords } } : {}),
        },
        include: {
          team: true,
          teamAssignments: { include: { team: true } },
          responders: { include: { user: { select: { user_id: true, name: true } } } },
          personsInvolved: true,
          inventoryEntries: true,
          dispatches: { include: { vehicle: true } },
          images: true,
        },
      });

      return operation;
    });
  },

  async createPatient(form: PatientReportInput, files: UploadedFile[]) {
    const [responders, vehicle] = await Promise.all([
      prisma.user.findMany({
        where: {
          user_id: { in: form.responderDetails.responders },
          isActive: true,
        },
        select: { user_id: true },
      }),
      prisma.vehicle.findFirst({
        where: { vehicle_id: form.dispatch.vehicle, status: "AVAILABLE" },
        select: { vehicle_id: true },
      }),
    ]);
    if (responders.length !== new Set(form.responderDetails.responders).size) {
      throw new ValidationError("One or more selected responders are unavailable.", { responders: ["Refresh and select active responders."] });
    }
    if (!vehicle) throw new NotFoundError("Available vehicle", form.dispatch.vehicle);

    const { patientDetails, responderDetails, firstAidHospital, dispatch } = form;
    const patientFullName = formatPersonName(patientDetails.name);
    const contactFullName = formatPersonName(patientDetails.contactPerson);
    const reportDate = responderDetails.date;
    const departure = getDateTime(reportDate, dispatch.departTime, dispatch.departPeriod);
    const arrival = getDateTime(reportDate, dispatch.arrivalTime, dispatch.arrivalPeriod);
    if (arrival < departure) arrival.setDate(arrival.getDate() + 1);
    const hospitalIn = getDateTime(reportDate, firstAidHospital.hospitalInTime, firstAidHospital.hospitalInPeriod);
    const hospitalOut = getDateTime(reportDate, firstAidHospital.hospitalOutTime, firstAidHospital.hospitalOutPeriod);
    if (hospitalOut < hospitalIn) hospitalOut.setDate(hospitalOut.getDate() + 1);
    const reportPayload = {
      ...form,
      dispatch: { ...dispatch, odometerIn: String(dispatch.odometerIn), odometerOut: String(dispatch.odometerOut) },
      uploadedImages: files.map(imageUrl),
    } as Prisma.InputJsonValue;

    const record = await prisma.patient.create({
      data: {
        full_name: patientFullName,
        birthday: new Date(`${patientDetails.birthdate}T00:00:00`),
        sex: patientDetails.sex.toUpperCase() as "MALE" | "FEMALE",
        contact_person: contactFullName,
        contact_number: patientDetails.contactNumber,
        phase: patientDetails.address.phase || null,
        package: patientDetails.address.package || null,
        block: patientDetails.address.block || null,
        lot: patientDetails.address.lot || null,
        patientLogs: {
          create: {
            log_date: new Date(`${reportDate}T00:00:00`),
            type_of_request: responderDetails.typeOfRequest,
            submitter_name: responderDetails.submitterName,
            status: "PENDING",
            name_of_caller: formatPersonName(responderDetails.caller) || null,
            bp: firstAidHospital.bp || null,
            pr: firstAidHospital.pr || null,
            spo2: firstAidHospital.spo2 || null,
            temp: firstAidHospital.temp || null,
            medical_assessment: firstAidHospital.medicalAssessment || null,
            hospital_name: firstAidHospital.hospitalName || null,
            hospital_representative: formatPersonName(firstAidHospital.hospitalRepresentative) || null,
            hospital_in_time: hospitalIn,
            hospital_out_time: hospitalOut,
            report_data: reportPayload,
            responders: {
              create: responderDetails.responders.map((userId) => ({ user_id: userId })),
            },
            dispatches: {
              create: {
                dispatch_date: new Date(`${reportDate}T00:00:00`),
                vehicle_id: vehicle.vehicle_id,
                driver_name: dispatch.driver,
                from_location: dispatch.from,
                to_location: dispatch.to,
                depart_time: departure,
                arrival_time: arrival,
                odometer_in: dispatch.odometerIn,
                odometer_out: dispatch.odometerOut,
                dispatch_type: responderDetails.typeOfRequest === "PICK_UP" ? "PICK_UP" : "DROP_OFF",
              },
            },
          },
        },
        ...(files.length > 0 ? { images: { create: files.map((file) => ({
          image_url: imageUrl(file),
          file_type: file.mimetype,
          uploaded_by: null,
        })) } } : {}),
      },
      include: { patientLogs: true, images: true },
    });

    const patientLog = record.patientLogs[0];
    if (!patientLog) throw new ConflictError("Patient report could not be created.");
    const { patientLogs: _patientLogs, ...patient } = record;
    return { ...patientLog, patient };
  },
};
