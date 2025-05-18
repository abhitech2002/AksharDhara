import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const posts = [
    {
      id: 1,
      title: "How to Learn React Step-by-Step",
      author: "John Doe",
      date: "May 10, 2025",
      excerpt:
        "React is a powerful frontend library. This post helps you get started with components, hooks, and more...",
    },
    {
      id: 2,
      title: "Tailwind CSS Tips for Clean UI",
      author: "Jane Smith",
      date: "May 12, 2025",
      excerpt:
        "Tailwind CSS makes UI styling efficient and responsive. Learn how to use utility classes effectively...",
    },
    {
      id: 3,
      title: "Why You Should Learn JavaScript First",
      author: "Alex Johnson",
      date: "May 14, 2025",
      excerpt:
        "Understanding JavaScript is key before diving into frontend frameworks. Here’s why...",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Navbar */}
      <header className="bg-white shadow mb-8">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            AksharDhara
          </Link>
          <nav className="space-x-4">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link to="/login" className="text-gray-700 hover:text-blue-600">
              Login
            </Link>
            <Link to="/register" className="text-gray-700 hover:text-blue-600">
              Register
            </Link>
          </nav>
        </div>
      </header>

      {/* Blog Feed */}
      <div className="max-w-5xl mx-auto px-4 pb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Latest Blog Posts
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500 mb-1">
                By {post.author} • {post.date}
              </p>
              <p className="text-gray-700 mb-4">{post.excerpt}</p>
              <Link
                to={`/posts/${post.id}`}
                className="text-blue-600 hover:underline"
              >
                Read More →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white mt-16 shadow-inner">
        <div className="max-w-5xl mx-auto px-4 py-6 text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} AksharDhara. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
