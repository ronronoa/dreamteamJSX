import { useState } from "react";
import Logo from "../components/common/widgets/Logo";
import Modal from "../components/common/modals/Modal";
import Spinner from "../components/common/widgets/Spinner";
import CommonButton from "../components/common/widgets/CommonButton";
// import LoadingScreen from "../components/common/LoadingScreen";
import ForgotPasswordModal from "../components/common/modals/ForgetPassModal";
import ContactAdminModal from "../components/common/modals/ContactAdminModal";

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

  // return (<LoadingScreen/>)

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 sm:px-6">


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
            <CommonButton variant="purple" className="max-w-[100px] min-w-[100px]">Purple</CommonButton>
            <CommonButton variant="orange" className="max-w-[100px] min-w-[100px]">orange</CommonButton>
            <CommonButton variant="gray"  className="max-w-[100px]  min-w-[100px]">gray</CommonButton>
          </ShowcaseSection>

          <ShowcaseSection title="Modal">
            <CommonButton
              onClick={() => setIsModalOpen(true)}>
              Open Modal
            </CommonButton>

            <CommonButton variant="orangeLinear" onClick={() => setIsForgotPassModalOpen(true)}> Open ForgotPass </CommonButton> 
            <CommonButton variant="orangeLinear" onClick={() => setIsContactAdminModalOpen(true)}> Open ContactAdmin </CommonButton> 
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

    </main>
  );
}
