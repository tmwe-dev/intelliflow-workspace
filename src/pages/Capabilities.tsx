import { motion } from "framer-motion";
import { Database, Users, Mail, Search, Mic, Brain, Shield, Zap, FileText, Layers, GitBranch, Radio, GitMerge, Globe } from "lucide-react";
import AiEntity from "@/components/ai/AiEntity";

const ease = [0.2, 0.8, 0.2, 1] as const;

const capabilities = [
  { icon: GitMerge, label: "Source Unification", desc: "Acquisizione, deduplicazione e fusione dati da WCA, import, business card, report, API", color: "38 90% 50%" },
  { icon: Users, label: "Partner Intelligence", desc: "234 partner dal network WCA, scoring, insight strategici, network mapping", color: "210 100% 66%" },
  { icon: Database, label: "Contact Memory", desc: "12.847 contatti unificati da fonti multiple, profili arricchiti cross-source", color: "270 60% 62%" },
  { icon: Mail, label: "Campaign Engine", desc: "Campagne multi-wave su target multi-source, personalizzazione AI, invio progressivo", color: "152 60% 45%" },
  { icon: FileText, label: "Email Drafting", desc: "Bozze intelligenti con contesto da tutte le sorgenti, tone matching, template dinamici", color: "38 90% 50%" },
  { icon: Search, label: "Deep Search", desc: "Ricerca semantica cross-source su contatti, partner, documenti, attività, report", color: "210 100% 66%" },
  { icon: Mic, label: "Voice Presence", desc: "Assistente vocale AI, dettatura, lettura output, ElevenLabs integration", color: "270 60% 62%" },
  { icon: Brain, label: "Agent Coordination", desc: "7 agenti specializzati, orchestrazione parallela, task routing intelligente", color: "152 60% 45%" },
  { icon: Zap, label: "Execution Flow", desc: "Job operativi multi-step, approvazione, audit, esecuzione su dati unificati", color: "38 90% 50%" },
  { icon: Shield, label: "Audit Trail", desc: "Log completo con provenance delle sorgenti, governance, tracciabilità", color: "210 100% 66%" },
  { icon: Layers, label: "Template Memory", desc: "Viste, report, flussi, campagne salvate e riutilizzabili cross-scenario", color: "270 60% 62%" },
  { icon: Globe, label: "API & Connectors", desc: "Connettori espandibili per database, CRM, ERP, file repository, servizi esterni", color: "152 60% 45%" },
  { icon: GitBranch, label: "Automation Logic", desc: "Pipeline operative, trigger cross-source, condizioni, esecuzione schedulata", color: "38 90% 50%" },
  { icon: Radio, label: "Live Workspace", desc: "Business card, documenti, reminder, attività — tutto collegato alle sorgenti", color: "210 100% 66%" },
];

const systemStats = [
  { label: "Fonti attive", value: "14" },
  { label: "Contatti unificati", value: "12.847" },
  { label: "Partner WCA", value: "234" },
  { label: "Business card", value: "1.420" },
  { label: "Campagne", value: "89" },
  { label: "Agenti operativi", value: "7" },
];

const Capabilities = () => {
  return (
    <div className="min-h-screen pb-24 px-6 relative">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-primary/[0.015] blur-[160px]" />
      </div>

      <div className="max-w-3xl mx-auto pt-20 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease }} className="text-center mb-20">
          <div className="flex justify-center mb-8"><AiEntity size="md" /></div>
          <h1 className="text-3xl md:text-4xl font-extralight tracking-tight mb-4">Poteri operativi</h1>
          <p className="text-[14px] text-muted-foreground/40 font-light max-w-md mx-auto leading-relaxed">
            Ogni capacità è un modulo reale alimentato da fonti multiple.
            Invisibile finché non serve. Potente quando si attiva.
          </p>
        </motion.div>

        {/* System pulse */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-20">
          {systemStats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 + i * 0.08 }} className="text-center">
              <div className="text-lg font-extralight text-foreground/60 font-mono">{stat.value}</div>
              <div className="text-[9px] text-muted-foreground/20 tracking-wider uppercase">{stat.label}</div>
            </motion.div>
          ))}
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
              style={{ background: "hsl(240 5% 6% / 0.4)", border: "1px solid hsl(0 0% 100% / 0.02)" }}
              whileHover={{ borderColor: `hsl(${cap.color} / 0.08)`, boxShadow: `0 0 40px hsl(${cap.color} / 0.03)` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-700" style={{ background: `hsl(${cap.color} / 0.06)` }}>
                  <cap.icon className="w-4 h-4 transition-colors duration-500" style={{ color: `hsl(${cap.color} / 0.4)` }} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[13px] font-light text-foreground/70 mb-1">{cap.label}</div>
                  <div className="text-[11px] text-muted-foreground/25 leading-relaxed font-light">{cap.desc}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Data sources hint */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-16 text-center">
          <div className="text-[9px] text-muted-foreground/15 tracking-[0.3em] uppercase mb-4">SORGENTI COLLEGATE</div>
          <div className="flex flex-wrap justify-center gap-4">
            {["WCA Network", "Contatti Import", "Business Card", "Company Reports", "CRM Core", "Deep Search", "Voice AI", "API Esterne"].map((src, i) => (
              <motion.span
                key={src}
                className="text-[10px] text-muted-foreground/20 font-light"
                animate={{ opacity: [0.12, 0.28, 0.12] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
              >
                {src}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="mt-12 text-center">
          <div className="flex flex-wrap justify-center gap-6">
            {["Source Unification", "AI Orchestration", "Voice Layer", "Execution Engine", "Governance"].map((layer, i) => (
              <motion.span key={layer} className="text-[10px] text-muted-foreground/15 font-light" animate={{ opacity: [0.1, 0.22, 0.1] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.6 }}>
                {layer}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Capabilities;
