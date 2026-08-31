import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';
import { Bookmark, ArrowUpRight, Sparkles, Home, Sliders } from 'lucide-react';

const PresetsPage = () => {
    const navigate = useNavigate();

    const promptPresets = [
        {
            title: 'SaaS Engineering Pitch',
            tone: 'Conversational',
            prompt: 'Write a cold email to Sarah Connor, VP of Engineering at Cyberdyne Systems. Pitch our AI test automation platform to cut CI build times by 40%.'
        },
        {
            title: 'Agency Growth Outreach',
            tone: 'Direct & Short',
            prompt: 'Write a concise cold outreach email to Alex Mercer, Head of Marketing at ScaleLayer. Pitch our performance ad creative audit to increase demo bookings.'
        },
        {
            title: 'Proposal Follow-Up',
            tone: 'Professional',
            prompt: 'Draft a friendly follow-up email for a prospect who reviewed our custom software proposal 3 days ago but hasn\'t booked a call yet.'
        },
        {
            title: 'Executive LinkedIn DM',
            tone: 'Persuasive',
            prompt: 'Write a short 2-sentence LinkedIn DM to Marcus Vance, VP of Revenue Operations, pitching automated deliverability optimization.'
        },
        {
            title: 'Enterprise Security Audit',
            tone: 'Professional',
            prompt: 'Draft a high-priority cold email to David Vance, Chief Information Security Officer at Nexus Cloud, offering an automated API vulnerability scan.'
        },
        {
            title: 'FinTech Demo Request',
            tone: 'Direct & Short',
            prompt: 'Write a 3-sentence outreach email to Elena Rostova, VP of Finance at PayStream, pitching our AI-driven fraud detection dashboard.'
        }
    ];

    const handleUsePreset = (preset) => {
        // Navigate to studio generator with preset state
        navigate('/dashboard', { state: { presetPrompt: preset.prompt, presetTone: preset.tone } });
    };

    return (
        <div className="min-h-screen bg-[#080B0C] text-slate-200 font-sans flex overflow-x-hidden selection:bg-[#2DD4BF]/20 selection:text-[#2DD4BF]">
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                <header className="sticky top-0 z-30 bg-[#080B0C]/90 backdrop-blur-md border-b border-slate-800/80 px-3 sm:px-6 h-16 flex items-center justify-between gap-2 min-w-0">
                    <div className="flex items-center gap-2 min-w-0">
                        <h1 className="text-sm sm:text-lg font-bold text-white flex items-center gap-2 whitespace-nowrap truncate">
                            <Bookmark className="w-5 h-5 text-[#2DD4BF] shrink-0" />
                            <span>Prompt Presets</span>
                        </h1>
                    </div>

                    <Link
                        to="/"
                        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/70 text-xs font-semibold text-slate-300 hover:text-white transition-all shadow-md shrink-0"
                    >
                        <Home className="w-3.5 h-3.5 text-[#2DD4BF] shrink-0" />
                        <span className="whitespace-nowrap">Home</span>
                    </Link>
                </header>

                <main className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
                    <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/90 shadow-xl">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Bookmark className="w-5 h-5 text-[#2DD4BF]" />
                                <span>Curated Prompt Library</span>
                            </h2>
                            <p className="text-slate-400 text-xs mt-1">
                                Click any pre-tested prompt template below to automatically load it into the AI Generator workspace.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {promptPresets.map((preset, idx) => (
                                <div
                                    key={idx}
                                    className="p-5 rounded-2xl bg-[#070A0B] border border-slate-800 hover:border-[#2DD4BF]/50 transition-all flex flex-col justify-between group"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-sm font-bold text-white group-hover:text-[#2DD4BF] transition-colors">{preset.title}</span>
                                            <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700">
                                                Tone: {preset.tone}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-400 leading-relaxed mb-6">
                                            "{preset.prompt}"
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => handleUsePreset(preset)}
                                        className="w-full py-2.5 px-4 rounded-xl bg-[#2DD4BF]/10 hover:bg-[#2DD4BF]/20 text-[#2DD4BF] text-xs font-semibold border border-[#2DD4BF]/30 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <span>Use Template in AI Generator</span>
                                        <ArrowUpRight className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PresetsPage;
