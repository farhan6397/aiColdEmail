import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Sparkles,
    Mail,
    History,
    Zap,
    LogOut,
    User,
    Plus,
    BarChart3,
    FileText,
    Bookmark,
    Sliders,
    X,
    Home
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const Sidebar = ({ isOpen, setIsOpen, onNewGenerator }) => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const navItems = [
        { id: 'generator', path: '/dashboard', label: 'AI Generator', icon: Zap, badge: 'New' },
        { id: 'history', path: '/history', label: 'Email History', icon: History },
        { id: 'presets', path: '/presets', label: 'Prompt Presets', icon: Bookmark },
        { id: 'analytics', path: '/analytics', label: 'Analytics', icon: BarChart3 },
    ];

    const handleNavClick = (path, id) => {
        if (id === 'generator' && onNewGenerator) {
            onNewGenerator();
        }
        navigate(path);
        if (setIsOpen) setIsOpen(false);
    };

    return (
        <>
            {/* Mobile Backdrop Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Main Container */}
            <aside className={`
                fixed lg:static top-0 left-0 bottom-0 z-50
                w-64 bg-[#080B0C] border-r border-slate-800/80
                flex flex-col justify-between p-4 transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                {/* Top Header & Logo */}
                <div>
                    <div className="flex items-center justify-between h-14 px-2 mb-6 border-b border-slate-800/60 pb-4">
                        <Link to="/" className="flex items-center gap-2.5 group">
                            <div className="w-9 h-9 rounded-xl bg-[#2DD4BF]/10 border border-[#2DD4BF]/30 flex items-center justify-center text-[#2DD4BF] group-hover:scale-105 transition-transform shadow-lg shadow-[#2DD4BF]/10">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1">
                                    coldmail<span className="text-[#2DD4BF]">.ai</span>
                                </span>
                                <span className="text-[10px] font-mono text-slate-500 block -mt-1 uppercase tracking-wider">AI Workspace</span>
                            </div>
                        </Link>

                        {/* Mobile Close Button */}
                        {setIsOpen && (
                            <button
                                onClick={() => setIsOpen(false)}
                                className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/60"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    {/* New Generation Button */}
                    <button
                        onClick={() => handleNavClick('/dashboard', 'generator')}
                        className="w-full mb-6 py-3 px-4 rounded-xl bg-gradient-to-r from-[#2DD4BF] to-teal-400 hover:from-teal-400 hover:to-[#2DD4BF] text-slate-950 font-semibold text-sm shadow-lg shadow-[#2DD4BF]/20 flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <Plus className="w-4 h-4 stroke-[3]" />
                        <span>New Outreach</span>
                    </button>

                    {/* Navigation Menu */}
                    <div className="space-y-1">
                        <div className="px-3 mb-2 text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                            Menu
                        </div>

                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/');
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavClick(item.path, item.id)}
                                    className={`
                                        w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                                        ${isActive
                                            ? 'bg-[#2DD4BF]/10 text-[#2DD4BF] border border-[#2DD4BF]/20 shadow-sm font-semibold'
                                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}
                                    `}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon className={`w-4 h-4 ${isActive ? 'text-[#2DD4BF]' : 'text-slate-400'}`} />
                                        <span>{item.label}</span>
                                    </div>
                                    {item.badge && (
                                        <span className="px-2 py-0.5 text-[10px] font-mono rounded-full bg-[#2DD4BF]/20 text-[#2DD4BF] font-semibold border border-[#2DD4BF]/30">
                                            {item.badge}
                                        </span>
                                    )}
                                </button>
                            );
                        })}

                        <div className="pt-3 mt-3 border-t border-slate-800/60">
                            <Link
                                to="/"
                                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all"
                            >
                                <Home className="w-4 h-4 text-slate-400" />
                                <span>Back to Home</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer User Profile & Logout */}
                <div className="pt-4 border-t border-slate-800/80">
                    <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-[#2DD4BF] font-bold text-sm shrink-0">
                                {user?.username ? user.username.charAt(0).toUpperCase() : <User className="w-4 h-4 text-slate-300" />}
                            </div>
                            <div className="min-w-0">
                                <div className="text-sm font-semibold text-white truncate leading-tight">
                                    {user?.username || 'Sales User'}
                                </div>
                                <div className="text-xs text-slate-400 truncate">
                                    {user?.email || 'user@coldmail.ai'}
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={logout}
                            title="Sign out"
                            className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
