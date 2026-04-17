// admin/src/pages/Dashboard.js

export default function Dashboard() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500 mt-2">Overview of flight application metrics and status.</p>
        </div>
        <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg shadow-sm hover:shadow hover:bg-slate-50 transition-all font-medium">
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="text-slate-500 font-medium mb-2">Total Users</div>
          <div className="text-4xl font-bold text-blue-600">120</div>
          <div className="text-sm text-green-500 mt-2 font-medium">↑ 12% from last month</div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="text-slate-500 font-medium mb-2">Searches Today</div>
          <div className="text-4xl font-bold text-indigo-600">560</div>
          <div className="text-sm text-green-500 mt-2 font-medium">↑ 5% from yesterday</div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">⚠️</div>
          <div className="text-slate-500 font-medium mb-2">Active Alerts</div>
          <div className="text-4xl font-bold text-red-500">80</div>
          <div className="text-sm text-red-400 mt-2 font-medium">Requires immediate attention</div>
        </div>
      </div>
    </div>
  );
}
