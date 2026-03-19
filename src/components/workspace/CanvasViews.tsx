import { motion, AnimatePresence } from "framer-motion";
import { Wand2, ThumbsUp, Download, X } from "lucide-react";
import TemplateSuggest from "./TemplateSuggest";

const ease = [0.2, 0.8, 0.2, 1] as const;

/* ── Table Canvas ── */
interface TableRow { name: string; sector: string; revenue: string; days: string; churn: number }

export const TableCanvas = ({
  data, onClose, title = "PROPOSTA"
}: { data: TableRow[]; onClose: () => void; title?: string }) => (
  <CanvasShell onClose={onClose} title={title}>
    <div className="grid grid-cols-3 gap-3 mb-8">
      {[
        { label: "Clienti a rischio", value: "34" },
        { label: "Fatturato esposto", value: "€4.2M" },
        { label: "Score medio", value: "76" },
      ].map((kpi, i) => (
        <motion.div
          key={kpi.label}
          initial={{ opacity: 0, y: 14, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.4 + i * 0.1, duration: 0.5, ease }}
          className="p-4 rounded-xl text-center"
          style={{ background: "hsl(240 5% 7% / 0.4)", border: "1px solid hsl(0 0% 100% / 0.02)" }}
        >
          <div className="text-2xl font-extralight tracking-tight text-foreground/80">{kpi.value}</div>
          <div className="text-[9px] text-muted-foreground/25 mt-1.5 tracking-wider uppercase">{kpi.label}</div>
        </motion.div>
      ))}
    </div>
    <table className="w-full">
      <thead>
        <tr className="text-[9px] text-muted-foreground/25 font-mono tracking-wider">
          <th className="text-left pb-3 font-normal">COMPANY</th>
          <th className="text-left pb-3 font-normal">SETTORE</th>
          <th className="text-right pb-3 font-normal">FATTURATO</th>
          <th className="text-right pb-3 font-normal">GG</th>
          <th className="text-right pb-3 font-normal">SCORE</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <motion.tr
            key={row.name}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + i * 0.06, duration: 0.35, ease }}
            className="border-t border-border/[0.05] group cursor-pointer"
          >
            <td className="py-3 text-[13px] font-light text-foreground/60 group-hover:text-primary/70 transition-colors duration-500">{row.name}</td>
            <td className="py-3 text-[11px] text-muted-foreground/25">{row.sector}</td>
            <td className="py-3 text-[13px] text-right font-mono text-muted-foreground/40">{row.revenue}</td>
            <td className="py-3 text-[12px] text-right text-muted-foreground/25">{row.days}</td>
            <td className="py-3 text-right">
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded-lg ${
                row.churn >= 85 ? "text-destructive/50 bg-destructive/[0.04]"
                : row.churn >= 70 ? "text-warning/50 bg-warning/[0.04]"
                : "text-success/50 bg-success/[0.04]"
              }`}>{row.churn}</span>
            </td>
          </motion.tr>
        ))}
      </tbody>
    </table>
    <TemplateSuggest visible label="Salva questa vista come template" />
  </CanvasShell>
);

/* ── Campaign Canvas ── */
export const CampaignCanvas = ({ onClose }: { onClose: () => void }) => (
  <CanvasShell onClose={onClose} title="CAMPAGNA EMAIL">
    <div className="grid grid-cols-2 gap-3 mb-6">
      {[
        { label: "Destinatari", value: "50" },
        { label: "Template", value: "Re-engagement" },
        { label: "Oggetto", value: "Personalizzato" },
        { label: "Invio previsto", value: "Progressivo" },
      ].map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + i * 0.08, ease }}
          className="p-3.5 rounded-xl"
          style={{ background: "hsl(240 5% 7% / 0.4)", border: "1px solid hsl(0 0% 100% / 0.02)" }}
        >
          <div className="text-[9px] text-muted-foreground/25 tracking-wider uppercase mb-1">{item.label}</div>
          <div className="text-[14px] font-light text-foreground/70">{item.value}</div>
        </motion.div>
      ))}
    </div>

    {/* Email preview */}
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, ease }}
      className="rounded-xl p-5 mb-4"
      style={{ background: "hsl(240 5% 8% / 0.5)", border: "1px solid hsl(0 0% 100% / 0.02)" }}
    >
      <div className="text-[9px] text-muted-foreground/25 tracking-wider uppercase mb-3">ANTEPRIMA EMAIL</div>
      <div className="text-[11px] text-primary/40 mb-2 font-mono">Oggetto: È passato un po' — ci manchi, {'{{company}}'}</div>
      <div className="text-[12px] text-foreground/50 leading-relaxed font-light space-y-2">
        <p>Gentile {'{{contact_name}}'},</p>
        <p>Abbiamo notato che non ci sentiamo da un po'. Il vostro settore {'{{sector}}'} sta vivendo cambiamenti importanti e vorremmo condividere alcune opportunità che potrebbero interessarvi.</p>
        <p className="text-muted-foreground/30">— Generato da Communication Agent</p>
      </div>
    </motion.div>

    <div className="flex items-start gap-3 mt-2">
      <Wand2 className="w-3 h-3 text-primary/20 mt-0.5 flex-shrink-0" />
      <p className="text-[11px] text-muted-foreground/30 leading-relaxed font-light">
        Ogni email sarà personalizzata con nome, azienda, settore e storico interazioni. Invio progressivo in 3 wave da ~17 email.
      </p>
    </div>

    <TemplateSuggest visible label="Salva questa campagna come template" />
  </CanvasShell>
);

/* ── Report Canvas ── */
export const ReportCanvas = ({ onClose }: { onClose: () => void }) => (
  <CanvasShell onClose={onClose} title="REPORT EXECUTIVE">
    {/* Report header */}
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, ease }}
      className="mb-8"
    >
      <div className="text-[9px] text-muted-foreground/20 tracking-wider uppercase mb-4">PARTNER PERFORMANCE · ASIA PACIFIC</div>
      <h3 className="text-xl font-extralight tracking-tight text-foreground/80 mb-1">Executive Summary</h3>
      <p className="text-[12px] text-muted-foreground/35 font-light">Marzo 2026 · Generato automaticamente</p>
    </motion.div>

    {/* KPIs */}
    <div className="grid grid-cols-4 gap-2.5 mb-8">
      {[
        { label: "Partner attivi", value: "23" },
        { label: "Revenue", value: "€8.7M" },
        { label: "Crescita YoY", value: "+14%" },
        { label: "NPS medio", value: "72" },
      ].map((kpi, i) => (
        <motion.div
          key={kpi.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.08, ease }}
          className="p-3 rounded-xl text-center"
          style={{ background: "hsl(240 5% 7% / 0.4)", border: "1px solid hsl(0 0% 100% / 0.02)" }}
        >
          <div className="text-lg font-extralight text-foreground/75">{kpi.value}</div>
          <div className="text-[8px] text-muted-foreground/20 mt-1 tracking-wider uppercase">{kpi.label}</div>
        </motion.div>
      ))}
    </div>

    {/* Report sections */}
    {[
      { title: "Performance", body: "Il portafoglio Asia ha registrato una crescita del 14% YoY, trainata principalmente dal segmento Technology (+22%). Il Giappone resta il mercato più maturo con €3.1M di revenue, mentre il Sud-est Asiatico mostra il tasso di crescita più alto (+31%)." },
      { title: "Rischi", body: "3 partner con revenue >€400k mostrano segni di disengagement (NPS <50, attività in calo). Il partner TechBridge Japan ha ridotto il volume ordini del 28% nel trimestre." },
      { title: "Raccomandazioni", body: "Intensificare il programma partner per il SEA. Avviare un re-engagement strutturato per i 3 partner a rischio. Valutare l'ingresso nel mercato indiano tramite partnership locale." },
    ].map((section, i) => (
      <motion.div
        key={section.title}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 + i * 0.15, ease }}
        className="mb-6"
      >
        <div className="text-[10px] text-primary/30 tracking-wider uppercase mb-2 font-mono">{section.title}</div>
        <p className="text-[12px] text-foreground/50 leading-[1.8] font-light">{section.body}</p>
      </motion.div>
    ))}

    <TemplateSuggest visible label="Salva questo formato report" />
  </CanvasShell>
);

/* ── Execution Result Canvas ── */
export const ResultCanvas = ({ onClose }: { onClose: () => void }) => (
  <CanvasShell onClose={onClose} title="ESECUZIONE COMPLETATA">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, ease }}
      className="text-center py-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        className="w-12 h-12 rounded-full bg-success/8 flex items-center justify-center mx-auto mb-4"
      >
        <ThumbsUp className="w-5 h-5 text-success/50" />
      </motion.div>
      <div className="text-lg font-extralight text-foreground/70 mb-2">Campagna avviata</div>
      <p className="text-[12px] text-muted-foreground/30 font-light">50 email in coda · 3 wave · Completamento stimato: 2h</p>
    </motion.div>

    <div className="grid grid-cols-3 gap-3 mt-4">
      {[
        { label: "In coda", value: "50" },
        { label: "Inviate", value: "0" },
        { label: "Wave attiva", value: "1/3" },
      ].map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + i * 0.1, ease }}
          className="p-3 rounded-xl text-center"
          style={{ background: "hsl(240 5% 7% / 0.4)", border: "1px solid hsl(0 0% 100% / 0.02)" }}
        >
          <div className="text-lg font-extralight text-foreground/70">{s.value}</div>
          <div className="text-[9px] text-muted-foreground/20 mt-1 tracking-wider uppercase">{s.label}</div>
        </motion.div>
      ))}
    </div>

    <TemplateSuggest visible label="Salva questo flusso come automazione" />
  </CanvasShell>
);

/* ── Shell ── */
const CanvasShell = ({ children, onClose, title }: { children: React.ReactNode; onClose: () => void; title: string }) => (
  <div className="h-full flex flex-col rounded-2xl p-6" style={{
    background: "hsl(240 5% 6% / 0.5)",
    backdropFilter: "blur(40px) saturate(1.1)",
    border: "1px solid hsl(0 0% 100% / 0.04)",
    boxShadow: "0 0 80px hsl(210 100% 66% / 0.02), 0 30px 60px -20px hsl(0 0% 0% / 0.4)",
  }}>
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-primary/40"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="text-[10px] text-muted-foreground/30 font-mono tracking-wider">{title}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <button className="text-muted-foreground/15 hover:text-muted-foreground/30 transition-colors duration-500 p-1.5">
          <Download className="w-3 h-3" />
        </button>
        <button onClick={onClose} className="text-muted-foreground/15 hover:text-muted-foreground/30 transition-colors duration-500 p-1.5">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
    <div className="flex-1 overflow-y-auto">{children}</div>
  </div>
);
