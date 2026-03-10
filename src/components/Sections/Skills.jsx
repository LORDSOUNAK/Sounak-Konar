import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '../../lib/utils';

const skillGroups = [
    {
        title: 'GenAI',
        skills: ['OpenAI', 'LangChain', 'RAG', 'Vector DB', 'AutoGPT'],
        color: '#6366F1' // Accent
    },
    {
        title: 'Machine Learning',
        skills: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'XGBoost', 'Keras'],
        color: '#A855F7' // Purple
    },
    {
        title: 'Data Engineering',
        skills: ['Spark', 'Airflow', 'Kafka', 'Fabric', 'Snowflake'],
        color: '#22D3EE' // Glow/Cyan
    },
    {
        title: 'Architecture',
        skills: ['Kubernetes', 'Docker', 'AWS', 'MLOps', 'CI/CD'],
        color: '#F43F5E' // Rose
    }
];

const SkillCard = ({ group, delay }) => {
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay }}
            className="relative group h-full"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent rounded-[48px] border border-white/10 group-hover:border-white/20 transition-colors duration-500" />

            {/* Animated Glowing Border */}
            <div
                className="absolute inset-x-0 inset-y-0 rounded-[48px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    boxShadow: `0 0 30px -10px ${group.color}40`,
                    border: `1.5px solid ${group.color}40`
                }}
            />

            <div className="relative z-10 p-10 flex flex-col h-full" style={{ transform: "translateZ(50px)" }}>
                <h3 className="text-2xl font-black mb-8 tracking-tighter" style={{ color: group.color }}>
                    {group.title}
                </h3>

                <div className="flex flex-wrap gap-3">
                    {group.skills.map((skill, i) => (
                        <motion.div
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: delay + 0.3 + (i * 0.05) }}
                            whileHover={{
                                scale: 1.1,
                                backgroundColor: `${group.color}20`,
                                borderColor: `${group.color}40`,
                                color: '#fff'
                            }}
                            className="px-5 py-3 bg-white/[0.03] border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-500 transition-all cursor-default"
                        >
                            {skill}
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const Skills = () => {
    return (
        <section id="skills" className="py-32 relative overflow-hidden bg-[#05070A]">
            {/* Atmosphere */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-glow/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-6"
                    >
                        Technical Arsenal
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black mb-8 tracking-tighter"
                    >
                        Capabilities <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-glow">& Stack.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="text-gray-500 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed"
                    >
                        A high-performance toolkit engineered for the complexity of modern
                        Artificial Intelligence and large-scale data ecosystems.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 perspective-2000">
                    {skillGroups.map((group, i) => (
                        <SkillCard key={group.title} group={group} delay={i * 0.1} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
