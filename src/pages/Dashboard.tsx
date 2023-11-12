import { Navigate } from "react-router-dom"
import { useAuthStore } from "../states/useAuthStore"
import NotesList from "../components/NotesList"
import CreateNote from "../components/CreateNote"

export default function Dashboard() {
  const { token } = useAuthStore()

  if (!token) return <Navigate to="/sign-in"/>

  return (
    <section className="flex flex-col items-center gap-y-4">
      <h3 className="font-bold text-gray-500 space-x-1 my-5">Crear Nota</h3>
      <CreateNote />
      <NotesList />
    </section>
  )
}