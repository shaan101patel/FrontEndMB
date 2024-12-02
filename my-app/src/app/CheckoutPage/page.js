/*"use client";

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
            orderData.movieName = orderData.movieName; // Include movieName explicitly


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
}*/

/*"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchUserProfile, updateUserProfile } from '../movieService'; // Import both functions
import './page.css';

export default function CheckoutPage() {
    const router = useRouter();
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState(null);
    const [orderData, setOrderData] = useState(null);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null); // Index of selected card
    const [newCreditCard, setNewCreditCard] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });

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
            setLoading(false);
        }
    }, [email]);

    useEffect(() => {
        const { searchParams } = new URL(window.location.href);
        const orderDataFromQuery = searchParams.get('orderData');
        if (orderDataFromQuery) {
            setOrderData(JSON.parse(orderDataFromQuery));
        }
    }, []);

    const handleCardSelect = (index) => {
        setSelectedCardIndex(index);
    };

    const handleCreditCardChange = (e) => {
        const { name, value } = e.target;
        setNewCreditCard((prevState) => ({ ...prevState, [name]: value }));
    };

    const addCreditCard = async () => {
        if (!newCreditCard.cardNumber || !newCreditCard.expiryDate || !newCreditCard.cvv) {
            alert('Please fill in all credit card details.');
            return;
        }

        if (userProfile?.creditCards.length >= 3) {
            alert('You cannot add more than 3 credit cards.');
            return;
        }

        const cardLast4 = newCreditCard.cardNumber.slice(-4);

        const updatedCards = [
            ...userProfile.creditCards,
            {
                cardLast4,
                expiryDate: newCreditCard.expiryDate,
                cvv: newCreditCard.cvv,
            },
        ];

        try {
            await updateUserProfile({
                ...userProfile,
                creditCards: updatedCards,
            });
            setUserProfile((prev) => ({
                ...prev,
                creditCards: updatedCards,
            }));
            setNewCreditCard({ cardNumber: '', expiryDate: '', cvv: '' });
            alert('Card added successfully!');
        } catch (error) {
            console.error('Failed to update profile:', error);
            alert('Failed to add credit card.');
        }
    };

    const handleCheckout = () => {
        if (
            orderData &&
            (selectedCardIndex !== null || (newCreditCard.cardNumber && newCreditCard.expiryDate && newCreditCard.cvv))
        ) {
            orderData.userEmail = email;
            orderData.movieDate = orderData.selectedDate;
            orderData.movieTime = orderData.selectedTime;
            orderData.movieName = orderData.movieName;

            if (selectedCardIndex !== null) {
                const selectedCard = userProfile.creditCards[selectedCardIndex];
                orderData.creditCardInfo = {
                    cardLast4: selectedCard.cardLast4,
                    expiryDate: selectedCard.expiryDate,
                };
            } else {
                orderData.creditCardInfo = newCreditCard;
            }

            const orderDataString = JSON.stringify(orderData);
            router.push(`/OrderConfirmation?orderData=${encodeURIComponent(orderDataString)}`);
        } else {
            alert('Please complete all payment details before proceeding.');
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
                    <h3>Select a Credit Card</h3>
                    {userProfile.creditCards && userProfile.creditCards.length > 0 ? (
                        userProfile.creditCards.map((card, index) => (
                            <div key={index} className="credit-card">
                                <input
                                    type="radio"
                                    name="selectedCard"
                                    id={`card-${index}`}
                                    checked={selectedCardIndex === index}
                                    onChange={() => handleCardSelect(index)}
                                />
                                <label htmlFor={`card-${index}`}>
                                    <strong>Card Ending:</strong> **** **** **** {card.cardLast4}{' '}
                                    <strong>Expiry:</strong> {card.expiryDate}
                                </label>
                            </div>
                        ))
                    ) : (
                        <p>No credit card information found. Please add one below.</p>
                    )}
                </div>
            ) : (
                <p>No user profile found.</p>
            )}

            {userProfile?.creditCards.length < 3 && (
                <div className="credit-card-form">
                    <h3>Add a New Credit Card</h3>
                    <div className="input-field">
                        <label htmlFor="cardNumber">Card Number</label>
                        <input
                            type="text"
                            name="cardNumber"
                            id="cardNumber"
                            value={newCreditCard.cardNumber}
                            onChange={handleCreditCardChange}
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="expiryDate">Expiry Date (MM/YY)</label>
                        <input
                            type="text"
                            name="expiryDate"
                            id="expiryDate"
                            value={newCreditCard.expiryDate}
                            onChange={handleCreditCardChange}
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="cvv">CVV</label>
                        <input
                            type="password"
                            name="cvv"
                            id="cvv"
                            value={newCreditCard.cvv}
                            onChange={handleCreditCardChange}
                        />
                    </div>
                    <button onClick={addCreditCard} className="add-card-button">
                        Add Credit Card
                    </button>
                </div>
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
import { fetchUserProfile, updateUserProfile } from '../movieService'; // Import both functions
import './page.css';

export default function CheckoutPage() {
    const router = useRouter();
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState(null);
    const [orderData, setOrderData] = useState(null);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null); // Index of selected card
    const [newCreditCard, setNewCreditCard] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });

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
            setLoading(false);
        }
    }, [email]);

    useEffect(() => {
        const { searchParams } = new URL(window.location.href);
        const orderDataFromQuery = searchParams.get('orderData');
        if (orderDataFromQuery) {
            setOrderData(JSON.parse(orderDataFromQuery));
        }
    }, []);

    const handleCardSelect = (index) => {
        setSelectedCardIndex(index);
    };

    const handleCreditCardChange = (e) => {
        const { name, value } = e.target;
        setNewCreditCard((prevState) => ({ ...prevState, [name]: value }));
    };

    const addCreditCard = async () => {
        if (!newCreditCard.cardNumber || !newCreditCard.expiryDate || !newCreditCard.cvv) {
            alert('Please fill in all credit card details.');
            return;
        }

        if (userProfile?.creditCards.length >= 3) {
            alert('You cannot add more than 3 credit cards.');
            return;
        }

        const cardLast4 = newCreditCard.cardNumber.slice(-4);

        const updatedCards = [
            ...userProfile.creditCards,
            {
                cardLast4,
                expiryDate: newCreditCard.expiryDate,
                cvv: newCreditCard.cvv,
            },
        ];

        try {
            await updateUserProfile({
                ...userProfile,
                creditCards: updatedCards,
            });
            setUserProfile((prev) => ({
                ...prev,
                creditCards: updatedCards,
            }));
            setNewCreditCard({ cardNumber: '', expiryDate: '', cvv: '' });
            alert('Card added successfully!');
        } catch (error) {
            console.error('Failed to update profile:', error);
            alert('Failed to add credit card.');
        }
    };

    const handleCheckout = () => {
        if (
            orderData &&
            (selectedCardIndex !== null || (newCreditCard.cardNumber && newCreditCard.expiryDate && newCreditCard.cvv))
        ) {
            orderData.userEmail = email;
            orderData.movieDate = orderData.selectedDate;
            orderData.movieTime = orderData.selectedTime;
            orderData.movieName = orderData.movieName;

            if (selectedCardIndex !== null) {
                const selectedCard = userProfile.creditCards[selectedCardIndex];
                orderData.creditCardInfo = {
                    cardLast4: selectedCard.cardLast4,
                    expiryDate: selectedCard.expiryDate,
                };
            } else {
                orderData.creditCardInfo = {
                    cardLast4: newCreditCard.cardNumber.slice(-4),
                    expiryDate: newCreditCard.expiryDate,
                };
            }

            const orderDataString = JSON.stringify(orderData);
            router.push(`/OrderConfirmation?orderData=${encodeURIComponent(orderDataString)}`);
        } else {
            alert('Please complete all payment details before proceeding.');
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
                    <h3>Select a Credit Card</h3>
                    {userProfile.creditCards && userProfile.creditCards.length > 0 ? (
                        userProfile.creditCards.map((card, index) => (
                            <div key={index} className="credit-card">
                                <input
                                    type="radio"
                                    name="selectedCard"
                                    id={`card-${index}`}
                                    checked={selectedCardIndex === index}
                                    onChange={() => handleCardSelect(index)}
                                />
                                <label htmlFor={`card-${index}`}>
                                    <strong>Card Ending:</strong> **** **** **** {card.cardLast4}{' '}
                                    <strong>Expiry:</strong> {card.expiryDate}
                                </label>
                            </div>
                        ))
                    ) : (
                        <p>No credit card information found. Please add one below.</p>
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

            {userProfile?.creditCards.length < 3 && (
                <div className="credit-card-form">
                    <h3>Add a New Credit Card</h3>
                    <div className="input-field">
                        <label htmlFor="cardNumber">Card Number</label>
                        <input
                            type="text"
                            name="cardNumber"
                            id="cardNumber"
                            value={newCreditCard.cardNumber}
                            onChange={handleCreditCardChange}
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="expiryDate">Expiry Date (MM/YY)</label>
                        <input
                            type="text"
                            name="expiryDate"
                            id="expiryDate"
                            value={newCreditCard.expiryDate}
                            onChange={handleCreditCardChange}
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="cvv">CVV</label>
                        <input
                            type="password"
                            name="cvv"
                            id="cvv"
                            value={newCreditCard.cvv}
                            onChange={handleCreditCardChange}
                        />
                    </div>
                    <button onClick={addCreditCard} className="add-card-button">
                        Add Credit Card
                    </button>
                </div>
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
import { fetchUserProfile, updateUserProfile, fetchPromotions } from '../movieService'; // Import fetchPromotions
import './page.css';

export default function CheckoutPage() {
    const router = useRouter();
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState(null);
    const [orderData, setOrderData] = useState(null);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [newCreditCard, setNewCreditCard] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });
    const [promotions, setPromotions] = useState([]); // State to store promotions
    const [selectedPromotion, setSelectedPromotion] = useState(null); // Store selected promotion

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
            setLoading(false);
        }
    }, [email]);

    useEffect(() => {
        const { searchParams } = new URL(window.location.href);
        const orderDataFromQuery = searchParams.get('orderData');
        if (orderDataFromQuery) {
            setOrderData(JSON.parse(orderDataFromQuery));
        }
    }, []);

    useEffect(() => {
        const loadPromotions = async () => {
            try {
                const fetchedPromotions = await fetchPromotions();
                setPromotions(fetchedPromotions);
            } catch (error) {
                console.error('Failed to fetch promotions:', error);
            }
        };

        loadPromotions();
    }, []);

    const handleCardSelect = (index) => {
        setSelectedCardIndex(index);
    };

    const handleCreditCardChange = (e) => {
        const { name, value } = e.target;
        setNewCreditCard((prevState) => ({ ...prevState, [name]: value }));
    };

    const addCreditCard = async () => {
        if (!newCreditCard.cardNumber || !newCreditCard.expiryDate || !newCreditCard.cvv) {
            alert('Please fill in all credit card details.');
            return;
        }

        if (userProfile?.creditCards.length >= 3) {
            alert('You cannot add more than 3 credit cards.');
            return;
        }

        const cardLast4 = newCreditCard.cardNumber.slice(-4);

        const updatedCards = [
            ...userProfile.creditCards,
            {
                cardLast4,
                expiryDate: newCreditCard.expiryDate,
                cvv: newCreditCard.cvv,
            },
        ];

        try {
            await updateUserProfile({
                ...userProfile,
                creditCards: updatedCards,
            });
            setUserProfile((prev) => ({
                ...prev,
                creditCards: updatedCards,
            }));
            setNewCreditCard({ cardNumber: '', expiryDate: '', cvv: '' });
            alert('Card added successfully!');
        } catch (error) {
            console.error('Failed to update profile:', error);
            alert('Failed to add credit card.');
        }
    };

    const handlePromotionSelect = (promotion) => {
        setSelectedPromotion(promotion);
    };

    const handleCheckout = () => {
        if (
            orderData &&
            (selectedCardIndex !== null || (newCreditCard.cardNumber && newCreditCard.expiryDate && newCreditCard.cvv))
        ) {
            orderData.userEmail = email;
            orderData.movieDate = orderData.selectedDate;
            orderData.movieTime = orderData.selectedTime;
            orderData.movieName = orderData.movieName;

            if (selectedCardIndex !== null) {
                const selectedCard = userProfile.creditCards[selectedCardIndex];
                orderData.creditCardInfo = {
                    cardLast4: selectedCard.cardLast4,
                    expiryDate: selectedCard.expiryDate,
                };
            } else {
                orderData.creditCardInfo = {
                    cardLast4: newCreditCard.cardNumber.slice(-4),
                    expiryDate: newCreditCard.expiryDate,
                };
            }

            // Apply promotion discount if selected
            if (selectedPromotion) {
                const discountAmount = (orderData.orderTotal * selectedPromotion.discount) / 100;
                orderData.orderTotal -= discountAmount;
            }

            const orderDataString = JSON.stringify(orderData);
            router.push(`/OrderConfirmation?orderData=${encodeURIComponent(orderDataString)}`);
        } else {
            alert('Please complete all payment details before proceeding.');
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
                    <h3>Select a Credit Card</h3>
                    {userProfile.creditCards && userProfile.creditCards.length > 0 ? (
                        userProfile.creditCards.map((card, index) => (
                            <div key={index} className="credit-card">
                                <input
                                    type="radio"
                                    name="selectedCard"
                                    id={`card-${index}`}
                                    checked={selectedCardIndex === index}
                                    onChange={() => handleCardSelect(index)}
                                />
                                <label htmlFor={`card-${index}`}>
                                    <strong>Card Ending:</strong> **** **** **** {card.cardLast4}{' '}
                                    <strong>Expiry:</strong> {card.expiryDate}
                                </label>
                            </div>
                        ))
                    ) : (
                        <p>No credit card information found. Please add one below.</p>
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

            {promotions.length > 0 && (
                <div className="promotion-section">
                    <h3>Select a Promotion</h3>
                    {promotions.map((promotion, index) => (
                        <div key={index} className="promotion">
                            <input
                                type="radio"
                                name="promotion"
                                id={`promotion-${index}`}
                                checked={selectedPromotion === promotion}
                                onChange={() => handlePromotionSelect(promotion)}
                            />
                            <label htmlFor={`promotion-${index}`}>
                                <strong>{promotion.title}</strong> - {promotion.discount}% off
                            </label>
                        </div>
                    ))}
                </div>
            )}

            {userProfile?.creditCards.length < 3 && (
                <div className="credit-card-form">
                    <h3>Add a New Credit Card</h3>
                    <div className="input-field">
                        <label htmlFor="cardNumber">Card Number</label>
                        <input
                            type="text"
                            name="cardNumber"
                            id="cardNumber"
                            value={newCreditCard.cardNumber}
                            onChange={handleCreditCardChange}
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="expiryDate">Expiry Date (MM/YY)</label>
                        <input
                            type="text"
                            name="expiryDate"
                            id="expiryDate"
                            value={newCreditCard.expiryDate}
                            onChange={handleCreditCardChange}
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="cvv">CVV</label>
                        <input
                            type="password"
                            name="cvv"
                            id="cvv"
                            value={newCreditCard.cvv}
                            onChange={handleCreditCardChange}
                        />
                    </div>
                    <button onClick={addCreditCard} className="add-card-button">
                        Add Credit Card
                    </button>
                </div>
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
import { fetchUserProfile, updateUserProfile, fetchPromotions } from '../movieService'; // Import fetchPromotions
import './page.css';

export default function CheckoutPage() {
    const router = useRouter();
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState(null);
    const [orderData, setOrderData] = useState(null);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [newCreditCard, setNewCreditCard] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });
    const [promotions, setPromotions] = useState([]); // State to store promotions
    const [promotionCode, setPromotionCode] = useState(''); // State for entered promotion code
    const [selectedPromotion, setSelectedPromotion] = useState(null); // Store selected promotion

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
            setLoading(false);
        }
    }, [email]);

    useEffect(() => {
        const { searchParams } = new URL(window.location.href);
        const orderDataFromQuery = searchParams.get('orderData');
        if (orderDataFromQuery) {
            setOrderData(JSON.parse(orderDataFromQuery));
        }
    }, []);

    useEffect(() => {
        const loadPromotions = async () => {
            try {
                const fetchedPromotions = await fetchPromotions();
                setPromotions(fetchedPromotions);
            } catch (error) {
                console.error('Failed to fetch promotions:', error);
            }
        };

        loadPromotions();
    }, []);

    const handleCardSelect = (index) => {
        setSelectedCardIndex(index);
    };

    const handleCreditCardChange = (e) => {
        const { name, value } = e.target;
        setNewCreditCard((prevState) => ({ ...prevState, [name]: value }));
    };

    const addCreditCard = async () => {
        if (!newCreditCard.cardNumber || !newCreditCard.expiryDate || !newCreditCard.cvv) {
            alert('Please fill in all credit card details.');
            return;
        }

        if (userProfile?.creditCards.length >= 3) {
            alert('You cannot add more than 3 credit cards.');
            return;
        }

        const cardLast4 = newCreditCard.cardNumber.slice(-4);

        const updatedCards = [
            ...userProfile.creditCards,
            {
                cardLast4,
                expiryDate: newCreditCard.expiryDate,
                cvv: newCreditCard.cvv,
            },
        ];

        try {
            await updateUserProfile({
                ...userProfile,
                creditCards: updatedCards,
            });
            setUserProfile((prev) => ({
                ...prev,
                creditCards: updatedCards,
            }));
            setNewCreditCard({ cardNumber: '', expiryDate: '', cvv: '' });
            alert('Card added successfully!');
        } catch (error) {
            console.error('Failed to update profile:', error);
            alert('Failed to add credit card.');
        }
    };

    const handlePromotionCodeChange = (e) => {
        setPromotionCode(e.target.value);
    };

    const handleApplyPromotion = () => {
        const matchedPromotion = promotions.find(promotion => promotion.title === promotionCode);
        if (matchedPromotion) {
            setSelectedPromotion(matchedPromotion);
            alert('Promotion applied successfully!');
        } else {
            alert('Invalid promotion code.');
        }
    };

    const handleCheckout = () => {
        if (
            orderData &&
            (selectedCardIndex !== null || (newCreditCard.cardNumber && newCreditCard.expiryDate && newCreditCard.cvv))
        ) {
            orderData.userEmail = email;
            orderData.movieDate = orderData.selectedDate;
            orderData.movieTime = orderData.selectedTime;
            orderData.movieName = orderData.movieName;

            if (selectedCardIndex !== null) {
                const selectedCard = userProfile.creditCards[selectedCardIndex];
                orderData.creditCardInfo = {
                    cardLast4: selectedCard.cardLast4,
                    expiryDate: selectedCard.expiryDate,
                };
            } else {
                orderData.creditCardInfo = {
                    cardLast4: newCreditCard.cardNumber.slice(-4),
                    expiryDate: newCreditCard.expiryDate,
                };
            }

            // Apply promotion discount if selected
            if (selectedPromotion) {
                const discountAmount = (orderData.orderTotal * selectedPromotion.discount) / 100;
                orderData.orderTotal -= discountAmount;
            }

            const orderDataString = JSON.stringify(orderData);
            router.push(`/OrderConfirmation?orderData=${encodeURIComponent(orderDataString)}`);
        } else {
            alert('Please complete all payment details before proceeding.');
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
                    <h3>Select a Credit Card</h3>
                    {userProfile.creditCards && userProfile.creditCards.length > 0 ? (
                        userProfile.creditCards.map((card, index) => (
                            <div key={index} className="credit-card">
                                <input
                                    type="radio"
                                    name="selectedCard"
                                    id={`card-${index}`}
                                    checked={selectedCardIndex === index}
                                    onChange={() => handleCardSelect(index)}
                                />
                                <label htmlFor={`card-${index}`}>
                                    <strong>Card Ending:</strong> **** **** **** {card.cardLast4}{' '}
                                    <strong>Expiry:</strong> {card.expiryDate}
                                </label>
                            </div>
                        ))
                    ) : (
                        <p>No credit card information found. Please add one below.</p>
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

            <div className="promotion-section">
                <h3>Enter Promotion Code</h3>
                <input
                    type="text"
                    value={promotionCode}
                    onChange={handlePromotionCodeChange}
                    placeholder="Enter promotion code"
                />
                <button onClick={handleApplyPromotion}>Apply Promotion</button>
            </div>

            {userProfile?.creditCards.length < 3 && (
                <div className="credit-card-form">
                    <h3>Add a New Credit Card</h3>
                    <div className="input-field">
                        <label htmlFor="cardNumber">Card Number</label>
                        <input
                            type="text"
                            name="cardNumber"
                            id="cardNumber"
                            value={newCreditCard.cardNumber}
                            onChange={handleCreditCardChange}
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="expiryDate">Expiry Date (MM/YY)</label>
                        <input
                            type="text"
                            name="expiryDate"
                            id="expiryDate"
                            value={newCreditCard.expiryDate}
                            onChange={handleCreditCardChange}
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="cvv">CVV</label>
                        <input
                            type="password"
                            name="cvv"
                            id="cvv"
                            value={newCreditCard.cvv}
                            onChange={handleCreditCardChange}
                        />
                    </div>
                    <button onClick={addCreditCard} className="add-card-button">
                        Add Credit Card
                    </button>
                </div>
            )}

            <button onClick={handleCheckout} className="confirm-button">
                Complete Purchase
            </button>
        </div>
    );
}*/

