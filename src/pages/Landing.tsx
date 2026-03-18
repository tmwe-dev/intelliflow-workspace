import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Database,
  BarChart3,
  Mail,
  Users,
  Zap,
  Shield,
  MessageSquare,
  Mic,
  Layers,
  Bot,
  Eye,
  FileText,
  Table,
  Workflow,
  CheckCircle2,
  Globe,
  Lock,
  TrendingUp,
  Server,
  Cpu,
  Building2,
  Contact,
  Briefcase,
  Target,
  Calendar,
  FileSearch,
  Send,
  LayoutDashboard,
} from "lucide-react";

const ease = [0.2, 0.8, 0.2, 1] as const;

const Landing = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* ─── BACKGROUND ─── */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] rounded-full bg-primary/[0.03] blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-accent/[0.03] blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(hsl(var(--foreground)) 0.5px, transparent 0.5px)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* ─── NAV ─── */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-20 flex items-center justify-between px-8 lg:px-16 py-5 max-w-[1440px] mx-auto"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center glow-primary">
            <Sparkles className="w-4 h-4 text-primary" strokeWidth={1.5} />
          </div>
          <span className="text-base font-semibold tracking-tight">Adaptive AI</span>
          <span className="text-[9px] font-mono text-muted-foreground ml-1 px-1.5 py-0.5 rounded bg-secondary">WORKSPACE</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#architecture" className="hover:text-foreground transition-colors">Architettura</a>
          <a href="#usecases" className="hover:text-foreground transition-colors">Use Case</a>
          <a href="#agents" className="hover:text-foreground transition-colors">Agenti</a>
          <a href="#features" className="hover:text-foreground transition-colors">Capability</a>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
        >
          Entra nel Workspace →
        </button>
      </motion.nav>

      {/* ─── HERO ─── */}
      <section className="relative z-10 flex flex-col items-center pt-20 pb-28 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          className="text-center max-w-5xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="pill-badge mb-8"
          >
            <span className="status-dot-active" />
            Il layer AI che rende obsolete le interfacce rigide
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.92] mb-8">
            <span className="text-gradient-hero">Non un altro software.</span>
            <br />
            <span className="text-gradient-primary">Un cervello operativo.</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Adaptive AI si posiziona sopra il tuo CRM, ERP, database e API.
            Interpreta i tuoi obiettivi, orchestra agenti specializzati e
            genera l'interfaccia giusta — in tempo reale.
            <br />
            <span className="text-secondary-foreground font-medium">
              Nessun form. Nessuna maschera. Solo il risultato che vuoi.
            </span>
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-4"
          >
            <div className="relative group">
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-primary/30 to-accent/20 blur-sm opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center glass-panel overflow-hidden rounded-2xl">
                <input
                  type="email"
                  placeholder="La tua email di lavoro"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent px-6 py-4 text-sm outline-none w-60 sm:w-72 placeholder:text-muted-foreground"
                />
                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-4 text-sm font-semibold hover:bg-primary/90 transition-colors whitespace-nowrap"
                >
                  Attiva il Workspace
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-xs text-muted-foreground"
          >
            Setup in 2 minuti · Nessuna carta di credito · Connetti qualsiasi sistema
          </motion.p>
        </motion.div>

        {/* Suggested prompts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6, ease }}
          className="mt-16 w-full max-w-4xl"
        >
          <p className="text-xs text-muted-foreground text-center mb-4 font-mono uppercase tracking-widest">Prova a chiedere</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Mostrami i lead inattivi da 90 giorni",
              "Prepara una campagna email per questi 50 contatti",
              "Genera un report executive elegante sui partner Asia",
              "Fammi vedere cosa sta facendo il sistema in tempo reale",
              "Salva questa configurazione come template riutilizzabile",
              "Confronta performance Q3 vs Q4 per settore",
            ].map((prompt) => (
              <button
                key={prompt}
                onClick={() => navigate("/workspace")}
                className="glass-panel-interactive px-4 py-2.5 text-[13px] text-secondary-foreground hover:text-primary transition-colors"
              >
                "{prompt}"
              </button>
            ))}
          </div>
        </motion.div>

        {/* ─── HERO PREVIEW: WORKSPACE SIMULATION ─── */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1, ease }}
          className="mt-20 w-full max-w-6xl"
        >
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-b from-primary/5 to-transparent blur-2xl" />
            <div className="relative glass-panel p-1.5 rounded-2xl">
              <div className="bg-card rounded-xl overflow-hidden">
                {/* Window chrome */}
                <div className="flex items-center gap-2 px-5 py-3 border-b border-border">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-destructive/50" />
                    <div className="w-3 h-3 rounded-full bg-warning/50" />
                    <div className="w-3 h-3 rounded-full bg-success/50" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="px-5 py-1 rounded-lg bg-muted text-[11px] text-muted-foreground font-mono">
                      workspace.adaptive-ai.io/session/4f2a8
                    </div>
                  </div>
                </div>
                {/* Split workspace preview */}
                <div className="flex h-[440px]">
                  {/* Mind panel */}
                  <div className="w-[36%] border-r border-border p-5 flex flex-col">
                    <div className="section-label mb-4">CONVERSAZIONE NATURALE</div>
                    <div className="space-y-3 flex-1">
                      <div className="glass-panel-subtle p-3.5 rounded-xl">
                        <p className="text-[13px] leading-relaxed">"Mostrami i clienti con fatturato {'>'} 100k che non ordinano da 90 giorni. Calcola il rischio churn e suggerisci azioni."</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="status-dot-active animate-pulse-glow" />
                        <span className="text-xs text-primary font-mono">4 agenti coordinati dall'Orchestratore...</span>
                      </div>
                      <div className="glass-panel-subtle p-3.5 rounded-xl border-primary/10">
                        <div className="text-[10px] font-mono text-primary mb-1.5">● ORCHESTRATORE</div>
                        <p className="text-[13px] text-secondary-foreground leading-relaxed">
                          Piano operativo: <strong className="text-foreground">CRM Core</strong> estrae clienti e fatturato,{" "}
                          <strong className="text-foreground">Data Analyst</strong> calcola churn scoring,{" "}
                          <strong className="text-foreground">Canvas</strong> genera la vista dinamica.
                        </p>
                      </div>
                      <div className="glass-panel-subtle p-3 rounded-lg">
                        <div className="text-[10px] font-mono text-accent mb-1">● CRM CORE AGENT</div>
                        <p className="text-xs text-muted-foreground">Query su contacts, companies e activities — 34 risultati da 3 sorgenti.</p>
                      </div>
                      <div className="glass-panel-subtle p-3 rounded-lg">
                        <div className="text-[10px] font-mono text-success mb-1">● DATA ANALYST</div>
                        <p className="text-xs text-muted-foreground">Churn scoring completato. Score medio: 76/100.</p>
                      </div>
                    </div>
                    {/* Voice wave */}
                    <div className="flex items-center gap-0.5 justify-center pt-3 border-t border-border mt-3 h-10">
                      {Array.from({ length: 32 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-[2px] rounded-full bg-primary/25"
                          animate={{ height: [2, Math.random() * 16 + 2, 2] }}
                          transition={{ duration: 1.2 + Math.random(), repeat: Infinity, delay: i * 0.03 }}
                        />
                      ))}
                    </div>
                  </div>
                  {/* Matter panel */}
                  <div className="flex-1 p-5 flex flex-col">
                    <div className="section-label mb-4">CANVAS DINAMICO · GENERATO DALL'AI</div>
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {[
                        { label: "Clienti a rischio", value: "34", change: "+12 vs Q3", negative: true },
                        { label: "Fatturato esposto", value: "€4.2M", change: "-8%", negative: true },
                        { label: "Churn score", value: "76/100", change: "+18pt", negative: true },
                        { label: "Win-back rate", value: "23%", change: "+5%", negative: false },
                      ].map((kpi) => (
                        <div key={kpi.label} className="glass-panel-subtle p-3 rounded-lg">
                          <div className="text-[10px] text-muted-foreground">{kpi.label}</div>
                          <div className="text-xl font-semibold mt-1 tracking-tight">{kpi.value}</div>
                          <div className={`text-[10px] mt-0.5 ${kpi.negative ? 'text-destructive' : 'text-success'}`}>{kpi.change}</div>
                        </div>
                      ))}
                    </div>
                    <div className="glass-panel-subtle p-3 rounded-lg flex-1 overflow-hidden">
                      <div className="flex items-center justify-between mb-2">
                        <span className="section-label">TOP CLIENTI A RISCHIO</span>
                        <span className="text-[10px] text-primary cursor-pointer">Esporta</span>
                      </div>
                      {[
                        { name: "Pinnacle Srl", rev: "€129k", days: "120 gg", score: 91 },
                        { name: "Acme Corporation", rev: "€234k", days: "112 gg", score: 89 },
                        { name: "Orion Tech", rev: "€118k", days: "105 gg", score: 85 },
                        { name: "TechnoSteel Srl", rev: "€187k", days: "98 gg", score: 82 },
                        { name: "Meridian Group", rev: "€156k", days: "95 gg", score: 76 },
                        { name: "Eureka Solutions", rev: "€138k", days: "91 gg", score: 68 },
                      ].map((row, idx) => (
                        <div key={row.name} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0 text-[12px]">
                          <div className="flex items-center gap-2">
                            <span className="w-4 text-muted-foreground text-[10px]">{idx + 1}</span>
                            <span className="text-secondary-foreground font-medium">{row.name}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-muted-foreground">{row.rev}</span>
                            <span className="text-muted-foreground">{row.days}</span>
                            <span className={`font-mono text-[11px] px-1.5 py-0.5 rounded ${
                              row.score >= 85 ? 'bg-destructive/15 text-destructive'
                              : row.score >= 70 ? 'bg-warning/15 text-warning'
                              : 'bg-success/15 text-success'
                            }`}>
                              {row.score}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Agent stream */}
                  <div className="w-[200px] border-l border-border p-3 flex flex-col">
                    <div className="section-label mb-3">AGENTI ATTIVI</div>
                    <div className="space-y-2 flex-1">
                      {[
                        { name: "Orchestratore", status: "completato", icon: "🧠" },
                        { name: "CRM Core", status: "completato", icon: "🏢" },
                        { name: "Data Analyst", status: "completato", icon: "📊" },
                        { name: "Canvas Agent", status: "in esecuz.", icon: "🎨" },
                        { name: "Comm. Agent", status: "in attesa", icon: "📧" },
                        { name: "Automation", status: "in attesa", icon: "⚡" },
                        { name: "Governance", status: "monitoraggio", icon: "🛡️" },
                      ].map((agent) => (
                        <div key={agent.name} className="flex items-center gap-2 p-2 rounded-md glass-panel-subtle">
                          <span className="text-sm">{agent.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="text-[11px] font-medium truncate">{agent.name}</div>
                            <div className={`text-[9px] font-mono ${
                              agent.status === "completato" ? "text-success"
                              : agent.status === "in esecuz." ? "text-primary"
                              : agent.status === "monitoraggio" ? "text-info"
                              : "text-muted-foreground"
                            }`}>
                              {agent.status === "in esecuz." && "● "}{agent.status}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* State flow */}
                    <div className="pt-2 border-t border-border/30 mt-2">
                      <div className="text-[9px] font-mono text-muted-foreground mb-1.5">STATO SESSIONE</div>
                      <div className="flex items-center gap-1">
                        {["proposta", "anteprima", "approvazione", "esecuzione"].map((s, i) => (
                          <div key={s} className={`text-[8px] px-1.5 py-0.5 rounded font-mono ${
                            i <= 1 ? "bg-primary/15 text-primary" : "bg-secondary text-muted-foreground"
                          }`}>{s}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── SOCIAL PROOF ─── */}
      <section className="relative z-10 py-16 border-t border-border/50">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-xs text-muted-foreground font-mono uppercase tracking-widest mb-8">
            Si collega a qualsiasi sistema tu stia usando
          </p>
          <div className="flex items-center justify-center gap-10 md:gap-16 flex-wrap opacity-30">
            {["PostgreSQL", "Salesforce", "SAP", "HubSpot", "Stripe", "Slack", "Google Workspace", "MongoDB", "Microsoft 365"].map((name) => (
              <span key={name} className="text-sm font-medium text-foreground whitespace-nowrap">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3-LAYER ARCHITECTURE ─── */}
      <section id="architecture" className="relative z-10 py-28 px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="pill-badge mb-6 mx-auto">Architettura a 3 Layer</div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-5">
              <span className="text-gradient-hero">Il CRM potente resta invisibile.</span>
              <br />
              <span className="text-gradient-primary">L'AI orchestra. Tu comandi.</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed">
              Sotto il cofano: un core CRM completo con contacts, companies, campaigns, activities e documents.
              Sopra: un layer AI che interpreta, coordina ed esegue. Davanti a te: un workspace dinamico e semplice.
            </p>
          </motion.div>

          {/* 3 Layers visual */}
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                layer: "LAYER 3 · DYNAMIC WORKSPACE",
                desc: "L'interfaccia che vedi. Si adatta in tempo reale al tuo obiettivo.",
                items: ["Chat + Voce", "Canvas dinamico", "Report generati", "Template", "Approvazioni"],
                color: "primary",
                glow: true,
              },
              {
                layer: "LAYER 2 · AI ORCHESTRATION",
                desc: "7 agenti specializzati coordinati da un orchestratore centrale.",
                items: ["Orchestratore", "CRM Core", "Data Analyst", "Communication", "Canvas", "Automation", "Governance"],
                color: "accent",
                glow: false,
              },
              {
                layer: "LAYER 1 · CORE ENGINE (INVISIBILE)",
                desc: "Il motore operativo completo — mai esposto direttamente all'utente.",
                items: ["Contacts", "Companies", "Partners", "Prospects", "Activities", "Campaigns", "Documents", "Email Drafts", "Reminders", "Execution Jobs", "Audit Trail"],
                color: "muted-foreground",
                glow: false,
              },
            ].map((layer, i) => (
              <motion.div
                key={layer.layer}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5, ease }}
                className={`glass-panel p-6 ${layer.glow ? "glow-primary" : ""}`}
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className={`text-[10px] font-mono font-bold tracking-widest text-${layer.color} mb-1`}>
                      {layer.layer}
                    </div>
                    <p className="text-xs text-muted-foreground max-w-xs">{layer.desc}</p>
                  </div>
                  <div className="flex-1 flex items-center gap-2 flex-wrap">
                    {layer.items.map((item) => (
                      <span key={item} className={`text-[11px] px-2.5 py-1 rounded-md ${
                        layer.color === "primary" ? "bg-primary/10 text-primary border border-primary/15"
                        : layer.color === "accent" ? "bg-accent/10 text-accent border border-accent/15"
                        : "bg-secondary text-muted-foreground"
                      }`}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                {i < 2 && (
                  <div className="flex justify-center mt-3">
                    <div className="text-muted-foreground/30 text-xs">▼ ▼ ▼</div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CORE CRM ENTITIES ─── */}
      <section className="relative z-10 py-24 px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="pill-badge-accent mb-6 mx-auto">Core Engine</div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Un CRM enterprise completo,<br />
              <span className="text-gradient-accent">che non vedrai mai.</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">
              Il motore invisibile gestisce tutto. L'AI lo interroga per te.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { icon: Contact, label: "Contacts", count: "24.5k" },
              { icon: Building2, label: "Companies", count: "3.2k" },
              { icon: Briefcase, label: "Partners", count: "148" },
              { icon: Target, label: "Prospects", count: "8.7k" },
              { icon: Calendar, label: "Activities", count: "45k" },
              { icon: Mail, label: "Campaigns", count: "234" },
              { icon: FileText, label: "Documents", count: "12k" },
              { icon: Send, label: "Email Drafts", count: "890" },
              { icon: Zap, label: "Exec. Jobs", count: "1.2k" },
              { icon: Shield, label: "Audit Trail", count: "156k" },
              { icon: LayoutDashboard, label: "Templates", count: "89" },
              { icon: FileSearch, label: "Reminders", count: "340" },
            ].map((entity, i) => (
              <motion.div
                key={entity.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="glass-panel-subtle p-4 text-center group hover:border-accent/15 transition-all"
              >
                <entity.icon className="w-5 h-5 text-muted-foreground mx-auto mb-2 group-hover:text-accent transition-colors" strokeWidth={1.5} />
                <div className="text-[11px] font-medium">{entity.label}</div>
                <div className="text-[10px] text-muted-foreground font-mono mt-1">{entity.count}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MULTI-AGENT SYSTEM ─── */}
      <section id="agents" className="relative z-10 py-28 px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="pill-badge mb-6 mx-auto">Multi-Agent System</div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-5">
              <span className="text-gradient-hero">7 agenti specializzati.</span>
              <br />
              <span className="text-gradient-primary">Un orchestratore centrale.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              { emoji: "🧠", name: "Orchestratore", role: "Interpreta l'intento, costruisce il piano operativo, coordina gli agenti e gestisce il contesto della sessione.", status: "Sempre attivo" },
              { emoji: "🏢", name: "CRM Core Agent", role: "Accesso diretto a contacts, companies, partners, prospects, activities. Query cross-entity e aggregazioni.", status: "On-demand" },
              { emoji: "📊", name: "Data Analyst", role: "Scoring, analytics, confronti, trend analysis. Elabora dati da qualsiasi sorgente connessa.", status: "On-demand" },
              { emoji: "📧", name: "Communication Agent", role: "Email generation, template personalization, campaign management, invio massivo con tracking.", status: "On-demand" },
              { emoji: "🎨", name: "Canvas Agent", role: "Genera tabelle, grafici, report, card, timeline, kanban. Compone viste ibride dinamiche.", status: "On-demand" },
              { emoji: "⚡", name: "Automation Agent", role: "Esecuzioni massive, job scheduling, bulk operations, sincronizzazione dati, retry automatici.", status: "On-demand" },
              { emoji: "🛡️", name: "Governance Agent", role: "Audit logging, policy enforcement, permission checking, GDPR compliance, tracciabilità azioni.", status: "Sempre attivo" },
            ].map((agent, i) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, ease }}
                className="glass-panel p-5 group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{agent.emoji}</span>
                  <div>
                    <h3 className="text-sm font-semibold">{agent.name}</h3>
                    <span className="text-[9px] font-mono text-primary">{agent.status}</span>
                  </div>
                </div>
                <p className="text-[12px] text-muted-foreground leading-relaxed">{agent.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DYNAMIC UI BLOCKS ─── */}
      <section className="relative z-10 py-24 px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="pill-badge mb-6 mx-auto">Dynamic UI</div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              L'interfaccia non è predefinita.<br />
              <span className="text-gradient-primary">È generata dall'AI.</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">
              A seconda del tuo obiettivo, il canvas compone blocchi diversi.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Tabella contatti", "Company card", "Partner insight", "Timeline attività",
              "Campagna email", "Approvazione bulk", "Report executive", "Preview template",
              "Execution log", "Audit trail", "Kanban pipeline", "Grafico trend",
              "Segment builder", "Document viewer", "KPI dashboard",
            ].map((block, i) => (
              <motion.div
                key={block}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="glass-panel-subtle px-4 py-2.5 text-[12px] text-secondary-foreground hover:text-primary hover:border-primary/15 transition-all cursor-default"
              >
                {block}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── USE CASES ─── */}
      <section id="usecases" className="relative z-10 py-28 px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="pill-badge-accent mb-6 mx-auto">Use Case Reali</div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-5">
              Dimmi cosa vuoi.<br />
              <span className="text-gradient-accent">Il sistema fa il resto.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                prompt: '"Mostrami i lead inattivi da 90 giorni"',
                plan: "Orchestratore → CRM Core Agent (query prospects + activities) → Data Analyst (churn scoring) → Canvas Agent (tabella + KPI)",
                result: "Vista generata con 34 lead, scoring, trend e 3 raccomandazioni operative.",
                tags: ["Prospects", "Scoring", "Canvas dinamico"],
                icon: Users,
              },
              {
                prompt: '"Prepara una campagna email per questi 50 contatti"',
                plan: "Orchestratore → CRM Core (segmento contatti) → Communication Agent (template + personalizzazione) → Governance (approvazione)",
                result: "Campagna pronta con preview, personalizzazione per destinatario e richiesta approvazione prima dell'invio.",
                tags: ["Contacts", "Email", "Approvazione"],
                icon: Mail,
              },
              {
                prompt: '"Genera un report executive elegante sui partner Asia"',
                plan: "Orchestratore → CRM Core (partners filtro area=Asia) → Data Analyst (aggregazione) → Canvas Agent (report navigabile)",
                result: "Report executive con sintesi, grafici, evidenze e raccomandazioni. Esportabile in PDF, salvabile come template.",
                tags: ["Partners", "Report", "Template"],
                icon: FileText,
              },
              {
                prompt: '"Fammi vedere in tempo reale cosa sta facendo il sistema"',
                plan: "Orchestratore → Activity Stream → tutti gli agenti espongono stato e task correnti",
                result: "Dashboard live con stato di ogni agente, task in parallelo, durata, errori e completamenti.",
                tags: ["Monitoraggio", "Agenti", "Real-time"],
                icon: Eye,
              },
            ].map((uc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease }}
                className="glass-panel p-6"
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <uc.icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] text-primary font-medium italic mb-2">{uc.prompt}</p>
                    <div className="glass-panel-subtle p-2.5 rounded-lg mb-2">
                      <div className="text-[9px] font-mono text-accent mb-1">PIANO AGENTI</div>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">{uc.plan}</p>
                    </div>
                    <p className="text-[12px] text-secondary-foreground leading-relaxed">{uc.result}</p>
                  </div>
                </div>
                <div className="flex gap-1.5 ml-14">
                  {uc.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES GRID ─── */}
      <section id="features" className="relative z-10 py-28 px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="pill-badge mb-6 mx-auto">Capability</div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-5">
              <span className="text-gradient-hero">Tutto ciò che serve.</span>
              <br />
              <span className="text-gradient-primary">Niente che non serve.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: MessageSquare, title: "Conversazione naturale", desc: "Scrivi o parla in linguaggio naturale. L'Orchestratore capisce l'intento e coordina gli agenti giusti.", accent: "primary" },
              { icon: Layers, title: "Canvas adattivo", desc: "Tabelle, grafici, kanban, report, timeline: l'interfaccia si compone dinamicamente in base al task.", accent: "accent" },
              { icon: Bot, title: "7 agenti orchestrati", desc: "Ogni agente ha un ruolo specializzato. Lavorano in parallelo, con visibilità completa su cosa sta succedendo.", accent: "primary" },
              { icon: Database, title: "Connettore universale", desc: "SQL, NoSQL, REST API, CRM, ERP, email, file, webhook. Capability mapping automatico per ogni sorgente.", accent: "accent" },
              { icon: Zap, title: "Operazioni massive", desc: "Email a 200 contatti, aggiornamento 12k record, export GDPR. Con progress live, log dettagliato e gestione errori.", accent: "primary" },
              { icon: Shield, title: "Governance enterprise", desc: "Ogni azione passa per un flusso chiaro: suggerimento → anteprima → approvazione → esecuzione → audit.", accent: "accent" },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease }}
                className="glass-panel p-6 group"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${
                  feature.accent === "primary" ? "bg-primary/10" : "bg-accent/10"
                }`}>
                  <feature.icon className={`w-5 h-5 ${
                    feature.accent === "primary" ? "text-primary" : "text-accent"
                  }`} strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-semibold mb-2 tracking-tight">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATE FLOW ─── */}
      <section className="relative z-10 py-20 px-6 border-t border-border/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
              Flusso trasparente di ogni azione
            </h2>
            <p className="text-sm text-muted-foreground">Nulla accade senza il tuo controllo.</p>
          </motion.div>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            {[
              { label: "Suggerimento AI", color: "bg-primary/15 text-primary border-primary/20", icon: Bot },
              { label: "→" },
              { label: "Anteprima", color: "bg-info/15 text-info border-info/20", icon: Eye },
              { label: "→" },
              { label: "Approvazione utente", color: "bg-success/15 text-success border-success/20", icon: CheckCircle2 },
              { label: "→" },
              { label: "Esecuzione", color: "bg-accent/15 text-accent border-accent/20", icon: Zap },
              { label: "→" },
              { label: "Audit trail", color: "bg-secondary text-muted-foreground", icon: Shield },
            ].map((step, i) => (
              "icon" in step ? (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-medium border ${step.color}`}
                >
                  <step.icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                  {step.label}
                </motion.div>
              ) : (
                <span key={i} className="text-muted-foreground/30 text-lg">→</span>
              )
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="relative z-10 py-20 px-6 border-t border-border/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "< 3s", label: "Risposta AI media" },
              { value: "50+", label: "Connettori disponibili" },
              { value: "99.9%", label: "Uptime garantito" },
              { value: "SOC 2", label: "Certificazione sicurezza" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-gradient-primary mb-2">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="relative z-10 py-28 px-6 border-t border-border/50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            <span className="text-gradient-hero">Il commerciale del futuro</span>
            <br />
            <span className="text-gradient-primary">lavora così.</span>
          </h2>
          <p className="text-muted-foreground mb-10 text-base leading-relaxed">
            Entra. Parla. Il sistema legge, propone, costruisce ed esegue.
            <br />
            <span className="text-secondary-foreground">Tu approvi. Lui traccia tutto.</span>
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-2xl text-sm font-semibold hover:bg-primary/90 transition-all glow-primary"
          >
            Attiva il tuo AI Workspace
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-primary" />
            <span>Adaptive AI Workspace © 2026</span>
          </div>
          <div className="flex items-center gap-6">
            <span>Privacy</span>
            <span>Termini</span>
            <span>Sicurezza</span>
            <span>Contatti</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
