import React, { useState } from "react";
import axios from "axios";
import "../css/Admin.css";

export default function Admin() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    type: "",
    charges: "",
    slots: "",
    description: "",
    image: ""
  });
  const [grounds, setGrounds] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/ground/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      setSuccess("Ground created successfully!");
      setError("");
      setGrounds([...grounds, response.data]);
      setFormData({
        name: "",
        location: "",
        type: "",
        charges: "",
        slots: "",
        description: "",
        image: ""
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create ground");
      setSuccess("");
    }
  };

  const deleteGround = async (id) => {
    if (!window.confirm("Are you sure you want to delete this ground?")) return;
    
    try {
      await axios.delete(`http://localhost:5000/ground/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setGrounds(grounds.filter(g => g._id !== id));
      setSuccess("Ground deleted successfully!");
    } catch (err) {
      setError("Failed to delete ground");
    }
  };

  return (
    <div className="admin-page">
      <h1>Ground Management</h1>
      
      <div className="admin-container">
        <div className="create-ground">
          <h2>Create New Ground</h2>
          
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Sport Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="">Select Type</option>
                <option value="Football">Football</option>
                <option value="Cricket">Cricket</option>
                <option value="Basketball">Basketball</option>
                <option value="Tennis">Tennis</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Hourly Charges ($)</label>
              <input
                type="number"
                name="charges"
                value={formData.charges}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Available Slots (comma separated)</label>
              <input
                type="text"
                name="slots"
                value={formData.slots}
                onChange={handleChange}
                placeholder="e.g. 9:00,10:00,11:00"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
              />
            </div>
            
            <div className="form-group">
              <label>Image URL</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <button type="submit" className="submit-button">Create Ground</button>
          </form>
        </div>
        
        <div className="grounds-list">
          <h2>Existing Grounds</h2>
          
          {grounds.length === 0 ? (
            <p>No grounds created yet.</p>
          ) : (
            <div className="grounds-grid">
              {grounds.map(ground => (
                <div key={ground._id} className="ground-card">
                  <img src={ground.image} alt={ground.name} />
                  <div className="ground-info">
                    <h3>{ground.name}</h3>
                    <p>{ground.location}</p>
                    <p>{ground.type}</p>
                    <p>${ground.charges}/hour</p>
                    <button 
                      onClick={() => deleteGround(ground._id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}