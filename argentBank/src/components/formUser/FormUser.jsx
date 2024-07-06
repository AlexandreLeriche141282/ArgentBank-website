import React from 'react';
import './formUser.css'

export default function EditProfileForm({ editedName, onInputChange, onSubmit, onCancel }) {
    return (
        <form className="form-edit" onSubmit={onSubmit}>
            <h1>Edit User Info</h1>
            <div>
                <label htmlFor="username">User name:</label>
                <input
                    type="text"
                    id="username"
                    name="userName"
                    value={editedName.userName || ''}
                    onChange={onInputChange}
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
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
}
