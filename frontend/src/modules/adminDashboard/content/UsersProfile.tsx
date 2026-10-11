import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { fetchUserProfile, type UserProfileData } from "@/api/profile";
import { CARD_CLASS } from "./usersProfile/profileUtils";
import IdentityCard from "./usersProfile/IdentityCard";
import ReportPinSection from "./usersProfile/ReportPinSection";
import ProfileDetailsSection from "./usersProfile/ProfileDetailsSection";
import PasswordSection from "./usersProfile/PasswordSection";

/* -------------------------------------------------------------------------- */
/*  Top-level page                                                            */
/* -------------------------------------------------------------------------- */

export default function UserProfile() {
  const { session, updateProfileSession } = useAuth();
  const accessToken = session?.accessToken;
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileError, setProfileError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      if (!accessToken) {
        setProfileError("Your session has expired. Sign in again to view your profile.");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const loaded = await fetchUserProfile(accessToken);
        if (!isMounted) return;
        setProfile(loaded);
        setProfileError("");
      } catch (error) {
        if (!isMounted) return;
        setProfileError(error instanceof Error ? error.message : "Could not load your profile.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    void loadProfile();
    return () => {
      isMounted = false;
    };
  }, [accessToken]);

  const handleProfileUpdate = (updated: UserProfileData) => {
    setProfile(updated);
    updateProfileSession(updated);
  };

  const canManageReportPin = Boolean(profile && profile.role !== "MEMBER");

  return (
    /*
     * xl:grid-rows-[1fr_auto] makes the details card absorb the leftover
     * vertical space while the password card stays at its natural height.
     * The sidebar spans both rows so it lines up with the taller column.
     */
    <div className="grid grid-cols-1 gap-3 xl:mt-10 xl:grid-cols-[380px_1fr] xl:grid-rows-[1fr_auto]">
      <aside className={`${CARD_CLASS} flex flex-col p-6 xl:row-span-2`}>
        <IdentityCard
          profile={profile}
          loading={loading}
          accessToken={accessToken}
          onUpdate={handleProfileUpdate}
        />
        {canManageReportPin && <ReportPinSection accessToken={accessToken} />}
      </aside>

      <ProfileDetailsSection
        profile={profile}
        loading={loading}
        error={profileError}
        accessToken={accessToken}
        onUpdate={handleProfileUpdate}
      />

      <PasswordSection />
    </div>
  );
}

