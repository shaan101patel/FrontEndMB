"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '../movieService';
import './page.css';

const Registration = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [billingAddress, setBillingAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    // State for credit cards
    const [creditCards, setCreditCards] = useState([{ number: '', expiry: '', cvv: '' }]);
    const [promotionOptIn, setPromotionOptIn] = useState(false);

    const handleCreditCardChange = (index, field, value) => {
        const newCards = [...creditCards];
        newCards[index][field] = value;
        setCreditCards(newCards);
    };

    const addCreditCard = () => {
        if (creditCards.length < 3) {
            setCreditCards([...creditCards, { number: '', expiry: '', cvv: '' }]);
        }
    };

    const handleSubmit = async (e) => {
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

        // Prepare user data for registration
        const userData = {
            name,
            email,
            password,
            billingAddress,
            city, // Add city
            state, // Add postal code
            postalCode, // Add country
            creditCardNumber: creditCards.map(card => card.number), // Collect credit card numbers
            expiryDate: creditCards.map(card => card.expiry), // Collect expiry dates
            cvv: creditCards.map(card => card.cvv), // Collect CVVs
            promotionOptIn,
        };

        try {
            await registerUser(userData);
            setSuccess('Registration successful!');
            router.push('/confirmation');
        } catch (error) {
            setError('Registration failed. Please try again.');
            console.error("Registration error:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-lg">
                <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <h2 className="text-center text-2xl font-extrabold text-gray-900">Register</h2>

                        {error && <p className="text-red-500 text-xs italic">{error}</p>}
                        {success && <p className="text-green-500 text-xs italic">{success}</p>}

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
                                required
                            />
                        </div>

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
                                required
                            />
                        </div>

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
                                required
                            />
                        </div>

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
                                required
                            />
                        </div>

                        <h3 className="text-lg font-semibold mt-4">Billing Information (Optional)</h3>

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

                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="country">
                                State
                            </label>
                            <input
                                id="state"
                                type="text"
                                placeholder="Enter your state"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

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

                        {/* Credit Card Information Section */}
                        <h3 className="text-lg font-semibold mt-4">Credit Card Information</h3>

                        {creditCards.map((card, index) => (
                            <div key={index} className="mb-4">
                                <label className="block text-sm font-medium text-gray-700"
                                       htmlFor={`creditCardNumber${index}`}>
                                    Credit Card Number
                                </label>
                                <input
                                    id={`creditCardNumber${index}`}
                                    type="text"
                                    placeholder="Enter your credit card number"
                                    value={card.number}
                                    onChange={(e) => handleCreditCardChange(index, 'number', e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />

                                <label className="block text-sm font-medium text-gray-700 mt-2"
                                       htmlFor={`creditCardExpiry${index}`}>
                                    Expiry Date (MM/YY)
                                </label>
                                <input
                                    id={`creditCardExpiry${index}`}
                                    type="text"
                                    placeholder="MM/YY"
                                    value={card.expiryDate}
                                    onChange={(e) => handleCreditCardChange(index, 'expiry', e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />

                                <label className="block text-sm font-medium text-gray-700 mt-2"
                                       htmlFor={`creditCardCvv${index}`}>
                                    CVV
                                </label>
                                <input
                                    id={`creditCardCvv${index}`}
                                    type="text"
                                    placeholder="CVV"
                                    value={card.cvv}
                                    onChange={(e) => handleCreditCardChange(index, 'cvv', e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        ))}

                        {creditCards.length < 3 && (
                            <button
                                type="button"
                                onClick={addCreditCard}
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 disabled:opacity-50"
                            >
                                Add Another Credit Card
                            </button>
                        )}

                        <div className="flex items-center mt-4">
                            <input
                                id="promotions"
                                type="checkbox"
                                checked={promotionOptIn}
                                onChange={(e) => setPromotionOptIn(e.target.checked)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="promotions" className="ml-2 block text-sm text-gray-900">
                                Register for promotions and offers
                            </label>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
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






