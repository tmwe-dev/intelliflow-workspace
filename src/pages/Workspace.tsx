import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, MicOff, Wand2 } from "lucide-react";
import AiEntity from "@/components/ai/AiEntity";
import ApprovalPanel from "@/components/workspace/ApprovalPanel";
import ExecutionFlow, { type ExecutionStep } from "@/components/workspace/ExecutionFlow";
import { TableCanvas, CampaignCanvas, ReportCanvas, ResultCanvas } from "@/components/workspace/CanvasViews";

const ease = [0.2, 0.8, 0.2, 1] as const;

/* ─── Types ─── */
interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  agentName?: string;
  thinking?: boolean;
  meta?: string; // small contextual line
}

type CanvasType = "table" | "campaign" | "report" | "result" | null;
type FlowPhase = "idle" | "thinking" | "proposal" | "approval" | "executing" | "done";

/* ─── Demo Data ─── */
const tableData = [
  { name: "Pinnacle Srl", sector: "Manufacturing", revenue: "€129k", days: "120", churn: 91 },
  { name: "Acme Corporation", sector: "Technology", revenue: "€234k", days: "112", churn: 89 },
  { name: "Orion Tech", sector: "Technology", revenue: "€118k", days: "105", churn: 85 },
  { name: "TechnoSteel Srl", sector: "Manufacturing", revenue: "€187k", days: "98", churn: 82 },
  { name: "Meridian Group", sector: "Consulting", revenue: "€156k", days: "95", churn: 76 },
  { name: "Nova Industries", sector: "Manufacturing", revenue: "€143k", days: "93", churn: 71 },
];

const agentDots = [
  { agent: "Orchestratore", status: "done" },
  { agent: "CRM Core", status: "done" },
  { agent: "Data Analyst", status: "done" },
  { agent: "Canvas", status: "done" },
  { agent: "Communication", status: "running" },
  { agent: "Governance", status: "monitoring" },
];

const quickPrompts = [
  "Mostrami i clienti a rischio churn",
  "Prepara una campagna per 50 lead inattivi",
  "Genera un report executive sui partner Asia",
];

/* ─── Demo Scenarios ─── */
interface Scenario {
  assistantMessages: { content: string; agentName: string; meta?: string }[];
  canvas: CanvasType;
  approval?: { title: string; description: string; details: { label: string; value: string }[] };
  executionSteps?: ExecutionStep[];
  resultCanvas?: CanvasType;
}

const scenarios: Record<string, Scenario> = {
  churn: {
    assistantMessages: [
      {
        content: "Ho trovato 34 clienti inattivi per un totale di €4.2M di fatturato esposto.\n\nIl churn score medio è 76/100 — livello critico. 6 aziende con score ≥85 richiedono intervento immediato.",
        agentName: "Orchestratore",
        meta: "CRM Core · Data Analyst · 4 agenti coinvolti",
      },
    ],
    canvas: "table",
  },
  campaign: {
    assistantMessages: [
      {
        content: "Ho selezionato 50 lead inattivi da più di 90 giorni con fatturato storico >€50k.\n\nHo preparato una campagna email personalizzata con 3 wave progressive. Ogni messaggio è adattato a settore, storico e profilo del contatto.",
        agentName: "Communication",
        meta: "CRM Core · Communication · Canvas · 5 agenti coinvolti",
      },
    ],
    canvas: "campaign",
    approval: {
      title: "Avviare campagna email?",
      description: "50 email personalizzate inviate in 3 wave progressive nell'arco di 2 ore.",
      details: [
        { label: "Destinatari", value: "50 lead" },
        { label: "Template", value: "Re-engagement personalizzato" },
        { label: "Wave", value: "3 (17 · 17 · 16)" },
        { label: "Tempo stimato", value: "~2 ore" },
      ],
    },
    executionSteps: [
      { label: "Validazione contatti", status: "done", detail: "50/50" },
      { label: "Generazione contenuti personalizzati", status: "done", detail: "50 email" },
      { label: "Invio wave 1", status: "running", detail: "12/17" },
      { label: "Invio wave 2", status: "pending" },
      { label: "Invio wave 3", status: "pending" },
      { label: "Report finale", status: "pending" },
    ],
    resultCanvas: "result",
  },
  report: {
    assistantMessages: [
      {
        content: "Ho analizzato i dati di 23 partner attivi nella regione Asia Pacific.\n\nIl report include performance, rischi e raccomandazioni strategiche. Il formato è pronto per presentazione al board.",
        agentName: "Data Analyst",
        meta: "CRM Core · Data Analyst · Canvas · 4 agenti coinvolti",
      },
    ],
    canvas: "report",
  },
};

