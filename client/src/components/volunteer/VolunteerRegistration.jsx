import React, { useState, useEffect } from 'react';
import axios from 'axios';
import backgroundImage from '../../assets/background-image.jpg';
import './VolunteerRegistration.css';

const VolunteerRegistration = () => {
    const [formData, setFormData] = useState({
        name: '',
        skills: '',
        volunteerType: '',
        event: '',
        availability: '',
    });
    const [message, setMessage] = useState('');
    const [events, setEvents] = useState([]);
    const [showEventDropdown, setShowEventDropdown] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            const eventList = [
                'Food Drive',
                'Charity Gala',
                'Community Cleanup',
                'Fundraising Event',
            ];
            setEvents(eventList);
        };

        fetchEvents();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));

        if (name === 'volunteerType') {
            setShowEventDropdown(value === 'Event Volunteer');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/volunteers', formData);
            if (response.status === 201) {
                setMessage('Thanks for volunteering, form submitted.');
                setFormData({
                    name: '',
                    skills: '',
                    volunteerType: '',
                    event: '',
                    availability: '',
                });
                setShowEventDropdown(false);
            }
        } catch (error) {
            console.error('There was an error submitting the form!', error);
        }
    };

    return (
        <div className="background-container">
            <form onSubmit={handleSubmit} className="form-container">
                <h2 className="form-heading text-2xl mb-4">Volunteer Registration</h2>
                <div className="mb-4">
                    <label className="block text-black-700">Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-field" required />
                </div>
                <div className="mb-4">
                    <label className="block text-black-700">Skills</label>
                    <input type="text" name="skills" value={formData.skills} onChange={handleChange} className="input-field" required />
                </div>
                <div className="mb-4">
                    <label className="block text-black-700">Volunteer Type</label>
                    <select name="volunteerType" value={formData.volunteerType} onChange={handleChange} className="input-field" required>
                        <option value="">Select Volunteer Type</option>
                        <option value="Event Volunteer">Event Volunteer</option>
                        <option value="Delivery Volunteer">Delivery Volunteer</option>
                    </select>
                </div>
                {showEventDropdown && (
                    <div className="mb-4">
                        <label className="block text-gray-700">Event</label>
                        <select name="event" value={formData.event} onChange={handleChange} className="input-field" required>
                            <option value="">Select Event</option>
                            {events.map((event, index) => (
                                <option key={index} value={event}>{event}</option>
                            ))}
                        </select>
                    </div>
                )}
                <div className="mb-4">
                    <label className="block text-black-700">Availability</label>
                    <input type="datetime-local" name="availability" value={formData.availability} onChange={handleChange} className="input-field" required />
                </div>
                <button type="submit" className="submit-button">Submit</button>
                {message && <p className="message">{message}</p>}
            </form>
        </div>
    );
};

export default VolunteerRegistration;
