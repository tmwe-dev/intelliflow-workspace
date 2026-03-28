import { motion } from "framer-motion";
import { Plug, GitMerge, Database, Mail, Brain, Mic, Zap, Layers, Shield, Monitor, ArrowDown, ChevronRight } from "lucide-react";
import AiEntity from "@/components/ai/AiEntity";

const ease = [0.2, 0.8, 0.2, 1] as const;

/* ─── 10 ARCHITECTURE LAYERS ─── */
const layers = [
  {
    icon: Plug,
    title: "Source Connectors",
    subtitle: "Dove nascono i dati",
    color: "38 90% 50%",
    items: ["WCA Partner Network", "Contact Files (CSV, vCard)", "Business Card Archive", "Company Reports", "Internal Databases", "Third-Party APIs"],
    capabilities: ["connect", "stream", "poll", "authenticate"],
  },
  {
    icon: GitMerge,
    title: "Source Unification Layer",
    subtitle: "Una verità, molte origini",
    color: "210 100% 66%",
    items: ["Ingest & Parse", "Clean & Validate", "Link & Resolve Entities", "Deduplicate & Merge", "Enrich from External Sources", "Normalize & Index"],
    capabilities: ["ingest", "parse", "clean", "link", "deduplicate", "enrich", "normalize"],
  },
  {
    icon: Database,
    title: "CRM Core Layer",
    subtitle: "Il motore operativo invisibile",
    color: "270 60% 62%",
    items: ["Unified Contacts (12.8k)", "Partner Network (234)", "Prospect Pipeline", "Activity Engine", "Document Workspace", "Reminders & Tasks"],
    capabilities: ["store", "query", "relate", "track", "score"],
  },
  {
    icon: Mail,
    title: "Communication & Campaign Layer",
    subtitle: "Dal dato all'azione comunicativa",
    color: "152 60% 45%",
    items: ["Email Draft Engine", "Messaging Channels", "Campaign Orchestration", "Template Library", "Wave-Based Delivery", "Personalization Engine"],
    capabilities: ["draft", "personalize", "schedule", "send", "track"],
  },
  {
    icon: Brain,
    title: "AI Orchestration Layer",
    subtitle: "L'intelligenza che coordina tutto",
    color: "270 60% 62%",
    items: ["Intent Planner", "Task Router & Decomposer", "Agent Coordination (7 agents)", "Memory-Aware Decisions", "Tool Selection Engine", "Context Management"],
    capabilities: ["plan", "route", "coordinate", "decide", "select"],
  },
  {
    icon: Mic,
    title: "Voice Layer",
    subtitle: "Interazione naturale premium",
    color: "152 60% 45%",
    items: ["Microphone Input (STT)", "Speaking State Management", "Voice Output (TTS)", "Premium Assistant Voice", "Conversational Flow Control"],
    capabilities: ["listen", "transcribe", "speak", "read-aloud"],
  },
  {
    icon: Zap,
    title: "Execution & Approval Layer",
    subtitle: "Azione controllata e tracciabile",
    color: "38 90% 50%",
    items: ["Job Creation & Queuing", "Multi-Step Execution", "Progress Tracking", "Approval Checkpoints", "Error Recovery & Retry", "Role-Based Gates"],
    capabilities: ["execute", "approve", "retry", "checkpoint", "rollback"],
  },
  {
    icon: Layers,
    title: "Memory & Template Layer",
    subtitle: "Il sistema impara e ricorda",
    color: "210 100% 66%",
    items: ["Reusable Flow Templates", "Saved Workspace Patterns", "AI Conversation Memory", "User Preferences", "Pattern Recognition"],
    capabilities: ["save", "recall", "reuse", "learn", "suggest"],
  },
  {
    icon: Shield,
    title: "Governance & Audit Layer",
    subtitle: "Controllo enterprise silenzioso",
    color: "270 60% 62%",
    items: ["Role & Permission Management", "Policy Engine", "Source Provenance Tracking", "Complete Audit Trail", "Compliance Framework"],
    capabilities: ["authorize", "log", "trace", "enforce", "comply"],
  },
  {
    icon: Monitor,
    title: "Adaptive Workspace Layer",
    subtitle: "La superficie che nasconde la complessità",
    color: "210 100% 66%",
    items: ["Conversational Prompt", "AI Assistant Presence", "Dynamic Canvas Generation", "Progressive UI Materialization", "Context-Aware Views"],
    capabilities: ["prompt", "render", "materialize", "adapt", "respond"],
  },
];

