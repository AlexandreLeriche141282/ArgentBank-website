import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, clearError } from '../../redux/slice/authSlice';
import FormSignIn from '../../components/formSignIn/FormSignIn';
import './signIn.css';

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Récupérer les états error, loading, et isAuthenticated depuis le store Redux
  const { error, loading, isAuthenticated } = useSelector(state => state.auth);

  // Rediriger l'utilisateur si authentifié
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/user');
    }
  }, [isAuthenticated, navigate]);

  // Nettoyer les erreurs lors du démontage du composant
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  // Gestion de la soumission du formulaire
  const handleSubmit = async ({ username, password }) => {
    try {
      await dispatch(login({ email: username, password })).unwrap();
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <FormSignIn onSubmit={handleSubmit} error={error} loading={loading} />
      </section>
    </main>
  );
}
