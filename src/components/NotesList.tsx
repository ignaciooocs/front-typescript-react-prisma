import { useQuery } from "@tanstack/react-query"
import { useAuthStore } from "../states/useAuthStore"
import { Link } from "react-router-dom"
import { getAllNotes } from "../services/noteServices"

export default function NotesList() {
  const { token } = useAuthStore()

  const { data, isLoading, error } = useQuery({
    queryKey: ['Notes'],
    queryFn: () => getAllNotes(token as string)
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error</p>
  if (data.error) return <p>No authorizado</p>

  return (
    <section className="flex flex-col items-center gap-4 w-full md:w-3/4 mb-4">
      <h3 className="font-bold text-gray-500 space-x-1 my-5">Lista de notas</h3>
          <ul className="flex flex-col gap-4 w-5/6 md:w-3/4">
            {data?.notes.map((note: { id: string, title: string, body: string}) => (
              <Link key={note.id} to={`/note/${note.id}`}>
                <li className="opacidad list-none bg-gray-100 py-4 px-5 active:opacity-5">
                  <b>{note.title}</b>
                  <p className="text-start">{note.body}</p>
                </li>
              </Link>
            ))}
          </ul>
    </section>
  )
}