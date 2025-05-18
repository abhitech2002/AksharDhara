import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getBlogs } from "../services/blogService";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBlog = async () => {
      try {
        const data = await getBlogs();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    getBlog();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-blue-50 flex flex-col justify-between">
      {/* Header Navbar */}
      <Navbar />

      {/* Blog Feed */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold text-center mb-12 text-gray-900 tracking-tight">
          Explore Fresh Ideas
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading blogs...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500 mb-3">
                    By {post.author} •{" "}
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                    {post.content.length > 120
                      ? post.content.substring(0, 120) + "..."
                      : post.content}
                  </p>
                </div>
                <Link
                  to={`/post/${post._id}`}
                  className="mt-auto inline-block text-blue-600 hover:underline text-sm"
                >
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
