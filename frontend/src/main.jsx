import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './styles.css'
import './components.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Expenses from './pages/Expenses'
import Budgets from './pages/Budgets'
import Categories from './pages/Categories'
import Export from './pages/Export'
import { AuthProvider, useAuth } from './services/auth.jsx'

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
          <Route path="/expenses" element={<PrivateRoute><Expenses/></PrivateRoute>} />
          <Route path="/budgets" element={<PrivateRoute><Budgets/></PrivateRoute>} />
          <Route path="/categories" element={<PrivateRoute><Categories/></PrivateRoute>} />
          <Route path="/export" element={<PrivateRoute><Export/></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
)
