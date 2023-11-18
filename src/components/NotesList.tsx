import { useQuery } from "@tanstack/react-query"
import { getAllNotes } from "../services/noteServices"
import { motion } from 'framer-motion'
import ItemNote from "./ItemNote"
import { Note } from "./Note"
import { useParams } from "react-router-dom"
import PageControl from "./PageControl"

export default function NotesList() {
  const { page } = useParams()

  const { data, isLoading, error } = useQuery({
    queryKey: [page],
    queryFn: () => getAllNotes(page as string)
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error</p>
  if (data.error) return <p>No authorizado</p>


  return (
    <section className="flex flex-col items-center gap-4 w-full md:w-3/4 mb-4">
      <motion.h3
        className="font-bold text-gray-500 space-x-1 my-5"
      >
        Lista de notas
      </motion.h3>
      <motion.ul
        className="flex flex-col gap-4 w-full px-3 md:w-3/4">
        {data?.notes.map((note: Note) => (
          <ItemNote key={note.id} note={note} />
        ))}
        {data?.notes.length === 0 && <p>No hay notas</p>}
        <PageControl length={data.notes.length} />
      </motion.ul>
    </section>
  )
}