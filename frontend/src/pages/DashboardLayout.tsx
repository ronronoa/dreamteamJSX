import { useState } from "react";
import { Outlet, useLocation } from "react-router";

import DashboardHeader from "../modules/adminDashboard/component/DashboardHeader";
import Sidebar from "../modules/adminDashboard/component/Sidebar";
import { useAuth } from "../context/AuthContext";
import AreYouSureModal from "../components/common/modals/AreYouSure";
import { getNavLabel } from "@/modules/adminDashboard/DashboardNav";

export default function DashboardLayout() {
  const [isAreYouSureModalOpen, setIsAreYouSureModalOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { session, logout } = useAuth();
  const { pathname } = useLocation();

  const role = session?.user?.role ?? "MEMBER";
  const contentName = getNavLabel(role, pathname);

  return (
    <main className="min-h-screen bg-[#21052f] flex">

      <AreYouSureModal 
        onClose={() => setIsAreYouSureModalOpen(false)}
        open={isAreYouSureModalOpen}
        onConfirm={logout}
        title="Are you sure you want to log out?"
      />

      <Sidebar
        role={role}
        activeHref={pathname}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={() => setIsAreYouSureModalOpen(true)}
      />

      <div className="min-w-0 flex-1 flex flex-col">
        <DashboardHeader
          onMenuClick={() => setSidebarOpen(true)}
          contentName={contentName}
        />

        <section className="flex-1 bg-white p-4 md:p-6">
            <Outlet/>
        </section>
      </div>
    </main>
  );
}
