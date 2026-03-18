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
  Wand2,
  ChevronRight,
  Minus,
  Building2,
  Contact,
  Target,
  Mail,
  Zap,
  Shield,
  Eye,
  ThumbsUp,
  AlertCircle,
  Database,
} from "lucide-react";

const ease = [0.2, 0.8, 0.2, 1] as const;

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  agentName?: string;
  agentEmoji?: string;
  stateTag?: string;
}

interface AgentTask {
  id: number;
  agent: string;
  emoji: string;
  task: string;
  status: "running" | "completed" | "pending" | "monitoring";
  time: string;
  duration?: string;
  entities?: string[];
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
    content: "Ho coordinato 4 agenti su 3 sorgenti dati. Il CRM Core Agent ha estratto contacts e companies, il Data Analyst ha calcolato il churn scoring su 34 clienti inattivi.\n\nRisultato:\n• 34 clienti, €4.2M fatturato esposto\n• Score churn medio: 76/100 (critico)\n• 6 clienti con score ≥85 richiedono intervento immediato\n\nHo generato la vista nel canvas. Vuoi che prepari una campagna di re-engagement?",
    timestamp: "14:02",
    agentName: "Orchestratore",
    agentEmoji: "🧠",
    stateTag: "proposta",
  },
  {
    id: 3,
    role: "assistant",
    content: "Canvas generato con successo: tabella contatti + KPI + trend. In attesa della tua approvazione per eventuali azioni operative.",
    timestamp: "14:02",
    agentName: "Canvas Agent",
    agentEmoji: "🎨",
    stateTag: "anteprima",
  },
];

const agentTasks: AgentTask[] = [
  { id: 1, agent: "Orchestratore", emoji: "🧠", task: "Interpretazione intento → piano con 4 agenti", status: "completed", time: "14:01:01", duration: "0.3s" },
  { id: 2, agent: "CRM Core", emoji: "🏢", task: "Query contacts + companies (fatturato > 100k)", status: "completed", time: "14:01:02", duration: "0.8s", entities: ["contacts", "companies"] },
  { id: 3, agent: "CRM Core", emoji: "🏢", task: "Cross-ref activities (ultimi 90gg inattività)", status: "completed", time: "14:01:03", duration: "0.5s", entities: ["activities"] },
  { id: 4, agent: "Data Analyst", emoji: "📊", task: "Churn scoring ML su 34 record", status: "completed", time: "14:01:04", duration: "0.6s" },
  { id: 5, agent: "Data Analyst", emoji: "📊", task: "Trend analysis vs Q3, distribuzione settore", status: "completed", time: "14:01:05", duration: "0.4s" },
  { id: 6, agent: "Canvas Agent", emoji: "🎨", task: "Generazione vista: KPI + tabella + insight", status: "completed", time: "14:01:06", duration: "0.3s" },
  { id: 7, agent: "Comm. Agent", emoji: "📧", task: "Preparazione template re-engagement", status: "running", time: "14:01:07" },
  { id: 8, agent: "Governance", emoji: "🛡️", task: "Audit log sessione + policy check", status: "monitoring", time: "14:01:01" },
  { id: 9, agent: "Automation", emoji: "⚡", task: "In attesa: azione bulk se approvata", status: "pending", time: "—" },
];

const suggestedPrompts = [
  "Genera campagna email per i 6 clienti critici",
  "Crea report executive da condividere",
  "Salva questa vista come template",
  "Mostrami i partner più performanti",
];

