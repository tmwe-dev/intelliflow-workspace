import { motion } from "framer-motion";

interface AiEntityProps {
  size?: "sm" | "md" | "lg" | "hero";
  pulse?: boolean;
  className?: string;
}

const sizes = {
  sm: { outer: 32, inner: 14, ring: 40 },
  md: { outer: 48, inner: 20, ring: 60 },
  lg: { outer: 72, inner: 30, ring: 90 },
  hero: { outer: 120, inner: 50, ring: 160 },
};

const AiEntity = ({ size = "md", pulse = true, className = "" }: AiEntityProps) => {
  const s = sizes[size];

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: s.ring, height: s.ring }}>
      {/* Outer aurora — the soul */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, hsl(210 100% 66% / 0.08) 0%, hsl(270 60% 62% / 0.04) 50%, transparent 70%)`,
          filter: "blur(20px)",
        }}
        animate={pulse ? {
          scale: [1, 1.15, 1],
          opacity: [0.6, 1, 0.6],
        } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Mid ring — magnetic field */}
      <motion.div
        className="absolute rounded-full border border-primary/[0.06]"
        style={{ width: s.outer + 16, height: s.outer + 16 }}
        animate={pulse ? { rotate: 360 } : {}}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <motion.div
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          style={{ top: -1, left: "50%", marginLeft: -2 }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Core sphere */}
      <motion.div
        className="relative rounded-full flex items-center justify-center"
        style={{
          width: s.outer,
          height: s.outer,
          background: `radial-gradient(circle at 35% 35%, hsl(210 100% 75% / 0.15), hsl(270 60% 55% / 0.08) 60%, hsl(240 5% 6% / 0.3))`,
          boxShadow: `
            0 0 ${s.outer}px hsl(210 100% 66% / 0.06),
            inset 0 0 ${s.inner}px hsl(210 100% 66% / 0.04)
          `,
        }}
        animate={pulse ? {
          scale: [1, 1.03, 1],
        } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        {/* Inner light — the iris */}
        <motion.div
          className="rounded-full"
          style={{
            width: s.inner,
            height: s.inner,
            background: `radial-gradient(circle at 40% 40%, hsl(210 100% 80% / 0.4), hsl(270 60% 65% / 0.15) 70%, transparent)`,
          }}
          animate={pulse ? {
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7],
          } : {}}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Specular highlight */}
        <div
          className="absolute rounded-full bg-foreground/[0.06]"
          style={{
            width: s.inner * 0.4,
            height: s.inner * 0.25,
            top: "22%",
            left: "28%",
            filter: "blur(3px)",
          }}
        />
      </motion.div>
    </div>
  );
};

export default AiEntity;
