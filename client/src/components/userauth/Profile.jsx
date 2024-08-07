import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [eventRegistrations, setEventRegistrations] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user")); // Assuming user data is stored in localStorage
        const response = await axios.get("http://localhost:8000/api/user", {
          headers: {
            userid: user.id,
            Authorization: `Bearer ${user.token}`,
          },
        });
        setUserData(response.data.data); // Adjust the response structure as per your API
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchEventRegistrations = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get(
          `http://localhost:8000/api/event/registrations`,
          {
            params: { userEmail: user.email }, // Pass user email as a query parameter
            headers: {
              userid: user.id,
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setEventRegistrations(response.data); // Adjust the response structure as per your API
      } catch (error) {
        console.error("Error fetching event registrations:", error);
      }
    };

    fetchUserData();
    fetchEventRegistrations();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex">
      <div className="max-w-lg w-1/2 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-4xl my-10 font-extrabold mb-8 underline underline-offset-8 text-blue-600">
          Profile
        </h2>
        <div className="flex items-center mb-4">
          <FaUser className="text-xl mr-3 text-gray-600" />
          <p className="text-lg">{userData.name}</p>
        </div>
        <div className="flex items-center mb-4">
          <FaEnvelope className="text-xl mr-3 text-gray-600" />
          <p className="text-lg">{userData.email}</p>
        </div>
        <div className="flex items-center mb-4">
          <FaMapMarkerAlt className="text-xl mr-3 text-gray-600" />
          <p className="text-lg">{userData.address}</p>
        </div>
      </div>

      <div className="max-w-lg w-1/2 p-6 bg-white shadow-lg rounded-lg ml-4">
        <h2 className="text-4xl my-10 font-extrabold mb-8 underline underline-offset-8 text-blue-600">
          Past Event Registrations
        </h2>
        {eventRegistrations.length === 0 ? (
          <p>No past event registrations found.</p>
        ) : (
          <ul>
            {eventRegistrations.map((registration) => (
              <li key={registration._id} className="mb-4">
                <h3 className="text-xl font-bold">
                  {registration.eventId.title}
                </h3>
                <p>
                  Date: {new Date(registration.eventDate).toLocaleDateString()}
                </p>
                <p>Email: {registration.userEmail}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;
