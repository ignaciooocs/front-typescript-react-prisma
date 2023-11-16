import { useAuthStore } from "../states/useAuthStore"
import { ChangeEvent, FormEvent, useState } from "react"
import { useMutation } from '@tanstack/react-query'
import { IoAddCircleOutline } from 'react-icons/io5'
import { useNavigate } from "react-router-dom"
import { createNote } from "../services/noteServices"

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

  const create = useMutation({ 
    mutationFn: (e: FormEvent<HTMLFormElement>) => 
      createNote({ e , input, token: token as string, navigate, setError }) 
  })

  const empty = (!input.body.trim()) || (!input.title.trim())


  return (
    <>
      <h3 className="flex gap-x-3 items-center font-bold text-gray-500 space-x-1 my-2 p-3">
          Agregar Nueva Nota
      </h3>
      <form 
        onSubmit={create.mutate} 
        className="flex w-5/6 md:w-3/5 flex-col gap-6">
          <section 
            className="flex flex-col gap-10">
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
            <button className={`flex gap-3 items-center bg-blue-500 text-white rounded-md px-3 py-2 ${empty ? 'opacidad' : '' }`} type="submit">Crear <IoAddCircleOutline /></button>
          </section>
      </form>
    </>

  )
}