const tableData = [
  { name: "Pinnacle Srl", type: "Company", sector: "Manufacturing", revenue: "€129k", lastOrder: "120 gg", churn: 91, trend: "down", contacts: 4, status: "prospect" },
  { name: "Acme Corporation", type: "Company", sector: "Technology", revenue: "€234k", lastOrder: "112 gg", churn: 89, trend: "down", contacts: 7, status: "partner" },
  { name: "Orion Tech", type: "Company", sector: "Technology", revenue: "€118k", lastOrder: "105 gg", churn: 85, trend: "down", contacts: 3, status: "prospect" },
  { name: "TechnoSteel Srl", type: "Company", sector: "Manufacturing", revenue: "€187k", lastOrder: "98 gg", churn: 82, trend: "down", contacts: 5, status: "partner" },
  { name: "Meridian Group", type: "Company", sector: "Consulting", revenue: "€156k", lastOrder: "95 gg", churn: 76, trend: "stable", contacts: 6, status: "prospect" },
  { name: "Nova Industries", type: "Company", sector: "Manufacturing", revenue: "€143k", lastOrder: "93 gg", churn: 71, trend: "stable", contacts: 4, status: "partner" },
  { name: "Eureka Solutions", type: "Company", sector: "Technology", revenue: "€138k", lastOrder: "91 gg", churn: 68, trend: "stable", contacts: 3, status: "prospect" },
  { name: "Artemis Labs", type: "Company", sector: "Biotech", revenue: "€112k", lastOrder: "97 gg", churn: 74, trend: "down", contacts: 2, status: "prospect" },
];

const contextEntities = [
  { icon: Contact, label: "34 Contacts", sub: "filtrati da 24.5k" },
  { icon: Building2, label: "28 Companies", sub: "con fatturato >100k" },
  { icon: Target, label: "18 Prospects", sub: "a rischio churn" },
  { icon: Database, label: "3 Sorgenti", sub: "CRM, Ordini, SAP" },
];

