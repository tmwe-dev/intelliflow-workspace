import { motion } from "framer-motion";
import {
  Zap,
  Play,
  Pause,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Mail,
  Users,
  FileText,
  RefreshCw,
  Eye,
} from "lucide-react";

const automations = [
  {
    id: 1,
    name: "Campagna Re-engagement Q1",
    description: "Invio email personalizzate a 200 clienti inattivi",
    status: "running",
    progress: 67,
    sent: 134,
    total: 200,
    errors: 3,
    agent: "Mailer",
    startedAt: "14:02",
    logs: [
      { time: "14:02:01", msg: "Avvio campagna re-engagement", type: "info" },
      { time: "14:02:03", msg: "Template email caricato: 'Win-back Q1'", type: "info" },
      { time: "14:02:15", msg: "Inviate 50/200 email", type: "progress" },
      { time: "14:02:28", msg: "Errore: indirizzo non valido per record #87", type: "error" },
      { time: "14:02:45", msg: "Inviate 100/200 email", type: "progress" },
      { time: "14:03:01", msg: "Inviate 134/200 email", type: "progress" },
    ],
  },
  {
    id: 2,
    name: "Aggiornamento scoring lead",
    description: "Ricalcolo score per 12.400 lead in base a nuovi criteri",
    status: "completed",
    progress: 100,
    sent: 12400,
    total: 12400,
    errors: 0,
    agent: "Analista",
    startedAt: "13:45",
    logs: [],
  },
  {
    id: 3,
    name: "Export dati per compliance GDPR",
    description: "Generazione report dati personali per 3 richieste pendenti",
    status: "completed",
    progress: 100,
    sent: 3,
    total: 3,
    errors: 0,
    agent: "Compliance",
    startedAt: "12:30",
    logs: [],
  },
  {
    id: 4,
    name: "Sync inventario SAP → DB locale",
    description: "Sincronizzazione incrementale catalogo prodotti",
    status: "paused",
    progress: 45,
    sent: 1125,
    total: 2500,
    errors: 12,
    agent: "Connector",
    startedAt: "11:00",
    logs: [],
  },
];

const Automations = () => {
  return (
    <div className="min-h-screen pb-24 px-6 pt-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-medium tracking-tight">Automazioni & Esecuzioni</h1>
        </div>
        <p className="text-sm text-muted-foreground ml-11 mb-8">
          1 in corso · 2 completate · 1 in pausa
        </p>
      </motion.div>

      <div className="space-y-4">
        {automations.map((auto, i) => (
          <motion.div
            key={auto.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="glass-panel overflow-hidden"
          >
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      auto.status === "running"
                        ? "bg-primary/15"
                        : auto.status === "completed"
                        ? "bg-success/15"
                        : "bg-warning/15"
                    }`}
                  >
                    {auto.status === "running" ? (
                      <Loader2 className="w-4 h-4 text-primary animate-spin" />
                    ) : auto.status === "completed" ? (
                      <CheckCircle2 className="w-4 h-4 text-success" />
                    ) : (
                      <Pause className="w-4 h-4 text-warning" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">{auto.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{auto.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-muted-foreground">
                    Agente {auto.agent} · Avviato {auto.startedAt}
                  </span>
                  {auto.status === "running" && (
                    <button className="w-7 h-7 rounded-md bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                      <Pause className="w-3 h-3" />
                    </button>
                  )}
                  {auto.status === "paused" && (
                    <button className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors">
                      <Play className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Progress */}
              <div className="flex items-center gap-3 mb-2">
                <div className="flex-1 h-1 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${auto.progress}%` }}
                    transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
                    className={`h-full rounded-full ${
                      auto.status === "completed"
                        ? "bg-success"
                        : auto.status === "paused"
                        ? "bg-warning"
                        : "bg-primary"
                    }`}
                  />
                </div>
                <span className="text-xs font-mono text-muted-foreground w-12 text-right">{auto.progress}%</span>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>{auto.sent}/{auto.total} elaborati</span>
                {auto.errors > 0 && (
                  <span className="text-destructive flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {auto.errors} errori
                  </span>
                )}
              </div>
            </div>

            {/* Execution log (expanded for running) */}
            {auto.logs.length > 0 && (
              <div className="border-t border-border bg-background/50 p-4">
                <div className="text-[10px] font-mono text-muted-foreground mb-2">LOG ESECUZIONE</div>
                <div className="space-y-1 font-mono">
                  {auto.logs.map((log, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + j * 0.05 }}
                      className="flex items-start gap-2 text-[11px]"
                    >
                      <span className="text-muted-foreground w-16 flex-shrink-0">[{log.time}]</span>
                      <span
                        className={
                          log.type === "error"
                            ? "text-destructive"
                            : log.type === "progress"
                            ? "text-primary"
                            : "text-secondary-foreground"
                        }
                      >
                        {log.msg}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Automations;
