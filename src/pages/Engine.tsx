import { motion } from "framer-motion";
import { Database, Brain, Mic, Zap, Layers, Shield, GitMerge, Wrench, Box, Radio } from "lucide-react";
import AiEntity from "@/components/ai/AiEntity";

const ease = [0.2, 0.8, 0.2, 1] as const;

/* ─── Operational Foundations ─── */
const foundations = [
  { name: "Partner & Network Data", status: "Operativo", records: "234 partner · 47 network", maturity: 92 },
  { name: "Contact Import Pipelines", status: "Operativo", records: "12.847 contatti · 6 pipeline attive", maturity: 88 },
  { name: "Business Card Capture", status: "Operativo", records: "1.420 schede · OCR + AI extraction", maturity: 85 },
  { name: "Deep Search Intelligence", status: "Operativo", records: "89 fonti esterne · enrichment automatico", maturity: 78 },
  { name: "Campaign & Email Operations", status: "Operativo", records: "89 campagne · 12.4k email inviate", maturity: 91 },
  { name: "Workspace Documents & Presets", status: "Operativo", records: "342 documenti · 28 preset attivi", maturity: 82 },
  { name: "AI Memory & Planning", status: "Operativo", records: "1.2k sessioni · 340 pattern appresi", maturity: 74 },
  { name: "Voice Interaction Layer", status: "Attivo", records: "ElevenLabs · STT/TTS premium", maturity: 70 },
  { name: "Audit & Execution Trace", status: "Operativo", records: "48.2k eventi · compliance attiva", maturity: 95 },
];

