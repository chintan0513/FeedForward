// export default Sidebar;
import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="h-screen bg-gray-900 text-white w-64 space-y-6 py-7 px-2 fixed top-0 left-0 shadow-lg">
      <div className="text-2xl font-semibold text-center text-indigo-400">Admin Panel</div>
      <nav className="space-y-1">
        <Link to="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          Home
        </Link>
        <Link to="/add-product" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          Add Product
        </Link>
        <Link to="/products" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          Product List
        </Link>
        <Link to="/donate-food" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          Donate Food
        </Link>
        <Link to="/signin" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          Sign In
        </Link>
        <Link to="/signup" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          Sign Up
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
