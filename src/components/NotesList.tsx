import { useQuery } from "@tanstack/react-query"
import { useAuthStore } from "../states/useAuthStore"
import { Link } from "react-router-dom"
import { getAllNotes } from "../services/noteServices"
import { AnimatePresence, motion } from 'framer-motion'

export default function NotesList() {
  const { token } = useAuthStore()

  const { data, isLoading, error } = useQuery({
    queryKey: ['Notes'],
    queryFn: () => getAllNotes(token as string)
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error</p>
  if (data.error) return <p>No authorizado</p>

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <section className="flex flex-col items-center gap-4 w-full md:w-3/4 mb-4">
      <motion.h3 
        className="font-bold text-gray-500 space-x-1 my-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Lista de notas
      </motion.h3>
          <motion.ul 
            layout 
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-4 w-5/6 md:w-3/4">
            <AnimatePresence>
              {data?.notes.map((note: { id: string, title: string, body: string}) => (
                <Link key={note.id} to={`/note/${note.id}`}>
                  <motion.li
                    variants={item}
                    whileHover={{ scale: 1.03}}
                    className="opacidad list-none bg-gray-100 py-4 px-5 active:opacity-5">
                    <b>{note.title}</b>
                    <p className="text-start">{note.body}</p>
                  </motion.li>
                </Link>
              ))}
            </AnimatePresence>
          </motion.ul>
    </section>
  )
}