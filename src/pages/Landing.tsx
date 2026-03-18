import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px]" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center glow-primary">
            <Sparkles className="w-4 h-4 text-primary" strokeWidth={1.5} />
          </div>
          <span className="text-lg font-medium tracking-tight">Adaptive AI</span>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Accedi
        </button>
      </motion.nav>

      {/* Hero */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-88px)] px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-center max-w-4xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-medium mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-slow" />
            Layer di orchestrazione AI universale
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.95] mb-6">
            <span className="text-gradient-hero">L'ultimo software</span>
            <br />
            <span className="text-gradient-hero">che la tua azienda</span>
            <br />
            <span className="text-gradient-primary">dovrà mai imparare.</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Un'interfaccia viva che si collega ai tuoi sistemi, capisce i tuoi
            obiettivi e genera in tempo reale le viste, i report e le azioni di
            cui hai bisogno. Nessun form. Nessuna maschera. Solo intelligenza.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center"
          >
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-primary/20 rounded-xl blur-sm group-hover:bg-primary/30 transition-all" />
              <div className="relative flex items-center glass-panel overflow-hidden">
                <input
                  type="email"
                  placeholder="La tua email di lavoro"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent px-5 py-3.5 text-sm outline-none w-64 placeholder:text-muted-foreground"
                />
                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3.5 text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Sveglia il Workspace
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xs text-muted-foreground mt-4"
          >
            Setup in 2 minuti · Nessuna carta richiesta · Connetti qualsiasi fonte dati
          </motion.p>
        </motion.div>

        {/* Preview cards */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-20 w-full max-w-5xl"
        >
          <div className="glass-panel p-1 rounded-2xl">
            <div className="bg-card rounded-xl overflow-hidden">
              {/* Mock workspace bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-warning/60" />
                  <div className="w-3 h-3 rounded-full bg-success/60" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 rounded-md bg-secondary text-xs text-muted-foreground">
                    workspace.adaptive-ai.io
                  </div>
                </div>
              </div>
              {/* Mock content */}
              <div className="flex h-80">
                {/* Chat side */}
                <div className="w-[35%] border-r border-border p-4 space-y-3">
                  <div className="text-xs text-muted-foreground mb-3 font-mono">AGENTE ANALISTA</div>
                  <div className="glass-panel-subtle p-3 text-xs text-secondary-foreground">
                    "Mostrami i clienti inattivi degli ultimi 90 giorni con fatturato {'>'} 50k"
                  </div>
                  <div className="flex items-center gap-2 text-xs text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-slow" />
                    Analisi in corso su 3 database...
                  </div>
                  <div className="glass-panel-subtle p-3 text-xs border-primary/20">
                    Trovati 47 clienti. Ho generato una vista tabellare filtrata con scoring di rischio churn.
                  </div>
                </div>
                {/* Canvas side */}
                <div className="flex-1 p-4 space-y-3">
                  <div className="text-xs text-muted-foreground mb-3 font-mono">CANVAS DINAMICO</div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Clienti a rischio", value: "47", change: "+12" },
                      { label: "Fatturato esposto", value: "€2.3M", change: "-8%" },
                      { label: "Churn score medio", value: "73/100", change: "+5" },
                    ].map((kpi) => (
                      <div key={kpi.label} className="glass-panel-subtle p-3">
                        <div className="text-[10px] text-muted-foreground">{kpi.label}</div>
                        <div className="text-lg font-medium mt-1">{kpi.value}</div>
                        <div className="text-[10px] text-destructive mt-0.5">{kpi.change}</div>
                      </div>
                    ))}
                  </div>
                  <div className="glass-panel-subtle p-3 flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] text-muted-foreground font-mono">DETTAGLIO</span>
                      <span className="text-[10px] text-primary">Esporta</span>
                    </div>
                    {["Acme Corp", "TechnoSteel Srl", "Meridian Group", "Nova Industries"].map((name, i) => (
                      <div key={name} className="flex items-center justify-between py-1.5 border-b border-border last:border-0 text-xs">
                        <span className="text-secondary-foreground">{name}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-muted-foreground">€{(Math.random() * 200 + 50).toFixed(0)}k</span>
                          <span className={`px-1.5 py-0.5 rounded text-[10px] ${i < 2 ? 'bg-destructive/15 text-destructive' : 'bg-warning/15 text-warning'}`}>
                            {i < 2 ? 'Critico' : 'Attenzione'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
