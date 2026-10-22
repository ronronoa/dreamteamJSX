import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

import CommonBackground from "../../components/common/background/CommonBackground"
import CommonButton from "../../components/common/widgets/CommonButton"

import PatientStep1 from "../../modules/reportForms/NewPatientLogForm/PatientStep1"
import PatientStep2 from "../../modules/reportForms/NewPatientLogForm/PatientStep2"
import PatientStep3 from "../../modules/reportForms/NewPatientLogForm/PatientStep3"
import PatientStep4 from "../../modules/reportForms/NewPatientLogForm/PatientStep4"
import PatientLogLastStep from "../../modules/reportForms/NewPatientLogForm/PatientLogLastStep"
import {
  isFormComplete,
  isFormEmpty,
  isStep1Complete,
  isStep2Complete,
  isStep3Complete,
} from "../../modules/reportForms/NewPatientLogForm/formValidation"

import {
  createEmptyPatientLogData,
  type PatientLogData,
  type ResponderDetails,
  type VehicularDispatch,
  type PatientDetails,
  type FirstAidHospitalDetails,
  type WaiverForm,
  type InventoryItem,
} from "../../types/patientLog"
import { fetchLatestPatientReport, submitPatientLog } from "../../api/patientForm"
import { fetchPatientFormOptions, type PatientFormOptions } from "../../api/patientForm"
import { useNavigate } from "react-router"
import PinModal from "../../modules/reportForms/modal/PinModal"
import CancelConfirmModal from "../../modules/reportForms/modal/CancelConfirmModal"
import CommonProgressBar from "../../modules/reportForms/component/CommonProgressBar"
import { hasStoredReport, readStoredReport, removeStoredReport, saveStoredReport } from "../../modules/reportForms/reportFormStorage"
import { getCurrentDateInputValue, getCurrentTimeInputValue } from "@/utils/dateTime"

const PATIENT_DRAFT_KEY = "reportForms.patient.draft"
const PATIENT_LATEST_KEY = "reportForms.patient.latest"

function normalizeDisposition(value: unknown): ResponderDetails["dispositionType"] {
  if (Array.isArray(value)) {
    return normalizeDisposition(value[0])
  }

  if (typeof value !== "string") return ""

  const normalizedValue = value.toLowerCase().replaceAll("_", "-").trim()
  if (normalizedValue === "pick-up") return "PICK_UP"
  if (normalizedValue === "drop-off") return "DROP_OFF"
  return ""
}

function normalizePatientReport(value: unknown): PatientLogData {
  const emptyReport = createEmptyPatientLogData()
  if (typeof value !== "object" || value === null) return emptyReport

  const report = value as Partial<PatientLogData> & {
    responderDetails?: Partial<ResponderDetails> & { teamAssigned?: unknown }
  }
  const {
    teamAssigned: legacyTeamAssigned,
    ...savedResponderDetails
  } = report.responderDetails ?? {}
  const dispositionType = normalizeDisposition(
    savedResponderDetails.dispositionType || legacyTeamAssigned,
  )

  return {
    ...emptyReport,
    ...report,
    responderDetails: {
      ...emptyReport.responderDetails,
      ...savedResponderDetails,
      date: getCurrentDateInputValue(),
      time: getCurrentTimeInputValue(),
      dispositionType,
    },
    dispatch: { ...emptyReport.dispatch, ...report.dispatch },
    patientDetails: {
      ...emptyReport.patientDetails,
      ...report.patientDetails,
      name: { ...emptyReport.patientDetails.name, ...report.patientDetails?.name },
      contactPerson: { ...emptyReport.patientDetails.contactPerson, ...report.patientDetails?.contactPerson },
      address: { ...emptyReport.patientDetails.address, ...report.patientDetails?.address },
    },
    firstAidHospital: {
      ...emptyReport.firstAidHospital,
      ...report.firstAidHospital,
      bp: "90/120",
      temp: "36",
      pr: "60",
      spo2: "90",
      hospitalRepresentative: {
        ...emptyReport.firstAidHospital.hospitalRepresentative,
        ...report.firstAidHospital?.hospitalRepresentative,
      },
    },
    waiverForm: {
      description: typeof report.waiverForm?.description === "string" ? report.waiverForm.description : "",
      images: [],
    },
    inventory: [],
  }
}
import { ROUTES } from "../../routes"
import { useTitle } from "@/hooks/useTitle"

const PATIENT_LOG_SUCCESS_STEP = 5
const SUCCESS_REDIRECT_DELAY_MS = 5000

