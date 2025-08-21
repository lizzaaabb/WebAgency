import React from 'react';
import '../styles/OurWork.css';

function Work() {
  const content = [
    {
      title: "Utopia VIP Travel",
      image: "/static/media/up1.77ed6e8959de1af3021c.png",
      description: "Luxury visuals, booking CTA, and elegant micro-interactions.",
      link: "https://utopiaviptravel.com/"
    },
    {
      title: "Villa Kallisto",
      image: "/static/media/up2.d20c3e15d1b7a1f99fbf.png",
      description: "Bold typography, portfolio grid, and immersive case studies.",
      link: "#"
    },
    {
      title: "Mas Du Moulin",
      image: "/static/media/up3.87acfde6c5e5b2406025.png",
      description: "Clean UX, data visualization, and responsive interactions.",
      link: "#"
    },
    {
      title: "Digital Banking",
      image: "/static/media/up4.f80cfc1bf9543db8ca55.png",
      description: "Shop flows, fast checkout, and polished product pages.",
      link: "#"
    }
  ];

  return (
    <section className="our-work-body">
      <div className="projects-grid">
        {content.map((project, index) => (
          <article key={index} className="project-card">
            <div className="project-image">
              <img alt={project.title} src={project.image} />
            </div>
            <div className="project-content">
              <div className="project-header">
                <h3>{project.title}</h3>
                <a 
                  href={project.link} 
                  className="view-button desktop-button" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  View
                </a>
              </div>
              <p>{project.description}</p>
              <a 
                href={project.link} 
                className="view-button mobile-button" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                View
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Work;