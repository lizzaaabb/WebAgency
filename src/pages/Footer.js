import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-glow"></div>
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="brand-header">
              <h1 className="brand-title">APOLLO</h1>
              <span className="brand-subtitle">CREATIONS</span>
            </div>
            <p className="brand-essence">
              Crafting digital masterpieces that transcend ordinary experiences
            </p>
            <div className="brand-location">
              <span className="location-dot"></span>
              <span>Tbilisi, Georgia</span>
            </div>
          </div>

          <div className="footer-services">
            <h3 className="section-heading">Expertise</h3>
            <div className="services-grid">
              <div className="service-item">
                <span className="service-number">01</span>
                <span className="service-name">Luxury Web Design</span>
              </div>
              <div className="service-item">
                <span className="service-number">02</span>
                <span className="service-name">Premium Development</span>
              </div>
              <div className="service-item">
                <span className="service-number">03</span>
                <span className="service-name">Brand Experience</span>
              </div>
              <div className="service-item">
                <span className="service-number">04</span>
                <span className="service-name">Digital Innovation</span>
              </div>
            </div>
          </div>

          <div className="footer-connect">
            <h3 className="section-heading">Connect</h3>
            <div className="contact-luxury">
              <div className="contact-method">
                <div className="contact-label">Direct Line</div>
                <a href="tel:+995574065469" className="contact-value">
                  +995 574 06 54 69
                </a>
              </div>
              <div className="contact-method">
                <div className="contact-label">Inquiries</div>
                <a href="mailto:business@apollocreations.net" className="contact-value">
                  Business@apollocreations.net
                </a>
              </div>
            </div>
            <div className="social-luxury">
              <a href="#" className="social-item">Behance</a>
              <a href="#" className="social-item">Dribbble</a>
              <a href="#" className="social-item">LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="footer-philosophy">
          <div className="philosophy-content2">
            <blockquote className="philosophy-quote">
              "We don't just build websites. We architect digital experiences that elevate brands into timeless works of art."
            </blockquote>
            <div className="philosophy-signature">— Apollo Creations</div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-credits">
            <span className="copyright">© MMXXIV Apollo Creations</span>
            <div className="legal-links">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;