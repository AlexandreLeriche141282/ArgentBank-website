import { useState } from 'react'
import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn';
import User from './pages/User/User';
import { AuthProvider } from './services/AuthContext';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/User" element={<User />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      </AuthProvider>
      </div>
  )
}

export default App
