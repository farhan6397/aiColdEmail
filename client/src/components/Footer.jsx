import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="border-t border-slate-900 bg-[#060809] pt-16 pb-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-16 border-b border-slate-800/60">
                    {/* Column 1 */}
                    <div>
                        <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-4">Product</h4>
                        <ul className="space-y-2.5 text-sm text-slate-400">
                            <li><Link to="/dashboard" onClick={scrollToTop} className="hover:text-white transition-colors">AI Email Generator</Link></li>
                            <li><Link to="/analytics" onClick={scrollToTop} className="hover:text-white transition-colors">Spam Audit Scanner</Link></li>
                            <li><Link to="/presets" onClick={scrollToTop} className="hover:text-white transition-colors">Multichannel Packages</Link></li>
                            <li><Link to="/benchmarks" onClick={scrollToTop} className="hover:text-white transition-colors">Deliverability Radar</Link></li>
                        </ul>
                    </div>

                    {/* Column 2 */}
                    <div>
                        <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-4">Outreach Tools</h4>
                        <ul className="space-y-2.5 text-sm text-slate-400">
                            <li><Link to="/dashboard" onClick={scrollToTop} className="hover:text-white transition-colors">Cold Email Generator</Link></li>
                            <li><Link to="/history" onClick={scrollToTop} className="hover:text-white transition-colors">Follow-Up Writer</Link></li>
                            <li><Link to="/history" onClick={scrollToTop} className="hover:text-white transition-colors">LinkedIn DM Creator</Link></li>
                            <li><Link to="/presets" onClick={scrollToTop} className="hover:text-white transition-colors">Subject Line Generator</Link></li>
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div>
                        <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-4">Resources</h4>
                        <ul className="space-y-2.5 text-sm text-slate-400">
                            <li><Link to="/guide" onClick={scrollToTop} className="hover:text-white transition-colors">Cold Outreach Guide</Link></li>
                            <li><Link to="/spam-dictionary" onClick={scrollToTop} className="hover:text-white transition-colors">Spam Filter Dictionary</Link></li>
                            <li><Link to="/benchmarks" onClick={scrollToTop} className="hover:text-white transition-colors">Email Deliverability Benchmarks</Link></li>
                        </ul>
                    </div>

                    {/* Column 4 */}
                    <div>
                        <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-4">Help & Support</h4>
                        <ul className="space-y-2.5 text-sm text-slate-400">
                            <li><Link to="/support" onClick={scrollToTop} className="hover:text-white transition-colors">Support & Help Center</Link></li>
                            <li><Link to="/dashboard" onClick={scrollToTop} className="hover:text-white transition-colors">Studio Dashboard</Link></li>
                            <li><Link to="/history" onClick={scrollToTop} className="hover:text-white transition-colors">Campaign History</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Watermark Logo */}
                <div className="pt-12 text-center select-none pointer-events-none opacity-10">
                    <span className="font-extrabold text-7xl sm:text-9xl tracking-tighter text-white font-sans">
                        coldmail.ai
                    </span>
                </div>

                {/* Bottom Copyright */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <p>© {new Date().getFullYear()} ColdMail.ai. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <Link to="/privacy" onClick={scrollToTop} className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
                        <Link to="/terms" onClick={scrollToTop} className="hover:text-slate-400 transition-colors">Terms of Service</Link>
                        <Link to="/security-info" onClick={scrollToTop} className="hover:text-slate-400 transition-colors">Security</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
