import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { HelpCircle, Mail, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';

const Support = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('');
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !msg) return;
        setSent(true);
        setTimeout(() => {
            setSent(false);
            setName('');
            setEmail('');
            setMsg('');
        }, 4000);
    };

    const faqs = [
        {
            q: 'How does Groq AI acceleration work in ColdMail AI?',
            a: 'ColdMail AI connects to Groq Compound Mini models to generate high-converting cold email packages in under 1.5 seconds.'
        },
        {
            q: 'What is included in every generated outreach package?',
            a: 'Every package contains a Primary Cold Email, a Follow-Up Email template, a concise LinkedIn DM, and a high-open Subject Line.'
        },
        {
            q: 'How does ColdMail AI protect domain reputation?',
            a: 'All outputs pass through an automated spam keyword sanitizer and deliverability radar check to guarantee spam triggers are eliminated.'
        },
        {
            q: 'Can I reuse previously generated campaigns?',
            a: 'Yes! All your campaigns are saved in your MongoDB account history and accessible anytime under the "Email History" tab.'
        }
    ];

    return (
        <div className="min-h-screen bg-[#080B0C] text-slate-200 font-sans flex flex-col selection:bg-[#2DD4BF]/20 selection:text-[#2DD4BF]">
            <Navbar />

            <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-blue-500/10 text-blue-400 border border-blue-500/30 mb-4">
                        <HelpCircle className="w-3.5 h-3.5" /> Support & Knowledge Center
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                        How can we <span className="text-blue-400">help you?</span>
                    </h1>
                    <p className="mt-4 text-slate-400 text-base max-w-xl mx-auto">
                        Find answers to common questions or reach out directly to our outreach customer support team.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* FAQ Column (7 cols) */}
                    <div className="lg:col-span-7 space-y-6">
                        <h2 className="text-xl font-bold text-white mb-4">Frequently Asked Questions</h2>

                        <div className="space-y-4">
                            {faqs.map((faq, idx) => (
                                <div key={idx} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                                    <h3 className="text-base font-bold text-white mb-2">{faq.q}</h3>
                                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Form Column (5 cols) */}
                    <div className="lg:col-span-5">
                        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800/90 shadow-2xl">
                            <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-[#2DD4BF]" />
                                <span>Contact Support Team</span>
                            </h3>
                            <p className="text-slate-400 text-xs mb-6">
                                Fill out the form below and our team will get back to you within 24 hours.
                            </p>

                            {sent ? (
                                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-center space-y-2">
                                    <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                                    <h4 className="font-bold text-sm">Message Sent Successfully!</h4>
                                    <p className="text-xs text-slate-400">Thank you for reaching out. We will get back to you shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">Your Name</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="e.g. Alex Mercer"
                                            required
                                            className="w-full p-3 rounded-xl bg-[#070A0B] border border-slate-800 text-slate-200 text-xs focus:border-[#2DD4BF] focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">Work Email</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="alex@company.com"
                                            required
                                            className="w-full p-3 rounded-xl bg-[#070A0B] border border-slate-800 text-slate-200 text-xs focus:border-[#2DD4BF] focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">Your Message</label>
                                        <textarea
                                            value={msg}
                                            onChange={(e) => setMsg(e.target.value)}
                                            placeholder="Describe your issue or feature request..."
                                            rows={4}
                                            required
                                            className="w-full p-3 rounded-xl bg-[#070A0B] border border-slate-800 text-slate-200 text-xs focus:border-[#2DD4BF] focus:outline-none resize-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs shadow-lg flex items-center justify-center gap-2 transition-all"
                                    >
                                        <Send className="w-3.5 h-3.5" />
                                        <span>Send Message</span>
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Support;
