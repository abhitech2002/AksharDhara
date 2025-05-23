import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileForm = ({ initialData = {}, onSubmit }) => {
  const navigate = useNavigate();
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

  const handleAddressChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      navigate("/profile/view");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Personal Information Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
              <input
                type="text"
                name="displayName"
                value={formData.displayName || ""}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Your display name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth || ""}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber || ""}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Your phone number"
              />
            </div>
          </div>
        </div>

        {/* Avatar Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Picture</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Avatar URL</label>
              <input
                type="text"
                name="avatar"
                value={formData.avatar || ""}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="https://example.com/avatar.jpg"
              />
            </div>

            {formData.avatar && (
              <div className="flex justify-center">
                <img
                  src={formData.avatar}
                  alt="Avatar Preview"
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-100 shadow-md"
                />
              </div>
            )}
          </div>
        </div>

        {/* Address Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6 md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Address Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Street</label>
              <input
                type="text"
                value={formData.address?.street || ""}
                onChange={(e) => handleAddressChange("street", e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Street address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                value={formData.address?.city || ""}
                onChange={(e) => handleAddressChange("city", e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="City"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input
                type="text"
                value={formData.address?.state || ""}
                onChange={(e) => handleAddressChange("state", e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="State"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input
                type="text"
                value={formData.address?.country || ""}
                onChange={(e) => handleAddressChange("country", e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Country"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
              <input
                type="text"
                value={formData.address?.zipCode || ""}
                onChange={(e) => handleAddressChange("zipCode", e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="ZIP Code"
              />
            </div>
          </div>
        </div>

        {/* Social Links Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6 md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Social Links</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["github", "linkedin", "twitter", "website", "instagram"].map((platform) => (
              <div key={platform}>
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                  {platform}
                </label>
                <input
                  type="text"
                  name={platform}
                  value={formData.socialLinks?.[platform] || ""}
                  onChange={handleSocialChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder={`Your ${platform} profile`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
