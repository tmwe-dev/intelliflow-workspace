import { motion } from "framer-motion";
import {
  LayoutTemplate,
  Table,
  BarChart3,
  FileText,
  Kanban,
  Calendar,
  Search,
  Filter,
  Copy,
  Star,
  MoreHorizontal,
} from "lucide-react";

const templates = [
  { id: 1, name: "Analisi Clienti Inattivi", category: "Analisi", icon: Table, starred: true, uses: 23, lastUsed: "2h fa", tags: ["CRM", "Churn", "Report"] },
  { id: 2, name: "Report Vendite Executive", category: "Report", icon: FileText, starred: true, uses: 45, lastUsed: "1g fa", tags: ["Vendite", "Executive"] },
  { id: 3, name: "Pipeline Kanban Dinamica", category: "Vista", icon: Kanban, starred: false, uses: 18, lastUsed: "3g fa", tags: ["Pipeline", "Kanban"] },
  { id: 4, name: "Dashboard KPI Mensile", category: "Dashboard", icon: BarChart3, starred: true, uses: 67, lastUsed: "1h fa", tags: ["KPI", "Dashboard"] },
  { id: 5, name: "Timeline Progetto", category: "Vista", icon: Calendar, starred: false, uses: 12, lastUsed: "5g fa", tags: ["Progetto", "Timeline"] },
  { id: 6, name: "Segmentazione Lead", category: "Analisi", icon: Table, starred: false, uses: 34, lastUsed: "2g fa", tags: ["Lead", "Segmenti"] },
  { id: 7, name: "Confronto Trimestrale", category: "Report", icon: BarChart3, starred: false, uses: 29, lastUsed: "4g fa", tags: ["Confronto", "Q/Q"] },
  { id: 8, name: "Onboarding Clienti Flow", category: "Automazione", icon: Kanban, starred: true, uses: 15, lastUsed: "6g fa", tags: ["Onboarding", "Flow"] },
];

const categories = ["Tutti", "Analisi", "Report", "Vista", "Dashboard", "Automazione"];

const Templates = () => {
  return (
    <div className="min-h-screen pb-24 px-6 pt-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                <LayoutTemplate className="w-4 h-4 text-primary" strokeWidth={1.5} />
              </div>
              <h1 className="text-2xl font-medium tracking-tight">Template Library</h1>
            </div>
            <p className="text-sm text-muted-foreground ml-11">
              23 template salvati · 4 preferiti
            </p>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="flex items-center gap-1 glass-panel-subtle px-3 py-1.5 flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cerca template..."
            className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex items-center gap-1">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`text-xs px-3 py-1.5 rounded-md transition-colors ${
                cat === "Tutti"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {templates.map((tmpl, i) => (
          <motion.div
            key={tmpl.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.04 }}
            className="glass-panel-subtle p-4 cursor-pointer hover:bg-secondary/20 transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <tmpl.icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
              </div>
              <div className="flex items-center gap-1">
                {tmpl.starred && <Star className="w-3.5 h-3.5 text-warning fill-warning" />}
                <button className="w-6 h-6 rounded flex items-center justify-center text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-foreground transition-all">
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <h3 className="text-sm font-medium mb-1">{tmpl.name}</h3>
            <p className="text-[11px] text-muted-foreground mb-3">
              {tmpl.category} · Usato {tmpl.uses} volte · {tmpl.lastUsed}
            </p>
            <div className="flex items-center gap-1.5 flex-wrap">
              {tmpl.tags.map((tag) => (
                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="flex items-center gap-1 text-[11px] text-primary">
                <Copy className="w-3 h-3" /> Duplica
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Templates;
