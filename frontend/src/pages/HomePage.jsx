import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function HomePage() {
  // Mock blog post data for UI rendering
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
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-blue-50 flex flex-col justify-between">
      {/* Header Navbar */}
      <Navbar />

      {/* Blog Feed */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-12 text-center">
          Explore Fresh Ideas
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 hover:text-blue-700 transition duration-200 cursor-pointer">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 mb-2">
                  By{" "}
                  <span className="font-medium text-gray-700">
                    {post.author}
                  </span>{" "}
                  • {post.date}
                </p>
                <p className="text-gray-700 text-base leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
              <div>
                <Link
                  to={`/posts/${post.id}`}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg mt-auto hover:bg-blue-700 transition"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
