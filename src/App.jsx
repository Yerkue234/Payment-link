import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/common/ProtectedRoute'
import Complile from './components/payment/complete'
import PaymentError from './components/payment/PaymentError'
import PaymentSlug from './pages/PaymentSlug'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Redirect root to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* Public routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/payment/:slug" element={
              <ProtectedRoute>
                <PaymentSlug />
              </ProtectedRoute>
            } />

            <Route path='/payment/error' element={<PaymentError />} key='payment-error'/> 
            <Route path='/payment/success' element={<Complile />} key='payment-success'/>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App