const engineLayers = [
  {
    icon: GitMerge,
    title: "Source Unification Layer",
    subtitle: "Acquisisce, pulisce, collega e normalizza fonti multiple",
    color: "38 90% 50%",
    modules: [
      { name: "Multi-Source Ingestion", detail: "WCA Network, contatti importati, business card, report aziendali, API esterne" },
      { name: "Data Cleaning & Normalization", detail: "Deduplicazione, validazione, normalizzazione formati, merge intelligente" },
      { name: "Entity Resolution", detail: "Collegamento cross-source: stesso contatto da fonti diverse unificato automaticamente" },
      { name: "Enrichment Pipeline", detail: "Arricchimento profili con dati da deep search, company report, storico attività" },
      { name: "Source Provenance", detail: "Ogni dato mantiene la traccia dell'origine: WCA, import, business card, API" },
    ],
  },
  {
    icon: Database,
    title: "Core CRM Engine",
    subtitle: "Motore operativo maturo con dati reali già in produzione",
    color: "210 100% 66%",
    modules: [
      { name: "Partner Management", detail: "234 partner attivi, scoring, network mapping, storico completo — modulo esistente" },
      { name: "Contact Database", detail: "12.847 contatti unificati — pipeline di import, dedup e enrichment già operative" },
      { name: "Activity Engine", detail: "Timeline attività, task, reminder, follow-up — logiche già consolidate" },
      { name: "Campaign System", detail: "Multi-wave, personalizzazione, invio schedulato — motore campagne già in uso" },
      { name: "Email Drafting & Sending", detail: "Generazione bozze, template dinamici, invio batch — moduli già testati" },
      { name: "Document Workspace", detail: "Business card, documenti, allegati — gestione documenti già operativa" },
      { name: "Deep Search", detail: "Ricerca semantica cross-source — integrazione con fonti esterne già attiva" },
    ],
  },
  {
    icon: Wrench,
    title: "Tool Activation Layer",
    subtitle: "14 strumenti operativi reali, ciascuno basato su moduli esistenti",
    color: "152 60% 45%",
    modules: [
      { name: "Search Contacts / Search Partners", detail: "Ricerca granulare su contatti e partner — usa il motore di query del CRM esistente" },
      { name: "Parse Contact File / Parse Business Cards", detail: "Estrazione strutturata — pipeline OCR e CSV parser già operative" },
      { name: "Read Company Report", detail: "Analisi automatica report aziendali — integra il modulo documenti esistente" },
      { name: "Run Deep Search", detail: "Interrogazione fonti esterne — connettori API già configurati e attivi" },
      { name: "Create Email Draft / Send Email Batch", detail: "Bozze personalizzate e invio — usa il motore email e template già in produzione" },
      { name: "Create Campaign / Schedule Reminder", detail: "Campagne multi-step — orchestra il campaign system e l'activity engine esistenti" },
      { name: "Generate Executive Report", detail: "Report premium — combina dati dal CRM, partner DB e analytics già disponibili" },
      { name: "Save Template / Audit Action", detail: "Persistenza flussi e logging — usa il template layer e l'audit log già operativi" },
    ],
  },
  {
    icon: Brain,
    title: "AI Orchestration Engine",
    subtitle: "Layer intelligente che amplifica i moduli esistenti",
    color: "270 60% 62%",
    modules: [
      { name: "Orchestrator Agent", detail: "Interpreta l'intento, scompone in sub-task, seleziona i moduli operativi da attivare" },
      { name: "CRM Core Agent", detail: "Accede al motore CRM esistente — contatti, partner, aziende, storico operativo" },
      { name: "Data Analyst Agent", detail: "Scoring ML, analisi trend, churn prediction — lavora sui dati già nel sistema" },
      { name: "Communication Agent", detail: "Genera email usando il motore template e i dati contatto già disponibili" },
      { name: "Canvas Agent", detail: "Compone viste dinamiche a partire da query reali sui dati operativi" },
      { name: "Automation Agent", detail: "Esegue pipeline operative usando i job runner e le logiche batch già presenti" },
      { name: "Governance Agent", detail: "Applica le regole di audit e compliance usando il modulo governance esistente" },
    ],
  },
  {
    icon: Mic,
    title: "Voice Layer",
    subtitle: "Interazione naturale integrata nel flusso operativo",
    color: "152 60% 45%",
    modules: [
      { name: "Voice Input (STT)", detail: "Speech-to-text in tempo reale, dettatura, comandi vocali" },
      { name: "Voice Output (TTS)", detail: "Read Aloud — lettura report e riepilogo con voce premium ElevenLabs" },
      { name: "Conversational Flow", detail: "Dialogo naturale con contesto persistente dal workspace" },
    ],
  },
  {
    icon: Zap,
    title: "Execution & Approval Engine",
    subtitle: "Azione controllata su infrastruttura di esecuzione già consolidata",
    color: "38 90% 50%",
    modules: [
      { name: "Job Execution", detail: "Pipeline multi-step — usa il job runner e le code di esecuzione già operative" },
      { name: "Approval Workflow", detail: "Obbligatorio per azioni batch — integra il modulo permessi già esistente" },
      { name: "Role-Based Access", detail: "Admin, Operator, Analyst — permessi granulari già configurati nel sistema" },
      { name: "Policy Engine", detail: "Limiti operativi e soglie — regole già definite e applicate in produzione" },
    ],
  },
  {
    icon: Layers,
    title: "Memory & Template Layer",
    subtitle: "Il sistema impara e ricorda grazie a moduli di persistenza già attivi",
    color: "210 100% 66%",
    modules: [
      { name: "Template Library", detail: "Flussi, report, campagne salvate — usa il sistema preset già in uso" },
      { name: "AI Memory", detail: "Contesto persistente, preferenze utente — modulo memoria già operativo" },
      { name: "Workspace Presets", detail: "Configurazioni salvabili — integra il documento workspace esistente" },
      { name: "Conversation History", detail: "Storico sessioni e decisioni — persistenza già gestita" },
    ],
  },
  {
    icon: Shield,
    title: "Governance & Audit Layer",
    subtitle: "Controllo enterprise su un modulo audit già maturo e certificato",
    color: "270 60% 62%",
    modules: [
      { name: "Audit Log", detail: "48.2k eventi registrati — modulo audit già in produzione con 95% maturity" },
      { name: "Role Management", detail: "Sistema ruoli già configurato — Admin, Operator, Analyst con permessi granulari" },
      { name: "Policy Enforcement", detail: "Regole di approvazione e limiti operativi già definiti e applicati" },
      { name: "Source Provenance", detail: "Tracciabilità origine dati già attiva per ogni record nel sistema" },
      { name: "Compliance", detail: "GDPR, data residency, right to erasure — framework compliance già operativo" },
    ],
  },
];

