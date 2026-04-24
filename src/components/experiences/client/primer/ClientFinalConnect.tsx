import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface ClientFinalConnectProps {
    onRestart: () => void;
}

export const ClientFinalConnect = ({ onRestart }: ClientFinalConnectProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6 space-y-12"
        >
            <div className="space-y-4">
                <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold tracking-widest text-primary font-mono mb-4">
                    THE PARTNERSHIP
                </div>
                <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground leading-tight">
                    Your digital experience partner, <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary uppercase tracking-tight">ZYXWARE</span>
                </h1>
            </div>

            <p className="text-2xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
                We don't just find problems. We engineer <strong className="text-foreground">Revenue Growth</strong>.
                <br />
                Let's build a better future for your users.
            </p>

            <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
                <a
                    href="https://www.zyxware.com/contact-us" // Example link
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-3 px-12 py-5 bg-primary text-primary-foreground rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-lg"
                >
                    <span>Let's Connect</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>

                <Link
                    to="/internalteam"
                    className="group relative inline-flex items-center gap-3 px-12 py-5 bg-transparent border border-primary/30 text-foreground rounded-full font-bold text-xl hover:border-primary transition-all"
                >
                    <span>See how your team navigates these frictions</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>

                <button
                    onClick={onRestart}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm font-mono tracking-widest uppercase"
                >
                    Replay Experience
                </button>
            </div>
        </motion.div>
    );
};
