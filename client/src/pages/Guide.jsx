import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { Link } from 'react-router-dom';
import { BookOpen, Sparkles, CheckCircle2, Zap, ArrowRight, ShieldCheck, Mail, Target } from 'lucide-react';

const Guide = () => {
    const chapters = [
        {
            number: '01',
            title: 'Foundations of High-Converting Cold Email',
            desc: 'Learn how to write cold emails that feel personal, concise, and focused on recipient pain points rather than long product pitches.',
            points: [
                'Keep body length under 100 words for maximum reply rate.',
                'Use single, frictionless call-to-actions (e.g. "Worth a quick look?").',
                'Focus 80% on prospect pain point, 20% on your solution.'
            ]
        },
        {
            number: '02',
            title: 'Mastering Omnichannel Outreach',
            desc: 'Why relying on email alone limits your response rates, and how to sync email, follow-ups, and LinkedIn DMs.',
            points: [
                'Send follow-ups 3 days after initial email.',
                'Keep LinkedIn DMs brief and conversational (under 50 words).',
                'Never use generic "bumping this" follow-up messages.'
            ]
        },
        {
            number: '03',
            title: 'Deliverability & Domain Health',
            desc: 'How to bypass spam filters, sanitize spam trigger words, and ensure 99%+ inbox placement rates.',
            points: [
                'Set up SPF, DKIM, and DMARC authentication records.',
                'Avoid hype words like "100% free", "guaranteed", or "act now".',
                'Warm up new sending domains for 14-21 days before scaling.'
            ]
        },
        {
            number: '04',
            title: 'AI Prompt Engineering for B2B Leads',
            desc: 'How to structure inputs in ColdMail AI to generate ultra-custom outreach tailored to specific prospect roles.',
            points: [
                'Include prospect job title, company name, and key metric goal.',
                'Select "Direct & Short" tone for executive CTO/CEO leads.',
                'Use "Persuasive" tone for agency growth and demo bookings.'
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-[#080B0C] text-slate-200 font-sans flex flex-col selection:bg-[#2DD4BF]/20 selection:text-[#2DD4BF]">
            <Navbar />

            <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#2DD4BF]/10 text-[#2DD4BF] border border-[#2DD4BF]/30 mb-4">
                        <BookOpen className="w-3.5 h-3.5" /> Cold Outreach Masterclass Guide
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                        The Blueprint to <span className="text-[#2DD4BF]">99.4% Deliverability</span> & High Replies
                    </h1>
                    <p className="mt-4 text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                        A practical playbook for B2B sales teams, agency founders, and marketers looking to craft high-converting cold outreach with Groq AI acceleration.
                    </p>
                </div>

                {/* Chapter Cards */}
                <div className="space-y-8">
                    {chapters.map((ch, idx) => (
                        <div key={idx} className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 shadow-xl hover:border-[#2DD4BF]/40 transition-all">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-sm font-mono text-[#2DD4BF] font-bold px-3 py-1 rounded-xl bg-[#2DD4BF]/10 border border-[#2DD4BF]/20">
                                    Chapter {ch.number}
                                </span>
                                <h2 className="text-xl font-bold text-white">{ch.title}</h2>
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed mb-6">
                                {ch.desc}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-800/80 pt-6">
                                {ch.points.map((pt, pIdx) => (
                                    <div key={pIdx} className="flex items-start gap-2.5 text-xs text-slate-400">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                        <span className="leading-relaxed">{pt}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action Box */}
                <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-[#0A0E10] to-slate-900 border border-slate-800 text-center relative overflow-hidden">
                    <h3 className="text-2xl font-bold text-white mb-3">Ready to generate high-converting outreach?</h3>
                    <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
                        Use Groq AI to craft custom emails, follow-ups, and LinkedIn DMs in seconds.
                    </p>
                    <Link
                        to="/dashboard"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-sm shadow-xl transition-all"
                    >
                        <Sparkles className="w-4 h-4 text-slate-950 fill-slate-950" />
                        <span>Open Studio Dashboard</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Guide;
