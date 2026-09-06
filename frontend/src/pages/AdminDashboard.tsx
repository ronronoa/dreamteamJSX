import { useState } from "react";

import DashboardHeader from "../modules/adminDashboard/component/DashboardHeader";
import Sidebar from "../modules/adminDashboard/component/Sidebar";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#21052f] flex">

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-w-0 flex-1 flex flex-col">

        <DashboardHeader
          onMenuClick={() => setSidebarOpen(true)}
          contentName="Admin Dashboard"
        />

        <section className="flex-1 bg-white p-4 md:p-6">
          Dashboard Content
        </section>

      </div>

    </main>
  );
}
