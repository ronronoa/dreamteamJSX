import { Filter, Pencil, Plus, Trash2, UserRoundX } from "lucide-react";
import UserAvatar from "@/components/common/widgets/UserAvatar";
import { getProfilePhotoSource } from "@/api/profile";
import DataTable from "@/components/common/DataTable";
import CommonButton from "@/components/common/widgets/CommonButton";
import RefreshButton from "@/components/common/widgets/RefreshButton";
import AreYouSureModal from "@/components/common/modals/AreYouSure";
import EditUserModal from "@/components/common/modals/EditUserModal";
import StatCard from "../component/StatCard";
import TableStatus from "../component/TableStatus";
import TeamModal from "../component/TeamModal";
import { InputBase } from "@/components/base/input/input";
import type { Role } from "@/types/auth";
import { getDeactivationBlockReason, roleLabels, SearchInputIcon } from "./manageUsers/manageUsersHelpers";
import { useManageUsersDashboard } from "./manageUsers/useManageUsersDashboard";

export default function ManageUsers() {
  const {
    session, isDepartmentHead, users, teams, loading, loadUsers, pageError, successMessage, search, setSearch,
    roleFilter, setRoleFilter, statusFilter, setStatusFilter, selectedUser,
    modalOpen, setModalOpen, submitting, modalError, deactivateTarget,
    setDeactivateTarget, teamModalOpen, setTeamModalOpen, teamToEdit, setTeamToEdit,
    teamToDelete, setTeamToDelete, teamSubmitting, teamError, setTeamError,
    filteredUsers, activeCount, administratorCount, canManageTeams,
    openCreateModal, openEditModal, saveUser, deactivateUser, saveTeam, removeTeam,
  } = useManageUsersDashboard();

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
      <AreYouSureModal
        open={teamToDelete !== null}
        onClose={() => setTeamToDelete(null)}
        onConfirm={removeTeam}
        title={`Delete ${teamToDelete?.team_name ?? "this team"}?`}
        description="This permanently deletes the team and unassigns its users. Teams referenced by operation records cannot be deleted."
        confirmLabel={teamSubmitting ? "Deleting…" : "Delete team"}
        variant="danger"
      />
      {modalOpen && 
        <EditUserModal
          open={modalOpen}
          user={selectedUser}
          teams={teams}
          allowSuperAdminRole={!isDepartmentHead}
          submitting={submitting}
          error={modalError}
          onClose={() => setModalOpen(false)}
          onSubmit={saveUser}
      />}
      {teamModalOpen && 
        <TeamModal
          key={teamToEdit?.team_id ?? "new-team"}
          open={teamModalOpen}
          team={teamToEdit}
          submitting={teamSubmitting}
          error={teamError}
          onClose={() => { setTeamModalOpen(false); setTeamToEdit(null); setTeamError(""); }}
          onSubmit={saveTeam}
        />}
      <div className="space-y-7">

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <StatCard label="Total Accounts" value={String(users.length)} sub="Registered portal users" variant="primary" />
          <StatCard label="Active Accounts" value={String(activeCount)} sub="Accounts able to sign in" />
          <StatCard label="Super Admins" value={String(administratorCount)} sub="Active privileged accounts" />
        </div>

        {pageError && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{pageError}</p>}
        {successMessage && <p role="status" className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{successMessage}</p>}


        <section className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Response teams</h2>
              <p className="mt-1 text-xs text-gray-500">Active teams available for user and operation assignment.</p>
            </div>
            {canManageTeams && <CommonButton compact onClick={() => { setTeamToEdit(null); setTeamError(""); setTeamModalOpen(true); }}>
              <span className="inline-flex items-center gap-1"><Plus size={14} /> Add team</span>
            </CommonButton>}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {teams.length > 0 ? teams.map((team) => (
              <div key={team.team_id} className="inline-flex items-center gap-2 rounded-full bg-purple-50 py-1 pl-3 pr-2 text-xs font-medium text-purple-800">
                <span>{team.team_name}</span>
                {canManageTeams && <>
                  <button type="button" aria-label={`Edit ${team.team_name}`} title="Edit team" onClick={() => { setTeamToEdit(team); setTeamError(""); setTeamModalOpen(true); }} className="text-purple-600 hover:text-purple-900">
                    <Pencil size={13} />
                  </button>
                  <button type="button" aria-label={`Delete ${team.team_name}`} title="Delete team" onClick={() => setTeamToDelete(team)} className="text-gray-500 hover:text-red-700">
                    <Trash2 size={13} />
                  </button>
                </>}
              </div>
            )) : <p className="text-xs text-gray-500">No teams have been created.</p>}
          </div>
        </section>
        <section>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-bold text-gray-900">User accounts</h2>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700">{filteredUsers.length}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <CommonButton compact onClick={openCreateModal}><span className="inline-flex items-center gap-1"><Plus size={14} /> Add New User</span></CommonButton>
              <label>
                <InputBase type="search" aria-label="Search users" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search users" icon={SearchInputIcon} wrapperClassName="h-9 w-56 rounded-lg border border-gray-200 bg-white shadow-none ring-0 focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-100" inputClassName="h-full rounded-lg py-0 pr-3 text-xs text-gray-700" />
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
              <RefreshButton label="Refresh user accounts" loading={loading} onRefresh={loadUsers} />
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <DataTable
              rows={filteredUsers}
              loading={loading}
              rowKey={(user) => user.id}
              emptyMessage={search || roleFilter !== "ALL" || statusFilter !== "ALL" ? "No users match these filters." : "No user accounts yet."}
              columns={[
                { label: "Account", render: (user) => (
                  <div className="flex min-w-0 items-center gap-3">
                    <UserAvatar
                      initials={getUserInitials(user.name)}
                      imageUrl={getProfilePhotoSource(user.profileImageUrl)}
                      size="sm"
                      className="shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-gray-900">{user.name}</p>
                      <p className="truncate text-[10px] text-gray-500">@{user.username}</p>
                    </div>
                  </div>
                ) },
                { label: "Email", render: (user) => user.email ?? <span className="text-gray-400">Not set</span> },
                { label: "Role", render: (user) => <span className="inline-flex rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">{roleLabels[user.role]}</span> },
                { label: "Team", render: (user) => user.team_name ?? <span className="text-gray-400">Unassigned</span> },
                { label: "Mobile", render: (user) => user.phone ?? <span className="text-gray-400">—</span> },
                { label: "Status", render: (user) => <TableStatus variant={user.isActive ? "active" : "inactive"} /> },
                { label: "Actions", align: "center", render: (user) => {
                  const blockReason = getDeactivationBlockReason(user, session?.user.id, administratorCount);
                  const cannotManageAccount = isDepartmentHead && user.role === "SUPER_ADMIN";
                  if (cannotManageAccount) {
                    return <span className="text-xs text-gray-400" title="Department Heads cannot edit Super Admin accounts">Protected</span>;
                  }
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

function getUserInitials(name: string) {
  const nameParts = name.trim().split(/\s+/).filter(Boolean);
  if (nameParts.length === 0) return "?";

  return nameParts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
