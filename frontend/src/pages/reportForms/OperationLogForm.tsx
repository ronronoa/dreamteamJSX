import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

import CommonBackground from "../../components/common/background/CommonBackground"
import CommonButton from "../../components/common/widgets/CommonButton"

import OperationStep1 from "../../modules/reportForms/OperationLogForm/OperationStep1"
import OperationStep2 from "../../modules/reportForms/OperationLogForm/OperationStep2"
import OperationStep3 from "../../modules/reportForms/OperationLogForm/OperationStep3"
import OperationStep4 from "../../modules/reportForms/OperationLogForm/OperationStep4"
import OperationLogLastStep from "../../modules/reportForms/OperationLogForm/OperationLogLastStep"
import { isFormComplete, isFormEmpty, validateStep, type FormErrors } from "../../modules/reportForms/OperationLogForm/formValidation"

import {
  createEmptyOperationLogData,
  type OperationDetails,
  type OperationLogData,
  type VehicularDispatch,
  type InventoryItem,
  type OperationDescription,
} from "../../types/operationLog"
import { fetchLatestOperationReport, fetchOperationFormOptions, submitOperationLog, type OperationFormOptions } from "../../api/operationForm"
import { useNavigate } from "react-router"
import PinModal from "../../modules/reportForms/modal/PinModal"
import CancelConfirmModal from "../../modules/reportForms/modal/CancelConfirmModal"
import CommonProgressBar from "../../modules/reportForms/component/CommonProgressBar"
import { ROUTES } from "../../routes"
import { hasStoredReport, readStoredReport, removeStoredReport, saveStoredReport } from "../../modules/reportForms/reportFormStorage"

const OPERATION_DRAFT_KEY = "reportForms.operation.draft"
const OPERATION_LATEST_KEY = "reportForms.operation.latest"

function normalizeTimeInput(value: unknown): string {
  if (typeof value !== "string") return ""

  const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim())
  if (!match) return value

  const hour = Number(match[1])
  const minute = Number(match[2])
  if (hour < 1 || hour > 12 || minute > 59) return value

  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
}

function normalizeOperationReport(value: unknown): OperationLogData {
  const emptyReport = createEmptyOperationLogData()
  if (typeof value !== "object" || value === null) return emptyReport

  const report = value as Partial<OperationLogData>
  return {
    ...emptyReport,
    ...report,
    operationDetails: {
      ...emptyReport.operationDetails,
      ...report.operationDetails,
      date: emptyReport.operationDetails.date
    },
    dispatch: {
      ...emptyReport.dispatch,
      ...report.dispatch,
      departTime: normalizeTimeInput(report.dispatch?.departTime),
      arrivalTime: normalizeTimeInput(report.dispatch?.arrivalTime),
    },
    people: Array.isArray(report.people) ? report.people : [],
    operationDescription: {
      ...emptyReport.operationDescription,
      ...report.operationDescription,
      images: [],
    },
    // inventory: Array.isArray(report.inventory) ? report.inventory : [],
    inventory:[],
  }
}

export default function OperationLogForm() {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [pinModalShow, setPinModalShow] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [pinError, setPinError] = useState<string>()
  const [formData, setFormData] = useState<OperationLogData>(() => readStoredReport(
    OPERATION_DRAFT_KEY,
    OPERATION_LATEST_KEY,
    createEmptyOperationLogData,
    normalizeOperationReport,
  ))
  const [formOptions, setFormOptions] = useState<OperationFormOptions>({
    operationNatures: [],
    teams: [],
    responders: [],
    vehicles: [],
  })
  const [optionsLoading, setOptionsLoading] = useState(true)
  const [optionsError, setOptionsError] = useState("")
  const [optionsRequestId, setOptionsRequestId] = useState(0)
  const [validationErrors, setValidationErrors] = useState<FormErrors>({})
  const [confirmCancelModalShow, setConfirmCancelModalShow] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    let isCurrentRequest = true

    async function loadFormOptions() {
      setOptionsLoading(true)
      setOptionsError("")
      try {
        const options = await fetchOperationFormOptions()
        if (isCurrentRequest) setFormOptions(options)
      } catch (error) {
        if (isCurrentRequest) {
          setOptionsError(error instanceof Error ? error.message : "Could not load operation form options.")
        }
      } finally {
        if (isCurrentRequest) setOptionsLoading(false)
      }
    }

    void loadFormOptions()
    return () => {
      isCurrentRequest = false
    }
  }, [optionsRequestId])

  useEffect(() => {
    if (hasStoredReport(OPERATION_DRAFT_KEY, OPERATION_LATEST_KEY)) return

    let isCurrentRequest = true
    async function loadPreviousReport() {
      try {
        const latestReport = await fetchLatestOperationReport()
        if (!isCurrentRequest || !latestReport) return
        const normalizedReport = normalizeOperationReport(latestReport)
        setFormData(normalizedReport)
        saveStoredReport(OPERATION_LATEST_KEY, normalizedReport)
      } catch (error) {
        console.error("Could not load the previous operation report:", error)
      }
    }

    void loadPreviousReport()
    return () => { isCurrentRequest = false }
  }, [])

  useEffect(() => {
    if (step !== 5) return

    const redirectTimer = window.setTimeout(() => {
      navigate(ROUTES.CHOOSE_FORM)
    }, 5000)

    return () => window.clearTimeout(redirectTimer)
  }, [navigate, step])

  const totalSteps = 4
  const progress = (step / totalSteps) * 100
  const submitErrors = [1, 2, 3].flatMap((formStep) =>
    Object.values(validateStep(formStep, formData, formOptions)),
  )

  const VARIANTS = {
    enter: (direction: number) => ({ x: direction > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction > 0 ? "-100%" : "100%", opacity: 0 }),
  }

