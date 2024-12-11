/*
"use client";

import React, { useEffect, useState } from 'react';
import './page.css';
import { fetchUserProfile } from '../movieService';
import { updateUserProfile } from '../movieService';

export default function EditProfile() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        currentPassword: '',
        password: '',
        confirmPassword: '',
        billingAddress: '',
        city: '',
        postalCode: '',
        state: '',
        creditCards: [], // Initialize as empty array to match the new structure
        promotions: false,
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [newCreditCard, setNewCreditCard] = useState({
        creditCardNumber: '',
        expiryDate: '',
        cvv: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userEmail = localStorage.getItem('userEmail');
                const userData = await fetchUserProfile(userEmail);

                setFormData({
                    name: userData.name,
                    email: userData.email,
                    currentPassword: '',
                    password: '',
                    confirmPassword: '',
                    billingAddress: userData.billingAddress || '',
                    city: userData.city || '',
                    postalCode: userData.postalCode || '',
                    state: userData.state || '',
                    creditCards: userData.creditCards || [],
                    promotions: userData.promotionOptIn || false, // map the field from backend
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to fetch user data.');
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleCreditCardChange = (e) => {
        const { name, value } = e.target;
        setNewCreditCard((prev) => ({ ...prev, [name]: value }));
    };

    const addCreditCard = () => {
        if (!newCreditCard.creditCardNumber || !newCreditCard.expiryDate || !newCreditCard.cvv) {
            setError('Please fill in all credit card details.');
            return;
        }
        if (formData.creditCards.length >= 3) {
            setError('You cannot add more than 3 credit cards.');
            return;
        }


        // Only store the last 4 digits of the card number
        const cardLast4 = newCreditCard.creditCardNumber.slice(-4);

        setFormData((prev) => ({
            ...prev,
            creditCards: [
                ...prev.creditCards,
                {
                    cardLast4,  // Store last 4 digits of card
                    expiryDate: newCreditCard.expiryDate,
                    cvv: newCreditCard.cvv,
                },
            ],
        }));

        setNewCreditCard({ creditCardNumber: '', expiryDate: '', cvv: '' });
        setError('');
    };



    const removeCreditCard = (index) => {
        setFormData((prev) => ({
            ...prev,
            creditCards: prev.creditCards.filter((_, i) => i !== index),
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { password, confirmPassword, currentPassword, creditCards } = formData;

        if (password && confirmPassword && password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (password && currentPassword === '') {
            setError('Please provide your current password to change your password.');
            return;
        }

        try {
            const response = await updateUserProfile({
                ...formData,
                creditCards, // send the full array of encrypted credit card data
            });
            setSuccess('Profile updated successfully!');
            console.log('Response from server:', response);
        } catch (error) {
            setError('Failed to update profile: ' + (error.response?.data || error.message));
            console.error('Error updating profile:', error);
        }
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
                                readOnly
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="currentPassword">Current Password</label>
                            <input
                                type="password"
                                id="currentPassword"
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleChange}
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
                            <label htmlFor="state">State</label>
                            <input
                                type="text"
                                id="state"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="section">
                        <h3 className="section-title">Credit Card Information</h3>

                        {formData.creditCards?.map((card, index) => (
                            <div key={index} className="credit-card-display">
                                <p>
                                    Card {index + 1}: **** **** **** {card.cardLast4 || '****'}
                                </p>
                                <p>Expiry Date: ***</p>
                                <p>CVV: ***</p>
                                <button type="button" className="remove-card-button" onClick={() => removeCreditCard(index)}>
                                    Remove
                                </button>
                            </div>
                        ))}

                        {formData.creditCards?.length < 3 && (
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
                                            type="password"
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

                        {formData.creditCards.length >= 3 && <p>You can only add up to 3 credit cards.</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="promotions">Opt-in for Promotions</label>
                        <input
                            type="checkbox"
                            id="promotions"
                            name="promotions"
                            checked={formData.promotions}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        {error && <p className="error-message">{error}</p>}
                        {success && <p className="success-message">{success}</p>}
                    </div>

                    <div className="form-group">
                        <button type="submit" className="submit-button">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
*/

"use client";

import React, { useEffect, useState } from 'react';
import './page.css';
import { fetchUserProfile } from '../movieService';
import { updateUserProfile } from '../movieService';

