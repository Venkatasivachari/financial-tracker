import React, { useEffect, useState } from 'react'
import Header from '../components/Header.jsx'
import Sidebar from '../components/Sidebar.jsx'
import Modal from '../components/Modal.jsx'
import Toast from '../components/Toast.jsx'
import api from '../services/api'

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [filters, setFilters] = useState({ category: '', minAmount: '', maxAmount: '' });
  const [formData, setFormData] = useState({ amount: '', category: '', description: '', paymentMode: 'cash', date: new Date().toISOString().split('T')[0] });
  const [categories, setCategories] = useState([]);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.minAmount) params.append('min', filters.minAmount);
      if (filters.maxAmount) params.append('max', filters.maxAmount);
      const res = await api.get(`/expenses?${params.toString()}`);
      setExpenses(res.data.data || []);
    } catch (e) {
      setToast({ type: 'error', message: 'Failed to load expenses' });
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
    fetchExpenses();
  }, [filters]);

  const handleSave = async () => {
    if (!formData.amount || !formData.category || !formData.date) {
      setToast({ type: 'error', message: 'Please fill all required fields' });
      return;
    }
    try {
      if (editingId) {
        await api.put(`/expenses/${editingId}`, formData);
        setToast({ type: 'success', message: 'Expense updated' });
      } else {
        await api.post('/expenses', formData);
        setToast({ type: 'success', message: 'Expense created' });
      }
      setFormData({ amount: '', category: '', description: '', paymentMode: 'cash', date: new Date().toISOString().split('T')[0] });
      setEditingId(null);
      setShowModal(false);
      fetchExpenses();
    } catch (e) {
      setToast({ type: 'error', message: e.response?.data?.message || 'Failed to save' });
    }
  };

  const handleEdit = (expense) => {
    setFormData({
      amount: expense.amount,
      category: expense.category,
      description: expense.description || '',
      paymentMode: expense.paymentMode || 'cash',
      date: new Date(expense.date).toISOString().split('T')[0]
    });
    setEditingId(expense._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this expense?')) {
      try {
        await api.delete(`/expenses/${id}`);
        setToast({ type: 'success', message: 'Expense deleted' });
        fetchExpenses();
      } catch (e) {
        setToast({ type: 'error', message: 'Failed to delete' });
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-8">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Expenses</h1>
            <button
              onClick={() => { setEditingId(null); setFormData({ amount: '', category: '', description: '', paymentMode: 'cash', date: new Date().toISOString().split('T')[0] }); setShowModal(true); }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              + Add Expense
            </button>
          </div>

          <div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-3">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Filters</h3>
            <div className="grid grid-cols-3 gap-4">
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="p-2 border rounded dark:bg-gray-700 dark:text-gray-100"
              >
                <option value="">All Categories</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <input
                type="number"
                placeholder="Min Amount"
                value={filters.minAmount}
                onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
                className="p-2 border rounded dark:bg-gray-700 dark:text-gray-100"
              />
              <input
                type="number"
                placeholder="Max Amount"
                value={filters.maxAmount}
                onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })}
                className="p-2 border rounded dark:bg-gray-700 dark:text-gray-100"
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-200 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Description</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Amount</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Mode</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map(e => (
                    <tr key={e._id} className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-3">{new Date(e.date).toLocaleDateString()}</td>
                      <td className="px-6 py-3"><span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">{e.category}</span></td>
                      <td className="px-6 py-3">{e.description}</td>
                      <td className="px-6 py-3 font-semibold">${e.amount.toFixed(2)}</td>
                      <td className="px-6 py-3 text-sm">{e.paymentMode}</td>
                      <td className="px-6 py-3 space-x-2">
                        <button onClick={() => handleEdit(e)} className="text-blue-600 hover:underline text-sm">Edit</button>
                        <button onClick={() => handleDelete(e._id)} className="text-red-600 hover:underline text-sm">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {expenses.length === 0 && <div className="p-8 text-center text-gray-500">No expenses found</div>}
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={showModal}
        title={editingId ? 'Edit Expense' : 'Add Expense'}
        onClose={() => setShowModal(false)}
        onConfirm={handleSave}
        confirmText={editingId ? 'Update' : 'Add'}
      >
        <div className="space-y-4">
          <input
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-100"
          />
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="">Select Category</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <input
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-100"
          />
          <select
            value={formData.paymentMode}
            onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="online">Online</option>
            <option value="other">Other</option>
          </select>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
