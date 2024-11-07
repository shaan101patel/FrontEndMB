// app/OrderSummary/page.js

/*"use client";

import React, { useState } from 'react';
import './page.css';

const sampleOrder = [
    { seat: 'A-1', age: 25, price: 12.00 },
    { seat: 'A-2', age: 30, price: 12.00 },
    { seat: 'B-1', age: 22, price: 12.00 },
];

export default function OrderSummary() {
    const [order, setOrder] = useState(sampleOrder);

    const handleUpdateOrder = () => {
        alert('Update order functionality not implemented.');
    };

    const handleDeleteTicket = (seat) => {
        setOrder((prevOrder) => prevOrder.filter(ticket => ticket.seat !== seat));
    };

    const handleConfirmOrder = () => {
        alert('Order confirmed! Proceeding to checkout...');
    };

    const orderTotal = order.reduce((total, ticket) => total + ticket.price, 0);

    return (
        <div className="order-summary-container">
            <div className="order-summary-card">
                <h2 className="order-summary-title">Order Summary</h2>

                <table className="order-table">
                    <thead>
                    <tr>
                        <th>Seat</th>
                        <th>Age</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {order.map(({ seat, age, price }) => (
                        <tr key={seat}>
                            <td>{seat}</td>
                            <td>{age}</td>
                            <td>${price.toFixed(2)}</td>
                            <td>
                                <button
                                    onClick={() => handleDeleteTicket(seat)}
                                    className="delete-button"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="order-total">
                    <span>Order Total:</span>
                    <span>${orderTotal.toFixed(2)}</span>
                </div>

                <div className="order-actions">
                    <button
                        onClick={handleUpdateOrder}
                        className="update-button"
                    >
                        Update Order
                    </button>
                    <button
                        onClick={handleConfirmOrder}
                        className="confirm-button"
                    >
                        Confirm and Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}*/

/*"use client";

import React, { useState, useEffect } from 'react';
import './page.css';
import { useRouter } from 'next/navigation';

export default function OrderSummary() {
    const router = useRouter(); // Initialize useRouter
    const [order, setOrder] = useState([]);
    const [orderTotal, setOrderTotal] = useState(0);

    useEffect(() => {
        // Get query parameters from the router
        const { searchParams } = new URL(window.location.href);

        const movieName = searchParams.get('movieName');
        const selectedDate = searchParams.get('selectedDate');
        const selectedTime = searchParams.get('selectedTime');
        const selectedSeats = JSON.parse(searchParams.get('selectedSeats') || '[]'); // Parse string back to array
        const ageCategories = JSON.parse(searchParams.get('ageCategories') || '{}'); // Parse string back to object

        // Construct order details
        const orderDetails = selectedSeats.map(seat => ({
            seat,
            age: ageCategories[seat] || 'N/A', // Get age or default to 'N/A'
            price: 12.00 // Example static price, you may want to replace it with dynamic pricing logic
        }));

        setOrder(orderDetails);
        const total = orderDetails.reduce((total, ticket) => total + ticket.price, 0);
        setOrderTotal(total);
    }, []);

    const handleUpdateOrder = () => {
        alert('Update order functionality not implemented.');
    };

    const handleDeleteTicket = (seat) => {
        setOrder((prevOrder) => prevOrder.filter(ticket => ticket.seat !== seat));
        const newTotal = order.reduce((total, ticket) => ticket.seat !== seat ? total + ticket.price : total, 0);
        setOrderTotal(newTotal);
    };

    const handleConfirmOrder = () => {
        alert('Order confirmed! Proceeding to checkout...');
        // Add checkout logic here
    };

    return (
        <div className="order-summary-container">
            <div className="order-summary-card">
                <h2 className="order-summary-title">Order Summary</h2>

                <table className="order-table">
                    <thead>
                    <tr>
                        <th>Seat</th>
                        <th>Age</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {order.map(({ seat, age, price }) => (
                        <tr key={seat}>
                            <td>{seat}</td>
                            <td>{age}</td>
                            <td>${price.toFixed(2)}</td>
                            <td>
                                <button
                                    onClick={() => handleDeleteTicket(seat)}
                                    className="delete-button"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="order-total">
                    <span>Order Total:</span>
                    <span>${orderTotal.toFixed(2)}</span>
                </div>

                <div className="order-actions">
                    <button
                        onClick={handleUpdateOrder}
                        className="update-button"
                    >
                        Update Order
                    </button>
                    <button
                        onClick={handleConfirmOrder}
                        className="confirm-button"
                    >
                        Confirm and Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}*/

