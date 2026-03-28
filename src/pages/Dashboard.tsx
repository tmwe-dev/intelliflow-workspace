import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Command } from "lucide-react";
import AiEntity from "@/components/ai/AiEntity";

const ease = [0.2, 0.8, 0.2, 1] as const;

const recentSessions = [
  { title: "Analisi churn — 34 clienti a rischio identificati", time: "2h fa", status: "done" as const },
  { title: "Campagna re-engagement 200 lead", time: "5h fa", status: "running" as const },
  { title: "Report executive partner Asia", time: "1g fa", status: "done" as const },
];

const suggestions = [
  "Chi sta per lasciarci?",
  "Report vendite Q4",
  "Campagna per 50 prospects",
  "Cosa è cambiato questa settimana?",
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-24 flex flex-col items-center px-6">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.02] blur-[140px]" />
      </div>

      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease }}
        className="text-center pt-20 mb-14 relative z-10"
      >
        <div className="flex justify-center mb-10">
          <AiEntity size="lg" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extralight tracking-tight mb-3">
          Buongiorno, Marco
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-muted-foreground/60 font-light"
        >
          7 agenti operativi · Tutto è pronto
        </motion.p>
      </motion.div>

      {/* Prompt */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8, ease }}
        className="w-full max-w-xl relative z-10 mb-6"
      >
        <div
          onClick={() => navigate("/workspace")}
          className="float-panel px-5 py-4 cursor-pointer group glow-soft transition-all duration-700 hover:border-primary/[0.1]"
        >
          <div className="flex items-center gap-4">
            <motion.div
              className="w-2 h-2 rounded-full bg-primary/60 flex-shrink-0"
              animate={{ opacity: [0.5, 0.85, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <span className="text-[14px] text-muted-foreground/70 group-hover:text-muted-foreground/75 transition-colors duration-700 flex-1 font-light">
              Cosa vuoi fare?
            </span>
            <div className="flex items-center gap-1 text-muted-foreground/55">
              <Command className="w-3 h-3" />
              <span className="text-[10px] font-mono">K</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Suggestions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="flex flex-wrap justify-center gap-2 max-w-xl relative z-10 mb-20"
      >
        {suggestions.map((s, i) => (
          <motion.button
            key={s}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 + i * 0.1 }}
            onClick={() => navigate("/workspace")}
            className="text-[12px] px-3.5 py-2 rounded-2xl text-muted-foreground/65 hover:text-muted-foreground/75 hover:bg-secondary/40 transition-all duration-700"
          >
            {s}
          </motion.button>
        ))}
      </motion.div>

      {/* Recent sessions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8, ease }}
        className="w-full max-w-xl relative z-10"
      >
        <p className="section-label mb-4 text-center">Recenti</p>
        <div className="space-y-1.5">
          {recentSessions.map((session, i) => (
            <motion.div
              key={session.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + i * 0.08, ease }}
              onClick={() => navigate("/workspace")}
              className="group cursor-pointer px-5 py-4 rounded-2xl hover:bg-secondary/[0.1] transition-all duration-500"
            >
              <div className="flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-light text-foreground/90 group-hover:text-foreground/95 transition-colors duration-500 truncate">
                    {session.title}
                  </div>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[10px] text-muted-foreground/65">{session.time}</span>
                    {session.status === "running" && (
                      <div className="flex items-center gap-1.5">
                        <Loader2 className="w-2.5 h-2.5 text-primary/70 animate-spin" />
                        <span className="text-[10px] text-primary/70">in corso</span>
                      </div>
                    )}
                  </div>
                </div>
                <ArrowRight className="w-3 h-3 text-muted-foreground/70 group-hover:text-muted-foreground/70 transition-all duration-500 group-hover:translate-x-0.5" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;