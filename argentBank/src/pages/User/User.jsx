import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../redux/slice/userSlice';
import { updateProfile } from '../../redux/slice/editProfileSlice';
import { updateUser } from '../../redux/slice/authSlice';
import FormUser from '../../components/formUser/FormUser';
import Account from '../../components/account/Account'
import './user.css';

export default function User() {
    const dispatch = useDispatch();

    // Récupérer les états depuis le store Redux
    const { data: userData, loading, error } = useSelector(state => state.userProfile);
    const { token } = useSelector(state => state.auth);

    // États locaux pour la gestion de l'édition de profil
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState({ firstName: '', lastName: '' });

    // Charger le profil utilisateur lorsque le token change
    useEffect(() => {
        if (token) {
            dispatch(fetchUserProfile(token));
        }
    }, [dispatch, token]);

    // Mettre à jour les états locaux lorsque les données utilisateur changent
    useEffect(() => {
        if (userData) {
            setEditedName(userData);
        }
    }, [userData]);

    // Activer le mode édition
    const handleEditClick = () => {
        setIsEditing(true);
    };

    // Sauvegarder les modifications de profil
    const handleSaveClick = async (e) => {
        e.preventDefault();
        try {
            const result = await dispatch(updateProfile({ token, userData: editedName })).unwrap();
            dispatch(updateUser(result)); // Mettez à jour l'utilisateur dans le state auth
            setIsEditing(false);
            dispatch(fetchUserProfile(token));
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    // Mettre à jour les valeurs des champs d'édition
    const handleInputChange = (e) => {
        setEditedName({ ...editedName, [e.target.name]: e.target.value });
    };

    // Afficher un message de chargement ou d'erreur si nécessaire
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // Simuler des comptes bancaires pour l'affichage
    const accounts = [
        {
            title: "Argent Bank Checking (x8349)",
            amount: "$2,082.79",
            description: "Available Balance"
        },
        {
            title: "Argent Bank Savings (x6712)",
            amount: "$10,928.42",
            description: "Available Balance"
        },
        {
            title: "Argent Bank Credit Card (x8349)",
            amount: "$184.30",
            description: "Current Balance"
        }
    ];

    return (
        <main className="main bg-dark">
            <div className="header">
                {isEditing ? (
                    <FormUser
                        editedName={editedName}
                        onInputChange={handleInputChange}
                        onSubmit={handleSaveClick}
                        onCancel={() => setIsEditing(false)}
                    />
                ) : (
                    <>
                        <h1>Welcome back<br />{userData?.firstName} {userData?.lastName}!</h1>
                        <button className="edit-button" onClick={handleEditClick}>Edit Name</button>
                    </>
                )}
            </div>
            <h2 className="sr-only">Accounts</h2>
            {accounts.map((account, index) => (
                <Account
                    key={index}
                    title={account.title}
                    amount={account.amount}
                    description={account.description}
                />
            ))}
        </main>
    );
}
