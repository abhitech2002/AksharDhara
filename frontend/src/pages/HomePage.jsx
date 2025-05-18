import React from "react";

function HomePage() {
    const posts = [
    {
      id: 1,
      title: 'How to Learn React Step-by-Step',
      author: 'John Doe',
      date: 'May 10, 2025',
      excerpt: 'React is a powerful frontend library. This post helps you get started with components, hooks, and more...',
    },
    {
      id: 2,
      title: 'Tailwind CSS Tips for Clean UI',
      author: 'Jane Smith',
      date: 'May 12, 2025',
      excerpt: 'Tailwind CSS makes UI styling efficient and responsive. Learn how to use utility classes effectively...',
    },
    {
      id: 3,
      title: 'Why You Should Learn JavaScript First',
      author: 'Alex Johnson',
      date: 'May 14, 2025',
      excerpt: 'Understanding JavaScript is key before diving into frontend frameworks. Here’s why...',
    },
  ];
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Latest Blog Posts on{" "}
          <b>
            AksharDhara <span className="text-red-500">!!!</span>
          </b>
        </h1>
      </div>
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
            <button className="text-blue-600 hover:underline">
              Read More →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
