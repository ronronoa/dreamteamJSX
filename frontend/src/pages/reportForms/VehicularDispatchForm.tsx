import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { useNavigate } from "react-router"

import CommonBackground from "../../components/common/background/CommonBackground"
import CommonButton from "../../components/common/widgets/CommonButton"
import VehicularStep1 from "@/modules/reportForms/VehicularDispatchForm/VehicularStep1"
import VehicularStep2 from "@/modules/reportForms/VehicularDispatchForm/VehicularStep2"
import VehicularStep3 from "@/modules/reportForms/VehicularDispatchForm/VehicularStep3"
import CancelConfirmModal from "../../modules/reportForms/modal/CancelConfirmModal"
import CommonProgressBar from "../../modules/reportForms/component/CommonProgressBar"
import { ROUTES } from "../../routes"
import {
  createEmptyPerson,
  createEmptyVehicularDispatchReport,
  type VehicularDispatchDetails,
  type VehicularDispatchReportData,
  type VehicularDispatch,
  type Person,
} from "../../types/vehicularDispatchReport"
import { validateReport, validateStep, type VehicularDispatchErrors } from "../../modules/reportForms/VehicularDispatchForm/formValidation"
import { readStoredReport, removeStoredReport, saveStoredReport } from "../../modules/reportForms/reportFormStorage"

const DRAFT_STORAGE_KEY = "reportForms.vehicularDispatch.draft"
const LATEST_STORAGE_KEY = "reportForms.vehicularDispatch.latest"
const FORM_STEPS = 3
const SUCCESS_STEP = FORM_STEPS + 1
const SUCCESS_REDIRECT_DELAY_MS = 5000

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function storedString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback
}

function normalizePerson(value: unknown): Person {
  const emptyPerson = createEmptyPerson()
  if (!isRecord(value)) return emptyPerson

  const name = isRecord(value.name) ? value.name : {}
  const address = isRecord(value.address) ? value.address : {}
  const gender = value.gender === "Male" || value.gender === "Female" ? value.gender : ""

  return {
    id: storedString(value.id, emptyPerson.id),
    name: {
      surname: storedString(name.surname),
      firstName: storedString(name.firstName),
      middleInitial: storedString(name.middleInitial),
      suffix: storedString(name.suffix),
    },
    birthdate: storedString(value.birthdate),
    age: typeof value.age === "number" && Number.isFinite(value.age) ? value.age : "",
    gender,
    contactNumber: storedString(value.contactNumber),
    address: {
      phase: storedString(address.phase),
      package: storedString(address.package),
      block: storedString(address.block),
      lot: storedString(address.lot),
    },
  }
}

function normalizeReport(value: unknown): VehicularDispatchReportData {
  const emptyReport = createEmptyVehicularDispatchReport()
  if (!isRecord(value)) return emptyReport

  const details = isRecord(value.details) ? value.details : {}
  const dispatch = isRecord(value.dispatch) ? value.dispatch : {}
  return {
    details: {
      submitterName: storedString(details.submitterName),
      date: storedString(details.date),
      natureOfOperation: storedString(details.natureOfOperation),
      transfers: Array.isArray(details.transfers)
        ? details.transfers.filter((transfer): transfer is "Drop-Off" | "Pick-Up" => transfer === "Drop-Off" || transfer === "Pick-Up")
        : [],
    },
    dispatch: {
      from: storedString(dispatch.from),
      to: storedString(dispatch.to),
      vehicle: storedString(dispatch.vehicle),
      vehicleOther: storedString(dispatch.vehicleOther),
      driver: storedString(dispatch.driver),
      departTime: storedString(dispatch.departTime),
      departPeriod: dispatch.departPeriod === "PM" ? "PM" : "AM",
      arrivalTime: storedString(dispatch.arrivalTime),
      arrivalPeriod: dispatch.arrivalPeriod === "PM" ? "PM" : "AM",
      odometerIn: storedString(dispatch.odometerIn),
      odometerOut: storedString(dispatch.odometerOut),
    },
    passengers: Array.isArray(value.passengers) ? value.passengers.map(normalizePerson) : [],
  }
}

function isReportEmpty(report: VehicularDispatchReportData): boolean {
  const { details, dispatch, passengers } = report
  return !details.submitterName && !details.date && !details.natureOfOperation &&
    details.transfers.length === 0 && !dispatch.from && !dispatch.to &&
    !dispatch.vehicle && !dispatch.driver && !dispatch.departTime &&
    !dispatch.arrivalTime && !dispatch.odometerIn && !dispatch.odometerOut &&
    passengers.length === 0
}

function VehicularDispatchSuccess() {
  return (
    <CommonBackground className="flex min-h-screen items-center justify-center p-4">
      <section role="status" aria-live="polite" className="w-full max-w-lg rounded-2xl bg-white px-8 py-10 text-center shadow-2xl">
        <h1 className="text-2xl font-bold text-slate-900">Vehicular Dispatch Form Complete</h1>
        <p className="mt-3 text-base text-slate-600">This frontend preview is saved on this device. Backend submission will be connected later.</p>
      </section>
    </CommonBackground>
  )
}

