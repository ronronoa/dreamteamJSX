import { useEffect, useRef, useState } from "react";

import CommonBackground from "@/components/common/background/CommonBackground";
import CommonCheckbox from "@/components/common/widgets/CommonCheckbox";
import CommonInput from "@/components/common/widgets/CommonInput";
import CommonTextarea from "@/components/common/widgets/CommonTextarea";
import SingleImageUpload, { type SingleImageUploadHandle } from "@/modules/reportForms/component/SingleImageUpload";
import { LoaderCircle, Maximize, X } from "lucide-react";
import CommonButton from "@/components/common/widgets/CommonButton";
import { scanPatientLogImage, type PatientFormOptions, type PatientLogOcrResult } from "@/api/patientForm";
import { useNavigate } from "react-router";
import { ROUTES } from "@/routes";
import OtherRespondersInput from "@/modules/reportForms/component/OtherRespondersInput";
import {
  calculateAge,
  calculateBirthdateFromAge,
  getCurrentDateInputValue,
  isValidDateInputNotInFuture,
  MAX_REASONABLE_AGE,
} from "@/utils/dateTime";
import CommonSearchSelect from "@/components/common/widgets/CommonSearchSelect";
import { MAX_ADDRESS_PART_LENGTH, MAX_CONTACT_NUMBER_LENGTH, sanitizeContactNumber } from "@/modules/reportForms/reportFieldRules";

const MAX_OCR_IMAGE_BYTES = 8 * 1024 * 1024;
const LONG_SCAN_MESSAGE_DELAY_MS = 15_000;
const LONG_SCAN_MESSAGE_INTERVAL_MS = 10_000;
const LONG_SCAN_MESSAGES = [
  "This usually takes a little while.",
  "Hang in there while we process the image.",
  "Our tiny paperwork robots are still on it.",
  "Almost there. Thanks for your patience!",
  "Giving the image one careful look-through.",
];

type CreateReportWithAIProps = {
  onProceed: (scanResult: PatientLogOcrResult, sourceImage: File | null) => void;
  proceedDisabled?: boolean;
  responderOptions: PatientFormOptions["responders"];
  optionsLoading: boolean;
  optionsError?: string;
};

function createEmptyScanResult(): PatientLogOcrResult {
  return {
    requestFor: "",
    date: "",
    time: "",
    from: "",
    to: "",
    patient: {
      name: "",
      age: "",
      gender: "",
      birthday: "",
      address: { phase: null, package: null, block: null, lot: null },
      contactPerson: "",
      contactNumber: "",
    },
    assessment: "",
    vitals: { bp: "", pr: "", spo2: "", temp: "" },
    dispositionType: "",
    patientNameAndSignature: "",
    guardianNameAndSignature: "",
    waiver: "",
    teamInformation: { ambulanceDriver: "", responder: [], otherResponders: [] },
    timeInformation: {
      barangayOut: "",
      barangayIn: "",
      hospitalIn: "",
      hospitalOut: "",
      odometerOut: "",
      odometerIn: "",
    },
    checkedBy: "",
    hospitalRepresentative: "",
  };
}

