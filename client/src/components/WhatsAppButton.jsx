import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
    const phoneNumber = "916397801840";
    const defaultMessage = encodeURIComponent("Hi ColdMail AI Support! I have a question regarding AI Cold Email Generator.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Chat with Us on WhatsApp"
            className="fixed bottom-6 right-6 z-50 group flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-2xl shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all duration-300"
        >
            <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-950"></span>
            </span>
            <MessageCircle className="w-5 h-5 fill-slate-950 text-emerald-500" />
            <span className="hidden sm:inline font-mono uppercase tracking-wider">Chat on WhatsApp</span>
        </a>
    );
};

export default WhatsAppButton;
