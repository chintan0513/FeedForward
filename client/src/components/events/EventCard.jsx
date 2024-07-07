import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EventForm from "./EventForm";
import axios from "axios";

function EventCard() {
  const [events, setEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/event/list");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const addEvent = (event) => {
    setEvents([...events, event]);
  };

  const toggleEventForm = () => {
    setShowEventForm(!showEventForm);
  };

  return (
    <div className="flex flex-wrap justify-center">
      {events.map((event, index) => (
        <div
          key={index}
          className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden mx-4 my-4"
        >
          <Link to={`/event/${event.id}`} className="block">
            <img
              src={`http://localhost:8000/${event.photo}`}
              alt="Event"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
              <p className="text-gray-700 mt-2">{event.address}</p>
              <p className="text-gray-700 mt-2">
                {new Date(event.date).toDateString()}
              </p>
            </div>
          </Link>
          <Link to={`/event/${event.id}`}>
            <button className="mt-4 px-7 m-2 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300">
              Info
            </button>
          </Link>
        </div>
      ))}

      <button
        onClick={toggleEventForm}
        className="fixed bottom-8 right-8 px-4 py-2 text-4xl bg-indigo-600 text-white font-semibold rounded-full shadow-md hover:bg-indigo-700 transition duration-300 z-10"
      >
        +
      </button>
      {showEventForm && (
        <EventForm addEvent={addEvent} toggleEventForm={toggleEventForm} />
      )}
    </div>
  );
}

export default EventCard;
