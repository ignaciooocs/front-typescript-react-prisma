import { ChangeEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../states/useAuthStore";
import { Note } from "./Notes";
import { useNavigate } from "react-router-dom";
import { deleteNote, updateNote } from "../services/noteServices";
import { IoArrowForwardCircleOutline, IoCloseCircleOutline } from 'react-icons/io5'
export default function InputNote ({ note: nota }: { note: Note }) {
  const navigate = useNavigate()
  const { token } = useAuthStore()
  const queryClient = useQueryClient()

  const [note, setnote] = useState({
    body: nota.body,
    title: nota.title
  })

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setnote({
      ...note,
      [name]: value
    })
  }

  const mutationDpdate = useMutation({
    mutationFn: () => updateNote({ note, id: nota.id, token: token as string }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [nota.id]})
      navigate('/dashboard')
    }
  })

  const mutationDelete = useMutation({
    mutationFn: () => deleteNote({ id: nota.id, token: token as string }),
    onSuccess: () => {
      navigate('/dashboard')
    }
  })

  const change = (note.body !== nota.body) 

  return (
    <section className="flex flex-col items-center gap-4 w-full">
      <textarea className="opacidad w-full text-gray-700 font-sans space-x-5 text-lg p-2 h-48" value={note.body} name="body" onChange={handleChange}/>
      <section className="flex gap-4">
        <button 
          className={`flex gap-x-3 items-center text-blue-400 opacidad font-bold py-2 px-4 rounded ${!change ? '' : 'hover:bg-blue-400 hover:text-white'}`}
          disabled={!change} 
          onClick={() => mutationDpdate.mutate()}
        >
          Guardar <IoArrowForwardCircleOutline />
        </button>
        <button 
          className="flex gap-x-3 items-center text-red-400 opacidad font-bold py-2 px-4 rounded hover:bg-red-400 hover:text-white" 
          onClick={() => mutationDelete.mutate()}
          >
            Eliminar <IoCloseCircleOutline />
          </button>
      </section>
    </section>
  )
}