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

const sourceGroups = [
  {
    title: "Origini dati primarie",
    sources: [
      { name: "WCA Partner Network", records: "234 partner", status: "live", capabilities: ["import", "search", "enrich", "analyze"] },
      { name: "Contatti Importati", records: "12.847 contatti", status: "live", capabilities: ["import", "parse", "merge", "search"] },
      { name: "Business Card Archive", records: "1.420 schede", status: "live", capabilities: ["parse", "enrich", "merge", "create draft"] },
      { name: "Company Reports", records: "89 report", status: "live", capabilities: ["analyze", "search", "report", "remember"] },
    ],
  },
  {
    title: "Database interni",
    sources: [
      { name: "CRM Core Database", records: "124.5k record", status: "live", capabilities: ["search", "enrich", "execute", "report"] },
      { name: "Activity & Timeline DB", records: "45.2k eventi", status: "live", capabilities: ["search", "analyze", "remember"] },
      { name: "Campaign History", records: "89 campagne", status: "live", capabilities: ["analyze", "report", "search"] },
    ],
  },
  {
    title: "API & connettori esterni",
    sources: [
      { name: "ElevenLabs Voice AI", records: "Voice layer", status: "live", capabilities: ["execute", "send"] },
      { name: "Email Service", records: "14.2k invii", status: "live", capabilities: ["send", "execute", "report"] },
      { name: "Deep Search API", records: "Cross-source", status: "live", capabilities: ["search", "enrich", "analyze"] },
      { name: "Future Connectors", records: "Espandibile", status: "ready", capabilities: ["import", "search", "enrich"] },
    ],
  },
];

const capabilityColors: Record<string, string> = {
  import: "210 100% 66%",
  parse: "270 60% 62%",
  search: "152 60% 45%",
  enrich: "38 90% 50%",
  merge: "210 100% 66%",
  analyze: "270 60% 62%",
  report: "152 60% 45%",
  remember: "38 90% 50%",
  execute: "210 100% 66%",
  send: "270 60% 62%",
  "create draft": "152 60% 45%",
};

const Connections = () => {
  return (
    <div className="min-h-screen pb-24 flex flex-col items-center px-6 pt-16">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/[0.02] blur-[120px]" />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="text-center mb-16 relative z-10">
        <Plug className="w-5 h-5 text-primary/70 mx-auto mb-4" strokeWidth={1.5} />
        <h1 className="text-2xl font-light tracking-tight mb-2">Sorgenti & Connessioni</h1>
        <p className="text-sm text-muted-foreground/60 font-light">Multi-source intelligence · 14 origini attive · 1.8M record unificati</p>
      </motion.div>

      {/* Source groups */}
      <div className="w-full max-w-2xl space-y-10 relative z-10 mb-16">
        {sourceGroups.map((group, gi) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + gi * 0.15, ease }}
          >
            <div className="text-[9px] text-muted-foreground/65 tracking-[0.3em] uppercase mb-3 px-1">{group.title}</div>
            <div className="space-y-1.5">
              {group.sources.map((src, si) => (
                <motion.div
                  key={src.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + gi * 0.15 + si * 0.05, ease }}
                  className="float-panel-interactive px-5 py-4 flex items-center gap-4 group"
                >
                  <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${src.status === "live" ? "bg-success/60" : "bg-muted-foreground/30"}`} />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-foreground/90">{src.name}</span>
                    <span className="text-xs text-muted-foreground/65 ml-2">{src.records}</span>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {src.capabilities.slice(0, 3).map((cap) => (
                      <span
                        key={cap}
                        className="text-[8px] px-1.5 py-0.5 rounded-md font-mono"
                        style={{
                          color: `hsl(${capabilityColors[cap] || "210 100% 66%"} / 0.75)`,
                          background: `hsl(${capabilityColors[cap] || "210 100% 66%"} / 0.08)`,
                        }}
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Unification note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-center max-w-md relative z-10 mb-16"
      >
        <div className="text-[9px] text-muted-foreground/60 tracking-[0.3em] uppercase mb-3">SOURCE UNIFICATION</div>
        <p className="text-[12px] text-muted-foreground/70 font-light leading-relaxed">
          Ogni sorgente viene acquisita, pulita, deduplicata, arricchita e normalizzata
          dal Source Unification Layer prima di diventare operativa per gli agenti AI.
        </p>
      </motion.div>

      {/* Legacy connectors */}
      <div className="w-full max-w-2xl relative z-10">
        <div className="text-[9px] text-muted-foreground/60 tracking-[0.3em] uppercase mb-3 px-1">CONNETTORI INFRASTRUTTURA</div>
        <div className="space-y-1.5">
          {connections.map((conn, i) => (
            <motion.div
              key={conn.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + i * 0.04, ease }}
              className="float-panel-interactive px-5 py-3.5 flex items-center gap-4 group"
            >
              <conn.icon className={`w-3.5 h-3.5 flex-shrink-0 ${conn.status === "connected" ? "text-primary/60" : "text-warning/70"}`} strokeWidth={1.5} />
              <div className="flex-1 min-w-0">
                <span className="text-[13px] font-light text-foreground/90">{conn.name}</span>
                <span className="text-[10px] text-muted-foreground/60 ml-2">{conn.desc}</span>
              </div>
              <div className="flex items-center gap-3">
                {conn.records && <span className="text-[9px] text-muted-foreground/60 font-mono">{conn.records}</span>}
                <div className={`w-1.5 h-1.5 rounded-full ${conn.status === "connected" ? "bg-success/60" : "bg-warning/50"}`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Connections;