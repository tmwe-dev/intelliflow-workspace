import { motion } from "framer-motion";
import { Settings, User, Shield, Bell, Palette, Globe, Key, Users, ChevronRight, Bot, Database, Lock } from "lucide-react";

const items = [
  { icon: User, label: "Profilo", desc: "Nome, email, preferenze" },
  { icon: Shield, label: "Sicurezza", desc: "Password, 2FA, sessioni" },
  { icon: Bell, label: "Notifiche", desc: "Email, push, digest" },
  { icon: Users, label: "Team", desc: "3 membri" },
  { icon: Key, label: "API Keys", desc: "2 chiavi attive" },
  { icon: Globe, label: "Lingua", desc: "Italiano" },
  { icon: Palette, label: "Aspetto", desc: "Dark mode" },
  { icon: Bot, label: "Modelli AI", desc: "Gemini 2.5 Pro" },
  { icon: Database, label: "Connessioni", desc: "11 sorgenti" },
  { icon: Lock, label: "Governance", desc: "Policy attive" },
];

const SettingsPage = () => {
  return (
    <div className="min-h-screen pb-24 flex flex-col items-center px-6 pt-16">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/[0.02] blur-[120px]" />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12 relative z-10">
        <Settings className="w-5 h-5 text-primary/30 mx-auto mb-4" strokeWidth={1.5} />
        <h1 className="text-2xl font-light tracking-tight mb-2">Impostazioni</h1>
      </motion.div>

      {/* User */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="w-full max-w-lg mb-10 relative z-10">
        <div className="float-panel p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-sm font-medium">MR</div>
          <div>
            <div className="text-sm font-medium">Marco Rossi</div>
            <div className="text-[11px] text-muted-foreground/30">marco.rossi@enterprise.it</div>
          </div>
        </div>
      </motion.div>

      <div className="w-full max-w-lg relative z-10 space-y-0.5">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 + i * 0.03 }}
            className="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-secondary/5 transition-colors duration-300 cursor-pointer group"
          >
            <item.icon className="w-4 h-4 text-muted-foreground/20 group-hover:text-primary/30 transition-colors duration-300" strokeWidth={1.5} />
            <div className="flex-1">
              <span className="text-sm font-light">{item.label}</span>
              <span className="text-[11px] text-muted-foreground/25 ml-2">{item.desc}</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/10 group-hover:text-muted-foreground/30 transition-colors duration-300" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
