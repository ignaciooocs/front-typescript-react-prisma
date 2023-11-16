import { Navigate } from "react-router-dom";
import CreateNote from "../components/CreateNote";
import { useAuthStore } from "../states/useAuthStore";
import { motion } from 'framer-motion'

export default function CreatePage () {
    const { token } = useAuthStore()
    if (!token) return <Navigate to="/sign-in"/>

    const opacity = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
      };

    return (
        <motion.section 
            variants={opacity}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center items-center w-full py-10">
            <CreateNote />
        </motion.section>
    )
}