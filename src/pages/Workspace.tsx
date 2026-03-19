import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, MicOff, Wand2, Volume2, VolumeX } from "lucide-react";
import AiEntity from "@/components/ai/AiEntity";
import ApprovalPanel from "@/components/workspace/ApprovalPanel";
import ExecutionFlow, { type ExecutionStep } from "@/components/workspace/ExecutionFlow";
import ToolActivationBar from "@/components/workspace/ToolActivationBar";
import VoicePresence from "@/components/workspace/VoicePresence";
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
  meta?: string;
  tools?: string[];
}

type CanvasType = "table" | "campaign" | "report" | "result" | null;
type FlowPhase = "idle" | "thinking" | "proposal" | "approval" | "executing" | "done";

/* ─── Realistic Demo Data ─── */
const tableData = [
  { name: "TechBridge Japan", sector: "Technology", revenue: "€412k", days: "98", churn: 91 },
  { name: "Meridian Asia Pacific", sector: "Consulting", revenue: "€234k", days: "112", churn: 89 },
  { name: "SteelForge Srl", sector: "Manufacturing", revenue: "€187k", days: "105", churn: 85 },
  { name: "NovaPharma Group", sector: "Healthcare", revenue: "€156k", days: "93", churn: 82 },
  { name: "Apex Financial", sector: "Finance", revenue: "€298k", days: "88", churn: 76 },
  { name: "Orion Logistics", sector: "Logistics", revenue: "€143k", days: "120", churn: 71 },
];

const agentDots = [
  { agent: "Orchestratore", status: "done" },
  { agent: "CRM Core", status: "done" },
  { agent: "Data Analyst", status: "done" },
  { agent: "Communication", status: "running" },
  { agent: "Voice", status: "monitoring" },
  { agent: "Automation", status: "done" },
  { agent: "Governance", status: "monitoring" },
];

const quickPrompts = [
  "Trova partner Asia unendo WCA + contatti + report",
  "Campagna per 50 lead importati con deep search",
  "10 bozze email da business card e CRM",
  "Report executive partner Asia cross-source",
];

/* ─── Scenarios ─── */
interface Scenario {
  key: string;
  assistantMessages: { content: string; agentName: string; meta?: string }[];
  canvas: CanvasType;
  approval?: { title: string; description: string; details: { label: string; value: string }[] };
  executionSteps?: ExecutionStep[];
  resultCanvas?: CanvasType;
}

const scenarios: Record<string, Scenario> = {
  churn: {
    key: "churn",
    assistantMessages: [{
      content: "Ho incrociato 3 sorgenti dati: WCA Partner Network (234 partner), contatti importati (12.847) e company report (89).\n\nIl Source Unification Layer ha deduplicato e arricchito i profili cross-source. Il churn scoring ML ha identificato 6 account critici (score ≥85).\n\nOrigini dati: WCA Network → 4 partner, Contact Import → 18 contatti, Company Reports → 3 analisi settoriali, Deep Search → 12 record arricchiti.",
      agentName: "Orchestratore",
      meta: "Source Unification · CRM Core · Data Analyst · Deep Search · 4 agenti · 1.7s",
    }],
    canvas: "table",
  },
  campaign: {
    key: "campaign",
    assistantMessages: [{
      content: "Ho unificato lead da 3 fonti: contatti importati (32), WCA network (11), business card archive (7). Dopo deduplicazione: 50 profili unici.\n\nOgni bozza è personalizzata con dati cross-source: nome, azienda, settore, storico da CRM, note da business card, insight da company report.\n\nTemplate base: Re-engagement Q1. Invio in 3 wave progressive.",
      agentName: "Communication",
      meta: "Source Unification · Contact Import · WCA · Business Card · Email Drafting · 5 agenti · 3.2s",
    }],
    canvas: "campaign",
    approval: {
      title: "Avviare campagna email?",
      description: "50 email personalizzate generate dal Communication Agent. Ogni bozza è stata verificata dal Governance Agent.",
      details: [
        { label: "Sorgente contatti", value: "CRM Import · Network" },
        { label: "Bozze generate", value: "50 email personalizzate" },
        { label: "Template base", value: "Re-engagement Q1" },
        { label: "Wave", value: "3 (17 · 17 · 16)" },
        { label: "Governance check", value: "✓ Approvato" },
      ],
    },
    executionSteps: [
      { label: "Validazione contatti su CRM Core", status: "done", detail: "50/50 ✓" },
      { label: "Generazione bozze personalizzate", status: "done", detail: "50 email" },
      { label: "Governance check — policy email", status: "done", detail: "Conforme" },
      { label: "Invio wave 1 via Email Engine", status: "running", detail: "12/17" },
      { label: "Invio wave 2", status: "pending" },
      { label: "Invio wave 3", status: "pending" },
      { label: "Report esecuzione + audit log", status: "pending" },
    ],
    resultCanvas: "result",
  },
  report: {
    key: "report",
    assistantMessages: [{
      content: "Ho analizzato dati cross-source per 23 partner Asia Pacific.\n\nFonti unite: WCA Network (partner profiles), Contact Import (storico interazioni), Company Reports (analisi finanziarie), Activity DB (timeline operativa), Deep Search (dati arricchiti).\n\nIl report include performance per mercato con provenance delle sorgenti, analisi rischi e 3 raccomandazioni strategiche.",
      agentName: "Data Analyst",
      meta: "Source Unification · WCA · Company Reports · Activity DB · Canvas · 4 agenti · 2.8s",
    }],
    canvas: "report",
  },
  email: {
    key: "email",
    assistantMessages: [{
      content: "Ho generato 10 bozze email personalizzate incrociando dati da business card archive (6 contatti), CRM Core (4 contatti) e note da workspace.\n\nOgni bozza usa contesto cross-source: nome da business card, azienda da CRM, storico da Activity DB, insight da company report.\n\nLe bozze sono nel workspace Email Drafts.",
      agentName: "Communication",
      meta: "Business Card · CRM Core · Activity DB · Email Drafting · 3 agenti · 1.9s",
    }],
    canvas: null,
  },
};

