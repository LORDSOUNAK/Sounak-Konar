import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import Navbar from './components/Layout/Navbar';
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Skills from './components/Sections/Skills';
import Projects from './components/Sections/Projects';
import Experience from './components/Sections/Experience';
import Contact from './components/Sections/Contact';
import Footer from './components/Layout/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ReactLenis root>
      <div className="min-h-screen bg-background-dark text-white selection:bg-accent/30 selection:text-white overflow-x-hidden">
        <AnimatePresence>
          {isLoading && (
            <motion.div
              key="loader"
              initial={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
              }}
              className="fixed inset-0 z-[200] bg-[#05070A] flex items-center justify-center"
            >
              <div className="flex flex-col items-center gap-6">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 200 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="h-[2px] bg-accent relative overflow-hidden"
                >
                  <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-glow to-transparent"
                  />
                </motion.div>
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-[10px] font-black text-white uppercase tracking-[0.8em] ml-2"
                >
                  Initializing Intelligence
                </motion.span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Scroll Progress */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[2px] bg-accent z-[150] origin-left shadow-[0_0_15px_rgba(99,102,241,0.5)]"
          style={{ scaleX }}
        />

        {/* Background radial glow */}
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent_50%)] pointer-events-none" />

        <Navbar />

        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={!isLoading ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col"
        >
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </motion.main>

        <Footer />
      </div>
    </ReactLenis>
  );
}

export default App;
