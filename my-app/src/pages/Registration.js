// src/Registration.js
import React, { useState } from 'react';

const Registration = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [isRegistered, setIsRegistered] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can handle registration logic, e.g., API call to register the user
        setIsRegistered(true);
    };

    return (
        <div className="registration-container">
            {isRegistered ? (
                <h2>Registration Successful!</h2>
            ) : (
                <form className="registration-form" onSubmit={handleSubmit}>
                    <h1>Register</h1>
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="register-button">Register</button>
                </form>
            )}
        </div>
    );
};

export default Registration;
