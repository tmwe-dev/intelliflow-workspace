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
  Mail,
  Search,
  Filter,
} from "lucide-react";

const auditEntries = [
  { id: 1, time: "14:03:01", action: "Email inviata", detail: "Campagna re-engagement → Acme Corp", agent: "Mailer", user: "Sistema", type: "execution", status: "success" },
  { id: 2, time: "14:02:45", action: "Query eseguita", detail: "SELECT * FROM clients WHERE last_order < 90d", agent: "Analista", user: "Marco R.", type: "query", status: "success" },
  { id: 3, time: "14:02:28", action: "Errore invio", detail: "Email non valida: record #87 (j.smith@invalid)", agent: "Mailer", user: "Sistema", type: "error", status: "error" },
  { id: 4, time: "14:01:06", action: "Scoring calcolato", detail: "Churn risk score aggiornato per 34 clienti", agent: "Analista", user: "Marco R.", type: "computation", status: "success" },
  { id: 5, time: "14:01:04", action: "Database connesso", detail: "Cross-reference ordini MySQL completato", agent: "Analista", user: "Sistema", type: "connection", status: "success" },
  { id: 6, time: "13:58:22", action: "Template salvato", detail: "'Analisi Clienti Inattivi' v2.1", agent: "—", user: "Marco R.", type: "template", status: "success" },
  { id: 7, time: "13:45:00", action: "Automazione completata", detail: "Aggiornamento scoring 12.400 lead", agent: "Analista", user: "Sistema", type: "execution", status: "success" },
  { id: 8, time: "13:30:15", action: "Accesso utente", detail: "Login da Milano, IT (Chrome/macOS)", agent: "—", user: "Marco R.", type: "auth", status: "success" },
  { id: 9, time: "12:30:00", action: "Export GDPR avviato", detail: "3 richieste dati personali in elaborazione", agent: "Compliance", user: "Laura B.", type: "execution", status: "success" },
  { id: 10, time: "11:45:33", action: "Permesso negato", detail: "Tentativo accesso tabella 'payroll' senza autorizzazione", agent: "—", user: "Guest_01", type: "security", status: "warning" },
];

const getIcon = (type: string) => {
  switch (type) {
    case "execution": return Zap;
    case "query": return Database;
    case "error": return AlertTriangle;
    case "connection": return Database;
    case "template": return Eye;
    case "auth": return User;
    case "computation": return Bot;
    case "security": return Shield;
    default: return Bot;
  }
};

const AuditLog = () => {
  return (
    <div className="min-h-screen pb-24 px-6 pt-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                <Shield className="w-4 h-4 text-primary" strokeWidth={1.5} />
              </div>
              <h1 className="text-2xl font-medium tracking-tight">Audit Log</h1>
            </div>
            <p className="text-sm text-muted-foreground ml-11">
              Tracciabilità completa di ogni azione AI e utente
            </p>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="flex items-center gap-1 glass-panel-subtle px-3 py-1.5 flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cerca nel log..."
            className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground"
          />
        </div>
        <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md bg-secondary text-muted-foreground hover:text-foreground transition-colors">
          <Filter className="w-3 h-3" /> Filtra
        </button>
      </motion.div>

      {/* Log entries */}
      <div className="glass-panel overflow-hidden">
        <div className="px-4 py-3 border-b border-border">
          <span className="text-[10px] font-mono text-muted-foreground">OGGI · 18 MARZO 2026</span>
        </div>
        <div className="divide-y divide-border/50">
          {auditEntries.map((entry, i) => {
            const Icon = getIcon(entry.type);
            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center gap-4 px-4 py-3 hover:bg-secondary/10 transition-colors"
              >
                <span className="text-[11px] font-mono text-muted-foreground w-16 flex-shrink-0">
                  {entry.time}
                </span>
                <div
                  className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 ${
                    entry.status === "error"
                      ? "bg-destructive/10"
                      : entry.status === "warning"
                      ? "bg-warning/10"
                      : "bg-secondary"
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      entry.status === "error"
                        ? "text-destructive"
                        : entry.status === "warning"
                        ? "text-warning"
                        : "text-muted-foreground"
                    }`}
                    strokeWidth={1.5}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{entry.action}</span>
                    {entry.status === "success" && <CheckCircle2 className="w-3 h-3 text-success" />}
                    {entry.status === "error" && <AlertTriangle className="w-3 h-3 text-destructive" />}
                    {entry.status === "warning" && <AlertTriangle className="w-3 h-3 text-warning" />}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{entry.detail}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-[11px] text-muted-foreground">{entry.user}</div>
                  {entry.agent !== "—" && (
                    <div className="text-[10px] text-primary font-mono">Ag. {entry.agent}</div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AuditLog;
