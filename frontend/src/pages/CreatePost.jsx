import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../services/blogService";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPost = {
        title,
        content,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== ""),
        coverImage,
        isPublished,
      };
      await createBlog(newPost);
      navigate("/");
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Create New Post</h2>
        <button
          onClick={() => navigate("/")}
          className="text-blue-600 hover:underline"
        >
          ← Back to Home
        </button>
      </div>{" "}
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
          placeholder="Tags (comma separated)"
          className="w-full px-4 py-2 border rounded"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
         <input
          type="text"
          placeholder="Cover Image URL"
          className="w-full px-4 py-2 border rounded"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
        />
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="publish"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
          <label htmlFor="publish" className="text-gray-700">
            Publish now
          </label>
        </div>
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
