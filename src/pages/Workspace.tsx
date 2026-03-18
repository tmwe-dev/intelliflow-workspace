import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Mic,
  Bot,
  User,
  Sparkles,
  Table,
  BarChart3,
  FileText,
  Loader2,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Save,
} from "lucide-react";

interface Message {
  id: number;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  agentName?: string;
  canvas?: "table" | "chart" | "report" | null;
}

interface AgentTask {
  id: number;
  agent: string;
  task: string;
  status: "running" | "completed" | "pending";
  time: string;
}

const demoMessages: Message[] = [
  {
    id: 1,
    role: "user",
    content: "Mostrami i clienti con fatturato superiore a 100k che non hanno ordinato negli ultimi 90 giorni",
    timestamp: "14:01",
  },
  {
    id: 2,
    role: "assistant",
    content: "Ho analizzato i database CRM e ordini. Trovati **34 clienti** inattivi con fatturato >100k. Ho generato una vista tabellare con scoring di rischio e trend storico. I 5 clienti più critici sono evidenziati.",
    timestamp: "14:01",
    agentName: "Analista",
    canvas: "table",
  },
];

const demoAgentTasks: AgentTask[] = [
  { id: 1, agent: "Analista", task: "Query su database CRM (PostgreSQL)", status: "completed", time: "14:01:02" },
  { id: 2, agent: "Analista", task: "Cross-reference ordini (MySQL)", status: "completed", time: "14:01:04" },
  { id: 3, agent: "Designer", task: "Generazione vista tabellare", status: "completed", time: "14:01:05" },
  { id: 4, agent: "Reporter", task: "Calcolo scoring churn risk", status: "completed", time: "14:01:06" },
  { id: 5, agent: "Analista", task: "Monitoraggio trend settimanale", status: "running", time: "14:01:08" },
];

const demoTableData = [
  { name: "Acme Corporation", revenue: "€234k", lastOrder: "112 gg", churn: 89, trend: "down" },
  { name: "TechnoSteel Srl", revenue: "€187k", lastOrder: "98 gg", churn: 82, trend: "down" },
  { name: "Meridian Group", revenue: "€156k", lastOrder: "95 gg", churn: 76, trend: "down" },
  { name: "Nova Industries", revenue: "€143k", lastOrder: "93 gg", churn: 71, trend: "stable" },
  { name: "Eureka Solutions", revenue: "€138k", lastOrder: "91 gg", churn: 68, trend: "stable" },
  { name: "Pinnacle Srl", revenue: "€129k", lastOrder: "120 gg", churn: 91, trend: "down" },
  { name: "Orion Tech", revenue: "€118k", lastOrder: "105 gg", churn: 85, trend: "down" },
  { name: "Artemis Labs", revenue: "€112k", lastOrder: "97 gg", churn: 74, trend: "stable" },
];