export default function PatientLogForm() {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [pinModalShow, setPinModalShow] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [pinError, setPinError] = useState<string>()
  const [formOptions, setFormOptions] = useState<PatientFormOptions>({ teams: [], responders: [], vehicles: [] })
  const [optionsLoading, setOptionsLoading] = useState(true)
  const [optionsError, setOptionsError] = useState("")
  const [optionsRequestId, setOptionsRequestId] = useState(0)
  const [formData, setFormData] = useState<PatientLogData>(() => readStoredReport(
    PATIENT_DRAFT_KEY,
    PATIENT_LATEST_KEY,
    createEmptyPatientLogData,
    normalizePatientReport,
  ))
  const [confirmCancelModalShow, setConfirmCancelModalShow] = useState(false)

  const navigate = useNavigate()
  useTitle("Patient Form")

  const totalSteps = 4
  const progress = (step / totalSteps) * 100
  const validationMessages = [
    ...(!isStep1Complete(formData) ? ["Complete the responder details and dispatch information."] : []),
    ...(!isStep2Complete(formData) ? ["Complete the patient and hospital details."] : []),
    ...(!isStep3Complete(formData) ? ["Complete or remove each incomplete inventory item."] : []),
  ]

  const VARIANTS = {
    enter: (direction: number) => ({ x: direction > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction > 0 ? "-100%" : "100%", opacity: 0 }),
  }

  useEffect(() => {
    let isCurrentRequest = true
    async function loadOptions() {
      setOptionsLoading(true)
      setOptionsError("")
      try {
        const options = await fetchPatientFormOptions()
        if (isCurrentRequest) setFormOptions(options)
      } catch (error) {
        if (isCurrentRequest) setOptionsError(error instanceof Error ? error.message : "Could not load patient form options.")
      } finally {
        if (isCurrentRequest) setOptionsLoading(false)
      }
    }
    void loadOptions()
    return () => { isCurrentRequest = false }
  }, [optionsRequestId])

  useEffect(() => {
    if (hasStoredReport(PATIENT_DRAFT_KEY, PATIENT_LATEST_KEY)) return
    let isCurrentRequest = true

    async function loadLatestReport() {
      try {
        const latestReport = await fetchLatestPatientReport()
        if (!isCurrentRequest || !latestReport) return
        const normalizedReport = normalizePatientReport(latestReport)
        setFormData(normalizedReport)
        saveStoredReport(PATIENT_LATEST_KEY, normalizedReport)
      } catch (error) {
        console.error("Could not load the latest patient report:", error)
      }
    }

    void loadLatestReport()
    return () => { isCurrentRequest = false }
  }, [])

  useEffect(() => {
    if (step !== PATIENT_LOG_SUCCESS_STEP) return

    const redirectTimer = window.setTimeout(() => {
      navigate(ROUTES.CHOOSE_FORM)
    }, SUCCESS_REDIRECT_DELAY_MS)

    return () => window.clearTimeout(redirectTimer)
  }, [navigate, step])

  const nextStep = () => {
    if (step >= totalSteps) return
    setDirection(1)
    setStep((current) => current + 1)
  }

  const previousStep = () => {
    if (step <= 1) return
    setDirection(-1)
    setStep((current) => current - 1)
  }

  const updateResponderDetails = (patch: Partial<ResponderDetails>) => {
    setFormData((current) => ({
      ...current,
      responderDetails: { ...current.responderDetails, ...patch },
    }))
  }

  const updateDispatch = (patch: Partial<VehicularDispatch>) => {
    setFormData((current) => ({
      ...current,
      dispatch: { ...current.dispatch, ...patch },
    }))
  }

  const updatePatientDetails = (patch: Partial<PatientDetails>) => {
    setFormData((current) => ({
      ...current,
      patientDetails: { ...current.patientDetails, ...patch },
    }))
  }

  const updateFirstAidHospital = (patch: Partial<FirstAidHospitalDetails>) => {
    setFormData((current) => ({
      ...current,
      firstAidHospital: { ...current.firstAidHospital, ...patch },
    }))
  }

  const updateWaiverForm = (patch: Partial<WaiverForm>) => {
    setFormData((current) => ({
      ...current,
      waiverForm: { ...current.waiverForm, ...patch },
    }))
  }

  const updateInventory = (inventory: InventoryItem[]) => {
    setFormData((current) => ({ ...current, inventory }))
  }

  const openPinModal = () => {
    if (!isFormComplete(formData)) return
    setPinError(undefined)
    setPinModalShow(true)
  }

  const handleSubmit = async (pin: string) => {
    setIsSubmitting(true)
    setPinError(undefined)

    try {
      await submitPatientLog(pin, formData)
      saveStoredReport(PATIENT_LATEST_KEY, normalizePatientReport(formData))
      removeStoredReport(PATIENT_DRAFT_KEY)
      setPinModalShow(false)
      setFormData(createEmptyPatientLogData())
      setStep(5)
    } catch (error) {
      console.error("Failed to submit patient log:", error)
      setPinError(error instanceof Error ? error.message : "Could not submit the patient report.")
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (!isFormEmpty(formData)) saveStoredReport(PATIENT_DRAFT_KEY, normalizePatientReport(formData))
  }, [formData])

  useEffect(() => {
    const hasUnsavedChanges = !isFormEmpty(formData)

    function handleBeforeUnload(event: BeforeUnloadEvent) {
      if (!hasUnsavedChanges) return
      event.preventDefault()
      event.returnValue = ""
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [formData])

  if (step === PATIENT_LOG_SUCCESS_STEP) return <PatientLogLastStep />

  return (
    <>
      {pinModalShow && (
        <PinModal
          title="NEW PATIENT LOG"
          open={pinModalShow}
          onClose={() => setPinModalShow(false)}
          onSubmit={handleSubmit}
          loading={isSubmitting}
          error={pinError}
        />
      )}

      {confirmCancelModalShow && (
        <CancelConfirmModal
          title="NEW PATIENT LOG"
          open={confirmCancelModalShow}
          onClose={() => setConfirmCancelModalShow(false)}
          onConfirm={() => {
            setConfirmCancelModalShow(false)
            navigate(-1)
          }}
        />
      )}

      <CommonBackground className="min-h-screen p-4">
        <section className="mx-auto flex w-full max-w-6xl min-h-[calc(100vh-3rem)] sm:items-center modal-open">
          <div className="mx-auto flex w-full flex-col">
            <div className="mb-5 mt-8 text-center">
              <h1 className="text-4xl font-bold text-white">PATIENT LOG FORM</h1>
            </div>

            <div className="relative w-full ">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={step}
                  variants={VARIANTS}
                  custom={direction}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.233, ease: "easeOut" }}
                >
                  {step === 1 && (
                    <PatientStep1
                      responderDetails={formData.responderDetails}
                      onResponderDetailsChange={updateResponderDetails}
                      dispatch={formData.dispatch}
                      onDispatchChange={updateDispatch}
                      options={formOptions}
                      optionsLoading={optionsLoading}
                    />
                  )}

                  {step === 2 && (
                    <PatientStep2
                      patientDetails={formData.patientDetails}
                      onPatientDetailsChange={updatePatientDetails}
                      firstAidHospital={formData.firstAidHospital}
                      onFirstAidHospitalChange={updateFirstAidHospital}
                    />
                  )}

                  {step === 3 && (
                    <PatientStep3
                      waiverForm={formData.waiverForm}
                      onWaiverFormChange={updateWaiverForm}
                      inventory={formData.inventory}
                      onInventoryChange={updateInventory}
                    />
                  )}

                  {step === 4 && <PatientStep4 formData={formData} options={formOptions} />}
                </motion.div>
              </AnimatePresence>
            </div>

            {step === totalSteps && validationMessages.length > 0 && (
              <div role="alert" className="mt-3 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
                <p className="font-semibold">Please fix these issues before completing the form:</p>
                <ul className="mt-1 list-inside list-disc">
                  {validationMessages.map((message) => <li key={message}>{message}</li>)}
                </ul>
              </div>
            )}

            {optionsError && (
              <div className="mt-2 flex items-center justify-between gap-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                <p role="alert">{optionsError}</p>
                <button
                  type="button"
                  className="shrink-0 font-semibold underline"
                  onClick={() => setOptionsRequestId((current) => current + 1)}
                >
                  Retry
                </button>
              </div>
            )}
            {optionsLoading && <p role="status" className="mt-2 text-sm text-slate-600">Loading form options…</p>}

            <div className="mt-4 flex h-14 w-full items-center justify-between rounded-md bg-white p-2">
              {step === 1 && (
                <CommonButton
                  onClick={() => setConfirmCancelModalShow(true)}
                  variant="gray"
                  className="min-w-[130px]"
                >
                  Cancel
                </CommonButton>
              )}

              {step > 1 && (
                <CommonButton
                  variant="gray"
                  className="min-w-[130px]"
                  onClick={previousStep}
                  disabled={step === 1}
                >
                  Go back
                </CommonButton>
              )}

              <CommonProgressBar progress={progress} />

              {step === totalSteps ? (
                <CommonButton
                  variant={isFormComplete(formData) ? "purple" : "gray"}
                  disabled={!isFormComplete(formData)}
                  className="min-w-[130px]"
                  onClick={openPinModal}
                >
                  Submit
                </CommonButton>
              ) : (
                <CommonButton
                  className="min-w-[130px]"
                  onClick={nextStep}
                  disabled={step === 1 && (optionsLoading || Boolean(optionsError))}
                >
                  Next
                </CommonButton>
              )}
            </div>
          </div>
        </section>
      </CommonBackground>
    </>
  )
}
