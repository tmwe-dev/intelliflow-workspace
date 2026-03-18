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
} from "lucide-react";
import { useState } from "react";

const ease = [0.2, 0.8, 0.2, 1] as const;

const automations = [
  {
    id: 1,
    name: "Campagna Re-engagement Q1",
    description: "Invio email personalizzate a 200 clienti inattivi con score ≥ 60",
    status: "running" as const,
    progress: 67,
    sent: 134,
    total: 200,
    errors: 3,
    agent: "📧 Comm. Agent",
    startedAt: "14:02",
    eta: "~4 min",
    logs: [
      { time: "14:02:01", msg: "Avvio campagna re-engagement", type: "info" as const },
      { time: "14:02:02", msg: "Template email caricato: 'Win-back Q1 — Personalizzato'", type: "info" as const },
      { time: "14:02:03", msg: "Segmento audience verificato: 200 contatti validi", type: "info" as const },
      { time: "14:02:15", msg: "Inviate 50/200 email — tasso apertura stimato: 34%", type: "progress" as const },
      { time: "14:02:28", msg: "Errore: indirizzo non valido per Acme Corp (j.smith@invalid)", type: "error" as const },
      { time: "14:02:31", msg: "Errore: bounce per TechGlobal Ltd (info@techglobal.old)", type: "error" as const },
      { time: "14:02:45", msg: "Inviate 100/200 email — 2 errori gestiti", type: "progress" as const },
      { time: "14:03:01", msg: "Inviate 134/200 email — ETA completamento: ~4 min", type: "progress" as const },
      { time: "14:03:05", msg: "Errore: timeout connessione SMTP per record #156", type: "error" as const },
    ],
  },
  {
    id: 2,
    name: "Aggiornamento scoring lead database",
    description: "Ricalcolo score engagement per 12.400 lead su nuovi criteri ML",
    status: "completed" as const,
    progress: 100,
    sent: 12400,
    total: 12400,
    errors: 0,
    agent: "📊 Data Analyst",
    startedAt: "13:45",
    eta: "—",
    logs: [
      { time: "13:45:00", msg: "Avvio ricalcolo scoring su 12.400 record", type: "info" as const },
      { time: "13:47:23", msg: "Scoring completato — 0 errori", type: "progress" as const },
    ],
  },
  {
    id: 3,
    name: "Export dati compliance GDPR",
    description: "Generazione report dati personali per 3 richieste di cancellazione",
    status: "completed" as const,
    progress: 100,
    sent: 3,
    total: 3,
    errors: 0,
    agent: "🛡️ Compliance",
    startedAt: "12:30",
    eta: "—",
    logs: [],
  },
  {
    id: 4,
    name: "Sync inventario SAP → DB locale",
    description: "Sincronizzazione incrementale catalogo prodotti (2.500 SKU)",
    status: "paused" as const,
    progress: 45,
    sent: 1125,
    total: 2500,
    errors: 12,
    agent: "⚡ Automation",
    startedAt: "11:00",
    eta: "In pausa",
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
              Monitoraggio in tempo reale di operazioni massive e flussi automatici
            </p>
          </div>
          <div className="flex items-center gap-3">
            {[
              { label: "In corso", count: 1, color: "text-primary" },
              { label: "Completate", count: 2, color: "text-success" },
              { label: "In pausa", count: 1, color: "text-warning" },
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
                    auto.status === "running" ? "bg-primary/10" : auto.status === "completed" ? "bg-success/10" : "bg-warning/10"
                  }`}>
                    {auto.status === "running" ? (
                      <Loader2 className="w-5 h-5 text-primary animate-spin" />
                    ) : auto.status === "completed" ? (
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    ) : (
                      <Pause className="w-5 h-5 text-warning" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">{auto.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{auto.description}</p>
                    <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground font-mono">
                      <span>{auto.agent}</span>
                      <span>·</span>
                      <span>Avviato {auto.startedAt}</span>
                      {auto.eta !== "—" && <><span>·</span><span>ETA: {auto.eta}</span></>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
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

              {/* Progress */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${auto.progress}%` }}
                    transition={{ duration: 1, ease }}
                    className={`h-full rounded-full ${
                      auto.status === "completed" ? "bg-success" : auto.status === "paused" ? "bg-warning" : "bg-primary"
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
                {auto.status === "completed" && auto.errors === 0 && (
                  <span className="text-success flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Completato senza errori
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
                      }>
                        {log.msg}
                      </span>
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