const Workspace = () => {
  const [messages, setMessages] = useState<Message[]>(demoMessages);
  const [input, setInput] = useState("");
  const [activeCanvas, setActiveCanvas] = useState<"table" | "chart" | "report" | null>("table");
  const [showStream, setShowStream] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: messages.length + 1,
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages([...messages, newMsg]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          role: "assistant",
          content: "Sto elaborando la tua richiesta. Ho avviato l'agente Analista per interrogare le fonti dati connesse e l'agente Designer per preparare la visualizzazione ottimale.",
          timestamp: new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" }),
          agentName: "Orchestratore",
        },
      ]);
    }, 800);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-md bg-primary/15 flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-primary" strokeWidth={1.5} />
          </div>
          <span className="text-sm font-medium">Workspace</span>
          <span className="text-xs text-muted-foreground">· Analisi clienti inattivi</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowStream(!showStream)}
            className="text-xs px-3 py-1.5 rounded-md bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            {showStream ? "Nascondi" : "Mostra"} Stream
          </button>
          <button className="text-xs px-3 py-1.5 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors flex items-center gap-1.5">
            <Save className="w-3 h-3" /> Salva Template
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left: Chat (The Mind) */}
        <div className="w-[35%] min-w-[320px] border-r border-border flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                  </div>
                )}
                <div
                  className={`max-w-[85%] ${
                    msg.role === "user"
                      ? "bg-primary/10 border border-primary/20 rounded-2xl rounded-tr-md px-4 py-3"
                      : "glass-panel-subtle px-4 py-3"
                  }`}
                >
                  {msg.agentName && (
                    <div className="text-[10px] text-primary font-mono mb-1">
                      AGENTE {msg.agentName.toUpperCase()}
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                  <span className="text-[10px] text-muted-foreground mt-1 block">{msg.timestamp}</span>
                </div>
                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.5} />
                  </div>
                )}
              </motion.div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            {/* Voice visualizer placeholder */}
            <div className="flex items-center gap-1 justify-center mb-3 h-6">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-0.5 rounded-full bg-primary/30"
                  animate={{ height: [2, Math.random() * 12 + 2, 2] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.05 }}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
                <Mic className="w-4 h-4" strokeWidth={1.5} />
              </button>
              <div className="flex-1 flex items-center glass-panel-subtle px-3 py-2">
                <input
                  type="text"
                  placeholder="Scrivi un comando o una domanda..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <button
                  onClick={sendMessage}
                  className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Canvas (The Matter) */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Canvas toolbar */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
            <span className="text-[10px] text-muted-foreground font-mono mr-2">VISTA:</span>
            {[
              { key: "table" as const, icon: Table, label: "Tabella" },
              { key: "chart" as const, icon: BarChart3, label: "Grafico" },
              { key: "report" as const, icon: FileText, label: "Report" },
            ].map((v) => (
              <button
                key={v.key}
                onClick={() => setActiveCanvas(v.key)}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md transition-colors ${
                  activeCanvas === v.key
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <v.icon className="w-3 h-3" strokeWidth={1.5} />
                {v.label}
              </button>
            ))}
          </div>

          {/* Canvas content */}
          <div className="flex-1 overflow-y-auto p-6">
            <AnimatePresence mode="wait">
              {activeCanvas === "table" && (
                <motion.div
                  key="table"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {/* KPIs */}
                  <div className="grid grid-cols-4 gap-3 mb-6">
                    {[
                      { label: "Clienti inattivi", value: "34", sub: "ultimi 90gg" },
                      { label: "Fatturato a rischio", value: "€4.2M", sub: "-12% vs Q3" },
                      { label: "Churn score medio", value: "76", sub: "/100" },
                      { label: "Giorni medi inattività", value: "104", sub: "+18 vs Q3" },
                    ].map((kpi) => (
                      <div key={kpi.label} className="glass-panel-subtle p-4">
                        <div className="text-xs text-muted-foreground">{kpi.label}</div>
                        <div className="text-2xl font-medium mt-1">{kpi.value}</div>
                        <div className="text-[11px] text-muted-foreground">{kpi.sub}</div>
                      </div>
                    ))}
                  </div>

                  {/* Table */}
                  <div className="glass-panel overflow-hidden">
                    <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                      <span className="text-xs font-mono text-muted-foreground">CLIENTI INATTIVI · ORDINATI PER CHURN SCORE</span>
                      <span className="text-xs text-primary cursor-pointer">Esporta CSV</span>
                    </div>
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border text-xs text-muted-foreground">
                          <th className="text-left px-4 py-2.5 font-medium">Cliente</th>
                          <th className="text-right px-4 py-2.5 font-medium">Fatturato annuo</th>
                          <th className="text-right px-4 py-2.5 font-medium">Ultimo ordine</th>
                          <th className="text-right px-4 py-2.5 font-medium">Churn score</th>
                          <th className="text-center px-4 py-2.5 font-medium">Trend</th>
                        </tr>
                      </thead>
                      <tbody>
                        {demoTableData.map((row, i) => (
                          <motion.tr
                            key={row.name}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.04 }}
                            className="border-b border-border/50 hover:bg-secondary/20 transition-colors cursor-pointer"
                          >
                            <td className="px-4 py-3 text-sm font-medium">{row.name}</td>
                            <td className="px-4 py-3 text-sm text-right text-muted-foreground">{row.revenue}</td>
                            <td className="px-4 py-3 text-sm text-right text-muted-foreground">{row.lastOrder}</td>
                            <td className="px-4 py-3 text-right">
                              <span
                                className={`text-sm font-mono px-2 py-0.5 rounded ${
                                  row.churn >= 80
                                    ? "bg-destructive/15 text-destructive"
                                    : row.churn >= 70
                                    ? "bg-warning/15 text-warning"
                                    : "bg-success/15 text-success"
                                }`}
                              >
                                {row.churn}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              {row.trend === "down" ? (
                                <TrendingDown className="w-4 h-4 text-destructive inline" />
                              ) : (
                                <TrendingUp className="w-4 h-4 text-muted-foreground inline" />
                              )}
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeCanvas === "chart" && (
                <motion.div
                  key="chart"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="glass-panel p-6"
                >
                  <div className="text-xs font-mono text-muted-foreground mb-4">ANDAMENTO CHURN SCORE · ULTIMI 6 MESI</div>
                  <div className="h-64 flex items-end gap-3 px-4">
                    {["Ago", "Set", "Ott", "Nov", "Dic", "Gen"].map((month, i) => {
                      const height = [45, 52, 58, 65, 72, 76][i];
                      return (
                        <div key={month} className="flex-1 flex flex-col items-center gap-2">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                            className={`w-full rounded-t-md ${
                              height >= 70 ? "bg-destructive/40" : height >= 60 ? "bg-warning/40" : "bg-primary/30"
                            }`}
                          />
                          <span className="text-[10px] text-muted-foreground">{month}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-6 text-sm text-muted-foreground">
                    <p>Il churn score medio è aumentato del <span className="text-destructive font-medium">+31 punti</span> negli ultimi 6 mesi. Trend critico su 3 segmenti principali.</p>
                  </div>
                </motion.div>
              )}

              {activeCanvas === "report" && (
                <motion.div
                  key="report"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="glass-panel p-8 max-w-3xl mx-auto"
                >
                  <div className="text-[10px] font-mono text-primary mb-6">REPORT GENERATO · STILE EXECUTIVE</div>
                  <h2 className="text-2xl font-medium mb-2 tracking-tight">Analisi Clienti Inattivi Q4 2024</h2>
                  <p className="text-sm text-muted-foreground mb-8">Report automatico · Generato il 18 Marzo 2026</p>

                  <div className="space-y-6 text-sm leading-relaxed text-secondary-foreground">
                    <div>
                      <h3 className="text-base font-medium mb-2 text-foreground">Sintesi Esecutiva</h3>
                      <p>L'analisi ha identificato <strong>34 clienti</strong> con fatturato annuo superiore a €100.000 che non hanno effettuato ordini negli ultimi 90 giorni. Il fatturato aggregato a rischio ammonta a <strong>€4.2M</strong>, con un incremento del 12% rispetto al trimestre precedente.</p>
                    </div>
                    <div>
                      <h3 className="text-base font-medium mb-2 text-foreground">Evidenze Principali</h3>
                      <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                        <li>Il churn score medio è salito a 76/100, livello di attenzione critica</li>
                        <li>I settori più colpiti sono Manufacturing (14 clienti) e Tech (9 clienti)</li>
                        <li>Il tempo medio di inattività è 104 giorni, +18 rispetto al Q3</li>
                        <li>6 clienti con fatturato {'>'} €200k sono nel segmento critico (score {'>'} 85)</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-base font-medium mb-2 text-foreground">Raccomandazioni</h3>
                      <p>Si consiglia l'attivazione immediata di una campagna di re-engagement personalizzata per i 6 clienti critici e un programma di retention strutturato per i restanti 28.</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Agent stream (collapsible) */}
        <AnimatePresence>
          {showStream && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
              className="border-l border-border overflow-hidden flex-shrink-0"
            >
              <div className="w-[280px] h-full flex flex-col">
                <div className="px-4 py-3 border-b border-border">
                  <span className="text-[10px] font-mono text-muted-foreground">ACTIVITY STREAM</span>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
                  {demoAgentTasks.map((task, i) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-2 p-2 rounded-md hover:bg-secondary/20 transition-colors"
                    >
                      {task.status === "running" ? (
                        <Loader2 className="w-3.5 h-3.5 text-primary animate-spin mt-0.5 flex-shrink-0" />
                      ) : task.status === "completed" ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-success mt-0.5 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      )}
                      <div className="min-w-0">
                        <div className="text-[11px] font-medium truncate">{task.task}</div>
                        <div className="text-[10px] text-muted-foreground font-mono">
                          {task.agent} · {task.time}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom padding for dock */}
      <div className="h-20" />
    </div>
  );
};

export default Workspace;
