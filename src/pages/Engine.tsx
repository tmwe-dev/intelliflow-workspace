import { motion } from "framer-motion";
import { Database, Brain, Mic, Zap, Layers, Shield } from "lucide-react";
import AiEntity from "@/components/ai/AiEntity";

const ease = [0.2, 0.8, 0.2, 1] as const;

const engineLayers = [
  {
    icon: Database,
    title: "Core CRM Engine",
    subtitle: "Il cuore operativo invisibile",
    color: "210 100% 66%",
    modules: [
      { name: "Partner Management", detail: "234 partner attivi, scoring, network mapping, storico completo" },
      { name: "Contact Database", detail: "12.847 contatti importati, profili arricchiti, segmentazione dinamica" },
      { name: "Prospect Pipeline", detail: "Tracking prospect, conversione, nurturing automatico" },
      { name: "Activity Engine", detail: "Timeline attività, task, reminder, follow-up automatici" },
      { name: "Campaign System", detail: "Multi-wave, A/B testing, personalizzazione per contatto" },
      { name: "Email Drafting", detail: "Generazione bozze AI, template dinamici, preview, invio schedulato" },
      { name: "Document Workspace", detail: "Business card, documenti condivisi, allegati, versioning" },
      { name: "Deep Search", detail: "Ricerca semantica cross-entity su tutto il database operativo" },
    ],
  },
  {
    icon: Brain,
    title: "AI Orchestration Engine",
    subtitle: "L'intelligenza che coordina tutto",
    color: "270 60% 62%",
    modules: [
      { name: "Orchestrator Agent", detail: "Interpreta l'intento, scompone in sub-task, coordina gli agenti" },
      { name: "CRM Core Agent", detail: "Accede a contatti, partner, aziende, storico, dati operativi" },
      { name: "Data Analyst Agent", detail: "Scoring ML, analisi trend, churn prediction, insight statistici" },
      { name: "Communication Agent", detail: "Genera email, messaggi, template, personalizzazione contenuti" },
      { name: "Canvas Agent", detail: "Compone viste dinamiche, tabelle, report, visualizzazioni" },
      { name: "Automation Agent", detail: "Esegue pipeline operative, job, retry, monitoraggio" },
      { name: "Governance Agent", detail: "Audit trail, policy enforcement, permessi, compliance" },
    ],
  },
  {
    icon: Mic,
    title: "Voice Layer",
    subtitle: "Interazione naturale e premium",
    color: "152 60% 45%",
    modules: [
      { name: "Voice Input", detail: "Speech-to-text in tempo reale, dettatura, comandi vocali" },
      { name: "Voice Output", detail: "Text-to-speech premium, lettura report, feedback vocale" },
      { name: "Conversational Flow", detail: "Dialogo naturale, contesto persistente, multi-turn" },
      { name: "ElevenLabs Integration", detail: "Voce AI premium, clonazione, multilingua" },
    ],
  },
  {
    icon: Zap,
    title: "Execution & Approval Engine",
    subtitle: "Azione controllata e tracciabile",
    color: "38 90% 50%",
    modules: [
      { name: "Job Execution", detail: "Pipeline multi-step, progress tracking, parallel execution" },
      { name: "Approval Workflow", detail: "Proposta → anteprima → conferma → esecuzione → audit" },
      { name: "Bulk Operations", detail: "Invio massivo, update batch, azioni su selezioni" },
      { name: "Error Recovery", detail: "Retry automatico, rollback, gestione errori intelligente" },
    ],
  },
  {
    icon: Layers,
    title: "Template & Memory Layer",
    subtitle: "Il sistema impara e ricorda",
    color: "210 100% 66%",
    modules: [
      { name: "Template Library", detail: "Viste, report, campagne, flussi salvati e riutilizzabili" },
      { name: "AI Memory", detail: "Contesto persistente, preferenze utente, pattern ricorrenti" },
      { name: "Workspace Presets", detail: "Configurazioni workspace salvabili e condivisibili" },
      { name: "Conversation History", detail: "Storico sessioni, decisioni, risultati passati" },
    ],
  },
  {
    icon: Shield,
    title: "Governance & Audit Layer",
    subtitle: "Controllo, trasparenza, sicurezza",
    color: "270 60% 62%",
    modules: [
      { name: "Audit Log", detail: "Log completo di ogni azione AI e umana con timestamp" },
      { name: "Policy Engine", detail: "Regole di approvazione, limiti operativi, permessi ruolo" },
      { name: "Compliance", detail: "GDPR, data residency, right to erasure, export dati" },
      { name: "Activity Monitoring", detail: "Dashboard agenti, performance, anomaly detection" },
    ],
  },
];

