import { useEffect } from "react";
import type { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  dismissable?: boolean;
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
  dismissable = true
}: ModalProps) {
  useEffect(() => {
    if (!open || !dismissable) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, dismissable, onClose]);

  if (!open) return null;

  return (
    <div
      className="
      fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4
      "
      onClick={dismissable ? onClose : undefined}
    >
      <div
        className={`
        w-full max-w-lg rounded-3xl bg-[#f4e3d7] p-6 shadow-2xl
        modal-open
        ${className}
        `}
        
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
