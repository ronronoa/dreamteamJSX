import { useState } from "react";

type Size = "sm" | "md" | "lg" | "xl";
type Tone = "orange" | "purple";
type Variant = "onDark" | "onLight";
type Orientation = "horizontal" | "vertical";

interface UserAvatarProps {
  initials: string;
  name?: string;
  role?: string;
  size?: Size;
  tone?: Tone;
  /** Text color scheme — `onDark` for header/sidebar, `onLight` for profile pages. */
  variant?: Variant;
  /** How name/role sit next to the circle. Default horizontal (header style). */
  orientation?: Orientation;
  className?: string;
  imageUrl?: string | null;
}

const circleSize: Record<Size, string> = {
  sm: "w-8 h-8 text-xs",
  md: "w-9 h-9 text-sm",
  lg: "w-16 h-16 text-xl",
  xl: "w-24 h-24 text-3xl",
};

const circleTone: Record<Tone, string> = {
  orange: "bg-orange-400 text-[#21142d]",
  purple: "bg-purple-600 text-white",
};

const nameSize: Record<Size, string> = {
  sm: "text-[11px]",
  md: "text-xs",
  lg: "text-sm",
  xl: "text-lg",
};

const roleSize: Record<Size, string> = {
  sm: "text-[9px]",
  md: "text-[9px]",
  lg: "text-xs",
  xl: "text-sm",
};

const textColors: Record<Variant, { name: string; role: string }> = {
  onDark: { name: "text-white", role: "text-white/50" },
  onLight: { name: "text-gray-900", role: "text-gray-500" },
};

export default function UserAvatar({
  initials,
  name,
  role,
  size = "md",
  tone = "orange",
  variant = "onLight",
  orientation = "horizontal",
  className = "",
  imageUrl,
}: UserAvatarProps) {
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null);
  const imageFailed = imageUrl !== null && failedImageUrl === imageUrl;

  const colors = textColors[variant];
  const hasText = Boolean(name || role);
  const stacked = orientation === "vertical";

  return (
    <div
      className={`flex items-center ${
        stacked ? "flex-col text-center gap-3" : "gap-2"
      } ${className}`}
    >
      <div
        className={`
          ${circleSize[size]}
          ${circleTone[tone]}
          rounded-full
          flex items-center justify-center
          font-bold
          shrink-0
        `}
      >
        {imageUrl && !imageFailed ? (
          <img
            src={imageUrl}
            alt={name ? `${name} profile photo` : "Profile photo"}
            className="h-full w-full rounded-full object-cover"
            onError={() => setFailedImageUrl(imageUrl ?? null)}
          />
        ) : initials}
      </div>

      {hasText && (
        <div className={stacked ? "" : "min-w-0"}>
          {name && (
            <p
              className={`${nameSize[size]} ${colors.name} font-semibold ${
                stacked ? "" : "truncate"
              }`}
            >
              {name}
            </p>
          )}
          {role && (
            <p className={`${roleSize[size]} ${colors.role}`}>{role}</p>
          )}
        </div>
      )}
    </div>
  );
}
