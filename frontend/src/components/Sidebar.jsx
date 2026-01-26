import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '📊 Dashboard', icon: '📊' },
    { path: '/expenses', label: '💸 Expenses', icon: '💸' },
    { path: '/budgets', label: '📈 Budgets', icon: '📈' },
    { path: '/categories', label: '🏷️ Categories', icon: '🏷️' },
    { path: '/export', label: '📥 Export', icon: '📥' },
  ];

  return (
    <nav className="w-64 bg-gray-800 text-white h-screen p-4 space-y-2">
      {navItems.map(item => (
        <Link
          key={item.path}
          to={item.path}
          className={`block px-4 py-3 rounded transition ${
            location.pathname === item.path
              ? 'bg-blue-600 font-semibold'
              : 'hover:bg-gray-700'
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
