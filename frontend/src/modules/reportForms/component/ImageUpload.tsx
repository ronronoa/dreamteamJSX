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

/**
 * just refer to OperationStep3.tsx for usage
 **/
export default function ImageUpload({
  images,
  onImagesChange,
  isDragging = false,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [previewIndex, setPreviewIndex] = useState<number | null>(null)

  const {
    isDragging: localIsDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  } = useImageDrag()

  const dragging = isDragging || localIsDragging


  function handleFilesSelected(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return

    const existingNames = new Set(images.map((file) => file.name))

    const newFiles = Array.from(fileList).map((file) => {
      const lastDot = file.name.lastIndexOf(".")

      const baseName =
        lastDot === -1 ? file.name : file.name.slice(0, lastDot)

      const extension =
        lastDot === -1 ? "" : file.name.slice(lastDot)

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

    onImagesChange([...images, ...newFiles])

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
  //   e.preventDefault()
  //   setLocalIsDragging(true)
  // }
  //
  // function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
  //   e.preventDefault()
  //   setLocalIsDragging(false)
  // }
  //
  // function handleDrop(e: React.DragEvent<HTMLDivElement>) {
  //   e.preventDefault()
  //   setLocalIsDragging(false)
  //   handleFilesSelected(e.dataTransfer.files)
  // }

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
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFilesSelected(e.target.files)}
        />
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={(e) => {
          handleDrop()
          handleFilesSelected(e.dataTransfer.files)
        }}
        className={`
          min-h-[150px]
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
              or use the Upload button
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
  const existingNames = new Set(
    currentImages.map((file) => file.name)
  )

  const newFiles = Array.from(fileList).map((file) => {
    const lastDot = file.name.lastIndexOf(".")

    const baseName =
      lastDot === -1 ? file.name : file.name.slice(0, lastDot)

    const extension =
      lastDot === -1 ? "" : file.name.slice(lastDot)

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
