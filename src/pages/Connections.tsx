import { motion } from "framer-motion";
import { Database, Cloud, Mail, MessageSquare, Server, Globe, HardDrive, Phone, FolderOpen, Plug } from "lucide-react";

const ease = [0.2, 0.8, 0.2, 1] as const;

const connections = [
  { name: "PostgreSQL", desc: "CRM Core Database", icon: Database, status: "connected", records: "124.5k" },
  { name: "MySQL", desc: "Ordini & Fatturazione", icon: Database, status: "connected", records: "89.2k" },
  { name: "Salesforce", desc: "Sales Cloud", icon: Cloud, status: "connected", records: "45.3k" },
  { name: "SAP", desc: "ERP Business One", icon: Server, status: "connected", records: "234k" },
  { name: "Google Workspace", desc: "Email & Drive", icon: Mail, status: "connected", records: "12.8k" },
  { name: "Slack", desc: "Notifiche team", icon: MessageSquare, status: "connected", records: "" },
  { name: "MongoDB", desc: "Analytics & Events", icon: HardDrive, status: "connected", records: "1.2M" },
  { name: "Stripe", desc: "Pagamenti", icon: Globe, status: "warning", records: "67.1k" },
  { name: "ElevenLabs", desc: "Voice AI", icon: Phone, status: "connected", records: "" },
  { name: "AWS S3", desc: "File Repository", icon: FolderOpen, status: "connected", records: "34k" },
  { name: "REST API", desc: "Custom Endpoints", icon: Globe, status: "connected", records: "" },
];

const Connections = () => {
  return (
    <div className="min-h-screen pb-24 flex flex-col items-center px-6 pt-16">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/[0.02] blur-[120px]" />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="text-center mb-16 relative z-10">
        <Plug className="w-5 h-5 text-primary/30 mx-auto mb-4" strokeWidth={1.5} />
        <h1 className="text-2xl font-light tracking-tight mb-2">Connessioni</h1>
        <p className="text-sm text-muted-foreground/50 font-light">11 sorgenti attive · 1.8M record</p>
      </motion.div>

      <div className="w-full max-w-2xl space-y-1.5 relative z-10">
        {connections.map((conn, i) => (
          <motion.div
            key={conn.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.04, ease }}
            className="float-panel-interactive px-5 py-4 flex items-center gap-4 group"
          >
            <conn.icon className={`w-4 h-4 flex-shrink-0 ${conn.status === "connected" ? "text-primary/30" : "text-warning/30"}`} strokeWidth={1.5} />
            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium">{conn.name}</span>
              <span className="text-xs text-muted-foreground/30 ml-2">{conn.desc}</span>
            </div>
            <div className="flex items-center gap-3">
              {conn.records && <span className="text-[10px] text-muted-foreground/30 font-mono">{conn.records}</span>}
              <div className={`w-1.5 h-1.5 rounded-full ${conn.status === "connected" ? "bg-success/40" : "bg-warning/40"}`} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
