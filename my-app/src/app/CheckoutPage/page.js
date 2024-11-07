// app/CheckoutPage/page.js

/*"use client";

import React from 'react';
import './page.css';

export default function Checkout() {
    return (
        <div className="checkout-container">
            <div className="checkout-form">
                <h2 className="checkout-title">Checkout</h2>

                <h3 className="section-title">Billing Information</h3>
                <div className="grid-container">
                    <div className="form-group">
                        <label>
                            Name <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            Email <span className="required">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            Billing Address <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="billingAddress"
                            placeholder="Billing Address"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            City <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            State <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="state"
                            placeholder="State"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            ZIP Code <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="zip"
                            placeholder="ZIP Code"
                            required
                        />
                    </div>
                </div>

                <h3 className="section-title">Payment Information</h3>
                <div className="grid-container">
                    <div className="form-group">
                        <label>
                            Credit Card Number <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="creditCardNumber"
                            placeholder="Card Number"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            Expiration Date <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="expirationDate"
                            placeholder="MM/YY"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            CVV <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="cvv"
                            placeholder="CVV"
                            required
                        />
                    </div>
                </div>

                <button className="checkout-button">
                    Confirm and Complete Purchase
                </button>
            </div>
        </div>
    );
}*/

/*"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
    const router = useRouter();

    // Handle checkout confirmation (e.g., payment submission)
    const handleCheckout = () => {
        // Implement payment logic here...

        // On successful payment, navigate to OrderConfirmation
        router.push(`/OrderConfirmation`);
    };

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            <p>Confirm your payment details here.</p>
            <button onClick={handleCheckout} className="confirm-button">
                Complete Purchase
            </button>
        </div>
    );
}*/

/*"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchUserProfile } from '../movieService'; // Import the fetchUserProfile function

export default function CheckoutPage() {
    const router = useRouter();
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState(null);

    // Fetch user profile data on component mount
    useEffect(() => {
        // Ensure this code runs only in the browser
        if (typeof window !== 'undefined') {
            const storedEmail = localStorage.getItem('userEmail');
            if (storedEmail) {
                setEmail(storedEmail);
            } else {
                console.error('No email found in localStorage.');
            }
        }
    }, []);

    // Fetch user profile data if email is available
    useEffect(() => {
        if (email) {
            const getUserProfile = async () => {
                try {
                    const profile = await fetchUserProfile(email);
                    setUserProfile(profile);
                } catch (error) {
                    console.error('Failed to fetch user profile:', error);
                } finally {
                    setLoading(false);
                }
            };

            getUserProfile();
        } else {
            setLoading(false); // Stop loading if no email
        }
    }, [email]);

    // Handle checkout confirmation (e.g., payment submission)
    const handleCheckout = () => {
        // Implement payment logic here...

        // On successful payment, navigate to OrderConfirmation
        router.push(`/OrderConfirmation`);
    };

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            <p>Confirm your payment details here.</p>

            {loading ? (
                <p>Loading payment information...</p>
            ) : userProfile ? (
                <div className="credit-card-info">
                    <h3>Credit Card Information</h3>
                    {userProfile.creditCards && userProfile.creditCards.length > 0 ? (
                        userProfile.creditCards.map((card, index) => (
                            <div key={index}>
                                <p><strong>Card Ending:</strong> **** **** **** {card.cardLast4}</p>
                                <p><strong>Expiry Date:</strong> {card.expiryDate}</p>
                            </div>
                        ))
                    ) : (
                        <p>No credit card information found.</p>
                    )}
                </div>
            ) : (
                <p>No user profile found.</p>
            )}

            <button onClick={handleCheckout} className="confirm-button">
                Complete Purchase
            </button>
        </div>
    );
}*/

"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchUserProfile } from '../movieService'; // Import the fetchUserProfile function

export default function CheckoutPage() {
    const router = useRouter();
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState(null);

    // Fetch user profile data on component mount
    useEffect(() => {
        // Ensure this code runs only in the browser
        if (typeof window !== 'undefined') {
            const storedEmail = localStorage.getItem('userEmail');
            if (storedEmail) {
                setEmail(storedEmail);
            } else {
                console.error('No email found in localStorage.');
            }
        }
    }, []);

    // Fetch user profile data if email is available
    useEffect(() => {
        if (email) {
            const getUserProfile = async () => {
                try {
                    const profile = await fetchUserProfile(email);
                    setUserProfile(profile);
                } catch (error) {
                    console.error('Failed to fetch user profile:', error);
                } finally {
                    setLoading(false);
                }
            };

            getUserProfile();
        } else {
            setLoading(false); // Stop loading if no email
        }
    }, [email]);

    // Handle checkout confirmation (e.g., payment submission)
    const handleCheckout = () => {
        // Implement payment logic here...

        // On successful payment, navigate to OrderConfirmation
        router.push(`/OrderConfirmation`);
    };

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            <p>Confirm your payment details here.</p>

            {loading ? (
                <p>Loading payment information...</p>
            ) : userProfile ? (
                <div className="credit-card-info">
                    <h3>Credit Card Information</h3>
                    {userProfile.creditCards && userProfile.creditCards.length > 0 ? (
                        userProfile.creditCards.map((card, index) => (
                            <div key={index}>
                                <p><strong>Card Ending:</strong> **** **** **** {card.cardLast4}</p>  {/* Card last 4 digits */}
                                <p><strong>Expiry Date:</strong> {card.expiryDate}</p>
                            </div>
                        ))
                    ) : (
                        <p>No credit card information found.</p>
                    )}
                </div>
            ) : (
                <p>No user profile found.</p>
            )}

            <button onClick={handleCheckout} className="confirm-button">
                Complete Purchase
            </button>
        </div>
    );
}



