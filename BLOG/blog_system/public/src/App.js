import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BlogProvider } from './context/BlogContext';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import BlogDetailPage from './pages/BlogDetailPage';
import SearchResultsPage from './pages/SearchResultsPage';
import CountriesPage from './pages/CountriesPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BlogProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/blog/:id" element={<BlogDetailPage />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="/countries" element={<CountriesPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </BlogProvider>
  );
}

export default App;
