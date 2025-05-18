import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function PostDetail() {
  const { id } = useParams();

  const post = {
    1: {
      title: "How to Learn React Step-by-Step",
      content:
        "React is a JavaScript library for building user interfaces. Start by learning components, props, and hooks...",
    },
    2: {
      title: "Tailwind CSS Tips for Clean UI",
      content:
        "Tailwind CSS helps you build UIs faster with utility classes. Learn spacing, layout, and responsive tips...",
    },
    3: {
      title: "Why You Should Learn JavaScript First",
      content:
        "JavaScript is the foundation of web development. Before learning React or Vue, get solid with JS basics...",
    },
  }[id];

  if (!post)
    return (
      <div className="text-center text-red-500 mt-10">Post not found.</div>
    );

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">{post.title}</h1>
      <p className="text-lg text-gray-700 leading-7">{post.content}</p>
    </div>
  );
}
