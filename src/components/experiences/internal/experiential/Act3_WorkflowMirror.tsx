import { motion } from "framer-motion";
import { X, Paperclip, Video, Calendar } from "lucide-react";

interface WorkflowState {
    subject: string;
    attachment?: { name: string; size: string };
    videoLink?: string;
    status: "deleted" | "sent";
}

interface WorkflowMirrorProps {
    before: WorkflowState;
    after: WorkflowState;
    futureEvent?: {
        title: string;
        time: string;
        options: { text: string; emphasized: boolean }[];
    };
    onContinue: () => void;
}

export const WorkflowMirror = ({ before, after, futureEvent, onContinue }: WorkflowMirrorProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center p-8"
        >
            <div className="max-w-6xl w-full space-y-8">
                {/* Header */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-center"
                >
                    <h2 className="text-3xl font-bold text-white mb-2">Your Tomorrow</h2>
                    <p className="text-gray-400">This is how it plays out in your workflow</p>
                </motion.div>

                {/* Split Comparison */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* LEFT: The Old Way */}
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-4"
                    >
                        <div className="text-sm text-gray-500 uppercase tracking-wider">The Old Way</div>
                        <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                            {/* Email Header */}
                            <div className="bg-gray-800 p-4 border-b border-gray-700">
                                <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                                    <span className="font-medium">Draft</span>
                                    <span>•</span>
                                    <span>Gmail</span>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-500">To:</span>
                                        <span className="text-sm text-white">pm-team@zyxware.com</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-500">Subject:</span>
                                        <span className="text-sm text-white">{before.subject}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Email Body */}
                            <div className="p-4 space-y-4">
                                {before.attachment && (
                                    <div className="flex items-center gap-3 p-3 bg-gray-800 rounded border border-gray-700">
                                        <Paperclip className="w-4 h-4 text-gray-400" />
                                        <div className="flex-1">
                                            <div className="text-sm text-white">{before.attachment.name}</div>
                                            <div className="text-xs text-gray-500">{before.attachment.size}</div>
                                        </div>
                                    </div>
                                )}

                                {/* Status */}
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-500/30 rounded"
                                >
                                    <X className="w-4 h-4 text-red-400" />
                                    <span className="text-sm text-red-400 font-medium">Deleted</span>
                                    <span className="text-xs text-gray-500 ml-auto">Too overwhelming</span>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT: The New Way */}
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-4"
                    >
                        <div className="text-sm text-green-400 uppercase tracking-wider">The New Way</div>
                        <div className="bg-gray-900 border border-green-500/30 rounded-lg overflow-hidden shadow-lg shadow-green-500/10">
                            {/* Email Header */}
                            <div className="bg-gray-800 p-4 border-b border-gray-700">
                                <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                                    <span className="font-medium">Draft</span>
                                    <span>•</span>
                                    <span>Gmail</span>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-500">To:</span>
                                        <span className="text-sm text-white">pm-team@zyxware.com</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-500">Subject:</span>
                                        <span className="text-sm text-white">{after.subject}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Email Body */}
                            <div className="p-4 space-y-4">
                                {after.videoLink && (
                                    <div className="flex items-center gap-3 p-3 bg-blue-900/20 rounded border border-blue-500/30">
                                        <Video className="w-4 h-4 text-blue-400" />
                                        <div className="flex-1">
                                            <div className="text-sm text-blue-400 underline">5-min Context Video</div>
                                            <div className="text-xs text-gray-500">loom.com/share/...</div>
                                        </div>
                                    </div>
                                )}

                                {/* Status */}
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 1.0 }}
                                    className="flex items-center gap-2 p-3 bg-green-900/20 border border-green-500/30 rounded"
                                >
                                    <span className="text-lg">✓</span>
                                    <span className="text-sm text-green-400 font-medium">Sent</span>
                                    <span className="text-xs text-gray-500 ml-auto">PM responds in 5 min</span>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Future Event Hint */}
                {futureEvent && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="bg-gray-900 border border-gray-700 rounded-lg p-6"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Calendar className="w-5 h-5 text-blue-400" />
                            <div>
                                <div className="text-white font-medium">{futureEvent.title}</div>
                                <div className="text-sm text-gray-400">{futureEvent.time}</div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            {futureEvent.options.map((option, i) => (
                                <motion.button
                                    key={option.text}
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{
                                        scale: 1,
                                        opacity: 1,
                                    }}
                                    transition={{ delay: 1.4 + (i * 0.1) }}
                                    className={`flex-1 px-4 py-3 rounded-lg border transition-all ${option.emphasized
                                            ? "bg-blue-500/10 border-blue-500/50 shadow-lg shadow-blue-500/20 hover:bg-blue-500/20"
                                            : "bg-gray-800 border-gray-700 opacity-50 hover:opacity-70"
                                        }`}
                                    disabled
                                >
                                    <span className={option.emphasized ? "text-blue-400" : "text-gray-400"}>
                                        {option.text}
                                    </span>
                                </motion.button>
                            ))}
                        </div>
                        <div className="text-center mt-3 text-xs text-gray-500">
                            (You already know which one to choose)
                        </div>
                    </motion.div>
                )}

                {/* Continue Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.0 }}
                    className="text-center pt-4"
                >
                    <button
                        onClick={onContinue}
                        className="px-8 py-3 bg-white text-black rounded-full font-medium hover:scale-105 transition-transform"
                    >
                        Continue
                    </button>
                </motion.div>
            </div>
        </motion.div>
    );
};
