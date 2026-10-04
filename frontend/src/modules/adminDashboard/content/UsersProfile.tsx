import { useState } from "react";
import { Camera, Pencil } from "lucide-react";

import CommonButton from "@/components/common/widgets/CommonButton";
import UserAvatar from "@/components/common/widgets/UserAvatar";
import { useAuth } from "@/context/AuthContext";

// ── Placeholder data (until wired to API) ────────────────

const profile = {
  fullName: "Captain Hooks",
  username: "caphooks123",
  email: "caphooks@gmail.com",
  mobile: "+63 917 648 2310",
  role: "Emergency Operations Administrator",
  team: "Alpha",
  employeeId: "BHERT-176-024",
  emergencyContact: "Flying Dutchman · +63 918 212 9440",
  status: "Active" as const,
};

export default function UserProfile() {
  const { session } = useAuth();
  const user = session?.user;

  const displayName = user?.name ?? profile.fullName;
  const displayUserName = user?.username ?? profile.username;
  const displayRole = user?.role ?? profile.role;
  const initials = getInitials(displayName);

  const [editing, setEditing] = useState(false);

  return (
    <div className="grid grid-cols-1 gap-3 xl:mt-10 xl:grid-cols-[400px_1fr]">
      {/* ── Left: Identity card ─────────────────────────── */}
      <aside className="rounded-2xl border border-gray-600 bg-white p-6 pb-17 flex flex-col">
        <div className="flex flex-col items-center">
          <UserAvatar
            initials={initials}
            size="xl"
            orientation="vertical"
            variant="onLight"
            tone="purple"
          />

          <h2 className="mt-4 text-lg font-bold text-gray-900">{displayName}</h2>
          <p className="mt-0.5 text-xs text-gray-500">{displayRole}</p>

          <span className="mt-3 inline-flex rounded-full bg-purple-100 px-3 py-1 text-[11px] font-semibold text-purple-700">
            {profile.status}
          </span>

          <button
            type="button"
            className="mt-5 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50"
          >
            <Camera size={14} className="text-purple-600" />
            Change profile photo
          </button>

          <p className="mt-3 text-center text-[10px] leading-relaxed text-gray-400">
            JPG or PNG · up to 5 MB
            <br />
            Use a clear headshot for field identification.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 border-t border-gray-300 pt-5">
          <Detail label="Responder ID" value={profile.employeeId} />
          <Detail label="Team" value={profile.team} />
        </div>
      </aside>

      {/* ── Right: Details card ─────────────────────────── */}
      <section className="rounded-2xl border border-gray-600 bg-white">
        <header className="flex items-start justify-between border-b border-gray-300 p-6">
          <div>
            <h3 className="text-sm font-bold text-gray-900">
              Personal &amp; work details
            </h3>
            <p className="mt-0.5 text-xs text-gray-500">
              Review your information. Choose Edit to make changes.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setEditing((v) => !v)}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50"
          >
            <Pencil size={13} />
            {editing ? "Cancel" : "Edit profile"}
          </button>
        </header>

        <div className="grid grid-cols-1 gap-x-8 gap-y-5 p-6 sm:grid-cols-2">
          <Field label="Full name" value={displayName} />
          <Field label="Username" value={displayUserName} />
          <Field label="Work email" value={profile.email} />
          <Field label="Mobile number" value={profile.mobile} />
          <Field label="Role" value={profile.role} />
          <Field label="Team" value={profile.team} />
          <Field label="Employee / responder ID" value={profile.employeeId} />
          <Field label="Emergency contact" value={profile.emergencyContact} />
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-6 py-4">
          <div className="flex items-center gap-2 text-[11px] text-gray-500">
            <span className="h-2.5 w-2.5 rounded-full border-2 border-emerald-500" />
            Last updated 25 Aug 2026, 10:22 AM
          </div>

          <CommonButton disabled={!editing}>
            Save changes
          </CommonButton>
        </footer>
      </section>
    </div>
  );
}

// ── Primitives ────────────────────────────────────────────

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-gray-100 pb-3">
      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
        {label}
      </p>
      <p className="mt-1 text-xs text-gray-900">{value}</p>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-medium text-gray-500">{label}</p>
      <p className="mt-0.5 text-xs font-bold text-gray-900">{value}</p>
    </div>
  );
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
