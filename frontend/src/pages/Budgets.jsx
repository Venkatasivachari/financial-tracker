import React, { useEffect, useState } from 'react'
import Header from '../components/Header.jsx'
import Sidebar from '../components/Sidebar.jsx'
import Modal from '../components/Modal.jsx'
import Toast from '../components/Toast.jsx'
import api from '../services/api'

export default function Budgets() {
  const [budgets, setBudgets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({ category: '', limit: '' });

  const fetchBudgets = async () => {
    setLoading(true);
    try {
      const res = await api.get('/budgets');
      setBudgets(res.data.budgets || []);
    } catch (e) {
      setToast({ type: 'error', message: 'Failed to load budgets' });
    }
    setLoading(false);
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data.categories || []);
    } catch (e) {
      console.error('Failed to load categories');
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBudgets();
  }, []);

  const handleSave = async () => {
    if (!formData.category || !formData.limit) {
      setToast({ type: 'error', message: 'Please fill all fields' });
      return;
    }
    try {
      await api.post('/budgets', { category: formData.category, limit: Number(formData.limit) });
      setToast({ type: 'success', message: 'Budget set' });
      setFormData({ category: '', limit: '' });
      setShowModal(false);
      fetchBudgets();
    } catch (e) {
      setToast({ type: 'error', message: e.response?.data?.message || 'Failed to save' });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-8">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Budgets</h1>
            <button
              onClick={() => { setFormData({ category: '', limit: '' }); setShowModal(true); }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              + Set Budget
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {budgets.map(b => (
                <div key={b.category} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">{b.category}</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Budget Limit</p>
                    <p className="text-2xl font-bold text-blue-600">${b.limit.toFixed(2)}</p>
                    <div className="mt-4 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500">Spent: $0 / ${b.limit}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {budgets.length === 0 && <div className="text-center py-12 text-gray-500">No budgets set. Create one to get started.</div>}
        </div>
      </div>

      <Modal
        isOpen={showModal}
        title="Set Budget"
        onClose={() => setShowModal(false)}
        onConfirm={handleSave}
      >
        <div className="space-y-4">
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="">Select Category</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <input
            type="number"
            placeholder="Limit Amount"
            value={formData.limit}
            onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-100"
          />
        </div>
      </Modal>

      {toast && (
        <div className="fixed bottom-4 right-4">
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        </div>
      )}
    </div>
  );
}
