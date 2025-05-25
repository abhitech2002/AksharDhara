import { useState, useEffect } from "react";
import {
  createComment,
  getCommentsByBlogs,
  deleteComment,
} from "../services/commentService";
import { useAuth } from "../context/AuthContext";
import CommentItem from "./CommentItem";

const buildCommentTree = (comments) => {
  const commentMap = {};
  const roots = [];

  comments.forEach((comment) => {
    comment.replies = [];
    commentMap[comment._id] = comment;
  });

  comments.forEach((comment) => {
    if (comment.parentComment) {
      const parent = commentMap[comment.parentComment._id];
      if (parent) parent.replies.push(comment);
    } else {
      roots.push(comment);
    }
  });

  return roots;
};

const CommentSection = ({ blogId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    console.log("Current user:", user);
  }, [user]);

  const addReplyToComment = (parentId, newReply) => {
    const updateTree = (comments) =>
      comments.map((comment) => {
        if (comment._id === parentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply],
          };
        } else if (comment.replies && comment.replies.length > 0) {
          return {
            ...comment,
            replies: updateTree(comment.replies),
          };
        }
        return comment;
      });

    setComments((prev) => updateTree(prev));
  };

  const loadComments = async () => {
    const comments = await getCommentsByBlogs(blogId);
    const tree = buildCommentTree(comments.data);
    setComments(tree);
  };

  useEffect(() => {
    loadComments();
  }, [blogId]);

  const handleNewComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      content: newComment,
      blog: blogId,
      author: user._id,
    };
    await createComment(comment);
    setNewComment("");
    loadComments();
  };

  const handleReply = async (reply) => {
    const response = await createComment(reply);
    loadComments();
    return response;
  };

  const handleDelete = async (id) => {
    await deleteComment(id);
    loadComments();
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 space-y-6">
      <h3 className="text-2xl font-semibold text-gray-800 border-b pb-4">Discussion</h3>

      {user && (
        <form onSubmit={handleNewComment} className="space-y-4">
          <div className="relative">
            <textarea
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[120px] transition duration-200 ease-in-out"
              placeholder="Share your thoughts..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              type="submit"
              className="absolute bottom-3 right-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out flex items-center space-x-2 text-sm font-medium"
            >
              <span>Post Comment</span>
            </button>
          </div>
        </form>
      )}

      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Be the first to share your thoughts!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              user={user}
              onReply={handleReply}
              onDelete={handleDelete}
              onLocalReplyUpdate={addReplyToComment}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
