import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import CommonBackground from "@/components/common/background/CommonBackground";
import CommonButton from "@/components/common/widgets/CommonButton";
import { MAX_ADDRESS_PART_LENGTH, MAX_CONTACT_NUMBER_LENGTH, sanitizeContactNumber } from "@/modules/reportForms/reportFieldRules";
import {
  fetchPatientFormOptions,
  submitPatientLog,
  type PatientFormOptions,
  type PatientLogOcrResult,
} from "@/api/patientForm";
import { ROUTES } from "@/routes";
import { useTitle } from "@/hooks/useTitle";
import { isValidDateInputNotInFuture } from "@/utils/dateTime";
import CreateReportWithAI from "@/modules/reportForms/NewPatientLogForm/CreateReportWithAI";
import OperationInventorySection from "@/modules/reportForms/component/OperationInventorySection";
import PatientStep4 from "@/modules/reportForms/NewPatientLogForm/PatientStep4";
import PatientLogLastStep from "@/modules/reportForms/NewPatientLogForm/PatientLogLastStep";
import PinModal from "@/modules/reportForms/modal/PinModal";
import {
  calculateAge,
  createEmptyPatientLogData,
  createEmptyPersonName,
  type PatientLogData,
  type PersonName,
  type TransferDisposition,
} from "@/types/patientLog";

const SUCCESS_STEP = 4;
const SUCCESS_REDIRECT_DELAY_MS = 5000;

type ClockValue = {
  time: string;
  period: "AM" | "PM";
};

function splitPersonName(value: string): PersonName {
  const nameParts = value.trim().split(/\s+/).filter(Boolean);
  if (nameParts.length === 0) return createEmptyPersonName();

  const firstName = nameParts[0] ?? "";
  const surname = nameParts.length > 1 ? nameParts[nameParts.length - 1] ?? "" : "";
  const middleInitial = nameParts.length > 2
    ? nameParts.slice(1, -1).map((part) => part[0]).join("")
    : "";

  return {
    firstName,
    surname,
    middleInitial,
    suffix: "",
  };
}

function parseClockValue(value: string): ClockValue {
  const match = value.match(/^(\d{1,2}):([0-5]\d)$/);
  if (!match) return { time: "", period: "AM" };

  const hour = Number(match[1]);
  if (hour > 23) return { time: "", period: "AM" };

  const period = hour >= 12 ? "PM" : "AM";
  const hourOnClock = hour % 12 || 12;
  return { time: `${hourOnClock}:${match[2]}`, period };
}

function matchResponderIds(
  responderNames: string[],
  options: PatientFormOptions,
) {
  const normalizeName = (name: string) => name.trim().toLowerCase().replace(/\s+/g, " ");
  const matchedIds: string[] = [];
  const unmatchedNames: string[] = [];

  for (const name of responderNames) {
    const responder = options.responders.find(
      (option) => normalizeName(option.name) === normalizeName(name),
    );

    if (!responder) {
      if (!unmatchedNames.some((unmatchedName) => normalizeName(unmatchedName) === normalizeName(name))) {
        unmatchedNames.push(name.trim());
      }
      continue;
    }

    if (!matchedIds.includes(responder.user_id)) matchedIds.push(responder.user_id);
  }

  return { matchedIds, unmatchedNames };
}

