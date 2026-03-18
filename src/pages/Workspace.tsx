import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Mic,
  MicOff,
  Bot,
  User,
  Sparkles,
  Table,
  BarChart3,
  FileText,
  Loader2,
  CheckCircle2,
  Clock,
  TrendingUp,
  TrendingDown,
  Save,
  Download,
  Share2,
  Maximize2,
  LayoutDashboard,
  Wand2,
  ChevronRight,
  Minus,
} from "lucide-react";

const ease = [0.2, 0.8, 0.2, 1] as const;

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  agentName?: string;
}

interface AgentTask {
  id: number;
  agent: string;
  emoji: string;
  task: string;
  status: "running" | "completed" | "pending";
  time: string;
  duration?: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: "user",
    content: "Mostrami i clienti con fatturato superiore a 100k che non hanno ordinato negli ultimi 90 giorni. Calcola il rischio churn e suggerisci azioni.",
    timestamp: "14:01",
  },
  {
    id: 2,
    role: "assistant",
    content: "Ho analizzato 3 database (CRM PostgreSQL, Ordini MySQL, Fatturazione SAP). Identificati 34 clienti inattivi con fatturato aggregato di €4.2M a rischio. Ho generato:\n\n• Vista tabellare con churn scoring\n• KPI riassuntivi con trend\n• 3 raccomandazioni operative\n\nVuoi che prepari una campagna di re-engagement per i 6 clienti più critici?",
    timestamp: "14:02",
    agentName: "Orchestratore",
  },
];

const agentTasks: AgentTask[] = [
  { id: 1, agent: "Orchestratore", emoji: "🧠", task: "Interpretazione intento e piano operativo", status: "completed", time: "14:01:01", duration: "0.3s" },
  { id: 2, agent: "Data Analyst", emoji: "📊", task: "Query CRM PostgreSQL — clienti + fatturato", status: "completed", time: "14:01:02", duration: "1.2s" },
  { id: 3, agent: "Data Analyst", emoji: "📊", task: "Cross-reference ordini MySQL (ultimi 90gg)", status: "completed", time: "14:01:03", duration: "0.8s" },
  { id: 4, agent: "Data Analyst", emoji: "📊", task: "Calcolo churn score su 34 record", status: "completed", time: "14:01:04", duration: "0.6s" },
  { id: 5, agent: "Canvas Agent", emoji: "🎨", task: "Generazione vista KPI + tabella + trend", status: "completed", time: "14:01:05", duration: "0.4s" },
  { id: 6, agent: "Comm. Agent", emoji: "📧", task: "Preparazione template re-engagement", status: "running", time: "14:01:06" },
  { id: 7, agent: "Automation", emoji: "⚡", task: "Analisi segmenti per campagna", status: "pending", time: "—" },
];

const suggestedPrompts = [
  "Genera campagna email per i 6 clienti critici",
  "Crea report executive da condividere",
  "Salva questa vista come template",
  "Confronta con i dati del Q3",
];

const tableData = [
  { name: "Pinnacle Srl", sector: "Manufacturing", revenue: "€129k", lastOrder: "120 gg", churn: 91, trend: "down", contacts: 4 },
  { name: "Acme Corporation", sector: "Technology", revenue: "€234k", lastOrder: "112 gg", churn: 89, trend: "down", contacts: 7 },
  { name: "Orion Tech", sector: "Technology", revenue: "€118k", lastOrder: "105 gg", churn: 85, trend: "down", contacts: 3 },
  { name: "TechnoSteel Srl", sector: "Manufacturing", revenue: "€187k", lastOrder: "98 gg", churn: 82, trend: "down", contacts: 5 },
  { name: "Meridian Group", sector: "Consulting", revenue: "€156k", lastOrder: "95 gg", churn: 76, trend: "stable", contacts: 6 },
  { name: "Nova Industries", sector: "Manufacturing", revenue: "€143k", lastOrder: "93 gg", churn: 71, trend: "stable", contacts: 4 },
  { name: "Eureka Solutions", sector: "Technology", revenue: "€138k", lastOrder: "91 gg", churn: 68, trend: "stable", contacts: 3 },
  { name: "Artemis Labs", sector: "Biotech", revenue: "€112k", lastOrder: "97 gg", churn: 74, trend: "down", contacts: 2 },
];

