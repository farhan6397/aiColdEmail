import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Home, BookOpen, ShieldAlert, BarChart2, HelpCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <nav className="sticky top-0 z-50 bg-[#080B0C]/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5 group">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#2DD4BF] to-teal-200 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-[#2DD4BF]/20 group-hover:scale-105 transition-transform">
                    <Sparkles className="w-4 h-4 fill-slate-950" />
                </div>
                <div className="flex flex-col">
                    <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
                        coldmail<span className="text-[#2DD4BF]">.ai</span>
                    </span>
                </div>
            </Link>

            <div className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-400">
                <Link to="/guide" className="hover:text-white transition-colors flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#2DD4BF]" />
                    <span>Outreach Guide</span>
                </Link>
                <Link to="/spam-dictionary" className="hover:text-white transition-colors flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                    <span>Spam Dictionary</span>
                </Link>
                <Link to="/benchmarks" className="hover:text-white transition-colors flex items-center gap-1.5">
                    <BarChart2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Benchmarks</span>
                </Link>
                <Link to="/support" className="hover:text-white transition-colors flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                    <span>Support</span>
                </Link>
            </div>

            <div className="flex items-center gap-3">
                {user ? (
                    <Link
                        to="/dashboard"
                        className="px-4 py-2 rounded-xl bg-[#2DD4BF] hover:bg-[#2DD4BF]/90 text-slate-950 text-xs font-bold shadow-lg shadow-[#2DD4BF]/20 flex items-center gap-1.5 transition-all"
                    >
                        <span>Open Studio</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                ) : (
                    <>
                        <Link
                            to="/login"
                            className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-800 transition-colors"
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/register"
                            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-950 text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                        >
                            <span>Get Started</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
