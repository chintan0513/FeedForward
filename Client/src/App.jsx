import React, { useState, useContext } from 'react'
import {
   BrowserRouter as Router, Route, Routes
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';

import Signin from './components/userauth/Signin';
import Signup from './components/userauth/Signup';
import FoodDonationForm from './components/foodDonationForm/FoodDonationForm';
import ForgetPassword from './components/userauth/ForgetPassword';
import ProductList from './components/product/ProductList';
import AddProductForm from './components/product/AddProductForm';
// import FoodItemList from './components/FoodItemList';
// import Dashboard from './components/Dashboard';
// import VolunteerTasks from './components/VolunteerTasks';

function App() {
  
// const { user, setUser } = useContext(AppContext);
// const token = user.token;

  return (
    <div className='h-screen w-screen flex flex-col justify-start items-center'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/donate-food" element={<FoodDonationForm />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/add-product" element={<AddProductForm />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  )
}

export default App
