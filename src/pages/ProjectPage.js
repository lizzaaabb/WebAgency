import React, { useState, useEffect } from 'react';
import '../styles/projectPage.css';

function ProjectPage() {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const API_BASE_URL = "https://apollo-back.onrender.com";

  useEffect(() => {
    const getProjectIdFromHash = () => {
      const hash = window.location.hash;
      const match = hash.match(/project\/([^/]+)/);
      return match ? match[1] : null;
    };

    const fetchProject = async () => {
      const projectId = getProjectIdFromHash();
      
      if (!projectId) {
        setError("No project ID found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/projects/${projectId}`);
        
        if (!res.ok) {
          throw new Error(`Failed to fetch project: ${res.status}`);
        }
        
        const data = await res.json();
        console.log("Fetched project data:", data);
        
        const projectData = data.project || data;
        console.log("Project data:", projectData);
        console.log("Additional pictures:", projectData.additionalPicturesUrls);
        console.log("Video URL:", projectData.videoUrl);
        
        setProject(projectData);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, []);

  const handleBack = () => {
    window.location.hash = 'projects';
    window.scrollTo(0, 0);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
  };

  const handleVisitWebsite = () => {
    if (project?.websiteLink) {
      window.open(project.websiteLink, '_blank', 'noopener,noreferrer');
    }
  };

  const nextImage = () => {
    if (allImages && allImages.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === allImages.length - 1 ? 0 : prev + 1
      );
      setImageError(false);
    }
  };

  const prevImage = () => {
    if (allImages && allImages.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? allImages.length - 1 : prev - 1
      );
      setImageError(false);
    }
  };

  const handleImageError = () => {
    console.error("Image failed to load:", allImages[currentImageIndex]);
    setImageError(true);
  };

  if (loading) {
    return (
      <div className="project-page-loading">
        <div className="loading-content">
          <div className="spinner"></div>
          <p>Loading project...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="project-page-error">
        <div className="error-content">
          <p className="error-message">Failed to load project</p>
          <button onClick={handleBack} className="back-button-error">
            ← Back to Projects
          </button>
        </div>
      </div>
    );
  }

  // Extract URLs from the objects
  const additionalPicsData = project.additionalPicturesUrls || 
                              project.additionalPictures || 
                              project.pictures || 
                              [];
  
  // Check if it's an array of objects or array of strings
  const allImages = additionalPicsData.map(item => {
    if (typeof item === 'string') {
      return item;
    }
    return item.url || item;
  }).filter(Boolean);
  
  // Handle video URL - could be object or string
  const videoData = project.videoUrl || project.video || null;
  const videoUrl = typeof videoData === 'object' && videoData !== null 
                   ? videoData.url 
                   : videoData;

  console.log("Rendering with images:", allImages);
  console.log("Current image index:", currentImageIndex);
  console.log("Current image URL:", allImages[currentImageIndex]);
  console.log("Rendering with video:", videoUrl);

  return (
    <div className="project-page-wrapper">
      {/* Navigation Bar */}
      <nav className="project-nav">
        <div className="nav-container">
          <button onClick={handleBack} className="nav-back-button">
            <span className="back-arrow">←</span>
            <span>Back</span>
          </button>
          <button onClick={handleVisitWebsite} className="nav-visit-button">
            Visit Live Site →
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="project-hero-section">
        <div className="project-hero-container">
          <div className="project-hero-title">
            <h1>{project.projectName}</h1>
            <div className="title-underline"></div>
          </div>

          {/* Main Image */}
          <div className="project-main-image-wrapper">
            <img 
              src={project.mainPictureUrl}
              alt={project.projectName}
              className="project-main-image"
              onError={(e) => {
                console.error("Main image failed to load:", project.mainPictureUrl);
                e.target.style.display = 'none';
              }}
            />
            <div className="image-overlay"></div>
          </div>

          {/* Description Section */}
          {project.description && (
            <div className="project-description-section">
              <div className="description-content">
                <h2 className="description-title">About This Project</h2>
                <div className="description-divider"></div>
                <p className="description-text">{project.description}</p>
              </div>
            </div>
          )}

          {/* Gallery Section */}
          {allImages && allImages.length > 0 && (
            <div className="project-gallery-section">
              <h2 className="gallery-title">Project Gallery</h2>
              <div className="gallery-divider"></div>
              
              <div className="gallery-slider">
                <button 
                  onClick={prevImage} 
                  className="slider-button slider-prev"
                  aria-label="Previous image"
                >
                  ‹
                </button>
                
                <div className="gallery-image-container">
                  {imageError ? (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      color: 'white',
                      flexDirection: 'column',
                      gap: '10px'
                    }}>
                      <p>Failed to load image</p>
                      <p style={{fontSize: '12px', opacity: 0.6}}>
                        {allImages[currentImageIndex]}
                      </p>
                    </div>
                  ) : (
                    <img 
                      src={allImages[currentImageIndex]}
                      alt={`${project.projectName} - Image ${currentImageIndex + 1}`}
                      className="gallery-image"
                      onError={handleImageError}
                      onLoad={() => console.log("Image loaded successfully:", allImages[currentImageIndex])}
                    />
                  )}
                </div>
                
                <button 
                  onClick={nextImage} 
                  className="slider-button slider-next"
                  aria-label="Next image"
                >
                  ›
                </button>
              </div>

              <div className="gallery-dots">
                {allImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setImageError(false);
                    }}
                    className={`gallery-dot ${index === currentImageIndex ? 'active' : ''}`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>

              <div className="gallery-counter">
                {currentImageIndex + 1} / {allImages.length}
              </div>
              
              {/* Debug info */}
              <div style={{
                textAlign: 'center', 
                marginTop: '20px', 
                fontSize: '12px', 
                color: 'rgba(255,255,255,0.4)',
                wordBreak: 'break-all'
              }}>
              
              </div>
            </div>
          )}

          {/* Video Section */}
          {videoUrl && (
            <div className="project-video-section">
              <h2 className="video-title">Project Showcase</h2>
              <div className="video-divider"></div>
              <div className="video-container">
                <video 
                  controls 
                  className="project-video"
                  poster={project.mainPictureUrl}
                  onError={(e) => {
                    console.error("Video failed to load:", videoUrl);
                  }}
                >
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              {/* Debug info */}
              <div style={{
                textAlign: 'center', 
                marginTop: '10px', 
                fontSize: '12px', 
                color: 'rgba(255,255,255,0.4)',
                wordBreak: 'break-all'
              }}>
               
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="project-cta-section">
            <div className="cta-content">
              <h2 className="cta-title">Ready to See It Live?</h2>
              <p className="cta-subtitle">Experience the full project in action</p>
              <button onClick={handleVisitWebsite} className="cta-button">
                Visit Website
              </button>
            </div>
          </div>

          {/* Back to Projects */}
          <div className="back-to-projects">
            <button onClick={handleBack} className="back-projects-button">
              ← Back to All Projects
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;