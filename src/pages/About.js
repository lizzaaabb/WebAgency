import React from 'react';
import '../styles/About.css';
import Footer from './Footer';

function About() {
  const handleHomeClick = () => {
    // Use the global navigation function you set up
    if (window.navigateTo) {
      window.navigateTo('home');
    }
  };

  const expertiseItems = [
    {
      title: "Luxury Web Design",
      description: "Elevating brands with sophisticated, high-end web aesthetics that command attention and respect."
    },
    {
      title: "Premium Development", 
      description: "Building robust, performant digital solutions with cutting-edge technology and flawless execution."
    },
    {
      title: "Brand Experience",
      description: "Crafting immersive journeys that resonate deeply and leave lasting impressions on discerning audiences."
    },
    {
      title: "Digital Innovation",
      description: "Pioneering new approaches to digital engagement and establishing commanding market presence."
    }
  ];

  const approachItems = [
    "We create digital experiences that move people—where flawless performance meets breathtaking design. Your visitors don't just browse; they're captivated by something truly extraordinary.",
    "Every interaction feels intentional, every moment curated. We design with both heart and precision, creating journeys that feel deeply personal yet undeniably premium.",
    "Refined elegance that commands attention and respect. We craft sophisticated digital presences that don't just impress—they create lasting emotional connections."
  ];

  return (
    <div className="about-body" style={{
      backgroundImage: "url('/static/media/gradient.7cb3cfd8a251da9e8935.png')",
      backgroundSize: "cover",
      backgroundPosition: "center center",
      backgroundColor: "rgb(16, 16, 16)",
      width: "100%",
      minHeight: "100vh"
    }}>
      <div className="home-button-container">
        <a 
          href="#home" 
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
          onClick={(e) => {
            e.preventDefault();
            handleHomeClick();
          }}
        >
          Home
        </a>
      </div>

      <div className="about-page-container">
        <header className="about-header">
          <div className="about-header-content">
            <h1 className="about-title-main">APOLLO</h1>
            <h2 className="about-subtitle-secondary">CREATIONS</h2>
            <p className="about-tagline">
              Crafting digital masterpieces that transcend ordinary experiences
            </p>
          </div>
        </header>

        <section className="about-section intro-section">
          <div className="intro-text-container">
            <h3 className="section-title">WE ARE</h3>
            <h2 className="section-subtitle">A FULL-SERVICE DIGITAL AGENCY</h2>
            <p className="intro-description">
              Shaping the future with cutting-edge technology and breathtaking design. We are a premium full-stack web development agency dedicated to crafting sophisticated digital experiences that elevate brands.
            </p>
          </div>
          <div className="scroll-indicator">
            <p className="scroll-text">SCROLL TO EXPLORE</p>
            <div className="scroll-arrow"></div>
          </div>
        </section>

        <section className="about-section philosophy-section">
          <div className="philosophy-content">
            <h3 className="section-title">OUR PHILOSOPHY</h3>
            <div className="philosophy-container">
              <div className="philosophy-card">
                <h4 className="philosophy-heading">Excellence Through Innovation</h4>
                <p className="philosophy-text">
                  We believe in crafting digital experiences that transcend the ordinary. Every pixel, every interaction, every moment is meticulously designed to reflect authenticity, forge meaningful connections, and push the boundaries of what's possible. We don't just build websites—we create digital symphonies that resonate with your audience's deepest aspirations and elevate your brand to extraordinary heights.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section expertise-section">
          <h3 className="section-title">OUR EXPERTISE</h3>
          <div className="expertise-grid">
            {expertiseItems.map((item, index) => (
              <div key={index} className="expertise-card">
                <h4 className="expertise-title">{item.title}</h4>
                <p className="expertise-description">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="about-section approach-section">
          <h3 className="section-title">OUR APPROACH</h3>
          <div className="approach-content">
            <div className="approach-text">
              {approachItems.map((description, index) => (
                <div key={index} className="approach-item">
                  <p className="approach-description">{description}</p>
                </div>
              ))}
            </div>
            <div className="approach-visual">
              <div className="visual-element"></div>
            </div>
          </div>
        </section>

        <section className="about-section cta-section">
          <div className="cta-content">
            <h3 className="cta-heading">Ready to elevate your digital identity?</h3>
            <p className="cta-subheading">Let's craft your next-level digital presence together.</p>
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
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default About;