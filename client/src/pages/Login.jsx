import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, AlertCircle, Loader2 } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setError('Please fill in all required fields.');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            if (login) {
                await login(formData);
            }
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#080B0C] text-slate-200 selection:bg-[#2DD4BF]/20 selection:text-[#2DD4BF] flex flex-col justify-between overflow-x-hidden font-sans relative">
            
            {/* Background Glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#2DD4BF]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

            {/* Header */}
            <header className="p-6 max-w-7xl mx-auto w-full flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2.5 group">
                    <div className="w-8 h-8 rounded-lg bg-[#2DD4BF]/10 border border-[#2DD4BF]/30 flex items-center justify-center text-[#2DD4BF] group-hover:scale-105 transition-transform">
                        <Mail className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-lg tracking-tight text-white">
                        coldmail<span className="text-[#2DD4BF]">.ai</span>
                    </span>
                </Link>
                
                <Link to="/" className="text-xs font-mono text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                    ← Back to home
                </Link>
            </header>

            {/* Main Content Card */}
            <main className="flex-1 flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-md">
                    
                    {/* Card Wrapper */}
                    <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800/90 shadow-2xl accent-glow">
                        
                        {/* Title Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider text-[#2DD4BF] bg-[#2DD4BF]/10 border border-[#2DD4BF]/20 mb-3">
                                <Sparkles className="w-3 h-3" /> Welcome Back
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight text-white">
                                Sign in to <span className="font-serif-italic font-normal text-[#2DD4BF]">ColdMail</span>
                            </h1>
                            <p className="mt-2 text-sm text-slate-400">
                                Access your AI outreach engine and deliverability analytics
                            </p>
                        </div>

                        {/* Error Alert */}
                        {error && (
                            <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2.5">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Email */}
                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1.5">Work Email</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="alex@company.com"
                                        required
                                        className="w-full pl-10 pr-4 py-2.5 bg-[#090D0E] border border-slate-800 focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#2DD4BF] rounded-xl text-sm text-slate-200 placeholder-slate-600 outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="block text-xs font-medium text-slate-300">Password</label>
                                    <a href="#" className="text-xs text-[#2DD4BF] hover:underline">Forgot password?</a>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                        <Lock className="w-4 h-4" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        required
                                        className="w-full pl-10 pr-10 py-2.5 bg-[#090D0E] border border-slate-800 focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#2DD4BF] rounded-xl text-sm text-slate-200 placeholder-slate-600 outline-none transition-colors"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center gap-2 pt-1">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="rounded border-slate-800 bg-[#090D0E] text-[#2DD4BF] focus:ring-0 w-4 h-4"
                                />
                                <label htmlFor="remember" className="text-xs text-slate-400 cursor-pointer">
                                    Remember this device for 30 days
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full mt-2 py-3 px-4 rounded-xl text-sm font-semibold text-slate-950 bg-[#2DD4BF] hover:bg-[#25C4B0] disabled:opacity-60 transition-all duration-200 shadow-lg shadow-[#2DD4BF]/10 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Authenticating...
                                    </>
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Footer Link */}
                        <div className="mt-8 text-center text-xs text-slate-400">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-[#2DD4BF] font-semibold hover:underline">
                                Create an account
                            </Link>
                        </div>
                    </div>

                </div>
            </main>

            {/* Simple Footer */}
            <footer className="p-6 text-center text-xs text-slate-600">
                © {new Date().getFullYear()} ColdMail.ai. All rights reserved.
            </footer>
        </div>
    );
};

export default Login;