function detectScenario(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes("campagna") || lower.includes("lead")) return "campaign";
  if (lower.includes("report") || lower.includes("partner") || lower.includes("asia") || lower.includes("board")) return "report";
  if (lower.includes("bozze") || lower.includes("email") || lower.includes("draft")) return "email";
  return "churn";
}

/* ─── Component ─── */
const Workspace = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [micActive, setMicActive] = useState(false);
  const [voiceSpeaking, setVoiceSpeaking] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [canvas, setCanvas] = useState<CanvasType>(null);
  const [flowPhase, setFlowPhase] = useState<FlowPhase>("idle");
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);
  const [activeScenarioKey, setActiveScenarioKey] = useState<string | null>(null);
  const [showTools, setShowTools] = useState(false);
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
    setActiveScenarioKey(scenarioKey);
    setFlowPhase("thinking");
    setShowTools(true);

    addMessage({ role: "assistant", content: "", timestamp: "", thinking: true });

    setTimeout(() => {
      setMessages((prev) => prev.filter((m) => !m.thinking));
      scenario.assistantMessages.forEach((am) => {
        addMessage({ role: "assistant", content: am.content, timestamp: ts(), agentName: am.agentName, meta: am.meta });
      });
      setCanvas(scenario.canvas);
      setFlowPhase(scenario.approval ? "proposal" : "done");
    }, 2200);
  }, [addMessage]);

  const handleApprove = useCallback(() => {
    if (!activeScenario) return;
    setFlowPhase("executing");
    setCanvas(null);

    addMessage({
      role: "assistant",
      content: "Esecuzione avviata. Automation Agent coordina gli step. Governance Agent monitora ogni operazione.",
      timestamp: ts(),
      agentName: "Automation",
      meta: "Execution Engine · Governance · Audit Trail · attivo",
    });

    if (activeScenario.executionSteps) {
      setExecSteps(activeScenario.executionSteps);
      setExecProgress(0);
      const steps = [...activeScenario.executionSteps];
      let progress = 0;
      const interval = setInterval(() => {
        progress += 12;
        if (progress > 100) progress = 100;
        setExecProgress(progress);
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
            setShowTools(false);
            addMessage({
              role: "assistant",
              content: "Esecuzione completata. Tutti gli step verificati dal Governance Agent. Audit log aggiornato.\n\nVuoi salvare questo flusso come template operativo?",
              timestamp: ts(),
              agentName: "Orchestratore",
            });
          }, 600);
        }
      }, 700);
    }
  }, [activeScenario, addMessage]);

  const handleCancel = useCallback(() => {
    setFlowPhase("idle");
    setCanvas(null);
    setShowTools(false);
    addMessage({ role: "assistant", content: "Operazione annullata. Nessuna azione eseguita.", timestamp: ts(), agentName: "Orchestratore" });
  }, [addMessage]);

  const sendMessage = (text?: string) => {
    const content = text || input.trim();
    if (!content) return;
    addMessage({ role: "user", content, timestamp: ts() });
    setInput("");
    setCanvas(null);
    setFlowPhase("idle");
    setShowTools(false);
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
        <div className="flex items-center gap-2">
          {/* Agent dots */}
          <div className="flex items-center gap-1 mr-2">
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
          {/* System stats — whispered */}
          <span className="text-[8px] text-muted-foreground/12 font-mono tracking-wider">12.8k contatti · 234 partner · 7 agenti</span>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* ─── CONVERSATION ─── */}
        <div className={`flex-1 flex flex-col transition-all duration-700 ease-out ${canvas ? "max-w-[50%]" : ""}`}>
          {isEmpty ? (
            <div className="flex-1 flex flex-col items-center justify-center px-8">
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease }} className="mb-10">
                <AiEntity size="lg" />
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, ease }} className="text-2xl font-extralight tracking-tight text-foreground/70 mb-2">
                Cosa vuoi ottenere?
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-[13px] text-muted-foreground/30 font-light mb-10 text-center max-w-sm">
                Accesso a 12.847 contatti, 234 partner, campagne, documenti, email e memoria AI.
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
              {/* Subtle capability hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-12"
              >
                {["Partner Intelligence", "Email Drafting", "Voice AI", "Deep Search", "Campaign Engine"].map((cap, i) => (
                  <motion.span
                    key={cap}
                    className="text-[9px] text-muted-foreground/12 font-light"
                    animate={{ opacity: [0.08, 0.18, 0.08] }}
                    transition={{ duration: 4, repeat: Infinity, delay: i * 0.7 }}
                  >
                    {cap}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto px-8 py-6">
              <div className="max-w-xl mx-auto space-y-6">
                {/* Tool activation bar */}
                <ToolActivationBar scenarioKey={activeScenarioKey} visible={showTools && flowPhase !== "idle"} />

                {messages.map((msg) => (
                  <AnimatePresence key={msg.id}>
                    {msg.thinking ? (
                      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4, ease }} className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1"><AiEntity size="sm" /></div>
                        <div className="flex items-center gap-2 px-5 py-4">
                          {[0, 1, 2].map((dot) => (
                            <motion.div key={dot} className="w-1.5 h-1.5 rounded-full bg-primary/30" animate={{ opacity: [0.2, 0.7, 0.2], scale: [0.8, 1.1, 0.8] }} transition={{ duration: 1.2, repeat: Infinity, delay: dot * 0.2 }} />
                          ))}
                          <span className="text-[11px] text-muted-foreground/25 ml-2 font-light">Interrogo il sistema...</span>
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
                              <span className="text-[9px] text-muted-foreground/20 font-light font-mono">{msg.meta}</span>
                            </motion.div>
                          )}
                          <span className="text-[9px] text-muted-foreground/15 mt-2 block">{msg.timestamp}</span>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                ))}

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

                <ExecutionFlow visible={flowPhase === "executing"} steps={execSteps} progress={execProgress} />

                <div ref={chatEndRef} />
              </div>
            </div>
          )}

          {/* Voice presence */}
          <VoicePresence active={micActive} listening={micActive && !voiceSpeaking} speaking={voiceSpeaking} />

          {/* Input */}
          <div className="px-8 pb-20 pt-2">
            <div className="max-w-xl mx-auto">
              <motion.div
                animate={{ boxShadow: inputFocused ? "0 0 0 1px hsl(210 100% 66% / 0.08), 0 0 60px hsl(210 100% 66% / 0.03)" : "0 0 0 0.5px hsl(0 0% 0% / 0.15)" }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 rounded-2xl px-4 py-3"
                style={{ background: "hsl(240 5% 6% / 0.6)", backdropFilter: "blur(40px)", border: "1px solid hsl(0 0% 100% / 0.03)" }}
              >
                <motion.button
                  onClick={() => { setMicActive(!micActive); setVoiceSpeaking(false); }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-500 flex-shrink-0 ${micActive ? "bg-primary/10 text-primary/60" : "text-muted-foreground/15 hover:text-muted-foreground/30"}`}
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
                {/* Voice output toggle */}
                <motion.button
                  onClick={() => setVoiceSpeaking(!voiceSpeaking)}
                  whileTap={{ scale: 0.9 }}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-500 flex-shrink-0 ${voiceSpeaking ? "bg-accent/10 text-accent/60" : "text-muted-foreground/10 hover:text-muted-foreground/25"}`}
                  title="Lettura vocale"
                >
                  {voiceSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </motion.button>
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
