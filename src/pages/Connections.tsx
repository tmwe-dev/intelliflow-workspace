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
} from "lucide-react";

const connections = [
  { name: "PostgreSQL — CRM Principale", type: "Database", icon: Database, status: "connected", lastSync: "2m fa", records: "124.5k" },
  { name: "MySQL — Ordini e Fatturazione", type: "Database", icon: Database, status: "connected", lastSync: "5m fa", records: "89.2k" },
  { name: "Salesforce — Pipeline Commerciale", type: "CRM", icon: Cloud, status: "connected", lastSync: "12m fa", records: "45.3k" },
  { name: "SAP Business One", type: "ERP", icon: ShoppingCart, status: "connected", lastSync: "1h fa", records: "234k" },
  { name: "Google Workspace — Email & Drive", type: "Produttività", icon: Mail, status: "connected", lastSync: "3m fa", records: "12.8k" },
  { name: "Slack — Team Engineering", type: "Comunicazione", icon: MessageSquare, status: "connected", lastSync: "1m fa", records: "—" },
  { name: "Stripe — Pagamenti", type: "Finanza", icon: FileText, status: "warning", lastSync: "3h fa", records: "67.1k" },
  { name: "HubSpot — Marketing Automation", type: "Marketing", icon: Cloud, status: "disconnected", lastSync: "—", records: "—" },
];

const capabilities = [
  { label: "Read", color: "text-success" },
  { label: "Write", color: "text-primary" },
  { label: "Search", color: "text-info" },
  { label: "Export", color: "text-warning" },
];

const Connections = () => {
  return (
    <div className="min-h-screen pb-24 px-6 pt-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                <Plug className="w-4 h-4 text-primary" strokeWidth={1.5} />
              </div>
              <h1 className="text-2xl font-medium tracking-tight">Connessioni</h1>
            </div>
            <p className="text-sm text-muted-foreground ml-11">
              8 sorgenti configurate · 6 attive · 556k record sincronizzati
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
            <Plus className="w-4 h-4" /> Aggiungi sorgente
          </button>
        </div>
      </motion.div>

      {/* Connection graph visualization */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel p-6 mb-8"
      >
        <div className="text-[10px] font-mono text-muted-foreground mb-4">RETE NEURALE CONNESSIONI</div>
        <div className="flex items-center justify-center py-8">
          <div className="relative">
            {/* Central node */}
            <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center glow-primary">
              <Plug className="w-6 h-6 text-primary" strokeWidth={1.5} />
            </div>
            {/* Satellite nodes */}
            {connections.slice(0, 6).map((conn, i) => {
              const angle = (i * 360) / 6;
              const radius = 120;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;
              return (
                <motion.div
                  key={conn.name}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="absolute top-1/2 left-1/2"
                  style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
                >
                  {/* Connection line */}
                  <svg
                    className="absolute top-1/2 left-1/2 pointer-events-none"
                    style={{
                      width: `${Math.abs(x) + 20}px`,
                      height: `${Math.abs(y) + 20}px`,
                      transform: `translate(${x > 0 ? "-100%" : "0"}, ${y > 0 ? "-100%" : "0"})`,
                    }}
                  />
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      conn.status === "connected"
                        ? "bg-secondary border border-border"
                        : "bg-secondary/50 border border-destructive/20"
                    }`}
                  >
                    <conn.icon className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Connections list */}
      <div className="space-y-3">
        {connections.map((conn, i) => (
          <motion.div
            key={conn.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.04 }}
            className="glass-panel-subtle p-4 flex items-center gap-4 hover:bg-secondary/20 transition-all cursor-pointer group"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                conn.status === "connected"
                  ? "bg-primary/10"
                  : conn.status === "warning"
                  ? "bg-warning/10"
                  : "bg-secondary"
              }`}
            >
              <conn.icon
                className={`w-4 h-4 ${
                  conn.status === "connected"
                    ? "text-primary"
                    : conn.status === "warning"
                    ? "text-warning"
                    : "text-muted-foreground"
                }`}
                strokeWidth={1.5}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium truncate">{conn.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{conn.type}</span>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1">
                  {conn.status === "connected" ? (
                    <CheckCircle2 className="w-3 h-3 text-success" />
                  ) : conn.status === "warning" ? (
                    <AlertCircle className="w-3 h-3 text-warning" />
                  ) : (
                    <AlertCircle className="w-3 h-3 text-muted-foreground" />
                  )}
                  <span className="text-[11px] text-muted-foreground">
                    {conn.status === "connected" ? "Sincronizzato" : conn.status === "warning" ? "Attenzione" : "Disconnesso"} {conn.lastSync !== "—" && `· ${conn.lastSync}`}
                  </span>
                </div>
                {conn.records !== "—" && (
                  <span className="text-[11px] text-muted-foreground">{conn.records} record</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {conn.status === "connected" && (
                <div className="flex gap-1">
                  {capabilities.slice(0, Math.floor(Math.random() * 2) + 2).map((cap) => (
                    <span key={cap.label} className={`text-[9px] px-1.5 py-0.5 rounded bg-secondary ${cap.color}`}>
                      {cap.label}
                    </span>
                  ))}
                </div>
              )}
              <button className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all opacity-0 group-hover:opacity-100">
                <RefreshCw className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
              <button className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all opacity-0 group-hover:opacity-100">
                <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
