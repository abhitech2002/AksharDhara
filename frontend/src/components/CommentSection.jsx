import { useState, useEffect } from "react";
import {
  createComment,
  getCommentsByBlogs,
  deleteComment,
} from "../services/commentService";
import { useAuth } from "../context/AuthContext";

const CommentSection = ({ blogId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  const loadComments = async () => {
    const comments = await getCommentsByBlogs(blogId);
    setComments(comments.data);
  };

  useEffect(() => {
    loadComments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const comment = {
      content,
      blog: blogId,
      author: user._id,
    };
    await createComment(comment);
    setContent("");
    loadComments();
  };

  const handleDelete = async (id) => {
    await deleteComment(id);
    loadComments();
  };

  return (
    <>
      <div>
        <h3 className="text-lg font-bold my-2">Comments</h3>
        {user && (
          <form onSubmit={handleSubmit}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write a comment..."
              className="w-full p-2 border rounded mb-2"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </form>
        )}
        <div className="mt-4">
          {comments.map((comment) => (
            <div key={comment._id} className="border p-2 mb-2 rounded">
              <div className="flex items-center mb-1">
                <img
                  src={comment.author?.avatar}
                  className="w-6 h-6 rounded-full mr-2"
                />
                <span className="font-semibold">
                  {comment.author?.displayName}
                </span>
                <span className="ml-2 text-gray-500 text-sm">
                  {new Date(comment.createdAt).toLocaleString()}
                </span>
              </div>
              <p>{comment.content}</p>
              {user?._id === comment.author._id && (
                <button
                  onClick={() => handleDelete(comment._id)}
                  className="text-red-500 text-sm mt-1"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CommentSection;