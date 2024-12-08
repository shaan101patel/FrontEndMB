"use client";
import React, { useState, useEffect } from 'react';
import './page.css';
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
    const [loading, setLoading] = useState(true); // Added loading state

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
            price: priceByAge[ageCategories[seat]] || 12.00
        }));

        setOrder(orderDetails);
        const total = orderDetails.reduce((total, ticket) => total + ticket.price, 0);
        setOrderTotal(total);

        setLoading(false); // Stop loading when data is fetched and states are set
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
        return <div>Loading...</div>; // Add a loading state to prevent rendering before data is loaded
    }

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
                                    className="button delete-button"
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
                        className="button confirm-button"
                    >
                        Confirm and Checkout
                    </button>
                    <button
                        onClick={handleEditPurchase}
                        className="button edit-button"
                    >
                        Edit Purchase
                    </button>
                </div>
            </div>
        </div>
    );
}
