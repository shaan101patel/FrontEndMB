"use client";

import React, { useState } from 'react';

const sampleOrder = [
    { seat: 'A-1', age: 25, price: 12.00 },
    { seat: 'A-2', age: 30, price: 12.00 },
    { seat: 'B-1', age: 22, price: 12.00 },
];

export default function OrderSummary() {
    const [order, setOrder] = useState(sampleOrder);

    const handleUpdateOrder = () => {
        // Logic to update the order (e.g., open a modal to edit tickets)
        alert('Update order functionality not implemented.');
    };

    const handleDeleteTicket = (seat) => {
        setOrder((prevOrder) => prevOrder.filter(ticket => ticket.seat !== seat));
    };

    const handleConfirmOrder = () => {
        // Logic to confirm the order and proceed to checkout
        alert('Order confirmed! Proceeding to checkout...');
    };

    const orderTotal = order.reduce((total, ticket) => total + ticket.price, 0);

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4 text-black">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded p-6">
                <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

                {/* Order Details */}
                <table className="w-full border-collapse mb-4">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2 text-left">Seat</th>
                        <th className="border px-4 py-2 text-left">Age</th>
                        <th className="border px-4 py-2 text-left">Price</th>
                        <th className="border px-4 py-2 text-left">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {order.map(({ seat, age, price }) => (
                        <tr key={seat} className="border-b">
                            <td className="border px-4 py-2">{seat}</td>
                            <td className="border px-4 py-2">{age}</td>
                            <td className="border px-4 py-2">${price.toFixed(2)}</td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => handleDeleteTicket(seat)}
                                    className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/* Order Total */}
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Order Total:</span>
                    <span className="text-lg font-semibold">${orderTotal.toFixed(2)}</span>
                </div>

                {/* Buttons */}
                <div className="flex space-x-4">
                    <button
                        onClick={handleUpdateOrder}
                        className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
                    >
                        Update Order
                    </button>
                    <button
                        onClick={handleConfirmOrder}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Confirm and Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}
