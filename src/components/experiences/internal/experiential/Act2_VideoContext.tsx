import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Play } from "lucide-react";

interface VideoContextProps {
    title: string;
    duration: string;
    onComplete: () => void;
}

export const VideoContext = ({ title, duration, onComplete }: VideoContextProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [pmEmotion, setPmEmotion] = useState("😐");
    const [readyTime, setReadyTime] = useState("0 sec");

    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(() => {
                setProgress(prev => {
                    const next = prev + 2;

                    // Update metrics based on progress
                    if (next > 80) {
                        setPmEmotion("💡");
                        setReadyTime("2 min");
                    } else if (next > 50) {
                        setPmEmotion("🤔");
                        setReadyTime("1 min");
                    } else if (next > 20) {
                        setPmEmotion("😊");
                        setReadyTime("30 sec");
                    }

                    if (next >= 100) {
                        clearInterval(interval);
                        setTimeout(onComplete, 1000);
                        return 100;
                    }
                    return next;
                });
            }, 100);

            return () => clearInterval(interval);
        }
    }, [isPlaying, onComplete]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center p-8"
        >
            <div className="max-w-4xl w-full">
                {/* Metrics Bar */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-6 flex justify-between items-center"
                >
                    <div>
                        <div className="text-xs text-gray-500 mb-1">Context Transfer Method</div>
                        <div className="text-lg font-semibold text-white">🎥 Video Walkthrough</div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="text-right">
                            <div className="text-xs text-gray-500">PM Ready Time</div>
                            <div className="text-2xl font-mono text-green-400 font-bold">
                                {readyTime}
                            </div>
                        </div>
                        <div className="text-4xl">
                            {pmEmotion}
                        </div>
                    </div>
                </motion.div>

                {/* Video Player */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-700"
                >
                    {/* Video Placeholder */}
                    <div className="aspect-video bg-gradient-to-br from-blue-900/20 to-purple-900/20 flex items-center justify-center relative">
                        {!isPlaying && (
                            <button
                                onClick={() => setIsPlaying(true)}
                                className="absolute inset-0 flex items-center justify-center group"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center shadow-xl shadow-blue-500/50 group-hover:bg-blue-600 transition-colors"
                                >
                                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                                </motion.div>
                            </button>
                        )}

                        {isPlaying && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 p-12 flex flex-col justify-center space-y-6"
                            >
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <div className="bg-blue-500/20 border-l-4 border-blue-500 p-4 rounded">
                                        <div className="text-blue-300 text-sm mb-1">00:15 - Key Point #1</div>
                                        <div className="text-white text-lg">Vikram wants to focus on LEAD GEN, not brand</div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 1.0 }}
                                >
                                    <div className="bg-green-500/20 border-l-4 border-green-500 p-4 rounded">
                                        <div className="text-green-300 text-sm mb-1">01:45 - Budget</div>
                                        <div className="text-white text-lg">Phase 1: $25k, locked scope</div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 1.5 }}
                                >
                                    <div className="bg-purple-500/20 border-l-4 border-purple-500 p-4 rounded">
                                        <div className="text-purple-300 text-sm mb-1">03:30 - Timeline</div>
                                        <div className="text-white text-lg">3 weeks MVP, then iterate</div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}

                        {/* Thumbnail overlay when not playing */}
                        {!isPlaying && (
                            <div className="absolute top-4 left-4 bg-black/80 px-3 py-1 rounded text-xs text-white">
                                ▶ {duration}
                            </div>
                        )}
                    </div>

                    {/* Progress Bar */}
                    {isPlaying && (
                        <div className="h-1 bg-gray-800">
                            <motion.div
                                className="h-full bg-blue-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    )}

                    {/* Video Info */}
                    <div className="p-4 bg-gray-900/50">
                        <div className="text-white font-medium">{title}</div>
                        <div className="text-gray-400 text-sm mt-1">Quick context walkthrough • {duration}</div>
                    </div>
                </motion.div>

                {/* Context Checkmarks */}
                {isPlaying && progress > 50 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 flex gap-4 justify-center"
                    >
                        {["Goal Clarified", "Budget Locked", "Timeline Agreed"].map((item, i) => (
                            <motion.div
                                key={item}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1.5 + (i * 0.2) }}
                                className="flex items-center gap-2 text-green-400 text-sm"
                            >
                                <span className="text-lg">✓</span>
                                {item}
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};
