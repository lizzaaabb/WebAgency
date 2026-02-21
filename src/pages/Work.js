import React, { useState, useEffect } from 'react';
import '../styles/OurWork.css';

function Work() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const API_BASE_URL = "https://apollo-back.onrender.com";
  const MAX_PROJECTS = 6;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        
        // Optimized: Only fetch needed fields with query parameter
        const res = await fetch(`${API_BASE_URL}/projects?limit=${MAX_PROJECTS}&fields=projectName,mainPictureUrl,description,websiteLink`);
        
        if (!res.ok) {
          throw new Error(`Failed to fetch projects: ${res.status}`);
        }
        
        const data = await res.json();
        setProjects(data.projects || []);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const truncateDescription = (text, maxLength = 80) => {
    if (!text) return "No description available.";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  if (loading) {
    return (
      <section className="our-work-body">
        <div className="projects-grid">
          {[...Array(6)].map((_, index) => (
            <article key={index} className="project-card skeleton-card">
              <div className="project-image skeleton-image"></div>
              <div className="project-content">
                <div className="project-header">
                  <div className="skeleton-title"></div>
                  <div className="skeleton-button desktop-button"></div>
                </div>
                <div className="skeleton-text"></div>
                <div className="skeleton-text skeleton-text-short"></div>
                <div className="skeleton-button mobile-button"></div>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="our-work-body">
        <div className="error-container">
          <p>Failed to load projects. Please try again later.</p>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section className="our-work-body">
        <div className="empty-container">
          <p>No projects available yet.</p>
        </div>
      </section>
    );
  }

  // Get only the latest 6 projects
  const displayedProjects = projects.slice(0, 6);
  const hasMoreProjects = projects.length > 6;

  return (
    <section className="our-work-body">
      <div className="projects-grid">
        {displayedProjects.map((project) => (
          <article key={project._id} className="project-card">
            <div className="project-image">
              <img 
                alt={project.projectName} 
                src={project.mainPictureUrl} 
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="project-content">
              <div className="project-header">
                <h3>{project.projectName}</h3>
                <a
                  href={project.websiteLink}
                  className="view-button desktop-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </a>
              </div>
              <p>{truncateDescription(project.description)}</p>
              <a
                href={project.websiteLink}
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
      {hasMoreProjects && (
        <div className="view-more-container">
          <a href="#projects" className="view-more-button">
            View More Projects
          </a>
        </div>
      )}
    </section>
  );
}

export default Work;