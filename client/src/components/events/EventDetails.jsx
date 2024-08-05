// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// function EventDetails() {
//   const { eventId } = useParams();
//   const [event, setEvent] = useState(null);

//   useEffect(() => {
//     fetchEventDetails();
//   }, []);

//   const fetchEventDetails = async () => {
//     try {
//       const response = await axios.get(`http://localhost:8000/api/event/${eventId}`);
//       setEvent(response.data);
//     } catch (error) {
//       console.error("Error fetching event details:", error);
//     }
//   };

//   if (!event) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
//       <img
//         src={`http://localhost:8000/${event.photo}`}
//         alt="Event"
//         className="w-full h-64 object-cover rounded-md"
//       />
//       <h2 className="text-3xl font-bold text-gray-900 mt-4">{event.title}</h2>
//       <p className="text-gray-700 mt-2">{event.description}</p>
//       <p className="text-gray-700 mt-2"><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
//       <p className="text-gray-700 mt-2"><strong>Location:</strong> {event.address}</p>
//       {/* Add more event details as needed */}
//     </div>
//   );
// }

// export default EventDetails;


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function EventDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetchEventDetails();
  }, []);

  const fetchEventDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/event/${eventId}`);
      setEvent(response.data);
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <img
        src={`http://localhost:8000/${event.photo}`}
        alt="Event"
        className="w-full h-64 object-cover rounded-md"
      />
      <h2 className="text-3xl font-bold text-gray-900 mt-4">{event.title}</h2>
      <p className="text-gray-700 mt-2">{event.description}</p>
      <p className="text-gray-700 mt-2"><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
      <p className="text-gray-700 mt-2"><strong>Location:</strong> {event.address}</p>
      {/* Add more event details as needed */}
    </div>
  );
}

export default EventDetails;