const nextStep = () => {
  if (step >= totalSteps) return

  // Surface errors for the current step, but never block navigation.
  const errors = validateStep(step, formData, formOptions)
  setValidationErrors((current) => ({ ...current, ...errors }))

  setDirection(1)
  setStep((current) => current + 1)
}

  const previousStep = () => {
    if (step <= 1) return
    setDirection(-1)
    setValidationErrors({})
    setStep((current) => current - 1)
  }

  const updateOperationDetails = (patch: Partial<OperationDetails>) => {
    setValidationErrors({})
    setFormData((current) => ({
      ...current, operationDetails: { ...current.operationDetails, ...patch },
    }))
  }

  const updateDispatch = (patch: Partial<VehicularDispatch>) => {
    setValidationErrors({})
    setFormData((current) => ({
      ...current, dispatch: { ...current.dispatch, ...patch },
    }))
  }

  const updatePeople = (people: OperationLogData["people"]) => {
    setValidationErrors({})
    setFormData((current) => ({ ...current, people }))
  }

  const updateOperationDescription = (patch: Partial<OperationDescription>) => {
    setValidationErrors({})
    setFormData((current) => ({
      ...current, operationDescription: { ...current.operationDescription, ...patch },
    }))
  }

  const updateInventory = (inventory: InventoryItem[]) => {
    setValidationErrors({})
    setFormData((current) => ({ ...current, inventory })) 
  }

  const openPinModal = () => {
    setPinError(undefined)
    setPinModalShow(true)
  }

  const handleSubmit = async (pin: string) => {
    setIsSubmitting(true)
    setPinError(undefined);


    try {
      await submitOperationLog(pin, formData);
      saveStoredReport(OPERATION_LATEST_KEY, normalizeOperationReport(formData))
      removeStoredReport(OPERATION_DRAFT_KEY)

      setPinModalShow(false);
      setFormData(createEmptyOperationLogData());
      setStep(5);
      setValidationErrors({});
    } catch (error) {
      console.error("Failed to submit operation:", error);
      setPinError(error instanceof Error ? error.message : "Could not submit the operation report.");
    } finally {
      setIsSubmitting(false);
    }
  };


  useEffect(() => {
    if (!isFormEmpty(formData)) saveStoredReport(OPERATION_DRAFT_KEY, normalizeOperationReport(formData))
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

  if (step === 5) return <OperationLogLastStep />

  return (
    <>
      {pinModalShow && (
        <PinModal
          title="OPERATION LOG"
          open={pinModalShow}
          onClose={() => setPinModalShow(false)}
          onSubmit={handleSubmit}
          loading={isSubmitting}
          error={pinError}
        />
      )}

      {confirmCancelModalShow && (
        <CancelConfirmModal
          title="OPERATION LOG"
          open={confirmCancelModalShow}
          onClose={() => setConfirmCancelModalShow(false)}
          onConfirm={() => {
            setConfirmCancelModalShow(false);
            navigate(-1);
          }}
        />
      )}

      <CommonBackground className="min-h-screen p-4">
        <section className="mx-auto flex w-full max-w-6xl min-h-[calc(100vh-3rem)] sm:items-center modal-open">
          <div className="mx-auto flex w-full flex-col">
            <div className="mb-5 mt-8 text-center">
              <h1 className="text-4xl font-bold text-white">OPERATION LOG FORM</h1>
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
                    <OperationStep1
                      operationDetails={formData.operationDetails}
                      onOperationDetailsChange={updateOperationDetails}
                      dispatch={formData.dispatch}
                      onDispatchChange={updateDispatch}
                      options={formOptions}
                      optionsLoading={optionsLoading}
                      errors={validationErrors}
                    />
                  )}

                  {step === 2 && (
                    <OperationStep2 
                      people={formData.people}
                      onPeopleChange={updatePeople}
                      errors={validationErrors}
                    />
                  )}

                  {step === 3 && (
                    <OperationStep3
                      operationDescription={formData.operationDescription}
                      onOperationDescriptionChange={updateOperationDescription}
                      inventory={formData.inventory}
                      onInventoryChange={updateInventory}
                      errors={validationErrors}
                    />
                  )}


                  {step === 4 && <OperationStep4 formData={formData} options={formOptions} />}

                </motion.div>
              </AnimatePresence>
            </div>

            {step === totalSteps && submitErrors.length > 0 && (
              <div role="alert" className="mt-3 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
                <p className="font-semibold">Please fix these issues before submitting:</p>
                <ul className="mt-1 list-inside list-disc">
                  {[...new Set(submitErrors)].map((message) => <li key={message}>{message}</li>)}
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
              {step === 1 && ( //cancle
                <CommonButton 
                  onClick={() => 
                  {
                      setConfirmCancelModalShow(true);
                    }}
                  variant="gray" 
                  //className="min-w-[130px] bg-red-700 hover:bg-red-900 text-white"
                >
                  Cancel
                </CommonButton>
              )}

              {step > 1 && ( //backButton
                <CommonButton variant="gray" className="min-w-[130px]" onClick={previousStep} disabled={step === 1}>
                  Go back
                </CommonButton>
              )}

              <CommonProgressBar progress={progress}/>

              {/* <span className="font-semibold">{step}/{totalSteps}</span> */}

              {step === totalSteps ? (
                <CommonButton
                  variant={isFormComplete(formData, formOptions) ? "purple" : "gray"}
                  disabled={!isFormComplete(formData, formOptions) || optionsLoading || Boolean(optionsError)}
                  className="min-w-[130px]"
                  onClick={openPinModal}
                >
                  Submit
                </CommonButton>
              ) : (
                  <CommonButton
                    className="min-w-[130px]"
                    onClick={nextStep}
                    disabled={optionsLoading || Boolean(optionsError)}
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
