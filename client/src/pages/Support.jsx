import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import { HelpCircle, MessageCircle, PhoneCall, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

const Support = () => {
    const phoneNumber = "916397801840";
    const formattedPhone = "+91 63978 01840";
    const defaultMessage = encodeURIComponent("Hi ColdMail AI Support! I need assistance with AI Cold Email Generator.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

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
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#2DD4BF]/10 text-[#2DD4BF] border border-[#2DD4BF]/30 mb-4">
                        <HelpCircle className="w-3.5 h-3.5" /> Direct Support & Help Center
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                        Instant WhatsApp <span className="text-emerald-400">Support</span>
                    </h1>
                    <p className="mt-4 text-slate-400 text-base max-w-xl mx-auto">
                        Skip email queues! Reach out directly on WhatsApp for instant assistance from our engineering and support team.
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

                    {/* Direct WhatsApp Contact Card Column (5 cols) */}
                    <div className="lg:col-span-5">
                        <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800/90 shadow-2xl space-y-6 text-center">
                            <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto shadow-lg shadow-emerald-500/10">
                                <MessageCircle className="w-8 h-8 fill-emerald-500 text-slate-950" />
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">WhatsApp Instant Support</h3>
                                <p className="text-slate-400 text-xs">
                                    Fastest way to get help with your account or technical queries.
                                </p>
                            </div>

                            <div className="p-4 rounded-2xl bg-[#070A0B] border border-slate-800 space-y-2">
                                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Official Support Number</div>
                                <div className="text-xl font-extrabold text-emerald-400 font-mono tracking-tight flex items-center justify-center gap-2">
                                    <PhoneCall className="w-4 h-4 text-emerald-400" />
                                    <span>{formattedPhone}</span>
                                </div>
                                <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5 font-mono pt-1">
                                    <Clock className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                                    <span>Response Time: &lt; 15 mins</span>
                                </div>
                            </div>

                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2.5 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <MessageCircle className="w-5 h-5 fill-slate-950 text-emerald-500" />
                                <span>Start WhatsApp Chat Now</span>
                                <ArrowRight className="w-4 h-4" />
                            </a>

                            <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Direct access to lead technical support</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <WhatsAppButton />
            <Footer />
        </div>
    );
};

export default Support;
