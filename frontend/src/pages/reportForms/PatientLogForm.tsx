import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

import CommonBackground from "../../components/common/background/CommonBackground"
import CommonButton from "../../components/common/widgets/CommonButton"

import PatientStep1 from "../../modules/reportForms/NewPatientLogForm/PatientStep1"
import PatientStep2 from "../../modules/reportForms/NewPatientLogForm/PatientStep2"
import PatientStep3 from "../../modules/reportForms/NewPatientLogForm/PatientStep3"
import PatientStep4 from "../../modules/reportForms/NewPatientLogForm/PatientStep4"
import { isFormComplete, isFormEmpty } from "../../modules/reportForms/NewPatientLogForm/formValidation"

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
import { submitPatientLog } from "../../api/patientForm"
import { useNavigate } from "react-router"
import PinModal from "../../modules/reportForms/modal/PinModal"
import CancelConfirmModal from "../../modules/reportForms/modal/CancelConfirmModal"
import CommonProgressBar from "../../modules/reportForms/component/CommonProgressBar"

export default function PatientLogForm() {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [pinModalShow, setPinModalShow] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [pinError, setPinError] = useState<string>()
  const [formData, setFormData] = useState<PatientLogData>(createEmptyPatientLogData())
  const [confirmCancelModalShow, setConfirmCancelModalShow] = useState(false)

  const navigate = useNavigate()

  const totalSteps = 4
  const progress = (step / totalSteps) * 100

  const VARIANTS = {
    enter: (direction: number) => ({ x: direction > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction > 0 ? "-100%" : "100%", opacity: 0 }),
  }

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
    setPinError(undefined)
    setPinModalShow(true)
  }

  const handleSubmit = async (pin: string) => {
    setIsSubmitting(true)
    setPinError(undefined)

    try {
      await submitPatientLog(pin, formData)
      setPinModalShow(false)
    } catch (error) {
      console.error("Failed to submit patient log:", error)
      setPinError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

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

                  {step === 4 && <PatientStep4 formData={formData} />}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-4 flex h-14 w-full items-center justify-between rounded-md bg-white p-2">
              {step === 1 && (
                <CommonButton
                  onClick={() => setConfirmCancelModalShow(true)}
                  variant="gray"
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
