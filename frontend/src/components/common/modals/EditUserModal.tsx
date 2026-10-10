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
  password: string;
}

interface EditUserModalProps {
  open: boolean;
  user: ManagedUser | null;
  teams: TeamOption[];
  submitting: boolean;
  error: string;
  onClose: () => void;
  onSubmit: (values: UserFormValues) => Promise<void>;
}

export default function EditUserModal({
  open,
  user,
  teams,
  submitting,
  error,
  onClose,
  onSubmit,
}: EditUserModalProps) {
  const [name, setName] = useState(user?.name ?? "");
  const [username, setUsername] = useState(user?.username ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [role, setRole] = useState<Role>(user?.role ?? "MEMBER");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [teamId, setTeamId] = useState(user?.team_id ?? "");
  const [isActive, setIsActive] = useState(user?.isActive ?? true);
  const [password, setPassword] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onSubmit({
      name: name.trim(),
      username: username.trim(),
      email: email.trim(),
      role,
      phone: phone.trim() || null,
      team_id: teamId || null,
      isActive,
      password,
    });
  }

  const inputClassName = "!h-10 !rounded-lg !border !border-gray-300 !bg-white !py-2 !pl-3 !text-[13px]";
  const teamOptions = teams.map((team) => ({ label: team.team_name, value: team.team_id }));

  return (
    <Modal open={open} onClose={onClose} dismissable={!submitting}>
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
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <CommonInput id="user-name" label="Full name" value={name} onChange={(event) => setName(event.target.value)} required maxLength={50} className={inputClassName} />
            <CommonInput id="user-username" label="Username" value={username} onChange={(event) => setUsername(event.target.value)} required minLength={3} maxLength={50} pattern="[a-zA-Z0-9._-]+" className={inputClassName} />
            <CommonInput id="user-email" label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required maxLength={254} autoComplete="email" className={inputClassName} />
            <CommonSelect id="user-role" label="Role" value={role} onChange={(event) => setRole(event.target.value as Role)} options={roleOptions} />
            <CommonInput id="user-phone" label="Mobile" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} maxLength={20} pattern="(?:\\+?63|0)9(?:[ -]?\\d){9}" placeholder="09171234567 or +639171234567" className={inputClassName} />
            <CommonSelect id="user-team" label="Team" value={teamId} onChange={(event) => setTeamId(event.target.value)} placeholder="No team assigned" options={teamOptions} />
            <CommonSelect
              id="user-status"
              label="Account status"
              value={isActive ? "active" : "inactive"}
              onChange={(event) => setIsActive(event.target.value === "active")}
              options={[{ label: "Active", value: "active" }, { label: "Inactive", value: "inactive" }]}
            />
            <div className="sm:col-span-2">
              <CommonInput
                id="user-password"
                label={user ? "Set a new password (optional)" : "Account password"}
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required={!user}
                minLength={8}
                maxLength={64}
                autoComplete="new-password"
                showPasswordToggle
                className={inputClassName}
              />
              {!user && <p className="mt-1 text-xs text-gray-500">The user will use this password to sign in. They can contact an administrator if they need it reset.</p>}
              {user && <p className="mt-1 text-xs text-gray-500">Leave blank to keep the current password. Passwords must be 8–64 characters.</p>}
            </div>
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
