import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Linkedin, Github, Send, CheckCircle2, Terminal } from 'lucide-react';

const Contact = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    return (
        <section id="contact" className="py-32 relative overflow-hidden bg-[#05070A]">
            {/* Background Atmosphere */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent/5 rounded-full blur-[180px] pointer-events-none opacity-50" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-glow/5 rounded-full blur-[120px] pointer-events-none opacity-30" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                    {/* Left Column: Info & Socials */}
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                                <Terminal size={14} /> Available for Collaboration
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter text-white">
                                Initiating <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-glow to-accent bg-[length:200%_auto] animate-gradient-x">New Connect.</span>
                            </h2>
                            <p className="text-gray-400 text-xl max-w-md leading-relaxed font-medium">
                                Ready to deploy production-grade AI intelligence or scale your data infrastructure? Let's architect the future.
                            </p>
                        </motion.div>

                        <div className="space-y-4">
                            {[
                                { icon: Mail, label: 'Secure Email', value: 'hello@ai-engineer.com', href: 'mailto:hello@ai-engineer.com', color: '#6366F1' },
                                { icon: Linkedin, label: 'LinkedIn Network', value: 'linkedin.com/in/ai_engineer', href: '#', color: '#0EA5E9' },
                                { icon: Github, label: 'Open Source', value: 'github.com/ai_engineer', href: '#', color: '#F8FAFC' }
                            ].map((social, i) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 * i }}
                                    className="flex items-center gap-6 p-6 rounded-[32px] bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 group"
                                >
                                    <div
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#0B0F19] border border-white/10 group-hover:scale-110 transition-transform duration-500"
                                        style={{ color: social.color }}
                                    >
                                        <social.icon size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{social.label}</p>
                                        <p className="text-lg font-bold text-white group-hover:text-accent transition-colors">{social.value}</p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative"
                    >
                        <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[64px] p-10 md:p-16 relative overflow-hidden">
                            {/* Inner Decorative Glow */}
                            <div className="absolute -top-32 -right-32 w-80 h-80 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

                            <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] ml-4">Full Name</label>
                                        <div className="relative group">
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-8 py-5 bg-[#0B0F19] border border-white/5 rounded-[24px] focus:outline-none focus:border-accent/50 focus:bg-[#0D121F] transition-all text-white placeholder:text-gray-700"
                                                placeholder="Enter your name"
                                            />
                                            <div className="absolute inset-0 rounded-[24px] border border-accent/0 group-hover:border-accent/20 pointer-events-none transition-colors" />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] ml-4">Direct Email</label>
                                        <div className="relative group">
                                            <input
                                                type="email"
                                                required
                                                className="w-full px-8 py-5 bg-[#0B0F19] border border-white/5 rounded-[24px] focus:outline-none focus:border-accent/50 focus:bg-[#0D121F] transition-all text-white placeholder:text-gray-700"
                                                placeholder="email@example.com"
                                            />
                                            <div className="absolute inset-0 rounded-[24px] border border-accent/0 group-hover:border-accent/20 pointer-events-none transition-colors" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] ml-4">Project Scope</label>
                                    <div className="relative">
                                        <select className="w-full px-8 py-5 bg-[#0B0F19] border border-white/5 rounded-[24px] focus:outline-none focus:border-accent/50 focus:bg-[#0D121F] transition-all text-white appearance-none cursor-pointer">
                                            <option className="bg-[#111827]">Generative AI Deployment</option>
                                            <option className="bg-[#111827]">ML Pipeline Optimization</option>
                                            <option className="bg-[#111827]">Data Architecture Design</option>
                                            <option className="bg-[#111827]">Enterprise Solutions</option>
                                        </select>
                                        <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
                                            <CheckCircle2 size={16} />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] ml-4">Detailed Message</label>
                                    <div className="relative group">
                                        <textarea
                                            rows="5"
                                            required
                                            className="w-full px-8 py-6 bg-[#0B0F19] border border-white/5 rounded-[24px] focus:outline-none focus:border-accent/50 focus:bg-[#0D121F] transition-all text-white placeholder:text-gray-700 resize-none"
                                            placeholder="Tell me about your vision..."
                                        />
                                        <div className="absolute inset-0 rounded-[24px] border border-accent/0 group-hover:border-accent/20 pointer-events-none transition-colors" />
                                    </div>
                                </div>

                                <div className="relative">
                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitted}
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-6 bg-accent rounded-[24px] font-black text-[10px] uppercase tracking-[0.4em] text-white shadow-2xl shadow-accent/20 hover:shadow-accent/40 flex items-center justify-center gap-4 transition-all duration-300 relative overflow-hidden group/btn"
                                    >
                                        {/* Shine Effect */}
                                        <div className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                                        <AnimatePresence mode="wait">
                                            {isSubmitted ? (
                                                <motion.div
                                                    key="success"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="flex items-center gap-3"
                                                >
                                                    <CheckCircle2 size={18} /> Transmission Complete
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="idle"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="flex items-center gap-3"
                                                >
                                                    Send Message <Send size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
