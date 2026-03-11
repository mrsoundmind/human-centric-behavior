import { ReactNode, useEffect } from "react";
import { motion } from "framer-motion";

interface ClientLayoutProps {
    children: ReactNode;
    step: number;
    totalSteps: number;
    title?: string;
}

export const ClientLayout = ({ children, step, totalSteps, title }: ClientLayoutProps) => {
    // Scroll to top whenever step changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [step]);

    return (
        <div className="min-h-screen bg-void text-foreground selection:bg-primary/30">
            {/* Minimal Header */}
            <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-center items-center backdrop-blur-md bg-void/80 border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div className="flex gap-1">
                        {Array.from({ length: totalSteps }).map((_, i) => (
                            <div
                                key={i}
                                className={`h-1 w-3 rounded-full transition-all duration-500 ${i + 1 <= step ? "bg-white/40" : "bg-white/5"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-screen flex flex-col">
                {title && (
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-2xl md:text-4xl font-display font-bold mb-12 text-foreground/90"
                    >
                        {title}
                    </motion.h1>
                )}

                <div className="flex-1 flex flex-col justify-center">
                    {children}
                </div>
            </main>
        </div>
    );
};
