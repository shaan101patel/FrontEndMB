// app/OrderConfirmation/page.js

/*import React from 'react';
import './page.css';

export default function OrderConfirmation() {
    return (
        <div className="order-confirmation-container">
            <div className="order-card">
                <h2 className="order-title">Order Confirmed!</h2>
                <p className="order-message">Thank you for your purchase. Your order has been successfully placed.</p>

                <div className="order-summary">
                    <h3 className="summary-title">Order Summary</h3>
                    <ul className="summary-list">
                        <li className="summary-item">
                            <span>Movie:</span> <span>Barbie</span>
                        </li>
                        <li className="summary-item">
                            <span>Showtime:</span> <span>6:00 PM</span>
                        </li>
                        <li className="summary-item">
                            <span>Seats:</span> <span>A-3, A-4</span>
                        </li>
                        <li className="summary-item">
                            <span>Total Price:</span> <span>$25.00</span>
                        </li>
                    </ul>
                    <div className="order-number">
                        <span>Order Number:</span> <span>#123456789</span>
                    </div>
                </div>

                <p className="confirmation-email">A confirmation email has been sent to your inbox.</p>

                <button className="home-button">
                    Back to Home
                </button>
            </div>
        </div>
    );
}*/

/*"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './page.css';

export default function OrderConfirmation() {
    const router = useRouter();
    const [orderData, setOrderData] = useState(null);

    useEffect(() => {
        // Get query parameters from the router
        const { searchParams } = new URL(window.location.href);
        const orderDataString = searchParams.get('orderData');

        if (orderDataString) {
            const parsedOrderData = JSON.parse(orderDataString);
            setOrderData(parsedOrderData);
        }
    }, []);

    if (!orderData) {
        return <p>Loading...</p>;
    }

    const { order, orderTotal } = orderData;

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

                <p className="confirmation-email">A confirmation email has been sent to your inbox.</p>

                <button className="home-button" onClick={() => router.push('/')}>
                    Back to Home
                </button>
            </div>
        </div>
    );
}*/

"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './page.css';
import { fetchUserProfile } from '../movieService.js'; // Import the profile fetching function

export default function OrderConfirmation() {


    const router = useRouter();
    const [orderData, setOrderData] = useState(null);
    const [userPaymentInfo, setUserPaymentInfo] = useState([]);

    useEffect(() => {
        // Get order data from query parameters
        const { searchParams } = new URL(window.location.href);
        const orderDataString = searchParams.get('orderData');

        if (orderDataString) {
            const parsedOrderData = JSON.parse(orderDataString);
            setOrderData(parsedOrderData);
        }

        const userEmail = localStorage.getItem('userEmail');
        console.log("User Email:", userEmail); // Add this for debugging


        // Fetch user profile for payment info
        const fetchPaymentInfo = async () => {
            try {
                const userEmail = localStorage.getItem('userEmail'); // Assuming user email is stored in local storage
                const userProfile = await fetchUserProfile(userEmail);
                setUserPaymentInfo(userProfile.creditCards); // Assuming creditCards contains masked card info
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchPaymentInfo();
    }, []);

    if (!orderData) {
        return <p>Loading...</p>;
    }

    const { order, orderTotal } = orderData;

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

                <div className="payment-info">
                    <h3 className="summary-title">Payment Information</h3>
                    <ul className="summary-list">
                        {userPaymentInfo.map((card, index) => (
                            <li key={index} className="summary-item">
                                <span>Card:</span> <span>**** **** **** {card.cardNumber.slice(-4)}</span>
                                <span>Expiry:</span> <span>{card.expiryDate}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <p className="confirmation-email">A confirmation email has been sent to your inbox.</p>

                <button className="home-button" onClick={() => router.push('/')}>
                    Back to Home
                </button>
            </div>
        </div>
    );
}

