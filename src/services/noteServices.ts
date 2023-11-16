import { FormEvent } from "react"

export const getAllNotes = async (token: string) => {
  const res = await fetch('http://localhost:4000/api/notes', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  if (res.status === 401) return { error: 'Unauthorized'}
  return await res.json()
}

export const updateNote = async ({ note, id, token }: { note: { body: string, title: string }, id: string, token: string }) => {
  try {
    await fetch('http://localhost:4000/api/notes/'+id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(note)
    })

  } catch (error) {
   console.log(error) 
  }
}

export const deleteNote = async ({ id, token }: { id: string, token: string }) => {
  try {
    await fetch('http://localhost:4000/api/notes/'+id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  } catch (error) {
    console.log(error)
  }
}

interface CreateProps {
  e: FormEvent<HTMLFormElement>,
  token: string,
  input: { body: string, title: string },
  setError: (data: string) => void,
  navigate: (rute: string) => void
}

export const handleSubmit = async ({ e, input, token, navigate, setError }: CreateProps): Promise<void> => {
  e.preventDefault()
  try {
    const res = await fetch('http://localhost:4000/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(input)
    })
    const data = await res.json()
    if (res.status === 201) {
      navigate('/dashboard')
      console.log(data)
    } else {
      setError(data.error)
      throw data
    }
  } catch (error) {
    console.log(error)
    console.log('Ocurrio un error al crear la nota')
  }
}