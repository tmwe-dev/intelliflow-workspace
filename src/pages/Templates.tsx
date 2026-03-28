import { motion } from "framer-motion";
import { LayoutTemplate, Table, BarChart3, FileText, Mail, Shield, Star, Clock, Kanban, Calendar } from "lucide-react";

const ease = [0.2, 0.8, 0.2, 1] as const;

const templates = [
  { name: "Analisi Churn Clienti", icon: Table, starred: true, uses: 23, time: "2h fa", category: "Analisi" },
  { name: "Report Executive Vendite", icon: FileText, starred: true, uses: 45, time: "1g fa", category: "Report" },
  { name: "Pipeline Kanban", icon: Kanban, starred: false, uses: 18, time: "3g fa", category: "Vista" },
  { name: "Dashboard KPI", icon: BarChart3, starred: true, uses: 67, time: "1h fa", category: "Dashboard" },
  { name: "Timeline Attività Partner", icon: Calendar, starred: false, uses: 12, time: "5g fa", category: "Vista" },
  { name: "Campagna Email Builder", icon: Mail, starred: true, uses: 41, time: "1g fa", category: "Automazione" },
  { name: "Confronto Trimestrale", icon: BarChart3, starred: false, uses: 29, time: "4g fa", category: "Report" },
  { name: "Audit Compliance", icon: Shield, starred: false, uses: 8, time: "6g fa", category: "Governance" },
];

const Templates = () => {
  return (
    <div className="min-h-screen pb-24 flex flex-col items-center px-6 pt-16">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-accent/[0.02] blur-[120px]" />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="text-center mb-16 relative z-10">
        <LayoutTemplate className="w-5 h-5 text-primary/70 mx-auto mb-4" strokeWidth={1.5} />
        <h1 className="text-2xl font-light tracking-tight mb-2">Template</h1>
        <p className="text-sm text-muted-foreground/70 font-light">Viste, report e flussi salvati</p>
      </motion.div>

      <div className="w-full max-w-3xl grid md:grid-cols-2 gap-3 relative z-10">
        {templates.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05, ease }}
            className="float-panel-interactive p-5 group"
          >
            <div className="flex items-start justify-between mb-3">
              <t.icon className="w-4 h-4 text-primary/20" strokeWidth={1.5} />
              {t.starred && <Star className="w-3 h-3 text-warning/40 fill-warning/40" />}
            </div>
            <h3 className="text-sm font-medium mb-1 group-hover:text-primary transition-colors duration-300">{t.name}</h3>
            <p className="text-[11px] text-muted-foreground/55">{t.category}</p>
            <div className="flex items-center gap-3 mt-4 text-[10px] text-muted-foreground/70">
              <span className="flex items-center gap-1"><Clock className="w-2.5 h-2.5" /> {t.time}</span>
              <span>{t.uses} utilizzi</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Templates;
