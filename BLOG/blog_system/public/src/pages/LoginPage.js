import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlogContext } from '../context/BlogContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login, userInfo } = useBlogContext();
  const navigate = useNavigate();
  
  // Redirect if user is already logged in
  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { username, password } = formData;

    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const success = await login(username, password);
      if (success) {
        navigate('/');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <main className="container mx-auto px-4 py-12 flex justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Username"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
