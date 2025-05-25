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

  // Create map
  comments.forEach((comment) => {
    comment.replies = [];
    commentMap[comment._id] = comment;
  });

  // Build tree
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
    return response; // Return the response for the local update
  };

  const handleDelete = async (id) => {
    await deleteComment(id);
    loadComments();
  };

  return (
    <div>
      <h3 className="text-lg font-bold my-2">Comments</h3>

      {user && (
        <form onSubmit={handleNewComment}>
          <textarea
            className="w-full p-2 border rounded mb-2"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
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
          <CommentItem
            key={comment._id}
            comment={comment}
            user={user}
            onReply={handleReply}
            onDelete={handleDelete}
            onLocalReplyUpdate={addReplyToComment}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