function createPatientReportFromScan(
  scanResult: PatientLogOcrResult,
  options: PatientFormOptions,
) {
  const emptyReport = createEmptyPatientLogData();
  const { matchedIds, unmatchedNames } = matchResponderIds(
    scanResult.teamInformation.responder,
    options,
  );
  const dispatchDeparture = parseClockValue(scanResult.timeInformation.barangayOut);
  const dispatchArrival = parseClockValue(scanResult.timeInformation.barangayIn);
  const hospitalArrival = parseClockValue(scanResult.timeInformation.hospitalIn);
  const hospitalDeparture = parseClockValue(scanResult.timeInformation.hospitalOut);
  const parsedAge = scanResult.patient.age.trim() ? Number(scanResult.patient.age) : Number.NaN;
  const hasBirthday = scanResult.patient.birthday.trim() !== "";
  let age: number | "" = "";
  if (hasBirthday && isValidDateInputNotInFuture(scanResult.patient.birthday)) {
    age = calculateAge(scanResult.patient.birthday);
  } else if (!hasBirthday && Number.isInteger(parsedAge) && parsedAge >= 0) {
    age = parsedAge;
  }

  const report: PatientLogData = {
    ...emptyReport,
    responderDetails: {
      ...emptyReport.responderDetails,
      submitterName: scanResult.checkedBy.trim(),
      date: scanResult.date || emptyReport.responderDetails.date,
      time: scanResult.time || emptyReport.responderDetails.time,
      typeOfRequest: scanResult.requestFor,
      dispositionType: scanResult.dispositionType as TransferDisposition,
      responders: matchedIds,
      otherResponders: [...(scanResult.teamInformation.otherResponders ?? []), ...unmatchedNames],
    },
    dispatch: {
      ...emptyReport.dispatch,
      from: scanResult.from,
      to: scanResult.to,
      vehicle: "none",
      driver: scanResult.teamInformation.ambulanceDriver,
      departTime: dispatchDeparture.time,
      departPeriod: dispatchDeparture.period,
      arrivalTime: dispatchArrival.time,
      arrivalPeriod: dispatchArrival.period,
      odometerOut: scanResult.timeInformation.odometerOut,
      odometerIn: scanResult.timeInformation.odometerIn,
    },
    patientDetails: {
      ...emptyReport.patientDetails,
      name: splitPersonName(scanResult.patient.name),
      birthdate: scanResult.patient.birthday,
      age,
      sex: scanResult.patient.gender === "MALE"
        ? "Male"
        : scanResult.patient.gender === "FEMALE" ? "Female" : "",
      contactPerson: splitPersonName(scanResult.patient.contactPerson),
      contactNumber: sanitizeContactNumber(scanResult.patient.contactNumber),
      address: {
        phase: scanResult.patient.address.phase?.toString() ?? "",
        package: scanResult.patient.address.package?.toString() ?? "",
        block: scanResult.patient.address.block?.toString() ?? "",
        lot: scanResult.patient.address.lot?.toString() ?? "",
      },
    },
    firstAidHospital: {
      ...emptyReport.firstAidHospital,
      bp: scanResult.vitals.bp,
      pr: scanResult.vitals.pr,
      spo2: scanResult.vitals.spo2,
      temp: scanResult.vitals.temp,
      medicalAssessment: scanResult.assessment,
      hospitalName: scanResult.to,
      hospitalRepresentative: splitPersonName(scanResult.hospitalRepresentative),
      hospitalInTime: hospitalArrival.time,
      hospitalInPeriod: hospitalArrival.period,
      hospitalOutTime: hospitalDeparture.time,
      hospitalOutPeriod: hospitalDeparture.period,
    },
    waiverForm: {
      ...emptyReport.waiverForm,
      description: scanResult.waiver,
    },
  };

  return report;
}

