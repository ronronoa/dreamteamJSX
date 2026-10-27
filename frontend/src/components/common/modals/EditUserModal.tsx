import { formatUserName, getUserNameParts, suggestUsername } from "@/utils/userName";
import { revealManagedUserPin } from "@/api/manageUsers";
import { REPORT_PIN_PATTERN, REPORT_PIN_HINT } from "@/utils/reportPin";
import { useState } from "react";
import { Pencil, X } from "lucide-react";
import Modal from "./Modal";
import CommonButton from "../widgets/CommonButton";
import CommonInput from "../widgets/CommonInput";
import CommonSelect from "../widgets/CommonSelect";
import type { ManagedUser, Role } from "@/types/auth";
import type { ManagedUserInput, TeamOption } from "@/api/manageUsers";

const roleOptions: { label: string; value: Role }[] = [
  { label: "Super Admin", value: "SUPER_ADMIN" },
  { label: "Department Head", value: "DEPARTMENT_HEAD" },
  { label: "Deputy", value: "DEPUTY" },
  { label: "Team Leader", value: "TEAM_LEADER" },
  { label: "Member", value: "MEMBER" },
];

export interface UserFormValues extends ManagedUserInput {
  password?: string;
  pin?: string;
}

interface EditUserModalProps {
  open: boolean;
  accessToken?: string;
  user: ManagedUser | null;
  teams: TeamOption[];
  allowSuperAdminRole: boolean;
  submitting: boolean;
  error: string;
  onClose: () => void;
  onSubmit: (values: UserFormValues) => Promise<void>;
}

