import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const roles = ["GenAI Engineer", "ML Engineer", "Data Engineer"];

const Particle = ({ delay }) => (
    <motion.div
        initial={{ y: "100vh", opacity: 0, x: Math.random() * 100 + "%" }}
        animate={{
            y: "-10vh",
            opacity: [0, 0.4, 0],
            x: (Math.random() - 0.5) * 20 + "%"
        }}
        transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay,
            ease: "linear"
        }}
        className="absolute w-1 h-1 bg-white rounded-full blur-[1px] pointer-events-none"
    />
);

const BackgroundBlobs = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
            animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
                scale: [1, 1.2, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-accent/20 rounded-full blur-[120px]"
        />
        <motion.div
            animate={{
                x: [0, -80, 0],
                y: [0, 100, 0],
                scale: [1, 1.3, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-glow/10 rounded-full blur-[120px]"
        />
        <motion.div
            animate={{
                x: [0, 50, 0],
                y: [0, -50, 0],
                scale: [1, 1.1, 1],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] bg-accent/5 rounded-full blur-[100px]"
        />
    </div>
);

const Hero = () => {
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypSpeed] = useState(150);

    const particles = useMemo(() =>
        [...Array(20)].map((_, i) => <Particle key={i} delay={i * 0.5} />),
        []);

    useEffect(() => {
        const handleTyping = () => {
            const currentRole = roles[roleIndex];
            if (isDeleting) {
                setDisplayText(currentRole.substring(0, displayText.length - 1));
                setTypSpeed(50);
            } else {
                setDisplayText(currentRole.substring(0, displayText.length + 1));
                setTypSpeed(150);
            }

            if (!isDeleting && displayText === currentRole) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && displayText === '') {
                setIsDeleting(false);
                setRoleIndex((prev) => (prev + 1) % roles.length);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [displayText, isDeleting, roleIndex, typingSpeed]);

    return (
        <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-[#05070A]">
            <BackgroundBlobs />
            {particles}

            <div className="relative z-10 text-center px-6 max-w-5xl">
                {/* Intro Animation Group */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="mb-8 inline-block"
                    >
                        <span className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-accent text-xs font-black uppercase tracking-[0.4em] backdrop-blur-sm">
                            Advancing Intelligence
                        </span>
                    </motion.div>

                    <h1 className="text-6xl md:text-9xl font-black mb-8 leading-[0.9] tracking-tighter">
                        I am a <br />
                        <span className="relative">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-glow to-accent bg-[length:200%_auto] animate-gradient">
                                {displayText}
                            </span>
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="absolute -right-4 top-0 h-full w-[4px] bg-accent"
                            />
                        </span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                        className="max-w-2xl mx-auto text-lg md:text-2xl text-gray-400 font-medium mb-16 leading-relaxed opacity-80"
                    >
                        Engineer specializing in scalable Generative AI systems,
                        deep learning architectures, and high-performance data factories.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-8"
                    >
                        <motion.a
                            href="#projects"
                            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(99,102,241,0.4)" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-12 py-5 bg-accent text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 relative group"
                        >
                            <span className="relative z-10">Explore Work</span>
                            <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.a>

                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-12 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-sm uppercase tracking-widest backdrop-blur-md transition-all duration-300"
                        >
                            Let's Connect
                        </motion.a>
                    </motion.div>
                </motion.div>
            </div>

            {/* Cinematic bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#05070A] to-transparent pointer-events-none" />

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:block"
            >
                <div className="flex flex-col items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-600">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-[2px] h-12 bg-gradient-to-b from-accent to-transparent"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
