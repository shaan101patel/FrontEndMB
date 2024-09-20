import React from 'react';

export default function OrderConfirmation() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xl">
                <h2 className="text-2xl font-bold text-center mb-4 text-black">Order Confirmed!</h2>
                <p className="text-lg text-center mb-6 text-black">Thank you for your purchase. Your order has been successfully placed.</p>

                {/* Order Summary */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="text-xl font-semibold mb-2 text-black">Order Summary</h3>
                    <ul className="mb-4">
                        {/* Add the details of the order below */}
                        <li className="flex justify-between mb-2 text-black">
                            <span>Movie:</span> <span>Barbie</span>
                        </li>
                        <li className="flex justify-between mb-2 text-black">
                            <span>Showtime:</span> <span>6:00 PM</span>
                        </li>
                        <li className="flex justify-between mb-2 text-black">
                            <span>Seats:</span> <span>A-3, A-4</span>
                        </li>
                        <li className="flex justify-between mb-2 text-black">
                            <span>Total Price:</span> <span>$25.00</span>
                        </li>
                    </ul>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Order Number:</span> <span>#123456789</span>
                    </div>
                </div>

                {/* Confirmation Message */}
                <p className="text-center text-black mb-4">A confirmation email has been sent to your inbox.</p>

                {/* Back to Home Button */}
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 w-full"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
}


