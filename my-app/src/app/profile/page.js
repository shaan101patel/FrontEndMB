"use client";

import React, { useState } from 'react';

export default function EditProfile() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        billingAddress: '',
        city: '',
        postalCode: '',
        country: '',
        creditCardNumber: '',
        expiryDate: '',
        cvv: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { name, email, password, confirmPassword } = formData;

        if (!name || !email || !password || !confirmPassword) {
            setError('Please fill out all required fields.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setError('');
        setSuccess('Profile updated successfully!');
        console.log('Updating profile with:', formData);
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4 text-black">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded p-6">
                <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                    {/* User Information Section */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-4">User Information</h3>

                        {/* Name (Required) */}
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-lg font-medium mb-2">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                                required
                            />
                        </div>

                        {/* Email (Required) */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-lg font-medium mb-2">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                                required
                            />
                        </div>

                        {/* Password (Required) */}
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-lg font-medium mb-2">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                                required
                            />
                        </div>

                        {/* Confirm Password (Required) */}
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-lg font-medium mb-2">
                                Confirm Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                                required
                            />
                        </div>
                    </div>

                    {/* Billing Information Section */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-4">Billing Information</h3>

                        {/* Billing Address (Optional) */}
                        <div className="mb-4">
                            <label htmlFor="billingAddress" className="block text-lg font-medium mb-2">
                                Billing Address
                            </label>
                            <input
                                type="text"
                                id="billingAddress"
                                name="billingAddress"
                                value={formData.billingAddress}
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                            />
                        </div>

                        {/* City (Optional) */}
                        <div className="mb-4">
                            <label htmlFor="city" className="block text-lg font-medium mb-2">
                                City
                            </label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                            />
                        </div>

                        {/* Postal Code (Optional) */}
                        <div className="mb-4">
                            <label htmlFor="postalCode" className="block text-lg font-medium mb-2">
                                Postal Code
                            </label>
                            <input
                                type="text"
                                id="postalCode"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                            />
                        </div>

                        {/* Country (Optional) */}
                        <div className="mb-4">
                            <label htmlFor="country" className="block text-lg font-medium mb-2">
                                Country
                            </label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                            />
                        </div>
                    </div>

                    {/* Credit Card Information Section */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-4">Credit Card Information</h3>

                        {/* Credit Card Number (Optional) */}
                        <div className="mb-4">
                            <label htmlFor="creditCardNumber" className="block text-lg font-medium mb-2">
                                Credit Card Number
                            </label>
                            <input
                                type="text"
                                id="creditCardNumber"
                                name="creditCardNumber"
                                value={formData.creditCardNumber}
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                            />
                        </div>

                        <div className="flex space-x-4">
                            {/* Expiry Date (Optional) */}
                            <div className="mb-4 w-1/2">
                                <label htmlFor="expiryDate" className="block text-lg font-medium mb-2">
                                    Expiry Date
                                </label>
                                <input
                                    type="text"
                                    id="expiryDate"
                                    name="expiryDate"
                                    value={formData.expiryDate}
                                    onChange={handleChange}
                                    className="w-full border rounded p-2"
                                    placeholder="MM/YY"
                                />
                            </div>

                            {/* CVV (Optional) */}
                            <div className="mb-4 w-1/2">
                                <label htmlFor="cvv" className="block text-lg font-medium mb-2">
                                    CVV
                                </label>
                                <input
                                    type="text"
                                    id="cvv"
                                    name="cvv"
                                    value={formData.cvv}
                                    onChange={handleChange}
                                    className="w-full border rounded p-2"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
                    >
                        Update Profile
                    </button>

                    {error && <p className="text-red-500 mt-4">{error}</p>}
                    {success && <p className="text-green-500 mt-4">{success}</p>}
                </form>
            </div>
        </div>
    );
}