/* ─── TOOL CONTRACTS ─── */
const toolContracts = [
  { name: "Search Contacts", layer: "CRM Core", direction: "read" },
  { name: "Search Partners", layer: "CRM Core", direction: "read" },
  { name: "Parse Contact File", layer: "Source Unification", direction: "ingest" },
  { name: "Parse Business Cards", layer: "Source Unification", direction: "ingest" },
  { name: "Read Company Report", layer: "CRM Core", direction: "read" },
  { name: "Run Deep Search", layer: "Source Connectors", direction: "enrich" },
  { name: "Create Email Draft", layer: "Communication", direction: "create" },
  { name: "Send Email Batch", layer: "Communication", direction: "execute" },
  { name: "Create Campaign", layer: "Communication", direction: "create" },
  { name: "Generate Executive Report", layer: "CRM Core", direction: "create" },
  { name: "Save Template", layer: "Memory", direction: "persist" },
  { name: "Read Aloud", layer: "Voice", direction: "output" },
  { name: "Audit Action", layer: "Governance", direction: "log" },
];

const directionColors: Record<string, string> = {
  read: "210 100% 66%",
  ingest: "38 90% 50%",
  enrich: "270 60% 62%",
  create: "152 60% 45%",
  execute: "38 90% 50%",
  persist: "210 100% 66%",
  output: "152 60% 45%",
  log: "270 60% 62%",
};

/* ─── MATURITY ROADMAP ─── */
const maturityLevels = [
  { name: "Present Experience Layer", desc: "Interfaccia conversazionale, canvas dinamici, voce, materializzazione progressiva", status: "live", percent: 92 },
  { name: "Operational Integration Layer", desc: "CRM Core, source connectors, contact/partner management, campaign engine, email operations", status: "live", percent: 88 },
  { name: "Execution Layer", desc: "Job execution, approval workflows, multi-step pipelines, batch operations", status: "building", percent: 72 },
  { name: "Enterprise Governance Layer", desc: "Role-based access, policy engine, audit trail, compliance framework, source provenance", status: "building", percent: 65 },
  { name: "Scalable Intelligence Layer", desc: "ML scoring, predictive analytics, autonomous agent decisions, cross-org learning", status: "planned", percent: 35 },
];

/* ─── FLOW SEQUENCE ─── */
const flowSteps = [
  "Source Connectors",
  "Source Unification",
  "CRM Core",
  "AI Orchestration",
  "Tools / Communication",
  "Approval / Execution",
  "Memory / Audit",
  "Adaptive Workspace",
];

