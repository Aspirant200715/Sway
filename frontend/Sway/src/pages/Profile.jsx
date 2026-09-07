import { useEffect, useState } from "react";
import axiosInstance from "../axiosCalls/axios";
import { useParams } from "react-router-dom";

function Profile() {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axiosInstance.get(`/users/profile/${username}`);
        setUserData(response.data.data);
      } catch (requestError) {
        setError(
          requestError.response?.data?.message ||
            "Unable to load this profile right now.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  if (loading) {
    return <ProfileState message="Loading profile..." />;
  }

  if (error || !userData) {
    return <ProfileState message={error || "Profile not found."} isError />;
  }

  const initials = userData.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="w-full max-w-[940px] animate-rise pb-10">
      <section className="profile-hero relative overflow-hidden rounded-[30px] bg-[#17201c] px-6 py-7 text-[#f7f8f4] shadow-[0_20px_55px_rgba(23,32,28,0.16)] sm:px-10 sm:py-9">
        <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full border-[26px] border-[#d8e2d2]/10" />
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full border-[28px] border-[#e4684c]/20" />
        <div className="profile-identity relative">
          {userData.profile_Image ? (
            <img
              src={userData.profile_Image}
              alt={`${userData.name}'s profile`}
              className="profile-avatar rounded-[26px] object-cover shadow-[0_10px_24px_rgba(23,32,28,0.2)]"
            />
          ) : (
            <div className="profile-avatar grid place-items-center rounded-[26px] bg-[#e4684c] font-display text-4xl font-semibold text-[#17201c] shadow-[0_10px_24px_rgba(23,32,28,0.2)] sm:text-5xl">
              {initials}
            </div>
          )}
          <div className="min-w-0">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#e4684c]">
              Profile / @{userData.username}
            </p>
            <h1 className="break-words font-display text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl">
              {userData.name}
            </h1>
            <p className="mt-4 text-sm font-medium text-[#b8c5bb]">
              @{userData.username}
            </p>
          </div>
        </div>
        <div className="relative mt-8 max-w-2xl">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#829188]">
            About this person
          </p>
          <p className="text-[15px] leading-7 text-[#d8e2d2]">
            {userData.bio || "No bio has been added yet."}
          </p>
        </div>
        <div className="profile-stats relative mt-8 gap-3 border-t border-[#d8e2d2]/15 pt-5">
          <ProfileStat label="Followers" value={userData.followers.length} />
          <ProfileStat label="Following" value={userData.following.length} />
          <ProfileStat label="Posts" value={userData.posts.length} />
        </div>
      </section>

      <div className="mt-6 grid gap-5 md:grid-cols-[0.9fr_1.1fr]">
        <InfoSection title="About">
          <InfoRow label="Email" value={userData.email} />
          <InfoRow label="Phone" value={userData.phone_no} />
          <InfoRow label="Username" value={`@${userData.username}`} />
        </InfoSection>
        <InfoSection title="Activity">
          <CollectionRow label="Stories" values={userData.stories} />
          <CollectionRow label="Reels" values={userData.reels} />
          <CollectionRow label="Posts" values={userData.posts} />
        </InfoSection>
      </div>

      <InfoSection title="Connections" className="mt-5">
        <CollectionRow label="Followers" values={userData.followers} />
        <CollectionRow label="Following" values={userData.following} />
      </InfoSection>
    </div>
  );
}

function ProfileState({ message, isError = false }) {
  return (
    <div className="w-full max-w-[940px] rounded-[28px] border border-[#e0e7de] bg-white px-6 py-16 text-center shadow-[0_12px_34px_rgba(38,51,45,0.06)]">
      <p className={isError ? "text-[#bc4e38]" : "text-[#819087]"}>{message}</p>
    </div>
  );
}

function ProfileStat({ label, value }) {
  return (
    <div className="border-r border-[#d8e2d2]/15 px-1.5 last:border-0 sm:px-2">
      <p className="font-display text-2xl font-semibold tracking-[-0.04em] text-[#f7f8f4] sm:text-3xl">
        {value}
      </p>
      <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.1em] text-[#b8c5bb] sm:text-[10px] sm:tracking-[0.14em]">
        {label}
      </p>
    </div>
  );
}

function InfoSection({ title, children, className = "" }) {
  return (
    <section
      className={`rounded-[22px] border border-[#e0e7de] bg-white p-5 shadow-[0_8px_26px_rgba(38,51,45,0.035)] sm:p-6 ${className}`}
    >
      <h2 className="mb-5 font-display text-2xl font-semibold tracking-[-0.03em] text-[#17201c]">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex flex-col gap-1 border-b border-[#eef1ec] pb-3 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#9aa69d]">
        {label}
      </span>
      <span className="break-all text-sm text-[#4f5d54]">
        {value || "Not provided"}
      </span>
    </div>
  );
}

function CollectionRow({ label, values = [] }) {
  return (
    <div className="border-b border-[#eef1ec] pb-3 last:border-0 last:pb-0">
      <div className="mb-2 flex items-center justify-between gap-4">
        <span className="text-sm font-semibold text-[#26332d]">{label}</span>
        <span className="text-xs text-[#9aa69d]">{values.length} total</span>
      </div>
      {values.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {values.map((value) => (
            <span
              key={value}
              className="max-w-full truncate rounded-lg bg-[#f0f4ed] px-2.5 py-1 text-xs text-[#66716a]"
            >
              {value}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-xs text-[#9aa69d]">No data yet.</p>
      )}
    </div>
  );
}

export default Profile;
