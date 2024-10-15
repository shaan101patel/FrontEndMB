// app/register/page.js

"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './page.css';

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
        <div className="registration-container">
            <div className="registration-card">
                <form onSubmit={handleSubmit} className="registration-form">
                    <h2 className="registration-title">Register</h2>

                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}

                    {/* Name (Required) */}
                    <div className="form-group">
                        <label htmlFor="name">
                            Name <span className="required">*</span>
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* Email (Required) */}
                    <div className="form-group">
                        <label htmlFor="email">
                            Email <span className="required">*</span>
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password (Required) */}
                    <div className="form-group">
                        <label htmlFor="password">
                            Password <span className="required">*</span>
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Confirm Password (Required) */}
                    <div className="form-group">
                        <label htmlFor="confirmPassword">
                            Confirm Password <span className="required">*</span>
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    {/* Billing Information (Optional) */}
                    <h3 className="section-title">Billing Information (Optional)</h3>

                    {/* Billing Address */}
                    <div className="form-group">
                        <label htmlFor="billingAddress">Billing Address</label>
                        <input
                            id="billingAddress"
                            type="text"
                            placeholder="Enter your billing address"
                            value={billingAddress}
                            onChange={(e) => setBillingAddress(e.target.value)}
                        />
                    </div>

                    {/* City */}
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input
                            id="city"
                            type="text"
                            placeholder="Enter your city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>

                    {/* Postal Code */}
                    <div className="form-group">
                        <label htmlFor="postalCode">Postal Code</label>
                        <input
                            id="postalCode"
                            type="text"
                            placeholder="Enter your postal code"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                        />
                    </div>

                    {/* Country */}
                    <div className="form-group">
                        <label htmlFor="country">Country</label>
                        <input
                            id="country"
                            type="text"
                            placeholder="Enter your country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </div>

                    {/* Credit Card Information */}
                    <h3 className="section-title">Credit Card Information</h3>
                    <div className="form-group">
                        <label htmlFor="creditCardNumber">Credit Card Number</label>
                        <input
                            id="creditCardNumber"
                            type="text"
                            placeholder="Enter your credit card number"
                            value={creditCardNumber}
                            onChange={(e) => setCreditCardNumber(e.target.value)}
                        />
                    </div>

                    <div className="flex-row">
                        {/* Expiry Date */}
                        <div className="form-group half-width">
                            <label htmlFor="expiryDate">Expiry Date</label>
                            <input
                                id="expiryDate"
                                type="text"
                                placeholder="MM/YY"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                            />
                        </div>

                        {/* CVV */}
                        <div className="form-group half-width">
                            <label htmlFor="cvv">CVV</label>
                            <input
                                id="cvv"
                                type="text"
                                placeholder="CVV"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="register-button">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Registration;
