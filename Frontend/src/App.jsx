import React from 'react'
import Login from './Pages/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ForgotPassword from './Components/ForgotPassword';

const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/" element={<Login />} />
    </Routes>
  </Router>
  )
}

export default App
