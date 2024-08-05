import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../footer/Footer';

function Home() {
    return (
        <div className="bg-gray-100 text-gray-900">
            {/* Hero Section */}
            <section className="bg-indigo-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold mb-4">Welcome to FeedForward</h1>
                    <p className="text-xl mb-8">Join us in reducing food wastage and providing sustainable solutions to hunger.</p>
                    <Link to='/donate-food' className='bg-white text-indigo-600 font-semibold py-2 px-4 rounded shadow-md hover:bg-gray-200'>
                        Donate Food
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-10">Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">Reduce Food Wastage</h3>
                            <p>Optimize the quantity of raw materials and redistribute excess food to those in need.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">Affordable Rates</h3>
                            <p>Provide food at rates much lower than the market price, and offer free resources.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">Community Support</h3>
                            <p>Join a community dedicated to sustainable living and zero hunger.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="bg-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-10">What Our Users Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <p className="mb-4">"FeedForward has changed the way we handle excess food. It's a fantastic initiative!"</p>
                            <h3 className="text-xl font-semibold">- User A</h3>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <p className="mb-4">"Affordable food and a great cause. Highly recommend joining the community!"</p>
                            <h3 className="text-xl font-semibold">- User B</h3>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <p className="mb-4">"A great platform to reduce food wastage and support those in need."</p>
                            <h3 className="text-xl font-semibold">- User C</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            {/* <section className="bg-indigo-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Join Us Today</h2>
                    <p className="text-xl mb-8">Become a part of the FeedForward community and make a difference.</p>
                    <button className="bg-white text-indigo-600 font-semibold py-2 px-4 rounded shadow-md hover:bg-gray-200">Sign Up</button>
                </div>
            </section> */}
            <Footer />
        </div>
    );
}

export default Home;
