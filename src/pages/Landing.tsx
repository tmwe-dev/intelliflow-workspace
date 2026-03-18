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
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Prodotto</a>
          <a href="#usecases" className="hover:text-foreground transition-colors">Use Case</a>
          <a href="#architecture" className="hover:text-foreground transition-colors">Architettura</a>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
        >
          Accedi →
        </button>
      </motion.nav>

      {/* ─── HERO ─── */}
      <section className="relative z-10 flex flex-col items-center pt-20 pb-32 px-6">
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
            Un layer AI sopra ogni software che usi
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.92] mb-8">
            <span className="text-gradient-hero">Parla al tuo business.</span>
            <br />
            <span className="text-gradient-primary">Lui risponde.</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Adaptive AI si collega ai tuoi database, CRM, ERP e API.
            Capisce cosa vuoi fare e genera l'interfaccia, i report
            e le azioni in tempo reale. Nessun form. Nessuna maschera.
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
                  Inizia ora
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
            Setup in 2 minuti · Nessuna carta di credito · Connetti qualsiasi fonte dati
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
              "Mostrami i clienti inattivi da 90 giorni",
              "Genera report vendite executive",
              "Prepara campagna email per questi lead",
              "Confronta performance Q3 vs Q4",
              "Crea dashboard KPI in tempo reale",
              "Esporta dati GDPR per 3 utenti",
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

        {/* Hero preview */}
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
                <div className="flex h-[420px]">
                  {/* Mind panel */}
                  <div className="w-[38%] border-r border-border p-5 flex flex-col">
                    <div className="section-label mb-4">LA MENTE · CHAT + VOCE</div>
                    <div className="space-y-3 flex-1">
                      <div className="glass-panel-subtle p-3.5 rounded-xl">
                        <p className="text-[13px] leading-relaxed">"Mostrami i clienti con fatturato {'>'} 100k che non ordinano da 90 giorni. Calcola il rischio churn."</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="status-dot-active animate-pulse-glow" />
                        <span className="text-xs text-primary font-mono">3 agenti in esecuzione...</span>
                      </div>
                      <div className="glass-panel-subtle p-3.5 rounded-xl border-primary/10">
                        <div className="text-[10px] font-mono text-primary mb-1.5">AGENTE ANALISTA</div>
                        <p className="text-[13px] text-secondary-foreground leading-relaxed">
                          Trovati <strong className="text-foreground">34 clienti</strong> a rischio. Ho generato una vista con scoring churn, trend e raccomandazioni.
                        </p>
                      </div>
                      <div className="glass-panel-subtle p-3 rounded-lg">
                        <div className="text-[10px] font-mono text-accent mb-1">AGENTE DESIGNER</div>
                        <p className="text-xs text-muted-foreground">Canvas pronto: tabella + KPI + grafico trend.</p>
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
                    <div className="section-label mb-4">LA MATERIA · CANVAS DINAMICO</div>
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
                    <div className="section-label mb-3">AGENTI</div>
                    <div className="space-y-2 flex-1">
                      {[
                        { name: "Orchestratore", status: "completato", icon: "🧠" },
                        { name: "Data Analyst", status: "completato", icon: "📊" },
                        { name: "Canvas Agent", status: "in esecuz.", icon: "🎨" },
                        { name: "Comm. Agent", status: "in attesa", icon: "📧" },
                        { name: "Automation", status: "in attesa", icon: "⚡" },
                      ].map((agent) => (
                        <div key={agent.name} className="flex items-center gap-2 p-2 rounded-md glass-panel-subtle">
                          <span className="text-sm">{agent.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="text-[11px] font-medium truncate">{agent.name}</div>
                            <div className={`text-[9px] font-mono ${
                              agent.status === "completato" ? "text-success"
                              : agent.status === "in esecuz." ? "text-primary"
                              : "text-muted-foreground"
                            }`}>
                              {agent.status === "in esecuz." && "● "}{agent.status}
                            </div>
                          </div>
                        </div>
                      ))}
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
            {["PostgreSQL", "Salesforce", "SAP", "HubSpot", "Stripe", "Slack", "Google Workspace", "MongoDB"].map((name) => (
              <span key={name} className="text-sm font-medium text-foreground whitespace-nowrap">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHAT IT IS ─── */}
      <section id="features" className="relative z-10 py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="text-center mb-20"
          >
            <div className="pill-badge mb-6 mx-auto">Come funziona</div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-5">
              <span className="text-gradient-hero">Non un altro software.</span>
              <br />
              <span className="text-gradient-primary">Un sistema operativo AI.</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed">
              Adaptive AI non sostituisce i tuoi strumenti. Si posiziona sopra di essi,
              creando un unico punto di controllo intelligente per ogni operazione.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: MessageSquare,
                title: "Parla, non cliccare",
                desc: "Scrivi o parla in linguaggio naturale. L'AI capisce il tuo obiettivo, interroga i sistemi giusti e produce il risultato.",
                accent: "primary",
              },
              {
                icon: Layers,
                title: "UI generata dall'AI",
                desc: "Nessun layout fisso. Tabelle, grafici, kanban, report, timeline: l'interfaccia si compone dinamicamente in base al task.",
                accent: "accent",
              },
              {
                icon: Bot,
                title: "Multi-agente orchestrato",
                desc: "Agenti specializzati lavorano in parallelo: analisi dati, comunicazione, design, automazione. Tutto visibile in tempo reale.",
                accent: "primary",
              },
              {
                icon: Database,
                title: "Connettore universale",
                desc: "SQL, NoSQL, REST API, CRM, ERP, email, file storage. Un solo layer sopra tutti i tuoi sistemi, senza migrazioni.",
                accent: "accent",
              },
              {
                icon: Zap,
                title: "Azioni massive",
                desc: "Seleziona record, lancia operazioni su migliaia di elementi. Email, aggiornamenti, export: con feedback live e audit completo.",
                accent: "primary",
              },
              {
                icon: Shield,
                title: "Governance enterprise",
                desc: "Ogni azione AI è tracciata. Ruoli, permessi, audit log, conferme richieste. Trasparenza totale su suggerimento, anteprima ed esecuzione.",
                accent: "accent",
              },
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

      {/* ─── USE CASES ─── */}
      <section id="usecases" className="relative z-10 py-28 px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="pill-badge-accent mb-6 mx-auto">Use Case</div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-5">
              Un unico strumento,<br />
              <span className="text-gradient-accent">infiniti contesti.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                prompt: '"Mostrami i lead che non rispondono da 2 settimane"',
                result: "L'AI interroga il CRM, filtra 847 lead, genera una vista segmentata con scoring engagement e suggerisce 3 azioni di follow-up.",
                tags: ["CRM", "Lead Management", "Scoring"],
                icon: Users,
              },
              {
                prompt: '"Genera un report executive sulle vendite Q4"',
                result: "Analisi cross-database automatica. Report navigabile con sintesi, grafici trend, evidenze critiche e raccomandazioni. Esportabile in PDF.",
                tags: ["Report", "Executive", "Analisi"],
                icon: FileText,
              },
              {
                prompt: '"Invia email personalizzata a questi 200 contatti"',
                result: "L'agente Communication prepara i template, l'agente Automation esegue l'invio con progress live, log dettagliato e gestione errori in tempo reale.",
                tags: ["Email", "Automazione", "Massivo"],
                icon: Mail,
              },
              {
                prompt: '"Confronta il nostro inventario SAP con gli ordini del mese"',
                result: "Cross-reference tra ERP e database ordini. Discrepanze evidenziate in tabella, alert automatici sui prodotti sottoscorta, suggerimento riordino.",
                tags: ["ERP", "Inventario", "Cross-data"],
                icon: BarChart3,
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
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <uc.icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[13px] text-primary font-medium italic mb-2">{uc.prompt}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{uc.result}</p>
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

      {/* ─── ARCHITECTURE ─── */}
      <section id="architecture" className="relative z-10 py-28 px-6 border-t border-border/50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="pill-badge mb-6 mx-auto">Architettura</div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-5">
              <span className="text-gradient-hero">Costruito per scalare.</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed">
              Un orchestratore centrale AI coordina agenti specializzati, connettori universali
              e un motore di rendering UI in tempo reale.
            </p>
          </motion.div>

          {/* Architecture layers */}
          <div className="space-y-3 max-w-3xl mx-auto">
            {[
              { label: "UTENTE", items: ["Chat", "Voce", "Comandi"], color: "primary" },
              { label: "ORCHESTRATORE AI", items: ["Intento", "Contesto", "Piano", "Esecuzione"], color: "primary" },
              { label: "AGENTI", items: ["Analista", "Designer", "Comunicazione", "Automazione", "Compliance"], color: "accent" },
              { label: "CONNETTORI", items: ["SQL", "REST API", "CRM", "ERP", "Email", "Storage"], color: "primary" },
              { label: "SISTEMI AZIENDALI", items: ["PostgreSQL", "Salesforce", "SAP", "HubSpot", "Stripe", "Drive"], color: "muted-foreground" },
            ].map((layer, i) => (
              <motion.div
                key={layer.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease }}
                className="glass-panel p-4 flex items-center gap-6"
              >
                <span className={`text-[10px] font-mono font-semibold tracking-widest w-36 text-${layer.color} flex-shrink-0`}>
                  {layer.label}
                </span>
                <div className="flex-1 flex items-center gap-2 flex-wrap">
                  {layer.items.map((item) => (
                    <span key={item} className="text-xs px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground">
                      {item}
                    </span>
                  ))}
                </div>
                {i < 4 && (
                  <div className="text-muted-foreground text-lg">↕</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="relative z-10 py-20 px-6 border-t border-border/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "< 3s", label: "Tempo medio di risposta AI" },
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
            <span className="text-gradient-hero">Pronto a lavorare</span>
            <br />
            <span className="text-gradient-primary">in modo diverso?</span>
          </h2>
          <p className="text-muted-foreground mb-10 text-base leading-relaxed">
            Smetti di adattarti al software. Fai in modo che il software si adatti a te.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-2xl text-sm font-semibold hover:bg-primary/90 transition-all glow-primary"
          >
            Attiva il tuo Workspace
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-primary" />
            <span>Adaptive AI © 2026</span>
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
