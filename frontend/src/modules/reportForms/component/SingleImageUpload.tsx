import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import { Upload } from "lucide-react"

import imagePlaceholder from "@/assets/ai_image_placeholder.jpg"
import ImagePreviewModal from "@/modules/reportForms/modal/ImagePreviewModal"

type SingleImageUploadProps = {
  image: File | null
  onImageChange: (image: File | null) => void
}

export type SingleImageUploadHandle = {
  openFilePicker: () => void
}

const SingleImageUpload = forwardRef<SingleImageUploadHandle, SingleImageUploadProps>(
  function SingleImageUpload({ image, onImageChange }, ref) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [previewUrl, setPreviewUrl] = useState(imagePlaceholder)
    const [uploadError, setUploadError] = useState("")
    const [isPreviewOpen, setIsPreviewOpen] = useState(false)

    useEffect(() => {
      if (!image) {
        setPreviewUrl(imagePlaceholder)
        return
      }

      const objectUrl = URL.createObjectURL(image)
      setPreviewUrl(objectUrl)

      return () => URL.revokeObjectURL(objectUrl)
    }, [image])

    function selectImage(file: File | undefined) {
      if (!file) return

      if (!file.type.startsWith("image/")) {
        setUploadError("Select an image file.")
        return
      }

      setUploadError("")
      onImageChange(file)
    }

    function openFilePicker() {
      fileInputRef.current?.click()
    }

    useImperativeHandle(ref, () => ({ openFilePicker }), [])

    function handleImageSectionClick() {
      if (image) {
        setIsPreviewOpen(true)
        return
      }

      openFilePicker()
    }

    return (
      <div
        role="button"
        tabIndex={0}
        aria-label={image ? "Preview uploaded image" : "Upload an image"}
        onClick={handleImageSectionClick}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            handleImageSectionClick()
          }
        }}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault()
          selectImage(event.dataTransfer.files[0])
        }}
        className="relative flex h-full min-h-0 w-full cursor-pointer items-center justify-center overflow-hidden"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onClick={(event) => event.stopPropagation()}
          onChange={(event) => {
            selectImage(event.target.files?.[0])
            event.target.value = ""
          }}
        />

        <img
          src={previewUrl}
          alt={image ? image.name : "Patient log form image placeholder"}
          className={`absolute inset-0 h-full w-full object-contain ${image ? "opacity-100" : "opacity-30"}`}
        />

        {!image && (
          <div className="pointer-events-none absolute bottom-4 flex items-center gap-2 rounded-lg bg-slate-950/70 px-4 py-2 text-sm font-semibold text-white">
            <Upload size={18} />
            Choose or drop an image
          </div>
        )}

        {uploadError && (
          <p role="alert" className="absolute top-4 rounded-md bg-red-100 px-3 py-2 text-sm text-red-700">
            {uploadError}
          </p>
        )}

        <ImagePreviewModal
          open={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          file={image}
        />
      </div>
    )
  },
)

export default SingleImageUpload