const Architecture = () => {
  return (
    <div className="min-h-screen pb-32 px-6 relative">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-primary/[0.02] blur-[200px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/[0.015] blur-[160px]" />
      </div>

      <div className="max-w-4xl mx-auto pt-20 relative z-10">

        {/* ─── HERO ─── */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease }} className="text-center mb-24">
          <div className="flex justify-center mb-10">
            <AiEntity size="lg" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extralight tracking-tight mb-5">Product Architecture</h1>
          <p className="text-[14px] text-muted-foreground/60 font-light max-w-lg mx-auto leading-relaxed mb-8">
            Superficie radicalmente semplice. Motore profondamente strutturato.
            <br />10 layer coordinati. 13 tool contracts. Una macchina pronta a costruire.
          </p>

          {/* Surface vs Engine duality */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-8 mt-8"
          >
            <div className="text-center">
              <div className="text-[9px] text-muted-foreground/60 tracking-[0.2em] uppercase mb-2 font-mono">SUPERFICIE</div>
              <div className="text-[13px] text-foreground/90 font-light">Prompt · Assistant · Canvas</div>
              <div className="text-[9px] text-muted-foreground/60 mt-1">L'utente vede solo questo</div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-px h-6 bg-gradient-to-b from-muted-foreground/20 to-primary/30" />
              <div className="w-6 h-px bg-primary/25" />
              <div className="w-px h-6 bg-gradient-to-b from-primary/30 to-muted-foreground/20" />
            </div>
            <div className="text-center">
              <div className="text-[9px] text-muted-foreground/60 tracking-[0.2em] uppercase mb-2 font-mono">MOTORE</div>
              <div className="text-[13px] text-foreground/90 font-light">10 layer · 13 tool · 9 moduli</div>
              <div className="text-[9px] text-muted-foreground/60 mt-1">L'utente non lo vede mai</div>
            </div>
          </motion.div>
        </motion.div>

        {/* ─── FLOW VISUALIZATION ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-24"
        >
          <div className="text-[9px] text-muted-foreground/60 tracking-[0.3em] uppercase text-center mb-6 font-mono">FLUSSO ARCHITETTURALE</div>
          <div className="flex items-center justify-center gap-1 flex-wrap">
            {flowSteps.map((step, i) => (
              <motion.div key={step} className="flex items-center gap-1" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + i * 0.1, ease }}>
                <span
                  className="text-[10px] text-muted-foreground/55 px-3 py-2 rounded-xl font-mono tracking-wide"
                  style={{ background: "hsl(240 5% 7% / 0.6)", border: "1px solid hsl(0 0% 100% / 0.06)" }}
                >
                  {step}
                </span>
                {i < flowSteps.length - 1 && (
                  <ChevronRight className="w-3 h-3 text-muted-foreground/70" />
                )}
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="flex justify-center mt-4"
          >
            <div className="flex items-center gap-2">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-primary/25" />
              <span className="text-[8px] text-muted-foreground/60 font-mono">loop continuo</span>
              <div className="w-12 h-px bg-gradient-to-r from-primary/25 to-transparent" />
            </div>
          </motion.div>
        </motion.div>

        {/* ─── 10 LAYERS ─── */}
        <div className="mb-24">
          <div className="text-[9px] text-muted-foreground/60 tracking-[0.3em] uppercase text-center mb-8 font-mono">10 LAYER ARCHITETTURALI</div>
          <div className="space-y-3">
            {layers.map((layer, li) => (
              <motion.div
                key={layer.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + li * 0.06, duration: 0.5, ease }}
                className="rounded-2xl overflow-hidden group"
                style={{ background: "hsl(240 5% 6% / 0.5)", border: "1px solid hsl(0 0% 100% / 0.06)" }}
              >
                <div className="p-5 flex items-start gap-4">
                  {/* Layer number */}
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 font-mono text-[11px]"
                    style={{ background: `hsl(${layer.color} / 0.08)`, color: `hsl(${layer.color} / 0.5)` }}
                  >
                    {String(li + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <layer.icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: `hsl(${layer.color} / 0.6)` }} strokeWidth={1.5} />
                      <h3 className="text-[14px] font-light text-foreground/90">{layer.title}</h3>
                    </div>
                    <p className="text-[11px] text-muted-foreground/70 font-light mb-3">{layer.subtitle}</p>

                    {/* Items */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {layer.items.map((item) => (
                        <span key={item} className="text-[9px] px-2.5 py-1 rounded-lg font-light"
                          style={{ color: `hsl(${layer.color} / 0.55)`, background: `hsl(${layer.color} / 0.05)`, border: `1px solid hsl(${layer.color} / 0.08)` }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    {/* Capabilities */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-[7px] text-muted-foreground/55 font-mono tracking-widest">CAPABILITIES</span>
                      {layer.capabilities.map((cap) => (
                        <span key={cap} className="text-[7px] text-muted-foreground/60 font-mono">{cap}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Connection line */}
                {li < layers.length - 1 && (
                  <div className="flex justify-center -mb-1.5">
                    <div className="w-px h-3 bg-gradient-to-b from-border/[0.1] to-transparent" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── TOOL CONTRACTS ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, ease }}
          className="mb-24"
        >
          <div className="text-[9px] text-muted-foreground/60 tracking-[0.3em] uppercase text-center mb-3 font-mono">TOOL CONTRACTS</div>
          <p className="text-[12px] text-muted-foreground/70 font-light text-center mb-8 max-w-md mx-auto">
            Ogni azione dell'assistente passa attraverso un tool contract definito.
            Il sistema non improvvisa — attiva capability precise.
          </p>

          <div className="rounded-2xl overflow-hidden" style={{ background: "hsl(240 5% 6% / 0.4)", border: "1px solid hsl(0 0% 100% / 0.06)" }}>
            {/* Header */}
            <div className="flex items-center px-5 py-3 border-b border-border/[0.08]">
              <span className="text-[8px] text-muted-foreground/60 font-mono tracking-wider flex-1">TOOL</span>
              <span className="text-[8px] text-muted-foreground/60 font-mono tracking-wider w-32 text-right">LAYER</span>
              <span className="text-[8px] text-muted-foreground/60 font-mono tracking-wider w-20 text-right">TYPE</span>
            </div>
            {toolContracts.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.04, ease }}
                className="flex items-center px-5 py-2.5 border-b border-border/[0.04] last:border-b-0 hover:bg-secondary/[0.04] transition-colors duration-500"
              >
                <div className="flex items-center gap-2 flex-1">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: `hsl(${directionColors[tool.direction]} / 0.6)` }} />
                  <span className="text-[11px] text-foreground/90 font-light">{tool.name}</span>
                </div>
                <span className="text-[9px] text-muted-foreground/60 font-mono w-32 text-right">{tool.layer}</span>
                <span className="text-[8px] font-mono w-20 text-right px-2 py-0.5 rounded-md"
                  style={{ color: `hsl(${directionColors[tool.direction]} / 0.6)`, background: `hsl(${directionColors[tool.direction]} / 0.06)` }}
                >
                  {tool.direction}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── SURFACE vs ENGINE ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, ease }}
          className="mb-24"
        >
          <div className="text-[9px] text-muted-foreground/60 tracking-[0.3em] uppercase text-center mb-8 font-mono">DUALISMO ARCHITETTURALE</div>
          <div className="grid grid-cols-2 gap-4">
            {/* Surface */}
            <div className="rounded-2xl p-6" style={{ background: "hsl(240 5% 6% / 0.4)", border: "1px solid hsl(210 100% 66% / 0.08)" }}>
              <div className="text-[10px] text-primary/70 tracking-[0.2em] uppercase mb-4 font-mono">CIÒ CHE L'UTENTE VEDE</div>
              <div className="space-y-3">
                {[
                  "Un campo di testo per esprimere obiettivi",
                  "Un assistente che capisce e agisce",
                  "Contenuti che si materializzano progressivamente",
                  "Approvazioni chiare e rassicuranti",
                  "Risultati immediati e azionabili",
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 + i * 0.1 }} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-primary/40 mt-1.5 flex-shrink-0" />
                    <span className="text-[11px] text-foreground/90 font-light leading-relaxed">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            {/* Engine */}
            <div className="rounded-2xl p-6" style={{ background: "hsl(240 5% 6% / 0.4)", border: "1px solid hsl(270 60% 62% / 0.08)" }}>
              <div className="text-[10px] text-accent/70 tracking-[0.2em] uppercase mb-4 font-mono">CIÒ CHE IL SISTEMA FA</div>
              <div className="space-y-3">
                {[
                  "Acquisisce dati da 14 sorgenti in parallelo",
                  "Unifica, deduplica e arricchisce ogni record",
                  "Seleziona tool, pianifica step, coordina 7 agenti",
                  "Applica governance, verifica ruoli e policy",
                  "Esegue job, registra audit, salva in memoria",
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 + i * 0.1 }} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-accent/40 mt-1.5 flex-shrink-0" />
                    <span className="text-[11px] text-foreground/90 font-light leading-relaxed">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── MATURITY ROADMAP ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, ease }}
          className="mb-20"
        >
          <div className="text-[9px] text-muted-foreground/60 tracking-[0.3em] uppercase text-center mb-3 font-mono">MATURITÀ DEL SISTEMA</div>
          <p className="text-[12px] text-muted-foreground/70 font-light text-center mb-8 max-w-sm mx-auto">
            Non una roadmap. La crescita naturale di una macchina già in movimento.
          </p>

          <div className="space-y-3">
            {maturityLevels.map((level, i) => (
              <motion.div
                key={level.name}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + i * 0.1, ease }}
                className="rounded-2xl p-5"
                style={{ background: "hsl(240 5% 6% / 0.45)", border: "1px solid hsl(0 0% 100% / 0.06)" }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-mono text-muted-foreground/60">{String(i + 1).padStart(2, "0")}</span>
                    <h4 className="text-[13px] font-light text-foreground/90">{level.name}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[8px] font-mono px-2 py-0.5 rounded-md ${
                      level.status === "live" ? "text-success/75 bg-success/[0.08]" :
                      level.status === "building" ? "text-primary/70 bg-primary/[0.07]" :
                      "text-muted-foreground/60 bg-secondary/[0.06]"
                    }`}>
                      {level.status === "live" ? "OPERATIVO" : level.status === "building" ? "IN COSTRUZIONE" : "PIANIFICATO"}
                    </span>
                    <span className="text-[9px] text-muted-foreground/60 font-mono">{level.percent}%</span>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground/60 font-light mb-3 ml-7">{level.desc}</p>
                <div className="ml-7">
                  <div className="h-[2px] rounded-full bg-secondary/15 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: level.status === "live"
                          ? "linear-gradient(90deg, hsl(152 60% 45% / 0.6), hsl(152 60% 45% / 0.4))"
                          : level.status === "building"
                          ? "linear-gradient(90deg, hsl(210 100% 66% / 0.5), hsl(210 100% 66% / 0.3))"
                          : "linear-gradient(90deg, hsl(0 0% 50% / 0.3), hsl(0 0% 50% / 0.15))",
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${level.percent}%` }}
                      transition={{ delay: 1.3 + i * 0.15, duration: 1, ease }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── CLOSING ─── */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="text-center">
          <p className="text-[13px] text-foreground/50 font-light leading-relaxed max-w-md mx-auto mb-3">
            Davanti, una conversazione.
            <br />
            Dietro, una macchina enterprise pronta a costruire.
          </p>
          <p className="text-[9px] text-muted-foreground/60 font-mono tracking-widest">
            10 LAYER · 13 TOOL CONTRACTS · 9 MODULI OPERATIVI · 14 SORGENTI
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Architecture;