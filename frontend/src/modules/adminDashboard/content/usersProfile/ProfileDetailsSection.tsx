import { useState } from "react";
import { Pencil } from "lucide-react";
import CommonButton from "@/components/common/widgets/CommonButton";
import { updateUserProfile, type UserProfileData } from "@/api/profile";
import { formatDateTime } from "@/utils/dateTime";
import { CARD_CLASS, EMPTY_PROFILE_FORM, ROLE_LABELS, toForm, type ProfileForm } from "./profileUtils";
import { Field, ProfileField } from "./ProfileFields";

export default function ProfileDetailsSection({
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
      <form onSubmit={handleSave} className="flex h-full min-h-110 flex-col">
        <header className="flex items-start justify-between border-b border-gray-300 p-6">
          <div>
            <h3 className="text-sm font-bold text-gray-900">Personal &amp; work details</h3>
            <p className="mt-0.5 text-xs text-gray-500">
              Review your information. Choose Edit to make changes.
            </p>
          </div>

          {/* Fixed height so switching modes never resizes the header. */}
          <div className="flex h-9 items-center">
            {!editing && (
              <button
                type="button"
                disabled={loading || !profile}
                onClick={beginEditing}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Pencil size={13} /> Edit profile
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
              <Field label="Member since" value={formatDateTime(profile.createdAt)} />
              <Field label="Last updated" value={formatDateTime(profile.updatedAt)} />
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

