import React from 'react';
import '../styles/ContactForm.css';

function ContactForm() {
  return (
    <div className="contact-container">
      <form className="contact-form">
        <div className="form-row">
          <div className="input-container">
            <input 
              placeholder="First Name" 
              required 
              type="text" 
              name="firstName" 
            />
          </div>
          <div className="input-container">
            <input 
              placeholder="Last Name" 
              required 
              type="text" 
              name="lastName" 
            />
          </div>
          <div className="input-container">
            <input 
              placeholder="Phone Number" 
              required 
              type="tel" 
              name="phone" 
            />
          </div>
          <div className="input-container">
            <input 
              placeholder="Email" 
              required 
              type="email" 
              name="email" 
            />
          </div>
        </div>
        <div className="form-row">
          <div className="input-container textarea-container">
            <textarea 
              name="websiteDescription" 
              placeholder="Describe your kind of website..." 
              rows="5" 
              required
            />
          </div>
        </div>
        <button type="submit" className="submit-btn">
          Send Message
        </button>
      </form>
    </div>
  );
}

export default ContactForm;