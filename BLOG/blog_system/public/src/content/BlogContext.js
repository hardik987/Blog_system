import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const BlogContext = createContext();

export const useBlogContext = () => useContext(BlogContext);

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  
  // Fetch blogs (simulated data since we need a blog structure)
  useEffect(() => {
    const generateMockBlogs = async () => {
      try {
        // Get real country data to incorporate into our mock blogs
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const fetchedCountries = response.data.slice(0, 30);
        setCountries(fetchedCountries);
        
        // Create mock blogs using country data
        const mockBlogs = fetchedCountries.slice(0, 10).map((country, index) => ({
          id: index + 1,
          title: `Exploring ${country.name.common}`,
          summary: `Discover the beauty and culture of ${country.name.common}`,
          content: `${country.name.common} is a beautiful country located in ${country.region}. 
                  It has a population of ${country.population.toLocaleString()} people.
                  The capital city is ${country.capital?.[0] || 'Unknown'}.
                  ${country.flags?.alt || 'This country has a rich history and culture worth exploring.'}`,
          author: "Travel Blogger",
          countryCode: country.cca3,
          date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
          imageUrl: country.flags.png,
          likes: Math.floor(Math.random() * 100),
          comments: Array(Math.floor(Math.random() * 5)).fill().map((_, i) => ({
            id: i + 1,
            author: `User${Math.floor(Math.random() * 100)}`,
            text: `I've always wanted to visit ${country.name.common}! Great post.`,
            date: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString()
          }))
        }));
        
        setBlogs(mockBlogs);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
        console.error("Error fetching data:", err);
      }
    };
    
    generateMockBlogs();
  }, []);
  
  // Blog operations
  const getBlogById = (id) => {
    return blogs.find(blog => blog.id === parseInt(id));
  };
  
  const addComment = (blogId, comment) => {
    setBlogs(blogs.map(blog => {
      if (blog.id === blogId) {
        return {
          ...blog,
          comments: [...blog.comments, {
            id: blog.comments.length + 1,
            ...comment,
            date: new Date().toISOString()
          }]
        };
      }
      return blog;
    }));
  };
  
  const toggleLike = (blogId) => {
    setBlogs(blogs.map(blog => {
      if (blog.id === blogId) {
        return {
          ...blog,
          likes: blog.likes + 1
        };
      }
      return blog;
    }));
  };
  
  const searchBlogs = (query) => {
    if (!query) return blogs;
    
    const lowercaseQuery = query.toLowerCase();
    return blogs.filter(blog => 
      blog.title.toLowerCase().includes(lowercaseQuery) || 
      blog.content.toLowerCase().includes(lowercaseQuery) ||
      blog.summary.toLowerCase().includes(lowercaseQuery)
    );
  };
  
  // Authentication (simple mock)
  const login = (username, password) => {
    // In a real app, this would verify credentials with a backend
    if (username && password) {
      setUserInfo({
        username,
        name: username.charAt(0).toUpperCase() + username.slice(1),
        isAuthenticated: true
      });
      return true;
    }
    return false;
  };
  
  const logout = () => {
    setUserInfo(null);
  };
  
  const value = {
    blogs,
    countries,
    loading,
    error,
    userInfo,
    getBlogById,
    addComment,
    toggleLike,
    searchBlogs,
    login,
    logout
  };
  
  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
};