import { motion } from "framer-motion";
import { TimelineBurn } from "../visuals/TimelineBurn";
import { TargetFocus } from "../visuals/TargetFocus";
import { ListeningEQ } from "../visuals/ListeningEQ";
import { Iceberg } from "../visuals/Iceberg";
import { RelayBaton } from "../visuals/RelayBaton";

export const StateMatrixVisual = () => (
    <div className="bg-white/5 p-8 rounded-3xl border border-white/10 mt-8 w-full max-w-2xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {["Idle", "Loading", "Success", "Error", "Empty"].map((s) => (
                <div key={s} className="space-y-2">
                    <div className="aspect-[9/16] bg-gray-900 rounded border border-gray-700 relative overflow-hidden flex items-center justify-center">
                        {s === "Loading" && <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>}
                        {s === "Error" && <div className="text-red-500 text-xs text-center p-2">⚠️ Network Fail</div>}
                        {s === "Empty" && <div className="text-gray-500 text-xs">No Data</div>}
                        {s === "Success" && <div className="text-green-500 text-xs">✓ Done</div>}
                        {s === "Idle" && <div className="w-12 h-2 bg-gray-800 rounded"></div>}
                    </div>
                    <div className="text-xs font-mono text-gray-400 capitalize text-center">{s}</div>
                </div>
            ))}
        </div>
        <p className="mt-8 text-blue-200 font-mono text-sm text-center">UX Tool: State Mapping</p>
    </div>
);

export const NetworkThrottleVisual = () => (
    <div className="bg-black p-8 rounded-3xl border border-gray-800 flex flex-col items-center justify-center space-y-8 mt-8 w-full max-w-2xl mx-auto">
        <div className="flex gap-8">
            <div className="text-center space-y-2">
                <div className="text-xs text-gray-500">YOUR MAC (FIBER)</div>
                <div className="text-4xl font-bold text-green-500">0.2s</div>
            </div>
            <div className="w-px bg-gray-800 h-20"></div>
            <div className="text-center space-y-2">
                <div className="text-xs text-gray-500">REAL USER (3G)</div>
                <div className="text-4xl font-bold text-red-500 animate-pulse">4.8s</div>
            </div>
        </div>
        <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden">
            <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "10%" }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-full bg-red-500"
            />
        </div>
        <p className="text-blue-200 font-mono text-sm">UX Tool: Performance Empathy</p>
    </div>
);

export const ChainLinkVisual = () => (
    <div className="bg-black p-8 rounded-3xl border border-gray-800 flex flex-col items-center justify-center space-y-8 mt-8 w-full max-w-2xl mx-auto">
        <div className="flex gap-4 items-center">
            <div className="p-4 bg-gray-900 rounded-xl border border-gray-700 text-sm">Feature Code</div>
            <div className="text-gray-600">--?--</div>
            <div className="p-4 bg-blue-900/50 rounded-xl border border-blue-500 text-sm text-blue-200">Business Value</div>
        </div>
        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl max-w-lg text-left">
            <p className="font-mono text-xs text-blue-400 mb-2">// The Broken Trace</p>
            <p className="text-sm text-gray-300">If developers only receive "Build a search bar", they will build a generic text match. By linking it to the specific goal ("User needs to find SKUs to re-order"), they build a "Recent Orders" dropdown instead.</p>
        </div>
        <p className="text-blue-200 font-mono text-sm">UX Tool: Value Traceability Matrix</p>
    </div>
);

