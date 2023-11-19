import { useQueryClient } from "@tanstack/react-query"
import { useAuthStore } from "../states/useAuthStore"
import { motion } from "framer-motion"

interface Props {
  menu: boolean
  setmenu: (menu: boolean) => void
}
export default function Menu({ setmenu, menu }: Props) {
  const queryClient = useQueryClient()

  const { setUser } = useAuthStore()

  const logout = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/auth/sign-out', {
        credentials: 'include'
      })
      const data = await res.json()
      if (res.status === 200) {
        setUser({ token: false, expiresIn: false })
        queryClient.clear()
        setmenu(!menu)
      } else {
        throw data
      }
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-4 justify-center items-center w-1/4 border absolute top-16 right-8 bg-white p-4 rounded-md shadow-md"
    >
      <button className="font-sans font-bold py-1 px-4 rounded-md border-b-2 border-blue-400 text-blue-400 hover:opacity-60">
        Perfil
      </button>
      <button
        onClick={logout}
        className="text-red-400 border-b-2 border-red-400 py-1 px-4 rounded-md font-sans font-bold hover:opacity-60"
      >
        Logout
      </button>

    </motion.section>
  )
}