import { ChangeEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../states/useAuthStore";
import { Note } from "./Notes";
import { useNavigate } from "react-router-dom";
import { deleteNote, updateNote } from "../services/noteServices";
import { IoArrowForwardCircleOutline } from 'react-icons/io5'
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
    }
  })

  const mutationDelete = useMutation({
    mutationFn: () => deleteNote({ id: nota.id, token: token as string }),
    onSuccess: () => {
      navigate('/dashboard')
    }
  })

  return (
    <section className="flex flex-col items-center gap-4 w-full">
      <textarea className="opacidad w-full text-gray-700 font-sans space-x-5 text-lg p-2 h-48" value={note.body} name="body" onChange={handleChange}/>
      <button className="flex gap-x-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => mutationDpdate.mutate()}>Guardar <IoArrowForwardCircleOutline /></button>
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => mutationDelete.mutate()}>Eliminar</button>
    </section>
  )
}