export const ContrastHeatmapVisual = () => (
    <div className="bg-white p-8 rounded-3xl border border-gray-200 flex flex-col items-center justify-center space-y-12 mt-8 w-full max-w-2xl mx-auto">
        <div className="flex gap-16">
            <div className="text-center space-y-4">
                <div className="px-8 py-3 bg-[#f8f9fa] rounded shadow-sm border border-gray-100">
                    <span className="text-[#adb5bd] font-medium tracking-wide">Submit Order</span>
                </div>
                <div className="text-xs font-mono text-red-500 bg-red-50 px-3 py-1 rounded inline-block">Contrast Ratio: 1.4:1</div>
                <p className="text-xs text-gray-500">"Looks clean on my iMac"</p>
            </div>
            <div className="text-center space-y-4">
                <div className="px-8 py-3 bg-blue-600 rounded shadow-md">
                    <span className="text-white font-medium tracking-wide">Submit Order</span>
                </div>
                <div className="text-xs font-mono text-green-600 bg-green-50 px-3 py-1 rounded inline-block">Contrast Ratio: 8.5:1</div>
                <p className="text-xs text-gray-500">"Legible on cheap phone in sun"</p>
            </div>
        </div>
        <p className="text-blue-600 font-mono text-sm uppercase tracking-widest bg-blue-50 px-4 py-2 rounded-full">UX Tool: WebAIM Accessibility Check</p>
    </div>
);

export const BugIcebergVisual = () => (
    <div className="bg-[#0a192f] p-8 rounded-3xl border border-blue-900/50 flex flex-col items-center justify-center space-y-8 relative overflow-hidden mt-8 w-full max-w-2xl mx-auto">
        <div className="w-full max-w-md relative">
            <div className="absolute top-1/3 left-0 right-0 h-px bg-blue-400/50 dashed box-border z-10"></div>
            <div className="absolute top-1/3 right-2 -mt-5 text-xs font-mono text-blue-300">The "Passed" Line</div>
            <div className="bg-blue-100 p-4 rounded-t-lg border-b-0 text-center relative z-20 mx-12">
                <span className="text-blue-900 font-bold text-sm">Button Clicks ✅</span>
            </div>
            <div className="bg-blue-900/40 p-6 rounded-b-xl border border-blue-500/30 text-center space-y-3 relative z-20 backdrop-blur-sm shadow-xl">
                <div className="p-2 bg-red-900/50 rounded text-red-200 text-xs border border-red-500/30">Touch target too small</div>
                <div className="p-2 bg-red-900/50 rounded text-red-200 text-xs border border-red-500/30">No loading state</div>
                <div className="p-2 bg-red-900/50 rounded text-red-200 text-xs border border-red-500/30">Not keyboard accessible</div>
            </div>
        </div>
        <p className="text-blue-300 font-mono text-sm bg-blue-900/30 px-4 py-2 rounded-full border border-blue-500/20">UX Tool: Heuristic Usability Evaluation</p>
    </div>
);

export const getRoleVisual = (role: string, phase: string, frictionTag: string) => {
    // We map primarily by frictionTag to ensure entirely different visuals for all 4 scenarios in a given phase.
    if (frictionTag === "client_friction") {
        if (role === "developer") return <NetworkThrottleVisual />;
        if (role === "pm" || role === "ba") return <ChainLinkVisual />;
        if (role === "designer") return <ContrastHeatmapVisual />;
        return <ListeningEQ uxValue="Focus on pain, not features" />;
    }
    
    if (frictionTag === "internal_bureaucracy") {
        if (role === "qa") return <BugIcebergVisual />;
        if (role === "pm" || role === "crm") return <TimelineBurn role={role} />;
        return <TargetFocus />;
    }
    
    if (frictionTag === "knowledge_gap") {
        if (role === "developer" || role === "pm") return <StateMatrixVisual />;
        if (role === "sales" || role === "strategy") return <Iceberg />;
        return <RelayBaton />;
    }
    
    if (frictionTag === "conflict_avoidance") {
        if (role === "qa" || role === "developer") return <TimelineBurn role="qa" />;
        if (role === "sales") return <ListeningEQ uxValue="Don't hide the scope gap" />;
        if (role === "pm") return <RelayBaton />;
        return <Iceberg />;
    }

    return <Iceberg />;
};
