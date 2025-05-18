import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBlogById } from "../services/blogService";

export default function PostDetail() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

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
        <Link
          to="/"
          className="inline-block mb-6 text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          ← Back to Blog
        </Link>

        <article className="bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            {post.title}
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            By <span className="font-semibold">{post.author}</span> •{" "}
            {new Date(post.createdAt).toLocaleDateString()}
          </p>

          <div className="prose prose-blue max-w-none">{post.content}</div>
        </article>
      </div>
    </div>
  );
}
