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

        // Construct the query string for passing data
        const queryString = new URLSearchParams({
            orderData: JSON.stringify(orderData),
        }).toString();

        // Navigate to CheckoutPage with query string
        router.push(`/CheckoutPage?${queryString}`);
    };

    // In OrderSummary.js
    const handleConfirmOrder = () => {
        // Prepare order data
        const orderData = {
            order,
            orderTotal,
            movieName, // Pass the movie name
            selectedDate, // Pass the selected date
            selectedTime, // Pass the selected time
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
    const [movieName, setMovieName] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    useEffect(() => {
        // Get query parameters from the router
        const { searchParams } = new URL(window.location.href);

        const movieName = searchParams.get('movieName');
        const selectedDate = searchParams.get('selectedDate');
        const selectedTime = searchParams.get('selectedTime');
        const selectedSeats = JSON.parse(searchParams.get('selectedSeats') || '[]');
        const ageCategories = JSON.parse(searchParams.get('ageCategories') || '{}');

        const priceByAge = {
            Adult: 10.00,
            Child: 5.00,
            Senior: 7.00,
        };

        // Set state for the movie and booking details
        setMovieName(movieName);
        setSelectedDate(selectedDate);
        setSelectedTime(selectedTime);

        // Construct order details
        const orderDetails = selectedSeats.map(seat => ({
            seat,
            age: ageCategories[seat] || 'N/A',
            price: priceByAge[ageCategories[seat]] || 12.00
        }));

        setOrder(orderDetails);
        const total = orderDetails.reduce((total, ticket) => total + ticket.price, 0);
        setOrderTotal(total);
    }, []);

    const handleDeleteTicket = (seat) => {
        setOrder((prevOrder) => prevOrder.filter(ticket => ticket.seat !== seat));
        const newTotal = order.reduce((total, ticket) => ticket.seat !== seat ? total + ticket.price : total, 0);
        setOrderTotal(newTotal);
    };

    const handleConfirmOrder = () => {
        const orderData = {
            order,
            orderTotal,
            movieName,
            selectedDate,
            selectedTime,
        };

        const queryString = new URLSearchParams({
            orderData: JSON.stringify(orderData),
        }).toString();

        router.push(`/CheckoutPage?${queryString}`);
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

                <div className="summary-total">
                    <span>Order Total:</span>
                    <span>${orderTotal.toFixed(2)}</span>
                </div>


                <div className="order-actions">
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
    const [movieName, setMovieName] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    useEffect(() => {
        // Get query parameters from the router
        const { searchParams } = new URL(window.location.href);

        const movieName = searchParams.get('movieName');
        const selectedDate = searchParams.get('selectedDate');
        const selectedTime = searchParams.get('selectedTime');
        const selectedSeats = JSON.parse(searchParams.get('selectedSeats') || '[]');
        const ageCategories = JSON.parse(searchParams.get('ageCategories') || '{}');

        const priceByAge = {
            Adult: 10.00,
            Child: 5.00,
            Senior: 7.00,
        };

        // Set state for the movie and booking details
        setMovieName(movieName);
        setSelectedDate(selectedDate);
        setSelectedTime(selectedTime);

        // Construct order details
        const orderDetails = selectedSeats.map(seat => ({
            seat,
            age: ageCategories[seat] || 'N/A',
            price: priceByAge[ageCategories[seat]] || 12.00
        }));

        setOrder(orderDetails);
        const total = orderDetails.reduce((total, ticket) => total + ticket.price, 0);
        setOrderTotal(total);
    }, []);

    const handleDeleteTicket = (seat) => {
        setOrder((prevOrder) => prevOrder.filter(ticket => ticket.seat !== seat));
        const newTotal = order.reduce((total, ticket) => ticket.seat !== seat ? total + ticket.price : total, 0);
        setOrderTotal(newTotal);
    };

    const handleConfirmOrder = () => {
        const orderData = {
            order,
            orderTotal,
            movieName,
            selectedDate,
            selectedTime,
        };

        const queryString = new URLSearchParams({
            orderData: JSON.stringify(orderData),
        }).toString();

        router.push(`/CheckoutPage?${queryString}`);
    };

    const handleEditTickets = () => {
        router.push(`/tickets/${movie._id}`);
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

                <div className="summary-total">
                    <span>Order Total:</span>
                    <span>${orderTotal.toFixed(2)}</span>
                </div>

                <div className="order-actions">
                    <button
                        onClick={handleEditTickets}
                        className="edit-button"
                    >
                        Edit Tickets
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

// use client;*/

/*"use client";

import React, { useState, useEffect } from 'react';
import './page.css';
import { useRouter } from 'next/navigation';

export default function OrderSummary() {
    const router = useRouter(); // Initialize useRouter
    const [order, setOrder] = useState([]);
    const [orderTotal, setOrderTotal] = useState(0);
    const [movieName, setMovieName] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [ageCategories, setAgeCategories] = useState({});

    useEffect(() => {
        // Get query parameters from the router
        const { searchParams } = new URL(window.location.href);

        const movieName = searchParams.get('movieName');
        const selectedDate = searchParams.get('selectedDate');
        const selectedTime = searchParams.get('selectedTime');
        const selectedSeats = JSON.parse(searchParams.get('selectedSeats') || '[]');
        const ageCategories = JSON.parse(searchParams.get('ageCategories') || '{}');

        const priceByAge = {
            Adult: 10.00,
            Child: 5.00,
            Senior: 7.00,
        };

        // Set state for the movie and booking details
        setMovieName(movieName);
        setSelectedDate(selectedDate);
        setSelectedTime(selectedTime);
        setSelectedSeats(selectedSeats);
        setAgeCategories(ageCategories);

        // Construct order details
        const orderDetails = selectedSeats.map(seat => ({
            seat,
            age: ageCategories[seat] || 'N/A',
            price: priceByAge[ageCategories[seat]] || 12.00
        }));

        setOrder(orderDetails);
        const total = orderDetails.reduce((total, ticket) => total + ticket.price, 0);
        setOrderTotal(total);
    }, []);

    const handleDeleteTicket = (seat) => {
        setOrder((prevOrder) => prevOrder.filter(ticket => ticket.seat !== seat));
        const newTotal = order.reduce((total, ticket) => ticket.seat !== seat ? total + ticket.price : total, 0);
        setOrderTotal(newTotal);
    };

    const handleConfirmOrder = () => {
        const orderData = {
            order,
            orderTotal,
            movieName,
            selectedDate,
            selectedTime,
            selectedSeats,
            ageCategories
        };

        // Store the order details in query parameters for URL persistence
        const queryString = new URLSearchParams({
            movieName,
            selectedDate,
            selectedTime,
            selectedSeats: JSON.stringify(selectedSeats),
            ageCategories: JSON.stringify(ageCategories),
            orderData: JSON.stringify(orderData),
        }).toString();

        // Navigate to the CheckoutPage with the query string containing the order data
        router.push(`/CheckoutPage?${queryString}`);
    };

    const handleEditPurchase = () => {
        // Go back to the previous page the user visited
        router.back();
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

                <div className="summary-total">
                    <span>Order Total:</span>
                    <span>${orderTotal.toFixed(2)}</span>
                </div>

                <div className="order-actions">
                    <button
                        onClick={handleConfirmOrder}
                        className="confirm-button"
                    >
                        Confirm and Checkout
                    </button>
                    <button
                        onClick={handleEditPurchase}
                        className="edit-button"
                    >
                        Edit Purchase
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
    const [movieName, setMovieName] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [ageCategories, setAgeCategories] = useState({});

    useEffect(() => {
        // Get query parameters from the router
        const { searchParams } = new URL(window.location.href);

        const movieName = searchParams.get('movieName');
        const selectedDate = searchParams.get('selectedDate');
        const selectedTime = searchParams.get('selectedTime');
        const selectedSeats = JSON.parse(searchParams.get('selectedSeats') || '[]');
        const ageCategories = JSON.parse(searchParams.get('ageCategories') || '{}');

        const priceByAge = {
            Adult: 10.00,
            Child: 5.00,
            Senior: 7.00,
        };

        // Set state for the movie and booking details
        setMovieName(movieName);
        setSelectedDate(selectedDate);
        setSelectedTime(selectedTime);
        setSelectedSeats(selectedSeats);
        setAgeCategories(ageCategories);

        // Construct order details
        const orderDetails = selectedSeats.map(seat => ({
            seat,
            age: ageCategories[seat] || 'N/A',
            price: priceByAge[ageCategories[seat]] || 12.00
        }));

        setOrder(orderDetails);
        const total = orderDetails.reduce((total, ticket) => total + ticket.price, 0);
        setOrderTotal(total);
    }, []);

    const handleDeleteTicket = (seat) => {
        setOrder((prevOrder) => prevOrder.filter(ticket => ticket.seat !== seat));
        const newTotal = order.reduce((total, ticket) => ticket.seat !== seat ? total + ticket.price : total, 0);
        setOrderTotal(newTotal);
    };

    const handleConfirmOrder = () => {
        const orderData = {
            order,
            orderTotal,
            movieName,
            selectedDate,
            selectedTime,
            selectedSeats,
            ageCategories
        };

        // Store the order details in query parameters for URL persistence
        const queryString = new URLSearchParams({
            movieName,
            selectedDate,
            selectedTime,
            selectedSeats: JSON.stringify(selectedSeats),
            ageCategories: JSON.stringify(ageCategories),
            orderData: JSON.stringify(orderData),
        }).toString();

        // Navigate to the CheckoutPage with the query string containing the order data
        router.push(`/CheckoutPage?${queryString}`);
    };

    const handleEditPurchase = () => {
        // Go back to the previous page the user visited
        router.back();
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
                <div className="summary-total">
                    <span>Order Total:</span>
                    <span>${orderTotal.toFixed(2)}</span>
                </div>

                {/* Order Actions */}
                <div className="order-actions">
                    <button
                        onClick={handleConfirmOrder}
                        className="confirm-button"
                    >
                        Confirm and Checkout
                    </button>
                    <button
                        onClick={handleEditPurchase}
                        className="edit-button"
                    >
                        Edit Purchase
                    </button>
                </div>
            </div>
        </div>
    );
}

