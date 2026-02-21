import React, { useState, useEffect, useMemo } from 'react';
import '../styles/ProjectsPage.css';
import Footer from '../pages/Footer';

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = "https://apollo-back.onrender.com";

  const handleHomeClick = () => {
    window.location.hash = 'home';
    window.scrollTo(0, 0);
  };

  const handleContactClick = () => {
    window.location.hash = 'contact';
    window.scrollTo(0, 0);
  };

  const handleProjectClick = (projectId) => {
    window.location.hash = `project/${projectId}`;
    window.scrollTo(0, 0);
  };

  const handleViewLive = (e, websiteLink) => {
    e.stopPropagation();
    if (websiteLink) {
      window.open(websiteLink, '_blank', 'noopener,noreferrer');
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null); // Clear previous errors
        
        // Check cache first
        const cachedData = sessionStorage.getItem('projects_cache');
        const cacheTimestamp = sessionStorage.getItem('projects_cache_time');
        const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
        
        if (cachedData && cacheTimestamp) {
          const age = Date.now() - parseInt(cacheTimestamp);
          if (age < CACHE_DURATION) {
            try {
              const parsedData = JSON.parse(cachedData);
              setProjects(parsedData);
              setLoading(false);
              return;
            } catch (parseError) {
              // If cache is corrupted, clear it and fetch fresh
              sessionStorage.removeItem('projects_cache');
              sessionStorage.removeItem('projects_cache_time');
            }
          }
        }

        // Fetch with timeout and abort controller
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

        const res = await fetch(`${API_BASE_URL}/projects`, {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        clearTimeout(timeoutId);
        
        if (!res.ok) {
          throw new Error(`Failed to fetch projects: ${res.status}`);
        }
        
        const data = await res.json();
        const projectsData = data.projects || [];
        
        // Only cache successful responses with data
        if (projectsData.length > 0) {
          sessionStorage.setItem('projects_cache', JSON.stringify(projectsData));
          sessionStorage.setItem('projects_cache_time', Date.now().toString());
        }
        
        setProjects(projectsData);
      } catch (err) {
        // Clear cache on error so next attempt fetches fresh
        sessionStorage.removeItem('projects_cache');
        sessionStorage.removeItem('projects_cache_time');
        
        if (err.name === 'AbortError') {
          setError('Request timed out. Please try again.');
        } else {
          console.error("Error fetching projects:", err);
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Memoize truncate function
  const truncateDescription = useMemo(() => {
    return (text, maxLength = 120) => {
      if (!text) return "No description available.";
      if (text.length <= maxLength) return text;
      return text.substring(0, maxLength).trim() + "...";
    };
  }, []);

  // Preload first few images for faster LCP
  useEffect(() => {
    if (projects.length > 0) {
      const preloadImages = projects.slice(0, 3).map(project => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = project.mainPictureUrl;
        return link;
      });
      
      preloadImages.forEach(link => document.head.appendChild(link));
      
      return () => {
        preloadImages.forEach(link => document.head.removeChild(link));
      };
    }
  }, [projects]);

  return (
    <div className="projects-page-body">
      {/* Home Button */}
      <div className="home-button-container">
        <button 
          onClick={handleHomeClick} 
          className="home-button"
        >
          Home
        </button>
      </div>

      {/* Main Container */}
      <div className="projects-page-container">
        {/* Header */}
        <header className="projects-header">
          <div className="projects-header-content">
            <h1 className="projects-title-main">OUR PROJECTS</h1>
            <h2 className="projects-subtitle-secondary">CRAFTED WITH PASSION</h2>
            <p className="projects-tagline">
              Explore our complete portfolio of digital experiences and creative solutions
            </p>
          </div>
        </header>

        {/* Projects Section */}
        <section className="projects-section">
          <div className="projects-intro">
            <h3 className="section-title">PORTFOLIO</h3>
            <h2 className="section-subtitle">OUR CREATIVE JOURNEY</h2>
            <p className="intro-description">
              Each project represents a unique collaboration, bringing visions to life through 
              innovative design and cutting-edge technology.
            </p>
          </div>

          {/* Skeleton Loading State */}
          {loading && (
            <div className="projects-grid">
              {[...Array(6)].map((_, index) => (
                <article 
                  key={index} 
                  className={`project-card skeleton-card ${index === 0 ? 'featured' : ''}`}
                >
                  <div className="project-image-wrapper skeleton-image-wrapper">
                    <div className="skeleton-image"></div>
                  </div>
                  <div className="project-info">
                    <div className="skeleton-project-title"></div>
                    <div className="skeleton-project-description">
                      <div className="skeleton-text-line"></div>
                      <div className="skeleton-text-line"></div>
                      <div className="skeleton-text-line skeleton-text-short"></div>
                    </div>
                    <div className="skeleton-project-link"></div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="projects-error">
              <p>Failed to load projects. Please try again later.</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && projects.length === 0 && (
            <div className="projects-empty">
              <p>No projects available yet.</p>
            </div>
          )}

          {/* Projects Grid */}
          {!loading && !error && projects.length > 0 && (
            <div className="projects-grid">
              {projects.map((project, index) => (
                <article 
                  key={project._id} 
                  className={`project-card ${index === 0 ? 'featured' : ''}`}
                  onClick={() => handleProjectClick(project._id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="project-image-wrapper">
                    <img 
                      src={project.mainPictureUrl} 
                      alt={project.projectName}
                      loading={index < 3 ? "eager" : "lazy"}
                      decoding={index < 3 ? "sync" : "async"}
                      fetchpriority={index === 0 ? "high" : "auto"}
                    />
                    <div className="project-overlay">
                      {project.websiteLink && (
                        <button
                          className="view-project-btn"
                          onClick={(e) => handleViewLive(e, project.websiteLink)}
                        >
                          View Live
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="project-info">
                    <h4 className="project-title">{project.projectName}</h4>
                    <p className="project-description">
                      {truncateDescription(project.description)}
                    </p>
                    <span className="project-link">
                      View Project →
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="projects-cta-section">
          <div className="cta-content">
            <h2 className="cta-heading">READY TO START YOUR PROJECT?</h2>
            <p className="cta-subheading">
              Let's collaborate and bring your vision to life
            </p>
            <button 
              onClick={handleContactClick}
              className="cta-button"
            >
              Get In Touch
            </button>
          </div>
        </section>
      </div>
      <Footer/>
    </div>
  );
}

export default ProjectsPage;