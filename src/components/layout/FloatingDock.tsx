import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, MessageSquare, Sparkles, Layers, Zap, Shield, Settings, Cpu, Plug } from "lucide-react";

const items = [
  { to: "/dashboard", icon: Home },
  { to: "/workspace", icon: MessageSquare },
  { to: "/capabilities", icon: Sparkles },
  { to: "/engine", icon: Cpu },
  { to: "/connections", icon: Plug },
  { to: "/templates", icon: Layers },
  { to: "/automations", icon: Zap },
  { to: "/audit", icon: Shield },
  { to: "/settings", icon: Settings },
];

const FloatingDock = () => {
  const location = useLocation();

  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 30 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="float-panel flex items-center gap-0.5 px-2 py-1.5">
        {items.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink key={item.to} to={item.to} className="relative">
              <div className={`p-2.5 rounded-xl transition-all duration-300 ${
                isActive ? "text-primary bg-primary/8" : "text-muted-foreground/25 hover:text-muted-foreground/50"
              }`}>
                <item.icon className="w-4 h-4" strokeWidth={1.5} />
              </div>
              {isActive && (
                <motion.div
                  layoutId="dock-dot"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary/40 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </NavLink>
          );
        })}
      </div>
    </motion.div>
  );
};

export default FloatingDock;
