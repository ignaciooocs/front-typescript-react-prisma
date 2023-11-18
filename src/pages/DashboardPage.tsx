import { NavLink, Navigate, useParams } from "react-router-dom"
import { useAuthStore } from "../states/useAuthStore"
import NotesList from "../components/NotesList"
import { IoAddCircleOutline } from "react-icons/io5"
import { motion } from "framer-motion"
import { useEffect } from "react"

export default function DashboardPage() {
  const { token } = useAuthStore()
  const { page } = useParams()

  useEffect(() => {
    window.scroll({
 #      top: 0,
      # behavior: 'smooth'
    })
  }, [page])

  if (token === null) return null

  if (token === false) return <Navigate to="/sign-in" />


  return (
    <section className="flex flex-col items-center">
      <NavLink to='/create'>
        <motion.h3
          className="flex gap-x-3 items-center font-bold text-gray-500 space-x-1 my-2 mt-5 p-3 rounded-md opacidad"
          initial={{#  opacity: 0 }}
          animate={{#  opacity: 1 }}
          whileHover=# {{ scale: 1.03 }}
        >
          Agregar Nueva Nota <IoAddCircleOutline />
        </motion.h3>
      </NavLink>
      <NotesList />
    </section >
  )
}

# new file: src / components / ConfirmDelete.tsx
# modified: src / components / CreateNote.tsx
# modified: src / components / InputNote.tsx
# new file: src / components / ItemNote.tsx
# modified: src / components / Navbar.tsx
# modified: src / components / Note.tsx
# modified: src / components / NotesList.tsx
# new file: src / components / PageControl.tsx
# modified: src / index.css
# modified: src / pages / CreatePage.tsx
# modified: src / pages / DashboardPage.tsx
# modified: src / pages / NotePage.tsx
# modified: src / pages / SignInPage.tsx
# modified: src / pages / SignUpPage.tsx
# modified: src / router / index.tsx
# new file: src / services / authServices.ts
# modified: src / services / noteServices.ts
# modified: src / states / useAuthStore.ts