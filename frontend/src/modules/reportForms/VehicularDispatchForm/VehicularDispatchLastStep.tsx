import { CircleCheck } from "lucide-react"

import CommonBackground from "../../../components/common/background/CommonBackground"

export default function VehicularDispatchLastStep() {
  return (
    <CommonBackground className="flex min-h-screen items-center justify-center p-4">
      <section
        role="status"
        aria-live="polite"
        className="w-full max-w-lg rounded-2xl bg-white px-8 py-10 text-center shadow-2xl"
      >
        <CircleCheck aria-hidden="true" className="mx-auto mb-5 h-20 w-20 text-emerald-600" />
        <h1 className="text-2xl font-bold text-slate-900">Vehicular Dispatch Submitted</h1>
        <p className="mt-3 text-base text-slate-600">Log is now under admin review</p>
      </section>
    </CommonBackground>
  )
}
