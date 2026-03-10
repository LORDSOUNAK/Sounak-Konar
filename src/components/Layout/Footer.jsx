import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-12 bg-background-dark border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-8">
                {/* Social Icons */}
                <div className="flex items-center gap-6">
                    {[
                        { icon: Github, href: '#', label: 'GitHub' },
                        { icon: Linkedin, href: '#', label: 'LinkedIn' },
                        { icon: Twitter, href: '#', label: 'Twitter' },
                        { icon: Mail, href: '#', label: 'Email' }
                    ].map((social) => (
                        <a
                            key={social.label}
                            href={social.href}
                            className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-accent hover:border-accent/40 hover:bg-white/10 transition-all duration-300 group"
                            aria-label={social.label}
                        >
                            <social.icon size={20} className="group-hover:scale-110 transition-transform" />
                        </a>
                    ))}
                </div>

                {/* Copyright & Text */}
                <div className="text-center space-y-2">
                    <p className="text-gray-500 font-medium text-sm">
                        © {currentYear} AI Engineer Portfolio. All rights reserved.
                    </p>
                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em]">
                        Built with <span className="text-accent">React</span> & <span className="text-glow">Framer Motion</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