function detectScenario(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes("campagna") || lower.includes("email") || lower.includes("lead inattivi")) return "campaign";
  if (lower.includes("report") || lower.includes("partner") || lower.includes("asia")) return "report";
  return "churn";
}

/* ─── Component ─── */
const Workspace = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [micActive, setMicActive] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [canvas, setCanvas] = useState<CanvasType>(null);
  const [flowPhase, setFlowPhase] = useState<FlowPhase>("idle");
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);
  const [execProgress, setExecProgress] = useState(0);
  const [execSteps, setExecSteps] = useState<ExecutionStep[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const isEmpty = messages.length === 0;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const ts = () => new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" });

  const addMessage = useCallback((msg: Omit<Message, "id">) => {
    setMessages((prev) => [...prev, { ...msg, id: Date.now() + Math.random() }]);
  }, []);

  const runFlow = useCallback((scenarioKey: string) => {
    const scenario = scenarios[scenarioKey];
    if (!scenario) return;
    setActiveScenario(scenario);
    setFlowPhase("thinking");

    // Thinking
    addMessage({ role: "assistant", content: "", timestamp: "", thinking: true });

    // Proposal
    setTimeout(() => {
      setMessages((prev) => prev.filter((m) => !m.thinking));
      scenario.assistantMessages.forEach((am) => {
        addMessage({ role: "assistant", content: am.content, timestamp: ts(), agentName: am.agentName, meta: am.meta });
      });
      setCanvas(scenario.canvas);
      setFlowPhase(scenario.approval ? "proposal" : "done");
    }, 2000);
  }, [addMessage]);

  const handleApprove = useCallback(() => {
    if (!activeScenario) return;
    setFlowPhase("executing");
    setCanvas(null);

    addMessage({
      role: "assistant",
      content: "Esecuzione avviata. Monitoro ogni step per te.",
      timestamp: ts(),
      agentName: "Automation",
      meta: "Governance · Audit attivo",
    });

    if (activeScenario.executionSteps) {
      setExecSteps(activeScenario.executionSteps);
      setExecProgress(0);

      // Simulate progress
      const steps = [...activeScenario.executionSteps];
      let progress = 0;
      const interval = setInterval(() => {
        progress += 15;
        if (progress > 100) progress = 100;
        setExecProgress(progress);

        // Update steps
        const updated = steps.map((s, i) => {
          if (progress > (i + 1) * (100 / steps.length)) return { ...s, status: "done" as const, detail: s.detail || "✓" };
          if (progress > i * (100 / steps.length)) return { ...s, status: "running" as const };
          return s;
        });
        setExecSteps(updated);

        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setFlowPhase("done");
            setCanvas(activeScenario.resultCanvas || null);
            addMessage({
              role: "assistant",
              content: "Esecuzione completata con successo. Tutti gli step verificati dal Governance Agent.",
              timestamp: ts(),
              agentName: "Orchestratore",
            });
          }, 600);
        }
      }, 800);
    }
  }, [activeScenario, addMessage]);

  const handleCancel = useCallback(() => {
    setFlowPhase("idle");
    setCanvas(null);
    addMessage({ role: "assistant", content: "Operazione annullata.", timestamp: ts(), agentName: "Orchestratore" });
  }, [addMessage]);

  const sendMessage = (text?: string) => {
    const content = text || input.trim();
    if (!content) return;
    addMessage({ role: "user", content, timestamp: ts() });
    setInput("");
    setCanvas(null);
    setFlowPhase("idle");

    const scenarioKey = detectScenario(content);
    runFlow(scenarioKey);
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

      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 relative z-10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <motion.div className="w-1.5 h-1.5 rounded-full bg-primary/40" animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 3, repeat: Infinity }} />
          <span className="text-[11px] text-muted-foreground/30 font-light tracking-wide">Sessione attiva</span>
          {flowPhase !== "idle" && flowPhase !== "done" && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[9px] text-primary/30 font-mono ml-2">
              {flowPhase === "thinking" ? "ELABORAZIONE" : flowPhase === "proposal" ? "PROPOSTA" : flowPhase === "approval" ? "IN ATTESA" : "ESECUZIONE"}
            </motion.span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {agentDots.map((a) => (
            <motion.div
              key={a.agent}
              className={`w-1.5 h-1.5 rounded-full ${a.status === "done" ? "bg-success/30" : a.status === "running" ? "bg-primary/40" : "bg-muted-foreground/10"}`}
              animate={a.status === "running" ? { opacity: [0.3, 0.8, 0.3] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
              title={a.agent}
            />
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* ─── CONVERSATION ─── */}
        <div className={`flex-1 flex flex-col transition-all duration-700 ease-out ${canvas ? "max-w-[50%]" : ""}`}>
          {isEmpty ? (
            /* Empty state */
            <div className="flex-1 flex flex-col items-center justify-center px-8">
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease }} className="mb-10">
                <AiEntity size="lg" />
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, ease }} className="text-2xl font-extralight tracking-tight text-foreground/70 mb-2">
                Cosa vuoi ottenere?
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-[13px] text-muted-foreground/30 font-light mb-10">
                Descrivi un obiettivo. Il sistema farà il resto.
              </motion.p>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="flex flex-col items-center gap-2">
                {quickPrompts.map((p, i) => (
                  <motion.button
                    key={p}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + i * 0.12, ease }}
                    onClick={() => sendMessage(p)}
                    whileHover={{ x: 4 }}
                    className="text-[12px] px-4 py-2.5 rounded-2xl text-muted-foreground/25 hover:text-muted-foreground/50 hover:bg-secondary/[0.04] transition-all duration-700 text-left"
                  >
                    → {p}
                  </motion.button>
                ))}
              </motion.div>
            </div>
          ) : (
            /* Messages */
            <div className="flex-1 overflow-y-auto px-8 py-6">
              <div className="max-w-xl mx-auto space-y-6">
                {messages.map((msg) => (
                  <AnimatePresence key={msg.id}>
                    {msg.thinking ? (
                      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4, ease }} className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1"><AiEntity size="sm" /></div>
                        <div className="flex items-center gap-2 px-5 py-4">
                          {[0, 1, 2].map((dot) => (
                            <motion.div key={dot} className="w-1.5 h-1.5 rounded-full bg-primary/30" animate={{ opacity: [0.2, 0.7, 0.2], scale: [0.8, 1.1, 0.8] }} transition={{ duration: 1.2, repeat: Infinity, delay: dot * 0.2 }} />
                          ))}
                          <span className="text-[11px] text-muted-foreground/25 ml-2 font-light">Sto elaborando...</span>
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
                          <div className="flex-shrink-0 mt-1"><AiEntity size="sm" pulse={false} /></div>
                        )}
                        <motion.div
                          className={`max-w-[85%] relative ${msg.role === "user" ? "px-5 py-4 rounded-2xl rounded-br-lg" : "px-5 py-4 rounded-2xl rounded-bl-lg"}`}
                          style={{
                            background: msg.role === "assistant" ? "hsl(240 5% 6% / 0.7)" : "hsl(240 5% 8% / 0.4)",
                            border: `1px solid hsl(0 0% 100% / ${msg.role === "assistant" ? "0.05" : "0.03"})`,
                            backdropFilter: "blur(40px)",
                            boxShadow: msg.role === "assistant" ? "0 0 60px hsl(210 100% 66% / 0.03), 0 20px 50px -20px hsl(0 0% 0% / 0.4)" : "none",
                          }}
                        >
                          {msg.agentName && (
                            <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="text-[9px] text-primary/40 font-mono mb-2.5 tracking-[0.2em] uppercase">
                              {msg.agentName}
                            </motion.div>
                          )}
                          <p className="text-[14px] leading-[1.7] whitespace-pre-line font-light text-foreground/85">{msg.content}</p>
                          {msg.meta && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex items-center gap-2 mt-3 pt-2 border-t border-border/[0.04]">
                              <Wand2 className="w-2.5 h-2.5 text-primary/15" />
                              <span className="text-[9px] text-muted-foreground/20 font-light">{msg.meta}</span>
                            </motion.div>
                          )}
                          <span className="text-[9px] text-muted-foreground/15 mt-2 block">{msg.timestamp}</span>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                ))}

                {/* Approval panel — emerges in conversation */}
                {activeScenario?.approval && (flowPhase === "proposal" || flowPhase === "approval") && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                    <ApprovalPanel
                      visible
                      title={activeScenario.approval.title}
                      description={activeScenario.approval.description}
                      details={activeScenario.approval.details}
                      onApprove={handleApprove}
                      onModify={() => {}}
                      onCancel={handleCancel}
                    />
                  </motion.div>
                )}

                {/* Execution flow — emerges in conversation */}
                <ExecutionFlow visible={flowPhase === "executing"} steps={execSteps} progress={execProgress} />

                <div ref={chatEndRef} />
              </div>
            </div>
          )}

          {/* Input */}
          <div className="px-8 pb-20 pt-4">
            <div className="max-w-xl mx-auto">
              <AnimatePresence>
                {micActive && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 32 }} exit={{ opacity: 0, height: 0 }} className="flex items-center gap-[1.5px] justify-center mb-4 overflow-hidden">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <motion.div key={i} className="w-[1px] rounded-full bg-primary/25" animate={{ height: [1, Math.random() * 24 + 2, 1] }} transition={{ duration: 0.8 + Math.random() * 0.4, repeat: Infinity, delay: i * 0.02 }} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                animate={{ boxShadow: inputFocused ? "0 0 0 1px hsl(210 100% 66% / 0.08), 0 0 60px hsl(210 100% 66% / 0.03)" : "0 0 0 0.5px hsl(0 0% 0% / 0.15)" }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 rounded-2xl px-4 py-3"
                style={{ background: "hsl(240 5% 6% / 0.6)", backdropFilter: "blur(40px)", border: "1px solid hsl(0 0% 100% / 0.03)" }}
              >
                <motion.button onClick={() => setMicActive(!micActive)} whileTap={{ scale: 0.9 }} className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-500 flex-shrink-0 ${micActive ? "bg-primary/10 text-primary/60" : "text-muted-foreground/15 hover:text-muted-foreground/30"}`}>
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
                <motion.button onClick={() => sendMessage()} disabled={!input.trim()} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} className="w-9 h-9 rounded-xl flex items-center justify-center bg-primary/8 text-primary/40 hover:bg-primary/12 hover:text-primary/70 transition-all duration-500 disabled:opacity-10">
                  <Send className="w-3.5 h-3.5" />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ─── CANVAS ─── */}
        <AnimatePresence>
          {canvas && (
            <motion.div
              initial={{ opacity: 0, x: 60, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: 60, scale: 0.95, filter: "blur(10px)" }}
              transition={{ duration: 0.7, ease }}
              className="w-[50%] p-4 overflow-y-auto"
            >
              {canvas === "table" && <TableCanvas data={tableData} onClose={() => setCanvas(null)} />}
              {canvas === "campaign" && <CampaignCanvas onClose={() => setCanvas(null)} />}
              {canvas === "report" && <ReportCanvas onClose={() => setCanvas(null)} />}
              {canvas === "result" && <ResultCanvas onClose={() => setCanvas(null)} />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Workspace;
