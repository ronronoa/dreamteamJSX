import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"

import CommonBackground from "../../components/common/background/CommonBackground"
import CommonButton from "../../components/common/widgets/CommonButton"

import OperationStep1 from "../../modules/reportForms/OperationLogForm/OperationStep1"
import OperationStep2 from "../../modules/reportForms/OperationLogForm/OperationStep2"

import {
  createEmptyOperationLogData,
  type OperationDetails,
  type OperationLogData,
  type VehicularDispatch,
} from "../../types/operationLog"
import { API_URL } from "../../api/config"

export default function OperationLogForm() {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [formData, setFormData] = useState<OperationLogData>(createEmptyOperationLogData())

  const totalSteps = 4

  const updateOperationDetails = (patch: Partial<OperationDetails>) => {
    setFormData((current) => ({
      ...current,
      operationDetails: { ...current.operationDetails, ...patch },
    }))
  }

  const updateDispatch = (patch: Partial<VehicularDispatch>) => {
    setFormData((current) => ({
      ...current,
      dispatch: { ...current.dispatch, ...patch },
    }))
  }

  const updatePeople = (people: OperationLogData["people"]) => {
    setFormData((current) => ({ ...current, people }))
  }

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

  const handleSubmit = async () => {
    console.log("Submitting operation log:", formData)

    try {
      const response = await fetch(`${API_URL}/operations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
      // TODO: handle success (toast, redirect, reset form, etc.)
    } catch (error) {
      console.error("Failed to submit operation log:", error)
    }
  }

  return (
    <CommonBackground className="min-h-screen p-4">
      <section className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl sm:items-center">
        <div className="mx-auto flex w-full flex-col  lg:max-h-[1000px]">
          <div className="mb-5 mt-8 text-center">
            <h1 className="text-4xl font-bold text-white">OPERATION LOG FORM</h1>
          </div>

          <div className="relative w-full min-h-[700px]">
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
                  />
                )}

                {step === 2 && (
                  <OperationStep2 people={formData.people} onPeopleChange={updatePeople} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-4 flex h-14 w-full items-center justify-between rounded-md bg-white p-2">
            {step === 1 && (
              <CommonButton variant="none" className="min-w-[130px] bg-red-700 hover:bg-red-900 text-white">
                Cancel
              </CommonButton>
            )}

            {step > 1 && (
              <CommonButton variant="gray" className="min-w-[130px]" onClick={previousStep} disabled={step === 1}>
                Go back
              </CommonButton>
            )}

            <span className="font-semibold">{step}/{totalSteps}</span>

            {step === totalSteps ? (
              <CommonButton className="min-w-[130px]" onClick={handleSubmit}>
                Submit
              </CommonButton>
            ) : (
              <CommonButton className="min-w-[130px]" onClick={nextStep}>
                Next
              </CommonButton>
            )}
          </div>
        </div>
      </section>
    </CommonBackground>
  )
}
