import type { ReactNode } from "react";
import { Dialog } from "@base-ui/react/dialog";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  dismissable?: boolean;
  large?: boolean
}


/**
 * Reusable modal screen.
 *
 * @example
 * ```tsx
 * const [showModal, setShowModal] = useState(false);
 *
 * <Modal
 *   open={showModal}
 *   onClose={() => setShowModal(false)}
 * >
 *   <h2>Forgot Password?</h2>
 * </Modal>
 * ```
 */
export default function Modal({
  open,
  onClose,
  children,
  className = "",
  dismissable = true,
  large = false
}: ModalProps) {
  return (
    <Dialog.Root
      open={open}
      disablePointerDismissal={!dismissable}
      onOpenChange={(nextOpen) => {
        if (!nextOpen && dismissable) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/60" />
        <Dialog.Viewport className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto px-4 py-4">
          <Dialog.Popup
            aria-label="Dialog"
            className={`w-full ${large ? "max-w-7xl" : "max-w-lg"} max-h-[calc(100vh-2rem)] overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl modal-open ${className}`}
          >
            {children}
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
