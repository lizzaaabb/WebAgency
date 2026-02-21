import React from 'react';
import '../styles/ContactForm.css';

function ContactForm() {
  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.navigateTo) {
      window.navigateTo('home');
    }
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 800);
  };

  return (
    <div className="contactus-body2">
     
      
      <div className="contactus-page-container2">
        <section className="contactus-hero-section2">
          <div className="contactus-hero-background2">
            <div className="contactus-floating-element2 contactus-element-12"></div>
            <div className="contactus-floating-element2 contactus-element-22"></div>
            <div className="contactus-floating-element2 contactus-element-32"></div>
          </div>
          
          <div className="contactus-hero-content2">
            <div className="contact-info-grid2">
              <div className="contact-info-item2">
                <div className="contact-info-label2">Phone</div>
                <div className="contact-info-value2">+995 574 06 54 69</div>
                <a href="tel:+995574065469" className="contact-action-button2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  Call Now
                </a>
              </div>
              
              <div className="contact-info-item2">
                <div className="contact-info-label2">Email</div>
                <div className="contact-info-value2">Business@apollocreations.net</div>
                <a href="mailto:Business@apollocreations.net" className="contact-action-button2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  Send Email
                </a>
              </div>
              
              <div className="contact-info-item2">
                <div className="contact-info-label2">Location</div>
                <div className="contact-info-value2">Tbilisi, Georgia</div>
              </div>
              
              <div className="contact-info-item2">
                <div className="contact-info-label2">Follow Us</div>
                <div className="contact-social-links2">
                  <a href="https://instagram.com/apollocreations_net" target="_blank" rel="noopener noreferrer" className="contact-social-link2">
                    Instagram
                  </a>
                  <span className="contact-social-separator2">•</span>
                  <a href="https://tiktok.com/@javascriptos" target="_blank" rel="noopener noreferrer" className="contact-social-link2">
                    TikTok
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ContactForm;