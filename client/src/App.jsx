import { useAuth } from './context/authContext.jsx'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dashboard.jsx'

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080B0C] text-slate-200 flex items-center justify-center font-sans">
        <div className="flex items-center gap-3 text-[#2DD4BF]">
          <span className="w-4 h-4 rounded-full bg-[#2DD4BF] animate-ping" />
          <span className="font-mono text-sm">Loading ColdMail AI...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      </Routes>
    </>
  )
}

export default App
