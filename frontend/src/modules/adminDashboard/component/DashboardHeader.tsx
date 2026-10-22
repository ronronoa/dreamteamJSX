import { Bell, CalendarDays, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import UserAvatar from "@/components/common/widgets/UserAvatar";
import { useAuth } from "@/context/AuthContext";
import { getProfilePhotoSource } from "@/api/profile";
import { formatDate } from "@/utils/dateTime";
import { getInitials } from "@/utils/name";
import { ROUTES } from "@/routes";
import { useNotifications } from "./useNotifications";

interface DashboardHeaderProps {
  onMenuClick: () => void;
  contentName: string;
}

export default function DashboardHeader({
  onMenuClick,
  contentName,
}: DashboardHeaderProps) {
  const { session } = useAuth();
  const user = session?.user;
  const navigate = useNavigate();

  const { notifications, unreadCount, error, loading, refresh, markAllRead } =
    useNotifications(session?.accessToken);

  const [now] = useState(() => new Date());
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!notificationsOpen) return;

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node | null;
      if (!target) return;
      if (notificationsRef.current?.contains(target)) return;
      setNotificationsOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setNotificationsOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [notificationsOpen]);

  const initials = getInitials(user?.name);
  const displayName = user?.name ?? "Guest";

  function toggleNotifications() {
    const opening = !notificationsOpen;
    setNotificationsOpen(opening);
    if (!opening) return;

    void refresh().then((loaded) => {
      if (!loaded) return;
      return markAllRead().catch(() => undefined);
    });
  }

  return (
    <header className="flex h-20 items-center justify-between bg-[#21052f] px-4 text-white md:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/10 md:hidden"
        >
          <Menu size={20} />
        </button>

        <div>
          <p className="text-[9px] font-bold text-orange-400">
            DRRMO/BHERT PORTAL
          </p>
          <h1 className="text-lg font-bold md:text-xl">
            {contentName ?? "none"}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        <div className="hidden items-center gap-2 px-4 py-2 text-xs font-semibold lg:flex">
          <CalendarDays size={14} className="text-orange-500" />
          {formatDate(now, "dddd, D MMM YYYY")}
        </div>

        <div className="relative" ref={notificationsRef}>
          <button
            type="button"
            aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
            aria-expanded={notificationsOpen}
            onClick={toggleNotifications}
            className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#21142d]"
          >
            <Bell size={17} />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[9px] font-bold text-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {notificationsOpen && (
            <NotificationsDropdown
              notifications={notifications}
              unreadCount={unreadCount}
              loading={loading}
              error={error}
              onClose={() => setNotificationsOpen(false)}
              onRefresh={refresh}
              onSelect={(target) => {
                setNotificationsOpen(false);
                navigate(target);
              }}
            />
          )}
        </div>

        <UserAvatar
          initials={initials}
          name={displayName}
          imageUrl={getProfilePhotoSource(user?.profileImageUrl ?? null)}
          variant="onDark"
        />
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*  Notifications dropdown                                                    */
/* -------------------------------------------------------------------------- */

interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string | Date;
  target: string;
  reportFormId: string | null;
}

interface NotificationsDropdownProps {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string;
  onClose: () => void;
  onRefresh: () => Promise<boolean>;
  onSelect: (target: string) => void;
}

const NOTIFICATION_ROUTES: Record<string, string> = {
  operations: ROUTES.DASHBOARD.OPERATIONS,
  patients: ROUTES.DASHBOARD.PATIENTS,
  vehicles: ROUTES.DASHBOARD.VEHICLES,
  inventory: ROUTES.DASHBOARD.INVENTORY,
};

function getNotificationRoute(target: string, reportFormId: string | null): string {
  const separatorIndex = target.indexOf(":");
  const targetType = separatorIndex === -1 ? target : target.slice(0, separatorIndex);
  const recordId = reportFormId ?? (separatorIndex === -1 ? "" : target.slice(separatorIndex + 1));
  const route = NOTIFICATION_ROUTES[targetType];

  if (!route) return ROUTES.DASHBOARD.ROOT;
  if (!recordId) return route;

  return `${route}?reportFormId=${encodeURIComponent(recordId)}`;
}