export default function EditUserModal({
  open,
  accessToken,
  user,
  teams,
  allowSuperAdminRole,
  submitting,
  error,
  onClose,
  onSubmit,
}: EditUserModalProps) {
  const [nameParts, setNameParts] = useState(() => getUserNameParts(user));
  const [usernameEdited, setUsernameEdited] = useState(Boolean(user));
  const [currentPin, setCurrentPin] = useState<string | null>(null);
  const [pinVisible, setPinVisible] = useState(false);
  const [pinLoading, setPinLoading] = useState(false);
  const [pinError, setPinError] = useState("");
  const [username, setUsername] = useState(user?.username ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [role, setRole] = useState<Role>(user?.role ?? "MEMBER");
  const [phone, setPhone] = useState(() => (user?.phone ?? "").replace(/[^0-9]/g, ""));
  const [teamId, setTeamId] = useState(user?.team_id ?? "");
  const [isActive, setIsActive] = useState(user?.isActive ?? true);
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");

  function changeName(field: keyof typeof nameParts, value: string) {
    const isNameField = field === "firstName" || field === "lastName";
    const cleanValue = isNameField ? value.replace(/[^\p{L}\p{M} ]/gu, "") : value;
    const next = { ...nameParts, [field]: cleanValue };
    setNameParts(next);
    if (!usernameEdited) setUsername(suggestUsername(next.firstName, next.lastName));
  }

  async function showCurrentPin() {
    if (pinVisible) { setPinVisible(false); return; }
    if (!user || !accessToken) return;
    setPinError("");
    setPinLoading(true);
    try {
      const result = await revealManagedUserPin(accessToken, user.id);
      setCurrentPin(result.pin);
      setPinVisible(true);
    } catch (error) {
      setPinError(error instanceof Error ? error.message : "Could not load the current PIN.");
    } finally { setPinLoading(false); }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onSubmit({
      name: formatUserName(nameParts),
      ...nameParts,
      username: username.trim(),
      email: email.trim() || null,
      role,
      phone: phone.trim() || null,
      team_id: teamId || null,
      isActive,
      ...(user && password ? { password } : {}),
      ...(user && role !== "MEMBER" && pin ? { pin } : {}),
    });
  }

  const inputClassName = "!h-10 !rounded-lg !border !border-gray-300 !bg-white !py-2 !pl-3 !text-[13px]";
  const teamOptions = [
    { label: "Unassigned", value: "" },
    ...teams.map((team) => ({ label: team.team_name, value: team.team_id })),
  ];
  const availableRoleOptions = allowSuperAdminRole
    ? roleOptions
    : roleOptions.filter((option) => option.value !== "SUPER_ADMIN");

  return (
    <Modal open={open} onClose={onClose} dismissable={!submitting} className="sm:max-w-3xl">
      <div className="w-full bg-white">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100">
              <Pencil size={17} className="text-purple-700" />
            </div>
            <h2 className="text-sm font-bold text-slate-900">{user ? "Edit user" : "Add user"}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close modal" className="text-slate-500 hover:text-slate-900">
            <X size={17} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,2fr)_minmax(0,2fr)_minmax(0,1fr)_minmax(0,1.5fr)]">
            <CommonInput id="user-last-name" label="Last name" value={nameParts.lastName} onChange={(event) => changeName("lastName", event.target.value)} required={!user || Boolean(user.lastName)} maxLength={80} className={inputClassName} />
            <CommonInput id="user-first-name" label="First name" value={nameParts.firstName} onChange={(event) => changeName("firstName", event.target.value)} required maxLength={80} className={inputClassName} />
            <CommonInput id="user-middle-initial" label="MI (optional)" value={nameParts.middleInitial} onChange={(event) => changeName("middleInitial", event.target.value.replace(/[^a-z]/gi, "").toUpperCase())} maxLength={1} className={inputClassName} />
            <CommonInput id="user-suffix" label="Suffix (optional)" value={nameParts.suffix} onChange={(event) => changeName("suffix", event.target.value)} maxLength={20} placeholder="Jr., Sr., III" className={inputClassName} />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <CommonInput id="user-username" label="Username" value={username} onChange={(event) => { setUsername(event.target.value); setUsernameEdited(Boolean(event.target.value)); }} required minLength={3} maxLength={50} pattern="[a-zA-Z0-9._-]+" className={inputClassName} />
            <CommonInput id="user-email" label="Email (optional)" type="email" value={email} onChange={(event) => setEmail(event.target.value)} maxLength={254} autoComplete="email" className={inputClassName} />
            <CommonSelect id="user-role" label="Role" value={role} onChange={(event) => { setRole(event.target.value as Role); setPassword(""); }} options={availableRoleOptions} />
            <CommonInput id="user-phone" label="Mobile" type="tel" inputMode="numeric" value={phone} onChange={(event) => setPhone(event.target.value.replace(/[^0-9]/g, ""))} maxLength={12} pattern="(?:63|0)9[0-9]{9}" title="Enter a valid mobile number using digits only, such as 09171234567 or 639171234567." placeholder="09171234567 or 639171234567" className={inputClassName} />
            <CommonSelect id="user-team" required label="Team" value={teamId} onChange={(event) => setTeamId(event.target.value)} options={teamOptions} />
            {user && <CommonSelect
              id="user-status"
              label="Account status"
              value={isActive ? "active" : "inactive"}
              onChange={(event) => setIsActive(event.target.value === "active")}
              options={[{ label: "Active", value: "active" }, { label: "Inactive", value: "inactive" }]}
            />}
            {user && user.role !== "MEMBER" && role !== "MEMBER" && <div className="sm:col-span-2 space-y-2">
              <CommonButton type="button" variant="gray" compact onClick={() => void showCurrentPin()} disabled={pinLoading || submitting}>
                {pinLoading ? "Loading PIN…" : pinVisible ? "Hide current PIN" : "View current PIN"}
              </CommonButton>
              {pinVisible && currentPin && <CommonInput id="user-current-report-pin" label="Current report PIN" value={currentPin} readOnly className={inputClassName} />}
              {pinError && <p role="alert" className="text-xs text-red-700">{pinError}</p>}
              <CommonInput
                id="user-report-pin"
                label={user ? "New report PIN (leave blank to keep current)" : "Report PIN"}
                type="password"
                showPasswordToggle
                autoComplete="new-password"
                value={pin}
                onChange={(event) => setPin(event.target.value.replace(/\D/g, ""))}
                disabled={submitting}
                minLength={4}
                maxLength={4}
                pattern={REPORT_PIN_PATTERN}
                inputMode="numeric"
                placeholder="0482"
                className={inputClassName}
              />
              <p className="mt-1 text-xs text-gray-600">{REPORT_PIN_HINT} This PIN must not belong to another user.</p>
            </div>}
            {(!user || user.role === "MEMBER") && role !== "MEMBER" && <p className="text-xs text-gray-600 sm:col-span-2">A unique, random four-digit report PIN will be generated after saving. You can view it again by editing this user.</p>}
            {role === "MEMBER" && <p className="text-xs text-gray-600 sm:col-span-2">Members do not have report PINs.</p>}
            {!user && <p className="text-xs text-gray-600 sm:col-span-2">The default password is the user's last name in uppercase (for example, Santos → SANTOS).</p>}
            {user && <div className="sm:col-span-2">
              <CommonInput
                id="user-password"
                label="Set a new password (optional)"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                minLength={8}
                maxLength={64}
                autoComplete="new-password"
                showPasswordToggle
                className={inputClassName}
              />
              <p className="mt-1 text-xs text-gray-500">Leave blank to keep the current password. New passwords must be 8–64 characters.</p>
            </div>}
          </div>

          {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
          <div className="mt-5 flex justify-end gap-2">
            <CommonButton type="button" variant="gray" compact onClick={onClose} disabled={submitting}>Cancel</CommonButton>
            <CommonButton type="submit" variant="purple" compact disabled={submitting}>{submitting ? "Saving…" : user ? "Update user" : "Create user"}</CommonButton>
          </div>
        </form>
      </div>
    </Modal>
  );
}
