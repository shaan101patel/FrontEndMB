"use client";

import React, { useState } from 'react';

export default function EditProfile() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        billingAddress: '',
        creditCardNumber: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        alert('Profile updated successfully!');
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4 text-black">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded p-6">
                <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-lg font-medium mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-lg font-medium mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-lg font-medium mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-lg font-medium mb-2">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        />
                    </div>

                    {/* Billing Address */}
                    <div className="mb-4">
                        <label htmlFor="billingAddress" className="block text-lg font-medium mb-2">Billing Address (Optional)</label>
                        <input
                            type="text"
                            id="billingAddress"
                            name="billingAddress"
                            value={formData.billingAddress}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        />
                    </div>

                    {/* Credit Card Number */}
                    <div className="mb-4">
                        <label htmlFor="creditCardNumber" className="block text-lg font-medium mb-2">Credit Card Number (Optional)</label>
                        <input
                            type="text"
                            id="creditCardNumber"
                            name="creditCardNumber"
                            value={formData.creditCardNumber}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
}



