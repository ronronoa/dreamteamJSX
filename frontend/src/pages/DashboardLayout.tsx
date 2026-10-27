import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";

import DashboardHeader from "../modules/adminDashboard/component/DashboardHeader";
import Sidebar from "../modules/adminDashboard/component/Sidebar";
import { useAuth } from "@/store/useAuth";
import AreYouSureModal from "../components/common/modals/AreYouSure";
import { getNavLabel } from "@/modules/adminDashboard/DashboardNav";
import { fetchSettings } from "@/api/settings";
import { useTitle } from "@/hooks/useTitle";
import CommonTopBanner from "../components/common/widgets/CommonToBanner";

const SESSION_TIMEOUT_MS: Record<string, number> = {
  "1-min": 60 * 1000,
  "15-min": 15 * 60 * 1000,
  "30-min": 30 * 60 * 1000,
  "1-hour": 60 * 60 * 1000,
  "2-hours": 2 * 60 * 60 * 1000,
};
const ACTIVITY_RESET_THROTTLE_MS = 5000;
const SESSION_TIMEOUT_WARNING_MS = 60 * 1000;

export default function DashboardLayout() {
  const [isAreYouSureModalOpen, setIsAreYouSureModalOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { session, logout } = useAuth();
  const { pathname } = useLocation();
  const [sessionTimeout, setSessionTimeout] = useState("30-min");
  const [idleSecondsRemaining, setIdleSecondsRemaining] = useState<number | null>(null);
  useTitle("Dashboard")

  useEffect(() => {
    if (!session?.accessToken) return;
    let active = true;
    const loadTimeout = () => {
      void fetchSettings(session.accessToken!).then((settings) => {
        if (active) setSessionTimeout(settings.preferences.sessionTimeout);
      }).catch(() => undefined);
    };
    loadTimeout();
    window.addEventListener("settings:preferences-updated", loadTimeout);
    return () => {
      active = false;
      window.removeEventListener("settings:preferences-updated", loadTimeout);
    };
  }, [session?.accessToken]);

  const handleIdleTimeout = useCallback(() => {
    const timeoutMs = SESSION_TIMEOUT_MS[sessionTimeout] ?? SESSION_TIMEOUT_MS["30-min"];
    let lastActivityResetAt = Date.now() - ACTIVITY_RESET_THROTTLE_MS;
    let timeoutId = window.setTimeout(() => { void logout() }, timeoutMs);
    let lastDisplayedSeconds: number | null = null;

    const updateCountdown = () => {
      const elapsedMs = Date.now() - lastActivityResetAt;
      const remainingMs = timeoutMs - elapsedMs;

      if (remainingMs >= SESSION_TIMEOUT_WARNING_MS) {
        if (lastDisplayedSeconds !== null) {
          lastDisplayedSeconds = null;
          setIdleSecondsRemaining(null);
        }
        return;
      }

      const secondsRemaining = Math.max(1, Math.ceil(remainingMs / 1000));
      if (secondsRemaining !== lastDisplayedSeconds) {
        lastDisplayedSeconds = secondsRemaining;
        setIdleSecondsRemaining(secondsRemaining);
      }
    };

    const countdownIntervalId = window.setInterval(updateCountdown, 250);
    const resetTimer = () => {
      const now = Date.now();
      if (now - lastActivityResetAt < ACTIVITY_RESET_THROTTLE_MS) return;
      lastActivityResetAt = now;
      lastDisplayedSeconds = null;
      setIdleSecondsRemaining(null);
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => { void logout() }, timeoutMs);
    };
    const activityEvents: Array<keyof WindowEventMap> = ["pointerdown", "pointermove", "keydown", "touchstart"];
    activityEvents.forEach((eventName) => window.addEventListener(eventName, resetTimer, { passive: true }));
    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(countdownIntervalId);
      setIdleSecondsRemaining(null);
      activityEvents.forEach((eventName) => window.removeEventListener(eventName, resetTimer));
    };
  }, [logout, sessionTimeout]);

  useEffect(() => handleIdleTimeout(), [handleIdleTimeout]);

  const role = session?.user?.role ?? "MEMBER";
  const contentName = getNavLabel(role, pathname);

  return (
    <main className="h-screen bg-[#21052f] flex">

      <AreYouSureModal 
        onClose={() => setIsAreYouSureModalOpen(false)}
        open={isAreYouSureModalOpen}
        onConfirm={logout}
        title="Are you sure you want to log out?"
        variant="danger"
      />

      <Sidebar
        role={role}
        activeHref={pathname}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={() => setIsAreYouSureModalOpen(true)}
      />

      <div className="min-w-0 flex-1 flex flex-col">
        {idleSecondsRemaining !== null && (
          <div className="fixed inset-x-0 top-0 z-[110]">
            <CommonTopBanner variant="warning">
              You will be logged out due to inactivity in {idleSecondsRemaining} {idleSecondsRemaining === 1 ? "second" : "seconds"}. Move or click your mouse, or press a key, to stay signed in.
            </CommonTopBanner>
          </div>
        )}
        <DashboardHeader
          onMenuClick={() => setSidebarOpen(true)}
          contentName={contentName}
        />

        <section className="flex-1 overflow-y-auto bg-white p-4 md:p-6">
            <Outlet/>
        </section>
      </div>
    </main>
  );
}