/*"use client";

import React, { useState, useEffect } from 'react';
import './page.css';
import { useRouter } from 'next/navigation';

export default function OrderSummary() {
    const router = useRouter(); // Initialize useRouter
    const [order, setOrder] = useState([]);
    const [orderTotal, setOrderTotal] = useState(0);

    useEffect(() => {
        // Get query parameters from the router
        const { searchParams } = new URL(window.location.href);

        const movieName = searchParams.get('movieName');
        const selectedDate = searchParams.get('selectedDate');
        const selectedTime = searchParams.get('selectedTime');
        const selectedSeats = JSON.parse(searchParams.get('selectedSeats') || '[]'); // Parse string back to array
        const ageCategories = JSON.parse(searchParams.get('ageCategories') || '{}'); // Parse string back to object

        // Construct order details
        const orderDetails = selectedSeats.map(seat => ({
            seat,
            age: ageCategories[seat] || 'N/A', // Get age or default to 'N/A'
            price: 12.00
        }));

        setOrder(orderDetails);
        const total = orderDetails.reduce((total, ticket) => total + ticket.price, 0);
        setOrderTotal(total);
    }, []);

    const handleUpdateOrder = () => {
        alert('Update order functionality not implemented.');
    };

    const handleDeleteTicket = (seat) => {
        setOrder((prevOrder) => prevOrder.filter(ticket => ticket.seat !== seat));
        const newTotal = order.reduce((total, ticket) => ticket.seat !== seat ? total + ticket.price : total, 0);
        setOrderTotal(newTotal);
    };

    const handleConfirmOrder = () => {
        // Prepare order data
        const orderData = {
            order,
            orderTotal,
        };

        // Construct the query string
        const queryString = new URLSearchParams({
            orderData: JSON.stringify(orderData), // Pass order data as string
        }).toString();

        // Navigate to OrderConfirmation page with query string
        router.push(`/OrderConfirmation?${queryString}`);
    };

    return (
        <div className="order-summary-container">
            <div className="order-summary-card">
                <h2 className="order-summary-title">Order Summary</h2>

                <table className="order-table">
                    <thead>
                    <tr>
                        <th>Seat</th>
                        <th>Age</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {order.map(({ seat, age, price }) => (
                        <tr key={seat}>
                            <td>{seat}</td>
                            <td>{age}</td>
                            <td>${price.toFixed(2)}</td>
                            <td>
                                <button
                                    onClick={() => handleDeleteTicket(seat)}
                                    className="delete-button"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="order-total">
                    <span>Order Total:</span>
                    <span>${orderTotal.toFixed(2)}</span>
                </div>

                <div className="order-actions">
                    <button
                        onClick={handleUpdateOrder}
                        className="update-button"
                    >
                        Update Order
                    </button>
                    <button
                        onClick={handleConfirmOrder}
                        className="confirm-button"
                    >
                        Confirm and Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}*/

"use client";

import React, { useState, useEffect } from 'react';
import './page.css';
import { useRouter } from 'next/navigation';

export default function OrderSummary() {
    const router = useRouter(); // Initialize useRouter
    const [order, setOrder] = useState([]);
    const [orderTotal, setOrderTotal] = useState(0);

    useEffect(() => {
        // Get query parameters from the router
        const { searchParams } = new URL(window.location.href);

        const movieName = searchParams.get('movieName');
        const selectedDate = searchParams.get('selectedDate');
        const selectedTime = searchParams.get('selectedTime');
        const selectedSeats = JSON.parse(searchParams.get('selectedSeats') || '[]'); // Parse string back to array
        const ageCategories = JSON.parse(searchParams.get('ageCategories') || '{}'); // Parse string back to object

        const priceByAge = {
            Adult: 10.00,
            Child: 5.00,
            Senior: 7.00,
        };

        // Construct order details
        const orderDetails = selectedSeats.map(seat => ({
            seat,
            age: ageCategories[seat] || 'N/A', // Get age or default to 'N/A'
            price: priceByAge[ageCategories[seat]] || 12.00 // Default to 12 if age category is unrecognized
        }));

        setOrder(orderDetails);
        const total = orderDetails.reduce((total, ticket) => total + ticket.price, 0);
        setOrderTotal(total);
    }, []);

    const handleUpdateOrder = () => {
        alert('Update order functionality not implemented.');
    };

    const handleDeleteTicket = (seat) => {
        setOrder((prevOrder) => prevOrder.filter(ticket => ticket.seat !== seat));
        const newTotal = order.reduce((total, ticket) => ticket.seat !== seat ? total + ticket.price : total, 0);
        setOrderTotal(newTotal);
    };

    /*const handleConfirmOrder = () => {
        // Prepare order data
        const orderData = {
            order,
            orderTotal,
        };

        // Construct the query string
        const queryString = new URLSearchParams({
            orderData: JSON.stringify(orderData), // Pass order data as string
        }).toString();

        // Navigate to OrderConfirmation page with query string
        router.push(`/OrderConfirmation?${queryString}`);
    };*/

    const handleConfirmOrder = () => {
        // Prepare order data
        const orderData = {
            order,
            orderTotal,
        };

        // Construct the query string for passing data
        const queryString = new URLSearchParams({
            orderData: JSON.stringify(orderData),
        }).toString();

        // Navigate to CheckoutPage with query string
        router.push(`/CheckoutPage?${queryString}`);
    };


    return (
        <div className="order-summary-container">
            <div className="order-summary-card">
                <h2 className="order-summary-title">Order Summary</h2>

                {/* Order Details */}
                <table className="order-table">
                    <thead>
                    <tr>
                        <th>Seat</th>
                        <th>Age</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {order.map(({ seat, age, price }) => (
                        <tr key={seat}>
                            <td>{seat}</td>
                            <td>{age}</td>
                            <td>${price.toFixed(2)}</td>
                            <td>
                                <button
                                    onClick={() => handleDeleteTicket(seat)}
                                    className="delete-button"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/* Order Total */}
                <div className="order-total">
                    <span>Order Total:</span>
                    <span>${orderTotal.toFixed(2)}</span>
                </div>

                {/* Buttons */}
                <div className="order-actions">
                    <button
                        onClick={handleUpdateOrder}
                        className="update-button"
                    >
                        Update Order
                    </button>
                    <button
                        onClick={handleConfirmOrder}
                        className="confirm-button"
                    >
                        Confirm and Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}



