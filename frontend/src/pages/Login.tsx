import { useState } from "react";

import Title from "../modules/login/component/Title";
import LoginCard from "../modules/login/component/LoginCard";

import ForgotPasswordModal from "../components/common/modals/ForgetPassModal";
import ContactAdminModal from "../components/common/modals/ContactAdminModal";
import CommonBackground from "../components/common/background/CommonBackground";

export default function Login() {
  const [
    isForgotPassModalOpen,
    setIsForgotPassModalOpen,
  ] = useState(false);

  const [
    isContactAdminModalOpen,
    setIsContactAdminModalOpen,
  ] = useState(false);

  return (
    <>
      <ForgotPasswordModal
        open={isForgotPassModalOpen}
        onClose={() => setIsForgotPassModalOpen(false)}
      />

      <ContactAdminModal
        open={isContactAdminModalOpen}
        onClose={() => setIsContactAdminModalOpen(false)}
      />

      <CommonBackground
        className="
          min-h-screen
          sm:flex
          items-center
          justify-center
          px-4 py-8
        "
      >

        <div
          className="
            w-full
            max-w-5xl
            lg:max-w-400

            flex flex-col
            lg:flex-row

            items-center
            justify-center

            gap-16
            lg:gap-40

            modal-open
          "
        >

          <Title />

          <LoginCard
            onForgotPassword={() =>
              setIsForgotPassModalOpen(true)
            }
            onCreateAccount={() =>
              setIsContactAdminModalOpen(true)
            }
          />

        </div>

      </CommonBackground>
    </>
  );
}
