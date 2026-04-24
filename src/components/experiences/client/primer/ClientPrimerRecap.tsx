import { motion } from "framer-motion";

interface ClientPrimerRecapProps {
    onNext: () => void;
}

export const ClientPrimerRecap = ({ onNext }: ClientPrimerRecapProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-4xl mx-auto text-center space-y-12 py-20 px-6"
        >
            <div className="space-y-6">
                <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold tracking-widest text-primary font-mono mb-4">
                    PHASE 1 COMPLETE
                </div>
                <h2 className="text-5xl md:text-6xl font-display font-light text-foreground leading-tight">
                    It wasn't <span className="font-bold text-primary">you</span>. <br />
                    It was the <span className="font-bold text-foreground border-b-4 border-primary">Design</span>.
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    That frustration you just felt? The confusion? The urge to give up?
                    <br /><br />
                    <strong className="text-foreground">That is exactly how your users feel every day.</strong>
                </p>
            </div>

            <div className="bg-muted border border-border p-8 rounded-3xl max-w-3xl mx-auto grid md:grid-cols-3 gap-8">
                <div className="space-y-2">
                    <div className="text-4xl">🚪</div>
                    <div className="font-bold text-foreground">The Door</div>
                    <div className="text-xs text-muted-foreground">Confusing Signals</div>
                </div>
                <div className="space-y-2">
                    <div className="text-4xl">🔥</div>
                    <div className="font-bold text-foreground">The Stove</div>
                    <div className="text-xs text-muted-foreground">Bad Mapping</div>
                </div>
                <div className="space-y-2">
                    <div className="text-4xl">🥫</div>
                    <div className="font-bold text-foreground">The Ketchup</div>
                    <div className="text-xs text-muted-foreground">Inefficiency</div>
                </div>
            </div>

            <button
                onClick={onNext}
                className="px-10 py-5 bg-primary text-primary-foreground font-display font-bold text-lg rounded-full hover:scale-105 shadow-lg transition-all"
            >
                So, what does this cost? →
            </button>
        </motion.div>
    );
};
