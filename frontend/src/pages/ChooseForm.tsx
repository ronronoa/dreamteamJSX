import { useNavigate } from "react-router";
import Logo from "../components/common/widgets/Logo";
import { ROUTES } from "../routes";
import CommonButton from "../components/common/widgets/CommonButton";

export default function ChooseForm() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-4 bg-cover bg-center relative"
    >
      <div className="absolute inset-0 bg-linear-to-b from-0% via-purple-800/50  to-[#5d1e76]" />

      <div className="relative flex flex-col items-center text-center gap-6">
        <Logo size={180} className="border-4 border-blue-300" />

        <div>
          <h1 className="text-white text-3xl font-bold leading-snug">
            DISASTER RISK REDUCTION AND
            <br />
            MANAGEMENT OFFICE
          </h1>
          <p className="text-white text-xl font-semibold mt-3">
            Emergency Logistics Management System
          </p>
        </div>

        <CommonButton
          variant="orange"
          onClick={() => navigate(ROUTES.CREATE_FORM)}
          className="w-60 text-2xl"
        >
          Create Report
        </CommonButton>

        <CommonButton
          variant="none"
          onClick={() => navigate(ROUTES.LOGIN)}
          className="bg-green-600 hover:bg-green-700 text-gray-300"
        >
          Log-in as Admin
        </CommonButton>
      </div>
    </div>
  );
}
