import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const About = () => {
    const sectionRef = useRef(null);
    const cardRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        cardRef.current.style.setProperty('--mouse-x', `${x}%`);
        cardRef.current.style.setProperty('--mouse-y', `${y}%`);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <section id="about" ref={sectionRef} className="py-32 relative overflow-hidden bg-[#05070A]">
            {/* Background Atmosphere */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] pointer-events-none opacity-50" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-glow/5 rounded-full blur-[120px] pointer-events-none opacity-30" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98, rotateX: 2 }}
                    animate={isInView ? { opacity: 1, scale: 1, rotateX: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div
                        ref={cardRef}
                        onMouseMove={handleMouseMove}
                        className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[64px] p-12 md:p-24 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-accent/30 transition-colors duration-700"
                    >
                        {/* Interactive Radial Glow */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(99,102,241,0.12),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="relative z-10"
                        >
                            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
                                <div className="h-[1px] w-12 bg-accent opacity-50" />
                                <span className="text-accent text-xs font-black uppercase tracking-[0.5em]">
                                    The Visionary
                                </span>
                            </motion.div>

                            <motion.h2
                                variants={itemVariants}
                                className="text-5xl md:text-7xl font-black mb-10 leading-[1.1] tracking-tighter"
                            >
                                Bridging <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-glow">Neural Networks</span> <br />
                                with Reality.
                            </motion.h2>

                            <div className="grid lg:grid-cols-5 gap-12 items-start">
                                <motion.div variants={itemVariants} className="lg:col-span-3 space-y-8">
                                    <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-medium">
                                        I build systems that don't just process data—they <span className="text-white font-bold">understand</span> it.
                                        My focus lies at the bleeding edge of Generative AI and scalable ML infrastructure.
                                    </p>
                                    <p className="text-lg text-gray-400 leading-relaxed opacity-80 max-w-xl">
                                        With a track record of transforming complex research into production-grade pipelines,
                                        I ensure every parameter counts and every data point drives value. I am obsessed with
                                        the efficiency of distributed training and the elegance of RAG architectures.
                                    </p>
                                </motion.div>

                                <motion.div variants={itemVariants} className="lg:col-span-2 grid grid-cols-2 gap-4">
                                    {[
                                        { label: 'Latency', value: '<50ms' },
                                        { label: 'Accuracy', value: '99.4%' },
                                        { label: 'Scale', value: '100M+' },
                                        { label: 'Uptime', value: '99.9%' }
                                    ].map((stat) => (
                                        <div key={stat.label} className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-accent/20 transition-all duration-300">
                                            <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-accent opacity-70">{stat.label}</div>
                                        </div>
                                    ))}
                                </motion.div>
                            </div>

                            <motion.div variants={itemVariants} className="mt-16 flex flex-wrap gap-4">
                                {['LLM Fine-tuning', 'Vector Databases', 'MLOps', 'Distributed Systems', 'Data Fabrics'].map((tag) => (
                                    <span key={tag} className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 cursor-default">
                                        {tag}
                                    </span>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
