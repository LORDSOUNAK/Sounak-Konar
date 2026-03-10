import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github, X, Code2, Cpu, Database, Layout } from 'lucide-react';

const projects = [
    {
        id: 1,
        title: "NeuroFlux AI",
        category: "Generative AI",
        description: "A large-scale RAG-based intelligence platform using custom LLM fine-tuning and vector embeddings.",
        longDescription: "NeuroFlux AI represents the pinnacle of enterprise-grade generative intelligence. Built on a foundation of LangChain and Pinecone, it leverages specialized Llama-3 models fine-tuned on vertical-specific data. The architecture provides sub-second retrieval latency across billions of documents while maintaining strict data isolation.",
        image: "/C:/Users/souna/.gemini/antigravity/brain/545a8ed0-f2c0-4faa-b5f4-966ee12ce110/project_placeholder_ai_1773168278839.png",
        tech: ["Llama-3", "LangChain", "Pinecone", "Next.js"],
        icon: Cpu,
        color: "#6366F1"
    },
    {
        id: 2,
        title: "Prophet ML",
        category: "Machine Learning",
        description: "Real-time predictive analytics engine for high-frequency financial time-series data.",
        longDescription: "Prophet ML is a specialized machine learning engine designed for the volatile world of high-frequency trading. It utilizes advanced LSTM networks and Transformer-based attention mechanisms to predict price movements with unparalleled precision. The stack is optimized for low-latency inference on NVIDIA GPUs using TensorRT.",
        image: "/C:/Users/souna/.gemini/antigravity/brain/545a8ed0-f2c0-4faa-b5f4-966ee12ce110/project_placeholder_ml_1773170192966.png",
        tech: ["PyTorch", "TensorRT", "CUDA", "FastAPI"],
        icon: Database,
        color: "#A855F7"
    },
    {
        id: 3,
        title: "DataNexus Fabric",
        category: "Data Engineering",
        description: "Automated ETL orchestration fabric processing over 100TB of streaming data daily.",
        longDescription: "DataNexus is a robust, distributed data fabric that orchestrates complex ETL workflows at massive scale. Leveraging Apache Spark and Kafka, it provides real-time data ingestion, transformation, and delivery to lakehouse architectures. The system features self-healing pipelines and automated data quality validation.",
        image: "/C:/Users/souna/.gemini/antigravity/brain/545a8ed0-f2c0-4faa-b5f4-966ee12ce110/project_placeholder_data_1773170229938.png",
        tech: ["Apache Spark", "Kafka", "Airflow", "Terraform"],
        icon: Layout,
        color: "#22D3EE"
    }
];

const ProjectCard = ({ project, onClick }) => {
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const shineX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
    const shineY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

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
            onClick={() => onClick(project)}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative cursor-pointer group h-full"
        >
            <div className="bg-[#111827] border border-white/10 rounded-[48px] overflow-hidden shadow-2xl relative h-full flex flex-col transition-colors group-hover:border-white/20">
                {/* Shine Effect */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{
                        x: shineX,
                        y: shineY,
                        scale: 2,
                        rotate: 45
                    }}
                />

                {/* Project Image Container */}
                <div className="relative h-64 overflow-hidden">
                    <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
                        style={{
                            scale: 1.1,
                            translateY: useTransform(mouseYSpring, [-0.5, 0.5], [-10, 10])
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111827] to-transparent" />

                    <div className="absolute top-6 right-6">
                        <div
                            className="p-3 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-xl"
                            style={{ color: project.color }}
                        >
                            <project.icon size={20} />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-10 flex flex-col flex-grow" style={{ transform: "translateZ(30px)" }}>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
                            {project.category}
                        </span>
                        <div className="h-[1px] flex-grow bg-white/5" />
                    </div>

                    <h3 className="text-3xl font-black mb-4 tracking-tighter text-white">
                        {project.title}
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-2">
                        {project.description}
                    </p>

                    <div className="mt-auto flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                            <span key={t} className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <section id="projects" className="py-32 relative bg-background-dark">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                    <div className="max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-6"
                        >
                            Featured Works
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                            className="text-5xl md:text-7xl font-black tracking-tighter text-white"
                        >
                            Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-glow">Showcases.</span>
                        </motion.h2>
                    </div>

                    <motion.p
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="text-gray-500 text-lg md:text-xl max-w-sm font-medium leading-relaxed"
                    >
                        A collection of industrial-grade AI and ML systems designed for scale.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-2000">
                    {projects.map((project, i) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onClick={setSelectedProject}
                            delay={i * 0.15}
                        />
                    ))}
                </div>
            </div>

            {/* Project Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            className="absolute inset-0 bg-background-dark/90 backdrop-blur-xl"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-5xl bg-[#111827] border border-white/10 rounded-[64px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] z-10"
                        >
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-8 right-8 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors z-20 group"
                            >
                                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                            </button>

                            <div className="grid md:grid-cols-2 h-full max-h-[85vh] overflow-y-auto md:overflow-hidden">
                                <div className="relative h-64 md:h-full">
                                    <img
                                        src={selectedProject.image}
                                        alt={selectedProject.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111827] hidden md:block" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#111827] to-transparent md:hidden" />
                                </div>

                                <div className="p-12 md:p-20 flex flex-col">
                                    <span className="text-accent text-xs font-black uppercase tracking-[0.5em] mb-6">
                                        {selectedProject.category}
                                    </span>

                                    <h3 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter text-white">
                                        {selectedProject.title}
                                    </h3>

                                    <p className="text-gray-400 text-lg leading-relaxed mb-10 overflow-y-auto max-h-48 md:max-h-full">
                                        {selectedProject.longDescription}
                                    </p>

                                    <div className="flex flex-wrap gap-3 mb-12">
                                        {selectedProject.tech.map((t) => (
                                            <span key={t} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-gray-300">
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-auto flex flex-col sm:flex-row gap-4">
                                        <button className="flex-1 px-8 py-5 bg-accent hover:bg-accent/90 text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 transition-transform hover:scale-[1.02] active:scale-[0.98]">
                                            <ExternalLink size={16} /> Live Demo
                                        </button>
                                        <button className="flex-1 px-8 py-5 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 transition-all hover:border-white/20">
                                            <Github size={16} /> Codebase
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
