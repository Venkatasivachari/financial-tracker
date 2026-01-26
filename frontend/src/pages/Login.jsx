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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form onSubmit={submit} className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4 text-gray-800 dark:text-gray-100">Sign in</h2>
        {err && <div className="p-2 bg-red-100 text-red-700 mb-2">{err}</div>}
        <input className="w-full p-2 mb-2 border rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="w-full p-2 mb-4 border rounded" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full bg-blue-600 text-white p-2 rounded">Sign in</button>
        <p className="mt-4 text-sm">Don't have an account? <Link to="/signup" className="text-blue-600">Sign up</Link></p>
      </form>
    </div>
  )
}
