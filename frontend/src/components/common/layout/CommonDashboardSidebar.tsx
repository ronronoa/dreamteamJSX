import type { LucideIcon } from "lucide-react";
import { LogOut, X } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router";

import Logo from "../widgets/Logo";

export interface DashboardSidebarItem {
  label: string;
  href?: string;
  icon: LucideIcon;
  badge?: string;
}

export interface DashboardSidebarSection {
  label: string;
  items: DashboardSidebarItem[];
}

interface CommonDashboardSidebarProps {
  sections: DashboardSidebarSection[];
  activeHref?: string;

  /** Mobile drawer */
  open?: boolean;
  onClose?: () => void;
  /** Fired after a nav link is clicked (used to close the drawer) */
  onNavigate?: () => void;

  brand?: { title: string; subtitle: string };

  onLogout?: () => void;
}

export default function CommonDashboardSidebar({
  sections,
  activeHref,
  open = false,
  onClose,
  onNavigate,
  brand = { title: "Barangay 176-E", subtitle: "DRRMO / BHERT" },
  onLogout,
}: CommonDashboardSidebarProps) {
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

          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Brand */}
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
                {brand.title}
              </p>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close sidebar"
                className="
                  md:hidden
                  text-white
                  shrink-0
                "
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-[8px] text-orange-400">{brand.subtitle}</p>
          </div>
        </section>

        {/* Navigation */}
        <nav
          className="
            flex-1
            px-2 py-5
            space-y-5
            overflow-y-auto
          "
        >
          {sections.map((section) => (
            <div key={section.label}>
              <SidebarSection title={section.label} />

              {section.items.map((item) => {
                const Icon = item.icon;

                return (
                  <SidebarItem
                    key={item.href ?? item.label}
                    icon={<Icon size={15} />}
                    label={item.label}
                    href={item.href}
                    badge={item.badge}
                    active={item.href !== undefined && item.href === activeHref}
                    onClick={onNavigate}
                  />
                );
              })}
            </div>
          ))}
        </nav>

        {/* Sign out */}
        {onLogout && (
          <div className="px-2 py-4 border-t border-white/10">
            <SidebarItem
              icon={<LogOut size={15} />}
              label="Sign Out"
              onClick={onLogout}
            />
          </div>
        )}
      </aside>
    </>
  );
}

interface SidebarSectionProps {
  title: string;
}

function SidebarSection({ title }: SidebarSectionProps) {
  return (
    <p className="px-3 mb-2 text-[9px] font-bold text-purple-400">
      {title.toUpperCase()}
    </p>
  );
}

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  href?: string;
  active?: boolean;
  badge?: string;
  onClick?: () => void;
}

function SidebarItem({
  icon,
  label,
  href,
  active = false,
  badge,
  onClick,
}: SidebarItemProps) {
  const className = `
    relative
    w-full
    flex items-center gap-3

    hover:cursor-pointer

    px-3 py-2.5
    rounded-lg

    text-left

    transition

    ${
      active
        ? "bg-purple-900/60 text-white border border-purple-500/40"
        : "text-white/60 hover:bg-white/5 hover:text-white"
    }
  `;

  const content = (
    <>
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

      <span className="flex-1">{label}</span>

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
    </>
  );

  if (href) {
    return (
      <Link to={href} onClick={onClick} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {content}
    </button>
  );
}
