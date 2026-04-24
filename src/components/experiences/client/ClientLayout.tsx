import { ReactNode, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/state/ThemeContext";

interface ClientLayoutProps {
    children: ReactNode;
    step: number;
    totalSteps: number;
    title?: string;
}

const ZyxwareLogo = ({ theme }: { theme: "light" | "dark" }) => {
    const violet = "#9335AA";
    const wordmark = theme === "light" ? "#9335AA" : "#ffffff";
    const sub = theme === "light" ? "#666666" : "#cfcfcf";
    return (
        <div className="flex items-center gap-2.5 select-none">
            <svg width="36" height="36" viewBox="0 0 44 44" aria-hidden="true">
                <circle cx="22" cy="22" r="20" fill={violet} />
                {Array.from({ length: 12 }).map((_, i) => {
                    const angle = (i * Math.PI) / 6;
                    const x = 22 + Math.cos(angle) * 14;
                    const y = 22 + Math.sin(angle) * 14;
                    return <circle key={i} cx={x} cy={y} r="1.6" fill="rgba(255,255,255,0.55)" />;
                })}
                <text x="22" y="29" textAnchor="middle" fontFamily="Raleway, sans-serif" fontWeight="800" fontSize="20" fill="#ffffff">Z</text>
            </svg>
            <div className="leading-none">
                <div style={{ color: wordmark, letterSpacing: "0.04em", fontWeight: 800, fontSize: "1.05rem" }}>ZYXWARE</div>
                <div style={{ color: sub, letterSpacing: "0.32em", fontWeight: 500, fontSize: "0.5rem", marginTop: "2px" }}>TECHNOLOGIES</div>
            </div>
        </div>
    );
};

export const ClientLayout = ({ children, step, totalSteps, title }: ClientLayoutProps) => {
    const { theme } = useTheme();
    const isLight = theme === "light";

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [step]);

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
            {/* Header: logo · progress · hamburger menu */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md border-b ${
                    isLight ? "bg-background/80 border-border" : "bg-void/80 border-white/5"
                }`}
            >
                <ZyxwareLogo theme={theme} />

                <div className="flex gap-1">
                    {Array.from({ length: totalSteps }).map((_, i) => (
                        <div
                            key={i}
                            className={`h-1 w-3 rounded-full transition-all duration-500 ${
                                i + 1 <= step
                                    ? isLight ? "bg-primary" : "bg-white/40"
                                    : isLight ? "bg-primary/15" : "bg-white/5"
                            }`}
                        />
                    ))}
                </div>

                {/* Spacer to balance the logo on the left — actual menu lives in ClientDebugMenu (rendered by ClientExperience) */}
                <div className="w-[36px]" />
            </header>

            <main className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-screen flex flex-col">
                {title && (
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-2xl md:text-4xl font-display font-bold mb-12 text-foreground"
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
