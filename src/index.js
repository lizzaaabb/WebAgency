import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import About from './pages/About';
import Pricing from './pages/Pricing';
import ContactUs from './pages/ContactUs';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Make setCurrentPage available globally so Header can use it
  window.navigateTo = setCurrentPage;

  const renderCurrentPage = () => {
    switch(currentPage) {
      case 'about':
        return <About />;
      case 'pricing': 
        return <Pricing />;
      case 'contact':
        return <ContactUs />;
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