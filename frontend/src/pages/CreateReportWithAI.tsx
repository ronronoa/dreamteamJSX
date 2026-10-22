import { useRef, useState } from "react";

import CommonBackground from "@/components/common/background/CommonBackground";
import CommonCheckbox from "@/components/common/widgets/CommonCheckbox";
import CommonInput from "@/components/common/widgets/CommonInput";
import CommonTextarea from "@/components/common/widgets/CommonTextarea";
import SingleImageUpload, { type SingleImageUploadHandle } from "@/modules/reportForms/component/SingleImageUpload";
import { Maximize } from "lucide-react";
import CommonButton from "@/components/common/widgets/CommonButton";

export default function CreateReportWithAI() {
  const [image, setImage] = useState<File | null>(null);
  const imageUploadRef = useRef<SingleImageUploadHandle>(null);

  return (
    <CommonBackground className="min-h-screen lg:h-screen lg:overflow-hidden">
      <main className="grid min-h-screen min-w-0 grid-rows-1 gap-4 overflow-x-hidden p-4 lg:h-screen lg:min-h-0 lg:grid-cols-[0.5fr_1fr] lg:overflow-hidden">
        <section className="h-[50vh] min-h-[280px] w-full border-2 lg:h-full lg:min-h-0 lg:overflow-hidden">
          <SingleImageUpload
            ref={imageUploadRef}
            image={image}
            onImageChange={setImage}
          />
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

          <div className="px-4 flex flex-col gap-4 max-w-[1200px] mx-auto">
            <div className="grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">Request for</label>
              <div className="flex gap-4 justify-between">
                <CommonCheckbox label="T/A" labelClassName="text-slate-100 font-extrabold"/>
                <CommonCheckbox label="EMERGENCY" labelClassName="text-slate-100 font-extrabold"/>
                <CommonCheckbox label="IFT" labelClassName="text-slate-100 font-extrabold"/>
                <CommonCheckbox label="FIRST AID" labelClassName="text-slate-100 font-extrabold"/>
              </div>
            </div>

            <div className="grid grid-cols-[0.57fr_1fr_0.1fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">Date</label>
              <CommonInput variant="compact"/>

              <label className=" block text-lg font-bold text-slate-100">Time</label>
              <CommonInput variant="compact"/>
            </div>

            <div className="grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">From</label>
              <CommonInput variant="compact"/>
            </div>

            <div className="grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">To</label>
              <CommonInput variant="compact"/>
            </div>

            <div className="grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">Patient Name</label>
              <CommonInput variant="compact"/>
            </div>

            <div className="grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">Gender</label>
              <div className="flex gap-10 justify-start">
                <CommonCheckbox label="MALE" labelClassName="text-slate-100 font-extrabold"/>
                <CommonCheckbox label="FEMALE" labelClassName="text-slate-100 font-extrabold"/>
              </div>
            </div>

            <div className="grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">Birthday</label>
              <CommonInput type="date" variant="compact"/>
            </div>

            <div className="grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">Address</label>

              <div className="flex gap-4 items-center">
                <label className=" block text-lg font-bold text-slate-100">PHASE</label>
                <CommonInput type="number" variant="compact"/>

                <label className=" block text-lg font-bold text-slate-100">PACKAGE</label>
                <CommonInput type="number" variant="compact"/>

                <label className=" block text-lg font-bold text-slate-100">BLOCK</label>
                <CommonInput type="number" variant="compact"/>

                <label className=" block text-lg font-bold text-slate-100">LOT</label>
                <CommonInput type="number" variant="compact"/>
              </div>
            </div>

            <div className="grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">Contact Person</label>
              <CommonInput variant="compact"/>
            </div>

            <div className="grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">Contact No.</label>
              <CommonInput variant="compact"/>
            </div>

            <div className="grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-start bg-black/10 p-3">
              <label className="block text-lg font-bold text-slate-100 mt-1">Assessment</label>
              <CommonTextarea placeholder="(Patient's Condition)" variant="compact"/>
            </div>

            <div className="grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">Vitals</label>

              <div className="flex gap-4 items-center">
                <label className=" block text-lg font-bold text-slate-100">BP</label>
                <CommonInput variant="compact"/>

                <label className=" block text-lg font-bold text-slate-100">PR</label>
                <CommonInput variant="compact"/>

                <label className=" block text-lg font-bold text-slate-100">SPO2</label>
                <CommonInput variant="compact"/>

                <label className=" block text-lg font-bold text-slate-100">TEMP</label>
                <CommonInput variant="compact"/>
              </div>
            </div>

            <div className="grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">Type</label>
              <div className="flex gap-10 justify-start">
                <CommonCheckbox label="DROP OFF" labelClassName="text-slate-100 font-extrabold"/>
                <CommonCheckbox label="PICK UP" labelClassName="text-slate-100 font-extrabold"/>
              </div>
            </div>


            <div className="grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-start bg-black/10 p-3">
              <label className="block text-lg font-bold text-slate-100 mt-1">Waiver</label>
              <CommonTextarea placeholder="" variant="compact"/>
            </div>

            <div className="grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className="block text-lg font-bold text-slate-100">Ambulance Driver</label>
              <CommonInput placeholder="" variant="compact"/>
            </div>

            <div className="grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className="block text-lg font-bold text-slate-100">Responder</label>
              <CommonInput placeholder="" variant="compact"/>
            </div>

            <div className="grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">Barangay</label>

              <div className="grid grid-cols-[0.25fr_0.25fr_1fr] gap-3 items-center">
                <div className="flex gap-2 items-center">
                  <label className=" block text-lg font-bold text-slate-100">OUT</label>
                  <CommonInput type="number" variant="compact"/>
                </div>

                <div className="flex gap-2 items-center">
                  <label className=" block text-lg font-bold text-slate-100">IN</label>
                  <CommonInput type="number" variant="compact"/>
                </div>

                <div className="flex gap-2 items-center justify-end">
                  <label className=" block text-lg font-bold text-slate-100">ODOMETER OUT</label>
                  <CommonInput type="number" variant="compact"/>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-[0.25fr_1fr] rounded-2xl gap-4 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">Hospital</label>

              <div className="grid grid-cols-[0.25fr_0.25fr_1fr] gap-3 items-center">
                <div className="flex gap-2 items-center">
                  <label className=" block text-lg font-bold text-slate-100">OUT</label>
                  <CommonInput type="number" variant="compact"/>
                </div>

                <div className="flex gap-2 items-center">
                  <label className=" block text-lg font-bold text-slate-100">IN</label>
                  <CommonInput type="number" variant="compact"/>
                </div>

                <div className="flex gap-2 items-center justify-end">
                  <label className=" block text-lg font-bold text-slate-100">ODOMETER IN</label>
                  <CommonInput type="number" variant="compact"/>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-[0.47fr_0.5fr_0.6fr_0.47fr] rounded-2xl gap-2 items-center bg-black/10 p-3">
              <label className=" block text-lg font-bold text-slate-100">Checked By</label>
              <CommonInput variant="compact"/>

              <label className=" block text-lg font-bold text-slate-100">Hospital Representative</label>
              <CommonInput variant="compact"/>
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
