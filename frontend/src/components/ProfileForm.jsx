// src/components/ProfileForm.jsx
import { useState, useEffect } from "react";

const ProfileForm = ({ initialData = {}, onSubmit }) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    console.log("Form submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 space-y-4">
      <input
        type="text"
        name="displayName"
        value={formData.displayName || ""}
        onChange={handleChange}
        placeholder="Display Name"
        className="w-full p-2 border rounded"
      />
      <textarea
        name="bio"
        value={formData.bio || ""}
        onChange={handleChange}
        placeholder="Bio"
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="phoneNumber"
        value={formData.phoneNumber || ""}
        onChange={handleChange}
        placeholder="Phone Number"
        className="w-full p-2 border rounded"
      />
      {/* Avatar Input with Preview */}
      <input
        type="text"
        name="avatar"
        value={formData.avatar || ""}
        onChange={handleChange}
        placeholder="Avatar URL"
        className="w-full p-2 border rounded"
      />

      {formData.avatar && (
        <img
          src={formData.avatar}
          alt="Avatar Preview"
          className="w-24 h-24 rounded-full object-cover mt-2"
        />
      )}

      <h4 className="font-semibold">Social Links</h4>
      {["github", "linkedin", "twitter", "website", "instagram"].map(
        (platform) => (
          <input
            key={platform}
            type="text"
            name={platform}
            value={formData.socialLinks?.[platform] || ""}
            onChange={handleSocialChange}
            placeholder={`${
              platform.charAt(0).toUpperCase() + platform.slice(1)
            } URL`}
            className="w-full p-2 border rounded"
          />
        )
      )}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </form>
  );
};

export default ProfileForm;
