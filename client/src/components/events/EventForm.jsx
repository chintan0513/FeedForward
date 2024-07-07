import React, { useState } from 'react';
import axios from 'axios';

function EventForm({ addEvent, toggleEventForm }) {
  const [title, setTitle] = useState('');
  const [photo, setPhoto] = useState(null);
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [info, setInfo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('photo', photo);
    formData.append('address', address);
    formData.append('date', date);
    formData.append('info', info);

    try {
      const response = await axios.post('http://localhost:8000/api/event/list', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Event posted successfully:', response.data);
      addEvent(response.data);
      setTitle('');
      setPhoto(null);
      setAddress('');
      setDate('');
      setInfo('');
      toggleEventForm(); // Close the form after successful submission
    } catch (error) {
      console.error('Error posting event:', error);
    }
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-lg">
        <button
          onClick={toggleEventForm}
          className="absolute top-4 px-52 top-16 left-1/2 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Post an Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Event Image</label>
          <input
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])} // Capture file from input
            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Info</label>
          <textarea
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            required
          ></textarea>
        </div>
        <button type="submit" className="mt-4 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300">
          Post Event
        </button>
      </form> 
      </div>
    </div>
  );
}

export default EventForm;

