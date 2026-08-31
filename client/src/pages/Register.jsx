import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Mail, Lock, User, KeyRound, ArrowRight, Sparkles, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';

const Register = () => {
    const [step, setStep] = useState('register'); // 'register' or 'otp'
    const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
    const [otp, setOtp] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [infoMessage, setInfoMessage] = useState('');

    const { register, verifyOtp } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('Please fill in all required fields.');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            const res = await register({
                username: formData.username,
                email: formData.email,
                password: formData.password
            });

            setInfoMessage(res.message || 'OTP sent to your email. Please verify below.');
            setStep('otp');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        if (!otp || otp.length < 4) {
            setError('Please enter a valid OTP code.');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            await verifyOtp({ email: formData.email, otp });
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'OTP verification failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#080B0C] text-slate-200 selection:bg-[#2DD4BF]/20 selection:text-[#2DD4BF] flex flex-col justify-between overflow-x-hidden font-sans relative">
            
            {/* Background Glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#2DD4BF]/10 rounded-full blur-[150px] pointer-events-none -z-10" />

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

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-md">
                    
                    {/* Card Wrapper */}
                    <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800/90 shadow-2xl accent-glow">
                        
                        {step === 'register' ? (
                            <>
                                {/* Title Header */}
                                <div className="text-center mb-8">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider text-[#2DD4BF] bg-[#2DD4BF]/10 border border-[#2DD4BF]/20 mb-3">
                                        <Sparkles className="w-3 h-3" /> Get Started Free
                                    </div>
                                    <h1 className="text-3xl font-bold tracking-tight text-white">
                                        Create your <span className="font-serif-italic font-normal text-[#2DD4BF]">account</span>
                                    </h1>
                                    <p className="mt-2 text-sm text-slate-400">
                                        Generate AI cold emails & tracking history
                                    </p>
                                </div>

                                {/* Error Alert */}
                                {error && (
                                    <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2.5">
                                        <AlertCircle className="w-4 h-4 shrink-0" />
                                        <span>{error}</span>
                                    </div>
                                )}

                                {/* Register Form */}
                                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                                    {/* Username */}
                                    <div>
                                        <label className="block text-xs font-medium text-slate-300 mb-1.5">Username</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                                <User className="w-4 h-4" />
                                            </div>
                                            <input
                                                type="text"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleChange}
                                                placeholder="alexmercer"
                                                required
                                                className="w-full pl-10 pr-4 py-2.5 bg-[#090D0E] border border-slate-800 focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#2DD4BF] rounded-xl text-sm text-slate-200 placeholder-slate-600 outline-none transition-colors"
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-xs font-medium text-slate-300 mb-1.5">Email Address</label>
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
                                        <label className="block text-xs font-medium text-slate-300 mb-1.5">Password</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                                <Lock className="w-4 h-4" />
                                            </div>
                                            <input
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="••••••••"
                                                required
                                                className="w-full pl-10 pr-4 py-2.5 bg-[#090D0E] border border-slate-800 focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#2DD4BF] rounded-xl text-sm text-slate-200 placeholder-slate-600 outline-none transition-colors"
                                            />
                                        </div>
                                    </div>

                                    {/* Confirm Password */}
                                    <div>
                                        <label className="block text-xs font-medium text-slate-300 mb-1.5">Confirm Password</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                                <Lock className="w-4 h-4" />
                                            </div>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                placeholder="••••••••"
                                                required
                                                className="w-full pl-10 pr-4 py-2.5 bg-[#090D0E] border border-slate-800 focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#2DD4BF] rounded-xl text-sm text-slate-200 placeholder-slate-600 outline-none transition-colors"
                                            />
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full mt-4 py-3 px-4 rounded-xl text-sm font-semibold text-slate-950 bg-[#2DD4BF] hover:bg-[#25C4B0] disabled:opacity-60 transition-all duration-200 shadow-lg shadow-[#2DD4BF]/10 flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Registering...
                                            </>
                                        ) : (
                                            <>
                                                Register & Send OTP
                                                <ArrowRight className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                </form>

                                <div className="mt-8 text-center text-xs text-slate-400">
                                    Already have an account?{' '}
                                    <Link to="/login" className="text-[#2DD4BF] font-semibold hover:underline">
                                        Sign in
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* OTP Step */}
                                <div className="text-center mb-8">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider text-[#2DD4BF] bg-[#2DD4BF]/10 border border-[#2DD4BF]/20 mb-3">
                                        <KeyRound className="w-3 h-3" /> Email Verification
                                    </div>
                                    <h1 className="text-3xl font-bold tracking-tight text-white">
                                        Enter <span className="font-serif-italic font-normal text-[#2DD4BF]">OTP Code</span>
                                    </h1>
                                    <p className="mt-2 text-sm text-slate-400">
                                        We sent a 6-digit verification code to <strong className="text-slate-200">{formData.email}</strong>
                                    </p>
                                </div>

                                {infoMessage && (
                                    <div className="mb-6 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2.5">
                                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                                        <span>{infoMessage}</span>
                                    </div>
                                )}

                                {error && (
                                    <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2.5">
                                        <AlertCircle className="w-4 h-4 shrink-0" />
                                        <span>{error}</span>
                                    </div>
                                )}

                                <form onSubmit={handleOtpSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-300 mb-1.5">6-Digit OTP Code</label>
                                        <input
                                            type="text"
                                            value={otp}
                                            onChange={(e) => {
                                                setOtp(e.target.value);
                                                if (error) setError('');
                                            }}
                                            placeholder="123456"
                                            maxLength={6}
                                            required
                                            className="w-full tracking-widest text-center py-3 bg-[#090D0E] border border-slate-800 focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#2DD4BF] rounded-xl text-lg font-mono text-[#2DD4BF] placeholder-slate-700 outline-none transition-colors"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full mt-4 py-3 px-4 rounded-xl text-sm font-semibold text-slate-950 bg-[#2DD4BF] hover:bg-[#25C4B0] disabled:opacity-60 transition-all duration-200 shadow-lg shadow-[#2DD4BF]/10 flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Verifying OTP...
                                            </>
                                        ) : (
                                            <>
                                                Verify Email & Access Dashboard
                                                <ArrowRight className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                </form>

                                <div className="mt-6 text-center text-xs text-slate-500">
                                    Didn't get the code?{' '}
                                    <button 
                                        onClick={() => setStep('register')} 
                                        className="text-[#2DD4BF] hover:underline"
                                    >
                                        Change details / Resend
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="p-6 text-center text-xs text-slate-600">
                © {new Date().getFullYear()} ColdMail.ai. All rights reserved.
            </footer>
        </div>
    );
};

export default Register;
