import { motion } from "framer-motion";
import { ReactNode } from "react";

// --- 1. Metrics Card (Neon Glow) ---
interface MetricsCardProps {
    label: string;
    value: string;
    icon?: ReactNode;
    trend?: "up" | "down" | "neutral";
    color?: "blue" | "green" | "red" | "purple";
    className?: string;
}

export const MetricsCard = ({
    label,
    value,
    icon,
    trend,
    color = "blue",
    className = ""
}: MetricsCardProps) => {
    const colorMap = {
        blue: "border-blue-500 shadow-blue-500/20 text-blue-400",
        green: "border-green-500 shadow-green-500/20 text-green-400",
        red: "border-red-500 shadow-red-500/20 text-red-400",
        purple: "border-purple-500 shadow-purple-500/20 text-purple-400"
    };

    const bgMap = {
        blue: "bg-blue-500",
        green: "bg-green-500",
        red: "bg-red-500",
        purple: "bg-purple-500"
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-gray-900 border border-gray-700 rounded-xl p-6 flex justify-between items-center relative overflow-hidden ${className}`}
        >
            {/* Neon Glow Border */}
            <div className={`absolute top-0 left-0 w-1 h-full ${bgMap[color]}`} />

            <div>
                <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-bold">{label}</div>
                <div className={`text-2xl font-mono font-bold ${color === 'blue' ? 'text-white' : colorMap[color].split(' ')[2]}`}>
                    {value}
                </div>
            </div>

            {icon && <div className={`text-3xl opacity-80 ${colorMap[color].split(' ')[2]}`}>{icon}</div>}
        </motion.div>
    );
};

// --- 2. Slack Message (War Room Style) ---
interface SlackMessageProps {
    sender: string;
    message: string;
    timestamp?: string;
    avatarInitials?: string;
    isSystem?: boolean;
    className?: string;
}

export const SlackMessage = ({
    sender,
    message,
    timestamp = "Just now",
    avatarInitials,
    isSystem = false,
    className = ""
}: SlackMessageProps) => {
    return (

        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex gap-4 max-w-3xl p-5 rounded-xl border ${isSystem
                ? "bg-red-500/10 border-red-500/20"
                : "bg-[#1E1E1E] border-white/5 hover:border-white/10 transition-colors"
                } ${className}`}
        >
            <div className={`w-10 h-10 rounded-lg shrink-0 flex items-center justify-center font-bold text-sm shadow-lg ${isSystem
                ? "bg-red-500 text-white shadow-red-500/20"
                : "bg-gradient-to-br from-gray-700 to-gray-800 text-gray-300 border border-white/10"
                }`}>
                {avatarInitials || sender.substring(0, 2).toUpperCase()}
            </div>

            <div className="space-y-1.5 flex-1">
                <div className="flex items-baseline gap-2.5">
                    <span className={`font-bold text-[15px] font-display ${isSystem ? "text-red-400" : "text-white"}`}>
                        {sender}
                    </span>
                    <span className="text-[11px] text-gray-500 font-mono tracking-wide opacity-60">{timestamp}</span>
                </div>
                <p className="text-gray-300 text-[14px] leading-relaxed font-light tracking-wide">{message}</p>
            </div>
        </motion.div>
    );
};

// --- 3. Timer Bar (Stress Countdown) ---
interface TimerBarProps {
    durationSec: number;
    isRunning: boolean;
    onComplete?: () => void;
    label?: string;
    color?: "blue" | "red";
}

export const TimerBar = ({
    durationSec,
    isRunning,
    onComplete,
    label = "Time Remaining",
    color = "blue"
}: TimerBarProps) => {
    return (
        <div className="w-full space-y-2">
            <div className="flex justify-between text-xs uppercase tracking-wider font-bold text-gray-500">
                <span>{label}</span>
                <span>{durationSec}s</span>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                    className={`h-full ${color === 'blue' ? 'bg-blue-500' : 'bg-red-500'}`}
                    initial={{ width: "100%" }}
                    animate={isRunning ? { width: "0%" } : { width: "100%" }}
                    transition={isRunning ? { duration: durationSec, ease: "linear" } : { duration: 0 }}
                    onAnimationComplete={onComplete}
                />
            </div>
        </div>
    );
};

// --- 4. Comparison Card (Decision Lens) ---
interface ComparisonCardProps {
    title: string;
    children: ReactNode;
    variant?: "default" | "success" | "danger";
    className?: string;
}

export const ComparisonCard = ({
    title,
    children,
    variant = "default",
    className = ""
}: ComparisonCardProps) => {
    const borderMap = {
        default: "border-gray-700",
        success: "border-green-500/30 shadow-lg shadow-green-500/10",
        danger: "border-red-500/30 bg-red-900/10"
    };

    const titleColorMap = {
        default: "text-gray-500",
        success: "text-green-400",
        danger: "text-red-400"
    }

    return (
        <div className={`bg-gray-900 border rounded-lg overflow-hidden p-6 gap-4 ${borderMap[variant]} ${className}`}>
            <div className={`text-sm uppercase tracking-wider mb-4 font-bold ${titleColorMap[variant]}`}>
                {title}
            </div>
            {children}
        </div>
    );
};
