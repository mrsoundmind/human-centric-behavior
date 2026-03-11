import { motion } from "framer-motion";

interface PrincipleWhisperProps {
    principle: string;
    method: string;
    onExplore: () => void;
}

export const PrincipleWhisper = ({ principle, method, onExplore }: PrincipleWhisperProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center p-8"
        >
            <div className="max-w-2xl w-full text-center space-y-12">
                {/* Principle */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-4"
                >
                    <div className="text-6xl mb-8">💡</div>
                    <div className="text-3xl font-light text-white leading-relaxed">
                        {principle}
                    </div>
                </motion.div>

                {/* Method Badge */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.0 }}
                    className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full"
                >
                    <span className="text-sm text-blue-400 font-mono">UX Method: {method}</span>
                </motion.div>

                {/* Divider */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="w-32 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mx-auto"
                />

                {/* Explore Button */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 2.0 }}
                >
                    <button
                        onClick={onExplore}
                        className="px-8 py-4 bg-white text-black rounded-full font-medium hover:scale-105 transition-transform shadow-lg"
                    >
                        Explore More Frictions ➔
                    </button>
                </motion.div>

                {/* Subtle Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 }}
                    className="text-xs text-gray-600 pt-8"
                >
                    You experienced the friction. You discovered the solution. You internalized the pattern.
                </motion.div>
            </div>
        </motion.div>
    );
};
