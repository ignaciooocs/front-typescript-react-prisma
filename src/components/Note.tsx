import { useParams } from "react-router-dom"
import { useAuthStore } from "../states/useAuthStore"
import { useQuery } from "@tanstack/react-query"
import InputNote from "./InputNote"

export interface Note {
    body: string
    createdAt: string
    id: string
    title: string
    userId: string
  }


export default function Note () {
  const { id } = useParams()
  const { token } = useAuthStore()
  
  const { data, isLoading, error } = useQuery({
    queryKey: [id],
    queryFn: async (): Promise<Note> => {
      const res = await fetch('http://localhost:4000/api/notes/' + id, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await res.json()
      return data.note as Note
    }
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  return (
    <section className="flex flex-col items-center gap-4 font-sans">
      <article className="flex flex-col items-center gap-4 w-5/6 md:w-1/2">
        <h3 className="text-xl font-bold text-gray-600 py-5">{data?.title}</h3>
        {data && <InputNote note={data}/>}
      </article>
    </section>
  )
}