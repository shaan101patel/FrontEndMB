"use client"; // This marks the file as a Client Component

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

const ForgotPasswordRequest = () => {
    const router = useRouter(); // Initialize the router
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setError('Please enter your email.');
            return;
        }

        setError('');

        try {
            // Replace with your API call to send the reset password email
            await sendResetPasswordEmail(email);

            setSuccess('Check your email for a link to reset your password!');
            setEmail('');
        } catch (error) {
            setError('Failed to send reset link. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-xs">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-center text-xl font-bold mb-4 text-black">Forgot Password</h2>

                    {error && <p className="text-red-500 text-xs italic">{error}</p>}
                    {success && <p className="text-green-500 text-xs italic">{success}</p>}

                    {/* Email Input */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Send Reset Link
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default ForgotPasswordRequest;




