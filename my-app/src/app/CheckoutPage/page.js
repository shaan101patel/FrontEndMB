/*"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchUserProfile } from '../movieService'; // Import the fetchUserProfile function

export default function CheckoutPage() {
    const router = useRouter();
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState(null);

    // Fetch user profile data on component mount
    useEffect(() => {
        // Ensure this code runs only in the browser
        if (typeof window !== 'undefined') {
            const storedEmail = localStorage.getItem('userEmail');
            if (storedEmail) {
                setEmail(storedEmail);
            } else {
                console.error('No email found in localStorage.');
            }
        }
    }, []);

    // Fetch user profile data if email is available
    useEffect(() => {
        if (email) {
            const getUserProfile = async () => {
                try {
                    const profile = await fetchUserProfile(email);
                    setUserProfile(profile);
                } catch (error) {
                    console.error('Failed to fetch user profile:', error);
                } finally {
                    setLoading(false);
                }
            };

            getUserProfile();
        } else {
            setLoading(false); // Stop loading if no email
        }
    }, [email]);

    // Handle checkout confirmation (e.g., payment submission)
    const handleCheckout = () => {
        // Implement payment logic here...

        // On successful payment, navigate to OrderConfirmation
        router.push(`/OrderConfirmation`);
    };

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            <p>Confirm your payment details here.</p>

            {loading ? (
                <p>Loading payment information...</p>
            ) : userProfile ? (
                <div className="credit-card-info">
                    <h3>Credit Card Information</h3>
                    {userProfile.creditCards && userProfile.creditCards.length > 0 ? (
                        userProfile.creditCards.map((card, index) => (
                            <div key={index}>
                                <p><strong>Card Ending:</strong> **** **** **** {card.cardLast4}</p>
                                <p><strong>Expiry Date:</strong> {card.expiryDate}</p>
                            </div>
                        ))
                    ) : (
                        <p>No credit card information found.</p>
                    )}
                </div>
            ) : (
                <p>No user profile found.</p>
            )}

            <button onClick={handleCheckout} className="confirm-button">
                Complete Purchase
            </button>
        </div>
    );
}*/
/*"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchUserProfile } from '../movieService'; // Import the fetchUserProfile function

export default function CheckoutPage() {
    const router = useRouter();
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState(null);
    const [orderData, setOrderData] = useState(null);

    // Fetch user email from localStorage when the component mounts
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedEmail = localStorage.getItem('userEmail');
            if (storedEmail) {
                setEmail(storedEmail);
            } else {
                console.error('No email found in localStorage.');
            }
        }
    }, []);

    // Fetch user profile data if email is available
    useEffect(() => {
        if (email) {
            const getUserProfile = async () => {
                try {
                    const profile = await fetchUserProfile(email);
                    setUserProfile(profile);
                } catch (error) {
                    console.error('Failed to fetch user profile:', error);
                } finally {
                    setLoading(false);
                }
            };

            getUserProfile();
        } else {
            setLoading(false); // Stop loading if no email
        }
    }, [email]);

    // Fetch query parameters and set orderData
    useEffect(() => {
        const { searchParams } = new URL(window.location.href);
        const orderDataFromQuery = searchParams.get('orderData');
        if (orderDataFromQuery) {
            setOrderData(JSON.parse(orderDataFromQuery));
        }
    }, []);

    // Handle checkout confirmation (e.g., payment submission)
    const handleCheckout = () => {
        // Implement payment logic here...

        // On successful payment, navigate to OrderConfirmation
        router.push(`/OrderConfirmation`);
    };

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            <p>Confirm your payment details here.</p>

            {loading ? (
                <p>Loading payment information...</p>
            ) : userProfile ? (
                <div className="credit-card-info">
                    <h3>Credit Card Information</h3>
                    {userProfile.creditCards && userProfile.creditCards.length > 0 ? (
                        userProfile.creditCards.map((card, index) => (
                            <div key={index}>
                                <p><strong>Card Ending:</strong> **** **** **** {card.cardLast4}</p>
                                <p><strong>Expiry Date:</strong> {card.expiryDate}</p>
                            </div>
                        ))
                    ) : (
                        <p>No credit card information found.</p>
                    )}
                </div>
            ) : (
                <p>No user profile found.</p>
            )}

            {orderData && (
                <div className="movie-details">
                    <h3>Movie: {orderData.movieName}</h3>
                    <p>Date: {orderData.selectedDate}</p>
                    <p>Time: {orderData.selectedTime}</p>
                    <h4>Seats Selected:</h4>
                    <ul>
                        {orderData.order.map((ticket) => (
                            <li key={ticket.seat}>{ticket.seat} ({ticket.age}): ${ticket.price.toFixed(2)}</li>
                        ))}
                    </ul>
                    <p><strong>Total: </strong>${orderData.orderTotal.toFixed(2)}</p>
                </div>
            )}

            <button onClick={handleCheckout} className="confirm-button">
                Complete Purchase
            </button>
        </div>
    );
}*/

