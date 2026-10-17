import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import type { ManagedUser, Role } from "@/types/auth";
import {
  createManagedUser,
  createTeam,
  deleteTeam,
  deactivateManagedUser,
  fetchManagedUsers,
  fetchTeams,
  resetManagedUserPassword,
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
  const [submitting, setSubmitting] = useState(false);
  const [modalError, setModalError] = useState("");
  const [deactivateTarget, setDeactivateTarget] = useState<ManagedUser | null>(null);
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [teamToEdit, setTeamToEdit] = useState<TeamOption | null>(null);
  const [teamToDelete, setTeamToDelete] = useState<TeamOption | null>(null);
  const [teamSubmitting, setTeamSubmitting] = useState(false);
  const [teamError, setTeamError] = useState("");

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

  const activeCount = users.filter((user) => user.isActive).length;
  const administratorCount = users.filter((user) => user.isActive && user.role === "SUPER_ADMIN").length;
  const canManageTeams = session?.user.role === "SUPER_ADMIN" || session?.user.role === "DEPARTMENT_HEAD";

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
          username: values.username,
          email: values.email,
          role: values.role,
          phone: values.phone,
          isActive: values.isActive,
          team_id: values.team_id,
        });
        if (values.password) await resetManagedUserPassword(accessToken, selectedUser.id, values.password);
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

  async function saveTeam(teamName: string) {
    if (!accessToken || teamSubmitting) return;
    setTeamSubmitting(true);
    setTeamError("");
    setPageError("");
    setSuccessMessage("");
    try {
      const { team } = teamToEdit
        ? await updateTeam(accessToken, teamToEdit.team_id, teamName)
        : await createTeam(accessToken, teamName);
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
      setSuccessMessage(teamToEdit ? `${team.team_name} team was updated.` : `${team.team_name} team was created.`);
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
      setTeams((currentTeams) => currentTeams.filter((team) => team.team_id !== teamToDelete.team_id));
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
    session, users, teams, loading, pageError, successMessage, search, setSearch,
    roleFilter, setRoleFilter, statusFilter, setStatusFilter, selectedUser,
    modalOpen, setModalOpen, submitting, modalError, setModalError, deactivateTarget,
    setDeactivateTarget, teamModalOpen, setTeamModalOpen, teamToEdit, setTeamToEdit,
    teamToDelete, setTeamToDelete, teamSubmitting, teamError, setTeamError,
    filteredUsers, activeCount, administratorCount, canManageTeams,
    openCreateModal, openEditModal, saveUser, deactivateUser, saveTeam, removeTeam,
  };
}
