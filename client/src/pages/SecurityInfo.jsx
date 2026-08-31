import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { ShieldCheck, Cpu, Lock, CheckCircle2, AlertOctagon } from 'lucide-react';
import { Link } from 'react-router-dom';

const SecurityInfo = () => {
    return (
        <div className="min-h-screen bg-[#080B0C] text-slate-200 font-sans flex flex-col selection:bg-[#2DD4BF]/20 selection:text-[#2DD4BF]">
            <Navbar />

            <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-4">
                        <ShieldCheck className="w-3.5 h-3.5" /> Domain Protection Architecture
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                        Security & <span className="text-emerald-400">Deliverability Radar</span>
                    </h1>
                    <p className="mt-4 text-slate-400 text-base max-w-2xl mx-auto">
                        How ColdMail AI shields sending domains from spam traps, prompt injection attacks, and deliverability drops.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80">
                        <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                            <Lock className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Prompt Injection Guard</h3>
                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                            Every user input prompt is pre-sanitized to block jailbreaks, system prompt overrides, and adversarial payload attacks.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80">
                        <div className="w-10 h-10 rounded-2xl bg-[#2DD4BF]/10 border border-[#2DD4BF]/20 flex items-center justify-center text-[#2DD4BF] mb-4">
                            <AlertOctagon className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Spam Trigger Sanitizer</h3>
                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                            Automated real-time scanner flags promotional triggers (such as "100% free" or "guaranteed cash") before output is rendered.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80">
                        <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-4">
                            <Cpu className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">256-Bit TLS Encryption</h3>
                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                            All network traffic between frontend, server APIs, and MongoDB database is protected using modern SSL/TLS encryption.
                        </p>
                    </div>
                </div>

                <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 text-center">
                    <h2 className="text-xl font-bold text-white mb-2">Want to audit your outreach deliverability?</h2>
                    <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto mb-6">
                        Test your prompt live in the Studio Dashboard to see real deliverability scores and spam trigger checks.
                    </p>
                    <Link
                        to="/dashboard"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#2DD4BF] hover:bg-[#2DD4BF]/90 text-slate-950 font-bold text-sm shadow-lg transition-all"
                    >
                        <span>Open Deliverability Studio</span>
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default SecurityInfo;
