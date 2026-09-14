import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

import CommonBackground from "../../components/common/background/CommonBackground"
import CommonButton from "../../components/common/widgets/CommonButton"

import { useNavigate } from "react-router"
import PinModal from "../../modules/reportForms/modal/PinModal"
import CancelConfirmModal from "../../modules/reportForms/modal/CancelConfirmModal"
import CommonProgressBar from "../../modules/reportForms/component/CommonProgressBar"

export default function NewPatientLogForm() {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [pinModalShow, setPinModalShow] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [pinError, setPinError] = useState<string>()
  const [confirmCancelModalShow, setConfirmCancelModalShow] = useState(false)

  const navigate = useNavigate();

  const totalSteps = 2
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

  const openPinModal = () => {
    setPinError(undefined)
    setPinModalShow(true)
  }

  const handleSubmit = async (pin: string) => {
  };



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
        <section className="mx-auto flex  w-full max-w-6xl min-h-[calc(100vh-25rem)] sm:items-center modal-open">
          <div className="mx-auto flex w-full flex-col">
            <div className="mb-5 mt-8 text-center">
              <h1 className="text-4xl font-bold text-white">NEW PATIENT</h1>
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

                </motion.div>
              </AnimatePresence>
            </div>

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
                  onClick={() => setPinModalShow(true)}
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
