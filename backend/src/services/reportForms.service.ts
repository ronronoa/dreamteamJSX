import { prisma } from "@/lib/prisma";
import { ConflictError, NotFoundError, ValidationError } from "@/shared/errors";
import { Prisma } from "@/generated/prisma/client";
import type { OperationReportInput } from "@/schemas/operationReport.schema";
import type { PatientReportInput } from "@/schemas/patientReport.schema";
import { saveVehicleOdometerFromDispatch } from "@/services/vehicleOdometer.service";

type UploadedFile = Express.Multer.File;

const REPORT_IMAGE_DIRECTORY = "/uploads/report-forms/";
const SUGGESTION_RECORD_LIMIT = 300;

type ReportSuggestions = Record<string, string[]>;

function addSuggestion(suggestions: ReportSuggestions, field: string, value: unknown) {
  if (typeof value !== "string") return;
  const trimmedValue = value.trim();
  if (!trimmedValue) return;

  const values = suggestions[field] ?? [];
  if (values.some((existingValue) => existingValue.toLocaleLowerCase() === trimmedValue.toLocaleLowerCase())) return;
  values.push(trimmedValue);
  suggestions[field] = values;
}

function addPersonNameSuggestions(suggestions: ReportSuggestions, fullName: string | null | undefined) {
  const parts = fullName?.trim().split(/\s+/).filter(Boolean) ?? [];
  if (parts.length === 0) return;

  addSuggestion(suggestions, "person.surname", parts.length > 1 ? parts.at(-1) : parts[0]);
  addSuggestion(suggestions, "person.firstName", parts[0]);
  if (parts.length > 2) addSuggestion(suggestions, "person.middleInitial", parts[1]);
  if (parts.length > 3) addSuggestion(suggestions, "person.suffix", parts.at(-1));
}

function addAddressSuggestions(suggestions: ReportSuggestions, address: {
  phase?: string | null;
  package?: string | null;
  block?: string | null;
  lot?: string | null;
}) {
  addSuggestion(suggestions, "person.address.phase", address.phase);
  addSuggestion(suggestions, "person.address.package", address.package);
  addSuggestion(suggestions, "person.address.block", address.block);
  addSuggestion(suggestions, "person.address.lot", address.lot);
}

