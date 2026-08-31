import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Zap, History, Bookmark, BarChart3 } from 'lucide-react';

const MobileBottomNav = () => {
    const location = useLocation();

    const navItems = [
        { id: 'home', path: '/', label: 'Home', icon: Home },
        { id: 'generator', path: '/dashboard', label: 'Generator', icon: Zap },
        { id: 'history', path: '/history', label: 'History', icon: History },
        { id: 'presets', path: '/presets', label: 'Presets', icon: Bookmark },
        { id: 'analytics', path: '/analytics', label: 'Analytics', icon: BarChart3 },
    ];

    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#080B0C]/95 backdrop-blur-xl border-t border-slate-800/90 px-2 py-1.5 flex items-center justify-around shadow-2xl">
            {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                    <Link
                        key={item.id}
                        to={item.path}
                        className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 ${isActive
                                ? 'text-[#2DD4BF] font-bold'
                                : 'text-slate-400 hover:text-slate-200'
                            }`}
                    >
                        <div className={`p-1 rounded-lg transition-colors ${isActive ? 'bg-[#2DD4BF]/15 text-[#2DD4BF]' : ''}`}>
                            <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-medium tracking-tight mt-0.5">{item.label}</span>
                    </Link>
                );
            })}
        </nav>
    );
};

export default MobileBottomNav;
