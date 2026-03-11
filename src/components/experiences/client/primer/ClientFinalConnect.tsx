import { motion } from "framer-motion";

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
                <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold tracking-widest text-indigo-400 font-mono mb-4">
                    THE PARTNERSHIP
                </div>
                <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight">
                    Your digital experience partner, <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-indigo-500 uppercase tracking-tight">ZYXWARE</span>
                </h1>
            </div>

            <p className="text-2xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
                We don't just find problems. We engineer <strong className="text-white">Revenue Growth</strong>.
                <br />
                Let's build a better future for your users.
            </p>

            <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
                <a
                    href="https://www.zyxware.com/contact-us" // Example link
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-3 px-12 py-5 bg-white text-black rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-[0_0_40px_-5px_rgba(255,255,255,0.4)]"
                >
                    <span>Let's Connect</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>

                <button
                    onClick={onRestart}
                    className="text-gray-500 hover:text-white transition-colors text-sm font-mono tracking-widest uppercase"
                >
                    Replay Experience
                </button>
            </div>
        </motion.div>
    );
};
