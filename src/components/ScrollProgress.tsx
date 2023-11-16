import { useScroll, useSpring, motion } from "react-magic-motion";
export default function Loading () {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress)

return <motion.div className="progress-bar" style={{ scaleX }} />
}