import { prisma } from "@/lib/prisma";
import { ConflictError, NotFoundError, ValidationError } from "@/shared/errors";
import type { Prisma } from "@/generated/prisma/client";
import type { OperationReportInput } from "@/schemas/operationReport.schema";

type UploadedFile = Express.Multer.File;
type FormObject = Record<string, unknown>;

const REPORT_IMAGE_DIRECTORY = "/uploads/report-forms/";

function imageUrl(file: UploadedFile) {
  return `${REPORT_IMAGE_DIRECTORY}${file.filename}`;
}

function asObject(value: unknown): FormObject {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return {};
  return value as FormObject;
}

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
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

export const reportFormsService = {
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

  async createPatient(form: Record<string, unknown>, files: UploadedFile[]) {
    const patientDetails = asObject(form["patientDetails"]);
    const responderDetails = asObject(form["responderDetails"]);
    const medical = asObject(form["firstAidHospital"]);
    const patientName = asObject(patientDetails["name"]);
    const address = asObject(patientDetails["address"]);
    const contactPerson = asObject(patientDetails["contactPerson"]);
    const patientFullName = formatPersonName({
      firstName: asString(patientName["firstName"]),
      middleInitial: asString(patientName["middleInitial"]),
      surname: asString(patientName["surname"]),
      suffix: asString(patientName["suffix"]),
    });
    const contactFullName = formatPersonName({
      firstName: asString(contactPerson["firstName"]),
      middleInitial: asString(contactPerson["middleInitial"]),
      surname: asString(contactPerson["surname"]),
      suffix: asString(contactPerson["suffix"]),
    });
    const birthdate = asString(patientDetails["birthdate"]);
    const reportDate = asString(responderDetails["date"]);
    const submitterName = asString(responderDetails["submitterName"]);
    if (!submitterName || submitterName.length > 120) {
      throw new ValidationError("Enter a submitter name up to 120 characters.", {
        submitterName: ["Enter a submitter name up to 120 characters."],
      });
    }
    if (!patientFullName || !birthdate || !reportDate || Number.isNaN(Date.parse(birthdate)) || Number.isNaN(Date.parse(reportDate))) {
      throw new ValidationError("Patient name, birthdate, and report date are required.", {
        patientDetails: ["Patient name, birthdate, and report date are required."],
      });
    }
    if (files.length === 0) {
      throw new ValidationError("Attach at least one report image.", { images: ["Attach at least one report image."] });
    }

    const typeByForm: Record<string, "INTER_FACILITY_TRANSFER" | "PICK_UP" | "DROP_OFF"> = {
      "INTER-FACILITY TRANSFER": "INTER_FACILITY_TRANSFER",
      "PICK UP": "PICK_UP",
      "DROP OFF": "DROP_OFF",
    };
    const requestType = asString(responderDetails["typeOfRequest"]).toUpperCase().replaceAll("_", " ");
    const mappedRequestType = typeByForm[requestType];
    if (!mappedRequestType) {
      throw new ValidationError("Choose a valid patient request type.", {
        typeOfRequest: ["Choose a valid patient request type."],
      });
    }
    const payload = { ...form, uploadedImages: files.map(imageUrl) } as Prisma.InputJsonValue;

    const record = await prisma.patient.create({
      data: {
        full_name: patientFullName,
        birthday: new Date(`${birthdate}T00:00:00`),
        sex: asString(patientDetails["sex"]).toUpperCase() === "FEMALE" ? "FEMALE" : "MALE",
        contact_person: contactFullName || "Not provided",
        contact_number: asString(patientDetails["contactNumber"]) || "Not provided",
        phase: asString(address["phase"]) || null,
        package: asString(address["package"]) || null,
        block: asString(address["block"]) || null,
        lot: asString(address["lot"]) || null,
        patientLogs: {
          create: {
            log_date: new Date(`${reportDate}T00:00:00`),
            type_of_request: mappedRequestType,
            submitted_by: null,
            submitter_name: submitterName,
            status: "PENDING",
            name_of_caller: formatPersonName({
              firstName: asString(asObject(responderDetails["caller"])["firstName"]),
              middleInitial: asString(asObject(responderDetails["caller"])["middleInitial"]),
              surname: asString(asObject(responderDetails["caller"])["surname"]),
              suffix: asString(asObject(responderDetails["caller"])["suffix"]),
            }) || null,
            bp: asString(medical["bp"]) || null,
            pr: asString(medical["pr"]) || null,
            spo2: asString(medical["spo2"]) || null,
            temp: asString(medical["temp"]) || null,
            medical_assessment: asString(medical["medicalAssessment"]) || null,
            hospital_name: asString(medical["hospitalName"]) || null,
            hospital_representative: formatPersonName({
              firstName: asString(asObject(medical["hospitalRepresentative"])["firstName"]),
              middleInitial: asString(asObject(medical["hospitalRepresentative"])["middleInitial"]),
              surname: asString(asObject(medical["hospitalRepresentative"])["surname"]),
              suffix: asString(asObject(medical["hospitalRepresentative"])["suffix"]),
            }) || null,
            report_data: payload,
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
