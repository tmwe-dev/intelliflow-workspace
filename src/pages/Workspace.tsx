import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Mic, MicOff, Wand2, X, ThumbsUp, Download, CheckCircle2, Loader2, Eye, Command,
} from "lucide-react";
import AiEntity from "@/components/ai/AiEntity";

const ease = [0.2, 0.8, 0.2, 1] as const;

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  agentName?: string;
  canvas?: "table" | "chart" | "report";
  thinking?: boolean;
}

const initialMessages: Message[] = [];

const tableData = [
  { name: "Pinnacle Srl", sector: "Manufacturing", revenue: "€129k", days: "120", churn: 91 },
  { name: "Acme Corporation", sector: "Technology", revenue: "€234k", days: "112", churn: 89 },
  { name: "Orion Tech", sector: "Technology", revenue: "€118k", days: "105", churn: 85 },
  { name: "TechnoSteel Srl", sector: "Manufacturing", revenue: "€187k", days: "98", churn: 82 },
  { name: "Meridian Group", sector: "Consulting", revenue: "€156k", days: "95", churn: 76 },
  { name: "Nova Industries", sector: "Manufacturing", revenue: "€143k", days: "93", churn: 71 },
];

const agentActivity = [
  { agent: "Orchestratore", task: "Coordinamento", status: "done" },
  { agent: "CRM Core", task: "Query dati", status: "done" },
  { agent: "Data Analyst", task: "Scoring ML", status: "done" },
  { agent: "Canvas", task: "Vista generata", status: "done" },
  { agent: "Communication", task: "Template email", status: "running" },
  { agent: "Governance", task: "Audit", status: "monitoring" },
];

const quickPrompts = [
  "Mostrami i clienti a rischio",
  "Genera un report executive",
  "Prepara una campagna email",
];

