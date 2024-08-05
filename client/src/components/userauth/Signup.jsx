import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userSignup } from '../../apis/userApis';
import AppContext from '../../context/AppContext';
import CustomLoader from '../../custom/CustomLoader';

function Signup() {
    const navigate = useNavigate();
    const { setUser } = useContext(AppContext);

    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        await userSignup({ name, address, email, password }, setUser, setIsLoading);
        setIsSubmitting(false);
    };

    const checkUserAuth = () => {
        const userItem = JSON.parse(localStorage.getItem('user'));
        if (userItem?.token) {
            navigate('/feed');
        } else {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setTimeout(checkUserAuth, 500);
    }, []);

    useEffect(() => {
        document.title = "FeedForward / Signup";
    }, []);

    return (
        <>
            {isLoading ? (
                <CustomLoader />
            ) : (
                <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-100 text-gray-900">
                    <div className="max-w-lg w-full space-y-8 border border-gray-300 p-8 rounded-xl shadow-lg bg-white">
                        <div className="text-center">
                            <h2 className="mt-6 text-3xl font-bold text-gray-900">Create an Account</h2>
                            <p className="mt-2 text-sm text-gray-600">
                                Already have an account? <Link to={'/signin'} className="font-medium text-indigo-600 hover:text-indigo-500">Sign in</Link>
                            </p>
                        </div>
                        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
                            <div className="rounded-md shadow-sm">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                    <input id="name" name="name" type="text" autoComplete="name" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} />
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                                    <input id="address" name="address" type="text" autoComplete="address" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Enter your address" value={address} onChange={e => setAddress(e.target.value)} />
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input id="email" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                    <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <button type="submit" disabled={isSubmitting} className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}>
                                    {isSubmitting ? 'Creating account...' : 'Sign up'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Signup;
