import { useEffect, useRef, useState } from "react";
import { Camera, KeyRound, Pencil } from "lucide-react";

import CommonButton from "@/components/common/widgets/CommonButton";
import CommonInput from "@/components/common/widgets/CommonInput";
import { InputBase, type InputBaseProps } from "@/components/base/input/input";
import UserAvatar from "@/components/common/widgets/UserAvatar";
import { useAuth } from "@/context/AuthContext";
import { setPin as apiSetPin } from "@/api/auth";
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

const CARD_CLASS = "rounded-2xl border border-gray-600 bg-white";

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

/* -------------------------------------------------------------------------- */
/*  Top-level page                                                            */
/* -------------------------------------------------------------------------- */

export default function UserProfile() {
  const { session, updateProfileSession } = useAuth();
  const accessToken = session?.accessToken;
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileError, setProfileError] = useState("");

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
        const loaded = await fetchUserProfile(accessToken);
        if (!isMounted) return;
        setProfile(loaded);
        setProfileError("");
      } catch (error) {
        if (!isMounted) return;
        setProfileError(error instanceof Error ? error.message : "Could not load your profile.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    void loadProfile();
    return () => {
      isMounted = false;
    };
  }, [accessToken]);

  const handleProfileUpdate = (updated: UserProfileData) => {
    setProfile(updated);
    updateProfileSession(updated);
  };

  const canManageReportPin = Boolean(profile && profile.role !== "MEMBER");

  return (
    /*
     * xl:grid-rows-[1fr_auto] makes the details card absorb the leftover
     * vertical space while the password card stays at its natural height.
     * The sidebar spans both rows so it lines up with the taller column.
     */
    <div className="grid grid-cols-1 gap-3 xl:mt-10 xl:grid-cols-[380px_1fr] xl:grid-rows-[1fr_auto]">
      <aside className={`${CARD_CLASS} flex flex-col p-6 xl:row-span-2`}>
        <IdentityCard
          profile={profile}
          loading={loading}
          accessToken={accessToken}
          onUpdate={handleProfileUpdate}
        />
        {canManageReportPin && <ReportPinSection accessToken={accessToken} />}
      </aside>

      <ProfileDetailsSection
        profile={profile}
        loading={loading}
        error={profileError}
        accessToken={accessToken}
        onUpdate={handleProfileUpdate}
      />

      <PasswordSection />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Identity card (avatar, name, photo upload, mini details)                  */
/* -------------------------------------------------------------------------- */

function IdentityCard({
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

function ReportPinSection({ accessToken }: { accessToken: string | undefined }) {
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!/^\d{4,6}$/.test(pin)) {
      setError("PIN must contain 4 to 6 digits.");
      return;
    }
    if (pin !== confirmPin) {
      setError("PIN entries do not match.");
      return;
    }
    if (!accessToken) {
      setError("Your session has expired. Sign in again to update your PIN.");
      return;
    }

    setSaving(true);
    try {
      await apiSetPin(accessToken, pin);
      setPin("");
      setConfirmPin("");
      setMessage("Your report form PIN was saved. This PIN replaces any previous PIN.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save your report form PIN.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-3 border-t border-gray-300 pt-5">
      {/* Header sits above the inputs — this is the fix for the old jumbled layout */}
      <div>
        <h3 className="text-xs font-bold text-gray-900">Report form PIN</h3>
        <p className="mt-1 text-[10px] leading-relaxed text-gray-500">
          Set or replace the PIN members use when submitting report forms. Your current PIN is
          never shown.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <CommonInput
          id="profile-report-pin"
          label="New PIN"
          type="password"
          inputMode="numeric"
          autoComplete="new-password"
          maxLength={6}
          value={pin}
          onChange={(event) => setPin(event.target.value.replace(/\D/g, ""))}
          required
          variant="compact"
        />
        <CommonInput
          id="profile-confirm-report-pin"
          label="Confirm PIN"
          type="password"
          inputMode="numeric"
          autoComplete="new-password"
          maxLength={6}
          value={confirmPin}
          onChange={(event) => setConfirmPin(event.target.value.replace(/\D/g, ""))}
          required
          variant="compact"
        />
      </div>

      {error && <p role="alert" className="text-[11px] text-red-600">{error}</p>}
      {message && <p role="status" className="text-[11px] text-emerald-700">{message}</p>}

      <CommonButton type="submit" compact disabled={saving}>
        {saving ? "Saving PIN…" : "Save report PIN"}
      </CommonButton>
    </form>
  );
}

/* -------------------------------------------------------------------------- */
/*  Personal & work details                                                   */
/* -------------------------------------------------------------------------- */

function ProfileDetailsSection({
  profile,
  loading,
  error,
  accessToken,
  onUpdate,
}: {
  profile: UserProfileData | null;
  loading: boolean;
  error: string;
  accessToken: string | undefined;
  onUpdate: (profile: UserProfileData) => void;
}) {
  const [form, setForm] = useState<ProfileForm>(EMPTY_PROFILE_FORM);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [message, setMessage] = useState("");

  function updateField(field: keyof ProfileForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function beginEditing() {
    if (profile) setForm(toForm(profile));
    setSaveError("");
    setMessage("");
    setEditing(true);
  }

  function cancelEditing() {
    if (profile) setForm(toForm(profile));
    setSaveError("");
    setEditing(false);
  }

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!accessToken) return;

    setSaving(true);
    setSaveError("");
    setMessage("");
    try {
      const updated = await updateUserProfile(accessToken, {
        name: form.name.trim(),
        username: form.username.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
      });
      onUpdate(updated);
      setForm(toForm(updated));
      setEditing(false);
      setMessage("Your profile was updated.");
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Could not save your profile.");
    } finally {
      setSaving(false);
    }
  }

  const displayRole = profile ? ROLE_LABELS[profile.role] : "";

  return (
    <section className={CARD_CLASS}>
      <form onSubmit={handleSave} className="flex h-full flex-col">
        <header className="flex items-start justify-between border-b border-gray-300 p-6">
          <div>
            <h3 className="text-sm font-bold text-gray-900">Personal &amp; work details</h3>
            <p className="mt-0.5 text-xs text-gray-500">
              Review your information. Choose Edit to make changes.
            </p>
          </div>

          {/* Fixed height so switching modes never resizes the header. */}
          <div className="flex h-9 items-center">
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
              <button
                type="button"
                onClick={cancelEditing}
                className="inline-flex items-center gap-2 rounded-lg border border-transparent bg-transparent px-3.5 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
            )}
          </div>
        </header>

        {loading ? (
          <p className="p-6 text-sm text-gray-500">Loading profile…</p>
        ) : !profile ? (
          <div className="p-6">
            {error && (
              <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-x-8 gap-y-5 p-6 sm:grid-cols-2 xl:grid-cols-3">
              <ProfileField
                label="Full name"
                value={form.name}
                editing={editing}
                onChange={(v) => updateField("name", v)}
                required
                maxLength={50}
                autoComplete="name"
              />
              <ProfileField
                label="Username"
                value={form.username}
                editing={editing}
                onChange={(v) => updateField("username", v)}
                required
                minLength={3}
                maxLength={50}
                pattern="[a-zA-Z0-9._-]+"
                autoComplete="username"
              />
              <ProfileField
                label="Work email"
                value={form.email}
                editing={editing}
                onChange={(v) => updateField("email", v)}
                type="email"
                required
                maxLength={254}
                autoComplete="email"
              />
              <ProfileField
                label="Mobile number"
                value={form.phone}
                editing={editing}
                onChange={(v) => updateField("phone", v)}
                type="tel"
                maxLength={20}
                pattern="(?:\\+?63|0)9(?:[ -]?\\d){9}"
                placeholder="09171234567 or +639171234567"
              />
              <Field label="Role" value={displayRole || "—"} />
              <Field label="Team" value={profile.team_name ?? "Unassigned"} />
              <Field label="Account status" value={profile.isActive ? "Active" : "Inactive"} />
              <Field label="Member since" value={formatDate(profile.createdAt)} />
              <Field label="Last updated" value={formatDate(profile.updatedAt)} />
            </div>

            {saveError && (
              <p role="alert" className="mx-6 mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                {saveError}
              </p>
            )}
            {message && (
              <p role="status" className="mx-6 mb-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                {message}
              </p>
            )}

            {/* Always in the DOM — `invisible` keeps its box so the card height never changes. */}
            <footer
              className={`mt-auto flex justify-end gap-2 border-t border-gray-100 px-6 py-4 ${
                editing ? "" : "invisible"
              }`}
              aria-hidden={!editing}
            >
              <CommonButton
                type="button"
                variant="gray"
                compact
                disabled={saving}
                onClick={cancelEditing}
                tabIndex={editing ? 0 : -1}
              >
                Cancel
              </CommonButton>
              <CommonButton
                type="submit"
                compact
                disabled={saving}
                tabIndex={editing ? 0 : -1}
              >
                {saving ? "Saving…" : "Save changes"}
              </CommonButton>
            </footer>
          </>
        )}
      </form>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Password                                                                  */
/* -------------------------------------------------------------------------- */

function PasswordSection() {
  const { changePassword } = useAuth();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (next !== confirm) {
      setError("The new passwords do not match.");
      return;
    }

    setSaving(true);
    try {
      await changePassword(current, next);
      setCurrent("");
      setNext("");
      setConfirm("");
      setMessage("Password changed. Other sessions will need to sign in again.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not change your password.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className={CARD_CLASS}>
      <header className="flex items-center gap-2 border-b border-gray-300 p-6">
        <KeyRound size={15} className="text-purple-700" />
        <div>
          <h3 className="text-sm font-bold text-gray-900">Change password</h3>
          <p className="mt-0.5 text-xs text-gray-500">
            Use 8–64 characters. Other signed-in sessions will need to sign in again.
          </p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <CommonInput
            id="profile-current-password"
            label="Current password"
            type="password"
            value={current}
            onChange={(event) => setCurrent(event.target.value)}
            required
            minLength={1}
            autoComplete="current-password"
            showPasswordToggle
            variant="compact"
          />
          <CommonInput
            id="profile-new-password"
            label="New password"
            type="password"
            value={next}
            onChange={(event) => setNext(event.target.value)}
            required
            minLength={8}
            maxLength={64}
            autoComplete="new-password"
            showPasswordToggle
            variant="compact"
          />
          <CommonInput
            id="profile-confirm-password"
            label="Confirm new password"
            type="password"
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
            required
            minLength={8}
            maxLength={64}
            autoComplete="new-password"
            showPasswordToggle
            variant="compact"
          />
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            {error && <p role="alert" className="text-xs text-red-600">{error}</p>}
            {message && <p role="status" className="text-xs text-emerald-700">{message}</p>}
          </div>
          <CommonButton type="submit" compact disabled={saving}>
            {saving ? "Updating password…" : "Update password"}
          </CommonButton>
        </div>
      </form>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Small presentational helpers                                              */
/* -------------------------------------------------------------------------- */

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
      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
        {label}
      </span>
      <InputBase
        {...(inputProps as InputBaseProps)}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        wrapperClassName="mt-1 rounded-md border border-gray-300 bg-white shadow-none ring-0 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100"
        inputClassName="w-full rounded-md px-2.5 py-2 text-xs text-gray-900 outline-none"
      />
    </label>
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

/* -------------------------------------------------------------------------- */
/*  Pure helpers                                                              */
/* -------------------------------------------------------------------------- */

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
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
