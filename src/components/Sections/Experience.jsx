import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

const experiences = [
    {
        company: "Lumina AI Labs",
        role: "Senior GenAI Engineer",
        period: "2023 - Present",
        location: "San Francisco, CA (Remote)",
        description: "Leading the development of multi-modal RAG systems and specialized LLM agents for enterprise knowledge synthesis.",
        achievements: [
            "Architected a distributed RAG pipeline processing 5M+ tokens/sec with <200ms p99 latency.",
            "Fine-tuned Llama-3-70B models reaching 92% accuracy on complex domain-specific reasoning tasks.",
            "Implemented an automated evaluation framework reducing manual testing hours by 70%."
        ],
        color: "#6366F1"
    },
    {
        company: "Nexus Data Systems",
        role: "Lead Machine Learning Engineer",
        period: "2021 - 2023",
        location: "New York, NY",
        description: "Engineered high-performance computer vision pipelines and MLOps infrastructure for autonomous retail systems.",
        achievements: [
            "Deployed real-time object detection models across 500+ edge devices with 99.8% uptime.",
            "Optimized inference throughput by 3x using TensorRT and custom CUDA kernels.",
            "Scaled the MLOps platform to handle 50+ training jobs simultaneously across multi-node A100 clusters."
        ],
        color: "#A855F7"
    },
    {
        company: "DataStream Corp",
        role: "Big Data Architect",
        period: "2019 - 2021",
        location: "Austin, TX",
        description: "Designed and optimized large-scale ETL fabrics and cloud-native data lakehouse architectures.",
        achievements: [
            "Migrated 500TB legacy data warehouse to a modern Lakehouse architecture, saving $1.2M annually.",
            "Developed an automated data quality engine processing 20B+ records daily with zero data loss.",
            "Lead the adoption of Apache Iceberg and Spark 3.0 across the engineering organization."
        ],
        color: "#22D3EE"
    }
];

const ExperienceItem = ({ exp, index, scrollProgress }) => {
    const isLast = index === experiences.length - 1;
    const cardRef = useRef(null);

    return (
        <div className="relative pl-12 md:pl-24 pb-20 group">
            {/* Timeline Line (Static background) */}
            {!isLast && (
                <div className="absolute left-[11px] md:left-[23px] top-[40px] bottom-0 w-[2px] bg-white/5" />
            )}

            {/* Node Marker */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.2 }}
                className="absolute left-0 md:left-3 top-2 z-20"
            >
                <div
                    className="w-6 h-6 rounded-full border-4 border-[#05070A] shadow-2xl relative"
                    style={{ backgroundColor: exp.color }}
                >
                    <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: exp.color }} />
                    <div className="absolute -inset-4 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" style={{ backgroundColor: exp.color }} />
                </div>
            </motion.div>

            {/* Content Card */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            >
                <div className="bg-white/[0.03] border border-white/10 rounded-[40px] p-8 md:p-12 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 group/card relative overflow-hidden">
                    {/* Accent Glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 opacity-0 group-hover/card:opacity-10 transition-opacity blur-[100px] pointer-events-none" style={{ backgroundColor: exp.color }} />

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter mb-2 group-hover/card:text-accent transition-colors">
                                {exp.role}
                            </h3>
                            <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-gray-500 uppercase tracking-widest">
                                <span className="flex items-center gap-2">
                                    <Briefcase size={14} className="text-accent" /> {exp.company}
                                </span>
                                <span className="flex items-center gap-2">
                                    <MapPin size={14} /> {exp.location}
                                </span>
                            </div>
                        </div>
                        <div className="px-5 py-2 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-gray-400 self-start md:self-center">
                            <span className="flex items-center gap-2">
                                <Calendar size={14} /> {exp.period}
                            </span>
                        </div>
                    </div>

                    <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-3xl">
                        {exp.description}
                    </p>

                    <div className="space-y-4">
                        {exp.achievements.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 + (i * 0.15) }}
                                className="flex items-start gap-4 group/bullet"
                            >
                                <div className="mt-1.5 min-w-[18px]">
                                    <CheckCircle2 size={18} className="text-accent opacity-40 group-hover/bullet:opacity-100 transition-opacity" />
                                </div>
                                <p className="text-gray-300 font-medium leading-relaxed group-hover/bullet:text-white transition-colors">
                                    {item}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const Experience = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const pathLength = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section id="experience" ref={containerRef} className="py-32 relative bg-[#05070A] overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-6"
                    >
                        Professional Journey
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black tracking-tighter text-white"
                    >
                        Engineering <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-glow">Experience.</span>
                    </motion.h2>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Animated Timeline Line Overlay */}
                    <div className="absolute left-[11px] md:left-[23px] top-[40px] bottom-[100px] w-[2px] bg-white/5 overflow-hidden">
                        <motion.div
                            style={{ scaleY: pathLength, originY: 0 }}
                            className="absolute inset-0 bg-gradient-to-b from-accent via-glow to-transparent z-10"
                        />
                    </div>

                    {experiences.map((exp, i) => (
                        <ExperienceItem
                            key={exp.company}
                            exp={exp}
                            index={i}
                            scrollProgress={scrollYProgress}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
