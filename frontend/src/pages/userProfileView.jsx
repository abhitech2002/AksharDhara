import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserProfile } from "../services/userService";
import { useNavigate } from "react-router-dom";

export default function UserProfileView() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      getUserProfile(user.id)
        .then(setProfile)
        .catch((err) => {
          console.error("Failed to load profile", err);
        });
    }
  }, [user]);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={profile.data.avatar || "/default-avatar.png"}
          alt="avatar"
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div>
          <h1 className="text-2xl font-bold">{profile.data.displayName}</h1>
          <p className="text-gray-500">@{profile.data.username}</p>
          <p className="text-sm text-gray-400">{profile.email}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="font-semibold">Bio:</p>
        <p>{profile.data.bio || "No bio available"}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">Phone:</p>
          <p>{profile.data.phoneNumber || "N/A"}</p>
        </div>
        <div>
          <p className="font-semibold">Date of Birth:</p>
          <p>{profile.data.dateOfBirth ? new Date(profile.data.dateOfBirth).toDateString() : "N/A"}</p>
        </div>
        <div>
          <p className="font-semibold">Location:</p>
          <p>
            {[profile.data.address?.city, profile.data.address?.country].filter(Boolean).join(", ") || "N/A"}
          </p>
        </div>
        <div>
          <p className="font-semibold">Status:</p>
          <p>{profile.data.status}</p>
        </div>
      </div>

      <div className="mt-6 space-x-3">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => navigate("/profile")}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}
