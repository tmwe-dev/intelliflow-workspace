import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Plug,
  LayoutTemplate,
  Zap,
  Bot,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Users,
  FileText,
  Activity,
  Clock,
  CheckCircle2,
  Loader2,
} from "lucide-react";

const ease = [0.2, 0.8, 0.2, 1] as const;

const stats = [
  { label: "Conversazioni oggi", value: "12", icon: MessageSquare, trend: "+3 vs ieri" },
  { label: "Agenti attivi", value: "5", icon: Bot, sub: "2 in esecuzione" },
  { label: "Connessioni live", value: "8", icon: Plug, trend: "Tutte sincronizzate" },
  { label: "Task completati", value: "47", icon: CheckCircle2, trend: "+12 vs ieri" },
];

const conversations = [
  { id: 1, title: "Analisi clienti inattivi Q4 — churn scoring", time: "2 ore fa", agent: "Data Analyst", agentEmoji: "📊", status: "completata" },
  { id: 2, title: "Campagna re-engagement 200 lead freddi", time: "5 ore fa", agent: "Comm. Agent", agentEmoji: "📧", status: "in corso" },
  { id: 3, title: "Report executive vendite trimestrali", time: "1 giorno fa", agent: "Canvas Agent", agentEmoji: "🎨", status: "completata" },
  { id: 4, title: "Audit permessi e accessi CRM Salesforce", time: "2 giorni fa", agent: "Compliance", agentEmoji: "🛡️", status: "completata" },
  { id: 5, title: "Confronto inventario SAP vs ordini mensili", time: "3 giorni fa", agent: "Data Analyst", agentEmoji: "📊", status: "completata" },
];

const activeAgents = [
  { name: "Comm. Agent", emoji: "📧", task: "Invio campagna re-engagement (134/200)", status: "running" },
  { name: "Data Analyst", emoji: "📊", task: "Monitoraggio trend churn settimanale", status: "running" },
  { name: "Orchestratore", emoji: "🧠", task: "In attesa di nuovi comandi", status: "idle" },
];

const suggestions = [
  "Mostrami i lead caldi della settimana",
  "Genera un report vendite executive",
  "Chi sono i clienti a rischio churn?",
  "Confronta performance Q3 vs Q4",
  "Quante email sono state inviate oggi?",
  "Crea dashboard KPI real-time",
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-24 px-6 lg:px-10 pt-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center glow-primary">
                <Sparkles className="w-4 h-4 text-primary" strokeWidth={1.5} />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">Buongiorno, Marco</h1>
            </div>
            <p className="text-sm text-muted-foreground ml-12">
              5 agenti operativi · 8 connessioni sincronizzate · 47 task completati oggi
            </p>
          </div>
          <div className="pill-badge">
            <span className="status-dot-active" />
            Sistema operativo
          </div>
        </div>
      </motion.div>

      {/* Command bar */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-10">
        <div
          onClick={() => navigate("/workspace")}
          className="glass-panel p-5 cursor-pointer group hover:border-primary/15 transition-all"
        >
          <div className="flex items-center gap-3 text-muted-foreground group-hover:text-secondary-foreground transition-colors mb-4">
            <MessageSquare className="w-5 h-5 text-primary/50 group-hover:text-primary transition-colors" strokeWidth={1.5} />
            <span className="text-base">Cosa vuoi fare? Scrivi o parla con il tuo workspace...</span>
            <div className="ml-auto flex items-center gap-2">
              <kbd className="text-[10px] px-2 py-0.5 rounded-md glass-panel-subtle text-muted-foreground font-mono">⌘K</kbd>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {suggestions.map((s) => (
              <span key={s} className="text-[11px] px-3 py-1.5 rounded-lg glass-panel-subtle text-muted-foreground hover:text-primary hover:border-primary/15 transition-all cursor-pointer">
                "{s}"
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.05, ease }}
            className="glass-panel p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center">
                <stat.icon className="w-4 h-4 text-primary/70" strokeWidth={1.5} />
              </div>
            </div>
            <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
            <div className="text-[11px] text-muted-foreground mt-1">{stat.label}</div>
            {stat.trend && <div className="text-[10px] text-success mt-1">{stat.trend}</div>}
            {stat.sub && <div className="text-[10px] text-primary mt-1">{stat.sub}</div>}
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent conversations */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-label">Conversazioni recenti</h2>
            <button className="text-[11px] text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
              Vedi tutte <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-2">
            {conversations.map((conv, i) => (
              <motion.div
                key={conv.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.04, ease }}
                onClick={() => navigate("/workspace")}
                className="glass-panel-interactive p-4 flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center text-lg flex-shrink-0">
                  {conv.agentEmoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium group-hover:text-primary transition-colors truncate">{conv.title}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-muted-foreground">{conv.agent} · {conv.time}</span>
                    {conv.status === "in corso" && (
                      <span className="flex items-center gap-1 text-[10px] text-primary">
                        <Loader2 className="w-2.5 h-2.5 animate-spin" /> in corso
                      </span>
                    )}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right sidebar */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-6">
          {/* Active agents */}
          <div>
            <h2 className="section-label mb-3">Agenti attivi</h2>
            <div className="space-y-2">
              {activeAgents.map((agent) => (
                <div key={agent.name} className="glass-panel-subtle p-3 flex items-start gap-3">
                  <span className="text-lg">{agent.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-medium">{agent.name}</div>
                    <div className="text-[11px] text-muted-foreground truncate mt-0.5">{agent.task}</div>
                  </div>
                  {agent.status === "running" && <div className="status-dot-active animate-pulse-glow mt-1.5" />}
                  {agent.status === "idle" && <div className="status-dot w-2 h-2 bg-muted-foreground/30 mt-1.5" />}
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div>
            <h2 className="section-label mb-3">Accesso rapido</h2>
            <div className="space-y-1.5">
              {[
                { icon: Plug, label: "Connessioni", desc: "8 attive", to: "/connections" },
                { icon: LayoutTemplate, label: "Template", desc: "23 salvati", to: "/templates" },
                { icon: Zap, label: "Automazioni", desc: "1 in corso", to: "/automations" },
                { icon: Activity, label: "Audit Log", desc: "Ultime 24h", to: "/audit" },
              ].map((item) => (
                <div
                  key={item.label}
                  onClick={() => navigate(item.to)}
                  className="glass-panel-interactive p-3 flex items-center gap-3 group"
                >
                  <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" strokeWidth={1.5} />
                  <div className="flex-1">
                    <div className="text-[12px] font-medium">{item.label}</div>
                    <div className="text-[10px] text-muted-foreground">{item.desc}</div>
                  </div>
                  <ArrowRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
