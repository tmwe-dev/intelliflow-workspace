import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Command } from "lucide-react";
import AiEntity from "@/components/ai/AiEntity";

const ease = [0.2, 0.8, 0.2, 1] as const;

const prompts = [
  "Trova i clienti che stanno per lasciarci",
  "Prepara una campagna in 60 secondi",
  "Importa contatti e uniscili ai partner",
  "Genera un report per il board",
];

const Landing = () => {
  const navigate = useNavigate();
  const [hoveredPrompt, setHoveredPrompt] = useState<number | null>(null);
  const [inputFocused, setInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    navigate("/workspace");
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden relative flex flex-col">
      {/* Ambient layers */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
          style={{ background: "radial-gradient(circle, hsl(210 100% 66% / 0.04) 0%, hsl(270 60% 62% / 0.02) 40%, transparent 70%)" }}
          animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-accent/[0.02] blur-[160px]" />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1.5 }}
        className="relative z-10 flex items-center justify-between px-8 lg:px-16 py-8"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary/25 to-accent/15 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-primary/60" />
          </div>
          <span className="text-sm font-medium tracking-tight text-foreground/90">Adaptive</span>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="text-xs text-muted-foreground/60 hover:text-foreground transition-colors duration-700"
        >
          Entra
        </button>
      </motion.nav>

      {/* Center */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-6 -mt-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease }}
          className="mb-14"
        >
          <AiEntity size="hero" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1.2, ease }}
          className="text-center mb-6 max-w-3xl"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extralight leading-[0.92] tracking-[-0.04em]">
            <span className="text-gradient-hero">Il tuo obiettivo.</span>
            <br />
            <span className="text-gradient-primary">Il nostro lavoro.</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1.2 }}
          className="text-[15px] text-muted-foreground/70 text-center max-w-md mb-16 leading-relaxed font-light"
        >
          Un'intelligenza operativa costruita su moduli reali.
          Fonti multiple. Tool concreti. Tu chiedi, il sistema esegue.
        </motion.p>

        {/* Prompt */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease }}
          className="w-full max-w-xl mb-14"
        >
          <motion.div
            animate={{
              boxShadow: inputFocused
                ? "0 0 0 1px hsl(210 100% 66% / 0.15), 0 0 80px hsl(210 100% 66% / 0.06), 0 20px 60px -15px hsl(0 0% 0% / 0.5)"
                : "0 0 0 0.5px hsl(0 0% 0% / 0.3), 0 20px 60px -15px hsl(0 0% 0% / 0.5)",
            }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "hsl(240 5% 6% / 0.7)",
              backdropFilter: "blur(40px) saturate(1.1)",
              border: "1px solid hsl(0 0% 100% / 0.08)",
            }}
          >
            <div className="flex items-center px-5 py-4 gap-4">
              <motion.div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ background: "radial-gradient(circle, hsl(210 100% 70% / 0.7), hsl(210 100% 66% / 0.3))" }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <input
                type="text"
                placeholder="Cosa vuoi ottenere?"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted-foreground/60 font-light text-foreground"
              />
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-muted-foreground/60">
                  <Command className="w-3 h-3" />
                  <span className="text-[10px] font-mono">K</span>
                </div>
                <motion.button
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 rounded-xl flex items-center justify-center bg-primary/15 text-primary/70 hover:bg-primary/20 hover:text-primary transition-all duration-500"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Suggested prompts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 1.2 }}
          className="flex flex-wrap justify-center gap-2.5 max-w-xl"
        >
          {prompts.map((p, i) => (
            <motion.button
              key={p}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9 + i * 0.12, duration: 0.6, ease }}
              onMouseEnter={() => setHoveredPrompt(i)}
              onMouseLeave={() => setHoveredPrompt(null)}
              onClick={() => navigate("/workspace")}
              className="relative text-[12px] px-4 py-2.5 rounded-2xl transition-all duration-700"
            >
              <motion.span
                className="relative z-10"
                animate={{
                  color: hoveredPrompt === i ? "hsl(0 0% 90%)" : "hsl(0 0% 55%)",
                }}
                transition={{ duration: 0.5 }}
              >
                {p}
              </motion.span>
              {hoveredPrompt === i && (
                <motion.div
                  layoutId="prompt-highlight"
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: "hsl(240 5% 7% / 0.6)",
                    border: "1px solid hsl(0 0% 100% / 0.08)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Bottom — foundation signal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1.5 }}
        className="relative z-10 flex flex-col items-center gap-3 py-8"
      >
        <div className="flex items-center gap-6">
          {["Partner Network", "Contact Import", "Campaign Engine", "Deep Search", "Voice AI", "Audit"].map((s, i) => (
            <motion.span
              key={s}
              className="text-[10px] text-muted-foreground/60 font-light tracking-wider"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
            >
              {s}
            </motion.span>
          ))}
        </div>
        <motion.span
          className="text-[8px] text-muted-foreground/55 font-mono tracking-widest"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          FONDATO SU MODULI OPERATIVI GIÀ ESISTENTI
        </motion.span>
      </motion.div>
    </div>
  );
};

export default Landing;