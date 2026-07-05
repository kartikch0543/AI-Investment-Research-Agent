import { motion } from "framer-motion";

function GlassPanel({ children, className = "" }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`premium-panel rounded-2xl p-6 transition-all duration-300 ${className}`}
    >
      {children}
    </motion.section>
  );
}

export default GlassPanel;
