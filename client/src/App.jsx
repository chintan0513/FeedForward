import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VolunteerRegistration from "./components/volunteer/VolunteerRegistration";

import { ToastContainer } from "react-toastify";

import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Signin from "./components/userauth/Signin";
import Signup from "./components/userauth/Signup";
import About from "./components/about/About";
import ForgetPassword from "./components/userauth/ForgetPassword";
import FoodDonationForm from "./components/foodDonationForm/FoodDonationForm";
import EventCard from "./components/events/EventCard";
import EventDetails from "./components/events/EventDetails";
import Blogs from "./components/Blogs/Blogs";
import News from "./components/about/News";
import Profile from "./components/userauth/Profile";
import ForgetPasswordForm from "./components/userauth/ForgetPasswordForm";
import ProductList from "./components/product/ProductList";
import AddProductForm from "./components/product/AddProductForm";
import FoodItem from "./components/foodDonationForm/FoodItem";
import AvailableDonations from "./components/foodDonationForm/AvailableDonation";
import BlogDetail from "./components/Blogs/BlogDetail";
import MapPage from "./components/Map/MapPage";
import DonationOrder from "./components/foodDonationForm/DonationOrder";

function App() {
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
          <Route path="/event/:eventId" element={<EventDetails />} />
          <Route path="/news" element={<News />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route
            path="/reset-password/:token"
            element={<ForgetPasswordForm />}
          />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />{" "}
          {/* Route for blog detail */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/add-product" element={<AddProductForm />} />
          {/* <Route path="/donate" element={<FoodItem />} /> */}
          <Route
            path="/volunteer-registration"
            element={<VolunteerRegistration />}
          />
          <Route path="/donate" element={<FoodDonationForm />} />
          <Route path="/available-donations" element={<AvailableDonations />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/donation-order" element={<DonationOrder />} />
        </Routes>
      </Router>

      <ToastContainer />
    </div>
  );
}
export default App;
