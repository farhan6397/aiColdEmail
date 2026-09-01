import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../utils/api.js';
import { formatIST } from '../utils/formatDate.js';
import {
    History,
    Search,
    RotateCcw,
    Sparkles,
    ArrowUpRight,
    Loader2,
    Home,
    Copy,
    Check,
    Mail,
    CheckCircle2
} from 'lucide-react';

const HistoryPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [history, setHistory] = useState([]);
    const [historyLoading, setHistoryLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [copyFeedback, setCopyFeedback] = useState(false);
    const [activeTab, setActiveTab] = useState('email');

    const fetchHistory = async () => {
        setHistoryLoading(true);
        try {
            const res = await api.get('/ai/history');
            if (res.data?.data) {
                setHistory(res.data.data);
            }
        } catch (err) {
            console.error('Error fetching email history:', err);
        } finally {
            setHistoryLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const filteredHistory = history.filter((item) => {
        const query = searchQuery.toLowerCase();
        return (
            (item.prompt && item.prompt.toLowerCase().includes(query)) ||
            (item.subject && item.subject.toLowerCase().includes(query)) ||
            (item.emailBody && item.emailBody.toLowerCase().includes(query))
        );
    });

    const handleCopy = (text) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopyFeedback(true);
        setTimeout(() => setCopyFeedback(false), 2000);
    };

    return (
        <div className="min-h-screen bg-[#080B0C] text-slate-200 font-sans flex overflow-x-hidden selection:bg-[#2DD4BF]/20 selection:text-[#2DD4BF]">
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                {/* Header Bar */}
                <header className="sticky top-0 z-30 bg-[#080B0C]/90 backdrop-blur-md border-b border-slate-800/80 px-3 sm:px-6 h-16 flex items-center justify-between gap-2 min-w-0">
                    <div className="flex items-center gap-2 min-w-0">
                        <h1 className="text-sm sm:text-lg font-bold text-white flex items-center gap-2 whitespace-nowrap truncate">
                            <History className="w-5 h-5 text-[#2DD4BF] shrink-0" />
                            <span>Saved Outreach History</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                        <Link
                            to="/"
                            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/70 text-xs font-semibold text-slate-300 hover:text-white transition-all shadow-md shrink-0"
                        >
                            <Home className="w-3.5 h-3.5 text-[#2DD4BF] shrink-0" />
                            <span className="whitespace-nowrap">Home</span>
                        </Link>

                        <button
                            onClick={fetchHistory}
                            title="Refresh history"
                            className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors shrink-0"
                        >
                            <RotateCcw className={`w-4 h-4 ${historyLoading ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                </header>

                <main className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
                    <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/90 shadow-xl">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <History className="w-5 h-5 text-[#2DD4BF]" />
                                    <span>All Generated Outreach Packages</span>
                                </h2>
                                <p className="text-slate-400 text-xs mt-1">
                                    Review, inspect, and copy past AI generated outreach campaigns.
                                </p>
                            </div>

                            {/* Search Bar */}
                            <div className="relative w-full sm:w-72">
                                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search history by keyword..."
                                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#070A0B] border border-slate-800 focus:border-[#2DD4BF] text-slate-200 text-xs outline-none"
                                />
                            </div>
                        </div>

                        {historyLoading ? (
                            <div className="py-16 text-center text-slate-400 text-sm flex items-center justify-center gap-2">
                                <Loader2 className="w-5 h-5 animate-spin text-[#2DD4BF]" />
                                <span>Loading outreach history...</span>
                            </div>
                        ) : filteredHistory.length === 0 ? (
                            <div className="py-16 text-center text-slate-500 text-sm bg-[#070A0B] rounded-2xl border border-slate-800/80">
                                No saved campaign history found matching your search.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                                {/* Left Column: Campaign List (5 cols) */}
                                <div className="lg:col-span-5 space-y-3 max-h-[600px] overflow-y-auto pr-1">
                                    {filteredHistory.map((item, idx) => (
                                        <div
                                            key={item._id || idx}
                                            onClick={() => setSelectedItem(item)}
                                            className={`p-4 rounded-2xl bg-[#070A0B] border transition-all cursor-pointer ${selectedItem?._id === item._id
                                                ? 'border-[#2DD4BF] bg-slate-900/90 shadow-md'
                                                : 'border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/40'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-1.5">
                                                <span className="flex items-center gap-1 text-[#2DD4BF]">
                                                    <Sparkles className="w-3.5 h-3.5" /> Campaign #{history.length - idx}
                                                </span>
                                                <span title={formatIST(item.createdAt)}>{formatIST(item.createdAt)}</span>
                                            </div>

                                            <h3 className="text-sm font-bold text-white line-clamp-1 mb-1">
                                                {item.subject || 'Generated Outreach'}
                                            </h3>

                                            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                                                {item.emailBody}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Right Column: Detailed View Box (7 cols) */}
                                <div className="lg:col-span-7">
                                    {selectedItem ? (
                                        <div className="p-6 rounded-3xl bg-[#070A0B] border border-slate-800/90 shadow-2xl min-h-[480px] flex flex-col justify-between">
                                            <div>
                                                <div className="pb-3 border-b border-slate-800/80 flex items-center justify-between">
                                                    <span className="text-xs font-mono text-slate-400">outreach-package.json</span>
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                        <CheckCircle2 className="w-3 h-3" /> Saved Package
                                                    </span>
                                                </div>

                                                {/* Output Tabs */}
                                                <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2">
                                                    {[
                                                        { id: 'email', label: '✉️ Primary Email' },
                                                        { id: 'followup', label: '🔄 Follow-Up' },
                                                        { id: 'linkedin', label: '💬 LinkedIn DM' },
                                                        { id: 'subject', label: '💡 Subject Line' }
                                                    ].map((tab) => (
                                                        <button
                                                            key={tab.id}
                                                            onClick={() => setActiveTab(tab.id)}
                                                            className={`px-3 py-1.5 rounded-xl text-xs font-medium border ${activeTab === tab.id
                                                                ? 'bg-[#2DD4BF]/15 border-[#2DD4BF]/40 text-[#2DD4BF] font-semibold'
                                                                : 'bg-slate-800/40 border-slate-800/80 text-slate-400'
                                                                }`}
                                                        >
                                                            {tab.label}
                                                        </button>
                                                    ))}
                                                </div>

                                                {/* Subject Line */}
                                                {selectedItem.subject && (
                                                    <div className="mt-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300">
                                                        <strong className="text-slate-400 font-mono uppercase mr-2">Subject:</strong>
                                                        <span className="text-white font-semibold">{selectedItem.subject}</span>
                                                    </div>
                                                )}

                                                {/* Content Display */}
                                                <div className="mt-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800/80 text-sm text-slate-300 leading-relaxed font-sans min-h-[200px] max-h-[300px] overflow-y-auto whitespace-pre-wrap">
                                                    {activeTab === 'email' && selectedItem.emailBody}
                                                    {activeTab === 'followup' && selectedItem.followUpEmail}
                                                    {activeTab === 'linkedin' && selectedItem.linkedInDM}
                                                    {activeTab === 'subject' && selectedItem.subject}
                                                </div>
                                            </div>

                                            {/* Action Toolbar */}
                                            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                                                <span className="text-xs font-mono text-slate-500">
                                                    Created: {new Date(selectedItem.createdAt || Date.now()).toLocaleString()}
                                                </span>
                                                <button
                                                    onClick={() => {
                                                        const textToCopy =
                                                            activeTab === 'email' ? selectedItem.emailBody :
                                                                activeTab === 'followup' ? selectedItem.followUpEmail :
                                                                    activeTab === 'linkedin' ? selectedItem.linkedInDM :
                                                                        selectedItem.subject;
                                                        handleCopy(textToCopy);
                                                    }}
                                                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-md"
                                                >
                                                    {copyFeedback ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                                    <span>{copyFeedback ? 'Copied!' : 'Copy Channel Content'}</span>
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="p-8 rounded-3xl bg-[#070A0B]/60 border border-dashed border-slate-800 text-center min-h-[480px] flex flex-col items-center justify-center">
                                            <Mail className="w-8 h-8 text-slate-500 mb-2" />
                                            <h4 className="text-sm font-bold text-white mb-1">Select a campaign on the left</h4>
                                            <p className="text-slate-400 text-xs max-w-xs">
                                                Click any saved campaign card from the list to view and copy its full 4-in-1 outreach package.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default HistoryPage;
