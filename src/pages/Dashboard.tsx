import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageSquare, ArrowRight, Sparkles, Loader2 } from "lucide-react";

const ease = [0.2, 0.8, 0.2, 1] as const;

const recentSessions = [
  { title: "Analisi churn scoring — 34 clienti a rischio", time: "2h fa", agents: 4, status: "completata" },
  { title: "Campagna re-engagement 200 lead", time: "5h fa", agents: 3, status: "in corso" },
  { title: "Report executive partner Asia", time: "1g fa", agents: 4, status: "completata" },
];

const suggestions = [
  "Mostrami i lead inattivi da 90 giorni",
  "Genera report vendite Q4",
  "Prepara campagna per 50 prospects",
  "Confronta performance Q3 vs Q4",
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-24 flex flex-col items-center px-6">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.02] blur-[120px]" />
      </div>

      {/* Greeting — understated */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
        className="text-center pt-20 mb-16 relative z-10"
      >
        <div className="ai-orb inline-block mb-8">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center animate-breathe">
            <Sparkles className="w-5 h-5 text-primary/50" strokeWidth={1.5} />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-light tracking-tight mb-3">
          Buongiorno, Marco
        </h1>
        <p className="text-sm text-muted-foreground font-light">
          7 agenti operativi · Tutto è pronto
        </p>
      </motion.div>

      {/* Central prompt */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease }}
        className="w-full max-w-2xl relative z-10 mb-6"
      >
        <div
          onClick={() => navigate("/workspace")}
          className="float-panel px-6 py-5 cursor-pointer group glow-soft hover:border-primary/8 transition-all duration-500"
        >
          <div className="flex items-center gap-4">
            <MessageSquare className="w-4 h-4 text-primary/30" strokeWidth={1.5} />
            <span className="text-base text-muted-foreground group-hover:text-secondary-foreground transition-colors duration-500 flex-1">
              Dimmi cosa vuoi fare...
            </span>
            <kbd className="text-[10px] px-2 py-0.5 rounded-lg bg-secondary text-muted-foreground/50 font-mono">⌘K</kbd>
          </div>
        </div>
      </motion.div>

      {/* Whispered suggestions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="flex flex-wrap justify-center gap-2 max-w-2xl relative z-10 mb-20"
      >
        {suggestions.map((s, i) => (
          <motion.button
            key={s}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 + i * 0.1 }}
            onClick={() => navigate("/workspace")}
            className="text-[12px] px-3.5 py-2 rounded-xl text-muted-foreground hover:text-secondary-foreground hover:bg-secondary/30 transition-all duration-500"
          >
            {s}
          </motion.button>
        ))}
      </motion.div>

      {/* Recent — floating cards, minimal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8, ease }}
        className="w-full max-w-2xl relative z-10"
      >
        <p className="section-label mb-4 text-center">Sessioni recenti</p>
        <div className="space-y-2">
          {recentSessions.map((session, i) => (
            <motion.div
              key={session.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.08, ease }}
              onClick={() => navigate("/workspace")}
              className="float-panel-interactive px-5 py-4 flex items-center gap-4 group"
            >
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium group-hover:text-primary transition-colors duration-300 truncate">
                  {session.title}
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[11px] text-muted-foreground">{session.time}</span>
                  <span className="text-[10px] text-muted-foreground/50">{session.agents} agenti</span>
                  {session.status === "in corso" && (
                    <Loader2 className="w-3 h-3 text-primary animate-spin" />
                  )}
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/20 group-hover:text-primary/40 transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
