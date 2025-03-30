import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-semibold">GlobalBlog</h3>
            <p className="text-gray-400 mt-1">Explore the world through our blogs</p>
          </div>

          <div className="text-center md:text-right">
            <p className="text-gray-400">© {new Date().getFullYear()} GlobalBlog. All rights reserved.</p>
            <p className="text-gray-400 mt-1">Built with React and RestCountries API</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