/*
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchUserProfile } from '../movieService'; // Import the fetchUserProfile function

export default function CheckoutPage() {
    const router = useRouter();
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState(null);
    const [orderData, setOrderData] = useState(null);

    // Fetch user email from localStorage when the component mounts
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedEmail = localStorage.getItem('userEmail');
            if (storedEmail) {
                setEmail(storedEmail);
            } else {
                console.error('No email found in localStorage.');
            }
        }
    }, []);

    // Fetch user profile data if email is available
    useEffect(() => {
        if (email) {
            const getUserProfile = async () => {
                try {
                    const profile = await fetchUserProfile(email);
                    setUserProfile(profile);
                } catch (error) {
                    console.error('Failed to fetch user profile:', error);
                } finally {
                    setLoading(false);
                }
            };

            getUserProfile();
        } else {
            setLoading(false); // Stop loading if no email
        }
    }, [email]);

    // Fetch query parameters and set orderData
    useEffect(() => {
        const { searchParams } = new URL(window.location.href);
        const orderDataFromQuery = searchParams.get('orderData');
        if (orderDataFromQuery) {
            setOrderData(JSON.parse(orderDataFromQuery));
        }
    }, []);

    // Handle checkout confirmation (e.g., payment submission)
    const handleCheckout = () => {
        if (orderData) {
            // Add email, movie date, and movie time to orderData
            orderData.userEmail = email;
            orderData.movieDate = orderData.selectedDate; // Assuming selectedDate is set in orderData
            orderData.movieTime = orderData.selectedTime; // Assuming selectedTime is set in orderData

            const orderDataString = JSON.stringify(orderData);
            // Passing the orderData to OrderConfirmation page via query params
            router.push(`/OrderConfirmation?orderData=${encodeURIComponent(orderDataString)}`);
        }
    };

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            <p>Confirm your payment details here.</p>

            {loading ? (
                <p>Loading payment information...</p>
            ) : userProfile ? (
                <div className="credit-card-info">
                    <h3>Credit Card Information</h3>
                    {userProfile.creditCards && userProfile.creditCards.length > 0 ? (
                        userProfile.creditCards.map((card, index) => (
                            <div key={index}>
                                <p><strong>Card Ending:</strong> **** **** **** {card.cardLast4}</p>
                                <p><strong>Expiry Date:</strong> {card.expiryDate}</p>
                            </div>
                        ))
                    ) : (
                        <p>No credit card information found.</p>
                    )}
                </div>
            ) : (
                <p>No user profile found.</p>
            )}

            {orderData && (
                <div className="movie-details">
                    <h3>Movie: {orderData.movieName}</h3>
                    <p>Date: {orderData.selectedDate}</p>
                    <p>Time: {orderData.selectedTime}</p>
                    <h4>Seats Selected:</h4>
                    <ul>
                        {orderData.order.map((ticket) => (
                            <li key={ticket.seat}>{ticket.seat} ({ticket.age}): ${ticket.price.toFixed(2)}</li>
                        ))}
                    </ul>
                    <p><strong>Total: </strong>${orderData.orderTotal.toFixed(2)}</p>
                </div>
            )}

            <button onClick={handleCheckout} className="confirm-button">
                Complete Purchase
            </button>
        </div>
    );
}
*/

