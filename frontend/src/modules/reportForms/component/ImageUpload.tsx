// what the fuck

import { useRef, useState } from "react"
import { ImagePlus, Trash, Upload } from "lucide-react"

import CommonButton from "../../../components/common/widgets/CommonButton"
import ImagePreviewModal from "../modal/ImagePreviewModal"

interface ImageUploadProps {
  images: File[]
  onImagesChange: (images: File[]) => void
  onDropFiles?: (files: FileList) => void
  isDragging?: boolean
}

const ACCEPTED_IMAGE_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".gif",
  ".png",
  ".bmp",
  ".tif",
  ".tiff",
  ".webp",
]

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/gif",
  "image/png",
  "image/bmp",
  "image/tiff",
  "image/webp",
]

function isValidImage(file: File): boolean {
  const extension = file.name
    .slice(file.name.lastIndexOf("."))
    .toLowerCase()

  return (
    ACCEPTED_IMAGE_EXTENSIONS.includes(extension) &&
    ACCEPTED_IMAGE_TYPES.includes(file.type)
  )
}

function getUniqueImageFiles(
  currentImages: File[],
  fileList: FileList | File[],
): File[] {
  const existingNames = new Set(
    currentImages.map((file) => file.name)
  )

  const validFiles = Array.from(fileList).filter(isValidImage)

  const newFiles = validFiles.map((file) => {
    const lastDot = file.name.lastIndexOf(".")

    const baseName =
      lastDot === -1
        ? file.name
        : file.name.slice(0, lastDot)

    const extension =
      lastDot === -1
        ? ""
        : file.name.slice(lastDot)

    let newName = file.name
    let count = 1

    while (existingNames.has(newName)) {
      newName = `${baseName}-${count}${extension}`
      count++
    }

    existingNames.add(newName)

    if (newName === file.name) {
      return file
    }

    return new File([file], newName, {
      type: file.type,
      lastModified: file.lastModified,
    })
  })

  return [...currentImages, ...newFiles]
}

export default function ImageUpload({
  images,
  onImagesChange,
  isDragging = false,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [previewIndex, setPreviewIndex] = useState<number | null>(null)
  const [uploadError, setUploadError] = useState(false)

  const {
    isDragging: localIsDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  } = useImageDrag()

  const dragging = isDragging || localIsDragging

  function handleFilesSelected(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) {
      return
    }

    const files = Array.from(fileList)
    const hasInvalidFiles = files.some(
      (file) => !isValidImage(file)
    )

    setUploadError(hasInvalidFiles)

    onImagesChange(
      getUniqueImageFiles(images, fileList)
    )

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  function removeImage(index: number) {
    onImagesChange(
      images.filter((_, i) => i !== index)
    )
  }

  const previewFile =
    previewIndex !== null
      ? images[previewIndex]
      : null

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <label className="text-lg font-medium text-slate-900">
          Attach Image/s
        </label>

        <CommonButton
          type="button"
          variant="orange"
          className="flex w-70 items-center gap-2"
          onClick={() => fileInputRef.current?.click()}
        >
          Upload
          <Upload size={18} />
        </CommonButton>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={ACCEPTED_IMAGE_EXTENSIONS.join(",")}
          className="hidden"
          onChange={(e) => handleFilesSelected(e.target.files)}
        />
      </div>

      {uploadError && (
        <div className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          Can't upload. Use an image in one of these formats:
          {" "}
          .jpg, .gif, .png, .bmp, .tif, or .webp
        </div>
      )}

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={(e) => {
          e.preventDefault()
          handleDrop()
          handleFilesSelected(e.dataTransfer.files)
        }}
        className={`
          min-h-[300px]
          flex-1
          rounded-md
          border-2
          border-dashed
          transition-colors
          ${
            dragging
              ? "border-purple-500 bg-purple-50"
              : "border-gray-300 bg-gray-100"
          }
        `}
      >
        {images.length === 0 ? (
          <div className="flex h-full min-h-[150px] flex-col items-center justify-center gap-2 text-gray-400">
            <ImagePlus size={28} />

            <p className="text-sm">
              Drag and drop images here
            </p>

            <p className="text-xs">
              JPG, GIF, PNG, BMP, TIFF, or WEBP
            </p>
          </div>
        ) : (
          <div className="p-2 pb-10">
            {images.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="
                  flex items-center justify-between
                  rounded-md
                  border-b border-gray-300
                  px-3 py-2
                  text-sm italic text-gray-700
                  hover:bg-gray-50
                  hover:cursor-pointer
                "
                onClick={() => setPreviewIndex(index)}
              >
                <p className="truncate">
                  {file.name}
                </p>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeImage(index)
                  }}
                  className="shrink-0 text-red-500 transition hover:text-red-700"
                  aria-label={`Remove ${file.name}`}
                >
                  <Trash
                    size={24}
                    className="hover:fill-red-700"
                  />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <ImagePreviewModal
        open={previewIndex !== null}
        onClose={() => setPreviewIndex(null)}
        file={previewFile}
      />
    </>
  )
}

export function addImageFiles(
  currentImages: File[],
  fileList: FileList | File[],
): File[] {
  return getUniqueImageFiles(currentImages, fileList)
}

export function useImageDrag() {
  const [isDragging, setIsDragging] = useState(false)

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDragging(true)
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragging(false)
    }
  }

  function handleDrop() {
    setIsDragging(false)
  }

  return {
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  }
}
