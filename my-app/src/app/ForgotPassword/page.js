"use client"; // This marks the file as a Client Component

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import Link from 'next/link';

const ForgotPassword = () => {
    const router = useRouter(); // Initialize the router

    // State to manage new password and confirmation
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // State to handle form submission and errors
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false); // State for success message

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!newPassword || !confirmPassword) {
            setError('Please fill out both fields.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        // Clear error if any
        setError('');

        // Simulate password change logic
        console.log('Changing password to:', newPassword);

        // Simulate a successful password change
        setTimeout(() => {
            setSuccess(true);
            // Optionally redirect after success
            // router.push('/login'); // Redirect to the login page or desired route
        }, 1000);

        // Reset form (optional)
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-xs">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-center text-xl font-bold mb-4 text-black">Reset Password</h2>

                    {error && <p className="text-red-500 text-xs italic">{error}</p>}
                    {success && <p className="text-green-500 text-xs italic">Password changed successfully!</p>}

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
                            Change Password
                        </button>
                    </div>
                </form>

                {/* Back to Login Link */}
                <p className="text-center text-gray-600 text-sm mt-4">
                    Remembered your password?{' '}
                    <Link href="/login" className="text-blue-500 hover:text-blue-800 font-bold">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;