/*
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchUserProfile } from '../movieService'; // Import the fetchUserProfile function
import './page.css'; // Import the CSS file

export default function CheckoutPage() {
    const router = useRouter();
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState(null);
    const [orderData, setOrderData] = useState(null);

    // Fetch user email from localStorage when the component mounts
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedEmail = localStorage.getItem('userEmail');
            if (storedEmail) {
                setEmail(storedEmail);
            } else {
                console.error('No email found in localStorage.');
            }
        }
    }, []);

    // Fetch user profile data if email is available
    useEffect(() => {
        if (email) {
            const getUserProfile = async () => {
                try {
                    const profile = await fetchUserProfile(email);
                    setUserProfile(profile);
                } catch (error) {
                    console.error('Failed to fetch user profile:', error);
                } finally {
                    setLoading(false);
                }
            };

            getUserProfile();
        } else {
            setLoading(false); // Stop loading if no email
        }
    }, [email]);

    // Fetch query parameters and set orderData
    useEffect(() => {
        const { searchParams } = new URL(window.location.href);
        const orderDataFromQuery = searchParams.get('orderData');
        if (orderDataFromQuery) {
            setOrderData(JSON.parse(orderDataFromQuery));
        }
    }, []);

    // Handle checkout confirmation (e.g., payment submission)
    const handleCheckout = () => {
        if (orderData) {
            orderData.userEmail = email;
            orderData.movieDate = orderData.selectedDate;
            orderData.movieTime = orderData.selectedTime;

            const orderDataString = JSON.stringify(orderData);
            router.push(`/OrderConfirmation?orderData=${encodeURIComponent(orderDataString)}`);
        }
    };

    return (
        <div className="checkout-container">
            <h2 className="checkout-title">Checkout</h2>
            <p className="checkout-subtitle">Confirm your payment details below.</p>

            {loading ? (
                <p>Loading payment information...</p>
            ) : userProfile ? (
                <div className="credit-card-info">
                    <h3>Credit Card Information</h3>
                    {userProfile.creditCards && userProfile.creditCards.length > 0 ? (
                        userProfile.creditCards.map((card, index) => (
                            <div key={index} className="credit-card">
                                <p><strong>Card Ending:</strong> **** **** **** {card.cardLast4}</p>
                                <p><strong>Expiry Date:</strong> {card.expiryDate}</p>
                            </div>
                        ))
                    ) : (
                        <p>No credit card information found.</p>
                    )}
                </div>
            ) : (
                <p>No user profile found.</p>
            )}

            {orderData && (
                <div className="movie-details">
                    <h3>Movie: {orderData.movieName}</h3>
                    <p><strong>Date:</strong> {orderData.selectedDate}</p>
                    <p><strong>Time:</strong> {orderData.selectedTime}</p>
                    <h4>Seats Selected:</h4>
                    <ul className="seats-list">
                        {orderData.order.map((ticket) => (
                            <li key={ticket.seat}>{ticket.seat} ({ticket.age}): ${ticket.price.toFixed(2)}</li>
                        ))}
                    </ul>
                    <p className="total-amount"><strong>Total: </strong>${orderData.orderTotal.toFixed(2)}</p>
                </div>
            )}

            <button onClick={handleCheckout} className="confirm-button">
                Complete Purchase
            </button>
        </div>
    );
}
*/

"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchUserProfile } from '../movieService'; // Import the fetchUserProfile function
import './page.css'; // Import the CSS file