const Workspace = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [micActive, setMicActive] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const isEmpty = messages.length === 0;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text?: string) => {
    const content = text || input.trim();
    if (!content) return;
    const ts = new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" });

    setMessages((prev) => [...prev, { id: Date.now(), role: "user", content, timestamp: ts }]);
    setInput("");

    // Thinking indicator
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "assistant", content: "", timestamp: "", thinking: true },
      ]);
    }, 300);

    // Response
    setTimeout(() => {
      setMessages((prev) => {
        const filtered = prev.filter((m) => !m.thinking);
        return [
          ...filtered,
          {
            id: Date.now() + 2,
            role: "assistant",
            content:
              "Ho trovato 34 clienti inattivi per un totale di €4.2M di fatturato esposto. Il churn score medio è 76/100 — livello critico.\n\n6 aziende con score ≥85 richiedono intervento immediato.",
            timestamp: new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" }),
            agentName: "Orchestratore",
            canvas: "table",
          },
        ];
      });
      setShowCanvas(true);
    }, 2200);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden relative">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full"
          style={{ background: "radial-gradient(circle, hsl(210 100% 66% / 0.012), transparent 70%)" }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Top bar — ghost */}
      <div className="flex items-center justify-between px-6 py-3 relative z-10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-primary/40"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <span className="text-[11px] text-muted-foreground/30 font-light tracking-wide">Sessione attiva</span>
        </div>
        {/* Subtle agent indicators */}
        <div className="flex items-center gap-1">
          {agentActivity.map((a) => (
            <motion.div
              key={a.agent}
              className={`w-1.5 h-1.5 rounded-full ${
                a.status === "done" ? "bg-success/30" : a.status === "running" ? "bg-primary/40" : "bg-muted-foreground/10"
              }`}
              animate={a.status === "running" ? { opacity: [0.3, 0.8, 0.3] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
              title={`${a.agent}: ${a.task}`}
            />
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* ─── CONVERSATION ─── */}
        <div className={`flex-1 flex flex-col transition-all duration-700 ease-out ${showCanvas ? "max-w-[50%]" : ""}`}>
          {/* Empty state — the soul of the product */}
          {isEmpty ? (
            <div className="flex-1 flex flex-col items-center justify-center px-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease }}
                className="mb-10"
              >
                <AiEntity size="lg" />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease }}
                className="text-2xl font-extralight tracking-tight text-foreground/70 mb-2"
              >
                Cosa vuoi ottenere?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-[13px] text-muted-foreground/30 font-light mb-10"
              >
                Descrivi un obiettivo. Il sistema farà il resto.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex flex-wrap justify-center gap-2"
              >
                {quickPrompts.map((p, i) => (
                  <motion.button
                    key={p}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + i * 0.1, ease }}
                    onClick={() => sendMessage(p)}
                    className="text-[12px] px-4 py-2 rounded-2xl text-muted-foreground/25 hover:text-muted-foreground/50 hover:bg-secondary/[0.04] transition-all duration-700"
                  >
                    {p}
                  </motion.button>
                ))}
              </motion.div>
            </div>
          ) : (
            /* Messages */
            <div className="flex-1 overflow-y-auto px-8 py-6">
              <div className="max-w-xl mx-auto space-y-8">
                {messages.map((msg) => (
                  <AnimatePresence key={msg.id}>
                    {msg.thinking ? (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, ease }}
                        className="flex items-start gap-3"
                      >
                        <div className="flex-shrink-0 mt-1">
                          <AiEntity size="sm" />
                        </div>
                        <div className="flex items-center gap-2 px-5 py-4">
                          <motion.div
                            className="flex gap-1"
                          >
                            {[0, 1, 2].map((dot) => (
                              <motion.div
                                key={dot}
                                className="w-1.5 h-1.5 rounded-full bg-primary/30"
                                animate={{ opacity: [0.2, 0.7, 0.2], scale: [0.8, 1.1, 0.8] }}
                                transition={{ duration: 1.2, repeat: Infinity, delay: dot * 0.2 }}
                              />
                            ))}
                          </motion.div>
                          <span className="text-[11px] text-muted-foreground/25 ml-2 font-light">
                            Sto elaborando...
                          </span>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.6, ease }}
                        className={`flex items-start gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
                      >
                        {msg.role === "assistant" && (
                          <div className="flex-shrink-0 mt-1">
                            <AiEntity size="sm" pulse={false} />
                          </div>
                        )}
                        <motion.div
                          initial={{ backdropFilter: "blur(0px)" }}
                          animate={{ backdropFilter: "blur(40px)" }}
                          transition={{ duration: 0.8 }}
                          className={`max-w-[85%] relative ${
                            msg.role === "user"
                              ? "px-5 py-4 rounded-2xl rounded-br-lg"
                              : "px-5 py-4 rounded-2xl rounded-bl-lg"
                          }`}
                          style={{
                            background: msg.role === "assistant"
                              ? "hsl(240 5% 6% / 0.7)"
                              : "hsl(240 5% 8% / 0.4)",
                            border: `1px solid hsl(0 0% 100% / ${msg.role === "assistant" ? "0.05" : "0.03"})`,
                            boxShadow: msg.role === "assistant"
                              ? "0 0 60px hsl(210 100% 66% / 0.03), 0 20px 50px -20px hsl(0 0% 0% / 0.4)"
                              : "none",
                          }}
                        >
                          {msg.agentName && (
                            <motion.div
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2, duration: 0.4 }}
                              className="text-[9px] text-primary/40 font-mono mb-2.5 tracking-[0.2em] uppercase"
                            >
                              {msg.agentName}
                            </motion.div>
                          )}
                          <p className="text-[14px] leading-[1.7] whitespace-pre-line font-light text-foreground/85">
                            {msg.content}
                          </p>
                          <span className="text-[9px] text-muted-foreground/20 mt-3 block">{msg.timestamp}</span>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                ))}
                <div ref={chatEndRef} />
              </div>
            </div>
          )}

          {/* Input — the command line of the future */}
          <div className="px-8 pb-20 pt-4">
            <div className="max-w-xl mx-auto">
              {/* Voice bars — dormant until activated */}
              <AnimatePresence>
                {micActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 32 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-[1.5px] justify-center mb-4 overflow-hidden"
                  >
                    {Array.from({ length: 40 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-[1px] rounded-full bg-primary/25"
                        animate={{ height: [1, Math.random() * 24 + 2, 1] }}
                        transition={{ duration: 0.8 + Math.random() * 0.4, repeat: Infinity, delay: i * 0.02 }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                animate={{
                  boxShadow: inputFocused
                    ? "0 0 0 1px hsl(210 100% 66% / 0.08), 0 0 60px hsl(210 100% 66% / 0.03)"
                    : "0 0 0 0.5px hsl(0 0% 0% / 0.15)",
                }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 rounded-2xl px-4 py-3"
                style={{
                  background: "hsl(240 5% 6% / 0.6)",
                  backdropFilter: "blur(40px)",
                  border: "1px solid hsl(0 0% 100% / 0.03)",
                }}
              >
                <motion.button
                  onClick={() => setMicActive(!micActive)}
                  whileTap={{ scale: 0.9 }}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-500 flex-shrink-0 ${
                    micActive ? "bg-primary/10 text-primary/60" : "text-muted-foreground/15 hover:text-muted-foreground/30"
                  }`}
                >
                  {micActive ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </motion.button>
                <input
                  type="text"
                  placeholder="Scrivi un obiettivo..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-muted-foreground/20 font-light text-foreground/90"
                />
                <motion.button
                  onClick={() => sendMessage()}
                  disabled={!input.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center bg-primary/8 text-primary/40 hover:bg-primary/12 hover:text-primary/70 transition-all duration-500 disabled:opacity-10"
                >
                  <Send className="w-3.5 h-3.5" />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ─── CANVAS — materializes like magic ─── */}
        <AnimatePresence>
          {showCanvas && (
            <motion.div
              initial={{ opacity: 0, x: 60, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: 60, scale: 0.95, filter: "blur(10px)" }}
              transition={{ duration: 0.7, ease }}
              className="w-[50%] p-4 overflow-y-auto"
            >
              <motion.div
                className="h-full flex flex-col rounded-2xl p-6"
                style={{
                  background: "hsl(240 5% 6% / 0.5)",
                  backdropFilter: "blur(40px) saturate(1.1)",
                  border: "1px solid hsl(0 0% 100% / 0.04)",
                  boxShadow: "0 0 80px hsl(210 100% 66% / 0.02), 0 30px 60px -20px hsl(0 0% 0% / 0.4)",
                }}
              >
                {/* Canvas header */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-between mb-8"
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-primary/40"
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-[10px] text-muted-foreground/30 font-light tracking-wider">
                      GENERATO · PROPOSTA
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-[10px] px-3 py-1.5 rounded-xl text-success/40 hover:text-success/70 hover:bg-success/5 transition-all duration-500 flex items-center gap-1.5"
                    >
                      <ThumbsUp className="w-3 h-3" /> Approva
                    </motion.button>
                    <button className="text-muted-foreground/15 hover:text-muted-foreground/30 transition-colors duration-500 p-1.5">
                      <Download className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => setShowCanvas(false)}
                      className="text-muted-foreground/15 hover:text-muted-foreground/30 transition-colors duration-500 p-1.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>

                {/* KPIs */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                  {[
                    { label: "Clienti a rischio", value: "34" },
                    { label: "Fatturato esposto", value: "€4.2M" },
                    { label: "Score medio", value: "76" },
                  ].map((kpi, i) => (
                    <motion.div
                      key={kpi.label}
                      initial={{ opacity: 0, y: 16, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.12, duration: 0.6, ease }}
                      className="p-4 rounded-xl text-center"
                      style={{
                        background: "hsl(240 5% 7% / 0.4)",
                        border: "1px solid hsl(0 0% 100% / 0.02)",
                      }}
                    >
                      <div className="text-2xl font-extralight tracking-tight text-foreground/80">{kpi.value}</div>
                      <div className="text-[9px] text-muted-foreground/25 mt-1.5 tracking-wider uppercase">{kpi.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Table */}
                <div className="flex-1 overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="text-[9px] text-muted-foreground/25 font-mono tracking-wider">
                        <th className="text-left pb-4 font-normal">COMPANY</th>
                        <th className="text-left pb-4 font-normal">SETTORE</th>
                        <th className="text-right pb-4 font-normal">FATTURATO</th>
                        <th className="text-right pb-4 font-normal">GG</th>
                        <th className="text-right pb-4 font-normal">SCORE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((row, i) => (
                        <motion.tr
                          key={row.name}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + i * 0.07, duration: 0.4, ease }}
                          className="border-t border-border/[0.06] group cursor-pointer"
                        >
                          <td className="py-3.5 text-[13px] font-light text-foreground/60 group-hover:text-primary/70 transition-colors duration-500">{row.name}</td>
                          <td className="py-3.5 text-[11px] text-muted-foreground/25">{row.sector}</td>
                          <td className="py-3.5 text-[13px] text-right font-mono text-muted-foreground/40">{row.revenue}</td>
                          <td className="py-3.5 text-[12px] text-right text-muted-foreground/25">{row.days}</td>
                          <td className="py-3.5 text-right">
                            <span className={`text-[11px] font-mono px-2 py-0.5 rounded-lg ${
                              row.churn >= 85 ? "text-destructive/50 bg-destructive/[0.04]"
                              : row.churn >= 70 ? "text-warning/50 bg-warning/[0.04]"
                              : "text-success/50 bg-success/[0.04]"
                            }`}>{row.churn}</span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* AI insight */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                  className="mt-6 pt-5 border-t border-border/[0.04]"
                >
                  <div className="flex items-start gap-3">
                    <Wand2 className="w-3 h-3 text-primary/20 mt-0.5 flex-shrink-0" />
                    <p className="text-[11px] text-muted-foreground/30 leading-relaxed font-light">
                      Manufacturing e Technology concentrano il 67% del rischio. Posso preparare una campagna re-engagement differenziata per settore.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Workspace;
