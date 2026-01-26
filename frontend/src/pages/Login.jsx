import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../services/auth'

export default function Login(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [err,setErr]=useState(null);
  const { signin } = useAuth();
  const nav = useNavigate();

  const submit = async (e)=>{
    e.preventDefault();
    try{
      await signin(email,password);
      nav('/');
    }catch(e){ setErr(e.response?.data?.message || 'Login failed'); }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <form onSubmit={submit} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Welcome Back</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Sign in to your account</p>
        
        {err && <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 mb-4 rounded-md border border-red-200 dark:border-red-800">{err}</div>}
        
        <div className="mb-4">
          <label className="label">Email Address</label>
          <input 
            type="email"
            className="input bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="you@example.com" 
            value={email} 
            onChange={e=>setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="label">Password</label>
          <input 
            type="password" 
            className="input bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="••••••••" 
            value={password} 
            onChange={e=>setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="btn-primary w-full mb-4 hover:shadow-md transition-shadow">Sign in</button>
        
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account? <Link to="/signup" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Sign up</Link>
        </p>
      </form>
    </div>
  )
}
