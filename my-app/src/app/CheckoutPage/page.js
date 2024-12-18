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
    const [creditCardMessage, setCreditCardMessage] = useState('');
    const [cardMessageType, setCardMessageType] = useState(''); // success or error

    const [promotions, setPromotions] = useState([]); // State to store promotions
    const [promotionCode, setPromotionCode] = useState(''); // State for entered promotion code
    const [selectedPromotion, setSelectedPromotion] = useState(null); // Store selected promotion
    const [promotionMessage, setPromotionMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // success or error

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
        // Validate that the card number is exactly 16 digits
        const isCardNumberValid = /^[0-9]{16}$/.test(newCreditCard.cardNumber);
        if (!isCardNumberValid) {
            setCreditCardMessage('Please enter a valid 16-digit credit card number.');
            setCardMessageType('error');
            return;
        }

        if (!newCreditCard.expiryDate || !newCreditCard.cvv) {
            setCreditCardMessage('Please fill in all credit card details.');
            setCardMessageType('error');
            return;
        }

        if (userProfile?.creditCards.length >= 3) {
            setCreditCardMessage('You cannot add more than 3 credit cards.');
            setCardMessageType('error');
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
            setCreditCardMessage('Card added successfully!');
            setCardMessageType('success');
        } catch (error) {
            console.error('Failed to update profile:', error);
            setCreditCardMessage('Failed to add credit card.');
            setCardMessageType('error');
        }
    };

    const handlePromotionCodeChange = (e) => {
        setPromotionCode(e.target.value);
    };

    const handleApplyPromotion = () => {
        const matchedPromotion = promotions.find(promotion => promotion.code === promotionCode);
        if (matchedPromotion) {
            setSelectedPromotion(matchedPromotion);
            const discountAmount = (orderData.orderTotal * matchedPromotion.discount) / 100;
            const updatedTotal = orderData.orderTotal - discountAmount;
            setOrderData(prevOrderData => ({
                ...prevOrderData,
                orderTotal: updatedTotal,
            }));
            setPromotionMessage('Promotion applied successfully!');
            setMessageType('success');
        } else {
            setPromotionMessage('Invalid promotion code.');
            setMessageType('error');
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
                </div>
            )}

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
                    <button onClick={addCreditCard}>Add Credit Card</button>

                    {/* Display the credit card message */}
                    {creditCardMessage && (
                        <p className={`credit-card-message ${cardMessageType === 'success' ? 'success' : 'error'}`}>
                            {creditCardMessage}
                        </p>
                    )}
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

                {promotionMessage && (
                    <p className={`promotion-message ${messageType === 'success' ? 'success' : 'error'}`}>
                        {promotionMessage}
                    </p>
                )}
            </div>

            <div className="checkout-buttons">
                <button onClick={handleCheckout} className="checkout-button">Proceed to Payment</button>
            </div>

            {orderData && (
                <div className="order-total">
                    <p><strong>Total: </strong>${(orderData?.orderTotal).toFixed(2) || '0.00'}</p>
                </div>
            )}
        </div>
    );
}