const Workspace = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [activeView, setActiveView] = useState<"table" | "chart" | "report">("table");
  const [showAgents, setShowAgents] = useState(true);
  const [micActive, setMicActive] = useState(false);
  const [sessionState] = useState<"proposta" | "anteprima" | "approvazione" | "esecuzione" | "completato">("anteprima");
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
          content: "Ho ricevuto la tua richiesta. Sto coordinando gli agenti necessari. Puoi seguire l'attività in tempo reale nel pannello Agenti.",
          timestamp: new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" }),
          agentName: "Orchestratore",
          agentEmoji: "🧠",
          stateTag: "proposta",
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
            <span className="text-sm font-semibold">AI Workspace</span>
            <span className="text-xs text-muted-foreground ml-2">· Analisi clienti inattivi Q4</span>
          </div>
          {/* Session state flow */}
          <div className="flex items-center gap-1 ml-3">
            {(["proposta", "anteprima", "approvazione", "esecuzione", "completato"] as const).map((s, i) => (
              <div key={s} className={`text-[9px] px-2 py-0.5 rounded font-mono transition-all ${
                s === sessionState ? "bg-primary/15 text-primary border border-primary/20"
                : (["proposta", "anteprima"].indexOf(s) <= ["proposta", "anteprima"].indexOf(sessionState)) && i <= 1 ? "bg-success/10 text-success"
                : "bg-secondary text-muted-foreground/50"
              }`}>
                {s}
              </div>
            ))}
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
        {/* ─── LEFT: CHAT + CONTEXT ─── */}
        <div className="w-[340px] min-w-[300px] border-r border-border flex flex-col bg-card/20">
          {/* Context panel */}
          <div className="px-4 py-3 border-b border-border/50">
            <div className="section-label mb-2">CONTESTO · ENTITÀ COINVOLTE</div>
            <div className="grid grid-cols-2 gap-1.5">
              {contextEntities.map((e) => (
                <div key={e.label} className="glass-panel-subtle p-2 rounded-lg flex items-center gap-2">
                  <e.icon className="w-3 h-3 text-primary/60" strokeWidth={1.5} />
                  <div>
                    <div className="text-[10px] font-medium">{e.label}</div>
                    <div className="text-[9px] text-muted-foreground">{e.sub}</div>
                  </div>
                </div>
              ))}
            </div>
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
                  <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0 mt-1 text-sm">
                    {msg.agentEmoji || "🧠"}
                  </div>
                )}
                <div className={`max-w-[88%] ${
                  msg.role === "user"
                    ? "glass-panel-subtle px-4 py-3 rounded-2xl rounded-br-md border-primary/10"
                    : "glass-panel px-4 py-3 rounded-2xl rounded-bl-md"
                }`}>
                  {msg.agentName && (
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] text-primary font-mono font-medium tracking-wider">
                        ● {msg.agentName.toUpperCase()}
                      </span>
                      {msg.stateTag && (
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                          msg.stateTag === "proposta" ? "bg-primary/10 text-primary"
                          : msg.stateTag === "anteprima" ? "bg-info/10 text-info"
                          : msg.stateTag === "approvazione" ? "bg-success/10 text-success"
                          : "bg-secondary text-muted-foreground"
                        }`}>
                          {msg.stateTag}
                        </span>
                      )}
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
                  onClick={() => setInput(p)}
                  className="text-[10px] px-2.5 py-1.5 rounded-lg glass-panel-subtle text-muted-foreground hover:text-primary hover:border-primary/20 transition-all"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Voice + Input */}
          <div className="p-4 border-t border-border bg-card/40">
            <div className="flex items-center gap-[2px] justify-center mb-3 h-7">
              {Array.from({ length: 40 }).map((_, i) => (
                <motion.div
                  key={i}
                  className={`w-[2px] rounded-full ${micActive ? "bg-primary/50" : "bg-muted-foreground/15"}`}
                  animate={{
                    height: micActive ? [3, Math.random() * 22 + 3, 3] : [2, Math.random() * 5 + 2, 2],
                  }}
                  transition={{ duration: 0.8 + Math.random() * 0.5, repeat: Infinity, delay: i * 0.02 }}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMicActive(!micActive)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all flex-shrink-0 ${
                  micActive ? "bg-primary/20 text-primary glow-primary" : "glass-panel-subtle text-muted-foreground hover:text-primary"
                }`}
              >
                {micActive ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
              <div className="flex-1 flex items-center glass-panel rounded-xl px-4 py-2.5">
                <input
                  type="text"
                  placeholder="Scrivi un obiettivo..."
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

        {/* ─── CENTER: CANVAS DINAMICO ─── */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Canvas toolbar */}
          <div className="flex items-center justify-between px-5 py-2 border-b border-border/50 bg-card/20 flex-shrink-0">
            <div className="flex items-center gap-1">
              <span className="section-label mr-3">CANVAS DINAMICO</span>
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
              <button className="text-[11px] px-2.5 py-1.5 rounded-lg bg-success/10 text-success hover:bg-success/15 transition-colors flex items-center gap-1">
                <ThumbsUp className="w-3 h-3" /> Approva
              </button>
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
                <motion.div key="table" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease }}>
                  {/* KPIs */}
                  <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-6">
                    {[
                      { label: "Clienti inattivi", value: "34", sub: "da contacts + companies", icon: "👥" },
                      { label: "Fatturato a rischio", value: "€4.2M", sub: "aggregato da SAP", icon: "💰" },
                      { label: "Churn score medio", value: "76", sub: "/100 · Critico", icon: "⚠️" },
                      { label: "Giorni medi inattività", value: "104", sub: "da activities log", icon: "📅" },
                    ].map((kpi, i) => (
                      <motion.div key={kpi.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06, ease }} className="glass-panel p-4">
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
                        <span className="section-label">COMPANIES · CHURN SCORING</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-destructive/10 text-destructive">6 critici</span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                        <span className="font-mono">34 record</span>
                        <span className="text-primary cursor-pointer">Esporta CSV</span>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border text-[11px] text-muted-foreground">
                            <th className="text-left px-5 py-2.5 font-medium w-8">#</th>
                            <th className="text-left px-5 py-2.5 font-medium">Company</th>
                            <th className="text-left px-5 py-2.5 font-medium">Tipo</th>
                            <th className="text-left px-5 py-2.5 font-medium">Settore</th>
                            <th className="text-right px-5 py-2.5 font-medium">Fatturato</th>
                            <th className="text-right px-5 py-2.5 font-medium">Inattività</th>
                            <th className="text-right px-5 py-2.5 font-medium">Contacts</th>
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
                              <td className="px-5 py-3">
                                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                                  row.status === "partner" ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"
                                }`}>{row.status}</span>
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
                                }`}>{row.churn}</span>
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
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-4 glass-panel-subtle p-4 flex items-start gap-3 border-primary/10">
                    <Wand2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[11px] font-mono text-primary mb-1">INSIGHT AI · PROPOSTA</div>
                      <p className="text-[13px] text-secondary-foreground leading-relaxed">
                        I settori <strong>Manufacturing</strong> (14 companies) e <strong>Technology</strong> (9 companies) concentrano il 67% del rischio.
                        6 aziende partner con score ≥85 generano <strong>€1.1M</strong> di fatturato.
                        Raccomando campagna re-engagement differenziata: partner vs prospect.
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <button className="text-[11px] px-3 py-1.5 rounded-lg bg-success/10 text-success hover:bg-success/15 transition-colors flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" /> Approva e procedi
                        </button>
                        <button className="text-[11px] px-3 py-1.5 rounded-lg glass-panel-subtle text-muted-foreground hover:text-foreground transition-colors">
                          Modifica parametri
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {activeView === "chart" && (
                <motion.div key="chart" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease }} className="space-y-6">
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
                      <div className="flex items-center gap-2"><div className="w-3 h-1.5 rounded bg-destructive/40" /><span>Critico (≥70)</span></div>
                      <div className="flex items-center gap-2"><div className="w-3 h-1.5 rounded bg-warning/40" /><span>Attenzione (60-69)</span></div>
                      <div className="flex items-center gap-2"><div className="w-3 h-1.5 rounded bg-primary/30" /><span>Normale ({'<'}60)</span></div>
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
                              <motion.div initial={{ width: 0 }} animate={{ width: `${s.pct}%` }} transition={{ duration: 0.6, ease }} className="h-full rounded-full bg-primary/50" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="glass-panel p-5">
                      <div className="section-label mb-3">PER TIPOLOGIA ENTITÀ</div>
                      <div className="space-y-4 mt-2">
                        {[
                          { label: "Partner (score ≥70)", count: 8, color: "bg-accent" },
                          { label: "Prospect (score ≥70)", count: 10, color: "bg-primary" },
                          { label: "Partner (score <70)", count: 6, color: "bg-accent/30" },
                          { label: "Prospect (score <70)", count: 10, color: "bg-primary/30" },
                        ].map((r) => (
                          <div key={r.label} className="flex items-center gap-3">
                            <div className={`w-2.5 h-2.5 rounded-full ${r.color}`} />
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
                <motion.div key="report" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease }} className="max-w-3xl mx-auto">
                  <div className="glass-panel p-10">
                    <div className="flex items-center justify-between mb-8">
                      <div className="pill-badge text-[10px]">REPORT EXECUTIVE · GENERATO DALL'AI</div>
                      <div className="flex items-center gap-2">
                        <button className="text-[11px] px-3 py-1.5 rounded-lg glass-panel-subtle text-muted-foreground hover:text-foreground">PDF</button>
                        <button className="text-[11px] px-3 py-1.5 rounded-lg glass-panel-subtle text-primary">Condividi</button>
                      </div>
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight mb-2">Analisi Clienti Inattivi</h2>
                    <p className="text-sm text-muted-foreground mb-2">Q4 2025 · Report automatico · 18 Marzo 2026</p>
                    <p className="text-[10px] text-muted-foreground mb-8 font-mono">
                      Sorgenti: CRM Core (contacts, companies, activities) · SAP (fatturato) · ML Scoring Engine
                    </p>

                    <div className="grid grid-cols-3 gap-3 mb-10">
                      {[
                        { label: "Companies a rischio", value: "34" },
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
                        <p>L'analisi ha identificato <strong className="text-foreground">34 companies</strong> (di cui 14 partner e 18 prospect) con fatturato annuo superiore a €100.000 e nessun ordine negli ultimi 90 giorni. Il CRM Core Agent ha incrociato contacts, companies e activities per un totale di <strong className="text-foreground">€4.2M</strong> di fatturato a rischio.</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Evidenze Principali</h3>
                        <ul className="space-y-2">
                          {[
                            "Il churn score medio è 76/100 — livello critico",
                            "Manufacturing (14 companies) e Technology (9) concentrano il 67% del rischio",
                            "6 partner con fatturato > €150k hanno score ≥85 — intervento immediato",
                            "Il tasso di win-back storico per score >80 è del 23% con azione entro 30 giorni",
                            "18 prospect a rischio rappresentano €1.8M di potenziale pipeline persa",
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
                            <div className="text-[10px] font-mono text-primary mb-1">PRIORITÀ ALTA · APPROVAZIONE RICHIESTA</div>
                            <p>Campagna re-engagement per 6 partner con score ≥85 e fatturato {'>'} €150k. Communication Agent pronto all'invio.</p>
                          </div>
                          <div className="glass-panel-subtle p-4">
                            <div className="text-[10px] font-mono text-warning mb-1">PRIORITÀ MEDIA</div>
                            <p>Programma retention per 12 companies in fascia 70-84 con touchpoint personalizzati ogni 15 giorni.</p>
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
              animate={{ width: 270, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease }}
              className="border-l border-border overflow-hidden flex-shrink-0 bg-card/20"
            >
              <div className="w-[270px] h-full flex flex-col">
                <div className="px-4 py-3 border-b border-border/50">
                  <div className="section-label">AGENTI · ATTIVITÀ LIVE</div>
                </div>

                <div className="p-3 border-b border-border/30">
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { label: "Completati", value: "6", color: "text-success" },
                      { label: "In esecuz.", value: "1", color: "text-primary" },
                      { label: "Monitor.", value: "1", color: "text-info" },
                      { label: "In attesa", value: "1", color: "text-muted-foreground" },
                    ].map((s) => (
                      <div key={s.label} className="glass-panel-subtle p-2 text-center rounded-lg">
                        <div className={`text-lg font-bold ${s.color}`}>{s.value}</div>
                        <div className="text-[8px] text-muted-foreground">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-1">
                  {agentTasks.map((task, i) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, ease }}
                      className={`flex items-start gap-2.5 p-2.5 rounded-lg transition-colors ${
                        task.status === "running" ? "glass-panel-subtle border-primary/15"
                        : task.status === "monitoring" ? "glass-panel-subtle border-info/10"
                        : "hover:bg-secondary/10"
                      }`}
                    >
                      <div className="mt-0.5 flex-shrink-0">
                        {task.status === "running" ? (
                          <Loader2 className="w-3.5 h-3.5 text-primary animate-spin" />
                        ) : task.status === "completed" ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                        ) : task.status === "monitoring" ? (
                          <Eye className="w-3.5 h-3.5 text-info" />
                        ) : (
                          <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-medium leading-snug">{task.task}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px]">{task.emoji}</span>
                          <span className="text-[10px] text-muted-foreground font-mono">{task.agent}</span>
                          {task.duration && <span className="text-[9px] text-muted-foreground font-mono">{task.duration}</span>}
                        </div>
                        {task.entities && (
                          <div className="flex gap-1 mt-1">
                            {task.entities.map((e) => (
                              <span key={e} className="text-[8px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground font-mono">{e}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      <span className="text-[9px] text-muted-foreground font-mono flex-shrink-0">{task.time}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="p-3 border-t border-border/30">
                  <div className="section-label mb-2">7 AGENTI DISPONIBILI</div>
                  <div className="grid grid-cols-2 gap-1">
                    {[
                      { emoji: "🧠", name: "Orchestratore" },
                      { emoji: "🏢", name: "CRM Core" },
                      { emoji: "📊", name: "Data Analyst" },
                      { emoji: "📧", name: "Communication" },
                      { emoji: "🎨", name: "Canvas" },
                      { emoji: "⚡", name: "Automation" },
                      { emoji: "🛡️", name: "Governance" },
                    ].map((a) => (
                      <div key={a.name} className="flex items-center gap-1.5 px-2 py-1 text-[10px] text-muted-foreground">
                        <span>{a.emoji}</span><span>{a.name}</span>
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
