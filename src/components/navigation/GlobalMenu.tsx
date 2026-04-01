import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, ExternalLink } from "lucide-react";

interface GlobalMenuProps {
    onNavigate: (route: string) => void;
}

export const GlobalMenu = ({ onNavigate }: GlobalMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleNavigate = (route: Parameters<GlobalMenuProps["onNavigate"]>[0]) => {
        setIsOpen(false);
        onNavigate(route);
    };

    const variants = {
        open: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
        closed: { opacity: 0, y: -20 }
    };

    const itemVariants = {
        open: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
        closed: { opacity: 0, x: -20 }
    };

    return (
        <div className="fixed top-6 right-6 z-[1000] font-sans text-white">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all shadow-xl group"
            >
                {isOpen ? (
                    <X className="w-5 h-5 text-white/70 group-hover:text-white" />
                ) : (
                    <Menu className="w-5 h-5 text-white/70 group-hover:text-white" />
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-16 right-0 w-[300px] bg-[#0A0A0A]/90 backdrop-blur-3xl border border-white/[0.08] rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none" />
                        
                        <div className="flex items-center gap-3 mb-6 relative z-10">
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">Global Navigation</span>
                        </div>

                        <motion.div 
                            variants={variants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="space-y-2 relative z-10"
                        >
                            <motion.button 
                                variants={itemVariants}
                                onClick={() => handleNavigate("intro")}
                                className="w-full flex items-center gap-4 text-left p-4 rounded-xl hover:bg-white/[0.05] border border-transparent hover:border-white/10 transition-all group"
                            >
                                <Home className="w-4 h-4 text-white/40 group-hover:text-white/90" />
                                <div>
                                    <h3 className="text-[13px] font-semibold text-white/90">Return Library</h3>
                                    <p className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">Back to start</p>
                                </div>
                            </motion.button>

                            <motion.button 
                                variants={itemVariants}
                                onClick={() => handleNavigate("internal-training")}
                                className="w-full flex items-center gap-4 text-left p-4 rounded-xl hover:bg-white/[0.05] border border-transparent hover:border-white/10 transition-all group"
                            >
                                <ExternalLink className="w-4 h-4 text-emerald-400/60 group-hover:text-emerald-400" />
                                <div>
                                    <h3 className="text-[13px] font-semibold text-white/90">The Internal Hub</h3>
                                    <p className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">Start Onboarding</p>
                                </div>
                            </motion.button>

                            <motion.button 
                                variants={itemVariants}
                                onClick={() => handleNavigate("designation")}
                                className="w-full flex items-center gap-4 text-left p-4 rounded-xl hover:bg-white/[0.05] border border-transparent hover:border-white/10 transition-all group"
                            >
                                <ExternalLink className="w-4 h-4 text-blue-400/60 group-hover:text-blue-400" />
                                <div>
                                    <h3 className="text-[13px] font-semibold text-white/90">Role Selection Portal</h3>
                                    <p className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">Skip to Scenarios</p>
                                </div>
                            </motion.button>

                            <motion.button 
                                variants={itemVariants}
                                onClick={() => handleNavigate("layer2")}
                                className="w-full flex items-center gap-4 text-left p-4 rounded-xl hover:bg-white/[0.05] border border-transparent hover:border-white/10 transition-all group bg-white/[0.02]"
                            >
                                <ExternalLink className="w-4 h-4 text-amber-400/60 group-hover:text-amber-400" />
                                <div>
                                    <h3 className="text-[13px] font-semibold text-white/90">Layer 2 Experience</h3>
                                    <p className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">Original Simulation</p>
                                </div>
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
