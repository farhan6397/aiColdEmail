import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import {
    Sparkles,
    Terminal,
    ShieldCheck,
    Zap,
    Check,
    Copy,
    ArrowRight,
    Mail,
    Send,
    Code2,
    Server,
    Cpu,
    ExternalLink,
    Lock,
    BarChart3,
    Users,
    FileText,
    LayoutDashboard
} from 'lucide-react';

const Home = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('email');
    const [copiedCode, setCopiedCode] = useState(false);
    const [copiedCmd, setCopiedCmd] = useState(false);
    const [activeDemo, setActiveDemo] = useState('lead1');

    // Sample outreach examples showcase
    const outreachExamples = {
        email: `Subject: Quick question regarding Cyberdyne's build pipeline

Hi Sarah,

Saw Cyberdyne's recent announcement about scaling engineering velocity. Teams often hit a bottleneck with slow CI build cycles as headcount grows.

We built our AI Cold Email Engine to automatically generate hyper-personalized outreach that cuts through inbox noise and lands in the primary inbox.

Would you be open to a 5-minute chat this Thursday?

Best,
Alex Mercer`,

        followup: `Subject: Re: Quick question regarding Cyberdyne's build pipeline

Hi Sarah,

Following up on my previous note regarding Cyberdyne's test suites. We helped scale ScaleLayer's velocity last month by 45%.

Would love to drop a 2-minute video walkthrough if you're interested?

Best,
Alex Mercer`,

        linkedin: `Hey Sarah! Loved your recent post on engineering scalability at Cyberdyne. Sent a short email regarding cutting CI build times by 40%—would love to connect here on LinkedIn!`,

        subject: `1. Quick question regarding Cyberdyne's build pipeline
2. Cut Cyberdyne CI build times by 40%?
3. Question about Sarah's engineering velocity`
    };

    const handleCopyCode = () => {
        navigator.clipboard.writeText(outreachExamples[activeTab]);
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
    };

    const handleCopyCmd = () => {
        navigator.clipboard.writeText('https://github.com/farhan6397/aiColdEmail');
        setCopiedCmd(true);
        setTimeout(() => setCopiedCmd(false), 2000);
    };

    return (
        <div className="min-h-screen bg-[#080B0C] text-slate-200 selection:bg-[#2DD4BF]/20 selection:text-[#2DD4BF] font-sans overflow-x-hidden">

            {/* 1. TOP NAVBAR */}
            <Navbar />

            {/* 2. HERO SECTION */}
            <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
                {/* Background glow circle */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#2DD4BF]/10 rounded-full blur-[120px] pointer-events-none -z-10" />

                {/* Top Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-[#2DD4BF] bg-[#2DD4BF]/10 border border-[#2DD4BF]/25 mb-8 badge-glow">
                    <span className="w-2 h-2 rounded-full bg-[#2DD4BF] animate-ping" />
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Powered by Groq AI Engine</span>
                </div>

                {/* Main Title */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-5xl mx-auto leading-[1.1]">
                    Generate Cold Emails That <br className="hidden sm:inline" />
                    <span className="font-serif-italic font-normal text-[#2DD4BF] underline decoration-[#2DD4BF]/30 decoration-1 underline-offset-8">
                        Actually Get Replies.
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
                    Instantly generate high-converting cold emails, automated follow-ups, and LinkedIn DMs tailored to your prospects in seconds.
                </p>

                {/* Hero CTA Buttons */}
                <div className="mt-8 flex flex-row items-center justify-center gap-3 max-w-md mx-auto px-2">
                    <Link
                        to={user ? "/dashboard" : "/register"}
                        className="flex-1 sm:flex-none text-xs sm:text-sm font-bold text-slate-950 bg-[#2DD4BF] hover:bg-[#2DD4BF]/90 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all duration-200 shadow-lg shadow-[#2DD4BF]/20 flex items-center justify-center gap-1.5 whitespace-nowrap"
                    >
                        <span>{user ? 'Open Studio' : 'Start Free'}</span>
                        <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                    </Link>
                    <a
                        href="#outreach-packages"
                        className="flex-1 sm:flex-none text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 whitespace-nowrap"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-[#2DD4BF] shrink-0" />
                        <span>View Live Sample</span>
                    </a>
                </div>

                {/* HERO CODE DEMO PREVIEW CARD */}
                <div className="mt-16 max-w-4xl mx-auto text-left glass-card rounded-2xl overflow-hidden shadow-2xl border border-slate-800/80 accent-glow">
                    {/* Top Bar */}
                    <div className="px-4 py-3 bg-[#0C1214] border-b border-slate-800/80 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                            <span className="ml-2 text-xs font-mono text-slate-400">coldmail-generator-preview.json</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Groq AI Live
                            </span>
                        </div>
                    </div>

                    {/* Terminal Content Split */}
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800/80 bg-[#0A0E10] font-mono-code text-xs sm:text-sm">
                        {/* Input Payload */}
                        <div className="p-5 text-slate-300 leading-relaxed">
                            <div className="text-slate-500 uppercase tracking-widest text-[10px] mb-3 font-sans font-bold flex items-center gap-1.5">
                                <Cpu className="w-3.5 h-3.5 text-[#2DD4BF]" /> User Input Prompt
                            </div>
                            <p className="text-slate-400">// Pitch Prompt</p>
                            <pre className="text-emerald-400/90 mt-2 whitespace-pre-wrap">
                                {`"Write a cold email to Sarah Connor, VP of Engineering at Cyberdyne Systems. Pitch our AI testing platform to cut build times by 40%."`}
                            </pre>
                            <div className="mt-6 pt-3 border-t border-slate-800/60 flex items-center justify-between text-slate-400 text-xs">
                                <span>Output Package: <strong className="text-emerald-400 font-semibold">Email + Follow-up + LinkedIn DM</strong></span>
                            </div>
                        </div>

                        {/* Generated Email Output */}
                        <div className="p-5 bg-[#070A0B] text-slate-200">
                            <div className="text-slate-500 uppercase tracking-widest text-[10px] mb-3 font-sans font-bold flex items-center justify-between">
                                <span className="flex items-center gap-1.5 text-[#2DD4BF]">
                                    <Sparkles className="w-3.5 h-3.5" /> Generated Cold Email
                                </span>
                                <span className="text-[10px] text-slate-400 font-mono">Spam Score: 0.01</span>
                            </div>

                            <div className="space-y-2 font-sans">
                                <div className="text-xs text-slate-400 border-b border-slate-800/60 pb-2">
                                    <strong className="text-slate-300 font-semibold">Subject:</strong> Quick question regarding Cyberdyne's build pipeline
                                </div>
                                <div className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1 space-y-2">
                                    <p>Hi Sarah,</p>
                                    <p>Saw Cyberdyne's recent expansion in engineering velocity. Teams often hit a bottleneck with slow CI build cycles as headcount grows.</p>
                                    <p>We built our AI engine to automatically pinpoint test flakiness and cut build times by 40%.</p>
                                    <p>Open to a quick 5-min demo this Thursday?</p>
                                    <p className="text-slate-400 pt-1">Best,<br />Alex Mercer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION DIVIDER LINE */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
            </div>

            {/* 3. FEATURES SECTION */}
            <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="mb-16">
                    <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl mx-auto">
                        Everything you need to <span className="font-serif-italic font-normal text-[#2DD4BF]">close more deals</span>
                    </h2>
                    <p className="mt-4 text-slate-400 text-base sm:text-lg max-w-xl mx-auto font-normal">
                        Built for sales teams who demand performance.
                    </p>
                </div>

                {/* 3 Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    {/* Card 1 */}
                    <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800/90 hover:border-[#2DD4BF]/50 shadow-xl transition-all duration-300 group flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-[#2DD4BF]/10 border border-[#2DD4BF]/20 flex items-center justify-center text-[#2DD4BF] mb-6 group-hover:scale-110 transition-transform">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Lightning Fast Generation</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Generate highly custom cold emails in seconds using state-of-the-art AI.
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800/90 hover:border-[#2DD4BF]/50 shadow-xl transition-all duration-300 group flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-[#2DD4BF]/10 border border-[#2DD4BF]/20 flex items-center justify-center text-[#2DD4BF] mb-6 group-hover:scale-110 transition-transform">
                                <FileText className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 sm:mb-3">Omnichannel Outreach</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Get an email, a follow-up, and a LinkedIn DM perfectly synced for your prospect.
                            </p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800/90 hover:border-[#2DD4BF]/50 shadow-xl transition-all duration-300 group flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-[#2DD4BF]/10 border border-[#2DD4BF]/20 flex items-center justify-center text-[#2DD4BF] mb-6 group-hover:scale-110 transition-transform">
                                <BarChart3 className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Higher Conversion Rates</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Personalized copy ensures higher open rates and better reply outcomes.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION DIVIDER */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
            </div>

            {/* 4. FEATURE 2: SECURITY & AUDIT SCANNER */}
            <section id="security" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <div className="text-xs font-mono uppercase tracking-widest text-[#2DD4BF] mb-2 flex items-center gap-2">
                        <Lock className="w-4 h-4" /> // SECURITY & DELIVERABILITY
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white max-w-3xl">
                        Every email is{' '}
                        <span className="font-serif-italic font-normal text-[#2DD4BF]">scored</span>{' '}
                        for prompt injection and flagged before sending.
                    </h2>
                    <p className="mt-4 text-slate-400 text-base sm:text-lg max-w-2xl">
                        Real-time reputation radar protects your domain from high-risk leads, unverified MX records, and blacklists.
                    </p>
                </div>

                {/* Interactive Scanner Mockup */}
                <div className="glass-panel rounded-2xl border border-slate-800/90 overflow-hidden">
                    <div className="p-4 bg-[#0C1113] border-b border-slate-800/80 flex items-center justify-between text-xs font-mono">
                        <div className="flex items-center gap-2 text-slate-400">
                            <Server className="w-4 h-4 text-[#2DD4BF]" />
                            <span>Real-time Deliverability Scanner</span>
                        </div>
                        <span className="text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                            Status: Active Guard
                        </span>
                    </div>

                    <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Metric 1 */}
                        <div className="p-5 rounded-xl bg-[#090D0E] border border-slate-800/80">
                            <div className="text-xs font-mono text-slate-500 uppercase mb-1">Inbox Placement Rate</div>
                            <div className="text-3xl font-bold text-white flex items-baseline gap-2">
                                99.4% <span className="text-xs text-emerald-400 font-mono font-normal">+2.4% vs industry</span>
                            </div>
                            <div className="w-full bg-slate-800 h-2 rounded-full mt-4 overflow-hidden">
                                <div className="bg-[#2DD4BF] h-full w-[99.4%]" />
                            </div>
                        </div>

                        {/* Metric 2 */}
                        <div className="p-5 rounded-xl bg-[#090D0E] border border-slate-800/80">
                            <div className="text-xs font-mono text-slate-500 uppercase mb-1">Spam Risk Score</div>
                            <div className="text-3xl font-bold text-white flex items-baseline gap-2">
                                0.02 <span className="text-xs text-emerald-400 font-mono font-normal">Ultra Low Risk</span>
                            </div>
                            <div className="w-full bg-slate-800 h-2 rounded-full mt-4 overflow-hidden">
                                <div className="bg-emerald-400 h-full w-[5%]" />
                            </div>
                        </div>

                        {/* Metric 3 */}
                        <div className="p-5 rounded-xl bg-[#090D0E] border border-slate-800/80">
                            <div className="text-xs font-mono text-slate-500 uppercase mb-1">Domain Health Score</div>
                            <div className="text-3xl font-bold text-white flex items-baseline gap-2">
                                100 / 100 <span className="text-xs text-emerald-400 font-mono font-normal">Protected</span>
                            </div>
                            <div className="w-full bg-slate-800 h-2 rounded-full mt-4 overflow-hidden">
                                <div className="bg-[#2DD4BF] h-full w-[100%]" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION DIVIDER */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
            </div>

            {/* 5. FEATURE 3: COMPLETE OUTREACH PACKAGES */}
            <section id="outreach-packages" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <div className="text-xs font-mono uppercase tracking-widest text-[#2DD4BF] mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" /> // GENERATED OUTREACH PACKAGES
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white max-w-3xl">
                        One simple prompt,{' '}
                        <span className="font-serif-italic font-normal text-[#2DD4BF]">four tailored outputs.</span>
                    </h2>
                    <p className="mt-4 text-slate-400 text-base sm:text-lg max-w-2xl">
                        Every generation produces a complete multichannel campaign: a optimized subject line, primary cold email, follow-up email, and a high-converting LinkedIn DM.
                    </p>
                </div>

                {/* Outreach Package Editor Widget */}
                <div className="glass-panel rounded-2xl border border-slate-800/90 overflow-hidden shadow-xl">
                    {/* Tabs */}
                    <div className="px-4 py-3 bg-[#0C1113] border-b border-slate-800/80 flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2 overflow-x-auto">
                            {[
                                { id: 'email', label: 'Primary Email' },
                                { id: 'followup', label: 'Follow-Up Email' },
                                { id: 'linkedin', label: 'LinkedIn DM' },
                                { id: 'subject', label: 'Subject Lines' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${activeTab === tab.id
                                        ? 'bg-slate-800 text-[#2DD4BF] font-semibold border border-[#2DD4BF]/30'
                                        : 'text-slate-400 hover:text-slate-200'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={handleCopyCode}
                            className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700/60 transition-colors"
                        >
                            {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedCode ? 'Copied Content!' : 'Copy Channel Output'}</span>
                        </button>
                    </div>

                    {/* Code / Content Container */}
                    <div className="p-6 bg-[#080B0C] overflow-x-auto font-mono-code text-sm text-slate-300 leading-relaxed min-h-[220px]">
                        <pre className="text-emerald-400/90 whitespace-pre-wrap font-sans text-sm sm:text-base leading-relaxed">{outreachExamples[activeTab]}</pre>
                    </div>
                </div>
            </section>

            {/* SECTION DIVIDER */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
            </div>

            {/* 8. FOOTER & WHATSAPP BUTTON */}
            <WhatsAppButton />
            <Footer />

        </div>
    );
};

export default Home;