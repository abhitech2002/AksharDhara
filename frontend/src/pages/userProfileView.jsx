import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserProfile } from "../services/userService";
import { getMyBlogs, togglePublishBlog } from "../services/blogService";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaBirthdayCake,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaGlobe,
  FaInstagram,
} from "react-icons/fa";

export default function UserProfileView() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      Promise.all([
        getUserProfile(user.id),
        getMyBlogs()
      ])
        .then(([profileData, blogsData]) => {
          setProfile(profileData);
          setMyBlogs(blogsData || []);
        })
        .catch((err) => {
          console.error("Failed to load data", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);

  if (!profile || loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </>
    );
  }

  const socialIcons = {
    github: <FaGithub className="w-5 h-5" />,
    linkedin: <FaLinkedin className="w-5 h-5" />,
    twitter: <FaTwitter className="w-5 h-5" />,
    website: <FaGlobe className="w-5 h-5" />,
    instagram: <FaInstagram className="w-5 h-5" />,
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
          {/* Header Section */}
          <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="absolute -bottom-16 left-8">
              <img
                src={profile.data.avatar || "/default-avatar.png"}
                alt="avatar"
                className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
              />
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-20 px-8 pb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {profile.data.displayName}
                </h1>
                <p className="text-gray-600">@{profile.data.username}</p>
                <p className="text-gray-500 flex items-center mt-2">
                  <FaEnvelope className="mr-2" /> {profile.data.email}
                </p>
              </div>
              <button
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 flex items-center space-x-2 shadow-sm"
                onClick={() => navigate("/profile")}
              >
                Edit Profile
              </button>
            </div>

            {/* Bio */}
            <div className="mb-8 bg-gray-50 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                About
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {profile.data.bio || "No bio available"}
              </p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Contact Information
                </h2>
                <div className="space-y-3">
                  <p className="flex items-center text-gray-700">
                    <FaPhone className="mr-3 text-gray-500" />
                    {profile.data.phoneNumber || "Not provided"}
                  </p>
                  <p className="flex items-center text-gray-700">
                    <FaBirthdayCake className="mr-3 text-gray-500" />
                    {profile.data.dateOfBirth
                      ? new Date(profile.data.dateOfBirth).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : "Not provided"}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Location
                </h2>
                <div className="space-y-3">
                  <p className="flex items-center text-gray-700">
                    <FaMapMarkerAlt className="mr-3 text-gray-500" />
                    {profile.data.address ? (
                      <span>
                        {[
                          profile.data.address.street,
                          profile.data.address.city,
                          profile.data.address.state,
                          profile.data.address.country,
                          profile.data.address.zipCode,
                        ]
                          .filter(Boolean)
                          .join(", ")}
                      </span>
                    ) : (
                      "Not provided"
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            {profile.data.socialLinks &&
              Object.keys(profile.data.socialLinks).length > 0 && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Social Links
                  </h2>
                  <div className="flex flex-wrap gap-4">
                    {Object.entries(profile.data.socialLinks).map(
                      ([platform, url]) =>
                        url && (
                          <a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition duration-200"
                          >
                            <span className="text-gray-600 mr-2">
                              {socialIcons[platform]}
                            </span>
                            <span className="capitalize text-gray-700">
                              {platform}
                            </span>
                          </a>
                        )
                    )}
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>

        {/* Blog Posts Section */}
        <div className="max-w-6xl mx-auto mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Blog Posts</h2>
          
          {myBlogs.length === 0 ? (
            <p className="text-gray-600 text-center">No blog posts found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-5">
              {myBlogs.map((post) => (
                <div
                  key={post._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-5 flex flex-col"
                >
                  {/* Cover Image */}
                  {post.coverImage ? (
                    <img
                      src={post.coverImage}
                      alt="Cover"
                      className="h-40 w-full object-cover rounded-md mb-4"
                    />
                  ) : (
                    <div className="h-40 w-full bg-gray-200 flex items-center justify-center rounded-md text-gray-500 text-sm mb-4">
                      No Image
                    </div>
                  )}
                  {/* Title & Content */}
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {post.title || "Untitled"}
                  </h2>
                  <p className="text-sm text-gray-600 mb-3">
                    {post.content?.length > 100
                      ? post.content.substring(0, 100) + "..."
                      : post.content || "No content available"}
                  </p>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded"
                      >
                        #{tag}
                      </span>
                    ))}                    
                  </div>
                  {/* View Button and Status Toggle */}
                  <div className="mt-auto flex justify-between items-center">
                    <button
                      onClick={() => navigate(`/posts/${post._id}`)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Read More
                    </button>
                    <button
                      onClick={async () => {
                        try {
                          const updated = await togglePublishBlog(post._id, !post.isPublished);
                          setMyBlogs((prev) =>
                            prev.map((blog) =>
                              blog._id === post._id ? { ...blog, isPublished: updated.isPublished } : blog
                            )
                          );
                        } catch (error) {
                          console.error("Failed to toggle post status:", error);
                          alert("Could not update post status.");
                        }
                      }}
                      className={`text-sm ${
                        post.isPublished 
                          ? "text-gray-500 hover:bg-gray-200" 
                          : "text-green-600 hover:bg-green-50"
                      } px-2 py-1 rounded transition-colors`}
                    >
                      {post.isPublished ? "Mark as Draft" : "Publish"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
    </>
  );
}
