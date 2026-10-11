import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { useNavigate } from "react-router"

import CommonBackground from "../../components/common/background/CommonBackground"
import CommonButton from "../../components/common/widgets/CommonButton"
import PinModal from "../../modules/reportForms/modal/PinModal"
import VehicularStep1 from "@/modules/reportForms/VehicularDispatchForm/VehicularStep1"
import VehicularStep2 from "@/modules/reportForms/VehicularDispatchForm/VehicularStep2"
import VehicularStep3 from "@/modules/reportForms/VehicularDispatchForm/VehicularStep3"
import CancelConfirmModal from "../../modules/reportForms/modal/CancelConfirmModal"
import CommonProgressBar from "../../modules/reportForms/component/CommonProgressBar"
import { ROUTES } from "../../routes"
import {
  fetchLatestVehicularDispatchReport,
  fetchVehicularDispatchFormOptions,
  submitVehicularDispatchReport,
  type VehicularDispatchFormOptions,
} from "../../api/vehicularDispatchForm"
import {
  createEmptyPerson,
  createEmptyVehicularDispatchReport,
  type VehicularDispatchDetails,
  type VehicularDispatchReportData,
  type VehicularDispatch,
  type Person,
} from "../../types/vehicularDispatchReport"
import { validateReport, validateStep, type VehicularDispatchErrors } from "../../modules/reportForms/VehicularDispatchForm/formValidation"
import { hasStoredReport, readStoredReport, removeStoredReport, saveStoredReport } from "../../modules/reportForms/reportFormStorage"

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
      responders: Array.isArray(details.responders)
        ? details.responders.filter((responder): responder is string => typeof responder === "string")
        : [],
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
  return !details.submitterName && !details.date && details.responders.length === 0 &&
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
        <p className="mt-3 text-base text-slate-600">The dispatch report was submitted and is now pending review.</p>
      </section>
    </CommonBackground>
  )
}

export default function VehicularDispatchForm() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [pinModalShow, setPinModalShow] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [pinError, setPinError] = useState<string>()
  const [formOptions, setFormOptions] = useState<VehicularDispatchFormOptions>({ vehicles: [], responders: [] })
  const [optionsLoading, setOptionsLoading] = useState(true)
  const [optionsError, setOptionsError] = useState("")
  const [optionsRequestId, setOptionsRequestId] = useState(0)
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
  const selectedVehicle = formOptions.vehicles.find((vehicle) => vehicle.vehicle_id === formData.dispatch.vehicle)
  const vehicleLabel = selectedVehicle ? `${selectedVehicle.vehicle_name} (${selectedVehicle.plate_number})` : ""
  const responderLabels = formData.details.responders.flatMap((responderId) => {
    const responder = formOptions.responders.find((option) => option.user_id === responderId)
    return responder ? [responder.name] : []
  })

  useEffect(() => {
    let isCurrentRequest = true
    async function loadOptions() {
      setOptionsLoading(true)
      setOptionsError("")
      try {
        const options = await fetchVehicularDispatchFormOptions()
        if (isCurrentRequest) setFormOptions(options)
      } catch (error) {
        if (isCurrentRequest) setOptionsError(error instanceof Error ? error.message : "Could not load available vehicles.")
      } finally {
        if (isCurrentRequest) setOptionsLoading(false)
      }
    }
    void loadOptions()
    return () => { isCurrentRequest = false }
  }, [optionsRequestId])

  useEffect(() => {
    if (hasStoredReport(DRAFT_STORAGE_KEY, LATEST_STORAGE_KEY)) return
    let isCurrentRequest = true
    async function loadLatestReport() {
      try {
        const report = await fetchLatestVehicularDispatchReport()
        if (!isCurrentRequest || !report) return
        const normalizedReport = normalizeReport(report)
        setFormData(normalizedReport)
        saveStoredReport(LATEST_STORAGE_KEY, normalizedReport)
      } catch (error) {
        console.error("Could not load the latest vehicular dispatch report:", error)
      }
    }
    void loadLatestReport()
    return () => { isCurrentRequest = false }
  }, [])

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

  const openPinModal = () => {
    const errors = validateReport(formData)
    setValidationErrors(errors)
    if (Object.keys(errors).length > 0) return
    setPinError(undefined)
    setPinModalShow(true)
  }

  const submitForm = async (pin: string) => {
    setIsSubmitting(true)
    setPinError(undefined)
    try {
      await submitVehicularDispatchReport(pin, formData)
      saveStoredReport(LATEST_STORAGE_KEY, normalizeReport(formData))
      removeStoredReport(DRAFT_STORAGE_KEY)
      setPinModalShow(false)
      setFormData(createEmptyVehicularDispatchReport())
      setStep(SUCCESS_STEP)
    } catch (error) {
      setPinError(error instanceof Error ? error.message : "Could not submit the vehicular dispatch report.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (step === SUCCESS_STEP) return <VehicularDispatchSuccess />

  return (
    <>
      {pinModalShow && (
        <PinModal
          title="VEHICULAR DISPATCH REPORT"
          open={pinModalShow}
          onClose={() => setPinModalShow(false)}
          onSubmit={submitForm}
          loading={isSubmitting}
          error={pinError}
        />
      )}
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
                      vehicleOptions={formOptions.vehicles.map((vehicle) => ({
                        label: `${vehicle.vehicle_name} (${vehicle.plate_number})`,
                        value: vehicle.vehicle_id,
                      }))}
                      responderOptions={formOptions.responders.map((responder) => ({
                        label: responder.name,
                        value: responder.user_id,
                      }))}
                      optionsLoading={optionsLoading}
                    />
                  )}
                  {step === 2 && (
                    <VehicularStep2
                      people={formData.passengers}
                      onPeopleChange={updatePassengers}
                      errors={validationErrors}
                    />
                  )}
                  {step === 3 && (
                    <VehicularStep3
                      formData={formData}
                      vehicleLabel={vehicleLabel}
                      responderLabels={responderLabels}
                    />
                  )}
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

            {optionsError && (
              <div className="mt-2 flex items-center justify-between gap-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                <p role="alert">{optionsError}</p>
                <button type="button" className="shrink-0 font-semibold underline" onClick={() => setOptionsRequestId((current) => current + 1)}>
                  Retry
                </button>
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
                  className="min-w-[130px]"
                  disabled={Object.keys(allErrors).length > 0 || optionsLoading || Boolean(optionsError)}
                  onClick={openPinModal}
                >
                  Submit
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
