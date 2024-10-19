"use client"; // This marks the file as a Client Component

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

const ResetPassword = () => {
    const router = useRouter(); // Initialize the router
    const [token, setToken] = useState(null); // State for the token
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false); // State for success message

    useEffect(() => {
        // Only access router.query if it's defined
        if (router.query && router.query.token) {
            setToken(router.query.token); // Set the token state if available
        }
    }, [router.query]); // Run this effect whenever router.query changes

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newPassword || !confirmPassword) {
            setError('Please fill out both fields.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setError('');

        try {
            // Call your API to reset the password
            await resetPassword(token, newPassword); // Send token and new password

            setSuccess('Password changed successfully!');
            setNewPassword('');
            setConfirmPassword('');

            // Redirect to the login page after successful password reset
            router.push('/login'); // Redirect to the login page
        } catch (error) {
            setError('Failed to change password. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-xs">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-center text-xl font-bold mb-4 text-black">Reset Password</h2>

                    {error && <p className="text-red-500 text-xs italic">{error}</p>}
                    {success && <p className="text-green-500 text-xs italic">{success}</p>}

                    {/* New Password Input */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="new-password">
                            New Password
                        </label>
                        <input
                            id="new-password"
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    {/* Confirm Password Input */}
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
                            Confirm Password
                        </label>
                        <input
                            id="confirm-password"
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Change Password and Return to Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};



export default ResetPassword;


