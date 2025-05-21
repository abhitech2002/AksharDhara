import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../services/blogService";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [imgValid, setImgValid] = useState(false);

  const maxContentLength = 2000;

  const navigate = useNavigate();

  useEffect(() => {
    setFadeIn(true);
  }, []);

  useEffect(() => {
    if (!coverImage) {
      setImgValid(false);
      return;
    }
    const img = new Image();
    img.onload = () => setImgValid(true);
    img.onerror = () => setImgValid(false);
    img.src = coverImage;
  }, [coverImage]);

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
    <>
      <style>
        {`
          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(15px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes bounceCheckbox {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.15);
            }
          }
          .fade-in-up {
            animation: fadeInUp 0.6s ease forwards;
          }
          .checkbox-bounce:checked {
            animation: bounceCheckbox 0.3s ease;
          }
          input:focus, textarea:focus {
            transform: scale(1.02);
            box-shadow: 0 0 10px 2px #6366f1; /* indigo-500 */
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          button:hover {
            transform: scale(1.03);
            box-shadow: 0 8px 20px rgba(99, 102, 241, 0.5);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .img-preview {
            max-height: 250px;
            border-radius: 12px;
            box-shadow: 0 6px 15px rgba(99, 102, 241, 0.3);
            margin-top: 12px;
            object-fit: cover;
            opacity: 0;
            animation: fadeInUp 0.5s forwards;
          }
          .char-counter {
            font-size: 0.875rem;
            color: #6b7280; /* gray-500 */
            text-align: right;
            margin-top: 4px;
            font-weight: 500;
            user-select: none;
          }
        `}
      </style>
      <main
        className="min-h-screen flex items-center justify-center px-4 py-12"
        style={{
          background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        }}
      >
        <div
          className={`w-full max-w-3xl bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-lg p-10 ${
            fadeIn ? "fade-in-up" : ""
          }`}
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-extrabold text-gray-800 tracking-wide">
              Create New Post
            </h2>
            <button
              onClick={() => navigate("/")}
              className="text-indigo-600 hover:text-indigo-800 font-semibold transition"
            >
              ← Back to Home
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-8">
            <input
              type="text"
              placeholder="Title"
              className="w-full px-5 py-3 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none transition"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <div>
              <textarea
                placeholder="Content"
                className="w-full px-5 py-4 text-lg border border-gray-300 rounded-lg shadow-sm h-48 resize-y focus:outline-none transition"
                value={content}
                maxLength={maxContentLength}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
              <div className="char-counter">
                {content.length} / {maxContentLength}
              </div>
            </div>
            <input
              type="text"
              placeholder="Tags (comma separated)"
              className="w-full px-5 py-3 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none transition"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <div>
              <input
                type="text"
                placeholder="Cover Image URL"
                className="w-full px-5 py-3 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none transition"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
              />
              {imgValid && (
                <img
                  src={coverImage}
                  alt="Cover Preview"
                  className="img-preview"
                />
              )}
            </div>
            <label className="flex items-center space-x-3 mt-4 cursor-pointer select-none text-gray-700 font-medium">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={() => setIsPublished(!isPublished)}
                className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 checkbox-bounce"
              />
              <span>Publish Now</span>
            </label>
            <button
              type="submit"
              className="w-full mt-8 bg-indigo-600 text-white text-xl font-semibold rounded-lg py-4 shadow-md hover:bg-indigo-700 transition-transform"
            >
              {isPublished ? "Publish Post" : "Save as Draft"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default CreatePost;
