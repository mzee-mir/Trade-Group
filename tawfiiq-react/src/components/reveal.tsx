import { motion, type HTMLMotionProps } from "framer-motion"

/** Fades and lifts its content in once it scrolls into view.
    Reduced-motion users get the content without movement (via <MotionConfig reducedMotion="user">). */
export function Reveal({ delay = 0, y = 18, ...props }: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      {...props}
    />
  )
}