function getSubmissionIssues(formData: PatientLogData) {
  const issues: string[] = [];
  const { responderDetails, patientDetails, firstAidHospital, inventory } = formData;

  if (!responderDetails.submitterName.trim()) issues.push("Enter the Checked By name; it is saved as the submitter.");
  if (!isValidDateInputNotInFuture(responderDetails.date)) {
    issues.push("Enter a valid report date that is not in the future.");
  }
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(responderDetails.time)) issues.push("Enter a valid report time in the scan results.");
  if (!responderDetails.typeOfRequest) issues.push("Select a request type in the scan results.");
  if (!responderDetails.dispositionType) issues.push("Select Pick-Up or Drop-Off in the scan results.");
  if (responderDetails.responders.length + responderDetails.otherResponders.length === 0) {
    issues.push("Add at least one responder.");
  }
  if (!patientDetails.name.firstName || !patientDetails.name.surname) issues.push("Enter the patient's first and last name.");
  if (!patientDetails.birthdate) issues.push("Enter the patient's birthday.");
  if (patientDetails.age === "") issues.push("Enter the patient's age.");
  if (!patientDetails.sex) issues.push("Select the patient's gender.");
  if (!patientDetails.contactPerson.firstName || !patientDetails.contactPerson.surname) issues.push("Enter the contact person's first and last name.");
  if (!patientDetails.contactNumber.trim()) issues.push("Enter a contact number.");
  else if (
    !/^\d+$/.test(patientDetails.contactNumber) ||
    patientDetails.contactNumber.length > MAX_CONTACT_NUMBER_LENGTH
  ) {
    issues.push(`Contact number must contain no more than ${MAX_CONTACT_NUMBER_LENGTH} digits.`);
  }
  for (const [addressPart, label] of [
    [patientDetails.address.phase, "Phase"],
    [patientDetails.address.package, "Package"],
    [patientDetails.address.block, "Block"],
    [patientDetails.address.lot, "Lot"],
  ] as const) {
    if (addressPart.length > MAX_ADDRESS_PART_LENGTH || (addressPart && !/^[a-zA-Z0-9]+$/.test(addressPart))) {
      issues.push(`${label} must be no more than ${MAX_ADDRESS_PART_LENGTH} letters or numbers.`);
    }
  }
  if (!firstAidHospital.medicalAssessment.trim()) issues.push("Enter the medical assessment.");
  if (!firstAidHospital.hospitalName.trim()) issues.push("Enter the destination or hospital name.");
  if (!firstAidHospital.hospitalInTime) issues.push("Enter the hospital arrival time.");
  if (!firstAidHospital.hospitalOutTime) issues.push("Enter the hospital departure time.");
  if (inventory.some((item) => !item.itemName.trim() || !item.quantity.trim())) {
    issues.push("Complete or remove each incomplete inventory item.");
  }

  return issues;
}

function hasIncompleteInventory(formData: PatientLogData) {
  return formData.inventory.some((item) => !item.itemName.trim() || !item.quantity.trim());
}

