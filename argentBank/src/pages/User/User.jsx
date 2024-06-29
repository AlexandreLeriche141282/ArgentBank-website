import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { AuthContext } from '../../services/AuthContext';
import './user.css';

export default function User() {
    const [userData, setUserData] = useState({ firstName: '', lastName: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState({ firstName: '', lastName: '' });
    const { token, updateUserName } = useContext(AuthContext);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.post('http://localhost:3001/api/v1/user/profile', {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUserData(response.data.body);
                setEditedName(response.data.body);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [token]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put('http://localhost:3001/api/v1/user/profile', editedName, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUserData(editedName);
            setIsEditing(false);
            updateUserName(editedName.firstName); // Mise à jour du nom dans le contexte d'authentification
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    const handleInputChange = (e) => {
        setEditedName({ ...editedName, [e.target.name]: e.target.value });
    };

    return (
        <main className="main bg-dark">
            <div className="header">
                {isEditing ? (
                    <form className="form-edit" onSubmit={handleSaveClick} >
                        <h1>Edit User Info</h1>
                        <div>
            <label htmlFor="lastName">Last name:</label>
            <input
                type="text"
                id="username"
                name="username"
                value={editedName.userName}
                onChange={handleInputChange}
            />
        </div>
        <div>
            <label htmlFor="firstName">First name:</label>
            <input
                type="text"
                id="firstName"
                name="firstName"
                value={editedName.firstName}
                readOnly
            />
        </div>
        <div>
            <label htmlFor="lastName">Last name:</label>
            <input
                type="text"
                id="lastName"
                name="lastName"
                value={editedName.lastName}
                readOnly
            />
                        </div>
                        <div className="btn-edit">
                          <button type="submit">Save</button>
                        <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>  
                        </div>
                        
                    </form>
                ) : (
                    <>
                        <h1>Welcome back<br />{userData.firstName} {userData.lastName}!</h1>
                        <button className="edit-button" onClick={handleEditClick}>Edit Name</button>
                    </>
                )}
            </div>
            <h2 className="sr-only">Accounts</h2>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                    <p className="account-amount">$2,082.79</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                    <p className="account-amount">$10,928.42</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                    <p className="account-amount">$184.30</p>
                    <p className="account-amount-description">Current Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
        </main>
    );
}