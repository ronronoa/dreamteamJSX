import { useRef, useState } from "react";
import { Camera } from "lucide-react";
import { InputBase } from "@/components/base/input/input";
import UserAvatar from "@/components/common/widgets/UserAvatar";
import { getProfilePhotoSource, uploadProfilePhoto, type UserProfileData } from "@/api/profile";
import { getInitials } from "@/utils/name";
import { MAX_PROFILE_PHOTO_SIZE, PROFILE_PHOTO_TYPES, ROLE_LABELS } from "./profileUtils";
import { Detail } from "./ProfileFields";

export default function IdentityCard({
  profile,
  loading,
  accessToken,
  onUpdate,
}: {
  profile: UserProfileData | null;
  loading: boolean;
  accessToken: string | undefined;
  onUpdate: (profile: UserProfileData) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const photoInput = useRef<HTMLInputElement>(null);

  const displayName = profile?.name ?? "User";
  const displayRole = profile ? ROLE_LABELS[profile.role] : "";
  const initials = getInitials(displayName);
  const photoSource = getProfilePhotoSource(profile?.profileImageUrl ?? null);

  async function handlePhotoSelection(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || !accessToken) return;

    setError("");
    setMessage("");

    if (!PROFILE_PHOTO_TYPES.includes(file.type)) {
      setError("Choose a JPG or PNG image.");
      return;
    }
    if (file.size > MAX_PROFILE_PHOTO_SIZE) {
      setError("Profile photos must be 5 MB or smaller.");
      return;
    }

    setUploading(true);
    try {
      const updated = await uploadProfilePhoto(accessToken, file);
      onUpdate(updated);
      setMessage("Profile photo updated.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not upload your photo.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center py-4">
        <UserAvatar
          initials={initials}
          imageUrl={photoSource}
          size="xl"
          orientation="vertical"
          variant="onLight"
          tone="purple"
        />

        <h2 className="mt-4 text-lg font-bold text-gray-900">{displayName}</h2>
        <p className="mt-0.5 text-xs text-gray-500">
          {displayRole || (loading ? "Loading account…" : "\u00A0")}
        </p>

        {profile && (
          <span
            className={`mt-3 inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${
              profile.isActive
                ? "bg-purple-100 text-purple-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {profile.isActive ? "Active" : "Inactive"}
          </span>
        )}

        <InputBase
          ref={photoInput}
          type="file"
          accept="image/jpeg,image/png"
          wrapperClassName="hidden"
          onChange={handlePhotoSelection}
        />
        <button
          type="button"
          disabled={uploading || loading || !profile}
          onClick={() => photoInput.current?.click()}
          className="mt-5 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Camera size={14} className="text-purple-600" />
          {uploading
            ? "Uploading photo…"
            : profile?.profileImageUrl
              ? "Change profile photo"
              : "Add profile photo"}
        </button>

        <p className="mt-3 text-center text-[10px] leading-relaxed text-gray-400">
          JPG or PNG · up to 5 MB
          <br />
          Use a clear headshot for field identification.
        </p>

        {error && (
          <p role="alert" className="mt-3 text-center text-xs text-red-600">
            {error}
          </p>
        )}
        {message && (
          <p role="status" className="mt-3 text-center text-xs text-emerald-700">
            {message}
          </p>
        )}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-300 pt-5">
        <Detail label="Account ID" value={profile?.id.slice(0, 8) ?? "—"} />
        <Detail label="Team" value={profile?.team_name ?? "Unassigned"} />
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Report form PIN (self-contained form)                                     */
/* -------------------------------------------------------------------------- */
