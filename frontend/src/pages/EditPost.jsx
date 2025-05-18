import React, { useEffect, useState } from "react";
import { getBlogById, updateBlog } from "../services/blogService";
import { useParams, useNavigate } from "react-router-dom";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const loadBlog = async () => {
      const blog = await getBlogById(id);
      setTitle(blog.title);
      setContent(blog.content);
      setAuthor(blog.author);
    };
    loadBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateBlog(id, { title, content, author });
      navigate(`/posts/${id}`);
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Edit Post</h2>
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
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Update Post
        </button>
      </form>
    </main>
  );
}
