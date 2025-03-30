import React from 'react';
import { Link } from 'react-router-dom';
import { useBlogContext } from '../../context/BlogContext';

const BlogCard = ({ blog }) => {
  const { toggleLike, userInfo } = useBlogContext();
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-102 hover:shadow-lg">
      <img 
        src={blog.imageUrl} 
        alt={`Flag of ${blog.title.split(' ')[1]}`}
        className="w-full h-40 object-cover"
      />
      
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">{blog.title}</h2>
        <p className="text-gray-600 mb-4">{blog.summary}</p>
        
        <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
          <span>By {blog.author}</span>
          <span>{formatDate(blog.date)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <Link 
            to={`/blog/${blog.id}`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Read More
          </Link>
          
          <div className="flex items-center">
            <button
              onClick={() => toggleLike(blog.id)}
              disabled={!userInfo}
              className={`flex items-center ${userInfo ? 'text-red-500 hover:text-red-700' : 'text-gray-400'} transition-colors`}
              title={userInfo ? 'Like this post' : 'Login to like posts'}
            >
              ❤️ {blog.likes}
            </button>
            <div className="ml-3 text-gray-500">
              💬 {blog.comments.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
