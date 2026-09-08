import { Undo2, LifeBuoy, UserPlus2, Newspaper, Car } from "lucide-react";
import CommonButton from "../components/common/widgets/CommonButton";
import CommonBackground from "../components/common/background/CommonBackground";
import { useNavigate } from "react-router";
import { ROUTES } from "../routes";

export default function ChooseForm() {
  const navigate = useNavigate()

  return (
    <CommonBackground className="min-h-screen p-4 ">

      <section className="
        mx-auto flex w-full max-w-6xl min-h-[calc(100vh-7rem)] sm:items-center
        "
      >

        <div className=" mx-auto w-full flex flex-col lg:min-h-[700px] lg:max-h-[1000px] modal-open">

          <div>
            <CommonButton 
              onClick={() => navigate(ROUTES.LOGIN)}
              className="flex w-full sm:w-auto items-center justify-center"
            >
              <Undo2 size={64} />
            </CommonButton>
          </div>

          <div className="mt-8 mb-16 text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              Make a report...
            </h1>
          </div>

          <div className="flex items-center justify-center">
            <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

              <CommonButton
                variant="orange"
                className="flex h-32 sm:h-64 w-full flex-col items-center justify-center"
              >
                <LifeBuoy size={200} />
                <h1 className="mt-3 text-xl sm:text-2xl">
                  OPERATION LOG
                </h1>
              </CommonButton>

              <CommonButton
                variant="orange"
                className="flex h-32 sm:h-64 w-full flex-col items-center justify-center"
              >
                <UserPlus2 size={200} />
                <h1 className="mt-3 text-xl sm:text-2xl">
                  NEW PATIENT LOG
                </h1>
              </CommonButton>

              <CommonButton
                variant="orange"
                className="flex h-32 sm:h-64 w-full flex-col items-center justify-center"
              >
                <Newspaper size={200} />
                <h1 className="mt-3 text-xl sm:text-2xl">
                  PATIENT LOG
                </h1>
              </CommonButton>

              <CommonButton
                variant="orange"
                className="flex h-32 sm:h-64 w-full flex-col items-center justify-center"
              >
                <Car size={200} />
                <h1 className="mt-3 text-xl sm:text-2xl">
                  VEHICULAR DISPATCH
                </h1>
              </CommonButton>

            </div>
          </div>

        </div>

      </section>
    </CommonBackground>
  );
}
