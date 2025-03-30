import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBlogContext } from '../../context/BlogContext';

const Header = () => {
  const { userInfo, logout } = useBlogContext();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };
  
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-3 md:mb-0">
          <Link to="/" className="text-2xl font-bold">GlobalBlog</Link>
        </div>
        
        <form onSubmit={handleSearch} className="flex w-full md:w-auto mb-3 md:mb-0">
          <input
            type="text"
            placeholder="Search blogs..."
            className="px-3 py-1 rounded-l text-gray-700 focus:outline-none w-full md:w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            type="submit" 
            className="bg-blue-800 hover:bg-blue-900 px-4 py-1 rounded-r transition-colors"
          >
            Search
          </button>
        </form>
        
        <nav className="flex items-center">
          <Link to="/" className="px-3 py-1 hover:text-gray-200 transition-colors">Home</Link>
          <Link to="/countries" className="px-3 py-1 hover:text-gray-200 transition-colors">Countries</Link>
          
          {userInfo ? (
            <div className="flex items-center">
              <span className="px-3">Welcome, {userInfo.name}</span>
              <button
                onClick={logout}
                className="ml-2 bg-blue-700 hover:bg-blue-800 px-4 py-1 rounded transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="ml-2 bg-blue-700 hover:bg-blue-800 px-4 py-1 rounded transition-colors"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;