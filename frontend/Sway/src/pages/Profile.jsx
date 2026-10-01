import { useEffect, useState } from "react";
import axiosInstance from "../axiosCalls/axios";
import { useParams } from "react-router-dom";
import useAuth from "../context/useAuth";

function Profile() {
  const { username } = useParams();
  const { user: currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    bio: "",
    phone_no: "",
    profile_Image: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axiosInstance.get(`/users/profile/${username}`);
        const profileData = response.data.data;
        setUserData(profileData);

        if (currentUser) {
          const followingStatus = profileData.followers.some(
            (follower) => follower._id === currentUser._id,
          );
          setIsFollowing(followingStatus);
        }
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
  }, [username, currentUser]);

  const toggleFollow = async () => {
    if (!currentUser || !userData) return;
    setActionLoading(true);
    try {
      if (isFollowing) {
        await axiosInstance.post(`/users/${userData._id}/unfollow`);

        setUserData((prev) => ({
          ...prev,
          followers: prev.followers.filter(
            (follower) => follower._id !== currentUser._id,
          ),
        }));
      } else {
        await axiosInstance.post(`/users/${userData._id}/follow`);
        setUserData((prev) => ({
          ...prev,
          followers: [
            ...prev.followers,
            {
              _id: currentUser._id,
              name: currentUser.name,
              username: currentUser.username,
            },
          ],
        }));
      }
      setIsFollowing((following) => !following);
    } catch (requestError) {
      console.error("Failed to update follow status", requestError);
    } finally {
      setActionLoading(false);
    }
  };

  const openEditProfile = () => {
    setFormData({
      name: userData.name || "",
      username: userData.username || "",
      email: userData.email || "",
      bio: userData.bio || "",
      phone_no: userData.phone_no || "",
      profile_Image: userData.profile_Image || "",
    });
    setSelectedImage(null);
    setPreviewImage(userData.profile_Image || "");
    setEditProfile(true);
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) return;
    setSelectedImage(file);

    const reader = new FileReader();
    reader.onload = () => {
      const imageData = reader.result;
      setPreviewImage(imageData);
      setFormData((previous) => ({ ...previous, profile_Image: imageData }));
    };
    reader.readAsDataURL(file);
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    setUserData((previous) => ({ ...previous, ...formData }));
    setEditProfile(false);
  };

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
  const isOwnProfile =
    currentUser &&
    (currentUser._id === userData._id ||
      currentUser.username === userData.username);
  return (
    <div className="w-full max-w-[940px] animate-rise pb-10">
      <section className="profile-hero relative overflow-hidden rounded-[30px] bg-[#17201c] px-6 py-7 text-[#f7f8f4] shadow-[0_20px_55px_rgba(23,32,28,0.16)] sm:px-10 sm:py-9">
        <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full border-[26px] border-[#d8e2d2]/10" />
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full border-[28px] border-[#e4684c]/20" />
        <div className="profile-identity relative flex items-start justify-between gap-5">
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
          {isOwnProfile ? (
            <button
              type="button"
              onClick={openEditProfile}
              className="shrink-0 rounded-full border border-[#d8e2d2]/30 px-5 py-2 font-semibold text-[#f7f8f4] transition-colors hover:bg-[#26332d]"
            >
              Edit profile
            </button>
          ) : currentUser ? (
            <button
              onClick={toggleFollow}
              disabled={actionLoading}
              className={`shrink-0 rounded-full px-6 py-2 font-semibold transition-colors ${
                isFollowing
                  ? "bg-[#26332d] text-[#f7f8f4] hover:bg-[#33423b]"
                  : "bg-[#e4684c] text-white hover:bg-[#bc4e38]"
              }`}
            >
              {actionLoading ? "..." : isFollowing ? "Unfollow" : "Follow"}
            </button>
          ) : null}
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
          <ProfileStat label="Following" value={userData.followings.length} />
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
        <UserConnectionRow label="Followers" users={userData.followers} />
        <UserConnectionRow label="Following" users={userData.followings} />
      </InfoSection>

      {isOwnProfile && editProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#17201c]/70 px-4 py-6">
          <div className="max-h-full w-full max-w-lg overflow-y-auto rounded-[24px] bg-[#f7f8f4] p-6 shadow-[0_20px_60px_rgba(23,32,28,0.3)] sm:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#e4684c]">
                  Your profile
                </p>
                <h2 className="mt-2 font-display text-3xl font-semibold tracking-[-0.04em] text-[#17201c]">
                  Edit profile
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setEditProfile(false)}
                aria-label="Close edit profile"
                className="text-2xl leading-none text-[#829188] hover:text-[#17201c]"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="flex items-center gap-4 rounded-2xl bg-[#e9eee7] p-4">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile preview"
                    className="h-20 w-20 rounded-[20px] object-cover"
                  />
                ) : (
                  <div className="grid h-20 w-20 place-items-center rounded-[20px] bg-[#e4684c] font-display text-2xl font-semibold text-[#17201c]">
                    {formData.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                )}
                <label className="cursor-pointer text-sm font-semibold text-[#26332d] hover:text-[#bc4e38]">
                  Choose profile image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  {selectedImage && (
                    <span className="mt-1 block max-w-[200px] truncate text-xs font-normal text-[#829188]">
                      {selectedImage.name}
                    </span>
                  )}
                </label>
              </div>

              <EditField label="Name" name="name" value={formData.name} onChange={handleEditChange} />
              <EditField label="Username" name="username" value={formData.username} onChange={handleEditChange} />
              <EditField label="Email" name="email" type="email" value={formData.email} onChange={handleEditChange} />
              <EditField label="Phone" name="phone_no" value={formData.phone_no} onChange={handleEditChange} />
              <label className="block text-sm font-semibold text-[#26332d]">
                Bio
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleEditChange}
                  rows="4"
                  className="mt-2 w-full resize-none rounded-xl border border-[#d8e2d2] bg-white px-3 py-2.5 text-sm font-normal outline-none focus:border-[#e4684c]"
                />
              </label>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditProfile(false)}
                  className="rounded-full border border-[#d8e2d2] px-5 py-2.5 text-sm font-semibold text-[#66716a] hover:bg-[#e9eee7]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-[#e4684c] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#bc4e38]"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function EditField({ label, name, value, onChange, type = "text" }) {
  return (
    <label className="block text-sm font-semibold text-[#26332d]">
      {label}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-2 w-full rounded-xl border border-[#d8e2d2] bg-white px-3 py-2.5 text-sm font-normal outline-none focus:border-[#e4684c]"
      />
    </label>
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

function UserConnectionRow({ label, users = [] }) {
  return (
    <div className="border-b border-[#eef1ec] pb-3 last:border-0 last:pb-0">
      <div className="mb-3 flex items-center justify-between gap-4">
        <span className="text-sm font-semibold text-[#26332d]">{label}</span>
        <span className="text-xs text-[#9aa69d]">{users.length} total</span>
      </div>
      {users.length > 0 ? (
        <div className="flex flex-col gap-3">
          {users.map((user) => (
            <div
              key={user._id}
              className="flex items-center gap-3 rounded-lg bg-[#f0f4ed] p-2"
            >
              <div className="grid h-8 w-8 place-items-center rounded-full bg-[#d8e2d2] text-xs font-bold text-[#26332d]">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-[#26332d]">
                  {user.name}
                </span>
                <span className="text-xs text-[#66716a]">@{user.username}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-[#9aa69d]">No connections yet.</p>
      )}
    </div>
  );
}

export default Profile;
