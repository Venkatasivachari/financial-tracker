import React, { useEffect, useState } from 'react'
import Header from '../components/Header.jsx'
import Sidebar from '../components/Sidebar.jsx'
import Modal from '../components/Modal.jsx'
import Toast from '../components/Toast.jsx'
import api from '../services/api'

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [newCategory, setNewCategory] = useState('');

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await api.get('/categories');
      setCategories(res.data.categories || []);
    } catch (e) {
      setToast({ type: 'error', message: 'Failed to load categories' });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async () => {
    if (!newCategory.trim()) {
      setToast({ type: 'error', message: 'Category name is required' });
      return;
    }
    try {
      await api.post('/categories', { name: newCategory });
      setToast({ type: 'success', message: 'Category added' });
      setNewCategory('');
      setShowModal(false);
      fetchCategories();
    } catch (e) {
      setToast({ type: 'error', message: e.response?.data?.message || 'Failed to add' });
    }
  };

  const handleDelete = async (name) => {
    if (confirm(`Delete category "${name}"?`)) {
      try {
        await api.delete(`/categories/${name}`);
        setToast({ type: 'success', message: 'Category deleted' });
        fetchCategories();
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Categories</h1>
            <button
              onClick={() => { setNewCategory(''); setShowModal(true); }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              + Add Category
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map(c => (
                <div key={c} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🏷️</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{c}</span>
                  </div>
                  <button
                    onClick={() => handleDelete(c)}
                    className="text-red-600 hover:text-red-800 font-semibold text-sm"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
          {categories.length === 0 && <div className="text-center py-12 text-gray-500">No categories yet. Create one to organize your expenses.</div>}
        </div>
      </div>

      <Modal
        isOpen={showModal}
        title="Add Category"
        onClose={() => setShowModal(false)}
        onConfirm={handleAdd}
      >
        <input
          type="text"
          placeholder="Category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-100"
          autoFocus
        />
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
