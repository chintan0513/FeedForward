import React, { useState } from 'react';
import axios from 'axios';

function ForgetPasswordForm({ match }) {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/user/forget-password', { token: match.params.token, password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-100 text-gray-900">
      <div className="max-w-lg w-full space-y-8 border border-gray-300 p-8 rounded-xl shadow-lg bg-white">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Set New Password</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
            <input id="password" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter new password" />
          </div>
          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Reset Password
            </button>
          </div>
        </form>
        {message && <p className="text-center text-sm text-gray-600">{message}</p>}
      </div>
    </div>
  );
}

export default ForgetPasswordForm;
