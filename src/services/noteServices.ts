import { FormEvent } from "react"
import { refreshToken } from "./authServices"

interface CreateProps {
  e: FormEvent<HTMLFormElement>,
  token: string,
  input: { body: string, title: string },
  setError: (data: string | boolean) => void,
  navigate: (rute: string) => void
}

interface UpdateProps {
  note: { body: string, title: string },
  id: string,
  token: string
}

export const createNote = async ({ e, input, token, navigate, setError }: CreateProps): Promise<void> => {
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
      navigate('/dashboard/1')
    } else {
      setError(data.error as string)
      throw data
    }
  } catch (error) {
    console.log(error)
    console.log('Ocurrio un error al crear la nota')
  }
}

export const getAllNotes = async (page: string) => {
  try {
    const token = await refreshToken()
    if (token) {
      const res = await fetch(`http://localhost:4000/api/notes/${page}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.status === 401) return { error: 'Unauthorized' }
      return await res.json()
    } else {
      return { error: 'No existe el refresh token' }
    }
  } catch (error) {
    console.log('Error get notes')
  }
}

export const updateNote = async ({ note, id, token }: UpdateProps) => {
  try {
    await fetch('http://localhost:4000/api/notes/one/' + id, {
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
    await fetch('http://localhost:4000/api/notes/one/' + id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  } catch (error) {
    console.log(error)
  }
}