import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, clearError } from '../../redux/slice/authSlice';
import LoginForm from '../../components/formSignIn/FormSignIn';
import './signIn.css';

export default function SignIn() {
  const dispatch = useDispatch();// Initialisation de la fonction dispatch

  const { error, loading, isAuthenticated } = useSelector(state => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/user');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = async ({ username, password }) => {
    try {
      await dispatch(login({ email: username, password })).unwrap();// Dispatch de l'action login
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <LoginForm onSubmit={handleSubmit} error={error} loading={loading} />
      </section>
    </main>
  );
}

