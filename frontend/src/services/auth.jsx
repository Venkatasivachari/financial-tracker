import React, { createContext, useContext, useState, useEffect } from 'react'
import api from './api'

const AuthContext = createContext();

export function AuthProvider({ children }){
  const [user, setUser] = useState(null);
  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token){
      api.setToken(token);
      api.get('/auth/me').then(res => setUser(res.data.user)).catch(()=>{ localStorage.removeItem('token'); api.setToken(null); });
    }
  },[]);

  const signin = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    api.setToken(res.data.token);
    setUser(res.data.user);
    return res;
  };
  const signup = async (name,email,password) => {
    const res = await api.post('/auth/signup', { name, email, password });
    localStorage.setItem('token', res.data.token);
    api.setToken(res.data.token);
    setUser(res.data.user);
    return res;
  };
  const signout = () => { localStorage.removeItem('token'); api.setToken(null); setUser(null); };

  return <AuthContext.Provider value={{user, signin, signup, signout}}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
