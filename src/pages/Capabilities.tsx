import { motion } from "framer-motion";
import { Database, Users, Mail, Search, Mic, Brain, Shield, Zap, FileText, Layers, GitBranch, Radio, GitMerge, Globe, Box, CheckCircle2 } from "lucide-react";
import AiEntity from "@/components/ai/AiEntity";

const ease = [0.2, 0.8, 0.2, 1] as const;

const capabilities = [
  { icon: GitMerge, label: "Source Unification", desc: "Acquisizione, deduplicazione e fusione dati da WCA, import, business card, report, API", color: "38 90% 50%", module: "source-connector" },
  { icon: Users, label: "Partner Intelligence", desc: "234 partner dal network WCA — modulo partner management già operativo e in produzione", color: "210 100% 66%", module: "partner-mgmt" },
  { icon: Database, label: "Contact Memory", desc: "12.847 contatti unificati — pipeline di import, dedup e enrichment già consolidate", color: "270 60% 62%", module: "contact-db" },
  { icon: Mail, label: "Campaign Engine", desc: "Campagne multi-wave su target multi-source — motore campagne già testato e in uso", color: "152 60% 45%", module: "campaign-ops" },
  { icon: FileText, label: "Email Drafting", desc: "Bozze intelligenti con contesto cross-source — integra il motore template già disponibile", color: "38 90% 50%", module: "email-draft" },
  { icon: Search, label: "Deep Search", desc: "Ricerca semantica cross-source — connettori API e query engine già operativi", color: "210 100% 66%", module: "deep-search" },
  { icon: Mic, label: "Voice Presence", desc: "Assistente vocale AI — modulo voice interaction già integrato con ElevenLabs", color: "270 60% 62%", module: "voice" },
  { icon: Brain, label: "Agent Coordination", desc: "7 agenti specializzati che orchestrano i moduli esistenti in modo intelligente", color: "152 60% 45%", module: "ai-orchestration" },
  { icon: Zap, label: "Execution Flow", desc: "Job operativi multi-step — usa il job runner e le code di esecuzione già presenti", color: "38 90% 50%", module: "execution" },
  { icon: Shield, label: "Audit Trail", desc: "48.2k eventi registrati — modulo audit già maturo con compliance attiva", color: "210 100% 66%", module: "audit" },
  { icon: Layers, label: "Template Memory", desc: "Flussi, report, campagne salvate — sistema preset e memoria già operativo", color: "270 60% 62%", module: "memory" },
  { icon: Globe, label: "API & Connectors", desc: "Connettori espandibili — architettura modulare pronta per nuove integrazioni", color: "152 60% 45%", module: "connectors" },
  { icon: GitBranch, label: "Automation Logic", desc: "Pipeline operative — trigger, condizioni e scheduling già disponibili nel sistema", color: "38 90% 50%", module: "automation" },
  { icon: Radio, label: "Live Workspace", desc: "Documenti, reminder, attività — gestione workspace già consolidata e in uso", color: "210 100% 66%", module: "workspace" },
];

const systemStats = [
  { label: "Fonti attive", value: "14" },
  { label: "Contatti unificati", value: "12.847" },
  { label: "Partner WCA", value: "234" },
  { label: "Business card", value: "1.420" },
  { label: "Campagne", value: "89" },
  { label: "Agenti operativi", value: "7" },
];

const moduleGroups = [
  {
    title: "Moduli dati",
    items: ["partner-intelligence", "contact-ingestion", "business-card-parsing", "deep-search"],
  },
  {
    title: "Moduli operativi",
    items: ["campaign-operations", "email-drafting", "email-sending", "workspace-documents"],
  },
  {
    title: "Moduli intelligenza",
    items: ["ai-planning", "conversation-memory", "template-memory", "voice-interaction"],
  },
  {
    title: "Moduli governance",
    items: ["audit-logging", "execution-jobs", "source-connectors", "crm-core"],
  },
];

const Capabilities = () => {
  return (
    <div className="min-h-screen pb-24 px-6 relative">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-primary/[0.02] blur-[160px]" />
      </div>

      <div className="max-w-3xl mx-auto pt-20 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease }} className="text-center mb-20">
          <div className="flex justify-center mb-8"><AiEntity size="md" /></div>
          <h1 className="text-3xl md:text-4xl font-extralight tracking-tight mb-4">Poteri operativi</h1>
          <p className="text-[14px] text-muted-foreground/60 font-light max-w-md mx-auto leading-relaxed">
            Ogni capacità è un modulo reale già operativo.
            L'AI non le inventa — le unifica e le amplifica.
          </p>
        </motion.div>

        {/* System pulse */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-16">
          {systemStats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 + i * 0.08 }} className="text-center">
              <div className="text-lg font-extralight text-foreground/90 font-mono">{stat.value}</div>
              <div className="text-[9px] text-muted-foreground/60 tracking-wider uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Module composition signal */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, ease }}
          className="mb-16 rounded-2xl p-5"
          style={{ background: "hsl(240 5% 6% / 0.65)", border: "1px solid hsl(0 0% 100% / 0.06)" }}
        >
          <div className="flex items-center gap-2.5 mb-4">
            <Box className="w-3.5 h-3.5 text-muted-foreground/60" strokeWidth={1.5} />
            <span className="text-[10px] text-muted-foreground/70 tracking-[0.15em] uppercase font-mono">Composizione modulare</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {moduleGroups.map((group, gi) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + gi * 0.1 }}
              >
                <div className="text-[9px] text-muted-foreground/65 font-light mb-2">{group.title}</div>
                <div className="space-y-1">
                  {group.items.map((item) => (
                    <div key={item} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-2 h-2 text-success/80 flex-shrink-0" />
                      <span className="text-[8px] text-muted-foreground/65 font-mono">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Capabilities grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.06, duration: 0.5, ease }}
              className="group cursor-default rounded-2xl p-5 transition-all duration-700"
              style={{ background: "hsl(240 5% 6% / 0.7)", border: "1px solid hsl(0 0% 100% / 0.06)" }}
              whileHover={{ borderColor: `hsl(${cap.color} / 0.12)`, boxShadow: `0 0 40px hsl(${cap.color} / 0.05)` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-700" style={{ background: `hsl(${cap.color} / 0.08)` }}>
                  <cap.icon className="w-4 h-4 transition-colors duration-500" style={{ color: `hsl(${cap.color} / 0.75)` }} strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-light text-foreground/90 mb-1">{cap.label}</div>
                  <div className="text-[11px] text-muted-foreground/70 leading-relaxed font-light">{cap.desc}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Data sources hint */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-16 text-center">
          <div className="text-[9px] text-muted-foreground/60 tracking-[0.3em] uppercase mb-4">SORGENTI COLLEGATE</div>
          <div className="flex flex-wrap justify-center gap-4">
            {["WCA Network", "Contatti Import", "Business Card", "Company Reports", "CRM Core", "Deep Search", "Voice AI", "API Esterne"].map((src, i) => (
              <motion.span
                key={src}
                className="text-[10px] text-muted-foreground/60 font-light"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
              >
                {src}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="mt-12 text-center">
          <p className="text-[11px] text-muted-foreground/65 font-light max-w-sm mx-auto">
            Moduli già operativi. L'interfaccia conversazionale li rende più potenti, non li sostituisce.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Capabilities;