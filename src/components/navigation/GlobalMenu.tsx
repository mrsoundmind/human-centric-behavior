import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, ExternalLink, ChevronDown, Sun, Moon } from "lucide-react";
import { useTheme } from "@/state/ThemeContext";

interface GlobalMenuProps {
    onNavigate: (route: string) => void;
}

export const GlobalMenu = ({ onNavigate }: GlobalMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [expandedSection, setExpandedSection] = useState<string | null>(null);
    const { theme, toggleTheme } = useTheme();
    const isLight = theme === "light";

    const handleNavigate = (route: Parameters<GlobalMenuProps["onNavigate"]>[0]) => {
        setIsOpen(false);
        setExpandedSection(null);
        onNavigate(route);
    };

    const toggleSection = (section: string) => {
        setExpandedSection((prev) => (prev === section ? null : section));
    };

    const variants = {
        open: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
        closed: { opacity: 0, y: -20 }
    };

    const itemVariants = {
        open: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
        closed: { opacity: 0, x: -20 }
    };

    const nestedVariants = {
        open: { opacity: 1, height: "auto", marginTop: 8, transition: { duration: 0.2, staggerChildren: 0.05 } },
        closed: { opacity: 0, height: 0, marginTop: 0, overflow: "hidden", transition: { duration: 0.2 } }
    };

    const nestedItemVariants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: -10 }
    };

    const triggerClass = isLight
        ? "w-12 h-12 bg-white/95 backdrop-blur-xl border-[1.5px] border-primary/40 rounded-full flex items-center justify-center hover:bg-primary hover:border-primary transition-all shadow-lg shadow-primary/10 group"
        : "w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all shadow-xl group";

    const triggerIconClass = isLight
        ? "w-5 h-5 text-primary group-hover:text-primary-foreground"
        : "w-5 h-5 text-white/70 group-hover:text-white";

    // Panel theming
    const panelClass = isLight
        ? "absolute top-16 right-0 w-[300px] bg-card backdrop-blur-3xl border border-border rounded-3xl p-6 shadow-xl shadow-primary/10 overflow-hidden max-h-[80vh] overflow-y-auto"
        : "absolute top-16 right-0 w-[300px] bg-[#0A0A0A]/90 backdrop-blur-3xl border border-white/[0.08] rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden max-h-[80vh] overflow-y-auto";

    const panelGlowClass = isLight
        ? "absolute inset-0 bg-gradient-to-br from-primary/8 to-transparent pointer-events-none"
        : "absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none";

    const headerLabelClass = isLight
        ? "text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em]"
        : "text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]";

    const headerDotClass = isLight ? "w-2 h-2 rounded-full bg-primary animate-pulse" : "w-2 h-2 rounded-full bg-blue-500 animate-pulse";

    // Item-row classes (top-level menu rows)
    const rowClass = isLight
        ? "w-full flex items-center gap-4 text-left p-4 rounded-xl hover:bg-primary/5 border border-transparent hover:border-primary/15 transition-all group"
        : "w-full flex items-center gap-4 text-left p-4 rounded-xl hover:bg-white/[0.05] border border-transparent hover:border-white/10 transition-all group";

    const rowJustifyClass = isLight
        ? "w-full flex items-center justify-between p-4 rounded-xl hover:bg-primary/5 border border-transparent hover:border-primary/15 transition-all group"
        : "w-full flex items-center justify-between p-4 rounded-xl hover:bg-white/[0.05] border border-transparent hover:border-white/10 transition-all group";

    const titleClass = isLight ? "text-[13px] font-semibold text-foreground" : "text-[13px] font-semibold text-white/90";
    const subtitleClass = isLight ? "text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5" : "text-[10px] text-white/40 uppercase tracking-widest mt-0.5";
    const chevronBase = isLight ? "w-4 h-4 text-muted-foreground transition-transform duration-300" : "w-4 h-4 text-white/40 transition-transform duration-300";

    // Nested
    const nestedWrapClass = isLight ? "ml-6 pl-4 border-l border-primary/15 space-y-1" : "ml-6 pl-4 border-l border-white/10 space-y-1";
    const nestedItemClass = isLight
        ? "w-full text-left p-2 text-[12px] text-muted-foreground hover:text-foreground transition-colors rounded hover:bg-primary/5"
        : "w-full text-left p-2 text-[12px] text-white/60 hover:text-white transition-colors rounded hover:bg-white/[0.05]";

    const dividerClass = isLight ? "h-px bg-primary/15 my-2" : "h-px bg-white/10 my-2";

    const togglePillTrack = isLight ? "w-9 h-5 rounded-full p-0.5 transition-colors bg-primary/25" : "w-9 h-5 rounded-full p-0.5 transition-colors bg-amber-300/40";

    return (
        <div className="fixed top-6 right-6 z-[1000] font-sans">
            <button onClick={() => setIsOpen(!isOpen)} className={triggerClass} aria-label="Open menu">
                {isOpen ? <X className={triggerIconClass} /> : <Menu className={triggerIconClass} />}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                        transition={{ duration: 0.3 }}
                        className={panelClass}
                    >
                        <div className={panelGlowClass} />

                        <div className="flex items-center gap-3 mb-6 relative z-10">
                            <div className={headerDotClass} />
                            <span className={headerLabelClass}>Global Navigation</span>
                        </div>

                        <motion.div
                            variants={variants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="space-y-2 relative z-10"
                        >
                            {/* Theme Toggle */}
                            <motion.button
                                variants={itemVariants}
                                onClick={toggleTheme}
                                className={rowJustifyClass}
                            >
                                <div className="flex items-center gap-4">
                                    {isLight ? (
                                        <Moon className="w-4 h-4 text-primary group-hover:text-primary" />
                                    ) : (
                                        <Sun className="w-4 h-4 text-amber-300/70 group-hover:text-amber-300" />
                                    )}
                                    <div className="text-left">
                                        <h3 className={titleClass}>{isLight ? "Switch to Dark" : "Switch to Light"}</h3>
                                        <p className={subtitleClass}>Theme · {isLight ? "Light" : "Dark"} mode</p>
                                    </div>
                                </div>
                                <div className={togglePillTrack}>
                                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isLight ? "translate-x-0" : "translate-x-4"}`} />
                                </div>
                            </motion.button>

                            <div className={dividerClass} />

                            {/* Introduction */}
                            <motion.button
                                variants={itemVariants}
                                onClick={() => handleNavigate("intro")}
                                className={rowClass}
                            >
                                <Home className={isLight ? "w-4 h-4 text-primary/70 group-hover:text-primary" : "w-4 h-4 text-blue-400/60 group-hover:text-blue-400"} />
                                <div>
                                    <h3 className={titleClass}>Introduction</h3>
                                    <p className={subtitleClass}>Start the journey</p>
                                </div>
                            </motion.button>

                            {/* UX Education Expandable */}
                            <motion.div variants={itemVariants}>
                                <button
                                    onClick={() => toggleSection("ux")}
                                    className={rowJustifyClass}
                                >
                                    <div className="flex items-center gap-4">
                                        <ExternalLink className={isLight ? "w-4 h-4 text-primary/70 group-hover:text-primary" : "w-4 h-4 text-amber-400/60 group-hover:text-amber-400"} />
                                        <div className="text-left">
                                            <h3 className={titleClass}>UX Education</h3>
                                            <p className={subtitleClass}>Feel the friction</p>
                                        </div>
                                    </div>
                                    <ChevronDown className={`${chevronBase} ${expandedSection === "ux" ? "rotate-180" : ""}`} />
                                </button>

                                <AnimatePresence>
                                    {expandedSection === "ux" && (
                                        <motion.div variants={nestedVariants} initial="closed" animate="open" exit="closed" className={nestedWrapClass}>
                                            <motion.button variants={nestedItemVariants} onClick={() => handleNavigate("door")} className={nestedItemClass}>The Door</motion.button>
                                            <motion.button variants={nestedItemVariants} onClick={() => handleNavigate("silent-button")} className={nestedItemClass}>Silent Button</motion.button>
                                            <motion.button variants={nestedItemVariants} onClick={() => handleNavigate("confusing-form")} className={nestedItemClass}>Confusing Form</motion.button>
                                            <motion.button variants={nestedItemVariants} onClick={() => handleNavigate("delayed-response")} className={nestedItemClass}>Delayed Response</motion.button>
                                            <motion.button variants={nestedItemVariants} onClick={() => handleNavigate("pattern-pause")} className={nestedItemClass}>Pattern Pause</motion.button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>

                            {/* SDLC Process */}
                            <motion.button
                                variants={itemVariants}
                                onClick={() => handleNavigate("layer2")}
                                className={rowClass}
                            >
                                <ExternalLink className={isLight ? "w-4 h-4 text-accent/70 group-hover:text-accent" : "w-4 h-4 text-emerald-400/60 group-hover:text-emerald-400"} />
                                <div>
                                    <h3 className={titleClass}>The SDLC Process</h3>
                                    <p className={subtitleClass}>Apply patterns</p>
                                </div>
                            </motion.button>

                            {/* Internal Training Expandable */}
                            <motion.div variants={itemVariants}>
                                <button
                                    onClick={() => toggleSection("internal")}
                                    className={rowJustifyClass}
                                >
                                    <div className="flex items-center gap-4">
                                        <ExternalLink className={isLight ? "w-4 h-4 text-primary/70 group-hover:text-primary" : "w-4 h-4 text-purple-400/60 group-hover:text-purple-400"} />
                                        <div className="text-left">
                                            <h3 className={titleClass}>Internal Training</h3>
                                            <p className={subtitleClass}>Onboarding · Roles · Wrap-up</p>
                                        </div>
                                    </div>
                                    <ChevronDown className={`${chevronBase} ${expandedSection === "internal" ? "rotate-180" : ""}`} />
                                </button>

                                <AnimatePresence>
                                    {expandedSection === "internal" && (
                                        <motion.div variants={nestedVariants} initial="closed" animate="open" exit="closed" className={nestedWrapClass}>
                                            {/* Onboarding sequence */}
                                            <p className={isLight ? "text-[9px] font-mono text-primary/70 uppercase tracking-[0.25em] pt-1 pb-1" : "text-[9px] font-mono text-purple-400/70 uppercase tracking-[0.25em] pt-1 pb-1"}>
                                                Onboarding
                                            </p>
                                            <motion.button variants={nestedItemVariants} onClick={() => handleNavigate("internal-intro")} className={nestedItemClass}>1 · Training Intro</motion.button>
                                            <motion.button variants={nestedItemVariants} onClick={() => handleNavigate("onboarding-brief")} className={nestedItemClass}>2 · Project Brief</motion.button>
                                            <motion.button variants={nestedItemVariants} onClick={() => handleNavigate("onboarding-war-room")} className={nestedItemClass}>3 · Slack War Room</motion.button>
                                            <motion.button variants={nestedItemVariants} onClick={() => handleNavigate("onboarding-system-reaction")} className={nestedItemClass}>4 · System Reaction</motion.button>
                                            <motion.button variants={nestedItemVariants} onClick={() => handleNavigate("onboarding-decision-lens")} className={nestedItemClass}>5 · Decision Lens</motion.button>
                                            <motion.button variants={nestedItemVariants} onClick={() => handleNavigate("onboarding-identity")} className={nestedItemClass}>6 · Identity Reflection</motion.button>

                                            {/* Designation hub */}
                                            <p className={isLight ? "text-[9px] font-mono text-primary/70 uppercase tracking-[0.25em] pt-3 pb-1" : "text-[9px] font-mono text-purple-400/70 uppercase tracking-[0.25em] pt-3 pb-1"}>
                                                Hub
                                            </p>
                                            <motion.button variants={nestedItemVariants} onClick={() => handleNavigate("designation")} className={nestedItemClass}>Role Designation Portal</motion.button>

                                            {/* Role journeys */}
                                            <p className={isLight ? "text-[9px] font-mono text-primary/70 uppercase tracking-[0.25em] pt-3 pb-1" : "text-[9px] font-mono text-purple-400/70 uppercase tracking-[0.25em] pt-3 pb-1"}>
                                                Role Journeys
                                            </p>
                                            <motion.button variants={nestedItemVariants} onClick={() => handleNavigate("internal-role-sales")} className={nestedItemClass}>Sales</motion.button>
                                            <motion.button variants={nestedItemVariants} onClick={() => handleNavigate("internal-role-crm")} className={nestedItemClass}>CRM</motion.button>
                                            <motion.button variants={nestedItemVariants} onClick={() => handleNavigate("internal-role-pm")} className={nestedItemClass}>Product Manager</motion.button>
                                            <motion.button variants={nestedItemVariants} onClick={() => handleNavigate("internal-role-developer")} className={nestedItemClass}>Developer</motion.button>
                                            <motion.button variants={nestedItemVariants} onClick={() => handleNavigate("internal-role-qa")} className={nestedItemClass}>QA</motion.button>
                                            <motion.button variants={nestedItemVariants} onClick={() => handleNavigate("internal-role-designer")} className={nestedItemClass}>Designer</motion.button>
                                            <motion.button variants={nestedItemVariants} onClick={() => handleNavigate("internal-role-ba")} className={nestedItemClass}>Business Analyst</motion.button>
                                            <motion.button variants={nestedItemVariants} onClick={() => handleNavigate("internal-role-strategy")} className={nestedItemClass}>Strategy</motion.button>

                                            {/* Wrap-up */}
                                            <p className={isLight ? "text-[9px] font-mono text-primary/70 uppercase tracking-[0.25em] pt-3 pb-1" : "text-[9px] font-mono text-purple-400/70 uppercase tracking-[0.25em] pt-3 pb-1"}>
                                                Wrap-up
                                            </p>
                                            <motion.button variants={nestedItemVariants} onClick={() => handleNavigate("masterclass-complete")} className={nestedItemClass}>Masterclass Complete</motion.button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>

                            <div className={dividerClass} />

                            <motion.button
                                variants={itemVariants}
                                onClick={() => { setIsOpen(false); window.location.href = "/client"; }}
                                className={`${rowClass} ${isLight ? "bg-primary/[0.03]" : "bg-white/[0.02]"}`}
                            >
                                <ExternalLink className={isLight ? "w-4 h-4 text-accent group-hover:text-accent" : "w-4 h-4 text-pink-400/60 group-hover:text-pink-400"} />
                                <div>
                                    <h3 className={titleClass}>Client Training</h3>
                                    <p className={subtitleClass}>Executive View</p>
                                </div>
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
