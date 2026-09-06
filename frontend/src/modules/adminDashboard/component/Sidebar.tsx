import {
  LayoutDashboard,
  ClipboardList,
  HeartPulse,
  Truck,
  Package,
  FileText,
  Users,
  User,
  Settings,
  LogOut,
  X,
} from "lucide-react";

import type { ReactNode } from "react";

import Logo from "../../../components/common/widgets/Logo";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../routes";


interface SidebarProps {
  open: boolean;
  onClose: () => void;
}


export default function Sidebar({
  open,
  onClose,
}: SidebarProps) {

  const navigate = useNavigate();


  return (
    <>
      {open && (
        <div
          className="
          fixed inset-0
          bg-black/50
          z-40
          md:hidden
          "
          onClick={onClose}
        />
      )}


      <aside
        className={`
          fixed
          left-0 top-0 bottom-0 z-50
          w-64 shrink-0

          bg-[#21052f]
          text-white

          flex flex-col

          transition-transform
          duration-300

          md:static
          md:translate-x-0

          ${ open ? "translate-x-0" : "-translate-x-full" }
        `}
      >

        <section
          className="
          h-20
          px-5
          flex items-center gap-3
          border-b border-white/10
          "
        >

          <Logo size={48} />

          <div className="flex-1 min-w-0">

            <div className="flex items-center justify-between gap-2">

              <p className="font-bold text-sm whitespace-nowrap">
                Barangay 176-E
              </p>




              <button
                type="button"
                onClick={onClose}
                className="
                md:hidden
                text-white
                shrink-0
                "
              >
                <X size={18} />
              </button>

            </div>


            <p className="text-[8px] text-orange-400">
              DRRMO / BHERT
            </p>

          </div>

        </section>


        <nav
          className="
          flex-1
          px-2 py-5
          space-y-5
          overflow-y-auto
          "
        >

          <div>

            <SidebarSection title="MAIN" />

            <SidebarItem
              icon={<LayoutDashboard size={15} />}
              label="Dashboard"
              active={ true }
              onClick={onClose}
            />

          </div>


          <div>

            <SidebarSection title="OPERATIONS" />

            <SidebarItem
              icon={<ClipboardList size={15} />}
              label="Operation Log Records"
              onClick={onClose}
            />

            <SidebarItem
              icon={<HeartPulse size={15} />}
              label="Patient Log Records"
              onClick={onClose}
            />

            <SidebarItem
              icon={<Truck size={15} />}
              label="Vehicle Log Records"
              badge="3"
              onClick={onClose}
            />

            <SidebarItem
              icon={<Package size={15} />}
              label="Inventory"
              onClick={onClose}
            />

          </div>


          <div>

            <SidebarSection title="ARCHIVES" />

            <SidebarItem
              icon={<FileText size={15} />}
              label="Archived Logs"
              onClick={onClose}
            />

          </div>


          <div>

            <SidebarSection title="ADMINISTRATION" />

            <SidebarItem
              icon={<Users size={15} />}
              label="Manage Users"
              onClick={onClose}
            />

            <SidebarItem
              icon={<User size={15} />}
              label="User Profile"
              onClick={onClose}
            />

            <SidebarItem
              icon={<FileText size={15} />}
              label="Reports"
              onClick={onClose}
            />

            <SidebarItem
              icon={<Settings size={15} />}
              label="Settings"
              onClick={onClose}
            />

          </div>

        </nav>


        <div className="px-2 py-4 border-t border-white/10">

          <SidebarItem
            icon={<LogOut size={15} />}
            label="Sign Out"
            onClick={() => navigate(ROUTES.LOGIN)}
          />

        </div>

      </aside>
    </>
  );
}


interface SidebarSectionProps { title: string; }

function SidebarSection({ title, }: SidebarSectionProps) {
  return (
    <p className="px-3 mb-2 text-[9px] font-bold text-purple-400">
      {title}
    </p>
  );
}


interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  active?: boolean;
  badge?: string;
  onClick?: () => void;
}

function SidebarItem({
  icon,
  label,
  active = false,
  badge,
  onClick,
}: SidebarItemProps) {

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        relative
        w-full
        flex items-center gap-3

        hover:cursor-pointer

        px-3 py-2.5
        rounded-lg

        text-left text-[10px]

        transition

        ${
        active
        ? "bg-purple-900/60 text-white border border-purple-500/40"
        : "text-white/60 hover:bg-white/5 hover:text-white"
        }
      `}
    >

      {active && (
        <span
          className="
          absolute
          left-0 top-0 bottom-0
          w-0.5
          bg-orange-400
          rounded-full
          "
        />
      )}

      {icon}

      <span className="flex-1">
        {label}
      </span>

      {badge && (
        <span
          className="
          w-4 h-4
          rounded-full

          bg-orange-500
          text-white

          text-[8px]

          flex items-center justify-center
          "
        >
          {badge}
        </span>
      )}

    </button>
  );
}
