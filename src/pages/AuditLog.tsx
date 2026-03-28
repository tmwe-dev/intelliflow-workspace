import { motion } from "framer-motion";
import { Shield, Bot, CheckCircle2, AlertTriangle, Eye, ThumbsUp, Lock, Search } from "lucide-react";

const ease = [0.2, 0.8, 0.2, 1] as const;

type Status = "suggested" | "previewed" | "approved" | "executed" | "error" | "policy";

const statusIcon: Record<Status, typeof Bot> = {
  suggested: Bot, previewed: Eye, approved: ThumbsUp, executed: CheckCircle2, error: AlertTriangle, policy: Lock,
};
const statusColor: Record<Status, string> = {
  suggested: "text-primary/60", previewed: "text-info/65", approved: "text-success/65", executed: "text-success/65", error: "text-destructive/65", policy: "text-accent/65",
};

const entries = [
  { time: "14:03", action: "Email inviata — Acme Corp", status: "executed" as Status, agent: "Communication" },
  { time: "14:03", action: "Proposta campagna re-engagement", status: "suggested" as Status, agent: "Orchestratore" },
  { time: "14:02", action: "Canvas approvato — 34 companies", status: "approved" as Status, agent: "Marco R." },
  { time: "14:02", action: "Anteprima generata — KPI + tabella", status: "previewed" as Status, agent: "Canvas" },
  { time: "14:02", action: "Errore email — indirizzo non valido", status: "error" as Status, agent: "Communication" },
  { time: "14:02", action: "Query cross-database completata", status: "executed" as Status, agent: "CRM Core" },
  { time: "14:01", action: "Churn scoring — 34 companies", status: "executed" as Status, agent: "Data Analyst" },
  { time: "14:00", action: "Policy: azione massiva richiede approvazione", status: "policy" as Status, agent: "Governance" },
  { time: "13:58", action: "Template 'Analisi Clienti' salvato v2.1", status: "approved" as Status, agent: "Marco R." },
  { time: "13:45", action: "Scoring 12.400 prospects completato", status: "executed" as Status, agent: "Data Analyst" },
];

const AuditLog = () => {
  return (
    <div className="min-h-screen pb-24 flex flex-col items-center px-6 pt-16">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-accent/[0.02] blur-[120px]" />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="text-center mb-12 relative z-10">
        <Shield className="w-5 h-5 text-primary/70 mx-auto mb-4" strokeWidth={1.5} />
        <h1 className="text-2xl font-light tracking-tight mb-2">Audit & Governance</h1>
        <p className="text-sm text-muted-foreground/70 font-light">Ogni azione tracciata</p>
      </motion.div>

      {/* Search */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="w-full max-w-2xl mb-6 relative z-10">
        <div className="float-panel-subtle px-4 py-3 flex items-center gap-3">
          <Search className="w-3.5 h-3.5 text-muted-foreground/70" />
          <input type="text" placeholder="Cerca..." className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground/50 font-light" />
        </div>
      </motion.div>

      <div className="w-full max-w-2xl relative z-10">
        <div className="space-y-0.5">
          {entries.map((entry, i) => {
            const Icon = statusIcon[entry.status];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.03 }}
                className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-secondary/10 transition-colors duration-300 cursor-pointer group"
              >
                <span className="text-[10px] font-mono text-muted-foreground/70 w-10">{entry.time}</span>
                <Icon className={`w-3.5 h-3.5 ${statusColor[entry.status]} flex-shrink-0`} strokeWidth={1.5} />
                <span className="text-sm font-light flex-1 text-secondary-foreground/85 group-hover:text-foreground transition-colors duration-300">{entry.action}</span>
                <span className="text-[10px] text-muted-foreground/70">{entry.agent}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AuditLog;
