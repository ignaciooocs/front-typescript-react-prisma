import { NavLink, Navigate } from "react-router-dom"
import { useAuthStore } from "../states/useAuthStore"
import NotesList from "../components/NotesList"
import { IoAddCircleOutline } from "react-icons/io5"
import { motion } from "framer-motion"

export default function DashboardPage() {
  const { token } = useAuthStore()

  if (!token) return <Navigate to="/sign-in"/>

  return (
    <section className="flex flex-col items-center">
      <NavLink to='/dashboard/create'>
        <motion.h3 
          className="flex gap-x-3 items-center font-bold text-gray-500 space-x-1 my-2 mt-5 p-3 rounded-md opacidad"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.03 }}
        >
          Agregar Nueva Nota <IoAddCircleOutline />
        </motion.h3>
      </NavLink>
      <NotesList />
    </section>
  )
}