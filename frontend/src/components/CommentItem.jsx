import { useState } from "react";
import { createComment } from "../services/commentService";

const CommentItem = ({
  comment,
  user,
  onReply,
  onDelete,
  onLocalReplyUpdate,
}) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    console.log(user.id)
    if (!user || !user.id) {
      console.error("User is missing. Cannot submit reply.");
      return;
    }
    const reply = {
      content: replyText,
      blog: comment.blog,
      author: user.id,
      parentComment: comment._id,
    };

    try {
      const createdReply = await onReply(reply);
      if (createdReply && createdReply.data) {
        onLocalReplyUpdate(comment._id, createdReply.data);
      }
      setReplyText("");
      setShowReplyBox(false);
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  return (
    <div className="ml-4 border-l pl-4 mt-2">
      <div className="flex items-center gap-2">
        <img src={comment.author?.avatar} className="w-6 h-6 rounded-full" />
        <strong>{comment.author?.displayName}</strong>
        <span className="text-sm text-gray-500">
          {new Date(comment.createdAt).toLocaleString()}
        </span>
      </div>
      <p className="my-1">{comment.content}</p>

      <div className="text-sm flex gap-2">
        {user && (
          <button
            onClick={() => setShowReplyBox(!showReplyBox)}
            className="text-blue-500"
          >
            Reply
          </button>
        )}
        {user?._id === comment.author._id && (
          <button
            onClick={() => onDelete(comment._id)}
            className="text-red-500"
          >
            Delete
          </button>
        )}
      </div>

      {showReplyBox && (
        <form onSubmit={handleReplySubmit} className="mt-2">
          <textarea
            className="w-full p-2 border rounded"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write your reply..."
          />
          <button
            type="submit"
            className="mt-1 bg-blue-500 text-white px-2 py-1 rounded"
          >
            Submit Reply
          </button>
        </form>
      )}

      {comment.replies?.map((reply) => (
        <CommentItem
          key={reply._id}
          comment={reply}
          user={user}
          onReply={onReply}
          onDelete={onDelete}
          onLocalReplyUpdate={onLocalReplyUpdate}
        />
      ))}
    </div>
  );
};

export default CommentItem;
