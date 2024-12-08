/*"use client";

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
}*/
"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './page.css';
import { fetchUserProfile, sendOrderConfirmationEmail, createBooking } from '../movieService.js';

export default function OrderConfirmation() {
    const router = useRouter();
    const [orderData, setOrderData] = useState(null);
    const [userPaymentInfo, setUserPaymentInfo] = useState([]);
    const [bookingSuccess, setBookingSuccess] = useState(false); // State to track booking status

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
        if (orderData && !bookingSuccess) {
            const processOrder = async () => {
                if (!orderData.selectedDate || !orderData.selectedTime || orderData.selectedSeats.length === 0 || Object.keys(orderData.ageCategories).length !== orderData.selectedSeats.length) {
                    alert('Please complete all selections before proceeding.');
                    return;
                }

                try {
                    // Get user email from local storage
                    const userEmail = localStorage.getItem('userEmail');

                    // Fetch user profile using the email
                    const userProfile = await fetchUserProfile(userEmail);
                    setUserPaymentInfo(userProfile.creditCards || []); // Default to an empty array if no cards

                    // Include the email in the order data to be sent to the backend
                    const orderDataWithEmail = {
                        ...orderData,
                        userEmail
                    };

                    // Send confirmation email
                    await sendOrderConfirmationEmail(orderDataWithEmail);

                    // Create booking
                    const bookingResponse = await createBooking(orderDataWithEmail);
                    if (bookingResponse.success) {
                        setBookingSuccess(true); // Set success state if booking is successful
                    } else {
                        console.error("Booking creation failed:", bookingResponse.message);
                        alert("An error occurred while saving your booking. Please contact support.");
                    }
                } catch (error) {
                    console.error("Error processing order:", error);
                    alert("An error occurred while saving your booking. Please contact support.");
                }
            };

            processOrder();
        }
    }, [orderData, bookingSuccess]);

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
