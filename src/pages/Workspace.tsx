import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Mic,
  MicOff,
  User,
  Sparkles,
  Loader2,
  CheckCircle2,
  Clock,
  TrendingDown,
  Minus,
  Wand2,
  X,
  ThumbsUp,
  Eye,
  Download,
} from "lucide-react";

const ease = [0.2, 0.8, 0.2, 1] as const;

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  agentName?: string;
  canvas?: "table" | "chart" | "report";
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: "user",
    content: "Mostrami i clienti con fatturato superiore a 100k che non ordinano da 90 giorni",
    timestamp: "14:01",
  },
  {
    id: 2,
    role: "assistant",
    content: "Ho trovato 34 clienti inattivi per un totale di €4.2M di fatturato esposto. Il churn score medio è 76/100 — livello critico.\n\n6 aziende con score ≥85 richiedono intervento immediato. Vuoi che prepari una campagna di re-engagement?",
    timestamp: "14:02",
    agentName: "Orchestratore",
    canvas: "table",
  },
];

const tableData = [
  { name: "Pinnacle Srl", sector: "Manufacturing", revenue: "€129k", days: "120", churn: 91 },
  { name: "Acme Corporation", sector: "Technology", revenue: "€234k", days: "112", churn: 89 },
  { name: "Orion Tech", sector: "Technology", revenue: "€118k", days: "105", churn: 85 },
  { name: "TechnoSteel Srl", sector: "Manufacturing", revenue: "€187k", days: "98", churn: 82 },
  { name: "Meridian Group", sector: "Consulting", revenue: "€156k", days: "95", churn: 76 },
  { name: "Nova Industries", sector: "Manufacturing", revenue: "€143k", days: "93", churn: 71 },
];

const agentActivity = [
  { agent: "Orchestratore", task: "Piano con 4 agenti", status: "done", time: "0.3s" },
  { agent: "CRM Core", task: "Query contacts + companies", status: "done", time: "0.8s" },
  { agent: "Data Analyst", task: "Churn scoring ML", status: "done", time: "0.6s" },
  { agent: "Canvas", task: "Vista generata", status: "done", time: "0.3s" },
  { agent: "Communication", task: "Template pronto", status: "running", time: "" },
  { agent: "Governance", task: "Audit attivo", status: "monitoring", time: "" },
];

