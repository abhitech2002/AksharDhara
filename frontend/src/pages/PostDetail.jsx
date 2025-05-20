import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getBlogById, deleteBlog } from "../services/blogService";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this post?");
    if (!confirm) return;

    try {
      await deleteBlog(post._id);
      navigate("/");
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  useEffect(() => {
    const getBlog = async () => {
      try {
        const data = await getBlogById(id);
        setPost(data);
      } catch (error) {
        console.error("Error fetching blog by ID:", error);
      } finally {
        setLoading(false);
      }
    };
    getBlog();
  }, [id]);

  if (loading) {
    return <div className="text-center py-10 text-gray-600">Loading...</div>;
  }

  if (!post) {
    return <div className="text-center py-10 text-red-500">Post not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-100 text-gray-800">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header actions */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            ← Back to Blog
          </Link>

          <div>
            <Link
              to={`/edit/${post._id}`}
              className="bg-yellow-500 text-white px-4 py-1 rounded-md text-sm font-semibold hover:bg-yellow-600 transition"
            >
              ✎ Edit Post
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-1 rounded-md text-sm font-semibold hover:bg-red-600 transition ml-4"
            >
              🗑 Delete Post
            </button>
          </div>
        </div>

        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Cover Image */}
          {post.coverImage && (
            <img
              src={post.coverImage}
              alt="Cover"
              className="w-full h-64 object-cover"
            />
          )}

          <div className="p-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">
              {post.title}
            </h1>

            <p className="text-sm text-gray-500 mb-4">
              By <span className="font-semibold">{post.author?.username}</span> •{" "}
              {new Date(post.createdAt).toLocaleDateString()}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="prose prose-blue max-w-none">{post.content}</div>
          </div>
        </article>
      </div>
    </div>
  );
}
