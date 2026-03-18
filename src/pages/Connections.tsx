import { motion } from "framer-motion";
import {
  Database,
  Cloud,
  Mail,
  MessageSquare,
  FileText,
  ShoppingCart,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Plus,
  ExternalLink,
  Plug,
  Globe,
  Server,
  HardDrive,
  Webhook,
} from "lucide-react";

const ease = [0.2, 0.8, 0.2, 1] as const;

const connections = [
  { name: "PostgreSQL — CRM Principale", type: "Database SQL", icon: Database, status: "connected", lastSync: "2m fa", records: "124.5k", caps: ["Read", "Write", "Search"] },
  { name: "MySQL — Ordini & Fatturazione", type: "Database SQL", icon: Database, status: "connected", lastSync: "5m fa", records: "89.2k", caps: ["Read", "Write", "Search", "Export"] },
  { name: "Salesforce — Sales Cloud", type: "CRM", icon: Cloud, status: "connected", lastSync: "12m fa", records: "45.3k", caps: ["Read", "Write", "Search", "Create"] },
  { name: "SAP Business One — ERP", type: "ERP", icon: Server, status: "connected", lastSync: "1h fa", records: "234k", caps: ["Read", "Search", "Export"] },
  { name: "Google Workspace — Gmail & Drive", type: "Produttività", icon: Mail, status: "connected", lastSync: "3m fa", records: "12.8k", caps: ["Read", "Send", "Search"] },
  { name: "Slack — Notifiche Team", type: "Messaggistica", icon: MessageSquare, status: "connected", lastSync: "1m fa", records: "—", caps: ["Send", "Read"] },
  { name: "MongoDB — Analytics Events", type: "Database NoSQL", icon: HardDrive, status: "connected", lastSync: "30s fa", records: "1.2M", caps: ["Read", "Search"] },
  { name: "Stripe — Pagamenti & Billing", type: "Finanza", icon: FileText, status: "warning", lastSync: "3h fa", records: "67.1k", caps: ["Read", "Search", "Export"] },
  { name: "HubSpot — Marketing Hub", type: "Marketing", icon: Cloud, status: "disconnected", lastSync: "—", records: "—", caps: [] },
  { name: "Webhook — CRM Events", type: "Webhook", icon: Webhook, status: "connected", lastSync: "real-time", records: "—", caps: ["Read"] },
];

const capColors: Record<string, string> = {
  Read: "text-success",
  Write: "text-primary",
  Search: "text-info",
  Export: "text-warning",
  Create: "text-accent",
  Send: "text-primary",
};

const Connections = () => {
  return (
    <div className="min-h-screen pb-24 px-6 lg:px-10 pt-8 max-w-[1400px] mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center glow-primary">
                <Plug className="w-4 h-4 text-primary" strokeWidth={1.5} />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">Connessioni</h1>
            </div>
            <p className="text-sm text-muted-foreground ml-12">
              Il layer universale che collega Adaptive AI ai tuoi sistemi
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors glow-primary">
            <Plus className="w-4 h-4" /> Aggiungi sorgente
          </button>
        </div>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-4 gap-3 mb-8"
      >
        {[
          { label: "Connessioni attive", value: "8", icon: CheckCircle2, color: "text-success" },
          { label: "Record totali", value: "1.8M", icon: Database, color: "text-primary" },
          { label: "Capability mappate", value: "24", icon: Globe, color: "text-info" },
          { label: "Ultima sincronizzazione", value: "30s fa", icon: RefreshCw, color: "text-muted-foreground" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.04, ease }}
            className="glass-panel p-4"
          >
            <s.icon className={`w-4 h-4 ${s.color} mb-2`} strokeWidth={1.5} />
            <div className="text-2xl font-bold tracking-tight">{s.value}</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Capability legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-4 mb-6 px-1"
      >
        <span className="section-label">Capability:</span>
        {Object.entries(capColors).map(([cap, color]) => (
          <span key={cap} className={`text-[10px] font-mono ${color} flex items-center gap-1`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {cap}
          </span>
        ))}
      </motion.div>

      {/* Connections list */}
      <div className="space-y-2.5">
        {connections.map((conn, i) => (
          <motion.div
            key={conn.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.03, ease }}
            className="glass-panel-interactive p-5 flex items-center gap-5 group"
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
              conn.status === "connected" ? "bg-primary/10" : conn.status === "warning" ? "bg-warning/10" : "bg-secondary"
            }`}>
              <conn.icon className={`w-5 h-5 ${
                conn.status === "connected" ? "text-primary" : conn.status === "warning" ? "text-warning" : "text-muted-foreground"
              }`} strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2.5 mb-1">
                <span className="text-sm font-semibold truncate">{conn.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full glass-panel-subtle text-muted-foreground">{conn.type}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  {conn.status === "connected" ? (
                    <div className="status-dot-success" style={{ width: 5, height: 5 }} />
                  ) : conn.status === "warning" ? (
                    <div className="status-dot-warning" style={{ width: 5, height: 5 }} />
                  ) : (
                    <div className="status-dot-error" style={{ width: 5, height: 5 }} />
                  )}
                  <span className="text-[11px] text-muted-foreground">
                    {conn.status === "connected" ? `Sincronizzato ${conn.lastSync}` : conn.status === "warning" ? `Ultimo sync ${conn.lastSync}` : "Disconnesso"}
                  </span>
                </div>
                {conn.records !== "—" && (
                  <span className="text-[11px] text-muted-foreground font-mono">{conn.records} record</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {conn.caps.map((cap) => (
                  <span key={cap} className={`text-[9px] px-1.5 py-0.5 rounded-md glass-panel-subtle font-mono ${capColors[cap] || "text-muted-foreground"}`}>
                    {cap}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground glass-panel-subtle transition-all">
                  <RefreshCw className="w-3 h-3" strokeWidth={1.5} />
                </button>
                <button className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground glass-panel-subtle transition-all">
                  <ExternalLink className="w-3 h-3" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
