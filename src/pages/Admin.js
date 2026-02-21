import React, { useState, useEffect, useCallback } from "react";
import "../styles/Admin.css";

function Admin() {
  // --- State Variables ---
  const [projectName, setProjectName] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [description, setDescription] = useState("");
  const [mainPicture, setMainPicture] = useState(null);
  const [additionalPictures, setAdditionalPictures] = useState([]);
  const [video, setVideo] = useState(null);
  
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({ projects: 0 });

  // Edit mode states
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [keepExistingPictures, setKeepExistingPictures] = useState(true);

  const API_BASE_URL = "https://apollo-back.onrender.com";

  // --- Handlers for Input Changes ---
  const handleMainPictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setMessage("❌ Please select an image file for main picture!");
        return;
      }
      setMainPicture(file);
      setMessage(`✅ Main picture selected: ${file.name}`);
    }
  };

  const handleAdditionalPicturesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const allImages = selectedFiles.every(f => f.type.startsWith('image/'));
    
    if (!allImages) {
      setMessage("❌ Please select only image files!");
      return;
    }
    
    setAdditionalPictures(selectedFiles);
    if (selectedFiles.length > 0) {
      setMessage(`✅ ${selectedFiles.length} additional picture(s) selected`);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('video/')) {
        setMessage("❌ Please select a video file!");
        return;
      }
      if (file.size > 100 * 1024 * 1024) {
        setMessage("❌ Video file is too large! Maximum size is 100MB.");
        return;
      }
      setVideo(file);
      setMessage(`✅ Video selected: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
    }
  };

  // --- Clear Form ---
  const clearForm = () => {
    setProjectName("");
    setWebsiteLink("");
    setDescription("");
    setMainPicture(null);
    setAdditionalPictures([]);
    setVideo(null);
    setMessage("");
    setIsEditMode(false);
    setEditingProjectId(null);
    setKeepExistingPictures(true);
    
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => input.value = '');
  };

  // --- Edit Project ---
  const startEditProject = (project) => {
    setIsEditMode(true);
    setEditingProjectId(project._id);
    setProjectName(project.projectName);
    setWebsiteLink(project.websiteLink);
    setDescription(project.description || "");
    setMessage("✏️ Editing mode - Update the fields you want to change");
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Update Project ---
  const handleUpdate = async () => {
    if (!projectName.trim()) {
      setMessage("❌ Please enter the project name");
      return;
    }
    if (!websiteLink.trim()) {
      setMessage("❌ Please enter the website link");
      return;
    }

    setIsUploading(true);
    setMessage("⏳ Updating project...");
    
    try {
      const formData = new FormData();
      formData.append("projectName", projectName.trim());
      formData.append("websiteLink", websiteLink.trim());
      formData.append("description", description.trim());
      
      if (mainPicture) {
        formData.append("mainPicture", mainPicture);
      }
      
      if (additionalPictures.length > 0) {
        formData.append("keepExistingPictures", keepExistingPictures.toString());
        additionalPictures.forEach(pic => {
          formData.append("pictures", pic);
        });
      }

      const res = await fetch(`${API_BASE_URL}/projects/${editingProjectId}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update project");
      }

      // Upload new video if provided
      if (video) {
        setMessage("⏳ Uploading new video...");
        
        const videoFormData = new FormData();
        videoFormData.append("video", video);

        const videoRes = await fetch(`${API_BASE_URL}/projects/${editingProjectId}/video`, {
          method: "POST",
          body: videoFormData,
        });

        if (!videoRes.ok) {
          const videoData = await videoRes.json();
          console.warn("Video upload failed:", videoData.error);
          setMessage(`⚠️ Project updated but video upload failed: ${videoData.error}`);
        } else {
          setMessage("✅ Project updated successfully with new video!");
        }
      } else {
        setMessage("✅ Project updated successfully!");
      }

      clearForm();
      loadProjects();
      loadStats();

    } catch (err) {
      console.error("Update error:", err);
      setMessage(`❌ Update failed: ${err.message || "Network error"}`);
    } finally {
      setIsUploading(false);
    }
  };

  // --- Upload Project ---
  const handleUpload = async () => {
    if (!projectName.trim()) {
      setMessage("❌ Please enter the project name");
      return;
    }
    if (!websiteLink.trim()) {
      setMessage("❌ Please enter the website link");
      return;
    }
    if (!mainPicture) {
      setMessage("❌ Please select a main picture");
      return;
    }

    setIsUploading(true);
    setMessage("⏳ Uploading project...");
    
    try {
      const formData = new FormData();
      formData.append("projectName", projectName.trim());
      formData.append("websiteLink", websiteLink.trim());
      if (description.trim()) {
        formData.append("description", description.trim());
      }
      formData.append("mainPicture", mainPicture);
      
      additionalPictures.forEach(pic => {
        formData.append("pictures", pic);
      });

      const projectRes = await fetch(`${API_BASE_URL}/projects`, {
        method: "POST",
        body: formData,
      });

      const projectData = await projectRes.json();

      if (!projectRes.ok) {
        throw new Error(projectData.error || "Failed to create project");
      }

      const newProject = projectData.project;

      if (video && newProject._id) {
        setMessage("⏳ Uploading video...");
        
        const videoFormData = new FormData();
        videoFormData.append("video", video);

        const videoRes = await fetch(`${API_BASE_URL}/projects/${newProject._id}/video`, {
          method: "POST",
          body: videoFormData,
        });

        const videoData = await videoRes.json();

        if (!videoRes.ok) {
          console.warn("Video upload failed:", videoData.error);
          setMessage(`⚠️ Project created but video upload failed: ${videoData.error}`);
        } else {
          setMessage("✅ Project created successfully with video!");
        }
      } else {
        setMessage("✅ Project created successfully!");
      }

      setProjects(prevProjects => [newProject, ...prevProjects]);
      clearForm();
      loadProjects();
      loadStats();

    } catch (err) {
      console.error("Upload error:", err);
      setMessage(`❌ Upload failed: ${err.message || "Network error"}`);
    } finally {
      setIsUploading(false);
    }
  };

  // --- Fetching Projects ---
  const loadProjects = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/projects`);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (err) {
      console.error("Error loading projects:", err);
      setProjects([]);
    }
  }, []);

  // --- Fetching Statistics ---
  const loadStats = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/projects`);
      if (res.ok) {
        const data = await res.json();
        setStats({ projects: (data.projects || []).length });
      }
    } catch (err) {
      console.error("Error loading stats:", err);
      setStats({ projects: 0 });
    }
  }, []);

  // --- Deleting a Project ---
  const deleteProject = async (projectId, projectName) => {
    if (!window.confirm(`Are you sure you want to delete "${projectName}"? This will delete all associated images and video.`)) {
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok) {
        setMessage(`✅ "${projectName}" deleted successfully!`);
        setProjects(prevProjects =>
          prevProjects.filter(project => project._id !== projectId)
        );
        loadStats();
      } else {
        setMessage(`❌ Delete failed: ${data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Delete error:", err);
      setMessage("❌ Delete failed: Network error.");
    }
  };

  // --- Effect Hooks ---
  useEffect(() => {
    loadProjects();
    loadStats();
  }, [loadProjects, loadStats]);

  // --- JSX Rendering ---
  return (
    <div className="admin-container">
      <h2 className="admin-title">Apollo Creations - Admin Panel</h2>
      
      {/* Stats Display */}
      <div className="stats-section">
        <h3 className="stats-title">📊 Projects Count:</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <strong>Total Projects:</strong> {stats.projects} project(s)
          </div>
        </div>
      </div>

      {/* Upload/Edit Form */}
      <div className="upload-form">
        <h3 className="form-title">
          {isEditMode ? '✏️ Edit Project' : '📤 Add New Project'}
        </h3>
        
        {isEditMode && (
          <div style={{ 
            background: '#fff3cd', 
            padding: '12px', 
            borderRadius: '8px', 
            marginBottom: '20px',
            border: '1px solid #ffc107'
          }}>
            <p style={{ margin: 0, color: '#856404' }}>
              ✏️ <strong>Editing Mode:</strong> Update only the fields you want to change. 
              Leave file inputs empty to keep existing files.
            </p>
          </div>
        )}
        
        <div className="form-group">
          <label className="form-label">Project Name * :</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            disabled={isUploading}
            className="form-input"
            placeholder="Enter project name"
            maxLength={200}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Website Link * :</label>
          <input
            type="url"
            value={websiteLink}
            onChange={(e) => setWebsiteLink(e.target.value)}
            disabled={isUploading}
            className="form-input"
            placeholder="https://example.com"
            maxLength={500}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description (Optional):</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isUploading}
            className="form-textarea"
            placeholder="Enter project description"
            maxLength={5000}
            style={{ minHeight: '120px' }}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Main Picture {isEditMode ? '(Leave empty to keep current)' : '*'} :
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleMainPictureChange}
            disabled={isUploading}
            className="form-file-input"
          />
          <small style={{ color: '#666', display: 'block', marginTop: '5px' }}>
            📸 This will be the main display image for the project
          </small>
        </div>

        <div className="form-group">
          <label className="form-label">
            Additional Pictures (Optional):
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleAdditionalPicturesChange}
            disabled={isUploading}
            className="form-file-input"
          />
          <small style={{ color: '#666', display: 'block', marginTop: '5px' }}>
            🖼️ You can select multiple images (up to 10)
          </small>
          
          {isEditMode && (
            <div style={{ marginTop: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={keepExistingPictures}
                  onChange={(e) => setKeepExistingPictures(e.target.checked)}
                  style={{ marginRight: '8px' }}
                />
                <span style={{ fontSize: '14px' }}>
                  Keep existing pictures and add new ones
                </span>
              </label>
              <small style={{ color: '#666', display: 'block', marginTop: '5px', marginLeft: '24px' }}>
                Uncheck to replace all existing pictures with new ones
              </small>
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">
            Project Video (Optional):
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            disabled={isUploading}
            className="form-file-input"
          />
          <small style={{ color: '#666', display: 'block', marginTop: '5px' }}>
            🎥 Maximum size: 100MB. Supported formats: MP4, MOV, AVI, MKV, WebM
          </small>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={isEditMode ? handleUpdate : handleUpload}
            disabled={isUploading}
            className={`upload-button ${isUploading ? 'disabled' : ''}`}
          >
            {isUploading 
              ? '⏳ Processing...' 
              : isEditMode 
                ? '✅ Update Project' 
                : '📤 Create Project'}
          </button>
          
          {isEditMode && (
            <button
              onClick={clearForm}
              disabled={isUploading}
              className="cancel-button"
            >
              ❌ Cancel Edit
            </button>
          )}
        </div>

        {message && (
          <p className={`message ${message.includes('✅') ? 'success' : message.includes('⚠️') ? 'warning' : 'error'}`}>
            {message}
          </p>
        )}
      </div>

      {/* Projects List Display */}
      <div className="items-section">
        <h3 className="items-title">
          🖼️ Projects ({projects.length})
        </h3>
        
        {projects.length > 0 ? (
          <div className="items-grid">
            {projects.map((project) => (
              <div key={project._id} className="item-card">
                {project.mainPictureUrl && (
                  <img
                    src={project.mainPictureUrl}
                    alt={project.projectName}
                    className="item-image"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      console.warn(`Failed to load image: ${project.mainPictureUrl}`);
                    }}
                  />
                )}
                
                <div className="item-content">
                  <h4 className="item-title">{project.projectName}</h4>
                  
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                    <p>
                      <strong>🔗 Website:</strong>{' '}
                      <a 
                        href={project.websiteLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: '#0066cc', textDecoration: 'none' }}
                      >
                        {project.websiteLink.length > 40 
                          ? `${project.websiteLink.substring(0, 40)}...` 
                          : project.websiteLink
                        }
                      </a>
                    </p>
                    
                    {project.pictures && project.pictures.length > 0 && (
                      <p><strong>📸 Additional Pictures:</strong> {project.pictures.length}</p>
                    )}
                    
                    {project.videoUrl && (
                      <p><strong>🎥 Video:</strong> Included</p>
                    )}
                    
                    <p>
                      <strong>📅 Created:</strong>{' '}
                      {new Date(project.uploadDate).toLocaleDateString()}
                    </p>
                  </div>
                  
                  {project.description && (
                    <p className="item-description">
                      {project.description.length > 150
                        ? `${project.description.substring(0, 150)}...`
                        : project.description
                      }
                    </p>
                  )}

                  <div style={{ display: 'flex', gap: '10px', marginTop: '15px', alignItems: 'center' }}>
                    <button
                      onClick={() => startEditProject(project)}
                      className="edit-button"
                    >
                      ✏️ Edit
                    </button>
                    
                    <button
                      onClick={() => deleteProject(project._id, project.projectName)}
                      className="delete-button"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-items">
            No projects uploaded yet. Create your first project above!
          </p>
        )}
      </div>
    </div>
  );
}

export default Admin;