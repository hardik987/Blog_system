import React, { useState } from 'react';
import { useBlogContext } from '../context/BlogContext';
import BlogCard from '../components/blog/BlogCard';

const HomePage = () => {
  const { blogs, loading, error } = useBlogContext();
  const [filter, setFilter] = useState('all');
  
  if (loading) return <div className="container mx-auto px-4 py-8 text-center">Loading blogs...</div>;
  if (error) return <div className="container mx-auto px-4 py-8 text-center text-red-600">{error}</div>;
  
  const regions = ['all', ...new Set(blogs.map(blog => {
    const country = blog.title.split(' ')[1];
    return blogs.find(b => b.title.includes(country))?.content.split('located in ')[1]?.split('.')[0];
  }).filter(Boolean))];
  
  const filteredBlogs = filter === 'all' 
    ? blogs 
    : blogs.filter(blog => blog.content.includes(`located in ${filter}`));
  
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Welcome to GlobalBlog</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore blog posts about countries around the world, their cultures, landscapes, and more.
        </p>
      </div>
      
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-gray-700">Filter by region:</span>
          {regions.map(region => (
            <button
              key={region}
              onClick={() => setFilter(region)}
              className={`px-3 py-1 rounded-full ${
                filter === region 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition-colors`}
            >
              {region.charAt(0).toUpperCase() + region.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {filteredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600">No blogs found for this region.</p>
        </div>
      )}
    </main>
  );
};

export default HomePage;