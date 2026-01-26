import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:4000/api' });

export default {
  get: (url, opts) => api.get(url, opts),
  post: (url, data, opts) => api.post(url, data, opts),
  put: (url, data, opts) => api.put(url, data, opts),
  delete: (url, opts) => api.delete(url, opts),
  setToken: (token) => {
    if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    else delete api.defaults.headers.common['Authorization'];
  }
};
