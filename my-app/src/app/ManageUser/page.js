"use client";

import React, { useState } from 'react';
import './page.css';

export default function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', email: '', registeredOn: '' });

    // Function to add a new user to the list
    const handleAddUser = () => {
        if (!newUser.name || !newUser.email || !newUser.registeredOn) {
            alert("Please fill in all fields.");
            return;
        }

        const updatedUsers = [
            ...users,
            { id: users.length + 1, ...newUser },
        ];
        setUsers(updatedUsers);
        setNewUser({ name: '', email: '', registeredOn: '' });
    };

    // Function to delete a user from the list
    const handleDeleteUser = (id) => {
        const updatedUsers = users.filter(user => user.id !== id);
        setUsers(updatedUsers);
    };

    return (
        <div className="users-container card">
            <h2 className="users-title">Manage Users</h2>

            <div className="add-user-section">
                <h3 className="section-subtitle">Add New User</h3>
                <input
                    type="text"
                    placeholder="User Name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="input-field"
                />
                <input
                    type="email"
                    placeholder="Email Address"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="input-field"
                />
                <input
                    type="date"
                    value={newUser.registeredOn}
                    onChange={(e) => setNewUser({ ...newUser, registeredOn: e.target.value })}
                    className="input-field"
                />
                <button
                    onClick={handleAddUser}
                    className="add-button"
                >
                    Add User
                </button>
            </div>

            <ul className="users-list">
                {users.map((user) => (
                    <li key={user.id} className="user-item">
                        <div>
                            <p className="user-name">{user.name}</p>
                            <p className="user-details">Email: {user.email}</p>
                            <p className="user-details">Registered On: {user.registeredOn}</p>
                        </div>
                        <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="delete-button"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}


