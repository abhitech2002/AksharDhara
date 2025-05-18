import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function PostDetail() {
  const { id } = useParams();

  // Simulated post data
  const post = {
    title: 'How to Learn React Step-by-Step',
    author: 'John Doe',
    date: 'May 10, 2025',
    content: `React is one of the most popular frontend libraries. To learn it:

1. Start with understanding JSX syntax.
2. Learn how components work — both functional and class-based.
3. Understand hooks like useState, useEffect.
4. Build simple projects like Todo apps.

The key is consistency and practice.`
  };

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
          <h1 className="text-4xl font-bold mb-4 text-gray-900">{post.title}</h1>
          <p className="text-sm text-gray-500 mb-6">
            By <span className="font-semibold">{post.author}</span> • {post.date}
          </p>

          <div className="prose prose-blue max-w-none">
            {post.content.split('\n').map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </article>
      </div>

      <footer className="bg-white shadow-inner mt-12">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} AksharDhara. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
