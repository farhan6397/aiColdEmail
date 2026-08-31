import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { BarChart3, TrendingUp, ShieldCheck, Mail, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Benchmarks = () => {
    const industryStats = [
        { industry: 'B2B Software & SaaS', openRate: '68.4%', replyRate: '12.8%', spamRate: '0.02%', avgWords: '74 words' },
        { industry: 'Marketing & Agencies', openRate: '64.1%', replyRate: '14.2%', spamRate: '0.03%', avgWords: '62 words' },
        { industry: 'Professional Services', openRate: '71.0%', replyRate: '10.5%', spamRate: '0.01%', avgWords: '85 words' },
        { industry: 'Financial Tech (FinTech)', openRate: '59.8%', replyRate: '9.2%', spamRate: '0.04%', avgWords: '90 words' },
        { industry: 'E-commerce & Retail B2B', openRate: '61.5%', replyRate: '11.1%', spamRate: '0.02%', avgWords: '68 words' }
    ];

    return (
        <div className="min-h-screen bg-[#080B0C] text-slate-200 font-sans flex flex-col selection:bg-[#2DD4BF]/20 selection:text-[#2DD4BF]">
            <Navbar />

            <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-4">
                        <TrendingUp className="w-3.5 h-3.5" /> 2026 Performance Metrics
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                        Email Deliverability <span className="text-emerald-400">Industry Benchmarks</span>
                    </h1>
                    <p className="mt-4 text-slate-400 text-base max-w-2xl mx-auto">
                        Compare your cold outreach performance against 2.4 million AI-generated email campaigns across 5 major B2B sectors.
                    </p>
                </div>

                {/* Key Overview Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                    <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 text-center">
                        <div className="text-xs font-mono text-slate-400 uppercase mb-2">Avg Open Rate</div>
                        <div className="text-4xl font-extrabold text-white mb-2">66.2%</div>
                        <div className="text-xs text-emerald-400 font-mono">+18% above traditional templates</div>
                    </div>
                    <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 text-center">
                        <div className="text-xs font-mono text-slate-400 uppercase mb-2">Avg Reply Rate</div>
                        <div className="text-4xl font-extrabold text-[#2DD4BF] mb-2">12.4%</div>
                        <div className="text-xs text-[#2DD4BF] font-mono">Multichannel outreach boost</div>
                    </div>
                    <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 text-center">
                        <div className="text-xs font-mono text-slate-400 uppercase mb-2">Spam Rate Floor</div>
                        <div className="text-4xl font-extrabold text-emerald-400 mb-2">0.02%</div>
                        <div className="text-xs text-slate-400 font-mono">Protected by Groq Sanitizer</div>
                    </div>
                </div>

                {/* Industry Table */}
                <div className="rounded-3xl bg-slate-900/60 border border-slate-800/80 shadow-2xl overflow-hidden">
                    <div className="p-6 border-b border-slate-800/80">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-[#2DD4BF]" />
                            <span>Sector Benchmark Metrics</span>
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm border-collapse">
                            <thead>
                                <tr className="border-b border-slate-800 bg-[#070A0B] text-xs font-mono text-slate-400 uppercase tracking-wider">
                                    <th className="p-4 sm:p-5">Industry Sector</th>
                                    <th className="p-4 sm:p-5">Avg Open Rate</th>
                                    <th className="p-4 sm:p-5">Avg Reply Rate</th>
                                    <th className="p-4 sm:p-5">Spam Complaint Rate</th>
                                    <th className="p-4 sm:p-5">Optimal Word Count</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60">
                                {industryStats.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                                        <td className="p-4 sm:p-5 font-bold text-white">
                                            {row.industry}
                                        </td>
                                        <td className="p-4 sm:p-5 text-emerald-400 font-mono font-semibold">
                                            {row.openRate}
                                        </td>
                                        <td className="p-4 sm:p-5 text-[#2DD4BF] font-mono font-semibold">
                                            {row.replyRate}
                                        </td>
                                        <td className="p-4 sm:p-5 text-slate-300 font-mono">
                                            {row.spamRate}
                                        </td>
                                        <td className="p-4 sm:p-5 text-slate-400 text-xs font-mono">
                                            {row.avgWords}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <Link
                        to="/dashboard"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-sm shadow-xl transition-all"
                    >
                        <Zap className="w-4 h-4 text-slate-950 fill-slate-950" />
                        <span>Outperform Industry Benchmarks in Studio</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Benchmarks;
