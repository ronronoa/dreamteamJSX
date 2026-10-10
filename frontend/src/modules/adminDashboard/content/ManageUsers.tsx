import { useCallback, useEffect, useMemo, useState } from "react";
import { Filter, Pencil, Plus, Search, UserRoundX } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import type { ManagedUser, Role } from "@/types/auth";
import {
  createManagedUser,
  deactivateManagedUser,
  fetchManagedUsers,
  fetchTeams,
  resetManagedUserPassword,
  updateManagedUser,
  type TeamOption,
} from "@/api/manageUsers";
import DataTable from "@/components/common/DataTable";
import CommonButton from "@/components/common/widgets/CommonButton";
import AreYouSureModal from "@/components/common/modals/AreYouSure";
import EditUserModal, { type UserFormValues } from "@/components/common/modals/EditUserModal";
import StatCard from "../component/StatCard";
import TwoLineCell from "../component/TwoLineCell";
import TableStatus from "../component/TableStatus";

const roleLabels: Record<Role, string> = {
  SUPER_ADMIN: "Super Admin",
  DEPARTMENT_HEAD: "Department Head",
  DEPUTY: "Deputy",
  TEAM_LEADER: "Team Leader",
  MEMBER: "Member",
};

function getDeactivationBlockReason(
  user: ManagedUser,
  currentUserId: string | undefined,
  activeSuperAdminCount: number,
) {
  if (user.id === currentUserId) return "You cannot deactivate your own account.";
  if (user.role === "SUPER_ADMIN" && activeSuperAdminCount <= 1) {
    return "At least one active Super Admin account must remain.";
  }
  return null;
}

