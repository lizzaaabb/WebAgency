import React from 'react';
import '../styles/Whatsapp.css';

const logo = process.env.PUBLIC_URL + '/whatsapp2.png';

function Whatsapp() {
  const handleWhatsAppClick = () => {
    // Replace with your WhatsApp number (format: country code + number, no + or spaces)
    const phoneNumber = '995574065469'; // Example: '995555123456'
    const message = 'Hello! I would like to inquire about your services.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div>
      <img 
        src={logo} 
        alt="Contact us on WhatsApp" 
        className='w-logo'
        onClick={handleWhatsAppClick}
      />
    </div>
  );
}

export default Whatsapp;