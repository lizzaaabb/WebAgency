import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import About from './pages/About';
import Pricing from './pages/Pricing';
import ContactUs from './pages/ContactUs';
import Admin from './pages/Admin';
import ProjectsPage from './pages/ProjectsPage';
import ProjectPage from './pages/ProjectPage';
import Whatsapp from './pages/Whatsapp';

function App() {
  // Get initial page from URL hash
  const getPageFromHash = () => {
    const hash = window.location.hash.replace('#', '');
    return hash || 'home';
  };

  const [currentPage, setCurrentPage] = useState(getPageFromHash());

  // Update page when hash changes and scroll to top
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getPageFromHash());
      // Scroll to top on every page change
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Make setCurrentPage available globally and update hash
  window.navigateTo = (page) => {
    window.location.hash = page;
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderCurrentPage = () => {
    // Check if it's a project detail page
    if (currentPage.startsWith('project/')) {
      return <ProjectPage />;
    }

    switch(currentPage) {
      case 'about':
        return <About />;
      case 'pricing': 
        return <Pricing />;
      case 'contact':
        return <ContactUs />;
      case 'admin':
        return <Admin />;
      case 'projects':
        return <ProjectsPage />;
      default:
        return <Home />;
    }
  };

  return renderCurrentPage();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);