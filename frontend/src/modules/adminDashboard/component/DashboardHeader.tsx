import { Bell, CalendarDays, Menu } from "lucide-react";

import UserAvatar from "@/components/common/widgets/UserAvatar";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { getProfilePhotoSource } from "@/api/profile";
import { formatDate } from "@/utils/dateTime";
import { getInitials } from "@/utils/name";

interface DashboardHeaderProps {
  onMenuClick: () => void;
  contentName: string;
}

export default function DashboardHeader({ onMenuClick, contentName }: DashboardHeaderProps) {
  const { session } = useAuth();
  const user = session?.user;

  const initials = getInitials(user?.name);
  const displayName = user?.name ?? "Guest";
  const [now] = useState(() => new Date());

  return (
    <header className="h-20 bg-[#21052f] text-white flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10"
        >
          <Menu size={20} />
        </button>

        <div>
          <p className="text-[9px] font-bold text-orange-400">DRRMO/BHERT PORTAL</p>
          <h1 className="text-lg md:text-xl font-bold">{contentName ?? "none"}</h1>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        <div className="hidden lg:flex items-center gap-2 px-4 py-2 text-xs font-semibold">
          <CalendarDays size={14} className="text-orange-500" />
          {formatDate(now, "dddd, D MMM YYYY")}
        </div>

        <button
          type="button"
          className="w-9 h-9 rounded-full bg-white text-[#21142d] flex items-center justify-center"
        >
          <Bell size={17} />
        </button>

        <div className="flex items-center gap-2">
          <UserAvatar
            initials={initials}
            name={displayName}
            imageUrl={getProfilePhotoSource(user?.profileImageUrl ?? null)}
            variant="onDark"
          />

          {/* <div className="hidden lg:block"> */}
          {/*   <p className="text-xs font-semibold">{displayName}</p> */}
          {/*   <p className="text-[9px] text-white/50">{displayRole}</p> */}
          {/* </div> */}
        </div>
      </div>
    </header>
  );
}

