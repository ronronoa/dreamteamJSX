import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/store/useAuth";
import type { ManagedUser, Role } from "@/types/auth";
import {
  createManagedUser,
  createTeam,
  deleteTeam,
  deactivateManagedUser,
  fetchManagedUsers,
  fetchTeams,
  updateManagedUser,
  updateTeam,
  type TeamOption,
} from "@/api/manageUsers";
import type { UserFormValues } from "@/components/common/modals/EditUserModal";

export function useManageUsersDashboard() {
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
  const [issuedPin, setIssuedPin] = useState<{ name: string; pin: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [modalError, setModalError] = useState("");
  const [deactivateTarget, setDeactivateTarget] = useState<ManagedUser | null>(null);
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [teamToEdit, setTeamToEdit] = useState<TeamOption | null>(null);
  const [teamToDelete, setTeamToDelete] = useState<TeamOption | null>(null);
  const [teamSubmitting, setTeamSubmitting] = useState(false);
  const [teamError, setTeamError] = useState("");
  const isDepartmentHead = session?.user.role === "DEPARTMENT_HEAD";

  const loadUsers = useCallback(async () => {
    if (!accessToken) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setPageError("");
    try {
      const [loadedUsers, loadedTeams] = await Promise.all([
        fetchManagedUsers(accessToken),
        fetchTeams(accessToken),
      ]);
      setUsers(loadedUsers);
      setTeams([...loadedTeams].sort((first, second) =>
        first.team_name.localeCompare(second.team_name, undefined, { sensitivity: "base" }),
      ));
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

  const visibleUsers = useMemo(() => {
    if (!isDepartmentHead) return users;
    return users.filter((user) => user.role !== "SUPER_ADMIN");
  }, [users, isDepartmentHead]);

  const filteredUsers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return visibleUsers.filter((user) => {
      const matchesSearch = !normalizedSearch || [user.name, user.username, user.email ?? "", user.phone ?? "", user.team_name ?? ""]
        .some((value) => value.toLowerCase().includes(normalizedSearch));
      const matchesRole = roleFilter === "ALL" || user.role === roleFilter;
      const matchesStatus = statusFilter === "ALL" || (statusFilter === "ACTIVE" ? user.isActive : !user.isActive);
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [visibleUsers, search, roleFilter, statusFilter]);

  const activeCount = visibleUsers.filter((user) => user.isActive).length;
  const administratorCount = visibleUsers.filter((user) => user.isActive && user.role === "SUPER_ADMIN").length;
  const canManageTeams = session?.user.role === "SUPER_ADMIN" || session?.user.role === "DEPARTMENT_HEAD";

  function openCreateModal() {
    setSelectedUser(null);
    setModalError("");
    setModalOpen(true);
  }

  function openEditModal(user: ManagedUser) {
    if (isDepartmentHead && user.role === "SUPER_ADMIN") return;
    setSelectedUser(user);
    setModalError("");
    setModalOpen(true);
  }

  async function saveUser(values: UserFormValues) {
    if (!accessToken) return;
    if (isDepartmentHead && (selectedUser?.role === "SUPER_ADMIN" || values.role === "SUPER_ADMIN")) {
      setModalError("Department Heads cannot create, promote, or edit Super Admin accounts.");
      return;
    }
    if (selectedUser?.id === session?.user.id && !values.isActive) {
      setModalError("You cannot deactivate your own account.");
      return;
    }
    if (selectedUser?.role === "SUPER_ADMIN" && selectedUser.isActive && administratorCount <= 1 && (values.role !== "SUPER_ADMIN" || !values.isActive)) {
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
          firstName: values.firstName,
          lastName: values.lastName,
          middleInitial: values.middleInitial,
          suffix: values.suffix,
          username: values.username,
          email: values.email,
          role: values.role,
          phone: values.phone,
          isActive: values.isActive,
          team_id: values.team_id,
          ...(values.pin ? { pin: values.pin } : {}),
          ...(values.password ? { password: values.password } : {}),
        });
        setSuccessMessage("User account updated.");
      } else {
        const result = await createManagedUser(accessToken, values);
        if (result.generatedPin) {
          setIssuedPin({ name: result.user.name, pin: result.generatedPin });
        }
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

  async function saveTeam(teamName: string) {
    if (!accessToken || teamSubmitting) return;
    setTeamSubmitting(true);
    setTeamError("");
    setPageError("");
    setSuccessMessage("");
    try {
      let team: TeamOption;

      if (teamToEdit) {
        ({ team } = await updateTeam(accessToken, teamToEdit.team_id, teamName));
      } else {
        ({ team } = await createTeam(accessToken, teamName));
      }

      setTeams((currentTeams) => {
        const updatedTeams = teamToEdit
          ? currentTeams.map((currentTeam) => currentTeam.team_id === team.team_id ? team : currentTeam)
          : [...currentTeams, team];
        return updatedTeams.sort((first, second) =>
          first.team_name.localeCompare(second.team_name, undefined, { sensitivity: "base" }),
        );
      });
      setTeamModalOpen(false);
      setTeamToEdit(null);
      const successText = teamToEdit
        ? `${team.team_name} team was updated.`
        : `${team.team_name} team was created.`;
      setSuccessMessage(successText);
    } catch (error) {
      setTeamError(error instanceof Error ? error.message : "Could not save this team.");
    } finally {
      setTeamSubmitting(false);
    }
  }

  async function removeTeam() {
    if (!accessToken || !teamToDelete || teamSubmitting) return;
    setTeamSubmitting(true);
    setPageError("");
    setSuccessMessage("");
    try {
      await deleteTeam(accessToken, teamToDelete.team_id);
      await loadUsers();
      setSuccessMessage(`${teamToDelete.team_name} team was deleted.`);
      setTeamToDelete(null);
    } catch (error) {
      setPageError(error instanceof Error ? error.message : "Could not delete this team.");
      setTeamToDelete(null);
    } finally {
      setTeamSubmitting(false);
    }
  }

  return {
    session, isDepartmentHead, users, teams, loading, loadUsers, pageError, successMessage, search, setSearch,
    roleFilter, setRoleFilter, statusFilter, setStatusFilter, selectedUser,
    issuedPin, setIssuedPin, modalOpen, setModalOpen, submitting, modalError, setModalError, deactivateTarget,
    setDeactivateTarget, teamModalOpen, setTeamModalOpen, teamToEdit, setTeamToEdit,
    teamToDelete, setTeamToDelete, teamSubmitting, teamError, setTeamError,
    visibleUsers, filteredUsers, activeCount, administratorCount, canManageTeams,
    openCreateModal, openEditModal, saveUser, deactivateUser, saveTeam, removeTeam,
  };
}
