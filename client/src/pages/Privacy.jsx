import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { ShieldCheck, Lock } from 'lucide-react';

const Privacy = () => {
    return (
        <div className="min-h-screen bg-[#080B0C] text-slate-200 font-sans flex flex-col selection:bg-[#2DD4BF]/20 selection:text-[#2DD4BF]">
            <Navbar />

            <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#2DD4BF]/10 text-[#2DD4BF] border border-[#2DD4BF]/30 mb-4">
                        <Lock className="w-3.5 h-3.5" /> Legal & Compliance
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                        Privacy Policy
                    </h1>
                    <p className="mt-2 text-slate-400 text-sm">Last updated: August 2026</p>
                </div>

                <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 space-y-8 text-sm text-slate-300 leading-relaxed">
                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-white">1. Data Collection & Processing</h2>
                        <p>
                            ColdMail AI collects account details (such as name and email address during registration) and user-submitted prompt inputs to generate personalized outreach copy. We do not sell your personal or prospect data to any third parties.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-white">2. AI Model Data Privacy</h2>
                        <p>
                            Prompts and generated content processed via our Groq AI API infrastructure are encrypted end-to-end and are NOT used to train public foundational AI models.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-white">3. Security & Storage</h2>
                        <p>
                            All user passwords are encrypted using bcrypt salted hashing. Database records are stored securely with automated backup protection.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-white">4. Your Rights & Data Deletion</h2>
                        <p>
                            You have full ownership of all generated email copy. You may request account deletion or export your campaign history at any time by contacting our support team.
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Privacy;
