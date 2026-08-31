import { useAuth } from './context/authContext.jsx'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dashboard.jsx'
import HistoryPage from './pages/HistoryPage.jsx'
import PresetsPage from './pages/PresetsPage.jsx'
import AnalyticsPage from './pages/AnalyticsPage.jsx'
import Guide from './pages/Guide.jsx'
import SpamDictionary from './pages/SpamDictionary.jsx'
import Benchmarks from './pages/Benchmarks.jsx'
import Support from './pages/Support.jsx'
import Privacy from './pages/Privacy.jsx'
import Terms from './pages/Terms.jsx'
import SecurityInfo from './pages/SecurityInfo.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

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
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/history" element={user ? <HistoryPage /> : <Navigate to="/login" />} />
        <Route path="/presets" element={user ? <PresetsPage /> : <Navigate to="/login" />} />
        <Route path="/analytics" element={user ? <AnalyticsPage /> : <Navigate to="/login" />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/spam-dictionary" element={<SpamDictionary />} />
        <Route path="/benchmarks" element={<Benchmarks />} />
        <Route path="/support" element={<Support />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/security-info" element={<SecurityInfo />} />
      </Routes>
    </>
  )
}

export default App
