import { motion } from "framer-motion";
import {
  LayoutTemplate,
  Table,
  BarChart3,
  FileText,
  Kanban,
  Calendar,
  Search,
  Copy,
  Star,
  MoreHorizontal,
  Eye,
  Clock,
  Tag,
} from "lucide-react";

const ease = [0.2, 0.8, 0.2, 1] as const;

const templates = [
  { id: 1, name: "Analisi Clienti Inattivi", category: "Analisi", icon: Table, starred: true, uses: 23, lastUsed: "2h fa", version: "v2.1", tags: ["CRM", "Churn", "Report"], preview: "Tabella + KPI + Insight AI" },
  { id: 2, name: "Report Vendite Executive", category: "Report", icon: FileText, starred: true, uses: 45, lastUsed: "1g fa", version: "v3.0", tags: ["Vendite", "Executive", "PDF"], preview: "Report navigabile con grafici" },
  { id: 3, name: "Pipeline Kanban Dinamica", category: "Vista", icon: Kanban, starred: false, uses: 18, lastUsed: "3g fa", version: "v1.4", tags: ["Pipeline", "Kanban", "Deals"], preview: "Board con drag & drop" },
  { id: 4, name: "Dashboard KPI Real-time", category: "Dashboard", icon: BarChart3, starred: true, uses: 67, lastUsed: "1h fa", version: "v4.2", tags: ["KPI", "Dashboard", "Live"], preview: "4 widget + grafico trend" },
  { id: 5, name: "Timeline Progetto", category: "Vista", icon: Calendar, starred: false, uses: 12, lastUsed: "5g fa", version: "v1.0", tags: ["Progetto", "Timeline", "Gantt"], preview: "Gantt interattivo" },
  { id: 6, name: "Segmentazione Lead Scoring", category: "Analisi", icon: Table, starred: false, uses: 34, lastUsed: "2g fa", version: "v2.0", tags: ["Lead", "Segmenti", "Scoring"], preview: "Tabella filtri + distribuzioni" },
  { id: 7, name: "Confronto Trimestrale Q/Q", category: "Report", icon: BarChart3, starred: false, uses: 29, lastUsed: "4g fa", version: "v1.8", tags: ["Confronto", "Trimestrale"], preview: "Dual chart + delta" },
  { id: 8, name: "Onboarding Clienti Flow", category: "Automazione", icon: Kanban, starred: true, uses: 15, lastUsed: "6g fa", version: "v1.2", tags: ["Onboarding", "Flow", "Auto"], preview: "Flow step-by-step" },
  { id: 9, name: "Campagna Email Builder", category: "Automazione", icon: FileText, starred: false, uses: 41, lastUsed: "1g fa", version: "v2.5", tags: ["Email", "Campagna", "Template"], preview: "Preview email + audience" },
];

const categories = ["Tutti", "Analisi", "Report", "Vista", "Dashboard", "Automazione"];

const Templates = () => {
  return (
    <div className="min-h-screen pb-24 px-6 lg:px-10 pt-8 max-w-[1400px] mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center glow-primary">
                <LayoutTemplate className="w-4 h-4 text-primary" strokeWidth={1.5} />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">Template Library</h1>
            </div>
            <p className="text-sm text-muted-foreground ml-12">
              Viste, report e flussi salvati per riuso intelligente
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="font-mono text-xs">{templates.length} template</span>
            <span>·</span>
            <span className="font-mono text-xs">{templates.filter(t => t.starred).length} preferiti</span>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex items-center gap-3 mb-8">
        <div className="flex items-center gap-2 glass-panel px-4 py-2.5 flex-1 max-w-md rounded-xl">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input type="text" placeholder="Cerca template..." className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground" />
        </div>
        <div className="flex items-center gap-1">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`text-[11px] px-3 py-2 rounded-lg transition-all ${
                cat === "Tutti" ? "bg-primary/10 text-primary border border-primary/20" : "glass-panel-subtle text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((tmpl, i) => (
          <motion.div
            key={tmpl.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.04, ease }}
            className="glass-panel p-5 cursor-pointer group hover:border-primary/10 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center">
                <tmpl.icon className="w-5 h-5 text-primary/70" strokeWidth={1.5} />
              </div>
              <div className="flex items-center gap-1.5">
                {tmpl.starred && <Star className="w-3.5 h-3.5 text-warning fill-warning" />}
                <span className="text-[9px] font-mono text-muted-foreground px-1.5 py-0.5 rounded glass-panel-subtle">{tmpl.version}</span>
              </div>
            </div>

            <h3 className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors">{tmpl.name}</h3>
            <p className="text-[11px] text-muted-foreground mb-1">{tmpl.category}</p>

            {/* Preview */}
            <div className="glass-panel-subtle p-3 rounded-lg mb-3 mt-3">
              <div className="flex items-center gap-1.5 text-[10px] text-secondary-foreground">
                <Eye className="w-3 h-3 text-primary/50" />
                {tmpl.preview}
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap mb-3">
              {tmpl.tags.map((tag) => (
                <span key={tag} className="text-[9px] px-2 py-0.5 rounded-full glass-panel-subtle text-muted-foreground flex items-center gap-1">
                  <Tag className="w-2 h-2" />{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between text-[10px] text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-2.5 h-2.5" /> {tmpl.lastUsed}
              </div>
              <span>{tmpl.uses} utilizzi</span>
            </div>

            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/30 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="flex items-center gap-1 text-[11px] text-primary hover:text-primary/80">
                <Copy className="w-3 h-3" /> Duplica
              </button>
              <button className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground ml-auto">
                <MoreHorizontal className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Templates;
