import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const ease = [0.2, 0.8, 0.2, 1] as const;

const prompts = [
  "Mostrami i clienti a rischio churn",
  "Prepara una campagna per 50 lead",
  "Genera un report executive",
  "Chi sono i partner più attivi?",
];

const Landing = () => {
  const navigate = useNavigate();
  const [hoveredPrompt, setHoveredPrompt] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background overflow-hidden relative flex flex-col">
      {/* Background — subtle radial glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/[0.03] blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-accent/[0.02] blur-[120px]" />
      </div>

      {/* Nav — barely there */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="relative z-10 flex items-center justify-between px-8 lg:px-16 py-8"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary/60" strokeWidth={1.5} />
          <span className="text-sm font-medium tracking-tight text-foreground/70">Adaptive</span>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-500"
        >
          Accedi
        </button>
      </motion.nav>

      {/* Center — the soul of the page */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-6 -mt-16">
        {/* AI Orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease }}
          className="ai-orb mb-16"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center animate-breathe">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/40 to-accent/20 animate-float-slow" />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-center leading-[0.95] mb-8 max-w-4xl"
        >
          <span className="text-gradient-hero">Dimmi cosa vuoi.</span>
          <br />
          <span className="text-gradient-primary">Io lo costruisco.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="text-base text-muted-foreground text-center max-w-lg mb-14 leading-relaxed font-light"
        >
          Un'intelligenza operativa che si posiziona sopra i tuoi sistemi.
          <br />
          Nessuna interfaccia rigida. Solo il risultato.
        </motion.p>

        {/* Prompt input — the protagonist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, ease }}
          className="w-full max-w-2xl mb-12"
        >
          <div
            onClick={() => navigate("/workspace")}
            className="float-panel px-6 py-5 cursor-pointer group glow-soft hover:border-primary/8 transition-all duration-500"
          >
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-primary/40 animate-breathe" />
              <span className="text-base text-muted-foreground group-hover:text-secondary-foreground transition-colors duration-500 flex-1">
                Descrivi il tuo obiettivo...
              </span>
              <ArrowRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary/50 transition-all duration-500 group-hover:translate-x-1" />
            </div>
          </div>
        </motion.div>

        {/* Suggested prompts — whispered */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="flex flex-wrap justify-center gap-2 max-w-2xl"
        >
          {prompts.map((p, i) => (
            <motion.button
              key={p}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 + i * 0.1, duration: 0.5, ease }}
              onMouseEnter={() => setHoveredPrompt(i)}
              onMouseLeave={() => setHoveredPrompt(null)}
              onClick={() => navigate("/workspace")}
              className={`text-[13px] px-4 py-2.5 rounded-2xl transition-all duration-500 ${
                hoveredPrompt === i
                  ? "float-panel-subtle text-secondary-foreground border-primary/8"
                  : "text-muted-foreground hover:text-secondary-foreground"
              }`}
            >
              {p}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Bottom — barely visible signal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="relative z-10 flex justify-center py-8"
      >
        <p className="text-[11px] text-muted-foreground/40 font-light tracking-wide">
          CRM · ERP · Database · API · Email · Voice — tutto connesso, niente esposto
        </p>
      </motion.div>
    </div>
  );
};

export default Landing;
