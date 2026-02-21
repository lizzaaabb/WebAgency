import React from 'react';
import '../styles/ContactUs.css'; // Assuming you'll save the CSS as Contact.css
import Footer from './Footer'; // Assuming Footer is in the same components directory
import ContactForm from './ContactForm'; // Using existing ContactForm component

function Contact() {
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
    <div className="contactus-body" style={{backgroundImage: "url('/static/media/gradient.7cb3cfd8a251da9e8935.png')", backgroundSize: "cover", backgroundPosition: "center center", backgroundColor: "rgb(16, 16, 16)", width: "100%", minHeight: "100vh"}}>
      <div className="contactus-home-button-container">
        <a 
          href="#home" 
          className="contactus-home-button" 
          style={{
            textDecoration: "none", 
            color: "inherit",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "inherit",
            fontFamily: "inherit"
          }}
          onClick={(e) => {
            e.preventDefault();
            handleHomeClick();
          }}
        >
          Home
        </a>
      </div>
      
      <div className="contactus-page-container">
        <section className="contactus-hero-section">
          <div className="contactus-hero-background">
            <div className="contactus-floating-element contactus-element-1"></div>
            <div className="contactus-floating-element contactus-element-2"></div>
            <div className="contactus-floating-element contactus-element-3"></div>
          </div>
          
          <div className="contactus-hero-content">
            <div className="contactus-hero-text">
              <h1 className="contactus-title-main">LET'S CREATE</h1>
              <h2 className="contactus-subtitle-secondary">SOMETHING AMAZING</h2>
              <p className="contactus-tagline">Transform your vision into a digital masterpiece that captivates and inspires</p>
            </div>
            
            <div className="contactus-contact-display">
              <div className="contactus-contact-row">
                <div className="contactus-contact-item">
                  <div className="contactus-contact-label">Location</div>
                  <div className="contactus-contact-value">Tbilisi, Georgia</div>
                </div>
                <div className="contactus-contact-divider"></div>
                <div className="contactus-contact-item">
                  <div className="contactus-contact-label">Phone</div>
                  <div className="contactus-contact-value">+995 574 06 54 69</div>
                </div>
              </div>
              
              <div className="contactus-contact-row">
                <div className="contactus-contact-item">
                  <div className="contactus-contact-label">Email</div>
                  <div className="contactus-contact-value">Business@apollocreations.net</div>
                </div>
                <div className="contactus-contact-divider"></div>
                <div className="contactus-contact-item">
                  <div className="contactus-contact-label">Follow</div>
                  <div className="contactus-social-links">
                    <a href="https://instagram.com/apollocreations_net" target="_blank" rel="noopener noreferrer" className="contactus-social-link">
                      Instagram
                    </a>
                    <span className="contactus-social-separator">•</span>
                    <a href="https://tiktok.com/@javascriptos" target="_blank" rel="noopener noreferrer" className="contactus-social-link">
                      TikTok
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="contactus-scroll-indicator">
              <div className="contactus-scroll-line"></div>
              <p className="contactus-scroll-text">SCROLL FOR CONTACT FORM</p>
            </div>
          </div>
        </section>

        <section className="contactus-form-section">
          <div className="contactus-form-container">
            <div className="contactus-form-header">
              <h3 className="contactus-form-title">START YOUR PROJECT</h3>
              <div className="contactus-form-line"></div>
              <p className="contactus-form-subtitle">Tell us about your vision and let's bring it to life</p>
            </div>
            
            <div className="contactus-form-wrapper">
              <ContactForm />
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;