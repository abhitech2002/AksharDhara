import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getBlogs } from "../services/blogService";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const { data, totalPages } = await getBlogs({
        page,
        search,
        sortBy,
        sortOrder,
      });
      setPosts(data);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [page, search, sortBy, sortOrder]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); // reset to first page
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-blue-50 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="border-b border-gray-300 pb-6 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Explore Fresh Ideas
            </h1>
            <Link
              to="/create"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
            >
              + Create Post
            </Link>
          </div>

          {/* Search & Sort */}
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search blog title, tags..."
              className="w-full sm:w-1/2 border border-gray-300 rounded-md px-4 py-2 text-sm"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-md border text-sm"
            >
              <option value="createdAt">Newest</option>
              <option value="title">Title</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-4 py-2 rounded-md border text-sm"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading blogs...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 flex flex-col overflow-hidden"
                >
                  {post.coverImage ? (
                    <img
                      src={post.coverImage}
                      alt="Cover"
                      className="h-48 w-full object-cover"
                    />
                  ) : (
                    <div className="h-48 w-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                      No Image
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                      {post.title}
                    </h2>
                    <p className="text-sm text-gray-500 mb-2">
                      By {post.author?.username} •{" "}
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags?.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                      {post.content.length > 120
                        ? post.content.substring(0, 120) + "..."
                        : post.content}
                    </p>

                    <Link
                      to={`/posts/${post._id}`}
                      className="mt-auto inline-block text-blue-600 hover:underline text-sm"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center gap-2">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-sm font-medium">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
                className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
