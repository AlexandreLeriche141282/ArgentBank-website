import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/slice/authSlice';
import './signIn.css';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { error, loading } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(login({ email: username, password })).unwrap();
      navigate('/user');
    } catch (err) {
      // L'erreur est gérée dans le state Redux, pas besoin de setError ici
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="sign-in-button" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
          <p>New customer? <a href="./user.html">Sign Up</a></p>
        </form>
      </section>
    </main>
  );
}