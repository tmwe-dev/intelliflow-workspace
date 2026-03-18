import { motion } from "framer-motion";
import {
  Shield,
  Bot,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Search,
  Filter,
  ArrowRight,
  Lock,
  ThumbsUp,
  Zap,
  Database,
} from "lucide-react";

const ease = [0.2, 0.8, 0.2, 1] as const;

type AuditStatus = "executed" | "previewed" | "suggested" | "approved" | "error" | "warning" | "policy";

const statusConfig: Record<AuditStatus, { label: string; color: string; icon: typeof CheckCircle2; bg: string }> = {
  suggested: { label: "Suggerimento AI", color: "text-primary", icon: Bot, bg: "bg-primary/8" },
  previewed: { label: "Anteprima AI", color: "text-info", icon: Eye, bg: "bg-info/8" },
  approved: { label: "Approvata", color: "text-success", icon: ThumbsUp, bg: "bg-success/8" },
  executed: { label: "Eseguita", color: "text-success", icon: CheckCircle2, bg: "bg-success/8" },
  error: { label: "Errore", color: "text-destructive", icon: AlertTriangle, bg: "bg-destructive/8" },
  warning: { label: "Attenzione", color: "text-warning", icon: AlertTriangle, bg: "bg-warning/8" },
  policy: { label: "Policy", color: "text-accent", icon: Lock, bg: "bg-accent/8" },
};

