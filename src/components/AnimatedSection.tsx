import { motion } from "framer-motion";
import { ReactNode } from "react";

const AnimatedSection = ({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export default AnimatedSection;
