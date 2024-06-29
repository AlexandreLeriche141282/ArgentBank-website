import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../redux/slice/userSlice';
import { updateProfile } from '../../redux/slice/editProfileSlice';
import './user.css';

export default function User() {
    const dispatch = useDispatch();
    const { data: userData, loading, error } = useSelector(state => state.userProfile);
    const { token } = useSelector(state => state.auth);
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState({ firstName: '', lastName: '' });

    useEffect(() => {
        if (token) {
            dispatch(fetchUserProfile(token));
        }
    }, [dispatch, token]);

    useEffect(() => {
        if (userData) {
            setEditedName(userData);
        }
    }, [userData]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async (e) => {
        e.preventDefault();
        try {
            await dispatch(updateProfile({ token, userData: editedName })).unwrap();
            setIsEditing(false);
            dispatch(fetchUserProfile(token)); // Rafraîchir les données après la mise à jour
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    const handleInputChange = (e) => {
        setEditedName({ ...editedName, [e.target.name]: e.target.value });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <main className="main bg-dark">
            <div className="header">
                {isEditing ? (
                    <form className="form-edit" onSubmit={handleSaveClick}>
                        <h1>Edit User Info</h1>
                        <div>
                            <label htmlFor="username">User name:</label>
                            <input
                                type="text"
                                id="username"
                                name="userName"
                                value={editedName.userName || ''}
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
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName">Last name:</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={editedName.lastName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="btn-edit">
                            <button type="submit">Save</button>
                            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                        </div>
                    </form>
                ) : (
                    <>
                        <h1>Welcome back<br />{userData?.firstName} {userData?.lastName}!</h1>
                        <button className="edit-button" onClick={handleEditClick}>Edit Name</button>
                    </>
                )}
            </div>
            <h2 className="sr-only">Accounts</h2>
            {/* Le reste du composant reste inchangé */}
        </main>
    );
}