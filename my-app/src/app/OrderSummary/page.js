"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OrderSummary() {
    const router = useRouter();
    const [order, setOrder] = useState([]);
    const [orderTotal, setOrderTotal] = useState(0);
    const [movieName, setMovieName] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [ageCategories, setAgeCategories] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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

        setMovieName(movieName);
        setSelectedDate(selectedDate);
        setSelectedTime(selectedTime);
        setSelectedSeats(selectedSeats);
        setAgeCategories(ageCategories);

        const orderDetails = selectedSeats.map(seat => ({
            seat,
            age: ageCategories[seat] || 'N/A',
            price: priceByAge[ageCategories[seat]] || 12.00,
        }));

        setOrder(orderDetails);
        const total = orderDetails.reduce((total, ticket) => total + ticket.price, 0);
        setOrderTotal(total);

        setLoading(false);
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
            ageCategories,
        };

        const queryString = new URLSearchParams({
            movieName,
            selectedDate,
            selectedTime,
            selectedSeats: JSON.stringify(selectedSeats),
            ageCategories: JSON.stringify(ageCategories),
            orderData: JSON.stringify(orderData),
        }).toString();

        router.push(`/CheckoutPage?${queryString}`);
    };

    const handleEditPurchase = () => {
        router.back();
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen bg-gray-100 text-black">Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4 text-black">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded p-6">
                <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                <table className="w-full border-collapse mb-4">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2 text-left">Seat</th>
                        <th className="border px-4 py-2 text-left">Age Category</th>
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
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Order Total:</span>
                    <span className="text-lg font-semibold">${orderTotal.toFixed(2)}</span>
                </div>
                <div className="flex space-x-4">
                    <button
                        onClick={handleEditPurchase}
                        className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
                    >
                        Edit Purchase
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