function addSavedFormSuggestions(suggestions: ReportSuggestions, value: unknown, prefix = "") {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return;

  for (const [key, childValue] of Object.entries(value)) {
    const field = prefix ? `${prefix}.${key}` : key;
    if (typeof childValue === "string") addSuggestion(suggestions, field, childValue);
    else if (typeof childValue === "object" && childValue !== null) addSavedFormSuggestions(suggestions, childValue, field);
  }
}

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
    time: `${String(hour % 12 || 12).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`,
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
  async getReportFormSuggestions(formType: "operations" | "patients" | "vehicular-dispatches") {
    const suggestions: ReportSuggestions = {};

    if (formType === "operations") {
      const records = await prisma.operationLog.findMany({
        where: { archive: null, status: {not: "REJECTED"} },
        orderBy: { createdAt: "desc" },
        take: SUGGESTION_RECORD_LIMIT,
        select: {
          submitter_name: true,
          name_of_caller: true,
          nature_of_operation: true,
          event_description: true,
          dispatches: { select: { from_location: true, to_location: true, driver_name: true } },
          personsInvolved: { select: { full_name: true, contact_no: true, address_phase: true, address_package: true, address_block: true, address_lot: true } },
        },
      });
      for (const record of records) {
        addSuggestion(suggestions, "details.submitterName", record.submitter_name);
        addSuggestion(suggestions, "details.caller", record.name_of_caller);
        addPersonNameSuggestions(suggestions, record.name_of_caller);
        addSuggestion(suggestions, "details.natureOfOperation", record.nature_of_operation);
        addSuggestion(suggestions, "description", record.event_description);
        for (const dispatch of record.dispatches) {
          addSuggestion(suggestions, "dispatch.from", dispatch.from_location);
          addSuggestion(suggestions, "dispatch.to", dispatch.to_location);
          addSuggestion(suggestions, "dispatch.driver", dispatch.driver_name);
        }
        for (const person of record.personsInvolved) {
          addPersonNameSuggestions(suggestions, person.full_name);
          addSuggestion(suggestions, "person.contactNumber", person.contact_no);
          addAddressSuggestions(suggestions, { phase: person.address_phase, package: person.address_package, block: person.address_block, lot: person.address_lot });
        }
      }
      return suggestions;
    }

    if (formType === "patients") {
      const records = await prisma.patientLog.findMany({
        where: { archive: null },
        orderBy: { createdAt: "desc" },
        take: SUGGESTION_RECORD_LIMIT,
        select: {
          submitter_name: true,
          name_of_caller: true,
          medical_assessment: true,
          hospital_name: true,
          hospital_representative: true,
          report_data: true,
          patient: { select: { full_name: true, contact_person: true, contact_number: true, phase: true, package: true, block: true, lot: true } },
          dispatches: { select: { from_location: true, to_location: true, driver_name: true } },
        },
      });
      for (const record of records) {
        addSuggestion(suggestions, "responderDetails.submitterName", record.submitter_name);
        addSuggestion(suggestions, "responderDetails.caller", record.name_of_caller);
        addPersonNameSuggestions(suggestions, record.name_of_caller);
        addSuggestion(suggestions, "firstAidHospital.medicalAssessment", record.medical_assessment);
        addSuggestion(suggestions, "firstAidHospital.hospitalName", record.hospital_name);
        addSuggestion(suggestions, "firstAidHospital.hospitalRepresentative", record.hospital_representative);
        addPersonNameSuggestions(suggestions, record.patient.full_name);
        addPersonNameSuggestions(suggestions, record.patient.contact_person);
        addPersonNameSuggestions(suggestions, record.hospital_representative);
        addSuggestion(suggestions, "patientDetails.contactNumber", record.patient.contact_number);
        addSuggestion(suggestions, "person.contactNumber", record.patient.contact_number);
        addAddressSuggestions(suggestions, { phase: record.patient.phase, package: record.patient.package, block: record.patient.block, lot: record.patient.lot });
        for (const dispatch of record.dispatches) {
          addSuggestion(suggestions, "dispatch.from", dispatch.from_location);
          addSuggestion(suggestions, "dispatch.to", dispatch.to_location);
          addSuggestion(suggestions, "dispatch.driver", dispatch.driver_name);
        }
        addSavedFormSuggestions(suggestions, record.report_data);
      }
      return suggestions;
    }

    const records = await prisma.vehicularDispatch.findMany({
      where: { operation_id: null, patient_log_id: null, archive: null },
      orderBy: { createdAt: "desc" },
      take: SUGGESTION_RECORD_LIMIT,
      select: {
        submitter_name: true,
        from_location: true,
        to_location: true,
        driver_name: true,
        vehicle_name: true,
        passengers: { select: { full_name: true, contact_no: true, address_phase: true, address_package: true, address_block: true, address_lot: true } },
      },
    });
    for (const record of records) {
      addSuggestion(suggestions, "details.submitterName", record.submitter_name);
      addSuggestion(suggestions, "dispatch.from", record.from_location);
      addSuggestion(suggestions, "dispatch.to", record.to_location);
      addSuggestion(suggestions, "dispatch.driver", record.driver_name);
      addSuggestion(suggestions, "dispatch.vehicleOther", record.vehicle_name);
      for (const person of record.passengers) {
        addPersonNameSuggestions(suggestions, person.full_name);
        addSuggestion(suggestions, "person.contactNumber", person.contact_no);
        addAddressSuggestions(suggestions, { phase: person.address_phase, package: person.address_package, block: person.address_block, lot: person.address_lot });
      }
    }
    return suggestions;
  },

  async getLatestOperationReport() {
    const operation = await prisma.operationLog.findFirst({
      where: { archive: null },
      orderBy: { createdAt: "desc" },
      include: {
        teamAssignments: true,
        responders: true,
        personsInvolved: true,
        inventoryEntries: {
          include: { item: { select: { item_id: true, item_name: true, unit: true } } },
        },
        dispatches: { orderBy: { dispatch_date: "desc" }, take: 1 },
        images: true,
      },
    });
    if (!operation) return null;

    const dispatch = operation.dispatches[0];
    const depart = getTimeInputValue(dispatch?.depart_time);
    const arrival = getTimeInputValue(dispatch?.arrival_time);
    const inventory = operation.inventoryEntries.map((entry) => {
      const unit = entry.unit ?? entry.item?.unit ?? null;
      return {
        id: entry.entry_id,
        itemName: entry.item_name,
        quantity: unit ? `${entry.quantity} ${unit}` : String(entry.quantity),
        ...(entry.item_id ? { inventoryItemId: entry.item_id } : {}),
        ...(unit ? { unit } : {}),
      };
    });

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
        where: { inventoryEntries: { some: { item_id: { not: null } } } },
        orderBy: { createdAt: "desc" },
        select: {
          createdAt: true,
          inventoryEntries: {
            orderBy: { entry_id: "desc" },
            take: 1,
            where: { item_id: { not: null } },
            select: { item_id: true, quantity: true },
          },
        },
      }),
      prisma.patientLog.findMany({
        orderBy: { createdAt: "desc" },
        take: 100,
        select: { createdAt: true, report_data: true },
      }),
    ]);

    const latestOperationEntry = latestOperation?.inventoryEntries[0];
    const operationSelection = latestOperationEntry?.item_id && latestOperation
      ? {
          inventoryItemId: latestOperationEntry.item_id,
          quantity: String(latestOperationEntry.quantity),
          createdAt: latestOperation.createdAt,
        }
      : null;

    let patientSelection: { inventoryItemId: string; quantity: string; createdAt: Date } | null = null;
    for (const patientLog of recentPatientLogs) {
      const reportData = patientLog.report_data;
      if (typeof reportData !== "object" || reportData === null || Array.isArray(reportData)) continue;
      const inventory = (reportData as Record<string, unknown>)["inventory"];
      if (!Array.isArray(inventory)) continue;

      const latestEntry = [...inventory].reverse().find((entry) => {
        if (typeof entry !== "object" || entry === null || Array.isArray(entry)) return false;
        const item = entry as Record<string, unknown>;
        return typeof item["inventoryItemId"] === "string" && typeof item["quantity"] === "string";
      }) as Record<string, unknown> | undefined;
      if (!latestEntry) continue;

      const amount = String(latestEntry["quantity"]).match(/^\s*(\d+)/)?.[1];
      if (!amount) continue;
      patientSelection = {
        inventoryItemId: latestEntry["inventoryItemId"] as string,
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
      prisma.vehicle.findMany({ where: { status: "AVAILABLE" }, orderBy: { vehicle_name: "asc" }, select: { vehicle_id: true, vehicle_name: true, plate_number: true, current_odometer: true } }),
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
        select: { vehicle_id: true, vehicle_name: true, plate_number: true, current_odometer: true },
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
    const inventoryItemIds = [...new Set(form.inventory.flatMap((entry) => entry.inventoryItemId ? [entry.inventoryItemId] : []))];
    const [teams, responders, linkedInventoryItems] = await Promise.all([
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
      prisma.inventoryItem.findMany({
        where: {
          item_id: { in: inventoryItemIds },
          archive: null,
        },
        select: { item_id: true },
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
    if (linkedInventoryItems.length !== inventoryItemIds.length) {
      throw new ValidationError("One or more selected inventory items are no longer available.", {
        inventory: ["Refresh the inventory list and select available items."],
      });
    }

    const fallbackTeam = teamIds.length === 0
      ? await prisma.responseTeam.findFirst({ orderBy: { team_name: "asc" }, select: { team_id: true } })
      : null;
    const teamId = teamIds[0] ?? fallbackTeam?.team_id;
    if (!teamId) {
      throw new NotFoundError("Response team", "No teams are configured");
    }

    const vehicle = form.dispatch.vehicle !== "none" && form.dispatch.vehicle !== "other"
      ? await prisma.vehicle.findFirst({
          where: { vehicle_id: form.dispatch.vehicle, status: "AVAILABLE" },
          select: { vehicle_id: true },
        })
      : null;
    if (form.dispatch.vehicle !== "none" && form.dispatch.vehicle !== "other" && !vehicle) {
      throw new NotFoundError("Available vehicle", form.dispatch.vehicle);
    }

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
      if (vehicle && typeof form.dispatch.odometerIn === "number" && typeof form.dispatch.odometerOut === "number") {
        await saveVehicleOdometerFromDispatch(transaction, vehicle.vehicle_id, form.dispatch.odometerIn, form.dispatch.odometerOut);
      }
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
              ...(entry.inventoryItemId ? { item: { connect: { item_id: entry.inventoryItemId } } } : {}),
              item_name: entry.itemName,
              quantity: entry.quantity.amount,
              unit: entry.quantity.unit,
            })),
          },
          dispatches: {
            create: {
              dispatch_date: new Date(`${form.operationDetails.date}T00:00:00`),
              submitted_by: null,
              vehicle_id: vehicle?.vehicle_id ?? null,
              vehicle_name: form.dispatch.vehicle === "other" ? form.dispatch.vehicleOther?.trim() ?? null : null,
              driver_name: form.dispatch.vehicle === "none" ? null : form.dispatch.driver || null,
              from_location: form.dispatch.from,
              to_location: form.dispatch.to,
              depart_time: departTime,
              arrival_time: arrivalTime,
              odometer_in: typeof form.dispatch.odometerIn === "number" ? form.dispatch.odometerIn : null,
              odometer_out: typeof form.dispatch.odometerOut === "number" ? form.dispatch.odometerOut : null,
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
      form.dispatch.vehicle !== "none" && form.dispatch.vehicle !== "other"
        ? prisma.vehicle.findFirst({
            where: { vehicle_id: form.dispatch.vehicle, status: "AVAILABLE" },
            select: { vehicle_id: true },
          })
        : Promise.resolve(null),
    ]);
    if (responders.length !== new Set(form.responderDetails.responders).size) {
      throw new ValidationError("One or more selected responders are unavailable.", { responders: ["Refresh and select active responders."] });
    }
    if (form.dispatch.vehicle !== "none" && form.dispatch.vehicle !== "other" && !vehicle) {
      throw new NotFoundError("Available vehicle", form.dispatch.vehicle);
    }

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

    const record = await prisma.$transaction(async (transaction) => {
       if (vehicle && typeof dispatch.odometerIn === "number" && typeof dispatch.odometerOut === "number") {
         await saveVehicleOdometerFromDispatch(transaction, vehicle.vehicle_id, dispatch.odometerIn, dispatch.odometerOut);
       }
      return transaction.patient.create({
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
                 vehicle_id: vehicle?.vehicle_id ?? null,
                 vehicle_name: dispatch.vehicle === "other" ? dispatch.vehicleOther?.trim() ?? null : null,
                 driver_name: dispatch.vehicle === "none" ? null : dispatch.driver || null,
                from_location: dispatch.from,
                to_location: dispatch.to,
                depart_time: departure,
                arrival_time: arrival,
                 odometer_in: typeof dispatch.odometerIn === "number" ? dispatch.odometerIn : null,
                 odometer_out: typeof dispatch.odometerOut === "number" ? dispatch.odometerOut : null,
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
    });

    const patientLog = record.patientLogs[0];
    if (!patientLog) throw new ConflictError("Patient report could not be created.");
    const { patientLogs: _patientLogs, ...patient } = record;
    return { ...patientLog, patient };
  },
};
