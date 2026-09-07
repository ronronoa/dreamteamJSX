import { useState } from "react";

import DashboardHeader from "../modules/adminDashboard/component/DashboardHeader";
import Sidebar from "../modules/adminDashboard/component/Sidebar";
import Spinner from "../components/common/widgets/Spinner";
import { useAuth } from "../context/AuthContext";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { session } = useAuth();

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

          <div className="flex-col inset-0 z-50 w-full h-full flex items-center justify-center ">
            <Spinner size={64} />
          Dashboard Content
          </div>
        </section>

      </div>

    </main>
  );
}
