import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { getBlogById, updateBlog } from "../services/blogService";
import { useParams, useNavigate } from "react-router-dom";

// Example tag options — you can customize or fetch dynamically
const tagOptions = [
  { value: "javascript", label: "JavaScript" },
  { value: "react", label: "React" },
  { value: "css", label: "CSS" },
  { value: "webdev", label: "Web Development" },
  { value: "nodejs", label: "Node.js" },
];

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]); // now array of {value,label}
  const [coverImage, setCoverImage] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    const loadBlog = async () => {
      const blog = await getBlogById(id);
      setTitle(blog.title);
      setContent(blog.content);
      // Map existing string tags to react-select format
      const formattedTags = (blog.tags || []).map((tag) => ({
        value: tag,
        label: tag.charAt(0).toUpperCase() + tag.slice(1),
      }));
      setTags(formattedTags);
      setCoverImage(blog.coverImage || "");
      setIsPublished(blog.isPublished || false);
    };
    loadBlog();
  }, [id]);

  const handleTagsChange = (selectedOptions) => {
    setTags(selectedOptions || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tagsAsStrings = tags.map((tag) => tag.value.toLowerCase());

    try {
      await updateBlog(id, {
        title,
        content,
        tags: tagsAsStrings,
        coverImage,
        isPublished,
      });
      navigate(`/posts/${id}`);
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center px-6 py-12">
      <main className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-gray-200 p-12">
        <h2 className="text-4xl font-extrabold mb-10 text-indigo-900 text-center drop-shadow-sm">
          Edit Post
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <input
            type="text"
            placeholder="Title"
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* Content */}
          <textarea
            placeholder="Content"
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 transition h-40 resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />

          <CreatableSelect
            isMulti
            name="tags"
            options={tagOptions}
            classNamePrefix="select"
            value={tags}
            onChange={handleTagsChange}
            placeholder="Select or type new tags..."
            isClearable
            isSearchable
            formatCreateLabel={(inputValue) =>
              `Create new tag: "${inputValue}"`
            }
          />

          {/* Cover Image URL */}
          <input
            type="text"
            placeholder="Cover Image URL"
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
          />

          {/* Live preview of cover image */}
          {coverImage && (
            <div className="mt-4 rounded-lg overflow-hidden shadow-lg max-h-64">
              <img
                src={coverImage}
                alt="Cover Preview"
                className="object-cover w-full h-64"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/400x256?text=Invalid+Image";
                }}
              />
            </div>
          )}

          {/* Publish checkbox */}
          <label className="flex items-center space-x-2 text-gray-700 text-lg">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span>Publish</span>
          </label>

          {/* Buttons */}
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
            >
              Update Post
            </button>
            <button
              type="button"
              onClick={() => navigate(`/posts/${id}`)}
              className="bg-gray-300 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
