interface CommonProgressBarProps {
  progress: number
}

export default function CommonProgressBar({
  progress,
}: CommonProgressBarProps) {
  return (
    <div className="flex w-1/3 items-center gap-3">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-purple-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <span className="w-12 text-right font-semibold">
        {Math.round(progress)}%
      </span>
    </div>
  )
}
