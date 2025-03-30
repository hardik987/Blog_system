import React, { useState } from 'react';
import { useBlogContext } from '../../context/BlogContext';

const CommentSection = ({ blogId, comments }) => {
  const { addComment, userInfo } = useBlogContext();
  const [commentText, setCommentText] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim() && userInfo) {
      addComment(blogId, {
        author: userInfo.username,
        text: commentText.trim()
      });
      setCommentText('');
    }
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Comments ({comments.length})</h3>
      
      {userInfo ? (
        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            required
          ></textarea>
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Post Comment
          </button>
        </form>
      ) : (
        <div className="mb-6 p-4 bg-gray-100 rounded-lg text-center">
          <p>Please <a href="/login" className="text-blue-600 hover:underline">login</a> to leave a comment.</p>
        </div>
      )}
      
      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map(comment => (
            <div key={comment.id} className="border-b pb-4">
              <div className="flex justify-between mb-1">
                <div className="font-medium">{comment.author}</div>
                <div className="text-sm text-gray-500">{formatDate(comment.date)}</div>
              </div>
              <p className="text-gray-700">{comment.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">No comments yet. Be the first to comment!</p>
      )}
    </div>
  );
};

export default CommentSection;