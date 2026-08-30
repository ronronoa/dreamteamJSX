import { useNavigate } from "react-router"
import CommonButton from "../components/common/widgets/CommonButton"
import { ROUTES } from "../routes";

export default function CreateForm() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-linear-to-b from-0% via-purple-800/50  to-[#5d1e76] px-4 py-10 sm:px-6">

      <div className="mx-auto w-full max-w-6xl space-y-6">

        <section className="w-full flex flex-row justify-between">
          <div className="justify-start gap-2 flex flex-row p-1">
            <CommonButton>
              Operation Log
            </CommonButton>

            <CommonButton>
              Operation Log
            </CommonButton>

            <CommonButton>
              Operation Log
            </CommonButton>
          </div>

          <div className="justify-end gap-2 flex flex-row p-1">
            <CommonButton
              variant="none"
              className="bg-green-500 text-white"
              onClick={() => navigate(ROUTES.LOGIN)}
            >
              Log-In as Admin
            </CommonButton>
          </div>
        </section>


        <section className="w-full border p-4 bg-white rounded-2xl">
          <div className="p-1 flex flex-row justify-between gap-6">

            <div className="w-full">
              <label
                className="block text-sm font-semibold text-gray-800 mb-1.5"
              >
                Date of Operation
              </label>
              <div className="relative">
                <input
                  id="date"
                  type="date"
                  placeholder="admin@gmail.com"
                  className="w-full border-2 rounded-xl pl-4 pr-4 py-3 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
                />
              </div>
            </div>

            <div className="w-full">
              <label
                className="block text-sm font-semibold text-gray-800 mb-1.5"
              >
                Name of Submitter
              </label>
              <div className="relative">
                <select
                  id="nameOfSubmitter"
                  className="w-full border-2 rounded-xl pl-4 pr-4 py-3 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-orange-400 shadow-sm invalid:text-gray-400"
                >
                  <option value="" disabled>
                    Choose requested role (e.g. BHERT Responder, DRRM Officer...)
                  </option>
                  <option value="bhert-responder">BHERT Responder</option>
                  <option value="drrm-officer">DRRM Officer</option>
                  <option value="other">Other</option>
                </select>

              </div>
            </div>

            <div className="w-full">
              <label
                className="block text-sm font-semibold text-gray-800 mb-1.5"
              >
                Name of Caller
              </label>
              <div className="relative">
                <select
                  id="nameOfSubmitter"
                  className="w-full border-2 rounded-xl pl-4 pr-4 py-3 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-orange-400 shadow-sm invalid:text-gray-400"
                >
                  <option value="" disabled>
                    Choose requested role (e.g. BHERT Responder, DRRM Officer...)
                  </option>
                  <option value="bhert-responder">BHERT Responder</option>
                  <option value="drrm-officer">DRRM Officer</option>
                  <option value="other">Other</option>
                </select>

              </div>
            </div>
          </div>

          <div className="p-1 flex flex-row justify-between gap-6">

            <div className="w-full border">
              <label
                className="block text-sm font-semibold text-gray-800 mb-1.5"
              >
                Nature of Operation
              </label>
              <div className="relative">
                <select
                  id="nameOfSubmitter"
                  className="w-full border-2 rounded-xl pl-4 pr-4 py-3 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-orange-400 shadow-sm invalid:text-gray-400"
                >
                  <option value="" disabled>
                    Choose requested role (e.g. BHERT Responder, DRRM Officer...)
                  </option>
                  <option value="bhert-responder">BHERT Responder</option>
                  <option value="drrm-officer">DRRM Officer</option>
                  <option value="other">Other</option>
                </select>

              </div>
            </div>
          </div>
        </section>

      </div>

    </main>
  )
}