const Engine = () => {
  return (
    <div className="min-h-screen pb-24 px-6 relative">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/[0.012] blur-[160px]" />
      </div>

      <div className="max-w-3xl mx-auto pt-20 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          className="text-center mb-20"
        >
          <div className="flex justify-center mb-8">
            <AiEntity size="lg" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extralight tracking-tight mb-4">
            Behind the Intelligence
          </h1>
          <p className="text-[14px] text-muted-foreground/40 font-light max-w-lg mx-auto leading-relaxed">
            Sotto la superficie minimalista vive un motore operativo completo.
            CRM, agenti AI, voce, esecuzioni e governance — tutto orchestrato.
          </p>
        </motion.div>

        {/* Architecture visual */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-2 mb-20"
        >
          {["Utente", "→", "Workspace AI", "→", "Orchestratore", "→", "Agenti", "→", "Core CRM"].map((step, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className={step === "→" ? "text-[10px] text-muted-foreground/15" : "text-[10px] text-muted-foreground/30 px-2.5 py-1.5 rounded-lg font-mono tracking-wider"}
              style={step !== "→" ? { background: "hsl(240 5% 7% / 0.5)", border: "1px solid hsl(0 0% 100% / 0.02)" } : {}}
            >
              {step}
            </motion.span>
          ))}
        </motion.div>

        {/* Engine layers */}
        <div className="space-y-6">
          {engineLayers.map((layer, li) => (
            <motion.div
              key={layer.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + li * 0.1, duration: 0.6, ease }}
              className="rounded-2xl overflow-hidden"
              style={{
                background: "hsl(240 5% 6% / 0.4)",
                border: "1px solid hsl(0 0% 100% / 0.02)",
              }}
            >
              {/* Layer header */}
              <div className="p-6 flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `hsl(${layer.color} / 0.06)` }}
                >
                  <layer.icon className="w-4.5 h-4.5" style={{ color: `hsl(${layer.color} / 0.4)` }} strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-[15px] font-light text-foreground/75 mb-0.5">{layer.title}</h2>
                  <p className="text-[11px] text-muted-foreground/25 font-light">{layer.subtitle}</p>
                </div>
              </div>

              {/* Modules */}
              <div className="px-6 pb-5 grid grid-cols-1 md:grid-cols-2 gap-2">
                {layer.modules.map((mod, mi) => (
                  <motion.div
                    key={mod.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + li * 0.1 + mi * 0.04 }}
                    className="px-4 py-3 rounded-xl group"
                    style={{ background: "hsl(240 5% 7% / 0.3)", border: "1px solid hsl(0 0% 100% / 0.01)" }}
                  >
                    <div className="text-[11px] text-foreground/50 font-light mb-0.5">{mod.name}</div>
                    <div className="text-[9px] text-muted-foreground/20 leading-relaxed">{mod.detail}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-20 text-center"
        >
          <p className="text-[12px] text-muted-foreground/20 font-light leading-relaxed max-w-md mx-auto">
            Tutto questo vive dietro un'interfaccia che sembra una conversazione.
            <br />
            Semplice davanti. Potentissimo dietro.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Engine;
