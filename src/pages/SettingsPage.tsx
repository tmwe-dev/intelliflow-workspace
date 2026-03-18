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
} from "lucide-react";

const sections = [
  {
    title: "Account",
    items: [
      { icon: User, label: "Profilo", desc: "Nome, email, avatar" },
      { icon: Shield, label: "Sicurezza", desc: "Password, 2FA, sessioni attive" },
      { icon: Bell, label: "Notifiche", desc: "Email, push, in-app" },
    ],
  },
  {
    title: "Workspace",
    items: [
      { icon: Users, label: "Team & Ruoli", desc: "3 membri · 2 admin, 1 viewer" },
      { icon: Key, label: "API Keys", desc: "2 chiavi attive" },
      { icon: Globe, label: "Lingua & Regione", desc: "Italiano · Europe/Rome" },
      { icon: Palette, label: "Aspetto", desc: "Dark mode · Tema Obsidian" },
    ],
  },
  {
    title: "AI & Agenti",
    items: [
      { icon: Settings, label: "Modelli AI", desc: "Configurazione modelli e preferenze" },
      { icon: Shield, label: "Governance AI", desc: "Limiti operativi, conferme richieste" },
    ],
  },
];

const SettingsPage = () => {
  return (
    <div className="min-h-screen pb-24 px-6 pt-8 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
            <Settings className="w-4 h-4 text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-medium tracking-tight">Impostazioni</h1>
        </div>
      </motion.div>

      {/* User card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel p-5 flex items-center gap-4 mb-8"
      >
        <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center text-primary text-lg font-medium">
          MR
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium">Marco Rossi</div>
          <div className="text-xs text-muted-foreground">marco.rossi@enterprise.it · Admin</div>
        </div>
        <span className="text-[10px] px-2 py-1 rounded-full bg-success/15 text-success">Pro Plan</span>
      </motion.div>

      {/* Settings sections */}
      <div className="space-y-8">
        {sections.map((section, si) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + si * 0.05 }}
          >
            <h2 className="text-xs font-medium text-muted-foreground tracking-wide uppercase mb-3">
              {section.title}
            </h2>
            <div className="glass-panel-subtle divide-y divide-border/50 overflow-hidden">
              {section.items.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 p-4 cursor-pointer hover:bg-secondary/20 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.desc}</div>
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
