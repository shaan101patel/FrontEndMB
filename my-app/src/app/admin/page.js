// app/admin/page.js

"use client";

import React from 'react';
import './page.css'; // Import the CSS file

export default function AdminMain() {
    return (
        <div className="admin-container">
            <h1 className="admin-title">Admin Dashboard</h1>
            <div className="admin-content">
                <div className="admin-card">
                    <h2 className="admin-card-title">Manage Movies</h2>
                    <p className="admin-card-text">View and manage the list of movies. Add, edit, or remove movies.</p>
                </div>
                <div className="admin-card">
                    <h2 className="admin-card-title">Manage Users</h2>
                    <p className="admin-card-text">View and manage the list of users. Add, edit, or remove user accounts.</p>
                </div>
                <div className="admin-card">
                    <h2 className="admin-card-title">Manage Promotions</h2>
                    <p className="admin-card-text">View and manage promotions. Add, edit, or remove promotional offers.</p>
                </div>
            </div>
        </div>
    );
}