const auditEntries = [
  { id: 1, time: "14:03:12", action: "Email inviata", detail: "Campagna re-engagement → Acme Corp — template Win-back Q1", agent: "📧 Communication", user: "Sistema", status: "executed" as AuditStatus, entities: ["contacts", "email_drafts"], category: "automazione" },
  { id: 2, time: "14:03:01", action: "Suggerimento AI", detail: "Proposta: attivare campagna re-engagement per 6 partner critici (score ≥85)", agent: "🧠 Orchestratore", user: "—", status: "suggested" as AuditStatus, entities: ["companies", "partners"], category: "ai" },
  { id: 3, time: "14:02:45", action: "Approvazione utente", detail: "Marco R. ha approvato il canvas tabellare con churn scoring — 34 companies", agent: "—", user: "Marco R.", status: "approved" as AuditStatus, entities: ["companies"], category: "utente" },
  { id: 4, time: "14:02:30", action: "Anteprima generata", detail: "Canvas con KPI, tabella 34 companies e grafico trend — in attesa approvazione", agent: "🎨 Canvas", user: "—", status: "previewed" as AuditStatus, entities: ["companies", "activities"], category: "ai" },
  { id: 5, time: "14:02:28", action: "Errore invio email", detail: "Indirizzo non valido: j.smith@invalid — record #87 (Acme Corp)", agent: "📧 Communication", user: "Sistema", status: "error" as AuditStatus, entities: ["contacts"], category: "errore" },
  { id: 6, time: "14:02:05", action: "Query cross-database", detail: "JOIN CRM Core (contacts + companies) ↔ Ordini MySQL ↔ SAP — 34 risultati", agent: "🏢 CRM Core", user: "Marco R.", status: "executed" as AuditStatus, entities: ["contacts", "companies", "activities"], category: "dati" },
  { id: 7, time: "14:01:06", action: "Scoring calcolato", detail: "Churn risk score su 34 companies — modello ML v3.2 — dati da 3 sorgenti", agent: "📊 Data Analyst", user: "Sistema", status: "executed" as AuditStatus, entities: ["prospects"], category: "dati" },
  { id: 8, time: "14:00:30", action: "Policy check", detail: "Governance Agent: azione massiva su 200+ contatti richiede approvazione utente", agent: "🛡️ Governance", user: "Sistema", status: "policy" as AuditStatus, entities: [], category: "governance" },
  { id: 9, time: "13:58:22", action: "Template salvato", detail: "'Analisi Clienti Inattivi' aggiornato a v2.1 da Marco R.", agent: "—", user: "Marco R.", status: "approved" as AuditStatus, entities: ["templates"], category: "utente" },
  { id: 10, time: "13:45:00", action: "Automazione completata", detail: "Scoring 12.400 prospects — 0 errori — durata 2m 23s — CRM Core aggiornato", agent: "📊 Data Analyst", user: "Sistema", status: "executed" as AuditStatus, entities: ["prospects", "activities"], category: "automazione" },
  { id: 11, time: "13:30:15", action: "Accesso utente", detail: "Login Marco R. da Milano, IT — Chrome 122 / macOS 15.2", agent: "—", user: "Marco R.", status: "executed" as AuditStatus, entities: [], category: "sicurezza" },
  { id: 12, time: "12:30:00", action: "Export GDPR avviato", detail: "3 richieste right-to-erasure — report generati, in attesa approvazione legale", agent: "🛡️ Governance", user: "Laura B.", status: "previewed" as AuditStatus, entities: ["contacts", "documents"], category: "compliance" },
  { id: 13, time: "11:45:33", action: "Accesso negato", detail: "Tentativo accesso tabella 'payroll' da Guest_01 — permessi insufficienti", agent: "🛡️ Governance", user: "Guest_01", status: "warning" as AuditStatus, entities: [], category: "sicurezza" },
  { id: 14, time: "11:30:00", action: "Policy enforcement", detail: "Export dati > 10k record richiede approvazione admin — policy SEC-003", agent: "🛡️ Governance", user: "Sistema", status: "policy" as AuditStatus, entities: [], category: "governance" },
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
              <h1 className="text-2xl font-bold tracking-tight">Audit Log & Governance</h1>
            </div>
            <p className="text-sm text-muted-foreground ml-12">
              Ogni azione AI è tracciata con stato chiaro: suggerimento → anteprima → approvazione → esecuzione. Policy enforcement attivo.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-muted-foreground">{auditEntries.length} eventi oggi</span>
          </div>
        </div>
      </motion.div>

      {/* Status legend */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex items-center gap-4 mb-6 px-1 flex-wrap">
        <span className="section-label">FLUSSO AZIONE:</span>
        {(["suggested", "previewed", "approved", "executed", "error", "policy"] as AuditStatus[]).map((key) => {
          const config = statusConfig[key];
          return (
            <span key={key} className={`text-[10px] font-mono ${config.color} flex items-center gap-1.5`}>
              <config.icon className="w-3 h-3" />
              {config.label}
            </span>
          );
        })}
      </motion.div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2 glass-panel px-4 py-2.5 flex-1 max-w-md rounded-xl">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input type="text" placeholder="Cerca azioni, agenti, entità, utenti..." className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground" />
        </div>
        <button className="flex items-center gap-1.5 text-[11px] px-3 py-2.5 rounded-lg glass-panel-subtle text-muted-foreground hover:text-foreground transition-colors">
          <Filter className="w-3 h-3" /> Filtra
        </button>
      </motion.div>

      {/* Log */}
      <div className="glass-panel overflow-hidden">
        <div className="px-5 py-3 border-b border-border flex items-center justify-between">
          <span className="section-label">OGGI · 18 MARZO 2026</span>
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-mono">
            <span>{auditEntries.filter(e => e.status === "suggested").length} suggerimenti</span>
            <span>{auditEntries.filter(e => e.status === "approved").length} approvazioni</span>
            <span>{auditEntries.filter(e => e.status === "executed").length} esecuzioni</span>
            <span>{auditEntries.filter(e => e.status === "policy").length} policy</span>
          </div>
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
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${config.bg}`}>
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
                  {entry.entities.length > 0 && (
                    <div className="flex gap-1 mt-1">
                      {entry.entities.map((e) => (
                        <span key={e} className="text-[8px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground/60 font-mono">{e}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-right flex-shrink-0 min-w-[120px]">
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
