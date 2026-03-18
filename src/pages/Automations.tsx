import { motion } from "framer-motion";
import {
  Zap,
  Play,
  Pause,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  ThumbsUp,
  Clock,
  Shield,
} from "lucide-react";
import { useState } from "react";

const ease = [0.2, 0.8, 0.2, 1] as const;

const automations = [
  {
    id: 1,
    name: "Campagna Re-engagement Partner Q1",
    description: "Invio email personalizzate a 200 partner e prospect inattivi con churn score ≥ 60",
    status: "running" as const,
    progress: 67,
    sent: 134,
    total: 200,
    errors: 3,
    retries: 1,
    agents: ["📧 Communication", "⚡ Automation", "🛡️ Governance"],
    startedAt: "14:02",
    eta: "~4 min",
    approvedBy: "Marco R.",
    entities: ["contacts", "companies", "email_drafts"],
    steps: [
      { label: "Segmentazione audience", status: "done" },
      { label: "Generazione template", status: "done" },
      { label: "Personalizzazione per destinatario", status: "done" },
      { label: "Invio email", status: "running" },
      { label: "Report risultati", status: "pending" },
    ],
    logs: [
      { time: "14:02:01", msg: "Avvio campagna re-engagement — approvata da Marco R.", type: "info" as const },
      { time: "14:02:02", msg: "Template email caricato: 'Win-back Q1 — Partner Edition'", type: "info" as const },
      { time: "14:02:03", msg: "Audience verificata: 142 partner + 58 prospect (200 totali)", type: "info" as const },
      { time: "14:02:15", msg: "Inviate 50/200 — tasso apertura stimato: 34%", type: "progress" as const },
      { time: "14:02:28", msg: "Errore: indirizzo non valido per Acme Corp (j.smith@invalid)", type: "error" as const },
      { time: "14:02:31", msg: "Retry #1: tentativo con email alternativo (j.smith@acme.com)", type: "info" as const },
      { time: "14:02:45", msg: "Inviate 100/200 — 2 errori gestiti, 1 retry riuscito", type: "progress" as const },
      { time: "14:03:01", msg: "Inviate 134/200 — ETA: ~4 min — Governance: nessuna anomalia", type: "progress" as const },
      { time: "14:03:05", msg: "Errore: timeout SMTP record #156 — in coda per retry", type: "error" as const },
    ],
  },
  {
    id: 2,
    name: "Aggiornamento scoring lead ML",
    description: "Ricalcolo score engagement su 12.400 prospects con nuovo modello ML v3.2",
    status: "completed" as const,
    progress: 100,
    sent: 12400,
    total: 12400,
    errors: 0,
    retries: 0,
    agents: ["📊 Data Analyst", "🏢 CRM Core"],
    startedAt: "13:45",
    eta: "—",
    approvedBy: "Marco R.",
    entities: ["prospects", "activities"],
    steps: [
      { label: "Caricamento modello ML", status: "done" },
      { label: "Scoring batch", status: "done" },
      { label: "Aggiornamento CRM", status: "done" },
      { label: "Report completamento", status: "done" },
    ],
    logs: [
      { time: "13:45:00", msg: "Avvio ricalcolo scoring su 12.400 prospects", type: "info" as const },
      { time: "13:46:12", msg: "Batch 1/3 completato — 4.133 record aggiornati", type: "progress" as const },
      { time: "13:47:23", msg: "Scoring completato — 0 errori — CRM Core aggiornato", type: "progress" as const },
    ],
  },
  {
    id: 3,
    name: "Export GDPR — Richieste cancellazione",
    description: "Report dati personali per 3 richieste di right-to-erasure (GDPR Art. 17)",
    status: "approval_needed" as const,
    progress: 80,
    sent: 2,
    total: 3,
    errors: 0,
    retries: 0,
    agents: ["🛡️ Governance", "🏢 CRM Core"],
    startedAt: "12:30",
    eta: "In attesa approvazione",
    approvedBy: "—",
    entities: ["contacts", "activities", "documents"],
    steps: [
      { label: "Identificazione dati personali", status: "done" },
      { label: "Generazione report privacy", status: "done" },
      { label: "Revisione legale", status: "approval" },
      { label: "Cancellazione dati", status: "pending" },
    ],
    logs: [],
  },
  {
    id: 4,
    name: "Sync inventario SAP → CRM Core",
    description: "Sincronizzazione incrementale catalogo prodotti (2.500 SKU) con mapping entità",
    status: "paused" as const,
    progress: 45,
    sent: 1125,
    total: 2500,
    errors: 12,
    retries: 3,
    agents: ["⚡ Automation", "🏢 CRM Core"],
    startedAt: "11:00",
    eta: "In pausa — 12 errori da risolvere",
    approvedBy: "Sistema",
    entities: ["companies", "products"],
    steps: [
      { label: "Connessione SAP", status: "done" },
      { label: "Mapping campi", status: "done" },
      { label: "Sync incrementale", status: "paused" },
      { label: "Validazione", status: "pending" },
    ],
    logs: [],
  },
];

