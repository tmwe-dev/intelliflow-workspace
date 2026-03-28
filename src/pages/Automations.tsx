import { motion } from "framer-motion";
import { Zap, CheckCircle2, Loader2, Pause, ThumbsUp } from "lucide-react";

const ease = [0.2, 0.8, 0.2, 1] as const;

const automations = [
  { name: "Campagna Re-engagement Partner", status: "running" as const, progress: 67, detail: "134/200 email inviate", agents: "Communication · Automation" },
  { name: "Scoring Lead ML v3.2", status: "completed" as const, progress: 100, detail: "12.400 record elaborati", agents: "Data Analyst · CRM Core" },
  { name: "Export GDPR", status: "approval" as const, progress: 80, detail: "In attesa approvazione legale", agents: "Governance · CRM Core" },
  { name: "Sync SAP → CRM Core", status: "paused" as const, progress: 45, detail: "12 errori da risolvere", agents: "Automation · CRM Core" },
];

const Automations = () => {
  return (
    <div className="min-h-screen pb-24 flex flex-col items-center px-6 pt-16">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/[0.02] blur-[120px]" />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="text-center mb-16 relative z-10">
        <Zap className="w-5 h-5 text-primary/92 mx-auto mb-4" strokeWidth={1.5} />
        <h1 className="text-2xl font-light tracking-tight mb-2">Automazioni</h1>
        <p className="text-sm text-muted-foreground/92 font-light">Operazioni in corso e completate</p>
      </motion.div>

      <div className="w-full max-w-2xl space-y-3 relative z-10">
        {automations.map((auto, i) => (
          <motion.div
            key={auto.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06, ease }}
            className="float-panel p-5"
          >
            <div className="flex items-start gap-4">
              <div className="mt-0.5 flex-shrink-0">
                {auto.status === "running" ? <Loader2 className="w-4 h-4 text-primary/60 animate-spin" />
                : auto.status === "completed" ? <CheckCircle2 className="w-4 h-4 text-success/65" />
                : auto.status === "approval" ? <ThumbsUp className="w-4 h-4 text-warning/40" />
                : <Pause className="w-4 h-4 text-muted-foreground/96" />}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium mb-1">{auto.name}</h3>
                <p className="text-[11px] text-muted-foreground/88 mb-3">{auto.detail}</p>
                <div className="h-1 bg-secondary rounded-full overflow-hidden mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${auto.progress}%` }}
                    transition={{ duration: 1, ease }}
                    className={`h-full rounded-full ${
                      auto.status === "completed" ? "bg-success/40"
                      : auto.status === "approval" ? "bg-warning/40"
                      : auto.status === "paused" ? "bg-muted-foreground/20"
                      : "bg-primary/60"
                    }`}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground/92 font-mono">{auto.progress}%</span>
                  <span className="text-[10px] text-muted-foreground/92">{auto.agents}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Automations;
