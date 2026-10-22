import { useRef, useState } from "react";

import CommonBackground from "@/components/common/background/CommonBackground";
import CommonCheckbox from "@/components/common/widgets/CommonCheckbox";
import CommonInput from "@/components/common/widgets/CommonInput";
import CommonTextarea from "@/components/common/widgets/CommonTextarea";
import SingleImageUpload, { type SingleImageUploadHandle } from "@/modules/reportForms/component/SingleImageUpload";
import { LoaderCircle, Maximize } from "lucide-react";
import CommonButton from "@/components/common/widgets/CommonButton";
import { scanPatientLogImage, type PatientLogOcrResult } from "@/api/patientForm";

const MAX_OCR_IMAGE_BYTES = 8 * 1024 * 1024;

type CreateReportWithAIProps = {
  onProceed: (scanResult: PatientLogOcrResult, sourceImage: File | null) => void;
  proceedDisabled?: boolean;
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
    teamInformation: { ambulanceDriver: "", responder: [] },
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

export default function CreateReportWithAI({ onProceed, proceedDisabled = false }: CreateReportWithAIProps) {
  const [image, setImage] = useState<File | null>(null);
  const [scanResult, setScanResult] = useState<PatientLogOcrResult>(createEmptyScanResult);
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState("");
  const imageUploadRef = useRef<SingleImageUploadHandle>(null);

  async function handleImageChange(file: File | null) {
    setImage(file);
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
    setScanError("");

    try {
      const result = await scanPatientLogImage(file);
      console.log("PatientLog OCR response:", result);
      setScanResult({
        ...result,
        checkedBy: "",
        timeInformation: {
          ...result.timeInformation,
          odometerOut: result.timeInformation.odometerOut.replace(/\D/g, ""),
          odometerIn: result.timeInformation.odometerIn.replace(/\D/g, ""),
        },
      });
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
    field: "name" | "age" | "birthday" | "contactPerson" | "contactNumber",
    value: string,
  ) {
    setScanResult((current) => ({
      ...current,
      patient: { ...current.patient, [field]: value },
    }));
  }

  function updateVitalField(field: keyof PatientLogOcrResult["vitals"], value: string) {
    setScanResult((current) => ({
      ...current,
      vitals: { ...current.vitals, [field]: value },
    }));
  }

  function updateTeamInformation(value: string) {
    setScanResult((current) => ({
      ...current,
      teamInformation: {
        ...current.teamInformation,
        responder: value.split(",").map((name) => name.trim()).filter(Boolean),
      },
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

  return (
    <CommonBackground className="min-h-screen lg:h-screen lg:overflow-hidden">
      <main className="grid min-h-screen min-w-0 grid-rows-1 gap-4 overflow-x-hidden p-4 lg:h-screen lg:min-h-0 lg:grid-cols-[0.5fr_1fr] lg:overflow-hidden">
        <section className="relative h-[50vh] min-h-[280px] w-full border-2 lg:h-full lg:min-h-0 lg:overflow-hidden">
          <SingleImageUpload
            ref={imageUploadRef}
            image={image}
            onImageChange={handleImageChange}
          />
          {isScanning && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/55 text-white">
              <span className="flex items-center gap-2 rounded-lg bg-black/70 px-4 py-3 font-semibold">
                <LoaderCircle size={20} className="animate-spin" />
                Scanning image…
              </span>
            </div>
          )}
        </section>

        <section className="flex flex-col gap-10 rounded-2xl py-4 bg-black/15 border border-purple-900 lg:h-full lg:min-h-0 lg:overflow-y-auto">

          <div className="flex items-center gap-2 p-4">
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
            </span> </div>
          {scanError && (
            <p role="alert" className="mx-4 rounded-md bg-red-100 px-3 py-2 text-sm text-red-700">
              {scanError}
            </p>
          )}

          <div className="px-4 flex flex-col gap-4 max-w-[1200px] mx-auto">
            <div className="grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">Request for</label>
              <div className="flex gap-4 justify-between">
                <CommonCheckbox label="T/A" labelClassName="text-slate-100 font-extrabold" checked={scanResult.requestFor === "TRANSPORT_ASSISTANCE"} onChange={(event) => updateRequestFor(event.target.checked ? "TRANSPORT_ASSISTANCE" : "")}/>
                <CommonCheckbox label="EMERGENCY" labelClassName="text-slate-100 font-extrabold" checked={scanResult.requestFor === "EMERGENCY"} onChange={(event) => updateRequestFor(event.target.checked ? "EMERGENCY" : "")}/>
                <CommonCheckbox label="IFT" labelClassName="text-slate-100 font-extrabold" checked={scanResult.requestFor === "INTER_FACILITY_TRANSFER"} onChange={(event) => updateRequestFor(event.target.checked ? "INTER_FACILITY_TRANSFER" : "")}/>
                <CommonCheckbox label="FIRST AID" labelClassName="text-slate-100 font-extrabold" checked={scanResult.requestFor === "FIRST_AID"} onChange={(event) => updateRequestFor(event.target.checked ? "FIRST_AID" : "")}/>
              </div>
            </div>

            <div className="grid grid-cols-[0.57fr_1fr_0.1fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">Date</label>
              <CommonInput type="date" variant="compact" value={scanResult.date} onChange={(event) => updateTextField("date", event.target.value)}/>

              <label className=" block text-lg font-bold text-slate-100">Time</label>
              <CommonInput type="time" variant="compact" value={scanResult.time} onChange={(event) => updateTextField("time", event.target.value)}/>
            </div>

            <div className="grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">From</label>
              <CommonInput variant="compact" value={scanResult.from} onChange={(event) => updateTextField("from", event.target.value)}/>
            </div>

            <div className="grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">To</label>
              <CommonInput variant="compact" value={scanResult.to} onChange={(event) => updateTextField("to", event.target.value)}/>
            </div>

            <div className="grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">Patient Name</label>
              <CommonInput variant="compact" value={scanResult.patient.name} onChange={(event) => updatePatientTextField("name", event.target.value)}/>
            </div>

            <div className="grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className="block text-lg font-bold text-slate-100">Age</label>
              <CommonInput type="number" variant="compact" value={scanResult.patient.age} onChange={(event) => updatePatientTextField("age", event.target.value)}/>
            </div>

            <div className="grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">Gender</label>
              <div className="flex gap-10 justify-start">
                <CommonCheckbox label="MALE" labelClassName="text-slate-100 font-extrabold" checked={scanResult.patient.gender === "MALE"} onChange={(event) => updateGender(event.target.checked ? "MALE" : "")}/>
                <CommonCheckbox label="FEMALE" labelClassName="text-slate-100 font-extrabold" checked={scanResult.patient.gender === "FEMALE"} onChange={(event) => updateGender(event.target.checked ? "FEMALE" : "")}/>
              </div>
            </div>

            <div className="grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">Birthday</label>
              <CommonInput type="date" variant="compact" value={scanResult.patient.birthday} onChange={(event) => updatePatientTextField("birthday", event.target.value)}/>
            </div>

            <div className="grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">Address</label>

              <div className="flex gap-4 items-center">
                <label className=" block text-lg font-bold text-slate-100">PHASE</label>
                <CommonInput type="number" variant="compact" value={scanResult.patient.address.phase ?? ""} onChange={(event) => updateAddressValue("phase", event.target.value)}/>

                <label className=" block text-lg font-bold text-slate-100">PACKAGE</label>
                <CommonInput type="number" variant="compact" value={scanResult.patient.address.package ?? ""} onChange={(event) => updateAddressValue("package", event.target.value)}/>

                <label className=" block text-lg font-bold text-slate-100">BLOCK</label>
                <CommonInput type="number" variant="compact" value={scanResult.patient.address.block ?? ""} onChange={(event) => updateAddressValue("block", event.target.value)}/>

                <label className=" block text-lg font-bold text-slate-100">LOT</label>
                <CommonInput type="number" variant="compact" value={scanResult.patient.address.lot ?? ""} onChange={(event) => updateAddressValue("lot", event.target.value)}/>
              </div>
            </div>

            <div className="grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">Contact Person</label>
              <CommonInput variant="compact" value={scanResult.patient.contactPerson} onChange={(event) => updatePatientTextField("contactPerson", event.target.value)}/>
            </div>

            <div className="grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">Contact No.</label>
              <CommonInput variant="compact" value={scanResult.patient.contactNumber} onChange={(event) => updatePatientTextField("contactNumber", event.target.value)}/>
            </div>

            <div className="grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-start bg-black/10 p-3">
              <label className="block text-lg font-bold text-slate-100 mt-1">Assessment</label>
              <CommonTextarea placeholder="(Patient's Condition)" variant="compact" value={scanResult.assessment} onChange={(event) => updateTextField("assessment", event.target.value)}/>
            </div>

            <div className="grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">Vitals</label>

              <div className="flex gap-4 items-center">
                <label className=" block text-lg font-bold text-slate-100">BP</label>
                <CommonInput variant="compact" value={scanResult.vitals.bp} onChange={(event) => updateVitalField("bp", event.target.value)}/>

                <label className=" block text-lg font-bold text-slate-100">PR</label>
                <CommonInput variant="compact" value={scanResult.vitals.pr} onChange={(event) => updateVitalField("pr", event.target.value)}/>

                <label className=" block text-lg font-bold text-slate-100">SPO2</label>
                <CommonInput variant="compact" value={scanResult.vitals.spo2} onChange={(event) => updateVitalField("spo2", event.target.value)}/>

                <label className=" block text-lg font-bold text-slate-100">TEMP</label>
                <CommonInput variant="compact" value={scanResult.vitals.temp} onChange={(event) => updateVitalField("temp", event.target.value)}/>
              </div>
            </div>

            <div className="grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">Type</label>
              <div className="flex gap-10 justify-start">
                <CommonCheckbox label="DROP OFF" labelClassName="text-slate-100 font-extrabold" checked={scanResult.dispositionType === "DROP_OFF"} onChange={(event) => updateDisposition(event.target.checked ? "DROP_OFF" : "")}/>
                <CommonCheckbox label="PICK UP" labelClassName="text-slate-100 font-extrabold" checked={scanResult.dispositionType === "PICK_UP"} onChange={(event) => updateDisposition(event.target.checked ? "PICK_UP" : "")}/>
              </div>
            </div>


            <div className="grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-start bg-black/10 p-3">
              <label className="block text-lg font-bold text-slate-100 mt-1">Waiver</label>
              <CommonTextarea placeholder="" variant="compact" value={scanResult.waiver} onChange={(event) => updateTextField("waiver", event.target.value)}/>
            </div>

            <div className="grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className="block text-lg font-bold text-slate-100">Ambulance Driver</label>
              <CommonInput placeholder="" variant="compact" value={scanResult.teamInformation.ambulanceDriver} onChange={(event) => updateTeamDriver(event.target.value)}/>
            </div>

            <div className="grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className="block text-lg font-bold text-slate-100">Responder</label>
              <CommonInput placeholder="" variant="compact" value={scanResult.teamInformation.responder.join(", ")} onChange={(event) => updateTeamInformation(event.target.value)}/>
            </div>

            <div className="grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">Barangay</label>

              <div className="grid grid-cols-[0.25fr_0.25fr_1fr] gap-3 items-center">
                <div className="flex gap-2 items-center">
                  <label className=" block text-lg font-bold text-slate-100">OUT</label>
                  <CommonInput type="time" variant="compact" value={scanResult.timeInformation.barangayOut} onChange={(event) => updateTimeInformation("barangayOut", event.target.value)}/>
                </div>

                <div className="flex gap-2 items-center">
                  <label className=" block text-lg font-bold text-slate-100">IN</label>
                  <CommonInput type="time" variant="compact" value={scanResult.timeInformation.barangayIn} onChange={(event) => updateTimeInformation("barangayIn", event.target.value)}/>
                </div>

                <div className="flex gap-2 items-center justify-end">
                  <label className=" block text-lg font-bold text-slate-100">ODOMETER OUT</label>
                  <CommonInput type="number" variant="compact" value={scanResult.timeInformation.odometerOut} onChange={(event) => updateTimeInformation("odometerOut", event.target.value)}/>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">Hospital</label>

              <div className="grid grid-cols-[0.25fr_0.25fr_1fr] gap-3 items-center">
                <div className="flex gap-2 items-center">
                  <label className=" block text-lg font-bold text-slate-100">OUT</label>
                  <CommonInput type="time" variant="compact" value={scanResult.timeInformation.hospitalOut} onChange={(event) => updateTimeInformation("hospitalOut", event.target.value)}/>
                </div>

                <div className="flex gap-2 items-center">
                  <label className=" block text-lg font-bold text-slate-100">IN</label>
                  <CommonInput type="time" variant="compact" value={scanResult.timeInformation.hospitalIn} onChange={(event) => updateTimeInformation("hospitalIn", event.target.value)}/>
                </div>

                <div className="flex gap-2 items-center justify-end">
                  <label className=" block text-lg font-bold text-slate-100">ODOMETER IN</label>
                  <CommonInput type="number" variant="compact" value={scanResult.timeInformation.odometerIn} onChange={(event) => updateTimeInformation("odometerIn", event.target.value)}/>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-[0.47fr_0.5fr_0.6fr_0.47fr] rounded-2xl gap-2 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">Checked By</label>
              <CommonInput variant="compact" value={scanResult.checkedBy} onChange={(event) => updateTextField("checkedBy", event.target.value)}/>

              <label className=" block text-lg font-bold text-slate-100">Hospital Representative</label>
              <CommonInput variant="compact" value={scanResult.hospitalRepresentative} onChange={(event) => updateTextField("hospitalRepresentative", event.target.value)}/>
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
                disabled={!image || isScanning || Boolean(scanError) || proceedDisabled}
                onClick={() => onProceed(scanResult, image)}
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
