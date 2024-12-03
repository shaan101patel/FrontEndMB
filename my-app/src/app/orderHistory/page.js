/*"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchBookingsByEmail } from "../movieService.js"; // Import the service function

const OrderHistory = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const email = localStorage.getItem("userEmail"); // Retrieve user email
                if (!email) {
                    router.push("/login"); // Redirect to login if email is missing
                    return;
                }

                const bookingsData = await fetchBookingsByEmail(email);
                setBookings(bookingsData); // Update state with the fetched bookings
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderHistory();
    }, [router]);

    if (loading) {
        return <div className="text-center mt-8">Loading order history...</div>;
    }

    if (error) {
        return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
    }

    if (bookings.length === 0) {
        return <div className="text-center mt-8">No bookings found.</div>;
    }

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Order History</h1>
            <div className="space-y-4">
                {bookings.map((booking) => (
                    <div key={booking._id} className="border p-4 rounded-md shadow-sm">
                        <h2 className="text-xl font-semibold">{booking.movieName}</h2>
                        <p>
                            <strong>Date:</strong> {booking.selectedDate}
                        </p>
                        <p>
                            <strong>Time:</strong> {booking.selectedTime}
                        </p>
                        <p>
                            <strong>Seats:</strong> {booking.selectedSeats.join(", ")}
                        </p>
                        <p>
                            <strong>Age Categories:</strong>{" "}
                            {Object.entries(booking.ageCategories).map(
                                ([seat, category]) => `${seat}: ${category}`
                            ).join(", ")}
                        </p>
                        <p className="text-gray-600 text-sm">
                            <strong>Booked on:</strong>{" "}
                            {new Date(booking.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderHistory;*/

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchBookingsByEmail } from "../movieService.js"; // Import the service function

const OrderHistory = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const email = localStorage.getItem("userEmail"); // Retrieve user email
                if (!email) {
                    router.push("/login"); // Redirect to login if email is missing
                    return;
                }

                const bookingsData = await fetchBookingsByEmail(email);
                setBookings(bookingsData); // Update state with the fetched bookings
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderHistory();
    }, [router]);

    if (loading) {
        return <div className="text-center mt-8">Loading order history...</div>;
    }

    if (error) {
        return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
    }

    if (bookings.length === 0) {
        return <div className="text-center mt-8">No bookings found.</div>;
    }

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Order History</h1>
            <div className="space-y-4">
                {bookings.map((booking) => (
                    <div key={booking._id} className="border p-4 rounded-md shadow-sm">
                        <h2 className="text-xl font-semibold">{booking.movieName}</h2>
                        <p>
                            <strong>Date:</strong> {booking.selectedDate}
                        </p>
                        <p>
                            <strong>Time:</strong> {booking.selectedTime}
                        </p>
                        <p>
                            <strong>Seats:</strong> {booking.selectedSeats.join(", ")}
                        </p>
                        <p>
                            <strong>Age Categories:</strong>{" "}
                            {Array.from(new Set(Object.values(booking.ageCategories))).join(", ")}
                        </p>
                        <p className="text-gray-600 text-sm">
                            <strong>Booked on:</strong>{" "}
                            {new Date(booking.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderHistory;

