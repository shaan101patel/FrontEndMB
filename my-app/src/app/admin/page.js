"use client";

import React from 'react';

export default function AdminMain() {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ marginBottom: '20px', color: '#333' }}>Admin Dashboard</h1>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                maxWidth: '600px',
                margin: '0 auto'
            }}>
                <div style={{
                    padding: '15px',
                    borderRadius: '4px',
                    backgroundColor: '#eaf2f8',
                    border: '1px solid #ddd',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}>
                    <h2 style={{ margin: '0 0 10px', color: '#007bff' }}>Manage Movies</h2>
                    <p style={{ margin: '0', color: '#666' }}>View and manage the list of movies. Add, edit, or remove movies.</p>
                </div>
                <div style={{
                    padding: '15px',
                    borderRadius: '4px',
                    backgroundColor: '#eaf2f8',
                    border: '1px solid #ddd',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}>
                    <h2 style={{ margin: '0 0 10px', color: '#007bff' }}>Manage Users</h2>
                    <p style={{ margin: '0', color: '#666' }}>View and manage the list of users. Add, edit, or remove user accounts.</p>
                </div>
                <div style={{
                    padding: '15px',
                    borderRadius: '4px',
                    backgroundColor: '#eaf2f8',
                    border: '1px solid #ddd',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}>
                    <h2 style={{ margin: '0 0 10px', color: '#007bff' }}>Manage Promotions</h2>
                    <p style={{ margin: '0', color: '#666' }}>View and manage promotions. Add, edit, or remove promotional offers.</p>
                </div>
            </div>
        </div>
    );
}
