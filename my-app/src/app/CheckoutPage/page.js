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