const Workspace = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [micActive, setMicActive] = useState(false);
  const [showCanvas, setShowCanvas] = useState(true);
  const [showAgents, setShowAgents] = useState(false);
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
          content: "Sto coordinando gli agenti. Il risultato apparirà nel canvas.",
          timestamp: new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" }),
          agentName: "Orchestratore",
        },
      ]);
    }, 600);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden relative">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-primary/[0.015] blur-[150px]" />
      </div>

      {/* Top bar — whisper */}
      <div className="flex items-center justify-between px-6 py-3 relative z-10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary/30 animate-breathe" />
          <span className="text-sm text-muted-foreground font-light">Sessione attiva</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAgents(!showAgents)}
            className="text-[11px] text-muted-foreground/50 hover:text-muted-foreground transition-colors duration-300"
          >
            {showAgents ? "Nascondi agenti" : "Mostra agenti"}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* ─── CONVERSATION ─── */}
        <div className={`flex-1 flex flex-col transition-all duration-500 ${showCanvas ? "max-w-[50%]" : ""}`}>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-8 py-6">
            <div className="max-w-2xl mx-auto space-y-6">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease }}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
                >
                  {msg.role === "assistant" && (
                    <div className="ai-orb flex-shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center">
                        <Sparkles className="w-3.5 h-3.5 text-primary/50" strokeWidth={1.5} />
                      </div>
                    </div>
                  )}
                  <div className={`max-w-[80%] ${
                    msg.role === "user"
                      ? "float-panel-subtle px-5 py-4 rounded-2xl rounded-br-lg"
                      : "float-panel px-5 py-4 rounded-2xl rounded-bl-lg glow-soft"
                  }`}>
                    {msg.agentName && (
                      <div className="text-[10px] text-primary/60 font-mono mb-2 tracking-wider">
                        {msg.agentName.toUpperCase()}
                      </div>
                    )}
                    <p className="text-[14px] leading-relaxed whitespace-pre-line font-light">{msg.content}</p>
                    <span className="text-[10px] text-muted-foreground/40 mt-2 block">{msg.timestamp}</span>
                  </div>
                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-1">
                      <User className="w-3.5 h-3.5 text-muted-foreground/50" strokeWidth={1.5} />
                    </div>
                  )}
                </motion.div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </div>

          {/* Input area */}
          <div className="px-8 pb-6 pt-2">
            <div className="max-w-2xl mx-auto">
              {/* Voice visualizer */}
              <div className="flex items-center gap-[2px] justify-center mb-3 h-6">
                {Array.from({ length: 48 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-[1.5px] rounded-full ${micActive ? "bg-primary/30" : "bg-muted-foreground/8"}`}
                    animate={{
                      height: micActive ? [2, Math.random() * 20 + 2, 2] : [1, Math.random() * 3 + 1, 1],
                    }}
                    transition={{ duration: 1 + Math.random() * 0.5, repeat: Infinity, delay: i * 0.015 }}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMicActive(!micActive)}
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                    micActive ? "bg-primary/10 text-primary" : "text-muted-foreground/30 hover:text-muted-foreground/60"
                  }`}
                >
                  {micActive ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
                <div className="flex-1 float-panel px-5 py-3.5 flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Scrivi un obiettivo..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/30 font-light"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim()}
                    className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary/50 hover:text-primary hover:bg-primary/15 transition-all duration-300 disabled:opacity-20"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── CANVAS — materializes when needed ─── */}
        <AnimatePresence>
          {showCanvas && (
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.98 }}
              transition={{ duration: 0.5, ease }}
              className="w-[50%] p-4 overflow-y-auto"
            >
              <div className="float-panel p-6 h-full flex flex-col">
                {/* Canvas header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Wand2 className="w-3.5 h-3.5 text-primary/40" strokeWidth={1.5} />
                    <span className="text-xs text-muted-foreground font-light">Generato dall'AI</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="text-[10px] px-2.5 py-1.5 rounded-lg text-success/60 hover:text-success hover:bg-success/5 transition-all duration-300 flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3" /> Approva
                    </button>
                    <button className="text-[10px] px-2.5 py-1.5 rounded-lg text-muted-foreground/30 hover:text-muted-foreground transition-all duration-300">
                      <Download className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => setShowCanvas(false)}
                      className="text-muted-foreground/20 hover:text-muted-foreground/50 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* KPIs — floating, minimal */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { label: "Clienti a rischio", value: "34" },
                    { label: "Fatturato esposto", value: "€4.2M" },
                    { label: "Score medio", value: "76" },
                  ].map((kpi, i) => (
                    <motion.div
                      key={kpi.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.1, ease }}
                      className="float-panel-subtle p-4 text-center"
                    >
                      <div className="text-2xl font-light tracking-tight">{kpi.value}</div>
                      <div className="text-[10px] text-muted-foreground/50 mt-1">{kpi.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Table — clean, minimal */}
                <div className="flex-1 overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="text-[10px] text-muted-foreground/40 font-mono">
                        <th className="text-left pb-3 font-normal">Company</th>
                        <th className="text-left pb-3 font-normal">Settore</th>
                        <th className="text-right pb-3 font-normal">Fatturato</th>
                        <th className="text-right pb-3 font-normal">Inattività</th>
                        <th className="text-right pb-3 font-normal">Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((row, i) => (
                        <motion.tr
                          key={row.name}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 + i * 0.06 }}
                          className="border-t border-border/20 group cursor-pointer hover:bg-secondary/5 transition-colors duration-300"
                        >
                          <td className="py-3 text-sm font-medium group-hover:text-primary transition-colors duration-300">{row.name}</td>
                          <td className="py-3 text-xs text-muted-foreground/50">{row.sector}</td>
                          <td className="py-3 text-sm text-right font-mono text-muted-foreground">{row.revenue}</td>
                          <td className="py-3 text-sm text-right text-muted-foreground/50">{row.days} gg</td>
                          <td className="py-3 text-right">
                            <span className={`text-xs font-mono px-2 py-0.5 rounded-lg ${
                              row.churn >= 85 ? "text-destructive/70 bg-destructive/5"
                              : row.churn >= 70 ? "text-warning/70 bg-warning/5"
                              : "text-success/70 bg-success/5"
                            }`}>{row.churn}</span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* AI suggestion — whispered */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-4 pt-4 border-t border-border/10"
                >
                  <div className="flex items-start gap-3">
                    <Wand2 className="w-3.5 h-3.5 text-primary/30 mt-0.5 flex-shrink-0" />
                    <p className="text-[12px] text-muted-foreground/60 leading-relaxed font-light">
                      Manufacturing e Technology concentrano il 67% del rischio. 6 partner con score ≥85 generano €1.1M. Posso preparare una campagna re-engagement differenziata.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── AGENTS — choreography, not console ─── */}
        <AnimatePresence>
          {showAgents && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 220 }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.4, ease }}
              className="overflow-hidden flex-shrink-0"
            >
              <div className="w-[220px] h-full p-4 flex flex-col">
                <p className="section-label mb-4">Agenti</p>
                <div className="space-y-1.5">
                  {agentActivity.map((a, i) => (
                    <motion.div
                      key={a.agent}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, ease }}
                      className="flex items-center gap-2.5 py-2 px-2 rounded-xl hover:bg-secondary/5 transition-colors duration-300"
                    >
                      <div className="flex-shrink-0">
                        {a.status === "done" ? (
                          <CheckCircle2 className="w-3 h-3 text-success/40" />
                        ) : a.status === "running" ? (
                          <Loader2 className="w-3 h-3 text-primary/40 animate-spin" />
                        ) : a.status === "monitoring" ? (
                          <Eye className="w-3 h-3 text-primary/20" />
                        ) : (
                          <Clock className="w-3 h-3 text-muted-foreground/20" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-light truncate">{a.agent}</div>
                        <div className="text-[9px] text-muted-foreground/30 truncate">{a.task}</div>
                      </div>
                      {a.time && <span className="text-[9px] text-muted-foreground/20 font-mono">{a.time}</span>}
                    </motion.div>
                  ))}
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
