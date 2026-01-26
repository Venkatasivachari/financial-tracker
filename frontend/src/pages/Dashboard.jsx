import React, { useEffect, useState } from 'react'
import Header from '../components/Header.jsx'
import Sidebar from '../components/Sidebar.jsx'
import StatCard from '../components/StatCard.jsx'
import api from '../services/api'
import { Bar, Pie, Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Tooltip, Legend);

export default function Dashboard(){
  const [expenses, setExpenses] = useState([]);
  const [byCategory, setByCategory] = useState([]);
  const [stats, setStats] = useState({ total: 0, thisMonth: 0, thisWeek: 0 });
  const [loading, setLoading] = useState(true);

  const fetchData = async ()=>{
    setLoading(true);
    try{
      const res = await api.get('/expenses');
      const allExpenses = res.data.data || [];
      setExpenses(allExpenses.slice(0, 10));
      
      const s = await api.get('/expenses/summary');
      setByCategory(s.data.byCategory || []);

      // Calculate stats
      const total = allExpenses.reduce((sum, e) => sum + e.amount, 0);
      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      
      const thisMonth = allExpenses
        .filter(e => new Date(e.date) >= monthStart)
        .reduce((sum, e) => sum + e.amount, 0);
      
      const thisWeek = allExpenses
        .filter(e => new Date(e.date) >= weekStart)
        .reduce((sum, e) => sum + e.amount, 0);

      setStats({ total, thisMonth, thisWeek });
    }catch(e){ console.error(e); }
    setLoading(false);
  }

  useEffect(()=>{ fetchData(); },[]);

  const barData = {
    labels: expenses.map(e=>new Date(e.date).toLocaleDateString()),
    datasets: [{ label:'Amount ($)', data: expenses.map(e=>e.amount), backgroundColor: 'rgba(59,130,246,0.6)'}]
  }
  const pieData = {
    labels: byCategory.map(b=>b._id),
    datasets: [{ data: byCategory.map(b=>b.total), backgroundColor: ['#60A5FA','#34D399','#FBBF24','#FB7185','#A78BFA','#34D399'] }]
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard icon="💰" label="Total Spent" value={`$${stats.total.toFixed(2)}`} />
            <StatCard icon="📅" label="This Month" value={`$${stats.thisMonth.toFixed(2)}`} />
            <StatCard icon="📊" label="This Week" value={`$${stats.thisWeek.toFixed(2)}`} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Recent Expenses</h2>
              {loading ? <div>Loading...</div> : (
                <>
                  <div className="space-y-3 mb-6">
                    {expenses.map(e=> (
                      <div key={e._id} className="p-3 border dark:border-gray-700 rounded flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-gray-100">{e.description || 'No description'}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{e.category}</p>
                        </div>
                        <p className="font-semibold text-blue-600">${e.amount.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="h-64">
                    <Bar data={barData} options={{ maintainAspectRatio: false }} />
                  </div>
                </>
              )}
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">By Category</h2>
              {byCategory.length > 0 ? (
                <>
                  <div className="h-64 mb-4">
                    <Pie data={pieData} options={{ maintainAspectRatio: false }} />
                  </div>
                  <div className="space-y-2 text-sm">
                    {byCategory.map(cat => (
                      <div key={cat._id} className="flex justify-between">
                        <span className="text-gray-700 dark:text-gray-300">{cat._id}</span>
                        <span className="font-semibold text-gray-900 dark:text-gray-100">${cat.total.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-gray-500">No data available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
