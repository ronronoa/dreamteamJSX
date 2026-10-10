import { useEffect, useRef, useState } from "react";
import { Camera, KeyRound, Pencil } from "lucide-react";

import CommonButton from "@/components/common/widgets/CommonButton";
import CommonInput from "@/components/common/widgets/CommonInput";
import UserAvatar from "@/components/common/widgets/UserAvatar";
import { useAuth } from "@/context/AuthContext";
import {
  fetchUserProfile,
  getProfilePhotoSource,
  updateUserProfile,
  uploadProfilePhoto,
  type UserProfileData,
} from "@/api/profile";

const ROLE_LABELS = {
  SUPER_ADMIN: "Super Admin",
  DEPARTMENT_HEAD: "Department Head",
  DEPUTY: "Deputy",
  TEAM_LEADER: "Team Leader",
  MEMBER: "Member",
} as const;

const MAX_PROFILE_PHOTO_SIZE = 5 * 1024 * 1024;
const PROFILE_PHOTO_TYPES = ["image/jpeg", "image/png"];

interface ProfileForm {
  name: string;
  username: string;
  email: string;
  phone: string;
}

const EMPTY_PROFILE_FORM: ProfileForm = {
  name: "",
  username: "",
  email: "",
  phone: "",
};

export default function UserProfile() {
  const { session, updateProfileSession, changePassword } = useAuth();
  const accessToken = session?.accessToken;
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [form, setForm] = useState<ProfileForm>(EMPTY_PROFILE_FORM);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [profileMessage, setProfileMessage] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [photoMessage, setPhotoMessage] = useState("");
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const photoInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      if (!accessToken) {
        setProfileError("Your session has expired. Sign in again to view your profile.");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const loadedProfile = await fetchUserProfile(accessToken);
        if (!isMounted) return;
        setProfile(loadedProfile);
        setForm(toForm(loadedProfile));
        setProfileError("");
      } catch (error) {
        if (!isMounted) return;
        setProfileError(error instanceof Error ? error.message : "Could not load your profile.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    void loadProfile();
    return () => { isMounted = false; };
  }, [accessToken]);

  function updateForm(field: keyof ProfileForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function beginEditing() {
    if (profile) setForm(toForm(profile));
    setProfileError("");
    setProfileMessage("");
    setEditing(true);
  }

  function cancelEditing() {
    if (profile) setForm(toForm(profile));
    setProfileError("");
    setEditing(false);
  }

  async function saveProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!accessToken) return;

    setSavingProfile(true);
    setProfileError("");
    setProfileMessage("");
    try {
      const updatedProfile = await updateUserProfile(accessToken, {
        name: form.name.trim(),
        username: form.username.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
      });
      setProfile(updatedProfile);
      setForm(toForm(updatedProfile));
      updateProfileSession(updatedProfile);
      setEditing(false);
      setProfileMessage("Your profile was updated.");
    } catch (error) {
      setProfileError(error instanceof Error ? error.message : "Could not save your profile.");
    } finally {
      setSavingProfile(false);
    }
  }

  async function handlePhotoSelection(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || !accessToken) return;

    setPhotoError("");
    setPhotoMessage("");
    if (!PROFILE_PHOTO_TYPES.includes(file.type)) {
      setPhotoError("Choose a JPG or PNG image.");
      return;
    }
    if (file.size > MAX_PROFILE_PHOTO_SIZE) {
      setPhotoError("Profile photos must be 5 MB or smaller.");
      return;
    }

    setUploadingPhoto(true);
    try {
      const updatedProfile = await uploadProfilePhoto(accessToken, file);
      setProfile(updatedProfile);
      updateProfileSession(updatedProfile);
      setPhotoMessage("Profile photo updated.");
    } catch (error) {
      setPhotoError(error instanceof Error ? error.message : "Could not upload your photo.");
    } finally {
      setUploadingPhoto(false);
    }
  }

  async function handlePasswordChange(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPasswordError("");
    setPasswordMessage("");
    if (newPassword !== confirmPassword) {
      setPasswordError("The new passwords do not match.");
      return;
    }

    setSavingPassword(true);
    try {
      await changePassword(currentPassword, newPassword);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordMessage("Password changed. Other sessions will need to sign in again.");
    } catch (error) {
      setPasswordError(error instanceof Error ? error.message : "Could not change your password.");
    } finally {
      setSavingPassword(false);
    }
  }

  const displayName = profile?.name ?? session?.user.name ?? "User";
  const displayRole = profile ? ROLE_LABELS[profile.role] : "";
  const initials = getInitials(displayName);
  const photoSource = getProfilePhotoSource(profile?.profileImageUrl ?? null);

  return (
    <div className="grid grid-cols-1 gap-3 xl:mt-10 xl:grid-cols-[380px_1fr] xl:grid-rows-[auto_1fr]">
      {/* LEFT: identity card spans both rows so it matches the height of details + password */}
      <aside className="flex flex-col rounded-2xl border border-gray-600 bg-white p-6 xl:row-span-2">
        <div className="flex flex-1 flex-col items-center justify-center py-4">
          <UserAvatar
            initials={initials}
            name={displayName}
            imageUrl={photoSource}
            size="xl"
            orientation="vertical"
            variant="onLight"
            tone="purple"
          />

          <h2 className="mt-4 text-lg font-bold text-gray-900">{displayName}</h2>
          <p className="mt-0.5 text-xs text-gray-500">{displayRole || "Loading account…"}</p>

          {profile && (
            <span
              className={`mt-3 inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${
                profile.isActive ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-600"
              }`}
            >
              {profile.isActive ? "Active" : "Inactive"}
            </span>
          )}

          <input
            ref={photoInput}
            type="file"
            accept="image/jpeg,image/png"
            className="hidden"
            onChange={(event) => void handlePhotoSelection(event)}
          />
          <button
            type="button"
            disabled={uploadingPhoto || loading || !profile}
            onClick={() => photoInput.current?.click()}
            className="mt-5 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Camera size={14} className="text-purple-600" />
            {uploadingPhoto ? "Uploading photo…" : profile?.profileImageUrl ? "Change profile photo" : "Add profile photo"}
          </button>

          <p className="mt-3 text-center text-[10px] leading-relaxed text-gray-400">
            JPG or PNG · up to 5 MB
            <br />
            Use a clear headshot for field identification.
          </p>
          {photoError && <p role="alert" className="mt-3 text-center text-xs text-red-600">{photoError}</p>}
          {photoMessage && <p role="status" className="mt-3 text-center text-xs text-emerald-700">{photoMessage}</p>}
        </div>

        {/* pinned to the bottom of the card */}
        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-300 pt-5">
          <Detail label="Account ID" value={profile?.id.slice(0, 8) ?? "—"} />
          <Detail label="Team" value={profile?.team_name ?? "Unassigned"} />
        </div>
      </aside>

      {/* RIGHT TOP: details */}
      <section className="rounded-2xl border border-gray-600 bg-white">
        <form onSubmit={saveProfile} className="flex h-full flex-col">
          <header className="flex items-start justify-between border-b border-gray-300 p-6">
            <div>
              <h3 className="text-sm font-bold text-gray-900">Personal &amp; work details</h3>
              <p className="mt-0.5 text-xs text-gray-500">Review your information. Choose Edit to make changes.</p>
            </div>

            {!editing ? (
              <button
                type="button"
                disabled={loading || !profile}
                onClick={beginEditing}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Pencil size={13} /> Edit profile
              </button>
            ) : (
              <button type="button" onClick={cancelEditing} className="text-xs font-semibold text-gray-600 hover:text-gray-900">
                Cancel
              </button>
            )}
          </header>

          {loading ? (
            <p className="p-6 text-sm text-gray-500">Loading profile…</p>
          ) : profile ? (
            <>
              <div className="grid grid-cols-1 gap-x-8 gap-y-5 p-6 sm:grid-cols-2 xl:grid-cols-3">
                <ProfileField label="Full name" value={form.name} editing={editing} onChange={(v) => updateForm("name", v)} required maxLength={50} autoComplete="name" />
                <ProfileField label="Username" value={form.username} editing={editing} onChange={(v) => updateForm("username", v)} required minLength={3} maxLength={50} pattern="[a-zA-Z0-9._-]+" autoComplete="username" />
                <ProfileField label="Work email" value={form.email} editing={editing} onChange={(v) => updateForm("email", v)} type="email" required maxLength={254} autoComplete="email" />
                <ProfileField label="Mobile number" value={form.phone} editing={editing} onChange={(v) => updateForm("phone", v)} type="tel" maxLength={20} pattern="(?:\\+?63|0)9(?:[ -]?\\d){9}" placeholder="09171234567 or +639171234567" />
                <Field label="Role" value={displayRole || "—"} />
                <Field label="Team" value={profile.team_name ?? "Unassigned"} />
                <Field label="Account status" value={profile.isActive ? "Active" : "Inactive"} />
                <Field label="Member since" value={formatDate(profile.createdAt)} />
                <Field label="Last updated" value={formatDate(profile.updatedAt)} />
              </div>

              {profileError && <p role="alert" className="mx-6 mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{profileError}</p>}
              {profileMessage && <p role="status" className="mx-6 mb-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{profileMessage}</p>}

              {editing && (
                <footer className="mt-auto flex justify-end gap-2 border-t border-gray-100 px-6 py-4">
                  <CommonButton type="button" variant="gray" compact disabled={savingProfile} onClick={cancelEditing}>Cancel</CommonButton>
                  <CommonButton type="submit" compact disabled={savingProfile}>{savingProfile ? "Saving…" : "Save changes"}</CommonButton>
                </footer>
              )}
            </>
          ) : (
            <div className="p-6">
              {profileError && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{profileError}</p>}
            </div>
          )}
        </form>
      </section>

      {/* RIGHT BOTTOM: password, same card style as details, fields laid out in a row */}
      <section className="rounded-2xl border border-gray-600 bg-white">
        <header className="flex items-center gap-2 border-b border-gray-300 p-6">
          <KeyRound size={15} className="text-purple-700" />
          <div>
            <h3 className="text-sm font-bold text-gray-900">Change password</h3>
            <p className="mt-0.5 text-xs text-gray-500">Use 8–64 characters. Other signed-in sessions will need to sign in again.</p>
          </div>
        </header>

        <form onSubmit={handlePasswordChange} className="p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <CompactPasswordField id="profile-current-password" label="Current password" value={currentPassword} onChange={setCurrentPassword} required minLength={1} autoComplete="current-password" />
            <CompactPasswordField id="profile-new-password" label="New password" value={newPassword} onChange={setNewPassword} required minLength={8} maxLength={64} autoComplete="new-password" />
            <CompactPasswordField id="profile-confirm-password" label="Confirm new password" value={confirmPassword} onChange={setConfirmPassword} required minLength={8} maxLength={64} autoComplete="new-password" />
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              {passwordError && <p role="alert" className="text-xs text-red-600">{passwordError}</p>}
              {passwordMessage && <p role="status" className="text-xs text-emerald-700">{passwordMessage}</p>}
            </div>
            <CommonButton type="submit" compact disabled={savingPassword}>
              {savingPassword ? "Updating password…" : "Update password"}
            </CommonButton>
          </div>
        </form>
      </section>
    </div>
  );
}

function ProfileField({
  label,
  value,
  editing,
  onChange,
  ...inputProps
}: {
  label: string;
  value: string;
  editing: boolean;
  onChange: (value: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "autoCapitalize">) {
  if (!editing) return <Field label={label} value={value || "Not set"} />;
  return (
    <label className="block min-w-0 border-b border-gray-100 pb-3">
      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{label}</span>
      <input
        {...inputProps}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 w-full rounded-md border border-gray-300 px-2.5 py-2 text-xs text-gray-900 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
      />
    </label>
  );
}

function CompactPasswordField({
  id,
  label,
  value,
  onChange,
  ...inputProps
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "value" | "onChange" | "autoCapitalize">) {
  return (
    <CommonInput
      id={id}
      label={label}
      type="password"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      showPasswordToggle
      variant="compact"
      className="!h-9 !rounded-lg !bg-white !text-xs"
      {...inputProps}
    />
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 border-b border-gray-100 pb-3">
      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{label}</p>
      <p className="mt-1 break-words text-xs text-gray-900">{value}</p>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] font-medium text-gray-500">{label}</p>
      <p className="mt-0.5 break-words text-xs font-bold text-gray-900">{value}</p>
    </div>
  );
}

function toForm(profile: UserProfileData): ProfileForm {
  return {
    name: profile.name,
    username: profile.username,
    email: profile.email ?? "",
    phone: profile.phone ?? "",
  };
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(date);
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
