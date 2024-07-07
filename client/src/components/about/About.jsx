
function About() {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-start bg-gray-100 text-gray-900">
            <div className="max-w-4xl w-full space-y-8 border border-gray-300 p-8 rounded-xl shadow-lg bg-white mt-8">
                <h1 className="text-4xl font-bold text-gray-900 text-center">About Us</h1>

                <section className="mt-8">
                    <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                    <p className="mt-4 text-gray-600">
                        At MyApp, our mission is to empower individuals and businesses with innovative solutions that drive success and foster growth. We believe in the power of technology to transform lives and are committed to making a positive impact on the world through our products and services.
                    </p>
                </section>

                <section className="mt-8">
                    <h2 className="text-3xl font-bold text-gray-900">Our Team</h2>
                    <div className="flex flex-wrap mt-4">
                        <div className="w-full md:w-1/2 lg:w-1/4 p-4">
                            <img src="https://via.placeholder.com/150" alt="Team Member" className="rounded-full mx-auto" />
                            <h3 className="mt-4 text-xl font-semibold text-center">John Doe</h3>
                            <p className="text-gray-600 text-center">CEO & Founder</p>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/4 p-4">
                            <img src="https://via.placeholder.com/150" alt="Team Member" className="rounded-full mx-auto" />
                            <h3 className="mt-4 text-xl font-semibold text-center">Jane Smith</h3>
                            <p className="text-gray-600 text-center">CTO</p>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/4 p-4">
                            <img src="https://via.placeholder.com/150" alt="Team Member" className="rounded-full mx-auto" />
                            <h3 className="mt-4 text-xl font-semibold text-center">Alice Johnson</h3>
                            <p className="text-gray-600 text-center">Lead Developer</p>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/4 p-4">
                            <img src="https://via.placeholder.com/150" alt="Team Member" className="rounded-full mx-auto" />
                            <h3 className="mt-4 text-xl font-semibold text-center">Bob Lee</h3>
                            <p className="text-gray-600 text-center">Marketing Head</p>
                        </div>
                    </div>
                </section>

                <section className="mt-8">
                    <h2 className="text-3xl font-bold text-gray-900">Media Gallery</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        <div className="w-full h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://via.placeholder.com/300')" }}></div>
                        <div className="w-full h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://via.placeholder.com/300')" }}></div>
                        <div className="w-full h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://via.placeholder.com/300')" }}></div>
                        <div className="w-full h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://via.placeholder.com/300')" }}></div>
                        <div className="w-full h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://via.placeholder.com/300')" }}></div>
                        <div className="w-full h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://via.placeholder.com/300')" }}></div>
                    </div>
                </section>

                <section className="mt-8">
                    <h2 className="text-3xl font-bold text-gray-900">Join Us</h2>
                    <p className="mt-4 text-gray-600">
                        We are always looking for talented and passionate individuals to join our team. If you are interested in being a part of our journey, check out our current openings or reach out to us directly.
                    </p>
                    <button className="mt-4 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300">
                        View Openings
                    </button>
                </section>
            </div>
        </div>
    );
}

export default About;