export default function CreateReportWithAI({
  onProceed,
  proceedDisabled = false,
  responderOptions,
  optionsLoading,
  optionsError = "",
}: CreateReportWithAIProps) {
  const [image, setImage] = useState<File | null>(null);
  const [scanResult, setScanResult] = useState<PatientLogOcrResult>(createEmptyScanResult);
  const [isScanning, setIsScanning] = useState(false);
  const [longScanMessage, setLongScanMessage] = useState("");
  const [scanError, setScanError] = useState("");
  const [hasScanResult, setHasScanResult] = useState(false);
  const [pendingResponderClassification, setPendingResponderClassification] = useState(false);
  const imageUploadRef = useRef<SingleImageUploadHandle>(null);

  useEffect(() => {
    if (!pendingResponderClassification || optionsLoading || optionsError) return;

    const normalizeName = (name: string) => name.trim().toLowerCase().replace(/\s+/g, " ");
    const matchedNames: string[] = [];
    const unmatchedNames: string[] = [];

    for (const responderName of scanResult.teamInformation.responder) {
      const matchingResponder = responderOptions.find(
        (responder) => normalizeName(responder.name) === normalizeName(responderName),
      );

      if (matchingResponder) {
        if (!matchedNames.includes(matchingResponder.name)) matchedNames.push(matchingResponder.name);
        continue;
      }

      if (!unmatchedNames.some((name) => normalizeName(name) === normalizeName(responderName))) {
        unmatchedNames.push(responderName.trim());
      }
    }

    const otherResponders = [...(scanResult.teamInformation.otherResponders ?? [])];
    for (const responderName of unmatchedNames) {
      if (!otherResponders.some((name) => normalizeName(name) === normalizeName(responderName))) {
        otherResponders.push(responderName);
      }
    }

    setScanResult((current) => ({
      ...current,
      teamInformation: {
        ...current.teamInformation,
        responder: matchedNames,
        otherResponders,
      },
    }));
    setPendingResponderClassification(false);
  }, [optionsError, optionsLoading, pendingResponderClassification, responderOptions, scanResult.teamInformation.otherResponders, scanResult.teamInformation.responder]);

  useEffect(() => {
    if (!isScanning) return

    let messageInterval: number | undefined
    const messageTimer = window.setTimeout(() => {
      const randomMessageIndex = Math.floor(Math.random() * LONG_SCAN_MESSAGES.length);
      setLongScanMessage(LONG_SCAN_MESSAGES[randomMessageIndex] ?? "Hang in there while we process the image.");

      messageInterval = window.setInterval(() => {
        setLongScanMessage((currentMessage) => {
          const otherMessages = LONG_SCAN_MESSAGES.filter((message) => message !== currentMessage)
          const randomMessageIndex = Math.floor(Math.random() * otherMessages.length)
          return otherMessages[randomMessageIndex] ?? LONG_SCAN_MESSAGES[0] ?? "Still processing your image."
        })
      }, LONG_SCAN_MESSAGE_INTERVAL_MS)
    }, LONG_SCAN_MESSAGE_DELAY_MS);

    return () => {
      window.clearTimeout(messageTimer)
      if (messageInterval !== undefined) window.clearInterval(messageInterval)
    }
  }, [isScanning]);

  async function handleImageChange(file: File | null) {
    setImage(file);
    setHasScanResult(false);
    setPendingResponderClassification(false);
    if (!file) return;

    const supportedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!supportedTypes.includes(file.type)) {
      setScanError("Upload a JPG, PNG, or WebP image.");
      return;
    }

    if (file.size > MAX_OCR_IMAGE_BYTES) {
      setScanError("The image must be 8 MB or smaller.");
      return;
    }

    setIsScanning(true);
    setLongScanMessage("");
    setScanError("");

    try {
      const result = await scanPatientLogImage(file);
      console.log("PatientLog OCR response:", result);
      setScanResult({
        ...result,
        teamInformation: {
          ...result.teamInformation,
          responder: result.teamInformation.responder,
          otherResponders: result.teamInformation.otherResponders ?? [],
        },
        timeInformation: {
          ...result.timeInformation,
          odometerOut: result.timeInformation.odometerOut.replace(/\D/g, ""),
          odometerIn: result.timeInformation.odometerIn.replace(/\D/g, ""),
        },
      });
      setHasScanResult(true);
      setPendingResponderClassification(true);
    } catch (error) {
      setScanError(error instanceof Error ? error.message : "Could not scan the image.");
    } finally {
      setIsScanning(false);
    }
  }

  function updateAddressValue(
    field: keyof PatientLogOcrResult["patient"]["address"],
    value: string,
  ) {
    setScanResult((current) => ({
      ...current,
      patient: {
        ...current.patient,
        address: {
          ...current.patient.address,
          [field]: value === "" ? null : Number(value),
        },
      },
    }));
  }

  function updateTextField(
    field: "date" | "time" | "from" | "to" | "assessment" | "waiver" | "checkedBy" | "hospitalRepresentative",
    value: string,
  ) {
    setScanResult((current) => ({ ...current, [field]: value }));
  }

  function updatePatientTextField(
    field: "name" | "birthday" | "contactPerson" | "contactNumber",
    value: string,
  ) {
    setScanResult((current) => ({
      ...current,
      patient: { ...current.patient, [field]: value },
    }));
  }

  function updateAgeAndBirthday(ageValue: string) {
    setScanResult((current) => ({
      ...current,
      patient: {
        ...current.patient,
        age: ageValue,
        birthday: calculateBirthdateFromAge(ageValue),
      },
    }));
  }

  function updateVitalField(field: keyof PatientLogOcrResult["vitals"], value: string) {
    setScanResult((current) => ({
      ...current,
      vitals: { ...current.vitals, [field]: value },
    }));
  }

  function updateTeamInformation(responderIds: string[]) {
    setScanResult((current) => ({
      ...current,
      teamInformation: {
        ...current.teamInformation,
        responder: responderOptions
          .filter((responder) => responderIds.includes(responder.user_id))
          .map((responder) => responder.name),
      },
    }));
  }

  const selectedResponderIds = responderOptions
    .filter((responder) => scanResult.teamInformation.responder.some(
      (name) => name.trim().toLowerCase() === responder.name.trim().toLowerCase(),
    ))
    .map((responder) => responder.user_id);
  const hasBirthday = scanResult.patient.birthday.trim() !== "";
  const hasValidBirthday = isValidDateInputNotInFuture(scanResult.patient.birthday);
  const ageValue = hasBirthday && hasValidBirthday
    ? calculateAge(scanResult.patient.birthday)
    : scanResult.patient.age;

  function updateOtherResponders(otherResponders: string[]) {
    setScanResult((current) => ({
      ...current,
      teamInformation: { ...current.teamInformation, otherResponders },
    }));
  }

  function updateTeamDriver(value: string) {
    setScanResult((current) => ({
      ...current,
      teamInformation: { ...current.teamInformation, ambulanceDriver: value },
    }));
  }

  function updateTimeInformation(
    field: keyof PatientLogOcrResult["timeInformation"],
    value: string,
  ) {
    setScanResult((current) => ({
      ...current,
      timeInformation: { ...current.timeInformation, [field]: value },
    }));
  }

  function updateRequestFor(
    value: PatientLogOcrResult["requestFor"],
  ) {
    setScanResult((current) => ({ ...current, requestFor: value }));
  }

  function updateGender(value: PatientLogOcrResult["patient"]["gender"]) {
    setScanResult((current) => ({
      ...current,
      patient: { ...current.patient, gender: value },
    }));
  }

  function updateDisposition(value: PatientLogOcrResult["dispositionType"]) {
    setScanResult((current) => ({ ...current, dispositionType: value }));
  }

  function missingFieldMessage(value: string | number | null, fieldLabel: string): string | undefined {
    if (!hasScanResult) return undefined;
    if (value !== null && String(value).trim() !== "") return undefined;
    return `${fieldLabel} was not found in the scan. Enter it manually.`;
  }

  function handleProceed() {
    if (!image || !hasScanResult || !scanResult.checkedBy.trim() || isScanning || scanError || proceedDisabled) return;
    onProceed(scanResult, image);
  }

  const navigate = useNavigate();

  return (
    <CommonBackground className="min-h-screen lg:h-screen lg:overflow-hidden">
      <CommonButton
        onClick={() => navigate(ROUTES.LOGIN)}
        variant="none"
        className="m-0! fixed left-2 top-2 z-999 bg-white/20 p-2! hover:bg-slate-500 sm:p-4!"
      >
        <X size={15} />
      </CommonButton>
      <main className="grid min-h-screen min-w-0 grid-rows-1 gap-4 p-4 lg:h-screen lg:min-h-0 lg:grid-cols-[0.5fr_1fr] lg:overflow-hidden">
        <section className="relative h-[50vh] min-h-[280px] w-full border rounded-2xl border-purple-800/80 bg-black/10 lg:h-full lg:min-h-0 lg:overflow-hidden">
          <SingleImageUpload
            ref={imageUploadRef}
            image={image}
            onImageChange={handleImageChange}
          />
          {isScanning && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/55 text-white">
              <div className="flex flex-col items-center gap-3 px-4 text-center">
                <span className="flex flex-col items-center gap-2 rounded-lg bg-black/70 px-4 py-3 font-semibold">
                  <div className="flex items-center gap-2">
                    <LoaderCircle size={20} className="animate-spin" />
                    Scanning image…
                  </div>
                {longScanMessage && (
                    <p className="max-w-sm text-sm text-white/90">{longScanMessage}</p>
                  )}
                </span>
              </div>
            </div>
          )}
        </section>

        <section
          aria-busy={isScanning}
          className={`ai-results-panel relative flex min-w-0 w-full max-w-full flex-col gap-10 rounded-2xl py-4 bg-black/15 border border-purple-900 lg:h-full lg:min-h-0 ${isScanning ? "overflow-hidden" : "lg:overflow-y-auto"}`}
        >
          {isScanning && (
            <div
              className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-black/60 text-white backdrop-blur-sm"
              role="status"
              aria-live="polite"
            >
              <span className="flex flex-col items-center gap-2 rounded-lg bg-black/70 px-4 py-3 font-semibold">
                <div className="flex items-center gap-2">
                  <LoaderCircle size={20} className="animate-spin" />
                  Scanning image…
                </div>
                {longScanMessage && (
                  <p className="max-w-sm text-sm text-white/90">{longScanMessage}</p>
                )}
              </span>
            </div>
          )}

          <div className="flex gap-4 items-center p-4">
              <div className="p-2 rounded-2xl bg-slate-500/10">
                <Maximize size={36} className="text-purple-600/80"/>
              </div>

              <span className="flex flex-col  text-slate-100">
                <h1 className="text-lg font-extrabold">
                  AI Scan Results
                </h1>
                <p className="text-sm text-slate-300/50">
                  Structured data extraction result
                </p>
              </span>
          </div>

          {scanError && (
            <div role="alert" className="mx-4 flex items-center justify-between gap-3 rounded-md bg-red-100 px-3 py-2 text-sm text-red-700">
              <span>{scanError}</span>
              {image && ["image/jpeg", "image/png", "image/webp"].includes(image.type) && image.size <= MAX_OCR_IMAGE_BYTES && (
                <button
                  type="button"
                  disabled={isScanning}
                  onClick={() => {
                    if (image) void handleImageChange(image)
                  }}
                  className="shrink-0 rounded-md border border-red-300 bg-white px-3 py-1.5 font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Try again
                </button>
              )}
            </div>
          )}

          <div className="ai-results-content mx-auto flex w-full min-w-0 max-w-[1200px] flex-col gap-4 px-4">
            <div className="ai-scan-row grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">Request for</label>
              <div className={`ai-scan-checkbox-options flex gap-4 justify-between ${hasScanResult && !scanResult.requestFor ? "rounded-md border border-red-400 bg-red-500/10 p-2" : ""}`}>
                <CommonCheckbox label="T/A" labelClassName="text-slate-100 font-extrabold" checked={scanResult.requestFor === "TRANSPORT_ASSISTANCE"} onChange={(event) => updateRequestFor(event.target.checked ? "TRANSPORT_ASSISTANCE" : "")}/>
                <CommonCheckbox label="EMERGENCY" labelClassName="text-slate-100 font-extrabold" checked={scanResult.requestFor === "EMERGENCY"} onChange={(event) => updateRequestFor(event.target.checked ? "EMERGENCY" : "")}/>
                <CommonCheckbox label="IFT" labelClassName="text-slate-100 font-extrabold" checked={scanResult.requestFor === "INTER_FACILITY_TRANSFER"} onChange={(event) => updateRequestFor(event.target.checked ? "INTER_FACILITY_TRANSFER" : "")}/>
                <CommonCheckbox label="FIRST AID" labelClassName="text-slate-100 font-extrabold" checked={scanResult.requestFor === "FIRST_AID"} onChange={(event) => updateRequestFor(event.target.checked ? "FIRST_AID" : "")}/>
              </div>
              {missingFieldMessage(scanResult.requestFor, "Request for") && <p role="alert" className="col-span-full text-sm text-red-200">{missingFieldMessage(scanResult.requestFor, "Request for")}</p>}
            </div>

            <div className="ai-scan-row ai-scan-date-row grid grid-cols-[0.57fr_1fr_0.1fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">Date</label>
              <CommonInput type="date" variant="compact" max={getCurrentDateInputValue()} value={scanResult.date} onChange={(event) => updateTextField("date", event.target.value)} errorMessage={hasScanResult && !isValidDateInputNotInFuture(scanResult.date) ? "Choose a valid date that is not in the future." : missingFieldMessage(scanResult.date, "Date")}/>

              <label className=" block text-lg font-bold text-slate-100">Time</label>
              <CommonInput type="time" variant="compact" value={scanResult.time} onChange={(event) => updateTextField("time", event.target.value)} errorMessage={missingFieldMessage(scanResult.time, "Time")}/>
            </div>

            <div className="ai-scan-row grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">From</label>
              <CommonInput variant="compact" value={scanResult.from} onChange={(event) => updateTextField("from", event.target.value)} errorMessage={missingFieldMessage(scanResult.from, "From")}/>
            </div>

            <div className="ai-scan-row grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">To</label>
              <CommonInput variant="compact" value={scanResult.to} onChange={(event) => updateTextField("to", event.target.value)} errorMessage={missingFieldMessage(scanResult.to, "To")}/>
            </div>

            <div className="ai-scan-row grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">Patient Name</label>
              <CommonInput variant="compact" value={scanResult.patient.name} onChange={(event) => updatePatientTextField("name", event.target.value)} errorMessage={missingFieldMessage(scanResult.patient.name, "Patient name")}/>
            </div>

            <div className="ai-scan-row grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className="block text-lg font-bold text-slate-100">Age</label>
              <CommonInput
                type="number"
                variant="compact"
                min={0}
                max={MAX_REASONABLE_AGE}
                value={ageValue}
                onChange={(event) => updateAgeAndBirthday(event.target.value)}
                errorMessage={missingFieldMessage(ageValue, "Age")}
              />
            </div>

            <div className="ai-scan-row grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">Gender</label>
              <div className={`ai-scan-checkbox-options flex gap-10 justify-start ${hasScanResult && !scanResult.patient.gender ? "rounded-md border border-red-400 bg-red-500/10 p-2" : ""}`}>
                <CommonCheckbox label="MALE" labelClassName="text-slate-100 font-extrabold" checked={scanResult.patient.gender === "MALE"} onChange={(event) => updateGender(event.target.checked ? "MALE" : "")}/>
                <CommonCheckbox label="FEMALE" labelClassName="text-slate-100 font-extrabold" checked={scanResult.patient.gender === "FEMALE"} onChange={(event) => updateGender(event.target.checked ? "FEMALE" : "")}/>
              </div>
              {missingFieldMessage(scanResult.patient.gender, "Gender") && <p role="alert" className="col-span-full text-sm text-red-200">{missingFieldMessage(scanResult.patient.gender, "Gender")}</p>}
            </div>

            <div className="ai-scan-row grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">Birthday</label>
              <CommonInput
                type="date"
                variant="compact"
                max={getCurrentDateInputValue()}
                value={scanResult.patient.birthday}
                onChange={(event) => updatePatientTextField("birthday", event.target.value)}
                errorMessage={hasScanResult && hasBirthday && !hasValidBirthday
                  ? "Choose a valid birthday that is not in the future."
                  : missingFieldMessage(scanResult.patient.birthday, "Birthday")}
              />
            </div>

            <div className="ai-scan-row grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">Address</label>

              <div className="ai-scan-inline-fields flex gap-4 items-center">
                <label className=" block text-lg font-bold text-slate-100">PHASE</label>
                <CommonInput type="number" min={0} max={99} step={1} variant="compact" value={scanResult.patient.address.phase ?? ""} onChange={(event) => updateAddressValue("phase", event.target.value.slice(0, MAX_ADDRESS_PART_LENGTH))} errorMessage={missingFieldMessage(scanResult.patient.address.phase, "Phase")}/>

                <label className=" block text-lg font-bold text-slate-100">PACKAGE</label>
                <CommonInput type="number" min={0} max={99} step={1} variant="compact" value={scanResult.patient.address.package ?? ""} onChange={(event) => updateAddressValue("package", event.target.value.slice(0, MAX_ADDRESS_PART_LENGTH))} errorMessage={missingFieldMessage(scanResult.patient.address.package, "Package")}/>

                <label className=" block text-lg font-bold text-slate-100">BLOCK</label>
                <CommonInput type="number" min={0} max={99} step={1} variant="compact" value={scanResult.patient.address.block ?? ""} onChange={(event) => updateAddressValue("block", event.target.value.slice(0, MAX_ADDRESS_PART_LENGTH))} errorMessage={missingFieldMessage(scanResult.patient.address.block, "Block")}/>

                <label className=" block text-lg font-bold text-slate-100">LOT</label>
                <CommonInput type="number" min={0} max={99} step={1} variant="compact" value={scanResult.patient.address.lot ?? ""} onChange={(event) => updateAddressValue("lot", event.target.value.slice(0, MAX_ADDRESS_PART_LENGTH))} errorMessage={missingFieldMessage(scanResult.patient.address.lot, "Lot")}/>
              </div>
            </div>

            <div className="ai-scan-row grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">Contact Person</label>
              <CommonInput variant="compact" value={scanResult.patient.contactPerson} onChange={(event) => updatePatientTextField("contactPerson", event.target.value)} errorMessage={missingFieldMessage(scanResult.patient.contactPerson, "Contact person")}/>
            </div>

            <div className="ai-scan-row grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">Contact No.</label>
              <CommonInput variant="compact" maxLength={MAX_CONTACT_NUMBER_LENGTH} value={scanResult.patient.contactNumber} onChange={(event) => updatePatientTextField("contactNumber", sanitizeContactNumber(event.target.value))} errorMessage={missingFieldMessage(scanResult.patient.contactNumber, "Contact number")}/>
            </div>

            <div className="ai-scan-row grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-start bg-black/10 p-3">
              <label className="block text-lg font-bold text-slate-100 mt-1">Assessment</label>
              <CommonTextarea placeholder="(Patient's Condition)" variant="compact" value={scanResult.assessment} onChange={(event) => updateTextField("assessment", event.target.value)} errorMessage={missingFieldMessage(scanResult.assessment, "Assessment")}/>
            </div>

            <div className="ai-scan-row grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">Vitals</label>

              <div className="ai-scan-inline-fields flex gap-4 items-center">
                <label className=" block text-lg font-bold text-slate-100">BP</label>
                <CommonInput variant="compact" value={scanResult.vitals.bp} onChange={(event) => updateVitalField("bp", event.target.value)} errorMessage={missingFieldMessage(scanResult.vitals.bp, "Blood pressure")}/>

                <label className=" block text-lg font-bold text-slate-100">PR</label>
                <CommonInput variant="compact" value={scanResult.vitals.pr} onChange={(event) => updateVitalField("pr", event.target.value)} errorMessage={missingFieldMessage(scanResult.vitals.pr, "Pulse rate")}/>

                <label className=" block text-lg font-bold text-slate-100">SPO2</label>
                <CommonInput variant="compact" value={scanResult.vitals.spo2} onChange={(event) => updateVitalField("spo2", event.target.value)} errorMessage={missingFieldMessage(scanResult.vitals.spo2, "SPO2")}/>

                <label className=" block text-lg font-bold text-slate-100">TEMP</label>
                <CommonInput variant="compact" value={scanResult.vitals.temp} onChange={(event) => updateVitalField("temp", event.target.value)} errorMessage={missingFieldMessage(scanResult.vitals.temp, "Temperature")}/>
              </div>
            </div>

            <div className="ai-scan-row grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">Type</label>
              <div className={`ai-scan-checkbox-options flex gap-10 justify-start ${hasScanResult && !scanResult.dispositionType ? "rounded-md border border-red-400 bg-red-500/10 p-2" : ""}`}>
                <CommonCheckbox label="DROP OFF" labelClassName="text-slate-100 font-extrabold" checked={scanResult.dispositionType === "DROP_OFF"} onChange={(event) => updateDisposition(event.target.checked ? "DROP_OFF" : "")}/>
                <CommonCheckbox label="PICK UP" labelClassName="text-slate-100 font-extrabold" checked={scanResult.dispositionType === "PICK_UP"} onChange={(event) => updateDisposition(event.target.checked ? "PICK_UP" : "")}/>
              </div>
              {missingFieldMessage(scanResult.dispositionType, "Type") && <p role="alert" className="col-span-full text-sm text-red-200">{missingFieldMessage(scanResult.dispositionType, "Type")}</p>}
            </div>


            <div className="ai-scan-row grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-start bg-black/10 p-3">
              <label className="block text-lg font-bold text-slate-100 mt-1">Waiver</label>
              <CommonTextarea placeholder="" variant="compact" value={scanResult.waiver} onChange={(event) => updateTextField("waiver", event.target.value)} errorMessage={missingFieldMessage(scanResult.waiver, "Waiver")}/>
            </div>

            <div className="ai-scan-row grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className="block text-lg font-bold text-slate-100">Ambulance Driver</label>
              <CommonInput placeholder="" variant="compact" value={scanResult.teamInformation.ambulanceDriver} onChange={(event) => updateTeamDriver(event.target.value)} errorMessage={missingFieldMessage(scanResult.teamInformation.ambulanceDriver, "Ambulance driver")}/>
            </div>

            <div className="ai-scan-row grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className="block text-lg font-bold text-slate-100">Responder</label>
              <CommonSearchSelect
                variant="compact"
                placeholder="Search responder..."
                options={responderOptions.map((responder) => ({ label: responder.name, value: responder.user_id }))}
                value={selectedResponderIds}
                onChange={updateTeamInformation}
                disabled={optionsLoading}
                errorMessage={missingFieldMessage(scanResult.teamInformation.responder.join(", "), "Responder")}
              />

              <label className="block text-lg font-bold text-slate-100">Other responders</label>
              <OtherRespondersInput
                value={scanResult.teamInformation.otherResponders ?? []}
                onChange={updateOtherResponders}
                variant="dark"
              />
            </div>

            <div className="ai-scan-row grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">Barangay</label>

              <div className="ai-scan-time-fields grid grid-cols-[0.25fr_0.25fr_1fr] gap-3 items-center">
                <div className="flex gap-2 items-center">
                  <label className=" block text-lg font-bold text-slate-100">OUT</label>
                  <CommonInput type="time" variant="compact" value={scanResult.timeInformation.barangayOut} onChange={(event) => updateTimeInformation("barangayOut", event.target.value)} errorMessage={missingFieldMessage(scanResult.timeInformation.barangayOut, "Barangay out time")}/>
                </div>

                <div className="flex gap-2 items-center">
                  <label className=" block text-lg font-bold text-slate-100">IN</label>
                  <CommonInput type="time" variant="compact" value={scanResult.timeInformation.barangayIn} onChange={(event) => updateTimeInformation("barangayIn", event.target.value)} errorMessage={missingFieldMessage(scanResult.timeInformation.barangayIn, "Barangay in time")}/>
                </div>

                <div className="flex gap-2 items-center justify-end">
                  <label className=" block text-lg font-bold text-slate-100">ODOMETER OUT</label>
                  <CommonInput type="number" variant="compact" value={scanResult.timeInformation.odometerOut} onChange={(event) => updateTimeInformation("odometerOut", event.target.value)} errorMessage={missingFieldMessage(scanResult.timeInformation.odometerOut, "Odometer out")}/>
                </div>
              </div>
            </div>

            <div className="ai-scan-row grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">Hospital</label>

              <div className="ai-scan-time-fields grid grid-cols-[0.25fr_0.25fr_1fr] gap-3 items-center">
                <div className="flex gap-2 items-center">
                  <label className=" block text-lg font-bold text-slate-100">OUT</label>
                  <CommonInput type="time" variant="compact" value={scanResult.timeInformation.hospitalOut} onChange={(event) => updateTimeInformation("hospitalOut", event.target.value)} errorMessage={missingFieldMessage(scanResult.timeInformation.hospitalOut, "Hospital out time")}/>
                </div>

                <div className="flex gap-2 items-center">
                  <label className=" block text-lg font-bold text-slate-100">IN</label>
                  <CommonInput type="time" variant="compact" value={scanResult.timeInformation.hospitalIn} onChange={(event) => updateTimeInformation("hospitalIn", event.target.value)} errorMessage={missingFieldMessage(scanResult.timeInformation.hospitalIn, "Hospital in time")}/>
                </div>

                <div className="flex gap-2 items-center justify-end">
                  <label className=" block text-lg font-bold text-slate-100">ODOMETER IN</label>
                  <CommonInput type="number" variant="compact" value={scanResult.timeInformation.odometerIn} onChange={(event) => updateTimeInformation("odometerIn", event.target.value)} errorMessage={missingFieldMessage(scanResult.timeInformation.odometerIn, "Odometer in")}/>
                </div>
              </div>
            </div>

            <div className="ai-scan-row ai-scan-checked-row grid grid-cols-[0.47fr_0.5fr_0.6fr_0.47fr] rounded-2xl gap-2 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">Checked By</label>
              <CommonInput variant="compact" value={scanResult.checkedBy} onChange={(event) => updateTextField("checkedBy", event.target.value)} errorMessage={hasScanResult && !scanResult.checkedBy.trim() ? "Checked By is required to proceed." : undefined}/>

              <label className=" block text-lg font-bold text-slate-100">Hospital Representative</label>
              <CommonInput variant="compact" value={scanResult.hospitalRepresentative} onChange={(event) => updateTextField("hospitalRepresentative", event.target.value)} errorMessage={missingFieldMessage(scanResult.hospitalRepresentative, "Hospital representative")}/>
            </div>

          </div>


          <div className="flex items-center justify-between gap-2 p-4">
            <div className="w-full p-2">
              <CommonButton
                variant="gray"
                className="w-full"
                type="button"
                onClick={() => imageUploadRef.current?.openFilePicker()}
              >
                Change
              </CommonButton>
            </div>

            <div className="w-full p-2">
              <CommonButton
                className="w-full"
                type="button"
                disabled={!image || !hasScanResult || isScanning || Boolean(scanError) || proceedDisabled || !scanResult.checkedBy.trim()}
                onClick={handleProceed}
              >
                Proceed
              </CommonButton>
            </div>

          </div>

        </section>
      </main>
    </CommonBackground>
  )
}
