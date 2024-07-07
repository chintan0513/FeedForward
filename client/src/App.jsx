import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Signin from "./components/userauth/Signin";
import Signup from "./components/userauth/Signup";
import About from "./components/about/About";
import ForgetPassword from "./components/userauth/ForgetPassword";
import FoodDonationForm from "./components/foodDonationForm/FoodDonationForm";
import EventCard from "./components/events/EventCard";
// import ProductList from './components/product/ProductList';
// import AddProductForm from './components/product/AddProductForm';
import axios from "axios";
import EventDetails from "./components/events/EventDetails";

function App() {
  // const [events, setEvents] = useState([]);
  // const [showEventForm, setShowEventForm] = useState(false);

  // useEffect(() => {
  //   fetchEvents();
  // }, []);

  // const fetchEvents = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8000/api/event/list");
  //     setEvents(response.data);
  //   } catch (error) {
  //     console.error("Error fetching events:", error);
  //   }
  // };

  // const addEvent = (event) => {
  //   setEvents([...events, event]);
  // };

  // const toggleEventForm = () => {
  //   setShowEventForm(!showEventForm);
  // };

  return (
    <div className="h-screen w-screen overflow-x-hidden flex flex-col justify-start items-center">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/feed" element={<EventCard />} />
          <Route path="/event/:eventId" component={EventDetails} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/donate-food" element={<FoodDonationForm />} />
          {/* <Route path="/products" element={<ProductList />} /> */}
          {/* <Route path="/add-product" element={<AddProductForm />} /> */}
        </Routes>
      </Router>
      {/* <div className="w-full flex flex-wrap justify-center">
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div> */}

      <ToastContainer />
    </div>
  );
}
export default App;