export default function CheckoutPage() {
    const router = useRouter();
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState(null);
    const [orderData, setOrderData] = useState(null);
    const [creditCardInfo, setCreditCardInfo] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    // Fetch user email from localStorage when the component mounts
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedEmail = localStorage.getItem('userEmail');
            if (storedEmail) {
                setEmail(storedEmail);
            } else {
                console.error('No email found in localStorage.');
            }
        }
    }, []);

    // Fetch user profile data if email is available
    useEffect(() => {
        if (email) {
            const getUserProfile = async () => {
                try {
                    const profile = await fetchUserProfile(email);
                    setUserProfile(profile);
                } catch (error) {
                    console.error('Failed to fetch user profile:', error);
                } finally {
                    setLoading(false);
                }
            };

            getUserProfile();
        } else {
            setLoading(false); // Stop loading if no email
        }
    }, [email]);

    // Fetch query parameters and set orderData
    useEffect(() => {
        const { searchParams } = new URL(window.location.href);
        const orderDataFromQuery = searchParams.get('orderData');
        if (orderDataFromQuery) {
            setOrderData(JSON.parse(orderDataFromQuery));
        }
    }, []);

    // Handle credit card input changes
    const handleCreditCardChange = (e) => {
        const { name, value } = e.target;
        setCreditCardInfo((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle checkout confirmation (e.g., payment submission)
    const handleCheckout = () => {
        if (orderData && (userProfile?.creditCards?.length > 0 || (creditCardInfo.cardNumber && creditCardInfo.expiryDate && creditCardInfo.cvv))) {
            // Add credit card info to order data if no card is stored
            if (userProfile?.creditCards?.length === 0) {
                orderData.creditCardInfo = creditCardInfo;
            }

            orderData.userEmail = email;
            orderData.movieDate = orderData.selectedDate;
            orderData.movieTime = orderData.selectedTime;

            const orderDataString = JSON.stringify(orderData);
            router.push(`/OrderConfirmation?orderData=${encodeURIComponent(orderDataString)}`);
        } else {
            alert('Please complete all credit card details before proceeding.');
        }
    };

    return (
        <div className="checkout-container">
            <h2 className="checkout-title">Checkout</h2>
            <p className="checkout-subtitle">Confirm your payment details below.</p>

            {loading ? (
                <p>Loading payment information...</p>
            ) : userProfile ? (
                <div className="credit-card-info">
                    <h3>Credit Card Information</h3>
                    {userProfile.creditCards && userProfile.creditCards.length > 0 ? (
                        userProfile.creditCards.map((card, index) => (
                            <div key={index} className="credit-card">
                                <p><strong>Card Ending:</strong> **** **** **** {card.cardLast4}</p>
                                <p><strong>Expiry Date:</strong> {card.expiryDate}</p>
                            </div>
                        ))
                    ) : (
                        <p>No credit card information found. Please enter your details below:</p>
                    )}
                </div>
            ) : (
                <p>No user profile found.</p>
            )}

            {orderData && (
                <div className="movie-details">
                    <h3>Movie: {orderData.movieName}</h3>
                    <p><strong>Date:</strong> {orderData.selectedDate}</p>
                    <p><strong>Time:</strong> {orderData.selectedTime}</p>
                    <h4>Seats Selected:</h4>
                    <ul className="seats-list">
                        {orderData.order.map((ticket) => (
                            <li key={ticket.seat}>{ticket.seat} ({ticket.age}): ${ticket.price.toFixed(2)}</li>
                        ))}
                    </ul>
                    <p className="total-amount"><strong>Total: </strong>${orderData.orderTotal.toFixed(2)}</p>
                </div>
            )}

            {userProfile?.creditCards?.length === 0 && (
                <div className="credit-card-form">
                    <div className="input-field">
                        <label htmlFor="cardNumber">Card Number</label>
                        <input
                            type="text"
                            name="cardNumber"
                            id="cardNumber"
                            value={creditCardInfo.cardNumber}
                            onChange={handleCreditCardChange}
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="expiryDate">Expiry Date (MM/YY)</label>
                        <input
                            type="text"
                            name="expiryDate"
                            id="expiryDate"
                            value={creditCardInfo.expiryDate}
                            onChange={handleCreditCardChange}
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="cvv">CVV</label>
                        <input
                            type="password"
                            name="cvv"
                            id="cvv"
                            value={creditCardInfo.cvv}
                            onChange={handleCreditCardChange}
                        />
                    </div>
                </div>
            )}

            <button onClick={handleCheckout} className="confirm-button">
                Complete Purchase
            </button>
        </div>
    );
}