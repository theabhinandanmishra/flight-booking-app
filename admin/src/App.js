import React, { useState } from "react";

const DOMESTIC_AIRPORTS = [
  { code: 'DEL', name: 'New Delhi (DEL)' },
  { code: 'BOM', name: 'Mumbai (BOM)' },
  { code: 'BLR', name: 'Bengaluru (BLR)' },
  { code: 'HYD', name: 'Hyderabad (HYD)' },
  { code: 'MAA', name: 'Chennai (MAA)' },
  { code: 'CCU', name: 'Kolkata (CCU)' },
  { code: 'AMD', name: 'Ahmedabad (AMD)' },
  { code: 'PNQ', name: 'Pune (PNQ)' },
  { code: 'GOI', name: 'Goa (GOI)' },
  { code: 'COK', name: 'Kochi (COK)' },
  { code: 'JAI', name: 'Jaipur (JAI)' },
  { code: 'LKO', name: 'Lucknow (LKO)' },
  { code: 'ATQ', name: 'Amritsar (ATQ)' },
  { code: 'IXB', name: 'Bagdogra (IXB)' },
  { code: 'BBI', name: 'Bhubaneswar (BBI)' },
  { code: 'CJB', name: 'Coimbatore (CJB)' },
  { code: 'GAU', name: 'Guwahati (GAU)' },
  { code: 'IDR', name: 'Indore (IDR)' },
  { code: 'NAG', name: 'Nagpur (NAG)' },
  { code: 'PAT', name: 'Patna (PAT)' },
  { code: 'TRV', name: 'Thiruvananthapuram (TRV)' },
  { code: 'IXC', name: 'Chandigarh (IXC)' }
];

function App() {
  const [flights, setFlights] = useState([]);

  const searchFlights = async () => {
    // Generate mock flights natively since the backend cannot be reached
    const airlines = ["IndiGo", "Air India", "Vistara", "SpiceJet", "Akasa Air"];
    const mockFlights = Array.from({ length: 5 }).map((_, i) => ({
      airline: airlines[i % airlines.length],
      price: Math.floor(Math.random() * 5000) + 3000
    }));
    
    const sorted = mockFlights.sort((a, b) => a.price - b.price);
    setFlights(sorted);
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white p-5 flex justify-between items-center shadow-lg px-8 sticky top-0 z-50">
        <div className="text-2xl font-bold tracking-tight">✈️ Abhi Flight Finder Admin</div>
        <div>
          <span className="mr-4">Hello, Admin</span>
          <button 
            onClick={() => {
              localStorage.removeItem('flightfinder_auth');
              window.location.href = 'http://localhost:5173/login'; // Redirect to user client login natively 
            }} 
            className="text-white hover:text-red-200 underline font-semibold transition"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* SEARCH CARD */}
      <div className="max-w-5xl mx-auto mt-8 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-slate-100 flex flex-wrap gap-4 justify-center hover:shadow-2xl transition-shadow duration-300">
        <select className="border border-slate-300 p-3 rounded-lg w-40 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all bg-white">
          <option value="" disabled selected>From</option>
          {DOMESTIC_AIRPORTS.map((apt) => (
            <option key={apt.code} value={apt.code}>{apt.name}</option>
          ))}
        </select>
        <select className="border border-slate-300 p-3 rounded-lg w-40 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all bg-white">
          <option value="" disabled selected>To</option>
          {DOMESTIC_AIRPORTS.map((apt) => (
            <option key={apt.code} value={apt.code}>{apt.name}</option>
          ))}
        </select>
        <input type="date" className="border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" />

        <button
          onClick={searchFlights}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          Search Flights
        </button>
      </div>

      {/* FILTERS */}
      <div className="flex justify-center gap-4 mt-6">
        <button className="bg-white px-5 py-2 rounded-lg shadow-sm border border-slate-200 hover:bg-slate-50 hover:shadow transition-all">Cheapest</button>
        <button className="bg-white px-5 py-2 rounded-lg shadow-sm border border-slate-200 hover:bg-slate-50 hover:shadow transition-all">Fastest</button>
        <button className="bg-white px-5 py-2 rounded-lg shadow-sm border border-slate-200 hover:bg-slate-50 hover:shadow transition-all">Non-stop</button>
      </div>

      {/* RESULTS */}
      <div className="max-w-5xl mx-auto mt-8 space-y-4 pb-12">
        {flights.map((f, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow-md border border-slate-100 flex justify-between items-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
          >
            <div>
              <h2 className="font-bold text-lg">{f.airline}</h2>
              <p className="text-gray-500">2h 15m • Non-stop</p>
            </div>

            <div className="text-xl font-bold text-green-600">
              ₹{f.price}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;
