import { useMutation, useQueryClient } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { deleteNote } from "../services/noteServices"
import { useAuthStore } from "../states/useAuthStore"
import { useParams } from "react-router-dom"

interface Props {
  setconfirm: React.Dispatch<React.SetStateAction<boolean>>
  id: string,
}
export default function ConfirmDelete({ setconfirm, id }: Props) {
  const { token } = useAuthStore()
  const queryClient = useQueryClient()
  const { page } = useParams()

  const mutationDelete = useMutation({
    mutationFn: () => deleteNote({ id, token: token as string }),
    onSuccess: () => {
      setconfirm(false)
      queryClient.invalidateQueries({ queryKey: [page] })
    }
  })

  const cancel = () => {
    setconfirm(false)
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-screen w-screen flex items-center justify-center fixed top-0 left-0 bg-black bg-opacity-50 font-sans"
    >
      <article className="flex flex-col items-center gap-4 bg-white rounded-md p-4">
        <h3 className="font-bold text-center text-gray-500 px-4 py-2">¿Seguro que desea eliminar esta nota?</h3>
        <section className="flex gap-4 p-4">
          <button
            onClick={() => mutationDelete.mutate()}
            className="text-red-500 border border-red-500 rounded-md py-2 px-4"
          >
            Delete
          </button>
          <button
            onClick={cancel}
            className="text-gray-500 border border-gray-500 rounded-md py-2 px-4"
          >
            Cancel
          </button>
        </section>
      </article>
    </motion.section>
  )
}