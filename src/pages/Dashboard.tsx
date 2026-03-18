import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Plug,
  LayoutTemplate,
  Zap,
  Clock,
  TrendingUp,
  Users,
  FileText,
  ArrowRight,
  Sparkles,
  Bot,
} from "lucide-react";

const recentConversations = [
  { id: 1, title: "Analisi clienti inattivi Q4", time: "2 ore fa", agent: "Analista", status: "completata" },
  { id: 2, title: "Campagna re-engagement lead freddi", time: "5 ore fa", agent: "Marketing", status: "completata" },
  { id: 3, title: "Report executive trimestrale", time: "1 giorno fa", agent: "Reporter", status: "completata" },
  { id: 4, title: "Audit permessi CRM Salesforce", time: "2 giorni fa", agent: "Sicurezza", status: "completata" },
];

const quickStats = [
  { label: "Conversazioni oggi", value: "12", icon: MessageSquare, trend: "+3" },
  { label: "Agenti attivi", value: "5", icon: Bot, trend: "" },
  { label: "Connessioni live", value: "8", icon: Plug, trend: "+1" },
  { label: "Template salvati", value: "23", icon: LayoutTemplate, trend: "+2" },
];

const suggestions = [
  "Mostrami i lead caldi della settimana",
  "Genera un report vendite elegante",
  "Confronta performance Q3 vs Q4",
  "Chi sono i clienti a rischio churn?",
];

const stagger = {
  container: { transition: { staggerChildren: 0.06 } },
  item: {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] } },
  },
};

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-24 px-6 pt-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-medium tracking-tight">Buongiorno</h1>
        </div>
        <p className="text-muted-foreground text-sm ml-11">
          Il tuo workspace è pronto. 5 agenti attivi, 8 connessioni sincronizzate.
        </p>
      </motion.div>

      {/* Command input */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-10"
      >
        <div
          onClick={() => navigate("/workspace")}
          className="glass-panel p-4 cursor-pointer hover:border-primary/20 transition-all group"
        >
          <div className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground/70 transition-colors">
            <MessageSquare className="w-4 h-4" strokeWidth={1.5} />
            <span className="text-sm">Cosa vuoi fare oggi? Scrivi o parla...</span>
            <div className="ml-auto flex items-center gap-2">
              <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground border border-border">⌘K</kbd>
            </div>
          </div>
          <div className="flex gap-2 mt-3 flex-wrap">
            {suggestions.map((s) => (
              <span
                key={s}
                className="text-[11px] px-3 py-1.5 rounded-full bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={stagger.container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10"
      >
        {quickStats.map((stat) => (
          <motion.div key={stat.label} variants={stagger.item} className="glass-panel-subtle p-4">
            <div className="flex items-center justify-between mb-3">
              <stat.icon className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
              {stat.trend && (
                <span className="text-[10px] text-success">{stat.trend}</span>
              )}
            </div>
            <div className="text-2xl font-medium">{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Recent conversations */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="md:col-span-2"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-muted-foreground tracking-wide uppercase">Conversazioni recenti</h2>
            <button className="text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
              Vedi tutte <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-2">
            {recentConversations.map((conv, i) => (
              <motion.div
                key={conv.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                onClick={() => navigate("/workspace")}
                className="glass-panel-subtle p-4 flex items-center justify-between cursor-pointer hover:bg-secondary/30 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-sm font-medium group-hover:text-primary transition-colors">{conv.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      Agente {conv.agent} · {conv.time}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-sm font-medium text-muted-foreground tracking-wide uppercase mb-4">Accesso rapido</h2>
          <div className="space-y-2">
            {[
              { icon: Plug, label: "Connessioni", desc: "8 attive", to: "/connections" },
              { icon: LayoutTemplate, label: "Template", desc: "23 salvati", to: "/templates" },
              { icon: Zap, label: "Automazioni", desc: "3 in corso", to: "/automations" },
              { icon: TrendingUp, label: "Report", desc: "Genera nuovo", to: "/workspace" },
              { icon: Users, label: "Contatti", desc: "12.4k record", to: "/workspace" },
              { icon: FileText, label: "Audit Log", desc: "Ultime 24h", to: "/audit" },
            ].map((item) => (
              <div
                key={item.label}
                onClick={() => navigate(item.to)}
                className="glass-panel-subtle p-3 flex items-center gap-3 cursor-pointer hover:bg-secondary/30 transition-all group"
              >
                <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" strokeWidth={1.5} />
                <div className="flex-1">
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="text-[11px] text-muted-foreground">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
