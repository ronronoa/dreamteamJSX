import { useNavigate } from "react-router"
import CommonButton from "../../../components/common/widgets/CommonButton"
import Logo from "../../../components/common/widgets/Logo"
import { ROUTES } from "../../../routes"

export default function Title(){

  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center text-center gap-6">
      <Logo size={180} />

      <div>
        <h1 className="text-white text-2xl lg:text-3xl font-bold leading-snug">
          DISASTER RISK REDUCTION
          <br />
          AND MANAGEMENT OFFICE
        </h1>
        <p className="text-white text-xl lg:text-2xl font-semibold mt-6">
          Emergency Logistics Management System
        </p>
      </div>


      <CommonButton
        variant="someKindOfUniquePurpleToOrange"
        className="text-xl"
      >
        Create Report with AI
      </CommonButton>

      <CommonButton
        variant="orange"
        onClick={() => navigate(ROUTES.CHOOSE_FORM)}
      >
        Manual Report
      </CommonButton>
    </section>
  )
}