const Automations = () => {
  const [expanded, setExpanded] = useState<number | null>(1);

  return (
    <div className="min-h-screen pb-24 px-6 lg:px-10 pt-8 max-w-[1400px] mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center glow-primary">
                <Zap className="w-4 h-4 text-primary" strokeWidth={1.5} />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">Automazioni & Esecuzioni</h1>
            </div>
            <p className="text-sm text-muted-foreground ml-12">
              Operazioni massive con step, progress, retry, approvazioni e audit trail
            </p>
          </div>
          <div className="flex items-center gap-3">
            {[
              { label: "In corso", count: 1, color: "text-primary" },
              { label: "Completate", count: 1, color: "text-success" },
              { label: "Approvazione", count: 1, color: "text-warning" },
              { label: "In pausa", count: 1, color: "text-muted-foreground" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-1.5 text-[11px]">
                <span className={`w-1.5 h-1.5 rounded-full bg-current ${s.color}`} />
                <span className="text-muted-foreground">{s.count} {s.label.toLowerCase()}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="space-y-3">
        {automations.map((auto, i) => (
          <motion.div
            key={auto.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05, ease }}
            className="glass-panel overflow-hidden"
          >
            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    auto.status === "running" ? "bg-primary/10"
                    : auto.status === "completed" ? "bg-success/10"
                    : auto.status === "approval_needed" ? "bg-warning/10"
                    : "bg-secondary"
                  }`}>
                    {auto.status === "running" ? <Loader2 className="w-5 h-5 text-primary animate-spin" />
                    : auto.status === "completed" ? <CheckCircle2 className="w-5 h-5 text-success" />
                    : auto.status === "approval_needed" ? <ThumbsUp className="w-5 h-5 text-warning" />
                    : <Pause className="w-5 h-5 text-muted-foreground" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">{auto.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{auto.description}</p>
                    <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground font-mono flex-wrap">
                      {auto.agents.map((a) => <span key={a}>{a}</span>)}
                      <span>·</span>
                      <span>Avviato {auto.startedAt}</span>
                      {auto.approvedBy !== "—" && <><span>·</span><span>Approvato: {auto.approvedBy}</span></>}
                    </div>
                    {/* Entities */}
                    <div className="flex gap-1 mt-1.5">
                      {auto.entities.map((e) => (
                        <span key={e} className="text-[9px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground font-mono">{e}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {auto.status === "approval_needed" && (
                    <button className="text-[11px] px-3 py-1.5 rounded-lg bg-success/10 text-success hover:bg-success/15 transition-colors flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3" /> Approva
                    </button>
                  )}
                  {auto.status === "running" && (
                    <button className="w-8 h-8 rounded-lg glass-panel-subtle flex items-center justify-center text-muted-foreground hover:text-warning transition-colors">
                      <Pause className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {auto.status === "paused" && (
                    <button className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors">
                      <Play className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => setExpanded(expanded === auto.id ? null : auto.id)}
                    className="w-8 h-8 rounded-lg glass-panel-subtle flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {expanded === auto.id ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Steps */}
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                {auto.steps.map((step, j) => (
                  <div key={j} className="flex items-center gap-1.5">
                    <div className={`text-[10px] px-2 py-0.5 rounded font-mono flex items-center gap-1 ${
                      step.status === "done" ? "bg-success/10 text-success"
                      : step.status === "running" ? "bg-primary/10 text-primary"
                      : step.status === "approval" ? "bg-warning/10 text-warning"
                      : step.status === "paused" ? "bg-muted text-muted-foreground"
                      : "bg-secondary text-muted-foreground/50"
                    }`}>
                      {step.status === "running" && <Loader2 className="w-2.5 h-2.5 animate-spin" />}
                      {step.status === "done" && <CheckCircle2 className="w-2.5 h-2.5" />}
                      {step.status === "approval" && <ThumbsUp className="w-2.5 h-2.5" />}
                      {step.label}
                    </div>
                    {j < auto.steps.length - 1 && <span className="text-muted-foreground/20 text-xs">→</span>}
                  </div>
                ))}
              </div>

              {/* Progress */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${auto.progress}%` }}
                    transition={{ duration: 1, ease }}
                    className={`h-full rounded-full ${
                      auto.status === "completed" ? "bg-success"
                      : auto.status === "paused" ? "bg-muted-foreground"
                      : auto.status === "approval_needed" ? "bg-warning"
                      : "bg-primary"
                    }`}
                  />
                </div>
                <span className="text-xs font-mono text-muted-foreground w-12 text-right">{auto.progress}%</span>
              </div>

              <div className="flex items-center gap-5 mt-2 text-[11px] text-muted-foreground">
                <span className="font-mono">{auto.sent.toLocaleString()}/{auto.total.toLocaleString()} elaborati</span>
                {auto.errors > 0 && (
                  <span className="text-destructive flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {auto.errors} errori
                  </span>
                )}
                {auto.retries > 0 && (
                  <span className="text-info flex items-center gap-1">
                    <RotateCcw className="w-3 h-3" /> {auto.retries} retry
                  </span>
                )}
                {auto.status === "completed" && auto.errors === 0 && (
                  <span className="text-success flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Completato senza errori
                  </span>
                )}
                {auto.status === "approval_needed" && (
                  <span className="text-warning flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3" /> In attesa di approvazione
                  </span>
                )}
              </div>
            </div>

            {/* Expanded log */}
            {expanded === auto.id && auto.logs.length > 0 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="border-t border-border bg-background/30 p-4"
              >
                <div className="section-label mb-3">LOG ESECUZIONE</div>
                <div className="space-y-1 font-mono max-h-48 overflow-y-auto">
                  {auto.logs.map((log, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: j * 0.03 }}
                      className="flex items-start gap-3 text-[11px] py-0.5"
                    >
                      <span className="text-muted-foreground w-20 flex-shrink-0">[{log.time}]</span>
                      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                        log.type === "error" ? "bg-destructive" : log.type === "progress" ? "bg-primary" : "bg-muted-foreground"
                      }`} />
                      <span className={
                        log.type === "error" ? "text-destructive"
                        : log.type === "progress" ? "text-secondary-foreground"
                        : "text-muted-foreground"
                      }>{log.msg}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Automations;
