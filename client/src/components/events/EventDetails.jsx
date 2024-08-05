import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

function EventDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [eventDate, setEventDate] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/event/${eventId}`);
        setEvent(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching event details:", error);
        setError("Error fetching event details.");
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEvent();
    } else {
      setError("Event ID is undefined.");
      setLoading(false);
    }
  }, [eventId]);

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/event/register", {
        eventId,
        eventDate,
        userEmail,
      });
      setRegistrationSuccess(true);
  
      sendEmailNotification();
  
      toast.success("Registration Successful!");
  
    } catch (error) {
      console.error("Error registering for event:", error);
      setRegistrationSuccess(false);
  
      // Show error toast
      if (error.response && error.response.data.error === "User already registered for this event") {
        toast.error("You are already registered for this event.");
      } else {
        toast.error("Error registering for event. Please try again.");
      }
    }
  };
  

  const sendEmailNotification = async () => {
    try {
      await axios.post("http://localhost:8000/api/event/sendNotification", {
        userEmail,
        eventTitle: event.title,
      });
      console.log("Email notification sent successfully.");
    } catch (error) {
      console.error("Error sending email notification:", error);
      // Optionally handle error (retry logic, show error message, etc.)
    }
  };

  if (loading) {
    return <p className="text-center mt-8">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-8">{error}</p>;
  }

  if (!event) {
    return <p className="text-center mt-8">No event found.</p>;
  }

  return (
    <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
      <Toaster />
      <h2 className="text-4xl text-center font-extrabold mb-8 underline underline-offset-8 text-blue-600">Event Details</h2>
      <div className="flex flex-wrap justify-center gap-8">
        <div className="w-full md:w-1/2 lg:w-1/3">
          <img
            src={`http://localhost:8000/${event.photo}`}
            alt="Event"
            className="rounded-lg shadow-lg w-full h-96 object-cover mb-6"
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col justify-between">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">{event.title}</h3>
            <p className="text-gray-600 mb-2"><strong>Address:</strong> {event.address}</p>
            <p className="text-gray-600 mb-2"><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
            <p className="text-gray-600 mb-6">{event.info}</p>
          </div>
          <form onSubmit={handleRegistration} className="flex flex-col space-y-4">
            <input
              type="date"
              placeholder="Event Date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
              className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
              className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {!registrationSuccess ? (
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300"
              >
                Register for Event
              </button>
            ) : (
              <p className="text-green-500 font-bold">Registration Successful!</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;