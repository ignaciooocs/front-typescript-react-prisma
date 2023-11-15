import { NavLink, Navigate } from "react-router-dom"
import { useAuthStore } from "../states/useAuthStore"
import NotesList from "../components/NotesList"
import { IoAddCircleOutline } from "react-icons/io5"

export default function Dashboard() {
  const { token } = useAuthStore()

  if (!token) return <Navigate to="/sign-in"/>

  return (
    <section className="flex flex-col items-center">
      <NavLink to='/dashboard/create'><h3 className="flex gap-x-3 items-center font-bold text-gray-500 space-x-1 my-2 p-3 rounded-md opacidad">Agregar Nueva Nota <IoAddCircleOutline /></h3></NavLink>
      <NotesList />
    </section>
  )
}