export default function VehicularDispatchForm() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [formData, setFormData] = useState<VehicularDispatchReportData>(() => readStoredReport(
    DRAFT_STORAGE_KEY,
    LATEST_STORAGE_KEY,
    createEmptyVehicularDispatchReport,
    normalizeReport,
  ))
  const [validationErrors, setValidationErrors] = useState<VehicularDispatchErrors>({})
  const [confirmCancelModalShow, setConfirmCancelModalShow] = useState(false)

  const progress = (Math.min(step, FORM_STEPS) / FORM_STEPS) * 100
  const allErrors = validateReport(formData)

  useEffect(() => {
    if (step !== SUCCESS_STEP) return
    const redirectTimer = window.setTimeout(() => navigate(ROUTES.CHOOSE_FORM), SUCCESS_REDIRECT_DELAY_MS)
    return () => window.clearTimeout(redirectTimer)
  }, [navigate, step])

  useEffect(() => {
    if (isReportEmpty(formData)) {
      removeStoredReport(DRAFT_STORAGE_KEY)
      return
    }
    saveStoredReport(DRAFT_STORAGE_KEY, normalizeReport(formData))
  }, [formData])

  useEffect(() => {
    const hasUnsavedChanges = !isReportEmpty(formData)
    function handleBeforeUnload(event: BeforeUnloadEvent) {
      if (!hasUnsavedChanges) return
      event.preventDefault()
      event.returnValue = ""
    }
    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [formData])

  const variants = {
    enter: (slideDirection: number) => ({ x: slideDirection > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (slideDirection: number) => ({ x: slideDirection > 0 ? "-100%" : "100%", opacity: 0 }),
  }

  const updateDetails = (patch: Partial<VehicularDispatchDetails>) => {
    setFormData((current) => ({ ...current, details: { ...current.details, ...patch } }))
    setValidationErrors({})
  }

  const updateDispatch = (patch: Partial<VehicularDispatch>) => {
    setFormData((current) => ({ ...current, dispatch: { ...current.dispatch, ...patch } }))
    setValidationErrors({})
  }

  const updatePassengers = (passengers: Person[]) => {
    setFormData((current) => ({ ...current, passengers }))
    setValidationErrors({})
  }

  const nextStep = () => {
    if (step >= FORM_STEPS) return
    setValidationErrors(validateStep(step, formData))
    setDirection(1)
    setStep((current) => current + 1)
  }

  const previousStep = () => {
    if (step <= 1) return
    setDirection(-1)
    setValidationErrors({})
    setStep((current) => current - 1)
  }

  const completeForm = () => {
    const errors = validateReport(formData)
    setValidationErrors(errors)
    if (Object.keys(errors).length > 0) return
    saveStoredReport(LATEST_STORAGE_KEY, normalizeReport(formData))
    removeStoredReport(DRAFT_STORAGE_KEY)
    setStep(SUCCESS_STEP)
  }

  if (step === SUCCESS_STEP) return <VehicularDispatchSuccess />

  return (
    <>
      {confirmCancelModalShow && (
        <CancelConfirmModal
          title="VEHICULAR DISPATCH"
          open={confirmCancelModalShow}
          onClose={() => setConfirmCancelModalShow(false)}
          onConfirm={() => {
            setConfirmCancelModalShow(false)
            navigate(-1)
          }}
        />
      )}

      <CommonBackground className="min-h-screen p-4">
        <section className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl sm:items-center">
          <div className="mx-auto flex w-full flex-col">
            <div className="mb-5 mt-8 text-center">
              <h1 className="text-4xl font-bold text-white">VEHICULAR DISPATCH</h1>
            </div>

            <div className="relative w-full overflow-hidden">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={step}
                  variants={variants}
                  custom={direction}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.233, ease: "easeOut" }}
                >
                  {step === 1 && (
                    <VehicularStep1
                      details={formData.details}
                      onDetailsChange={updateDetails}
                      dispatch={formData.dispatch}
                      onDispatchChange={updateDispatch}
                      errors={validationErrors}
                    />
                  )}
                  {step === 2 && (
                    <VehicularStep2
                      people={formData.passengers}
                      onPeopleChange={updatePassengers}
                      errors={validationErrors}
                    />
                  )}
                  {step === 3 && <VehicularStep3 formData={formData} />}
                </motion.div>
              </AnimatePresence>
            </div>

            {step === FORM_STEPS && Object.keys(allErrors).length > 0 && (
              <div role="alert" className="mt-3 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
                <p className="font-semibold">Please fix these issues before completing the form:</p>
                <ul className="mt-1 list-inside list-disc">
                  {[...new Set(Object.values(allErrors))].map((message) => <li key={message}>{message}</li>)}
                </ul>
              </div>
            )}

            <div className="mt-4 flex h-14 w-full items-center justify-between rounded-md bg-white p-2">
              {step === 1 ? (
                <CommonButton onClick={() => setConfirmCancelModalShow(true)} variant="gray">Cancel</CommonButton>
              ) : (
                <CommonButton variant="gray" className="min-w-[130px]" onClick={previousStep}>Go back</CommonButton>
              )}
              <CommonProgressBar progress={progress} />
              {step === FORM_STEPS ? (
                <CommonButton
                  variant={Object.keys(allErrors).length === 0 ? "purple" : "gray"}
                  disabled={Object.keys(allErrors).length > 0}
                  className="min-w-[130px]"
                  onClick={completeForm}
                >
                  Complete
                </CommonButton>
              ) : (
                <CommonButton className="min-w-[130px]" onClick={nextStep}>Next</CommonButton>
              )}
            </div>
          </div>
        </section>
      </CommonBackground>
    </>
  )
}
