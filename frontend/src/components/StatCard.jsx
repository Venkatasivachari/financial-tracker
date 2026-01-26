import React from 'react'

export default function StatCard({ icon, label, value, change, color = 'blue' }) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800 border-blue-300',
    green: 'bg-green-100 text-green-800 border-green-300',
    red: 'bg-red-100 text-red-800 border-red-300',
    purple: 'bg-purple-100 text-purple-800 border-purple-300',
  }[color] || 'bg-blue-100 text-blue-800 border-blue-300';

  return (
    <div className={`${colorClasses} border p-6 rounded-lg shadow`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-75">{label}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
          {change && <p className={`text-sm mt-2 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
          </p>}
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
}
