/*
"use client";

import React, { useState } from 'react';
import './page.css';

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
        promotions: false, // State for promotions checkbox
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { password, confirmPassword } = formData;

        if (password && confirmPassword && password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setError('');
        setSuccess('Profile updated successfully!');
        console.log('Updating profile with:', formData);
    };

    return (
        <div className="edit-profile-container">
            <div className="edit-profile-card">
                <h2 className="edit-profile-title">Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className="section">
                        <h3 className="section-title">User Information</h3>

                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="section">
                        <h3 className="section-title">Billing Information</h3>

                        <div className="form-group">
                            <label htmlFor="billingAddress">Billing Address</label>
                            <input
                                type="text"
                                id="billingAddress"
                                name="billingAddress"
                                value={formData.billingAddress}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postalCode">Postal Code</label>
                            <input
                                type="text"
                                id="postalCode"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country">Country</label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="section">
                        <h3 className="section-title">Credit Card Information</h3>

                        <div className="form-group">
                            <label htmlFor="creditCardNumber">Credit Card Number</label>
                            <input
                                type="text"
                                id="creditCardNumber"
                                name="creditCardNumber"
                                value={formData.creditCardNumber}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex-row">
                            <div className="form-group half-width">
                                <label htmlFor="expiryDate">Expiry Date</label>
                                <input
                                    type="text"
                                    id="expiryDate"
                                    name="expiryDate"
                                    value={formData.expiryDate}
                                    onChange={handleChange}
                                    placeholder="MM/YY"
                                />
                            </div>

                            <div className="form-group half-width">
                                <label htmlFor="cvv">CVV</label>
                                <input
                                    type="text"
                                    id="cvv"
                                    name="cvv"
                                    value={formData.cvv}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="promotion-checkout">
                        <div className="promotion-heading">Register for Promotions</div>
                        <div className="form-group promotion-checkbox">
                            <input
                                type="checkbox"
                                name="promotions"
                                checked={formData.promotions}
                                onChange={handleChange}
                            />
                            <label htmlFor="promotions">I want to receive promotional emails</label>
                        </div>
                    </div>

                    <button type="submit" className="update-button">
                        Update Profile
                    </button>

                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                </form>
            </div>
        </div>
    );
}
*/

"use client";

import React, { useState } from 'react';
import './page.css';

export default function EditProfile() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        currentPassword: '', // Current password will always be present
        password: '',
        confirmPassword: '',
        billingAddress: '',
        city: '',
        postalCode: '',
        country: '',
        creditCards: [], // Store an array of up to 3 credit card objects
        promotions: false,
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [newCreditCard, setNewCreditCard] = useState({
        creditCardNumber: '',
        expiryDate: '',
        cvv: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleCreditCardChange = (e) => {
        const { name, value } = e.target;
        setNewCreditCard((prev) => ({ ...prev, [name]: value }));
    };

    const addCreditCard = () => {
        if (formData.creditCards.length >= 3) {
            setError('You cannot add more than 3 credit cards.');
            return;
        }
        setFormData((prev) => ({
            ...prev,
            creditCards: [...prev.creditCards, newCreditCard],
        }));
        setNewCreditCard({ creditCardNumber: '', expiryDate: '', cvv: '' });
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { password, confirmPassword, currentPassword } = formData;

        if (password && confirmPassword && password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (password && !currentPassword) {
            setError('Please provide your current password to change your password.');
            return;
        }

        setError('');
        setSuccess('Profile updated successfully!');
        console.log('Updating profile with:', formData);
    };

    return (
        <div className="edit-profile-container">
            <div className="edit-profile-card">
                <h2 className="edit-profile-title">Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className="section">
                        <h3 className="section-title">User Information</h3>

                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Current Password Field under email */}
                        <div className="form-group">
                            <label htmlFor="currentPassword">Current Password</label>
                            <input
                                type="password"
                                id="currentPassword"
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">New Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm New Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="section">
                        <h3 className="section-title">Billing Information</h3>

                        <div className="form-group">
                            <label htmlFor="billingAddress">Billing Address</label>
                            <input
                                type="text"
                                id="billingAddress"
                                name="billingAddress"
                                value={formData.billingAddress}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postalCode">Postal Code</label>
                            <input
                                type="text"
                                id="postalCode"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country">Country</label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="section">
                        <h3 className="section-title">Credit Card Information</h3>

                        {/* List of added credit cards */}
                        {formData.creditCards.map((card, index) => (
                            <div key={index} className="credit-card-display">
                                <p>Card {index + 1}: **** **** **** {card.creditCardNumber.slice(-4)}</p>
                            </div>
                        ))}

                        {/* Add new credit card form */}
                        {formData.creditCards.length < 3 && (
                            <>
                                <div className="form-group">
                                    <label htmlFor="creditCardNumber">Credit Card Number</label>
                                    <input
                                        type="text"
                                        id="creditCardNumber"
                                        name="creditCardNumber"
                                        value={newCreditCard.creditCardNumber}
                                        onChange={handleCreditCardChange}
                                    />
                                </div>

                                <div className="flex-row">
                                    <div className="form-group half-width">
                                        <label htmlFor="expiryDate">Expiry Date</label>
                                        <input
                                            type="text"
                                            id="expiryDate"
                                            name="expiryDate"
                                            value={newCreditCard.expiryDate}
                                            onChange={handleCreditCardChange}
                                            placeholder="MM/YY"
                                        />
                                    </div>

                                    <div className="form-group half-width">
                                        <label htmlFor="cvv">CVV</label>
                                        <input
                                            type="text"
                                            id="cvv"
                                            name="cvv"
                                            value={newCreditCard.cvv}
                                            onChange={handleCreditCardChange}
                                        />
                                    </div>
                                </div>

                                <button type="button" className="add-card-button" onClick={addCreditCard}>
                                    Add Credit Card
                                </button>
                            </>
                        )}

                        {/* Error message for credit card limit */}
                        {formData.creditCards.length >= 3 && (
                            <p className="error-message">You cannot add more than 3 credit cards.</p>
                        )}
                    </div>

                    <div className="promotion-checkout">
                        <div className="promotion-heading">Register for Promotions</div>
                        <div className="form-group promotion-checkbox">
                            <input
                                type="checkbox"
                                name="promotions"
                                checked={formData.promotions}
                                onChange={handleChange}
                            />
                            <label htmlFor="promotions">I want to receive promotional emails</label>
                        </div>
                    </div>

                    <button type="submit" className="update-button">
                        Update Profile
                    </button>

                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                </form>
            </div>
        </div>
    );
}
