import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useBlogContext } from '../context/BlogContext';
import BlogCard from '../components/blog/BlogCard';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { searchBlogs } = useBlogContext();
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    if (query) {
      setResults(searchBlogs(query));
    } else {
      setResults([]);
    }
  }, [query, searchBlogs]);
  
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">
          Search Results for "{query}"
        </h1>
        <p className="text-gray-600">
          Found {results.length} blog{results.length !== 1 ? 's' : ''}
        </p>
      </div>
      
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-2">No blogs found matching your search.</p>
          <p className="text-gray-500">Try different keywords or browse our homepage.</p>
        </div>
      )}
    </main>
  );
};

export default SearchResultsPage;