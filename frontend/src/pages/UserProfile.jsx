// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateUserProfile } from "../services/userService";
import ProfileForm from "../components/ProfileForm";

const UserProfile = () => {
  const { user, refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleProfileUpdate = async (updatedData) => {
    try {
      setLoading(true);
      await updateUserProfile(updatedData);
      await refreshUser();
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage("Failed to update profile");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p className="text-center p-4">Loading profile...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      {message && <p className="text-green-600 mb-2">{message}</p>}
      <ProfileForm initialData={user} onSubmit={handleProfileUpdate} />
      {loading && <p className="text-blue-500">Updating...</p>}
    </div>
  );
};

export default UserProfile;
