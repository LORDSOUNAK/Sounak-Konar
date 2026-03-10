import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
            let currentSection = 'hero';

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Adjust threshold for when a section is considered "active"
                    if (rect.top <= 100) {
                        currentSection = sectionId;
                    }
                }
            }
            setActiveSection(currentSection);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-background-dark/80 backdrop-blur-xl border-b border-white/5 py-4"
                    : "bg-transparent py-6"
            )}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <motion.a
                    href="#hero"
                    whileHover={{ scale: 1.05 }}
                    className="text-2xl font-black tracking-tighter z-50"
                >
                    <span className="bg-gradient-to-r from-accent to-glow bg-clip-text text-transparent">
                        DEV.PORTFOLIO
                    </span>
                </motion.a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-1">
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.href.substring(1);
                        return (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "relative px-5 py-2 text-sm font-bold uppercase tracking-widest transition-colors",
                                    isActive ? "text-accent" : "text-gray-400 hover:text-white"
                                )}
                            >
                                {link.name}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute bottom-0 left-5 right-5 h-0.5 bg-accent"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </motion.a>
                        );
                    })}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden z-50 p-2 text-gray-400 hover:text-white transition-colors"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-0 bg-background-dark/95 backdrop-blur-2xl z-40 flex flex-col items-center justify-center space-y-8"
                        >
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.15 }}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "text-3xl font-black uppercase tracking-widest transition-colors",
                                        activeSection === link.href.substring(1) ? "text-accent" : "text-gray-400 hover:text-white"
                                    )}
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                            <motion.a
                                href="#contact"
                                onClick={() => setIsOpen(false)}
                                className="mt-8 px-10 py-4 bg-accent text-white rounded-2xl font-black text-sm uppercase tracking-widest"
                            >
                                Hire Me
                            </motion.a>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default Navbar;