function NotificationsDropdown({
  notifications,
  unreadCount,
  loading,
  error,
  onClose,
  onRefresh,
  onSelect,
}: NotificationsDropdownProps) {
  return (
    <div className="fixed left-3 right-3 top-20 z-50 mt-2 max-h-[calc(100dvh-6rem)] overflow-hidden rounded-xl border border-gray-200 bg-white text-gray-900 shadow-xl md:absolute md:left-auto md:right-0 md:top-full md:mt-3 md:max-h-none md:w-[min(24rem,calc(100vw-2rem))]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <p className="text-base font-bold text-slate-900">Notifications</p>
          {unreadCount > 0 && (
            <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-semibold text-orange-600">
              {unreadCount} new
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => void onRefresh()}
            className="text-xs font-semibold text-purple-700 hover:underline"
          >
            Mark all as read
          </button>
          <button
            type="button"
            aria-label="Close notifications"
            onClick={onClose}
            className="rounded p-1 text-gray-400 hover:bg-gray-100"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="max-h-[420px] overflow-y-auto border-t border-gray-100">
        {error && (
          <p role="alert" className="px-4 py-3 text-xs text-red-700">
            {error}
          </p>
        )}

        {loading && notifications.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-gray-500">
            Loading notifications…
          </p>
        )}

        {!loading && notifications.length === 0 && !error && (
          <p className="px-4 py-8 text-center text-sm text-gray-500">
            You’re all caught up.
          </p>
        )}

        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onSelect={onSelect}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="block w-full border-t border-gray-100 py-3 text-center text-xs font-semibold text-purple-700 hover:bg-gray-50">
      </div>
      {/* <button */}
      {/*   type="button" */}
      {/*   onClick={onClose} */}
      {/*   className="block w-full border-t border-gray-100 py-3 text-center text-xs font-semibold text-purple-700 hover:bg-gray-50" */}
      {/* > */}
      {/*   View all notifications → */}
      {/* </button> */}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Single notification row                                                   */
/* -------------------------------------------------------------------------- */

interface NotificationItemProps {
  notification: Notification;
  onSelect: (target: string) => void;
}

function NotificationItem({ notification, onSelect }: NotificationItemProps) {
  const icon = getNotificationIcon(notification.title);

  return (
    <button
      type="button"
      onClick={() => onSelect(getNotificationRoute(notification.target, notification.reportFormId))}
      className={`flex w-full items-start gap-3 border-b border-gray-100 px-4 py-3 text-left transition-colors hover:bg-gray-50 ${
        notification.read ? "bg-white" : "bg-purple-50/60"
      }`}
    >
      {/* Category icon */}
      <span
        className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 ${icon.className}`}
      >
        {icon.node}
      </span>

      {/* Text block */}
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-slate-900">
          {notification.title}
        </span>
        <span className="mt-0.5 block text-xs leading-5 text-gray-500">
          {notification.message}
        </span>
        <span className="mt-1 block text-[11px] text-gray-400">
          {formatDate(new Date(notification.createdAt), "D MMM YYYY, h:mm A")}
        </span>
      </span>

      {/* Unread dot */}
      {!notification.read && (
        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-purple-600" />
      )}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Category icon mapping                                                     */
/* -------------------------------------------------------------------------- */

import {
  AlertTriangle,
  ClipboardList,
  Car,
  HeartPulse,
} from "lucide-react";

const ICON_STYLES = {
  operations: "border-orange-200 text-orange-500",
  patients: "border-sky-200 text-sky-500",
  vehicles: "border-emerald-200 text-emerald-500",
  inventory: "border-red-200 text-red-500",
  default: "border-gray-200 text-gray-500",
} as const;

function getNotificationIcon(title: string) {
  const lower = title.toLowerCase();

  if (lower.includes("operation")) {
    return {
      className: ICON_STYLES.operations,
      node: <ClipboardList size={16} />,
    };
  }
  if (lower.includes("patient")) {
    return {
      className: ICON_STYLES.patients,
      node: <HeartPulse size={16} />,
    };
  }
  if (lower.includes("vehicle")) {
    return {
      className: ICON_STYLES.vehicles,
      node: <Car size={16} />,
    };
  }
  if (lower.includes("stock") || lower.includes("inventory")) {
    return {
      className: ICON_STYLES.inventory,
      node: <AlertTriangle size={16} />,
    };
  }
  return {
    className: ICON_STYLES.default,
    node: <Bell size={16} />,
  };
}
