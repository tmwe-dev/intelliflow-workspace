import { motion } from "framer-motion";
import {
  Shield,
  Bot,
  User,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Zap,
  Database,
  Search,
  Filter,
  Clock,
  ArrowRight,
  Info,
  Lock,
} from "lucide-react";

const ease = [0.2, 0.8, 0.2, 1] as const;

type AuditStatus = "executed" | "previewed" | "suggested" | "approved" | "error" | "warning";

const statusConfig: Record<AuditStatus, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  executed: { label: "Eseguita", color: "text-success", icon: CheckCircle2 },
  previewed: { label: "Anteprima", color: "text-info", icon: Eye },
  suggested: { label: "Suggerita AI", color: "text-primary", icon: Bot },
  approved: { label: "Approvata", color: "text-success", icon: CheckCircle2 },
  error: { label: "Errore", color: "text-destructive", icon: AlertTriangle },
  warning: { label: "Attenzione", color: "text-warning", icon: AlertTriangle },
};

const auditEntries = [
  { id: 1, time: "14:03:12", action: "Email inviata", detail: "Campagna re-engagement → Acme Corp — template Win-back Q1", agent: "Comm. Agent", user: "Sistema", status: "executed" as AuditStatus, category: "automazione" },
  { id: 2, time: "14:03:01", action: "Suggerimento AI", detail: "Raccomandazione: attivare campagna re-engagement per 6 clienti critici (score ≥85)", agent: "Orchestratore", user: "—", status: "suggested" as AuditStatus, category: "ai" },
  { id: 3, time: "14:02:45", action: "Approvazione utente", detail: "Marco R. ha approvato la generazione del canvas tabellare con scoring churn", agent: "—", user: "Marco R.", status: "approved" as AuditStatus, category: "utente" },
  { id: 4, time: "14:02:30", action: "Anteprima generata", detail: "Canvas con KPI, tabella 34 clienti e grafico trend — in attesa di approvazione", agent: "Canvas Agent", user: "—", status: "previewed" as AuditStatus, category: "ai" },
  { id: 5, time: "14:02:28", action: "Errore invio email", detail: "Indirizzo non valido: j.smith@invalid — record #87 (Acme Corp)", agent: "Comm. Agent", user: "Sistema", status: "error" as AuditStatus, category: "errore" },
  { id: 6, time: "14:02:05", action: "Query cross-database", detail: "JOIN CRM PostgreSQL ↔ Ordini MySQL — 34 risultati in 1.2s", agent: "Data Analyst", user: "Marco R.", status: "executed" as AuditStatus, category: "dati" },
  { id: 7, time: "14:01:06", action: "Scoring calcolato", detail: "Churn risk score aggiornato per 34 clienti — modello ML v3.2", agent: "Data Analyst", user: "Sistema", status: "executed" as AuditStatus, category: "dati" },
  { id: 8, time: "13:58:22", action: "Template salvato", detail: "'Analisi Clienti Inattivi' aggiornato a v2.1 da Marco R.", agent: "—", user: "Marco R.", status: "approved" as AuditStatus, category: "utente" },
  { id: 9, time: "13:45:00", action: "Automazione completata", detail: "Aggiornamento scoring 12.400 lead — 0 errori — durata 2m 23s", agent: "Data Analyst", user: "Sistema", status: "executed" as AuditStatus, category: "automazione" },
  { id: 10, time: "13:30:15", action: "Accesso utente", detail: "Login Marco R. da Milano, IT — Chrome 122 / macOS 15.2", agent: "—", user: "Marco R.", status: "executed" as AuditStatus, category: "sicurezza" },
  { id: 11, time: "12:30:00", action: "Export GDPR avviato", detail: "3 richieste dati personali — report generati e pronti per revisione", agent: "Compliance", user: "Laura B.", status: "executed" as AuditStatus, category: "compliance" },
  { id: 12, time: "11:45:33", action: "Accesso negato", detail: "Tentativo accesso tabella 'payroll' da Guest_01 — permessi insufficienti", agent: "—", user: "Guest_01", status: "warning" as AuditStatus, category: "sicurezza" },
];

const AuditLog = () => {
  return (
    <div className="min-h-screen pb-24 px-6 lg:px-10 pt-8 max-w-[1400px] mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center glow-primary">
                <Shield className="w-4 h-4 text-primary" strokeWidth={1.5} />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">Audit Log</h1>
            </div>
            <p className="text-sm text-muted-foreground ml-12">
              Tracciabilità completa: ogni azione AI è distinguibile tra suggerimento, anteprima, approvazione ed esecuzione
            </p>
          </div>
        </div>
      </motion.div>

      {/* Status legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-5 mb-6 px-1 flex-wrap"
      >
        <span className="section-label">STATI:</span>
        {Object.entries(statusConfig).map(([key, config]) => (
          <span key={key} className={`text-[10px] font-mono ${config.color} flex items-center gap-1.5`}>
            <config.icon className="w-3 h-3" />
            {config.label}
          </span>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="flex items-center gap-2 glass-panel px-4 py-2.5 flex-1 max-w-md rounded-xl">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input type="text" placeholder="Cerca azioni, agenti, utenti..." className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground" />
        </div>
        <button className="flex items-center gap-1.5 text-[11px] px-3 py-2.5 rounded-lg glass-panel-subtle text-muted-foreground hover:text-foreground transition-colors">
          <Filter className="w-3 h-3" /> Filtra per tipo
        </button>
      </motion.div>

      {/* Log */}
      <div className="glass-panel overflow-hidden">
        <div className="px-5 py-3 border-b border-border flex items-center justify-between">
          <span className="section-label">OGGI · 18 MARZO 2026</span>
          <span className="text-[10px] text-muted-foreground font-mono">{auditEntries.length} eventi</span>
        </div>
        <div className="divide-y divide-border/30">
          {auditEntries.map((entry, i) => {
            const config = statusConfig[entry.status];
            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.025 }}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-secondary/8 transition-colors group cursor-pointer"
              >
                <span className="text-[11px] font-mono text-muted-foreground w-16 flex-shrink-0">
                  {entry.time}
                </span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  entry.status === "error" ? "bg-destructive/8"
                  : entry.status === "warning" ? "bg-warning/8"
                  : entry.status === "suggested" ? "bg-primary/8"
                  : entry.status === "previewed" ? "bg-info/8"
                  : "bg-secondary/50"
                }`}>
                  <config.icon className={`w-3.5 h-3.5 ${config.color}`} strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[13px] font-medium">{entry.action}</span>
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-md glass-panel-subtle ${config.color}`}>
                      {config.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground truncate mt-0.5">{entry.detail}</p>
                </div>
                <div className="text-right flex-shrink-0 min-w-[100px]">
                  <div className="text-[11px] text-secondary-foreground">{entry.user}</div>
                  {entry.agent !== "—" && (
                    <div className="text-[10px] text-primary font-mono mt-0.5">{entry.agent}</div>
                  )}
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AuditLog;
