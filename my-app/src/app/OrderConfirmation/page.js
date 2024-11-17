"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './page.css';
import { fetchUserProfile, sendOrderConfirmationEmail } from '../movieService.js'; // Import the profile fetching function

export default function OrderConfirmation() {
    const router = useRouter();
    const [orderData, setOrderData] = useState(null);
    const [userPaymentInfo, setUserPaymentInfo] = useState([]);

    useEffect(() => {
        // Extract orderData from URL query params
        const { searchParams } = new URL(window.location.href);
        const orderDataString = searchParams.get('orderData');

        if (orderDataString) {
            const parsedOrderData = JSON.parse(orderDataString);
            setOrderData(parsedOrderData);
        }
    }, []);

    useEffect(() => {
        if (orderData) {
            const fetchPaymentInfo = async () => {
                try {
                    const userProfile = await fetchUserProfile(orderData.userEmail); // Use the email from orderData
                    setUserPaymentInfo(userProfile.creditCards || []); // Default to an empty array if no cards
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                }
            };

            fetchPaymentInfo();
            sendOrderConfirmationEmail(orderData); // Call to send the confirmation email

        }
    }, [orderData]);

    if (!orderData) {
        return <p>Loading...</p>;
    }

    const { order, orderTotal, userEmail, movieDate, movieTime, movieName } = orderData;

    return (
        <div className="order-confirmation-container">
            <div className="order-card">
                <h2 className="order-title">Order Confirmed!</h2>
                <p className="order-message">Thank you for your purchase. Your order has been successfully placed.</p>

                <div className="order-summary">
                    <h3 className="summary-title">Order Summary</h3>
                    <ul className="summary-list">
                        {order.map(({ seat, age }, index) => (
                            <li key={index} className="summary-item">
                                <span>Seat:</span> <span>{seat} (Age: {age})</span>
                            </li>
                        ))}
                    </ul>
                    <div className="order-number">
                        <span>Total Price:</span> <span>${orderTotal.toFixed(2)}</span>
                    </div>
                </div>

                <div className="user-info">
                    <h3 className="summary-title">User Information</h3>
                    <p>Email: {userEmail}</p>
                    <p>Date of Movie: {movieDate}</p>
                    <p>Time: {movieTime}</p>
                    <p>Movie Name: {movieName}</p>

                </div>

                <p className="confirmation-email">A confirmation email has been sent to your inbox.</p>

                <button className="home-button" onClick={() => router.push('/')}>
                    Back to Home
                </button>
            </div>
        </div>
    );
}
