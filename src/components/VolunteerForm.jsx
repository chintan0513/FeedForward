import React, { useState, useEffect } from 'react';

const VolunteerForm = () => {
  const [volunteers, setVolunteers] = useState(() => {
    const savedVolunteers = localStorage.getItem('volunteers');
    return savedVolunteers ? JSON.parse(savedVolunteers) : [];
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    phone: '',
    availability: '',
    latitude: '',
    longitude: '',
  });

  const [errors, setErrors] = useState({});
  const [location, setLocation] = useState('');

  useEffect(() => {
    localStorage.setItem('volunteers', JSON.stringify(volunteers));
  }, [volunteers]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.role) newErrors.role = 'Role is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.availability)
      newErrors.availability = 'Availability is required';
    if (!formData.latitude || !formData.longitude)
      newErrors.location = 'Location is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`Latitude: ${latitude}, Longitude: ${longitude}`);
          setFormData({ ...formData, latitude, longitude });
        },
        (error) => {
          setLocation('Error fetching location');
        }
      );
    } else {
      setLocation('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setVolunteers([...volunteers, formData]);
      setFormData({
        name: '',
        email: '',
        role: '',
        phone: '',
        availability: '',
        latitude: '',
        longitude: '',
      });
      setLocation('');
    }
  };

  const handleDelete = (email) => {
    const updatedVolunteers = volunteers.filter(
      (volunteer) => volunteer.email !== email
    );
    setVolunteers(updatedVolunteers);
  };

  return (
    <div className="container">
      <h1>Volunteer Management</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <input
            type="text"
            id="role"
            value={formData.role}
            onChange={handleInputChange}
          />
          {errors.role && <span className="error">{errors.role}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="availability">Availability:</label>
          <select
            id="availability"
            value={formData.availability}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            <option value="Weekdays">Weekdays</option>
            <option value="Weekends">Weekends</option>
            <option value="Both">Both</option>
          </select>
          {errors.availability && (
            <span className="error">{errors.availability}</span>
          )}
        </div>
        <div className="form-group">
          <button type="button" onClick={handleGetLocation}>
            Get Location
          </button>
          <span>{location}</span>
          {errors.location && <span className="error">{errors.location}</span>}
        </div>
        <button type="submit">Add Volunteer</button>
      </form>
      <h2>Volunteer List</h2>
      <ul>
        {volunteers.map((volunteer, index) => (
          <li key={index}>
            <span>
              {volunteer.name} - {volunteer.email} - {volunteer.role} -{' '}
              {volunteer.phone} - {volunteer.availability} - Lat:{' '}
              {volunteer.latitude}, Lon: {volunteer.longitude}
            </span>
            <button
              className="delete-btn"
              onClick={() => handleDelete(volunteer.email)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VolunteerForm;
