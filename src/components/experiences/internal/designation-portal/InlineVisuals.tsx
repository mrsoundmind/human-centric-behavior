import { motion } from "framer-motion";
import { TimelineBurn } from "../visuals/TimelineBurn";
import { TargetFocus } from "../visuals/TargetFocus";
import { ListeningEQ } from "../visuals/ListeningEQ";
import { Iceberg } from "../visuals/Iceberg";
import { RelayBaton } from "../visuals/RelayBaton";

export const StateMatrixVisual = () => (
    <div className="bg-muted p-8 rounded-3xl border border-border mt-8 w-full max-w-2xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {["Idle", "Loading", "Success", "Error", "Empty"].map((s) => (
                <div key={s} className="space-y-2">
                    <div className="aspect-[9/16] bg-card rounded border border-border relative overflow-hidden flex items-center justify-center">
                        {s === "Loading" && <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>}
                        {s === "Error" && <div className="text-destructive text-xs text-center p-2">⚠️ Network Fail</div>}
                        {s === "Empty" && <div className="text-muted-foreground text-xs">No Data</div>}
                        {s === "Success" && <div className="text-primary text-xs">✓ Done</div>}
                        {s === "Idle" && <div className="w-12 h-2 bg-muted rounded"></div>}
                    </div>
                    <div className="text-xs font-mono text-muted-foreground capitalize text-center">{s}</div>
                </div>
            ))}
        </div>
        <p className="mt-8 text-primary font-mono text-sm text-center">UX Tool: State Mapping</p>
    </div>
);

export const NetworkThrottleVisual = () => (
    <div className="bg-background p-8 rounded-3xl border border-border flex flex-col items-center justify-center space-y-8 mt-8 w-full max-w-2xl mx-auto">
        <div className="flex gap-8">
            <div className="text-center space-y-2">
                <div className="text-xs text-muted-foreground">YOUR MAC (FIBER)</div>
                <div className="text-4xl font-bold text-primary">0.2s</div>
            </div>
            <div className="w-px bg-border h-20"></div>
            <div className="text-center space-y-2">
                <div className="text-xs text-muted-foreground">REAL USER (3G)</div>
                <div className="text-4xl font-bold text-destructive animate-pulse">4.8s</div>
            </div>
        </div>
        <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
            <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "10%" }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-full bg-destructive"
            />
        </div>
        <p className="text-primary font-mono text-sm">UX Tool: Performance Empathy</p>
    </div>
);

export const ChainLinkVisual = () => (
    <div className="bg-background p-8 rounded-3xl border border-border flex flex-col items-center justify-center space-y-8 mt-8 w-full max-w-2xl mx-auto">
        <div className="flex gap-4 items-center">
            <div className="p-4 bg-muted rounded-xl border border-border text-sm">Feature Code</div>
            <div className="text-muted-foreground">--?--</div>
            <div className="p-4 bg-primary/10 rounded-xl border border-primary/40 text-sm text-primary">Business Value</div>
        </div>
        <div className="p-6 bg-card border border-border rounded-2xl max-w-lg text-left">
            <p className="font-mono text-xs text-primary mb-2">// The Broken Trace</p>
            <p className="text-sm text-muted-foreground">If developers only receive "Build a search bar", they will build a generic text match. By linking it to the specific goal ("User needs to find SKUs to re-order"), they build a "Recent Orders" dropdown instead.</p>
        </div>
        <p className="text-primary font-mono text-sm">UX Tool: Value Traceability Matrix</p>
    </div>
);

export const ContrastHeatmapVisual = () => (
    <div className="bg-background p-8 rounded-3xl border border-border flex flex-col items-center justify-center space-y-12 mt-8 w-full max-w-2xl mx-auto">
        <div className="flex gap-16">
            <div className="text-center space-y-4">
                <div className="px-8 py-3 bg-muted rounded shadow-sm border border-border">
                    <span className="text-muted-foreground font-medium tracking-wide">Submit Order</span>
                </div>
                <div className="text-xs font-mono text-destructive bg-destructive/10 px-3 py-1 rounded inline-block">Contrast Ratio: 1.4:1</div>
                <p className="text-xs text-muted-foreground">"Looks clean on my iMac"</p>
            </div>
            <div className="text-center space-y-4">
                <div className="px-8 py-3 bg-primary rounded shadow-md">
                    <span className="text-primary-foreground font-medium tracking-wide">Submit Order</span>
                </div>
                <div className="text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded inline-block">Contrast Ratio: 8.5:1</div>
                <p className="text-xs text-muted-foreground">"Legible on cheap phone in sun"</p>
            </div>
        </div>
        <p className="text-primary font-mono text-sm uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full">UX Tool: WebAIM Accessibility Check</p>
    </div>
);

export const BugIcebergVisual = () => (
    <div className="bg-card p-8 rounded-3xl border border-border flex flex-col items-center justify-center space-y-8 relative overflow-hidden mt-8 w-full max-w-2xl mx-auto">
        <div className="w-full max-w-md relative">
            <div className="absolute top-1/3 left-0 right-0 h-px bg-primary/40 dashed box-border z-10"></div>
            <div className="absolute top-1/3 right-2 -mt-5 text-xs font-mono text-primary">The "Passed" Line</div>
            <div className="bg-primary/10 p-4 rounded-t-lg border-b-0 text-center relative z-20 mx-12">
                <span className="text-primary font-bold text-sm">Button Clicks ✅</span>
            </div>
            <div className="bg-card p-6 rounded-b-xl border border-primary/40 text-center space-y-3 relative z-20 backdrop-blur-sm shadow-xl">
                <div className="p-2 bg-destructive/10 rounded text-destructive text-xs border border-destructive/40">Touch target too small</div>
                <div className="p-2 bg-destructive/10 rounded text-destructive text-xs border border-destructive/40">No loading state</div>
                <div className="p-2 bg-destructive/10 rounded text-destructive text-xs border border-destructive/40">Not keyboard accessible</div>
            </div>
        </div>
        <p className="text-primary font-mono text-sm bg-primary/10 px-4 py-2 rounded-full border border-primary/40">UX Tool: Heuristic Usability Evaluation</p>
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
