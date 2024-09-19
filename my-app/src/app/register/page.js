"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Registration = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Optional billing fields
    const [billingAddress, setBillingAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !password || !confirmPassword) {
            setError('Please fill out all required fields.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setError('');
        setSuccess('Registration successful!');

        console.log('Registering with:', { name, email, password, billingAddress, creditCardNumber });

        router.push('/register/confirmation');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-lg">
                <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <h2 className="text-center text-2xl font-extrabold text-gray-900">Register</h2>

                        {error && <p className="text-red-500 text-xs italic">{error}</p>}
                        {success && <p className="text-green-500 text-xs italic">{success}</p>}

                        {/* Name (Required) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        {/* Email (Required) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        {/* Password (Required) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        {/* Confirm Password (Required) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="confirmPassword">
                                Confirm Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        {/* Billing Information (Optional) */}
                        <h3 className="text-lg font-semibold mt-4">Billing Information (Optional)</h3>

                        {/* Billing Address */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="billingAddress">
                                Billing Address
                            </label>
                            <input
                                id="billingAddress"
                                type="text"
                                placeholder="Enter your billing address"
                                value={billingAddress}
                                onChange={(e) => setBillingAddress(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        {/* City */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="city">
                                City
                            </label>
                            <input
                                id="city"
                                type="text"
                                placeholder="Enter your city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        {/* Postal Code */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="postalCode">
                                Postal Code
                            </label>
                            <input
                                id="postalCode"
                                type="text"
                                placeholder="Enter your postal code"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        {/* Country */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="country">
                                Country
                            </label>
                            <input
                                id="country"
                                type="text"
                                placeholder="Enter your country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        {/* Credit Card Information */}
                        <h3 className="text-lg font-semibold mt-4">Credit Card Information</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="creditCardNumber">
                                Credit Card Number
                            </label>
                            <input
                                id="creditCardNumber"
                                type="text"
                                placeholder="Enter your credit card number"
                                value={creditCardNumber}
                                onChange={(e) => setCreditCardNumber(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        <div className="flex space-x-4">
                            {/* Expiry Date */}
                            <div className="w-1/2">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="expiryDate">
                                    Expiry Date
                                </label>
                                <input
                                    id="expiryDate"
                                    type="text"
                                    placeholder="MM/YY"
                                    value={expiryDate}
                                    onChange={(e) => setExpiryDate(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>

                            {/* CVV */}
                            <div className="w-1/2">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="cvv">
                                    CVV
                                </label>
                                <input
                                    id="cvv"
                                    type="text"
                                    placeholder="CVV"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Registration;
