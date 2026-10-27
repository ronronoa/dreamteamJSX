import { useState } from "react";
import { Pencil, Plus, X } from "lucide-react";
import Modal from "@/components/common/modals/Modal";
import CommonButton from "@/components/common/widgets/CommonButton";
import CommonInput from "@/components/common/widgets/CommonInput";
import type { TeamOption } from "@/api/manageUsers";

interface TeamModalProps {
  open: boolean;
  team?: TeamOption | null;
  submitting: boolean;
  error: string;
  onClose: () => void;
  onSubmit: (teamName: string) => Promise<void>;
}

export default function TeamModal({
  open,
  team = null,
  submitting,
  error,
  onClose,
  onSubmit,
}: TeamModalProps) {
  const [teamName, setTeamName] = useState(team?.team_name ?? "");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanedTeamName = teamName.trim();
    if (!cleanedTeamName) return;
    await onSubmit(cleanedTeamName);
  }

  function handleClose() {
    setTeamName("");
    onClose();
  }

  return (
    <Modal open={open} onClose={handleClose} dismissable={!submitting}>
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100">
            {team ? <Pencil size={17} className="text-purple-700" /> : <Plus size={17} className="text-purple-700" />}
          </div>
          <h2 className="text-sm font-bold text-slate-900">{team ? "Edit response team" : "Add response team"}</h2>
        </div>
        <button type="button" onClick={handleClose} aria-label="Close modal" disabled={submitting} className="text-slate-500 hover:text-slate-900 disabled:opacity-50">
          <X size={17} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <CommonInput
          id="team-name"
          label="Team name"
          value={teamName}
          onChange={(event) => setTeamName(event.target.value)}
          maxLength={100}
          placeholder="Enter a team name"
          required
        />
        {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        <div className="flex justify-end gap-2">
          <CommonButton type="button" variant="gray" compact disabled={submitting} onClick={handleClose}>Cancel</CommonButton>
          <CommonButton type="submit" variant="purple" compact disabled={submitting || !teamName.trim()}>
            {submitting ? "Saving…" : team ? "Save changes" : "Add team"}
          </CommonButton>
        </div>
      </form>
    </Modal>
  );
}