export default function ManageUsers() {
  const { session } = useAuth();
  const accessToken = session?.accessToken;
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [teams, setTeams] = useState<TeamOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<Role | "ALL">("ALL");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "ACTIVE" | "INACTIVE">("ALL");
  const [selectedUser, setSelectedUser] = useState<ManagedUser | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [modalError, setModalError] = useState("");
  const [deactivateTarget, setDeactivateTarget] = useState<ManagedUser | null>(null);

  const loadUsers = useCallback(async () => {
    if (!accessToken) return;
    setLoading(true);
    setPageError("");
    try {
      const [loadedUsers, loadedTeams] = await Promise.all([
        fetchManagedUsers(accessToken),
        fetchTeams(accessToken),
      ]);
      setUsers(loadedUsers);
      setTeams(loadedTeams);
    } catch (error) {
      setPageError(error instanceof Error ? error.message : "Could not load user accounts.");
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    void (async () => {
      await Promise.resolve();
      await loadUsers();
    })();
  }, [loadUsers]);

  const filteredUsers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return users.filter((user) => {
      const matchesSearch = !normalizedSearch || [user.name, user.username, user.email ?? "", user.phone ?? "", user.team_name ?? ""]
        .some((value) => value.toLowerCase().includes(normalizedSearch));
      const matchesRole = roleFilter === "ALL" || user.role === roleFilter;
      const matchesStatus = statusFilter === "ALL" || (statusFilter === "ACTIVE" ? user.isActive : !user.isActive);
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  function openCreateModal() {
    setSelectedUser(null);
    setModalError("");
    setModalOpen(true);
  }

  function openEditModal(user: ManagedUser) {
    setSelectedUser(user);
    setModalError("");
    setModalOpen(true);
  }

  async function saveUser(values: UserFormValues) {
    if (!accessToken) return;
    if (selectedUser?.id === session?.user.id && !values.isActive) {
      setModalError("You cannot deactivate your own account.");
      return;
    }
    if (
      selectedUser?.role === "SUPER_ADMIN" &&
      selectedUser.isActive &&
      administratorCount <= 1 &&
      (values.role !== "SUPER_ADMIN" || !values.isActive)
    ) {
      setModalError("At least one active Super Admin account must remain.");
      return;
    }
    setSubmitting(true);
    setModalError("");
    setSuccessMessage("");
    try {
      if (selectedUser) {
        await updateManagedUser(accessToken, selectedUser.id, {
          name: values.name,
          username: values.username,
          email: values.email,
          role: values.role,
          phone: values.phone,
          isActive: values.isActive,
          team_id: values.team_id,
        });
        if (values.password) {
          await resetManagedUserPassword(accessToken, selectedUser.id, values.password);
        }
        setSuccessMessage("User account updated.");
      } else {
        await createManagedUser(accessToken, values);
        setSuccessMessage("User account created.");
      }
      setModalOpen(false);
      await loadUsers();
    } catch (error) {
      setModalError(error instanceof Error ? error.message : "Could not save this user.");
    } finally {
      setSubmitting(false);
    }
  }

  async function deactivateUser(user: ManagedUser) {
    if (!accessToken) return;
    setPageError("");
    setSuccessMessage("");
    try {
      await deactivateManagedUser(accessToken, user.id);
      setSuccessMessage(`${user.name}'s account was deactivated.`);
      await loadUsers();
    } catch (error) {
      setPageError(error instanceof Error ? error.message : "Could not deactivate this account.");
    }
  }

  const activeCount = users.filter((user) => user.isActive).length;
  const administratorCount = users.filter((user) => user.isActive && user.role === "SUPER_ADMIN").length;

  return (
    <>
      <AreYouSureModal
        open={deactivateTarget !== null}
        onClose={() => setDeactivateTarget(null)}
        onConfirm={() => deactivateTarget ? deactivateUser(deactivateTarget) : undefined}
        title={`Deactivate ${deactivateTarget?.name ?? "this account"}?`}
        description="This account will no longer be able to sign in. Its records will be kept, and you can reactivate it later by editing the account."
        confirmLabel="Deactivate account"
        variant="danger"
      />
      {modalOpen && <EditUserModal
        open={modalOpen}
        user={selectedUser}
        teams={teams}
        submitting={submitting}
        error={modalError}
        onClose={() => setModalOpen(false)}
        onSubmit={saveUser}
      />}
      <div className="space-y-7">

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <StatCard label="Total Accounts" value={String(users.length)} sub="Registered portal users" variant="primary" />
          <StatCard label="Active Accounts" value={String(activeCount)} sub="Accounts able to sign in" />
          <StatCard label="Super Admins" value={String(administratorCount)} sub="Active privileged accounts" />
        </div>

        {pageError && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{pageError}</p>}
        {successMessage && <p role="status" className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{successMessage}</p>}

        <section>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-bold text-gray-900">User accounts</h2>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700">{filteredUsers.length}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <CommonButton compact onClick={openCreateModal}><span className="inline-flex items-center gap-1"><Plus size={14} /> Add New User</span></CommonButton>
              <label className="relative">
                <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="search" aria-label="Search users" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search users" className="h-9 w-56 rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-xs text-gray-700 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-100" />
              </label>
              <label className="flex h-9 items-center gap-2 rounded-lg border border-gray-200 bg-white px-2 text-xs text-gray-600">
                <Filter size={14} />
                <select aria-label="Filter users by role" value={roleFilter} onChange={(event) => setRoleFilter(event.target.value as Role | "ALL")} className="bg-transparent outline-none">
                  <option value="ALL">All roles</option>
                  {Object.entries(roleLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </label>
              <select aria-label="Filter users by status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as typeof statusFilter)} className="h-9 rounded-lg border border-gray-200 bg-white px-2 text-xs text-gray-600">
                <option value="ALL">All statuses</option><option value="ACTIVE">Active</option><option value="INACTIVE">Inactive</option>
              </select>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <DataTable
              rows={filteredUsers}
              loading={loading}
              rowKey={(user) => user.id}
              emptyMessage={search || roleFilter !== "ALL" || statusFilter !== "ALL" ? "No users match these filters." : "No user accounts yet."}
              columns={[
                { label: "Account", render: (user) => <TwoLineCell top={user.name} bottom={`@${user.username}`} /> },
                { label: "Email", render: (user) => user.email ?? <span className="text-gray-400">Not set</span> },
                { label: "Role", render: (user) => <span className="inline-flex rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">{roleLabels[user.role]}</span> },
                { label: "Team", render: (user) => user.team_name ?? <span className="text-gray-400">Unassigned</span> },
                { label: "Mobile", render: (user) => user.phone ?? <span className="text-gray-400">—</span> },
                { label: "Status", render: (user) => <TableStatus variant={user.isActive ? "active" : "inactive"} /> },
                { label: "Actions", align: "center", render: (user) => {
                  const blockReason = getDeactivationBlockReason(user, session?.user.id, administratorCount);
                  return (
                    <div className="flex items-center justify-center gap-3">
                      <button type="button" aria-label={`Edit ${user.name}`} title="Edit user" onClick={() => openEditModal(user)} className="text-purple-700 hover:text-purple-900"><Pencil size={16} /></button>
                      {user.isActive && <button
                        type="button"
                        aria-label={`Deactivate ${user.name}`}
                        title={blockReason ?? "Deactivate account"}
                        disabled={blockReason !== null}
                        onClick={() => setDeactivateTarget(user)}
                        className="text-gray-500 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <UserRoundX size={16} />
                      </button>}
                    </div>
                  );
                } },
              ]}
            />
          </div>
        </section>
      </div>
    </>
  );
}
