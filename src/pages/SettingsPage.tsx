import { motion } from "framer-motion";
import {
  Settings,
  User,
  Shield,
  Bell,
  Palette,
  Globe,
  Key,
  Users,
  ChevronRight,
  Bot,
  Sparkles,
  Activity,
  Lock,
  Database,
  Eye,
} from "lucide-react";

const sections = [
  {
    title: "Account",
    items: [
      { icon: User, label: "Profilo", desc: "Nome, email, avatar, preferenze personali" },
      { icon: Shield, label: "Sicurezza", desc: "Password, 2FA, sessioni attive, dispositivi" },
      { icon: Bell, label: "Notifiche", desc: "Email, push, in-app, digest giornaliero" },
    ],
  },
  {
    title: "Workspace",
    items: [
      { icon: Users, label: "Team & Ruoli", desc: "3 membri · Admin, Editor, Viewer" },
      { icon: Key, label: "API Keys & Webhook", desc: "2 chiavi attive · 1 webhook configurato" },
      { icon: Globe, label: "Lingua & Regione", desc: "Italiano · Europe/Rome · EUR" },
      { icon: Palette, label: "Aspetto", desc: "Dark mode · Tema Obsidian Glass" },
    ],
  },
  {
    title: "AI & Orchestrazione",
    items: [
      { icon: Bot, label: "Modelli AI", desc: "Gemini 2.5 Pro (default) · GPT-5 (fallback) · provider multipli" },
      { icon: Activity, label: "Agenti", desc: "7 agenti configurati · Orchestratore, CRM Core, Data Analyst, Communication, Canvas, Automation, Governance" },
      { icon: Lock, label: "Governance AI", desc: "Policy: approvazione richiesta per azioni massive, export >10k record, invii >100 email" },
      { icon: Eye, label: "Trasparenza", desc: "Flusso visibile: suggerimento → anteprima → approvazione → esecuzione → audit" },
    ],
  },
  {
    title: "Core Engine",
    items: [
      { icon: Database, label: "Entità CRM", desc: "contacts, companies, partners, prospects, activities, campaigns, documents, email_drafts, reminders" },
      { icon: Activity, label: "Connessioni", desc: "11 sorgenti attive · 1.8M record · 32 capability mappate" },
    ],
  },
];

const SettingsPage = () => {
  return (
    <div className="min-h-screen pb-24 px-6 lg:px-10 pt-8 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-10">
          <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center glow-primary">
            <Settings className="w-4 h-4 text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Impostazioni</h1>
        </div>
      </motion.div>

      {/* User card */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-5 flex items-center gap-4 mb-10">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-lg font-bold glow-primary">
          MR
        </div>
        <div className="flex-1">
          <div className="text-base font-semibold">Marco Rossi</div>
          <div className="text-xs text-muted-foreground mt-0.5">marco.rossi@enterprise.it · Workspace Admin</div>
        </div>
        <div className="flex items-center gap-2">
          <span className="pill-badge text-[10px] py-0.5">
            <Sparkles className="w-2.5 h-2.5" /> Enterprise
          </span>
        </div>
      </motion.div>

      {/* Settings sections */}
      <div className="space-y-8">
        {sections.map((section, si) => (
          <motion.div key={section.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + si * 0.05 }}>
            <h2 className="section-label mb-3 ml-1">{section.title}</h2>
            <div className="glass-panel divide-y divide-border/30 overflow-hidden">
              {section.items.map((item) => (
                <div key={item.label} className="flex items-center gap-4 p-4 cursor-pointer hover:bg-secondary/10 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center group-hover:bg-primary/8 transition-colors">
                    <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{item.label}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{item.desc}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
