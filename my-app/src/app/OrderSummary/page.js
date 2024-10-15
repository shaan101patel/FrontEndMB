// app/OrderSummary/page.js

"use client";

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
