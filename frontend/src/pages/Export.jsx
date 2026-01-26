import React, { useState } from 'react'
import Header from '../components/Header.jsx'
import Sidebar from '../components/Sidebar.jsx'
import Toast from '../components/Toast.jsx'
import api from '../services/api'

export default function Export() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });

  const handleExportCSV = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (dateRange.startDate) params.append('startDate', dateRange.startDate);
      if (dateRange.endDate) params.append('endDate', dateRange.endDate);
      
      const response = await api.get(`/export/csv?${params.toString()}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `expenses_${new Date().getTime()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.parentElement.removeChild(link);
      
      setToast({ type: 'success', message: 'CSV exported successfully' });
    } catch (e) {
      setToast({ type: 'error', message: 'Failed to export' });
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Export Data</h1>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow max-w-md">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Export to CSV</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Start Date (Optional)
                </label>
                <input
                  type="date"
                  value={dateRange.startDate}
                  onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  End Date (Optional)
                </label>
                <input
                  type="date"
                  value={dateRange.endDate}
                  onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-100"
                />
              </div>
            </div>

            <button
              onClick={handleExportCSV}
              disabled={loading}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Exporting...' : '📥 Export as CSV'}
            </button>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded border border-blue-200 dark:border-blue-700">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Note:</strong> Your expense data will be exported in CSV format, including date, amount, category, description, and payment mode.
              </p>
            </div>
          </div>
        </div>
      </div>

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
