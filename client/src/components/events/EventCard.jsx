import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EventForm from "./EventForm";
import axios from "axios";
import { FiPlus } from 'react-icons/fi';
import { LuListFilter } from "react-icons/lu";

function EventCard() {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showEventForm, setShowEventForm] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/event/list");
      setEvents(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    new Date(event.date).toDateString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center w-full p-6 bg-gray-100 min-h-screen">
      <div className="w-full max-w-2xl mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full p-4 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <LuListFilter className="flex relative -top-10 mx-4 text-lg"/>
        </div>
      </div>
      {filteredEvents.length > 0 ? (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredEvents.map((event, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl"
            >
              <Link to={`/event/${event._id}`} className="block">
                <img
                  src={`http://localhost:8000/${event.photo}`}
                  alt="Event"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-900 truncate">{event.title}</h3>
                  <p className="text-gray-700 mt-2">{event.address}</p>
                  <p className="text-gray-500 mt-1">{new Date(event.date).toDateString()}</p>
                </div>
              </Link>
              <div className="p-4 pt-0">
                <Link to={`/event/${event._id}`}>
                  <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                    Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full py-10">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m2 0a2 2 0 00-2-2H9a2 2 0 00-2 2m2-2a2 2 0 110-4 2 2 0 012 2z"></path>
          </svg>
          <h3 className="mt-2 text-xl text-gray-600">No results found.</h3>
          <p className="mt-1 text-gray-500">Try adjusting your search to find what you're looking for.</p>
        </div>
      )}
      <button
        onClick={() => setShowEventForm(true)}
        className="fixed bottom-8 right-8 text-white bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 font-semibold rounded-full p-4 shadow-lg transition duration-300 flex items-center justify-center transform hover:scale-105"
        style={{ width: '60px', height: '60px' }}
      >
        <FiPlus className="text-2xl" />
      </button>
      {showEventForm && (
        <EventForm addEvent={setEvents} toggleEventForm={() => setShowEventForm(false)} />
      )}
    </div>
  );
}

export default EventCard;