const Engine = () => {
  return (
    <div className="min-h-screen pb-24 px-6 relative">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/[0.012] blur-[160px]" />
      </div>

      <div className="max-w-3xl mx-auto pt-20 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease }} className="text-center mb-20">
          <div className="flex justify-center mb-8"><AiEntity size="lg" /></div>
          <h1 className="text-3xl md:text-4xl font-extralight tracking-tight mb-4">Behind the Intelligence</h1>
          <p className="text-[14px] text-muted-foreground/40 font-light max-w-lg mx-auto leading-relaxed">
            Non un concept. Una macchina operativa reale, composta da moduli maturi
            <br />e coordinati, amplificata da un'interfaccia conversazionale.
          </p>
        </motion.div>

        {/* Architecture flow */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex items-center justify-center gap-1.5 mb-16 flex-wrap">
          {["Fonti", "→", "Unificazione", "→", "Tool", "→", "Agenti", "→", "Approvazione", "→", "Esecuzione", "→", "Audit"].map((step, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 + i * 0.08 }}
              className={step === "→" ? "text-[10px] text-muted-foreground/15" : "text-[10px] text-muted-foreground/30 px-2.5 py-1.5 rounded-lg font-mono tracking-wider"}
              style={step !== "→" ? { background: "hsl(240 5% 7% / 0.5)", border: "1px solid hsl(0 0% 100% / 0.02)" } : {}}
            >
              {step}
            </motion.span>
          ))}
        </motion.div>

        {/* ─── OPERATIONAL FOUNDATIONS ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <Box className="w-4 h-4 text-muted-foreground/20" strokeWidth={1.5} />
            <div>
              <h2 className="text-[15px] font-light text-foreground/70">Operational Foundations</h2>
              <p className="text-[11px] text-muted-foreground/25 font-light">Moduli operativi già esistenti e maturi su cui il prodotto si fonda</p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden" style={{ background: "hsl(240 5% 6% / 0.4)", border: "1px solid hsl(0 0% 100% / 0.02)" }}>
            {foundations.map((f, i) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.06, duration: 0.4, ease }}
                className="flex items-center gap-4 px-5 py-3.5 border-b border-border/[0.03] last:border-b-0"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-light text-foreground/60">{f.name}</div>
                  <div className="text-[9px] text-muted-foreground/20 font-mono mt-0.5">{f.records}</div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  {/* Maturity bar */}
                  <div className="w-16 h-[3px] rounded-full bg-secondary/10 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: f.maturity >= 90 ? "hsl(152 60% 45% / 0.5)" : f.maturity >= 80 ? "hsl(210 100% 66% / 0.4)" : "hsl(38 90% 50% / 0.35)" }}
                      initial={{ width: 0 }}
                      animate={{ width: `${f.maturity}%` }}
                      transition={{ delay: 1 + i * 0.08, duration: 0.8, ease }}
                    />
                  </div>
                  <span className="text-[8px] text-muted-foreground/20 font-mono w-7 text-right">{f.maturity}%</span>
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-success/40"
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex items-center gap-2 mt-3 px-1"
          >
            <Radio className="w-2.5 h-2.5 text-success/25" />
            <span className="text-[9px] text-muted-foreground/20 font-light">9 fondamenta operative attive · Maturity media 84% · Tutti i moduli già in uso</span>
          </motion.div>
        </motion.div>

        {/* ─── MODULE INTEGRATION SIGNAL ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mb-16 rounded-2xl p-6"
          style={{ background: "hsl(240 5% 6% / 0.3)", border: "1px solid hsl(0 0% 100% / 0.015)" }}
        >
          <div className="text-[10px] text-muted-foreground/25 tracking-[0.2em] uppercase mb-4 font-mono">COME FUNZIONA</div>
          <div className="space-y-3">
            {[
              "Il prodotto non ricostruisce ogni funzione da zero. Integra e orchestra moduli operativi già esistenti.",
              "L'interfaccia conversazionale e il layer AI non sostituiscono il motore — lo amplificano, rendendolo accessibile in modo naturale.",
              "Ogni tool attivato dall'assistente corrisponde a una funzione reale già disponibile nel sistema operativo sottostante.",
            ].map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 + i * 0.12 }}
                className="flex items-start gap-3"
              >
                <div className="w-1 h-1 rounded-full bg-primary/25 mt-1.5 flex-shrink-0" />
                <p className="text-[12px] text-foreground/45 font-light leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Engine layers */}
        <div className="space-y-6">
          {engineLayers.map((layer, li) => (
            <motion.div
              key={layer.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + li * 0.08, duration: 0.6, ease }}
              className="rounded-2xl overflow-hidden"
              style={{ background: "hsl(240 5% 6% / 0.4)", border: "1px solid hsl(0 0% 100% / 0.02)" }}
            >
              <div className="p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `hsl(${layer.color} / 0.06)` }}>
                  <layer.icon className="w-4.5 h-4.5" style={{ color: `hsl(${layer.color} / 0.4)` }} strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-[15px] font-light text-foreground/75 mb-0.5">{layer.title}</h2>
                  <p className="text-[11px] text-muted-foreground/25 font-light">{layer.subtitle}</p>
                </div>
              </div>
              <div className="px-6 pb-5 grid grid-cols-1 md:grid-cols-2 gap-2">
                {layer.modules.map((mod, mi) => (
                  <motion.div
                    key={mod.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + li * 0.08 + mi * 0.03 }}
                    className="px-4 py-3 rounded-xl"
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

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="mt-20 text-center">
          <p className="text-[12px] text-muted-foreground/20 font-light leading-relaxed max-w-md mx-auto mb-6">
            Fondamenta operative già mature. Moduli già in produzione.
            <br />
            L'AI workspace non inventa le capacità — le unifica, le amplifica, le rende conversazionali.
          </p>
          <a href="/architecture" className="inline-flex items-center gap-2 text-[11px] text-primary/30 hover:text-primary/50 transition-colors duration-500 font-light">
            Esplora l'architettura completa del prodotto →
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Engine;
