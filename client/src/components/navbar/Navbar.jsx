import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";

function Navbar() {
  const { user, setUser } = useContext(AppContext);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openDonationsDropdown, setOpenDonationsDropdown] = useState(false);
  const navigate = useNavigate();

    return (
        <nav className="bg-white shadow-md w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-xl font-bold text-indigo-600">
                            FeedForward
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        {user && user.isAdmin === true && (
                            <>
                                <Link
                                    to="/products"
                                    className="text-gray-800 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Food Items
                                </Link>

                <Link
                  to="/add-product"
                  className="text-gray-800 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Add Food Items
                </Link>
              </>
            )}
            <div className="relative">
              <div
                className="text-gray-800 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                onClick={() => setOpenDonationsDropdown(!openDonationsDropdown)}
              >
                Donations
              </div>
              {openDonationsDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200">
                  <Link
                    to="/donate"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setOpenDonationsDropdown(false)}
                  >
              Donate
            </Link>
            <Link
              to="/available-donations"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setOpenDonationsDropdown(false)}
            >
              Available Donations
            </Link>
            </div>
              )}
            </div>

            <Link
              to="/feed"
              className="text-gray-800 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Post Event
            </Link>
            <Link
              to="/about"
              className="text-gray-800 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              What We Do
            </Link>
            
            <Link
              to="/news"
              className="text-gray-800 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              News & Stories
            </Link> 

            <Link
                            to="/volunteer-registration"
                            className="text-gray-800 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Volunteer Registration
                        </Link>
            
            <Link
              to="/blogs"
              className="text-gray-800 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Blogs
            </Link> 
            <div className="relative">
              {user ? (
                <>
                  <div
                    className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center cursor-pointer"
                    onClick={() => setOpenDropdown(!openDropdown)}
                  >
                    {user.email.split("@")[0][0].toUpperCase()}
                  </div>
                  {openDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setOpenDropdown(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/donation-order"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setOpenDropdown(false)}
                      >
                        Donated orders
                      </Link>
                      <div
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          localStorage.clear();
                          setOpenDropdown(false);
                          setUser(null);
                          navigate("/");
                        }}
                      >
                        Logout
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="text-gray-800 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Signin
                  </Link>
                  <Link
                    to="/signup"
                    className="text-gray-800 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
