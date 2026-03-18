import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  MessageSquare,
  Plug,
  LayoutTemplate,
  Zap,
  Shield,
  Settings,
} from "lucide-react";

const dockItems = [
  { to: "/dashboard", icon: Home, label: "Home" },
  { to: "/workspace", icon: MessageSquare, label: "Workspace" },
  { to: "/connections", icon: Plug, label: "Connessioni" },
  { to: "/templates", icon: LayoutTemplate, label: "Template" },
  { to: "/automations", icon: Zap, label: "Automazioni" },
  { to: "/audit", icon: Shield, label: "Audit" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

const FloatingDock = () => {
  const location = useLocation();

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 25 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="glass-panel flex items-center gap-1 px-3 py-2">
        {dockItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink key={item.to} to={item.to} className="relative group">
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <item.icon className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-xs font-medium hidden md:inline">
                  {item.label}
                </span>
              </div>
              {isActive && (
                <motion.div
                  layoutId="dock-indicator"
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full"
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