export default function CreateReportWithAIPatients() {
  const [step, setStep] = useState(1);
  const [options, setOptions] = useState<PatientFormOptions>({ teams: [], responders: [], vehicles: [] });
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [optionsError, setOptionsError] = useState("");
  const [optionsRequestId, setOptionsRequestId] = useState(0);
  const [formData, setFormData] = useState<PatientLogData>(createEmptyPatientLogData);
  const [formImage, setFormImage] = useState<File | null>(null);
  const [submissionIssues, setSubmissionIssues] = useState<string[]>([]);
  const [pinModalOpen, setPinModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pinError, setPinError] = useState<string>();

  const navigate = useNavigate();
  useTitle("Create Patient Log With AI");

  useEffect(() => {
    let isCurrentRequest = true;

    async function loadOptions() {
      setOptionsLoading(true);
      setOptionsError("");

      try {
        const loadedOptions = await fetchPatientFormOptions();
        if (isCurrentRequest) setOptions(loadedOptions);
      } catch (error) {
        if (isCurrentRequest) {
          setOptionsError(error instanceof Error ? error.message : "Could not load patient form options.");
        }
      } finally {
        if (isCurrentRequest) setOptionsLoading(false);
      }
    }

    void loadOptions();
    return () => { isCurrentRequest = false; };
  }, [optionsRequestId]);

  useEffect(() => {
    if (step !== SUCCESS_STEP) return;
    const redirectTimer = window.setTimeout(() => navigate(ROUTES.CHOOSE_FORM), SUCCESS_REDIRECT_DELAY_MS);
    return () => window.clearTimeout(redirectTimer);
  }, [navigate, step]);

  function handleProceed(scanResult: PatientLogOcrResult, sourceImage: File | null) {
    if (optionsLoading || optionsError || !scanResult.checkedBy.trim()) return;

    const report = createPatientReportFromScan(scanResult, options);
    setFormData(report);
    setFormImage(sourceImage);
    setSubmissionIssues([]);
    setStep(2);
  }

  function updateInventory(inventory: PatientLogData["inventory"]) {
    setFormData((current) => ({ ...current, inventory }));
  }

  function handleOpenPinModal() {
    const issues = getSubmissionIssues(formData);
    setSubmissionIssues(issues);
    if (issues.length > 0) return;

    setPinError(undefined);
    setPinModalOpen(true);
  }

  async function handleSubmit(pin: string) {
    setIsSubmitting(true);
    setPinError(undefined);

    try {
      await submitPatientLog(pin, formData, formImage);
      setPinModalOpen(false);
      setStep(SUCCESS_STEP);
    } catch (error) {
      console.error("Failed to submit AI patient log:", error);
      setPinError(error instanceof Error ? error.message : "Could not submit the patient report.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (step === SUCCESS_STEP) return <PatientLogLastStep />;

  return (
    <>
      <div className={step === 1 ? "block" : "hidden"}>
        {optionsError && (
          <div role="alert" className="fixed right-4 top-4 z-20 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700 shadow">
            <p>{optionsError}</p>
            <button
              type="button"
              className="mt-2 font-semibold underline"
              onClick={() => setOptionsRequestId((current) => current + 1)}
            >
              Retry loading responders
            </button>
          </div>
        )}
        {optionsLoading && (
          <p role="status" className="fixed right-4 top-4 z-20 rounded-md bg-white px-4 py-3 text-sm text-slate-700 shadow">
            Loading responders…
          </p>
        )}
        <CreateReportWithAI
          onProceed={handleProceed}
          proceedDisabled={optionsLoading || Boolean(optionsError)}
          responderOptions={options.responders}
          optionsLoading={optionsLoading}
          optionsError={optionsError}
        />
      </div>

      {step > 1 && (
        <CommonBackground className="min-h-screen p-4">
          {pinModalOpen && (
            <PinModal
              title="NEW PATIENT LOG"
              open={pinModalOpen}
              onClose={() => setPinModalOpen(false)}
              onSubmit={handleSubmit}
              loading={isSubmitting}
              error={pinError}
            />
          )}

          <main className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-6xl flex-col gap-5">
            <header className="pt-5 text-center">
              <h1 className="text-3xl font-bold text-white">
                {step === 2 ? "INVENTORY USED" : "REVIEW PATIENT LOG"}
              </h1>
            </header>

            {step === 2 ? (
              <div className="flex-1">
                <OperationInventorySection
                  inventory={formData.inventory}
                  onInventoryChange={updateInventory}
                />
              </div>
            ) : (
              <>
                <PatientStep4 formData={formData} options={options} />
                {submissionIssues.length > 0 && (
                  <div role="alert" className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
                    <p className="font-semibold">Review these fields before submitting:</p>
                    <ul className="mt-1 list-inside list-disc">
                      {submissionIssues.map((issue) => <li key={issue}>{issue}</li>)}
                    </ul>
                  </div>
                )}
              </>
            )}

            <footer className="flex h-14 items-center justify-between rounded-md bg-white p-2">
              <CommonButton
                variant="gray"
                className="min-w-[130px]"
                type="button"
                onClick={() => {
                  setSubmissionIssues([]);
                  setStep((current) => Math.max(1, current - 1));
                }}
              >
                Go back
              </CommonButton>

              {step === 2 ? (
                <CommonButton
                  className="min-w-[130px]"
                  type="button"
                  disabled={hasIncompleteInventory(formData)}
                  onClick={() => setStep(3)}
                >
                  Proceed
                </CommonButton>
              ) : (
                <CommonButton
                  className="min-w-[130px]"
                  type="button"
                  onClick={handleOpenPinModal}
                >
                  Submit
                </CommonButton>
              )}
            </footer>
          </main>
        </CommonBackground>
      )}
    </>
  );
}
