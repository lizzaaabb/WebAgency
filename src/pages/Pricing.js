import React from 'react';
import '../styles/Pricing.css';
import Footer from './Footer';
import ContactForm from './ContactForm';

function Pricing() {
  const handleHomeClick = () => {
    // Method 1: Try immediate scroll to top, then navigate
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Use the global navigation function you set up
    if (window.navigateTo) {
      window.navigateTo('home');
    }
    
    // Method 2: Also try scrolling after navigation with longer delay
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
    
    // Method 3: Try without smooth behavior as backup
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 800);
  };

  return (
    <div className="pricing-body" style={{backgroundImage: "url('/static/media/gradient.7cb3cfd8a251da9e8935.png')", backgroundSize: "cover", backgroundPosition: "center center", backgroundColor: "rgb(16, 16, 16)", width: "100%", minHeight: "100vh"}}>
      <div className="home-button-container">
        {/* Option 1: Using onClick handler */}
        <button 
          onClick={handleHomeClick} 
          className="home-button" 
          style={{
            textDecoration: "none", 
            color: "inherit",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "inherit",
            fontFamily: "inherit"
          }}
        >
          Home
        </button>
        
        {/* Option 2: If you prefer to keep it as a link, use onClick to prevent default */}
        {/* 
        <a 
          href="#home" 
          className="home-button" 
          style={{textDecoration: "none", color: "inherit"}}
          onClick={(e) => {
            e.preventDefault();
            handleHomeClick();
          }}
        >
          Home
        </a>
        */}
      </div>
      
      <div className="pricing-page-container">
        <header className="pricing-header">
          <div className="pricing-header-content">
            <h1 className="pricing-title-main">PRICING</h1>
            <h2 className="pricing-subtitle-secondary">TRANSPARENT &amp; FAIR</h2>
            <p className="pricing-tagline">Premium digital solutions tailored to your vision and budget</p>
          </div>
        </header>

        <section className="pricing-section intro-section">
          <div className="intro-text-container">
            <h3 className="section-title">INVESTMENT</h3>
            <h2 className="section-subtitle">IN YOUR DIGITAL FUTURE</h2>
            <p className="intro-description">
              Our pricing reflects the premium quality and meticulous attention to detail we bring to every project. 
              Choose from our comprehensive range of digital solutions, each crafted to deliver exceptional value and lasting impact.
            </p>
          </div>
          <div className="scroll-indicator">
            <p className="scroll-text">EXPLORE OUR SERVICES</p>
            <div className="scroll-arrow"></div>
          </div>
        </section>

        <section className="pricing-section services-section">
          <h3 className="section-title">OUR SERVICES</h3>
          <div className="pricing-grid">
            
            <div className="pricing-card">
              <h4 className="service-title">Corporate &amp; Business Websites</h4>
              <p className="service-description">
                Showcase your company's services, team, and projects with clean, modern pages. Mostly React front-end only.
              </p>
              <div className="pricing-details">
                <div className="price-tier">
                  <span className="tier-label">Front-end:</span>
                  <span className="price-range">$500 – $1,200</span>
                </div>
                <div className="price-tier">
                  <span className="tier-label">Backend (if needed):</span>
                  <span className="price-range">$800 – $1,500</span>
                </div>
              </div>
            </div>

            <div className="pricing-card featured">
              <h4 className="service-title">E-Commerce Stores</h4>
              <p className="service-description">
                Online shops with product catalogs, shopping carts, and payment checkout. React front-end + Node.js backend for payments and order management.
              </p>
              <div className="pricing-details">
                <div className="price-tier">
                  <span className="tier-label">Front-end:</span>
                  <span className="price-range">$1,500 – $2,500</span>
                </div>
                <div className="price-tier">
                  <span className="tier-label">Backend:</span>
                  <span className="price-range">$2,000 – $3,500</span>
                </div>
              </div>
            </div>

            <div className="pricing-card">
              <h4 className="service-title">Tourism &amp; Travel Websites</h4>
              <p className="service-description">
                Beautiful, multilingual sites promoting destinations, tours, and bookings. React front-end + backend if bookings or user accounts are needed.
              </p>
              <div className="pricing-details">
                <div className="price-tier">
                  <span className="tier-label">Front-end:</span>
                  <span className="price-range">$1,000 – $2,000</span>
                </div>
                <div className="price-tier">
                  <span className="tier-label">Backend (if needed):</span>
                  <span className="price-range">$1,500 – $3,000</span>
                </div>
              </div>
            </div>

            <div className="pricing-card">
              <h4 className="service-title">Villas, Rentals &amp; Booking Platforms</h4>
              <p className="service-description">
                Property listings with calendar availability and online booking. React front-end + backend for real-time booking management.
              </p>
              <div className="pricing-details">
                <div className="price-tier">
                  <span className="tier-label">Front-end:</span>
                  <span className="price-range">$1,200 – $2,500</span>
                </div>
                <div className="price-tier">
                  <span className="tier-label">Backend:</span>
                  <span className="price-range">$1,800 – $3,500</span>
                </div>
              </div>
            </div>

            <div className="pricing-card">
              <h4 className="service-title">Single-Page Applications (SPA)</h4>
              <p className="service-description">
                Fast, focused apps for lead capture, event signups, or promotions. Mostly React front-end, backend optional for processing.
              </p>
              <div className="pricing-details">
                <div className="price-tier">
                  <span className="tier-label">Front-end:</span>
                  <span className="price-range">$800 – $1,800</span>
                </div>
                <div className="price-tier">
                  <span className="tier-label">Backend (optional):</span>
                  <span className="price-range">$1,000 – $2,000</span>
                </div>
              </div>
            </div>

            <div className="pricing-card">
              <h4 className="service-title">Portfolio &amp; Personal Branding Sites</h4>
              <p className="service-description">
                Stylish sites to showcase your work or resume. Pure React front-end.
              </p>
              <div className="pricing-details">
                <div className="price-tier">
                  <span className="tier-label">Front-end only:</span>
                  <span className="price-range">$400 – $900</span>
                </div>
              </div>
            </div>

            <div className="pricing-card">
              <h4 className="service-title">Marketing Websites for SaaS &amp; Software</h4>
              <p className="service-description">
                Landing pages highlighting features, pricing, and benefits. React front-end only.
              </p>
              <div className="pricing-details">
                <div className="price-tier">
                  <span className="tier-label">Front-end only:</span>
                  <span className="price-range">$600 – $1,500</span>
                </div>
              </div>
            </div>

            <div className="pricing-card">
              <h4 className="service-title">Event &amp; Conference Websites</h4>
              <p className="service-description">
                Event details, schedules, speaker info, and registration forms. React front-end + optional backend for registration management.
              </p>
              <div className="pricing-details">
                <div className="price-tier">
                  <span className="tier-label">Front-end:</span>
                  <span className="price-range">$900 – $1,800</span>
                </div>
                <div className="price-tier">
                  <span className="tier-label">Backend (optional):</span>
                  <span className="price-range">$1,200 – $2,500</span>
                </div>
              </div>
            </div>

            <div className="pricing-card">
              <h4 className="service-title">Real Estate Listing Websites</h4>
              <p className="service-description">
                Searchable property listings with filters and contact forms. React front-end + backend if user accounts or saved searches are needed.
              </p>
              <div className="pricing-details">
                <div className="price-tier">
                  <span className="tier-label">Front-end:</span>
                  <span className="price-range">$1,000 – $2,000</span>
                </div>
                <div className="price-tier">
                  <span className="tier-label">Backend (if needed):</span>
                  <span className="price-range">$1,500 – $3,000</span>
                </div>
              </div>
            </div>

            <div className="pricing-card">
              <h4 className="service-title">Multi-language &amp; International Websites</h4>
              <p className="service-description">
                Sites available in multiple languages for global audiences. React front-end with multilingual support; backend optional.
              </p>
              <div className="pricing-details">
                <div className="price-tier">
                  <span className="tier-label">Front-end:</span>
                  <span className="price-range">$800 – $1,800</span>
                </div>
                <div className="price-tier">
                  <span className="tier-label">Backend (optional):</span>
                  <span className="price-range">$1,000 – $2,000</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        <section className="pricing-section process-section">
          <h3 className="section-title">OUR PROCESS</h3>
          <div className="process-content">
            <div className="process-text">
              <div className="process-item">
                <h4 className="process-heading">Discovery &amp; Strategy</h4>
                <p className="process-description">
                  We begin by understanding your vision, goals, and target audience to craft a tailored digital strategy that aligns with your brand's essence.
                </p>
              </div>
              <div className="process-item">
                <h4 className="process-heading">Design &amp; Development</h4>
                <p className="process-description">
                  Our team brings your vision to life with meticulous attention to detail, ensuring every element serves both form and function.
                </p>
              </div>
              <div className="process-item">
                <h4 className="process-heading">Launch &amp; Support</h4>
                <p className="process-description">
                  We ensure a seamless launch and provide ongoing support to keep your digital presence performing at its peak.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="pricing-section cta-section">
          <div className="cta-content">
            <h3 className="cta-heading">Ready to discuss your project?</h3>
            <p className="cta-subheading">Let's create something extraordinary together.</p>
            <div className="contact-container">
              <ContactForm />
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default Pricing;