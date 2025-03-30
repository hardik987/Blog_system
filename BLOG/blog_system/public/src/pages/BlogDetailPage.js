import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlogContext } from '../context/BlogContext';
import CommentSection from '../components/blog/CommentSection';
import CountryInfo from '../components/common/CountryInfo';

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBlogById, toggleLike, userInfo, countries } = useBlogContext();
  
  const blog = getBlogById(id);
  
  useEffect(() => {
    if (!blog) {
      navigate('/not-found');
    }
  }, [blog, navigate]);
  
  if (!blog) return null;
  
  const country = countries.find(c => c.cca3 === blog.countryCode);
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src={blog.imageUrl} 
            alt={`Flag of ${blog.title.split(' ')[1]}`}
            className="w-full h-64 object-cover"
          />
          
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-2 text-gray-800">{blog.title}</h1>
            
            <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
              <span>By {blog.author}</span>
              <span>{formatDate(blog.date)}</span>
            </div>
            
            {country && <CountryInfo country={country} />}
            
            <div className="prose max-w-none mb-6">
              {blog.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph.trim()}</p>
              ))}
            </div>
            
            <div className="flex items-center space-x-4 border-t pt-4">
              <button
                onClick={() => toggleLike(blog.id)}
                disabled={!userInfo}
                className={`flex items-center ${
                  userInfo ? 'text-red-500 hover:text-red-700' : 'text-gray-400'
                } transition-colors`}
                title={userInfo ? 'Like this post' : 'Login to like posts'}
              >
                <span className="mr-1 text-xl">❤️</span> 
                <span className="font-medium">{blog.likes} likes</span>
              </button>
            </div>
            
            <CommentSection blogId={blog.id} comments={blog.comments} />
          </div>
        </article>
      </div>
    </main>
  );
};

export default BlogDetailPage;