const Workspace = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [activeView, setActiveView] = useState<"table" | "chart" | "report">("table");
  const [showAgents, setShowAgents] = useState(true);
  const [micActive, setMicActive] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const ts = new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [...prev, { id: prev.length + 1, role: "user", content: input, timestamp: ts }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          role: "assistant",
          content: "Ho ricevuto la tua richiesta. Sto coordinando gli agenti per eseguire l'operazione. Puoi seguire lo stato in tempo reale nel pannello Agenti.",
          timestamp: new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" }),
          agentName: "Orchestratore",
        },
      ]);
    }, 600);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* ─── TOP BAR ─── */}
      <div className="flex items-center justify-between px-5 py-2.5 border-b border-border bg-card/50 backdrop-blur-sm flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center glow-primary">
            <Sparkles className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
          </div>
          <div>
            <span className="text-sm font-semibold">Workspace</span>
            <span className="text-xs text-muted-foreground ml-2">· Analisi clienti inattivi Q4</span>
          </div>
          <div className="pill-badge ml-3 text-[10px] py-0.5">
            <span className="status-dot-active" style={{ width: 5, height: 5 }} />
            Sessione attiva
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAgents(!showAgents)}
            className="text-[11px] px-3 py-1.5 rounded-lg glass-panel-subtle text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            <Bot className="w-3 h-3" /> Agenti {showAgents ? "▾" : "▸"}
          </button>
          <button className="text-[11px] px-3 py-1.5 rounded-lg glass-panel-subtle text-primary hover:bg-primary/10 transition-colors flex items-center gap-1.5">
            <Save className="w-3 h-3" /> Salva Template
          </button>
          <button className="text-[11px] px-3 py-1.5 rounded-lg glass-panel-subtle text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
            <Share2 className="w-3 h-3" /> Condividi
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* ─── LEFT: THE MIND ─── */}
        <div className="w-[320px] min-w-[280px] border-r border-border flex flex-col bg-card/20">
          {/* Chat header */}
          <div className="px-4 py-3 border-b border-border/50">
            <div className="section-label">LA MENTE · CHAT & VOCE</div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease }}
                className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : ""}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0 mt-1 glow-primary">
                    <Bot className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                  </div>
                )}
                <div className={`max-w-[88%] ${
                  msg.role === "user"
                    ? "glass-panel-subtle px-4 py-3 rounded-2xl rounded-br-md border-primary/10"
                    : "glass-panel px-4 py-3 rounded-2xl rounded-bl-md"
                }`}>
                  {msg.agentName && (
                    <div className="text-[10px] text-primary font-mono font-medium mb-1.5 tracking-wider">
                      ● {msg.agentName.toUpperCase()}
                    </div>
                  )}
                  <p className="text-[13px] leading-relaxed whitespace-pre-line">{msg.content}</p>
                  <span className="text-[10px] text-muted-foreground mt-1.5 block">{msg.timestamp}</span>
                </div>
                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.5} />
                  </div>
                )}
              </motion.div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Suggested prompts */}
          <div className="px-4 py-2 border-t border-border/30">
            <div className="flex gap-1.5 flex-wrap">
              {suggestedPrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => { setInput(p); }}
                  className="text-[10px] px-2.5 py-1.5 rounded-lg glass-panel-subtle text-muted-foreground hover:text-primary hover:border-primary/20 transition-all"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Voice visualizer + Input */}
          <div className="p-4 border-t border-border bg-card/40">
            {/* Voice wave */}
            <div className="flex items-center gap-[2px] justify-center mb-3 h-8">
              {Array.from({ length: 40 }).map((_, i) => (
                <motion.div
                  key={i}
                  className={`w-[2px] rounded-full ${micActive ? "bg-primary/50" : "bg-muted-foreground/15"}`}
                  animate={{
                    height: micActive
                      ? [3, Math.random() * 24 + 3, 3]
                      : [2, Math.random() * 6 + 2, 2],
                  }}
                  transition={{ duration: 0.8 + Math.random() * 0.5, repeat: Infinity, delay: i * 0.02 }}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMicActive(!micActive)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all flex-shrink-0 ${
                  micActive
                    ? "bg-primary/20 text-primary glow-primary"
                    : "glass-panel-subtle text-muted-foreground hover:text-primary"
                }`}
              >
                {micActive ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
              <div className="flex-1 flex items-center glass-panel rounded-xl px-4 py-2.5">
                <input
                  type="text"
                  placeholder="Scrivi un comando..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center text-primary hover:bg-primary/25 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ─── CENTER: THE MATTER (CANVAS) ─── */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Canvas toolbar */}
          <div className="flex items-center justify-between px-5 py-2 border-b border-border/50 bg-card/20 flex-shrink-0">
            <div className="flex items-center gap-1">
              <span className="section-label mr-3">VISTA</span>
              {[
                { key: "table" as const, icon: Table, label: "Tabella" },
                { key: "chart" as const, icon: BarChart3, label: "Grafico" },
                { key: "report" as const, icon: FileText, label: "Report" },
              ].map((v) => (
                <button
                  key={v.key}
                  onClick={() => setActiveView(v.key)}
                  className={`flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-lg transition-all ${
                    activeView === v.key
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "text-muted-foreground hover:text-foreground glass-panel-subtle"
                  }`}
                >
                  <v.icon className="w-3 h-3" strokeWidth={1.5} />
                  {v.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <button className="text-[11px] px-2.5 py-1.5 rounded-lg glass-panel-subtle text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                <Download className="w-3 h-3" /> Export
              </button>
              <button className="text-[11px] px-2.5 py-1.5 rounded-lg glass-panel-subtle text-muted-foreground hover:text-foreground transition-colors">
                <Maximize2 className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Canvas content */}
          <div className="flex-1 overflow-y-auto p-6">
            <AnimatePresence mode="wait">
              {activeView === "table" && (
                <motion.div
                  key="table"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease }}
                >
                  {/* KPIs */}
                  <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-6">
                    {[
                      { label: "Clienti inattivi", value: "34", sub: "ultimi 90 giorni", icon: "👥" },
                      { label: "Fatturato a rischio", value: "€4.2M", sub: "-12% vs Q3", icon: "💰" },
                      { label: "Churn score medio", value: "76", sub: "/100 · Critico", icon: "⚠️" },
                      { label: "Giorni medi inattività", value: "104", sub: "+18 vs Q3", icon: "📅" },
                    ].map((kpi, i) => (
                      <motion.div
                        key={kpi.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06, ease }}
                        className="glass-panel p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-muted-foreground">{kpi.label}</span>
                          <span className="text-sm">{kpi.icon}</span>
                        </div>
                        <div className="text-2xl font-bold tracking-tight">{kpi.value}</div>
                        <div className="text-[11px] text-muted-foreground mt-1">{kpi.sub}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Table */}
                  <div className="glass-panel overflow-hidden">
                    <div className="px-5 py-3 border-b border-border flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="section-label">CLIENTI INATTIVI · SCORING CHURN</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-destructive/10 text-destructive">6 critici</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                        <span>34 record</span>
                        <span className="text-primary cursor-pointer hover:text-primary/80">Esporta CSV</span>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border text-[11px] text-muted-foreground">
                            <th className="text-left px-5 py-2.5 font-medium w-8">#</th>
                            <th className="text-left px-5 py-2.5 font-medium">Cliente</th>
                            <th className="text-left px-5 py-2.5 font-medium">Settore</th>
                            <th className="text-right px-5 py-2.5 font-medium">Fatturato</th>
                            <th className="text-right px-5 py-2.5 font-medium">Ultimo ordine</th>
                            <th className="text-right px-5 py-2.5 font-medium">Contatti</th>
                            <th className="text-right px-5 py-2.5 font-medium">Churn</th>
                            <th className="text-center px-5 py-2.5 font-medium">Trend</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tableData.map((row, i) => (
                            <motion.tr
                              key={row.name}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.1 + i * 0.04 }}
                              className="border-b border-border/30 hover:bg-secondary/15 transition-colors cursor-pointer group"
                            >
                              <td className="px-5 py-3 text-[11px] text-muted-foreground">{i + 1}</td>
                              <td className="px-5 py-3">
                                <span className="text-sm font-medium group-hover:text-primary transition-colors">{row.name}</span>
                              </td>
                              <td className="px-5 py-3 text-[12px] text-muted-foreground">{row.sector}</td>
                              <td className="px-5 py-3 text-sm text-right font-mono text-secondary-foreground">{row.revenue}</td>
                              <td className="px-5 py-3 text-sm text-right text-muted-foreground">{row.lastOrder}</td>
                              <td className="px-5 py-3 text-sm text-right text-muted-foreground">{row.contacts}</td>
                              <td className="px-5 py-3 text-right">
                                <span className={`text-[12px] font-mono font-medium px-2 py-0.5 rounded-md ${
                                  row.churn >= 85 ? "bg-destructive/15 text-destructive"
                                  : row.churn >= 70 ? "bg-warning/15 text-warning"
                                  : "bg-success/15 text-success"
                                }`}>
                                  {row.churn}
                                </span>
                              </td>
                              <td className="px-5 py-3 text-center">
                                {row.trend === "down" ? (
                                  <TrendingDown className="w-3.5 h-3.5 text-destructive inline" />
                                ) : (
                                  <Minus className="w-3.5 h-3.5 text-muted-foreground inline" />
                                )}
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* AI insight */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-4 glass-panel-subtle p-4 flex items-start gap-3 border-primary/10"
                  >
                    <Wand2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[11px] font-mono text-primary mb-1">INSIGHT AI</div>
                      <p className="text-[13px] text-secondary-foreground leading-relaxed">
                        I settori <strong>Manufacturing</strong> (14 clienti) e <strong>Technology</strong> (9 clienti) rappresentano il 67% del rischio.
                        Il fatturato medio dei clienti critici (score ≥85) è di <strong>€167k</strong>.
                        Raccomando una campagna di re-engagement differenziata per settore.
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {activeView === "chart" && (
                <motion.div
                  key="chart"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease }}
                  className="space-y-6"
                >
                  <div className="glass-panel p-6">
                    <div className="section-label mb-6">ANDAMENTO CHURN SCORE · ULTIMI 6 MESI</div>
                    <div className="h-72 flex items-end gap-4 px-4 pb-4 border-b border-border/30">
                      {[
                        { month: "Ago", value: 45, clients: 18 },
                        { month: "Set", value: 52, clients: 22 },
                        { month: "Ott", value: 58, clients: 25 },
                        { month: "Nov", value: 65, clients: 28 },
                        { month: "Dic", value: 72, clients: 31 },
                        { month: "Gen", value: 76, clients: 34 },
                      ].map((d, i) => (
                        <div key={d.month} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                          <div className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                            Score: {d.value} · {d.clients} clienti
                          </div>
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${d.value * 0.95}%` }}
                            transition={{ delay: i * 0.08, duration: 0.6, ease }}
                            className={`w-full rounded-t-lg transition-colors ${
                              d.value >= 70 ? "bg-destructive/30 group-hover:bg-destructive/50"
                              : d.value >= 60 ? "bg-warning/30 group-hover:bg-warning/50"
                              : "bg-primary/25 group-hover:bg-primary/40"
                            }`}
                          />
                          <span className="text-[11px] text-muted-foreground font-medium">{d.month}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 flex items-center gap-6 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-1.5 rounded bg-destructive/40" />
                        <span>Critico (≥70)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-1.5 rounded bg-warning/40" />
                        <span>Attenzione (60-69)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-1.5 rounded bg-primary/30" />
                        <span>Normale ({'<'}60)</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass-panel p-5">
                      <div className="section-label mb-3">DISTRIBUZIONE PER SETTORE</div>
                      <div className="space-y-3">
                        {[
                          { name: "Manufacturing", count: 14, pct: 41 },
                          { name: "Technology", count: 9, pct: 26 },
                          { name: "Consulting", count: 6, pct: 18 },
                          { name: "Biotech", count: 3, pct: 9 },
                          { name: "Altro", count: 2, pct: 6 },
                        ].map((s) => (
                          <div key={s.name}>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-secondary-foreground">{s.name}</span>
                              <span className="text-muted-foreground font-mono">{s.count} · {s.pct}%</span>
                            </div>
                            <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${s.pct}%` }}
                                transition={{ duration: 0.6, ease }}
                                className="h-full rounded-full bg-primary/50"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="glass-panel p-5">
                      <div className="section-label mb-3">FASCE DI RISCHIO</div>
                      <div className="space-y-4 mt-2">
                        {[
                          { label: "Critico (85-100)", count: 6, color: "bg-destructive" },
                          { label: "Alto (70-84)", count: 12, color: "bg-warning" },
                          { label: "Medio (50-69)", count: 10, color: "bg-primary" },
                          { label: "Basso (<50)", count: 6, color: "bg-success" },
                        ].map((r) => (
                          <div key={r.label} className="flex items-center gap-3">
                            <div className={`w-2.5 h-2.5 rounded-full ${r.color}/50`} />
                            <span className="text-xs text-secondary-foreground flex-1">{r.label}</span>
                            <span className="text-sm font-semibold">{r.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeView === "report" && (
                <motion.div
                  key="report"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease }}
                  className="max-w-3xl mx-auto"
                >
                  <div className="glass-panel p-10">
                    <div className="flex items-center justify-between mb-8">
                      <div className="pill-badge text-[10px]">REPORT EXECUTIVE · GENERATO DALL'AI</div>
                      <div className="flex items-center gap-2">
                        <button className="text-[11px] px-3 py-1.5 rounded-lg glass-panel-subtle text-muted-foreground hover:text-foreground">PDF</button>
                        <button className="text-[11px] px-3 py-1.5 rounded-lg glass-panel-subtle text-primary">Condividi</button>
                      </div>
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight mb-2">Analisi Clienti Inattivi</h2>
                    <p className="text-sm text-muted-foreground mb-8">Q4 2025 · Report automatico · 18 Marzo 2026</p>

                    <div className="grid grid-cols-3 gap-3 mb-10">
                      {[
                        { label: "Clienti a rischio", value: "34" },
                        { label: "Fatturato esposto", value: "€4.2M" },
                        { label: "Score medio", value: "76/100" },
                      ].map((k) => (
                        <div key={k.label} className="glass-panel-subtle p-4 text-center">
                          <div className="text-2xl font-bold text-primary">{k.value}</div>
                          <div className="text-[11px] text-muted-foreground mt-1">{k.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-8 text-[14px] leading-relaxed text-secondary-foreground">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Sintesi Esecutiva</h3>
                        <p>L'analisi ha identificato <strong className="text-foreground">34 clienti</strong> con fatturato annuo superiore a €100.000 che non hanno effettuato ordini negli ultimi 90 giorni. Il fatturato aggregato a rischio ammonta a <strong className="text-foreground">€4.2M</strong>, con un incremento del 12% rispetto al trimestre precedente.</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Evidenze Principali</h3>
                        <ul className="space-y-2">
                          {[
                            "Il churn score medio è salito a 76/100, livello critico di attenzione",
                            "I settori Manufacturing (14 clienti) e Technology (9 clienti) concentrano il 67% del rischio",
                            "6 clienti con fatturato > €200k hanno score ≥ 85 — intervento immediato raccomandato",
                            "Il tempo medio di inattività è 104 giorni, +18 rispetto al Q3",
                            "Il tasso di win-back storico per score > 80 è del 23% con intervento entro 30 giorni",
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <ChevronRight className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-1" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Raccomandazioni</h3>
                        <div className="space-y-3">
                          <div className="glass-panel-subtle p-4 border-primary/10">
                            <div className="text-[10px] font-mono text-primary mb-1">PRIORITÀ ALTA</div>
                            <p>Attivazione immediata campagna re-engagement personalizzata per i 6 clienti con score ≥85 e fatturato {'>'} €150k.</p>
                          </div>
                          <div className="glass-panel-subtle p-4">
                            <div className="text-[10px] font-mono text-warning mb-1">PRIORITÀ MEDIA</div>
                            <p>Programma di retention strutturato per i 12 clienti in fascia 70-84, con touchpoint personalizzati ogni 15 giorni.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ─── RIGHT: AGENT STREAM ─── */}
        <AnimatePresence>
          {showAgents && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 260, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease }}
              className="border-l border-border overflow-hidden flex-shrink-0 bg-card/20"
            >
              <div className="w-[260px] h-full flex flex-col">
                <div className="px-4 py-3 border-b border-border/50">
                  <div className="section-label">AGENTI · ATTIVITÀ IN TEMPO REALE</div>
                </div>

                {/* Agent overview */}
                <div className="p-3 border-b border-border/30">
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Completati", value: "5", color: "text-success" },
                      { label: "In esecuzione", value: "1", color: "text-primary" },
                      { label: "In attesa", value: "1", color: "text-muted-foreground" },
                    ].map((s) => (
                      <div key={s.label} className="glass-panel-subtle p-2.5 text-center rounded-lg">
                        <div className={`text-lg font-bold ${s.color}`}>{s.value}</div>
                        <div className="text-[9px] text-muted-foreground">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Task stream */}
                <div className="flex-1 overflow-y-auto p-3 space-y-1">
                  {agentTasks.map((task, i) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, ease }}
                      className={`flex items-start gap-2.5 p-2.5 rounded-lg transition-colors ${
                        task.status === "running" ? "glass-panel-subtle border-primary/15" : "hover:bg-secondary/10"
                      }`}
                    >
                      <div className="mt-0.5 flex-shrink-0">
                        {task.status === "running" ? (
                          <Loader2 className="w-3.5 h-3.5 text-primary animate-spin" />
                        ) : task.status === "completed" ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                        ) : (
                          <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-medium leading-snug">{task.task}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px]">{task.emoji}</span>
                          <span className="text-[10px] text-muted-foreground font-mono">{task.agent}</span>
                          {task.duration && (
                            <span className="text-[9px] text-muted-foreground font-mono">{task.duration}</span>
                          )}
                        </div>
                      </div>
                      <span className="text-[9px] text-muted-foreground font-mono flex-shrink-0">{task.time}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Agent legend */}
                <div className="p-3 border-t border-border/30">
                  <div className="section-label mb-2">AGENTI DISPONIBILI</div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { emoji: "🧠", name: "Orchestratore" },
                      { emoji: "📊", name: "Data Analyst" },
                      { emoji: "🎨", name: "Canvas Agent" },
                      { emoji: "📧", name: "Comm. Agent" },
                      { emoji: "⚡", name: "Automation" },
                      { emoji: "🛡️", name: "Compliance" },
                    ].map((a) => (
                      <div key={a.name} className="flex items-center gap-1.5 text-[10px] text-muted-foreground py-1">
                        <span>{a.emoji}</span>
                        <span>{a.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Workspace;
