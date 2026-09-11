import { useState } from "react";
import { Mail, User } from "lucide-react";

import Logo from "../components/common/widgets/Logo";
import Modal from "../components/common/modals/Modal";
import Spinner from "../components/common/widgets/Spinner";
import CommonButton from "../components/common/widgets/CommonButton";
import LoadingScreen from "../components/common/LoadingScreen";
import ForgotPasswordModal from "../components/common/modals/ForgetPassModal";
import ContactAdminModal from "../components/common/modals/ContactAdminModal";
import CommonBackground from "../components/common/background/CommonBackground";
import CommonInput from "../components/common/widgets/CommonInput";
import CommonCheckbox from "../components/common/widgets/CommonCheckbox";
import CommonSelect from "../components/common/widgets/CommonSelect";
import CommonTextarea from "../components/common/widgets/CommonTextarea";
import CommonTimeInput from "../components/common/widgets/CommonTimeInput";

function ShowcaseSection({ title, children, }: { title: string; children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold text-slate-900">{title}</h2>
      <div className="flex min-h-44 flex-wrap items-center justify-center gap-8 rounded-xl bg-slate-50 p-6">
        {children}
      </div>
    </section>
  );
}

/**
 * Development-only visual reference for shared UI components. 
 *
 *  http://localhost:5173/test-components
 *  remove after development
 **/
export default function TestComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isForgotPassModalOpen, setIsForgotPassModalOpen] = useState(false);
  const [isContactAdminModalOpen, setIsContactAdminModalOpen] = useState(false);
  const [backgroundActive, setBackgroundActive] = useState(false);

  const [isLoading, setIsLoading] = useState(true);



  return (
    <CommonBackground 
      variant={backgroundActive ? "purpleGradient" : "none"}
      className="min-h-screen px-4 py-10 sm:px-6 transition-colors duration-250">

      {isLoading && (
        <>
          <CommonButton className="z-999 fixed bottom-1/3 left-1/2 -translate-x-1/2" onClick={() => setIsLoading(false)}>Remove Loading</CommonButton>
          <LoadingScreen />
        </>
      )}

      <div className="mx-auto w-full max-w-6xl space-y-6">
        <header className="text-center">
          <h1> Component showcase </h1>
        </header>

        <div className="grid gap-6 ">

          <ShowcaseSection title="Logo">
            <Logo size={80} />
            <Logo size={110} />
            <Logo size={140} />
          </ShowcaseSection>

          <ShowcaseSection title="Spinner">
            <Spinner size={24} />
            <Spinner size={40} />
            <Spinner size={56} />
          </ShowcaseSection>


          <ShowcaseSection title="CommonButton">
            <CommonButton variant="purple" className="max-w-[150px] min-w-[100px]">Purple</CommonButton>
            <CommonButton variant="orange" className="max-w-[150px] min-w-[100px]">orange</CommonButton>
            <CommonButton variant="gray"  className="max-w-[150px]  min-w-[100px]">gray</CommonButton>
          </ShowcaseSection>

          <ShowcaseSection title="CommonInput">
            <div className="flex flex-col gap-5 w-full max-w-100">
              <CommonInput
                id="email"
                label="Email Address"
                type="email"
                icon={<Mail size={18}/>}
                placeholder="admin@gmail.com"
              />
              <CommonInput id="name" label="Name" type="text" icon={<User size={18}/>} placeholder="placeholder" />

              <CommonInput
                variant="compact"
                label="Name of Submitter (compact)"
                placeholder="Place holder"
              />
            </div>
          </ShowcaseSection>

          <ShowcaseSection title="Modal">
            <CommonButton
              onClick={() => setIsModalOpen(true)}>
              Open Modal
            </CommonButton>

            <CommonButton variant="orangeLinear" onClick={() => setIsForgotPassModalOpen(true)}> Open ForgotPass </CommonButton> 
            <CommonButton variant="orangeLinear" onClick={() => setIsContactAdminModalOpen(true)}> Open ContactAdmin </CommonButton> 
          </ShowcaseSection>

          <ShowcaseSection title="CommonCheckbox">
            <div className="flex flex-col gap-3">
              <CommonCheckbox label="Default checkbox" />
              <CommonCheckbox label="Checked checkbox" defaultChecked />
              <CommonCheckbox label="Disabled checkbox" disabled />
            </div>
          </ShowcaseSection>

          <ShowcaseSection title="CommonSelect">
            <div className="w-full max-w-100 space-y-5">
              <CommonSelect
                id="department"
                label="Department"
                placeholder="Select a department"
                options={[
                  { label: "DRRMO", value: "drrmo" },
                  { label: "BHERT", value: "bhert" },
                  { label: "Barangay Office", value: "barangay" },
                ]}
              />

              <CommonSelect
                id="vehicle"
                label="Vehicle"
                variant="compact"
                options={[
                  { label: "Ambulance", value: "ambulance" },
                  { label: "Rescue Truck", value: "rescue-truck" },
                  { label: "Patrol Vehicle", value: "patrol" },
                ]}
              />
            </div>
          </ShowcaseSection>

          <ShowcaseSection title="CommonTextarea">
            <div className="w-full max-w-100 space-y-5">
              <CommonTextarea
                id="description"
                label="Description"
                placeholder="Enter a description..."
                rows={5}
              />

              <CommonTextarea
                id="compact-description"
                label="Compact Description"
                variant="compact"
                placeholder="Enter a description..."
                rows={5}
              />
            </div>
          </ShowcaseSection>

          <ShowcaseSection title="CommonTimeInput">
            <div className="w-full max-w-100">
              <CommonTimeInputShowcase />
            </div>
          </ShowcaseSection>

          <ShowcaseSection title="CommonBackground">
            <div className="h-[250px] w-[250px] gap-2 flex flex-col">
              <CommonBackground variant="purpleGradient" className="border-2"/>
              <CommonButton variant="purple" onClick={() => setBackgroundActive(!backgroundActive)}> toggle</CommonButton> 
            </div>
          </ShowcaseSection>

        </div>
      </div>

      <Modal className="bg-white" open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold text-slate-900">Example modal</h2>
        <p className="mt-2 text-slate-600">
          Lorem ipsum.
        </p>
        <div className="mt-6 flex justify-end">
          <CommonButton
            variant="gray"
            type="button"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </CommonButton>
        </div>
      </Modal>


      <ForgotPasswordModal open={isForgotPassModalOpen} onClose={() => setIsForgotPassModalOpen(false)}/>
      <ContactAdminModal open={isContactAdminModalOpen} onClose={() => setIsContactAdminModalOpen(false)}/>

    </CommonBackground>
  );
}






function CommonTimeInputShowcase() {
  const [time, setTime] = useState("08:30")
  const [period, setPeriod] = useState<"AM" | "PM">("AM")

  return (
    <div className="space-y-3">
      <CommonTimeInput
        label="Departure Time"
        time={time}
        period={period}
        onTimeChange={setTime}
        onPeriodChange={setPeriod}
      />

      <div className="rounded-md bg-white p-3 text-sm text-slate-700">
        <p>Selected time: {time || "None"}</p>
        <p>Selected period: {period}</p>
      </div>
    </div>
  )
}
