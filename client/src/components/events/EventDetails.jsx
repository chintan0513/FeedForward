import React from "react";
import { useParams } from "react-router-dom";

function EventDetails() {
  const { eventId } = useParams();

  // Fetch event details using eventId and display them

  return (
    <div>
      <h2>Event Details</h2>
      <p>Event ID: {eventId}</p>
      {/* Add more details as per your event schema */}
    </div>
  );
}

export default EventDetails;