export default function EditProfile() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        currentPassword: '',
        password: '',
        confirmPassword: '',
        billingAddress: '',
        city: '',
        postalCode: '',
        state: '',
        creditCards: [], // Initialize as empty array to match the new structure
        promotions: false,
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [newCreditCard, setNewCreditCard] = useState({
        creditCardNumber: '',
        expiryDate: '',
        cvv: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userEmail = localStorage.getItem('userEmail');
                const userData = await fetchUserProfile(userEmail);

                setFormData({
                    name: userData.name,
                    email: userData.email,
                    currentPassword: '',
                    password: '',
                    confirmPassword: '',
                    billingAddress: userData.billingAddress || '',
                    city: userData.city || '',
                    postalCode: userData.postalCode || '',
                    state: userData.state || '',
                    creditCards: userData.creditCards || [],
                    promotions: userData.promotionOptIn || false, // map the field from backend
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to fetch user data.');
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleCreditCardChange = (e) => {
        const { name, value } = e.target;
        setNewCreditCard((prev) => ({ ...prev, [name]: value }));
    };

    const addCreditCard = () => {
        if (!newCreditCard.creditCardNumber || !newCreditCard.expiryDate || !newCreditCard.cvv) {
            setError('Please fill in all credit card details.');
            return;
        }
        if (formData.creditCards.length >= 3) {
            setError('You cannot add more than 3 credit cards.');
            return;
        }

        // Validate credit card number (must be exactly 16 digits)
        const cardNumberRegex = /^\d{16}$/;
        if (!cardNumberRegex.test(newCreditCard.creditCardNumber)) {
            setError('Credit card number must be exactly 16 digits.');
            return;
        }

        // Only store the last 4 digits of the card number
        const cardLast4 = newCreditCard.creditCardNumber.slice(-4);

        setFormData((prev) => ({
            ...prev,
            creditCards: [
                ...prev.creditCards,
                {
                    cardLast4,  // Store last 4 digits of card
                    expiryDate: newCreditCard.expiryDate,
                    cvv: newCreditCard.cvv,
                },
            ],
        }));

        setNewCreditCard({ creditCardNumber: '', expiryDate: '', cvv: '' });
        setError('');
    };

    const removeCreditCard = (index) => {
        setFormData((prev) => ({
            ...prev,
            creditCards: prev.creditCards.filter((_, i) => i !== index),
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { password, confirmPassword, currentPassword, creditCards } = formData;

        if (password && confirmPassword && password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (password && currentPassword === '') {
            setError('Please provide your current password to change your password.');
            return;
        }

        try {
            const response = await updateUserProfile({
                ...formData,
                creditCards, // send the full array of encrypted credit card data
            });
            setSuccess('Profile updated successfully!');
            console.log('Response from server:', response);
        } catch (error) {
            setError('Failed to update profile: ' + (error.response?.data || error.message));
            console.error('Error updating profile:', error);
        }
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
                                readOnly
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="currentPassword">Current Password</label>
                            <input
                                type="password"
                                id="currentPassword"
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleChange}
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
                            <label htmlFor="state">State</label>
                            <input
                                type="text"
                                id="state"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="section">
                        <h3 className="section-title">Credit Card Information</h3>

                        {formData.creditCards?.map((card, index) => (
                            <div key={index} className="credit-card-display">
                                <p>
                                    Card {index + 1}: **** **** **** {card.cardLast4 || '****'}
                                </p>
                                <p>Expiry Date: **/**</p>
                                <p>CVV: ***</p>
                                <button type="button" className="remove-card-button" onClick={() => removeCreditCard(index)}>
                                    Remove
                                </button>
                            </div>
                        ))}

                        {formData.creditCards?.length < 3 && (
                            <>
                                <div className="form-group">
                                    <label htmlFor="creditCardNumber">Credit Card Number</label>
                                    <input
                                        type="text"
                                        id="creditCardNumber"
                                        name="creditCardNumber"
                                        value={newCreditCard.creditCardNumber}
                                        onChange={handleCreditCardChange}
                                        maxLength={16}  // Limit the input length to 16
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
                                            type="password"
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

                        {formData.creditCards.length >= 3 && <p>You can only add up to 3 credit cards.</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="promotions">Opt-in for Promotions</label>
                        <input
                            type="checkbox"
                            id="promotions"
                            name="promotions"
                            checked={formData.promotions}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        {error && <p className="error-message">{error}</p>}
                        {success && <p className="success-message">{success}</p>}
                    </div>

                    <div className="form-group">
                        <button type="submit" className="submit-button">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

