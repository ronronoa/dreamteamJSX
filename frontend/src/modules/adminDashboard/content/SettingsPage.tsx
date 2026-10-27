import { useEffect, useState, type FormEvent } from "react"
import { Bell, FileText, FormInput, Shield, Sparkles } from "lucide-react"
import { useNavigate } from "react-router"
import CommonButton from "@/components/common/widgets/CommonButton"
import CommonInput from "@/components/common/widgets/CommonInput"
import { useAuth } from "@/store/useAuth"
import { fetchSettings, setGlobalPin, updateUserPreferences, updateWorkspaceSettings, type SettingsResponse } from "@/api/settings"
import { ROUTES } from "@/routes"
import { Row, Select, SettingsSection, Toggle } from "./settings/SettingsPrimitives"

const defaultSettings: SettingsResponse = {
  workspace: {
    systemName: "Barangay 176-E DRRMO Operation Logistics Management System",
    officeName: "Disaster Risk Reduction and Management Office",
    officeHotline: "(02) 8241 1760",
    archiveRetention: "1-year",
  },
  preferences: { lowStockAlerts: false, approvalNotifications: false, sessionTimeout: "30-min" },
  globalPinConfigured: false,
}

export default function SettingsPage() {
  const { session } = useAuth()
  const navigate = useNavigate()
  const [settings, setSettings] = useState(defaultSettings)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [pin, setPin] = useState("")
  const [pinConfirm, setPinConfirm] = useState("")
  const canManageGlobalPin = ["SUPER_ADMIN", "DEPARTMENT_HEAD", "DEPUTY", "TEAM_LEADER"].includes(session?.user.role ?? "")
  const canManageWorkspace = ["SUPER_ADMIN", "DEPARTMENT_HEAD", "DEPUTY"].includes(session?.user.role ?? "")

  useEffect(() => {
    if (!session?.accessToken) return
    let active = true
    fetchSettings(session.accessToken)
      .then((result) => { if (active) setSettings(result) })
      .catch((requestError) => { if (active) setError(requestError instanceof Error ? requestError.message : "Could not load settings.") })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [session?.accessToken])

  async function saveWorkspace() {
    if (!session?.accessToken) return
    setSaving(true); setError(""); setMessage("")
    try {
      const result = await updateWorkspaceSettings(session.accessToken, settings.workspace)
      setSettings(result); setMessage("Workspace settings saved.")
    } catch (requestError) { setError(requestError instanceof Error ? requestError.message : "Could not save workspace settings.") }
    finally { setSaving(false) }
  }

  async function savePreferences(patch: Partial<SettingsResponse["preferences"]>) {
    if (!session?.accessToken || saving) return
    const nextPreferences = { ...settings.preferences, ...patch }
    setSettings((current) => ({ ...current, preferences: nextPreferences }))
    setSaving(true); setError(""); setMessage("")
    try {
      const result = await updateUserPreferences(session.accessToken, patch)
      setSettings(result)
      window.dispatchEvent(new Event("settings:preferences-updated"))
      setMessage("Preferences saved.")
    } catch (requestError) {
      setSettings((current) => ({ ...current, preferences: settings.preferences }))
      setError(requestError instanceof Error ? requestError.message : "Could not save preferences.")
    } finally { setSaving(false) }
  }

  async function submitGlobalPin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setMessage("")
    if (!/^\d{4,6}$/.test(pin)) { setError("Global PIN must contain 4 to 6 digits."); return }
    if (pin !== pinConfirm) { setError("PIN entries do not match."); return }
    if (!session?.accessToken) { setError("Sign in again to update the global PIN."); return }
    setSaving(true)
    try {
      await setGlobalPin(session.accessToken, pin)
      setPin(""); setPinConfirm("")
      setSettings((current) => ({ ...current, globalPinConfigured: true }))
      setMessage("Global PIN saved.")
    } catch (requestError) { setError(requestError instanceof Error ? requestError.message : "Could not save the global PIN.") }
    finally { setSaving(false) }
  }

  if (loading) return <div className="p-6 text-sm text-gray-500">Loading settings…</div>

  return (
    <div className="mx-auto max-w-[2500px] space-y-2">
      {error && <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {message && <p role="status" className="rounded-md bg-emerald-50 p-3 text-sm text-emerald-700">{message}</p>}

      <SettingsSection icon={Sparkles} title="Workspace identity" description="Set the shared system name and office contact details.">
        <Row label="System name"><CommonInput aria-label="System name" value={settings.workspace.systemName} onChange={(event) => setSettings((current) => ({ ...current, workspace: { ...current.workspace, systemName: event.target.value } }))} disabled={!canManageWorkspace || saving} /></Row>
        <Row label="Office name"><CommonInput aria-label="Office name" value={settings.workspace.officeName} onChange={(event) => setSettings((current) => ({ ...current, workspace: { ...current.workspace, officeName: event.target.value } }))} disabled={!canManageWorkspace || saving} /></Row>
        <Row label="Office hotline"><CommonInput aria-label="Office hotline" value={settings.workspace.officeHotline} onChange={(event) => setSettings((current) => ({ ...current, workspace: { ...current.workspace, officeHotline: event.target.value } }))} disabled={!canManageWorkspace || saving} /></Row>
        {canManageWorkspace && <div className="flex justify-end"><CommonButton compact disabled={saving} onClick={() => void saveWorkspace()}>{saving ? "Saving…" : "Save workspace"}</CommonButton></div>}
      </SettingsSection>

      <SettingsSection icon={Bell} title="Alerts & notifications" description="Choose which operational changes require attention.">
        <Row label="Low stock alerts" hint="Notify when supplies are low or expired.">
          <Toggle 
            label="Low stock alerts"
            checked={settings.preferences.lowStockAlerts}
            disabled={saving}
            onChange={(checked) => void savePreferences({ lowStockAlerts: checked })}
          />
        </Row>
        <Row label="Approval notifications" hint="Notify when new reports are submitted." isLast><Toggle label="Approval notifications" checked={settings.preferences.approvalNotifications} disabled={saving} onChange={(checked) => void savePreferences({ approvalNotifications: checked })} /></Row>
      </SettingsSection>

      <SettingsSection
        icon={FileText}
        title="Reports & records"
        description="Control report settings and retention policy."
      >
        <Row
          label="Archive retention"
          hint="Saved policy preference; this does not automatically delete records."
          isLast
        >
          <Select
            disabled={!canManageWorkspace || saving}
            value={settings.workspace.archiveRetention}
            onChange={(archiveRetention) => setSettings((current) => ({
              ...current, workspace: { ...current.workspace, archiveRetention } }
            ))} options={[{ value: "6-months", label: "6 months" },
              { value: "1-year", label: "1 year" },
              { value: "3-years", label: "3 years" },
              { value: "5-years", label: "5 years" },
              { value: "10-years", label: "10 years" },
              { value: "Never", label: "Never" }
            ]}
          />
        </Row>
        {canManageWorkspace && <div className="flex justify-end"><CommonButton compact disabled={saving} onClick={() => void saveWorkspace()}>{saving ? "Saving…" : "Save retention policy"}</CommonButton></div>}
      </SettingsSection>

      {canManageGlobalPin && <SettingsSection icon={Shield} title="Global PIN" description="Shared PIN used to submit report forms.">
        <p className="text-xs text-gray-600">{settings.globalPinConfigured ? "A global PIN is configured." : "No global PIN has been set yet."}</p>
        <form onSubmit={(event) => void submitGlobalPin(event)} className="max-w-md space-y-3">
          <CommonInput label="New global PIN" type="password" inputMode="numeric" autoComplete="new-password" maxLength={6} value={pin} onChange={(event) => setPin(event.target.value.replace(/\D/g, ""))} disabled={saving} required />
          <CommonInput label="Confirm global PIN" type="password" inputMode="numeric" autoComplete="new-password" maxLength={6} value={pinConfirm} onChange={(event) => setPinConfirm(event.target.value.replace(/\D/g, ""))} disabled={saving} required />
          <CommonButton type="submit" compact disabled={saving}>{saving ? "Saving…" : "Save global PIN"}</CommonButton>
        </form>
      </SettingsSection>}

      <SettingsSection icon={Shield} title="Security & accessibility" description="Choose how long an inactive session stays signed in.">
        <Row label="Session timeout" hint="You will be signed out after this period without activity." isLast>
          <Select disabled={saving} value={settings.preferences.sessionTimeout} onChange={(sessionTimeout) => void savePreferences({ sessionTimeout: sessionTimeout as SettingsResponse["preferences"]["sessionTimeout"] })} options={[{ value: "15-min", label: "15 minutes" }, { value: "30-min", label: "30 minutes" }, { value: "1-hour", label: "1 hour" }, { value: "2-hours", label: "2 hours" }]} />
        </Row>
      </SettingsSection>

      <SettingsSection icon={FormInput} title="Forms management" description="Manage the vehicle options available on dispatch forms.">
        <Row label="Vehicle fleet" hint="Add and manage registered vehicles" isLast><CommonButton compact onClick={() => navigate(ROUTES.DASHBOARD.VEHICLES)}>Open vehicles</CommonButton></Row>
      </SettingsSection>
    </div>
  )
}