"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchUserProfile, updateUserProfile, fetchPromotions } from '../movieService'; // Import fetchPromotions
import './page.css';

export default function CheckoutPage() {
    const router = useRouter();
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState(null);
    const [orderData, setOrderData] = useState(null);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [newCreditCard, setNewCreditCard] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });
    const [promotions, setPromotions] = useState([]); // State to store promotions
    const [promotionCode, setPromotionCode] = useState(''); // State for entered promotion code
    const [selectedPromotion, setSelectedPromotion] = useState(null); // Store selected promotion

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
            setLoading(false);
        }
    }, [email]);

    useEffect(() => {
        const { searchParams } = new URL(window.location.href);
        const orderDataFromQuery = searchParams.get('orderData');
        if (orderDataFromQuery) {
            setOrderData(JSON.parse(orderDataFromQuery));
        }
    }, []);

    useEffect(() => {
        const loadPromotions = async () => {
            try {
                const fetchedPromotions = await fetchPromotions();
                setPromotions(fetchedPromotions);
            } catch (error) {
                console.error('Failed to fetch promotions:', error);
            }
        };

        loadPromotions();
    }, []);

    const handleCardSelect = (index) => {
        setSelectedCardIndex(index);
    };

    const handleCreditCardChange = (e) => {
        const { name, value } = e.target;
        setNewCreditCard((prevState) => ({ ...prevState, [name]: value }));
    };

    const addCreditCard = async () => {
        if (!newCreditCard.cardNumber || !newCreditCard.expiryDate || !newCreditCard.cvv) {
            alert('Please fill in all credit card details.');
            return;
        }

        if (userProfile?.creditCards.length >= 3) {
            alert('You cannot add more than 3 credit cards.');
            return;
        }

        const cardLast4 = newCreditCard.cardNumber.slice(-4);

        const updatedCards = [
            ...userProfile.creditCards,
            {
                cardLast4,
                expiryDate: newCreditCard.expiryDate,
                cvv: newCreditCard.cvv,
            },
        ];

        try {
            await updateUserProfile({
                ...userProfile,
                creditCards: updatedCards,
            });
            setUserProfile((prev) => ({
                ...prev,
                creditCards: updatedCards,
            }));
            setNewCreditCard({ cardNumber: '', expiryDate: '', cvv: '' });
            alert('Card added successfully!');
        } catch (error) {
            console.error('Failed to update profile:', error);
            alert('Failed to add credit card.');
        }
    };

    const handlePromotionCodeChange = (e) => {
        setPromotionCode(e.target.value);
    };

    const handleApplyPromotion = () => {
        const matchedPromotion = promotions.find(promotion => promotion.title === promotionCode);
        if (matchedPromotion) {
            setSelectedPromotion(matchedPromotion);
            const discountAmount = (orderData.orderTotal * matchedPromotion.discount) / 100;
            const updatedTotal = orderData.orderTotal - discountAmount;
            setOrderData(prevOrderData => ({
                ...prevOrderData,
                orderTotal: updatedTotal, // Update the total with the new amount after applying the promotion
            }));
            alert('Promotion applied successfully!');
        } else {
            alert('Invalid promotion code.');
        }
    };

    const handleCheckout = () => {
        if (
            orderData &&
            (selectedCardIndex !== null || (newCreditCard.cardNumber && newCreditCard.expiryDate && newCreditCard.cvv))
        ) {
            orderData.userEmail = email;
            orderData.movieDate = orderData.selectedDate;
            orderData.movieTime = orderData.selectedTime;
            orderData.movieName = orderData.movieName;

            if (selectedCardIndex !== null) {
                const selectedCard = userProfile.creditCards[selectedCardIndex];
                orderData.creditCardInfo = {
                    cardLast4: selectedCard.cardLast4,
                    expiryDate: selectedCard.expiryDate,
                };
            } else {
                orderData.creditCardInfo = {
                    cardLast4: newCreditCard.cardNumber.slice(-4),
                    expiryDate: newCreditCard.expiryDate,
                };
            }

            // Apply promotion discount if selected
            /*if (selectedPromotion) {
                const discountAmount = (orderData.orderTotal * selectedPromotion.discount) / 100;
                orderData.orderTotal -= discountAmount;
            }*/

            const orderDataString = JSON.stringify(orderData);
            router.push(`/OrderConfirmation?orderData=${encodeURIComponent(orderDataString)}`);
        } else {
            alert('Please complete all payment details before proceeding.');
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
                    <h3>Select a Credit Card</h3>
                    {userProfile.creditCards && userProfile.creditCards.length > 0 ? (
                        userProfile.creditCards.map((card, index) => (
                            <div key={index} className="credit-card">
                                <input
                                    type="radio"
                                    name="selectedCard"
                                    id={`card-${index}`}
                                    checked={selectedCardIndex === index}
                                    onChange={() => handleCardSelect(index)}
                                />
                                <label htmlFor={`card-${index}`}>
                                    <strong>Card Ending:</strong> **** **** **** {card.cardLast4}{' '}
                                    <strong>Expiry:</strong> {card.expiryDate}
                                </label>
                            </div>
                        ))
                    ) : (
                        <p>No credit card information found. Please add one below.</p>
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
                    <p className="total-amount">
                        <strong>Total: </strong>
                        ${orderData?.orderTotal?.toFixed(2) || '0.00'}
                    </p>
                </div>
            )}

            <div className="promotion-section">
                <h3>Enter Promotion Code</h3>
                <input
                    type="text"
                    value={promotionCode}
                    onChange={handlePromotionCodeChange}
                    placeholder="Enter promotion code"
                />
                <button onClick={handleApplyPromotion}>Apply Promotion</button>
            </div>

            {userProfile?.creditCards.length < 3 && (
                <div className="credit-card-form">
                    <h3>Add a New Credit Card</h3>
                    <div className="input-field">
                        <label htmlFor="cardNumber">Card Number</label>
                        <input
                            type="text"
                            name="cardNumber"
                            id="cardNumber"
                            value={newCreditCard.cardNumber}
                            onChange={handleCreditCardChange}
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="expiryDate">Expiry Date (MM/YY)</label>
                        <input
                            type="text"
                            name="expiryDate"
                            id="expiryDate"
                            value={newCreditCard.expiryDate}
                            onChange={handleCreditCardChange}
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="cvv">CVV</label>
                        <input
                            type="password"
                            name="cvv"
                            id="cvv"
                            value={newCreditCard.cvv}
                            onChange={handleCreditCardChange}
                        />
                    </div>
                    <button onClick={addCreditCard}>Add Credit Card</button>
                </div>
            )}

            <div className="checkout-buttons">
                <button onClick={handleCheckout} className="checkout-button">Proceed to Payment</button>
            </div>
        </div>
    );
}
