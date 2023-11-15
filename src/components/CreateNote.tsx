import { useAuthStore } from "../states/useAuthStore"
import { ChangeEvent, FormEvent, useState } from "react"
import { useMutation } from '@tanstack/react-query'
import { IoAddCircleOutline } from 'react-icons/io5'
import { useNavigate } from "react-router-dom"

export default function CreateNote() {
  const { token, error, setError } = useAuthStore()
  const navigate = useNavigate()

  const [input, setinput] = useState<{title: string, body: string}>({
    title: '',
    body: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setError(false)
    const { value, name } = e.target
    setinput({
      ...input, [name]: value
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
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
  const create = useMutation({ mutationFn: handleSubmit })

  const empty = (!input.body.trim()) || (!input.title.trim())

  return (
    <form onSubmit={create.mutate} className="flex w-5/6 md:w-3/5 flex-col gap-6">
        <section className="flex flex-col gap-10">
          <section className="flex flex-col gap-2 relative opacidad bg-gray-200">
            <input className="border p-4 bg-transparent" type="text" name="title" value={input.title} onChange={handleChange} />
            <label className={`label ${input.title !== '' ? 'label-focus' : ''}`}>Ingresar title</label>
          </section>
          <section className="flex flex-col gap-2 relative opacidad bg-gray-200">
            <input className="border-none p-4 bg-transparent" type="text" name="body" value={input.body} onChange={handleChange} />
            <label className={`label ${input.body !== '' ? 'label-focus' : ''}`}>Ingresar contenido</label>
          </section>
        </section>
        {error && <p className="error text-red-500">{error}</p>}
        <section>
          <button disabled={empty} className={`flex gap-3 items-center bg-blue-500 text-white rounded-md px-3 py-2 ${empty ? 'opacidad' : '' }`} type="submit">Crear <IoAddCircleOutline /></button>
        </section>
      </form>
  )
}


