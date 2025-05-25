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
  const [isCollapsed, setIsCollapsed] = useState(true); // Changed to true for default collapsed state

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

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

  const hasReplies = comment.replies && comment.replies.length > 0;

  return (
    <div className="ml-6 border-l-2 border-gray-100 pl-6 mt-4 relative before:absolute before:w-4 before:h-4 before:bg-blue-50 before:rounded-full before:-left-2 before:top-0 before:border-2 before:border-blue-200">
      <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="relative">
            <img 
              src={comment.author?.avatar || 'https://via.placeholder.com/40'} 
              className="w-8 h-8 rounded-full object-cover border-2 border-gray-50" 
              alt={comment.author?.displayName}
            />
          </div>
          <div className="flex flex-col">
            <strong className="text-gray-900 font-medium">{comment.author?.displayName}</strong>
            <span className="text-xs text-gray-500">
              {new Date(comment.createdAt).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="prose prose-sm max-w-none mt-2">
          <p className="text-gray-700 leading-relaxed">{comment.content}</p>
        </div>

        <div className="flex items-center gap-4 mt-3 pt-2 border-t border-gray-50">
          {user && (
            <button
              onClick={() => setShowReplyBox(!showReplyBox)}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
              </svg>
              Reply
            </button>
          )}
          {user?.id === comment.author?._id && ( 
            <button
              onClick={() => onDelete(comment._id)}
              className="text-sm text-red-500 hover:text-red-600 font-medium flex items-center gap-1 transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
              Delete
            </button>
          )}
          {hasReplies && (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-sm text-gray-600 hover:text-gray-800 font-medium flex items-center gap-1 transition-colors duration-200"
            >
              <svg 
                className={`w-4 h-4 transform transition-transform duration-200 ${isCollapsed ? '' : 'rotate-180'}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
              </svg>
              {isCollapsed ? `Show ${comment.replies.length} ${comment.replies.length === 1 ? 'reply' : 'replies'}` : 'Hide replies'}
            </button>
          )}
        </div>

        {showReplyBox && (
          <form onSubmit={handleReplySubmit} className="mt-4">
            <textarea
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out resize-none min-h-[80px]"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write your reply..."
            />
            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={() => setShowReplyBox(false)}
                className="mr-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Submit Reply
              </button>
            </div>
          </form>
        )}
      </div>

      <div className={`space-y-4 overflow-hidden transition-all duration-300 ease-in-out ${isCollapsed ? 'max-h-0 opacity-0' : 'max-h-[9999px] opacity-100'}`}>
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
    </div>
  );
};

export default CommentItem;
