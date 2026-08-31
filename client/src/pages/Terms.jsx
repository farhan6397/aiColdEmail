import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { FileText } from 'lucide-react';

const Terms = () => {
    return (
        <div className="min-h-screen bg-[#080B0C] text-slate-200 font-sans flex flex-col selection:bg-[#2DD4BF]/20 selection:text-[#2DD4BF]">
            <Navbar />

            <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#2DD4BF]/10 text-[#2DD4BF] border border-[#2DD4BF]/30 mb-4">
                        <FileText className="w-3.5 h-3.5" /> Terms of Service
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                        Terms of Service
                    </h1>
                    <p className="mt-2 text-slate-400 text-sm">Last updated: August 2026</p>
                </div>

                <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 space-y-8 text-sm text-slate-300 leading-relaxed">
                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-white">1. Acceptance of Terms</h2>
                        <p>
                            By creating an account or using ColdMail AI services, you agree to comply with these Terms of Service and all applicable email outreach and anti-spam laws (including CAN-SPAM Act and GDPR).
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-white">2. Acceptable Use & Anti-Spam Policy</h2>
                        <p>
                            ColdMail AI strictly prohibits using generated email packages for malicious phishing, deceptive spam campaigns, or unsolicited mass spamming. Users must comply with opt-out regulations and honor unsubscribe requests.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-white">3. Intellectual Property</h2>
                        <p>
                            You retain 100% full commercial rights and ownership over all cold outreach emails, follow-ups, and LinkedIn messages generated through your account.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-white">4. Limitation of Liability</h2>
                        <p>
                            ColdMail AI provides outreach generation tools "as is". Users are responsible for reviewing and sending cold emails in compliance with local domain regulations.
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Terms;
