import chintanImg from '../../assets/images/chintan.png'
import divyaImg from '../../assets/images/divya.png'
import ankurImg from '../../assets/images/ankur.png'
import vaibhavImg from '../../assets/images/vaibhav.png'
import deepikaImg from '../../assets/images/deepika.png'
import darshanImg from '../../assets/images/darshan.png'

function About() {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-start bg-gray-100 text-gray-900">
            <div className="max-w-4xl w-full space-y-8 border border-gray-300 p-8 rounded-xl shadow-lg bg-white mt-8">
                <h1 className="text-4xl font-bold text-gray-900 text-center">About Us</h1>

                <section className="mt-8">
                    <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                    <p className="mt-4 text-gray-600">
                    At BiteSized, our mission is to tackle the dual challenges of food waste and hunger by leveraging technology to connect surplus food donors with individuals and organizations in need. We are dedicated to creating a sustainable and socially responsible platform that transforms surplus food into a valuable resource for communities.
                    </p>
                </section>

                <section className="mt-8">
                    <h2 className="text-3xl font-bold text-gray-900">Our Team</h2>
                    <div className="flex flex-wrap mt-4">
                        <div className="w-full md:w-1/2 lg:w-1/4 p-4">
                            <img src={chintanImg} alt="Chintan" className="rounded-full mx-auto" />
                            <h3 className="mt-4 text-xl font-semibold text-center">Chintan Tripathi</h3>
                            <p className="text-gray-600 text-center">Full Stack and AI Developer</p>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/4 p-4">
                            <img src={vaibhavImg} alt="Team Member" className="rounded-full mx-auto" />
                            <h3 className="mt-4 text-xl font-semibold text-center">Vaibhav Korat</h3>
                            <p className="text-gray-600 text-center">Full Stack Developer</p>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/4 p-4">
                            <img src={darshanImg} alt="Team Member" className="rounded-full mx-auto" />
                            <h3 className="mt-4 text-xl font-semibold text-center">Dharshan Venkatesan </h3>
                            <p className="text-gray-600 text-center">Backend & AI Developer</p>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/4 p-4">
                            <img src={deepikaImg} alt="Team Member" className="rounded-full mx-auto" />
                            <h3 className="mt-4 text-xl font-semibold text-center">Deepika Venkatesan</h3>
                            <p className="text-gray-600 text-center">Software Engineer/back-end developer</p>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/4 p-4">
                            <img src={divyaImg} alt="Team Member" className="rounded-full mx-auto" />
                            <h3 className="mt-4 text-xl font-semibold text-center">Divya Patel</h3>
                            <p className="text-gray-600 text-center">Front end Developer</p>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/4 p-4">
                            <img src={ankurImg} alt="Team Member" className="rounded-full mx-auto" />
                            <h3 className="mt-4 text-xl font-semibold text-center">Ankur Mangroliya</h3>
                            <p className="text-gray-600 text-center">Database Administrator</p>
                        </div>
                    </div>
                </section>

                <section className="mt-8">
                    <h2 className="text-3xl font-bold text-gray-900">Media Gallery</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        <div className="w-full h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://img.freepik.com/free-photo/person-being-donated-food_23-2148613181.jpg?w=996&t=st=1720630543~exp=1720631143~hmac=f40b36dd552561d5d5d4d4c952c2d4d0e53630f778b532779980eb7d6c1a76f2')" }}></div>
                        <div className="w-full h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://imgs.search.brave.com/0rjIJPOh1dJ-D76q9d1IeuunKdToJLvW4luCr6vOMeE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93dnVz/c3RhdGljLmNvbS9k/b25hdGUvdXBsb2Fk/cy8yMDE3LzA4L0Zv/b2QtYWlkLWZvci1B/ZnJpY2EtMS5qcGc')" }}></div>
                        <div className="w-full h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://img.freepik.com/free-photo/side-view-women-exchanging-items_23-2150323453.jpg?w=996&t=st=1720630594~exp=1720631194~hmac=713a539a5142bbac0e8488ae1dabde58de5557816c03bfb4228b7c4b2517819e')" }}></div>
                        <div className="w-full h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://imgs.search.brave.com/oubyKHFhRItHTU_f0-WaODbL2Qbr2qhpZtQrIg4NYbQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Zm9vZGJhbmtzbWlz/c2lzc2F1Z2EuY2Ev/d3AtY29udGVudC91/cGxvYWRzLzIwMjMv/MDkvTUxHMDk5Ni1l/MTY5Mzg1MjA2NDg3/Mi53ZWJw')" }}></div>
                        <div className="w-full h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://imgs.search.brave.com/UVQr-EziexJunG4BAvz0oox0SoENh4y47E4Lcz89-P8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by92/b2x1bnRlZXItcHJl/cGFyaW5nLWZvb2Qt/ZG9uYXRpb25fMjMt/MjE0ODYzNzk2OC5q/cGc_c2l6ZT02MjYm/ZXh0PWpwZw')" }}></div>
                        <div className="w-full h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://imgs.search.brave.com/Mb8yHLe-DqRwqvCqfCzZYuYTPKx_RUpIphpSYVMFp5E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9k/b25hdGlvbi1iYWdz/LWJlaW5nLXByZXBh/cmVkLXdpdGgtcHJv/dmlzaW9uc18yMy0y/MTQ4NjEzMTM2Lmpw/Zz9zaXplPTYyNiZl/eHQ9anBn')" }}></div>
                    </div>
                </section>

                <section className="mt-8">
                    <h2 className="text-3xl font-bold text-gray-900">Join Us</h2>
                    <p className="mt-4 text-gray-600">
                    We're passionate about making a meaningful impact. If you share our vision and want to contribute your skills to reducing food waste and improving food security, we'd love to hear from you.
                    </p>
                    <button className="mt-4 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300">
                        View Openings
                    </button>
                </section>
            </div>
        </div>
    );
}

export default About;