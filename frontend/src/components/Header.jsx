import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../services/auth.jsx'

export default function Header() {
  const { user, signout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    signout();
    nav('/login');
  };

  return (
    <header className="bg-blue-700 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold">💰 Finance Tracker</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm">Welcome, {user?.name || 'User'}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm font-medium transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
