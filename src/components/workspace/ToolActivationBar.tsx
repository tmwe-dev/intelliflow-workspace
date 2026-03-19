import { motion, AnimatePresence } from "framer-motion";
import { Database, Users, Mail, Search, Mic, Brain, Shield, Zap, FileText, Layers, GitMerge } from "lucide-react";

const ease = [0.2, 0.8, 0.2, 1] as const;

interface ToolActivation {
  icon: typeof Database;
  label: string;
  color: string;
}

interface SourceTag {
  name: string;
  color: string;
}

const toolMap: Record<string, { tools: ToolActivation[]; sources: SourceTag[] }> = {
  churn: {
    tools: [
      { icon: GitMerge, label: "Unification", color: "38 90% 50%" },
      { icon: Database, label: "CRM Core", color: "210 100% 66%" },
      { icon: Users, label: "Partner DB", color: "270 60% 62%" },
      { icon: Brain, label: "ML Scoring", color: "152 60% 45%" },
      { icon: Search, label: "Deep Search", color: "38 90% 50%" },
    ],
    sources: [
      { name: "WCA Network", color: "210 100% 66%" },
      { name: "CRM Core", color: "270 60% 62%" },
      { name: "Company Reports", color: "152 60% 45%" },
    ],
  },
  campaign: {
    tools: [
      { icon: GitMerge, label: "Unification", color: "38 90% 50%" },
      { icon: Database, label: "Contact DB", color: "210 100% 66%" },
      { icon: Mail, label: "Email Engine", color: "270 60% 62%" },
      { icon: FileText, label: "Drafting AI", color: "152 60% 45%" },
      { icon: Zap, label: "Execution", color: "38 90% 50%" },
      { icon: Shield, label: "Governance", color: "210 100% 66%" },
    ],
    sources: [
      { name: "Contatti Import", color: "210 100% 66%" },
      { name: "WCA Network", color: "270 60% 62%" },
      { name: "Deep Search", color: "38 90% 50%" },
    ],
  },
  report: {
    tools: [
      { icon: GitMerge, label: "Unification", color: "38 90% 50%" },
      { icon: Users, label: "Partner Intel", color: "210 100% 66%" },
      { icon: Brain, label: "Data Analyst", color: "270 60% 62%" },
      { icon: Layers, label: "Canvas", color: "152 60% 45%" },
      { icon: FileText, label: "Template", color: "38 90% 50%" },
    ],
    sources: [
      { name: "WCA Network", color: "210 100% 66%" },
      { name: "Company Reports", color: "152 60% 45%" },
      { name: "Activity DB", color: "270 60% 62%" },
    ],
  },
  email: {
    tools: [
      { icon: Database, label: "Contact DB", color: "210 100% 66%" },
      { icon: Mail, label: "Email Draft", color: "270 60% 62%" },
      { icon: Brain, label: "Tone AI", color: "152 60% 45%" },
      { icon: Layers, label: "Template", color: "38 90% 50%" },
    ],
    sources: [
      { name: "Contatti Import", color: "210 100% 66%" },
      { name: "Business Card", color: "38 90% 50%" },
    ],
  },
  voice: {
    tools: [
      { icon: Mic, label: "Voice AI", color: "152 60% 45%" },
      { icon: Brain, label: "TTS Engine", color: "270 60% 62%" },
      { icon: Database, label: "Context", color: "210 100% 66%" },
    ],
    sources: [
      { name: "CRM Core", color: "210 100% 66%" },
    ],
  },
};

interface ToolActivationBarProps {
  scenarioKey: string | null;
  visible: boolean;
}

const ToolActivationBar = ({ scenarioKey, visible }: ToolActivationBarProps) => {
  const entry = scenarioKey ? toolMap[scenarioKey] || toolMap.churn : null;
  const tools = entry?.tools || [];
  const sources = entry?.sources || [];

  return (
    <AnimatePresence>
      {visible && tools.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4, ease }}
          className="overflow-hidden"
        >
          {/* Tools */}
          <div className="flex items-center gap-1 py-2 px-1">
            <span className="text-[8px] text-muted-foreground/15 tracking-[0.2em] uppercase mr-2 font-mono">ATTIVI</span>
            {tools.map((tool, i) => (
              <motion.div
                key={tool.label}
                initial={{ opacity: 0, scale: 0.8, x: -8 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.3, ease }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl"
                style={{ background: `hsl(${tool.color} / 0.04)`, border: `1px solid hsl(${tool.color} / 0.06)` }}
              >
                <tool.icon className="w-2.5 h-2.5" style={{ color: `hsl(${tool.color} / 0.35)` }} strokeWidth={1.5} />
                <span className="text-[9px] font-light" style={{ color: `hsl(${tool.color} / 0.4)` }}>{tool.label}</span>
              </motion.div>
            ))}
          </div>
          {/* Sources */}
          {sources.length > 0 && (
            <div className="flex items-center gap-1 py-1 px-1">
              <span className="text-[8px] text-muted-foreground/15 tracking-[0.2em] uppercase mr-2 font-mono">FONTI</span>
              {sources.map((src, i) => (
                <motion.span
                  key={src.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="text-[8px] px-2 py-1 rounded-lg font-mono"
                  style={{ color: `hsl(${src.color} / 0.35)`, background: `hsl(${src.color} / 0.03)`, border: `1px solid hsl(${src.color} / 0.04)` }}
                >
                  {src.name}
                </motion.span>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ToolActivationBar;
