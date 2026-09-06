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

  const [isLoading, setIsLoading] = useState(false);


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
