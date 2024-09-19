"use client"; // Add this if using Next.js

import React from 'react';

const Confirmation = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-center text-xl font-bold mb-4">Registration Successful!</h2>
                    <p className="text-center text-gray-700 mb-4">Thank you for registering! You can now log in and start booking a movie.</p>
                    <div className="text-center">
                        <a href="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Go to Login
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;