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
  Users,
  FileText,
  Activity,
  CheckCircle2,
  Loader2,
  Building2,
  Contact,
  Briefcase,
  Target,
  Mail,
  Shield,
  Database,
  Calendar,
  TrendingUp,
} from "lucide-react";

const ease = [0.2, 0.8, 0.2, 1] as const;

const crmEntities = [
  { icon: Contact, label: "Contacts", count: "24.5k", trend: "+340 questa settimana" },
  { icon: Building2, label: "Companies", count: "3.2k", trend: "+28 nuove" },
  { icon: Briefcase, label: "Partners", count: "148", trend: "12 attivi oggi" },
  { icon: Target, label: "Prospects", count: "8.7k", trend: "234 lead caldi" },
  { icon: Calendar, label: "Activities", count: "45k", trend: "+1.2k questa settimana" },
  { icon: Mail, label: "Campaigns", count: "234", trend: "3 in corso" },
];

const conversations = [
  { id: 1, title: "Analisi churn scoring clienti Q4 — 34 a rischio identificati", time: "2 ore fa", agents: ["🧠", "🏢", "📊", "🎨"], status: "completata", stateFlow: "eseguita" },
  { id: 2, title: "Campagna re-engagement 200 lead — invio in corso (134/200)", time: "5 ore fa", agents: ["🧠", "📧", "⚡", "🛡️"], status: "in corso", stateFlow: "in esecuzione" },
  { id: 3, title: "Report executive vendite trimestrali — partner Asia", time: "1 giorno fa", agents: ["🧠", "🏢", "📊", "🎨"], status: "completata", stateFlow: "approvata" },
  { id: 4, title: "Audit permessi e accessi — 3 policy violations trovate", time: "2 giorni fa", agents: ["🧠", "🛡️"], status: "completata", stateFlow: "eseguita" },
  { id: 5, title: "Sync inventario SAP → DB — 2.500 SKU aggiornati", time: "3 giorni fa", agents: ["🧠", "⚡", "🏢"], status: "completata", stateFlow: "eseguita" },
];

const agents = [
  { emoji: "🧠", name: "Orchestratore", status: "idle", task: "In attesa di nuovi comandi" },
  { emoji: "🏢", name: "CRM Core", status: "idle", task: "Monitoraggio entità attive" },
  { emoji: "📧", name: "Communication", status: "running", task: "Invio campagna (134/200)" },
  { emoji: "📊", name: "Data Analyst", status: "running", task: "Trend churn settimanale" },
  { emoji: "🎨", name: "Canvas", status: "idle", task: "Ultimo render: report Q4" },
  { emoji: "⚡", name: "Automation", status: "idle", task: "1 job completato oggi" },
  { emoji: "🛡️", name: "Governance", status: "running", task: "Monitoraggio audit trail" },
];

const suggestions = [
  "Mostrami i lead inattivi da 90 giorni",
  "Genera report executive vendite Q4",
  "Chi sono i partner più performanti?",
  "Prepara campagna email per 50 prospects",
  "Confronta performance Q3 vs Q4",
  "Salva vista corrente come template",
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-24 px-6 lg:px-10 pt-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center glow-primary">
                <Sparkles className="w-4 h-4 text-primary" strokeWidth={1.5} />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">Buongiorno, Marco</h1>
            </div>
            <p className="text-sm text-muted-foreground ml-12">
              7 agenti operativi · 8 connessioni attive · Core CRM: 24.5k contacts, 3.2k companies
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="pill-badge">
              <span className="status-dot-active" />
              AI Workspace attivo
            </div>
          </div>
        </div>
      </motion.div>

      {/* Command bar */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
        <div
          onClick={() => navigate("/workspace")}
          className="glass-panel p-5 cursor-pointer group hover:border-primary/15 transition-all"
        >
          <div className="flex items-center gap-3 text-muted-foreground group-hover:text-secondary-foreground transition-colors mb-4">
            <MessageSquare className="w-5 h-5 text-primary/50 group-hover:text-primary transition-colors" strokeWidth={1.5} />
            <span className="text-base">Dimmi cosa vuoi fare. L'Orchestratore coordinerà gli agenti per te...</span>
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

      {/* Core CRM Entity bar */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="section-label">CORE ENGINE · ENTITÀ GESTITE</h2>
          <span className="text-[10px] text-muted-foreground font-mono">Layer 1 — invisibile all'utente</span>
        </div>
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-2">
          {crmEntities.map((entity, i) => (
            <motion.div
              key={entity.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.04, ease }}
              className="glass-panel-subtle p-3.5 group hover:border-primary/10 transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <entity.icon className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" strokeWidth={1.5} />
                <span className="text-[11px] font-medium">{entity.label}</span>
              </div>
              <div className="text-xl font-bold tracking-tight">{entity.count}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{entity.trend}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent conversations */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-label">Sessioni recenti</h2>
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
                <div className="flex -space-x-1.5 flex-shrink-0">
                  {conv.agents.map((emoji, j) => (
                    <span key={j} className="text-sm bg-card rounded-full w-7 h-7 flex items-center justify-center border border-border">{emoji}</span>
                  ))}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium group-hover:text-primary transition-colors truncate">{conv.title}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-muted-foreground">{conv.time}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      conv.stateFlow === "in esecuzione" ? "bg-primary/10 text-primary"
                      : conv.stateFlow === "approvata" ? "bg-success/10 text-success"
                      : "bg-secondary text-muted-foreground"
                    }`}>{conv.stateFlow}</span>
                    {conv.status === "in corso" && (
                      <span className="flex items-center gap-1 text-[10px] text-primary">
                        <Loader2 className="w-2.5 h-2.5 animate-spin" />
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
          {/* Agents overview */}
          <div>
            <h2 className="section-label mb-3">AGENTI · 7 CONFIGURATI</h2>
            <div className="space-y-1.5">
              {agents.map((agent) => (
                <div key={agent.name} className="glass-panel-subtle p-2.5 flex items-center gap-2.5">
                  <span className="text-base">{agent.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-medium">{agent.name}</div>
                    <div className="text-[10px] text-muted-foreground truncate">{agent.task}</div>
                  </div>
                  {agent.status === "running" && <div className="status-dot-active animate-pulse-glow" />}
                  {agent.status === "idle" && <div className="status-dot w-2 h-2 bg-muted-foreground/30" />}
                </div>
              ))}
            </div>
          </div>

          {/* Quick access */}
          <div>
            <h2 className="section-label mb-3">Accesso rapido</h2>
            <div className="space-y-1.5">
              {[
                { icon: Plug, label: "Connessioni", desc: "8 attive · 24 capability", to: "/connections" },
                { icon: LayoutTemplate, label: "Template", desc: "23 salvati · 4 preferiti", to: "/templates" },
                { icon: Zap, label: "Automazioni", desc: "1 in corso · 2 completate", to: "/automations" },
                { icon: Shield, label: "Audit Log", desc: "156k eventi · policy attive", to: "/audit" },
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
