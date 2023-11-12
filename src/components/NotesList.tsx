import { useQuery } from "@tanstack/react-query"
import { useAuthStore } from "../states/useAuthStore"
import { Link } from "react-router-dom"

export default function NotesList() {
  const { token } = useAuthStore()
  const { data, isLoading, error } = useQuery({
    queryKey: ['Notes'],
    queryFn: async () => {
      const res = await fetch('http://localhost:4000/api/notes', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      return await res.json()
    }
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error</p>
  return (
    <section className="flex flex-col items-center gap-4 w-4/5 my-10">
      <h3>Lista de notas</h3>
        <ul className="flex flex-col gap-4 w-3/4">
          {data?.notes.map((note: { id: string, title: string, body: string}) => (
            <Link key={note.id} to={`/note/${note.id}`}>
              <li className="list-none bg-gray-100 py-4 px-5">
                <b>{note.title}</b>
                <p className="text-start">{note.body}</p>
              </li>
            </Link>
          ))}
        </ul>
    </section>
  )
}