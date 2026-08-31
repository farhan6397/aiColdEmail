import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { Search, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SpamDictionary = () => {
    const [search, setSearch] = useState('');

    const spamWords = [
        { word: '100% Free', risk: 'High', category: 'Pricing & Promotional', fix: 'Use "at no additional cost" or specify value' },
        { word: 'Guaranteed Income', risk: 'High', category: 'Financial Claims', fix: 'Use "proven ROI model" or case study metric' },
        { word: 'Act Now', risk: 'High', category: 'Urgency & Pressure', fix: 'Use "open to exploring this week?"' },
        { word: 'Risk Free', risk: 'High', category: 'Guarantees', fix: 'Use "flexible pilot terms"' },
        { word: 'Buy Direct', risk: 'Medium', category: 'Sales Pitch', fix: 'Use "explore partnership"' },
        { word: 'Click Here', risk: 'High', category: 'Links & CTAs', fix: 'Use descriptive hyperlink text or short booking link' },
        { word: 'No Obligation', risk: 'Medium', category: 'Guarantees', fix: 'Use "informational call only"' },
        { word: 'Earn $', risk: 'High', category: 'Financial Claims', fix: 'Reference specific benchmark results' },
        { word: 'Winner', risk: 'High', category: 'Promotional', fix: 'Avoid entirely' },
        { word: 'Urgent Response', risk: 'High', category: 'Urgency & Pressure', fix: 'Use "following up on my previous note"' },
        { word: 'Limited Time Offer', risk: 'High', category: 'Promotional', fix: 'State realistic timelines or availability' },
        { word: 'Double Your Revenue', risk: 'High', category: 'Exaggerated Claims', fix: 'Use "increase demo bookings by up to 30%"' }
    ];

    const filtered = spamWords.filter(item =>
        item.word.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#080B0C] text-slate-200 font-sans flex flex-col selection:bg-[#2DD4BF]/20 selection:text-[#2DD4BF]">
            <Navbar />

            <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-4">
                        <ShieldAlert className="w-3.5 h-3.5" /> Deliverability Protection Dictionary
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                        Spam Filter <span className="text-amber-400">Trigger Word Dictionary</span>
                    </h1>
                    <p className="mt-4 text-slate-400 text-base max-w-2xl mx-auto">
                        Search high-risk trigger phrases flagged by Gmail, Outlook, and spam filters. See recommended safe alternatives to protect your domain reputation.
                    </p>

                    {/* Search Bar */}
                    <div className="mt-8 max-w-xl mx-auto relative">
                        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search trigger words or categories (e.g. Free, Click, Financial)..."
                            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 text-sm focus:border-[#2DD4BF] focus:outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Table of Spam Trigger Words */}
                <div className="rounded-3xl bg-slate-900/60 border border-slate-800/80 shadow-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm border-collapse">
                            <thead>
                                <tr className="border-b border-slate-800 bg-[#070A0B] text-xs font-mono text-slate-400 uppercase tracking-wider">
                                    <th className="p-4 sm:p-5">Trigger Word / Phrase</th>
                                    <th className="p-4 sm:p-5">Risk Level</th>
                                    <th className="p-4 sm:p-5">Category</th>
                                    <th className="p-4 sm:p-5">Safe Alternative</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60">
                                {filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="p-8 text-center text-slate-500 text-sm">
                                            No spam trigger words found matching "{search}".
                                        </td>
                                    </tr>
                                ) : (
                                    filtered.map((item, idx) => (
                                        <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                                            <td className="p-4 sm:p-5 font-semibold text-rose-300 font-mono">
                                                "{item.word}"
                                            </td>
                                            <td className="p-4 sm:p-5">
                                                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-medium border ${item.risk === 'High'
                                                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                                    : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                                    }`}>
                                                    <AlertTriangle className="w-3 h-3" />
                                                    {item.risk} Risk
                                                </span>
                                            </td>
                                            <td className="p-4 sm:p-5 text-xs text-slate-400 font-mono">
                                                {item.category}
                                            </td>
                                            <td className="p-4 sm:p-5 text-slate-300 text-xs">
                                                <span className="text-emerald-400 font-medium">{item.fix}</span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-slate-400 text-xs mb-4">
                        ColdMail AI automatically sanitizes all generated emails against this dictionary before serving.
                    </p>
                    <Link
                        to="/dashboard"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#2DD4BF] hover:bg-[#2DD4BF]/90 text-slate-950 font-bold text-sm shadow-lg transition-all"
                    >
                        <span>Test Email in Studio</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default SpamDictionary;
