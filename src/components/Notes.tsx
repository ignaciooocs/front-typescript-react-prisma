import { useParams } from "react-router-dom"
import { useAuthStore } from "../states/useAuthStore"
import { useQuery } from "@tanstack/react-query"

export default function Notes () {
  const { id } = useParams()
  const { token } = useAuthStore()

  const { data, isLoading, error } = useQuery({
    queryKey: ['Notes'],
    queryFn: async () => {
      const res = await fetch('http://localhost:4000/api/notes/' + id, {
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
    <section>
      <article>
        <h3>{data?.note.title}</h3>
        <p>{data?.note.body}</p>
      </article>
    </section>
  )
}