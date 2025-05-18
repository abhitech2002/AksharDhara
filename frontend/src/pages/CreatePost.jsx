import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../services/blogService";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPost = {
        title,
        content,
        author,
      };
      await createBlog(newPost);
      navigate("/");
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return(
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Create New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Title"
          className="w-full px-4 py-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          className="w-full px-4 py-2 border rounded h-40"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <input
          type="text"
          placeholder="Author"
          className="w-full px-4 py-2 border rounded"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Create Post
        </button>
      </form>
    </main>
  );
}

export default CreatePost;
