import { useState } from "react";
import { Note } from "./Note";
import { motion } from "framer-motion";
import { NavLink, useParams } from "react-router-dom";
import { IoMenuOutline, IoTrashOutline } from "react-icons/io5";
import ConfirmDelete from "./ConfirmDelete";

export default function ItemNote({ note }: { note: Note }) {
  const { page } = useParams()
  const [listId, setListId] = useState<string | null>(null)
  const [confirm, setconfirm] = useState(false)

  const changeId = (id: string) => {
    if (!listId && id) {
      setListId(id)
    } else {
      setListId(null)
    }
  }
  return (
    <>

      <motion.li
        animate={{ x: listId !== note.id ? 0 : -50 }}
        key={note.id}
        whileHover={{ scale: 1.03 }}
        className="opacidad grid grid-cols-12 list-none bg-gray-100"
      >
        <NavLink className="col-start-1 col-end-12" to={`/note/${note.id}?backpage=${page}`}>
          <motion.section
            className="flex flex-col w-full py-4 pl-5">
            <b>{note.title}</b>
            <p className="text-start">{note.body}</p>
          </motion.section>
        </NavLink>
        <motion.section
          animate={{ rotate: listId === note.id ? 90 : 0 }}
          onClick={() => changeId(note.id)}
          className="w-full h-full flex items-center justify-center col-start-12 py-4"
        >
          <IoMenuOutline
            className="hover:scale-125 transition-all duration-300 cursor-pointer"
          />
        </motion.section>
        {listId === note.id && (
          <motion.button
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-[50px] h-full bg-red-400 flex items-center justify-center col-start-13 py-4 absolute left-0"
            onClick={() => {
              setconfirm(true)
            }}
          >
            <IoTrashOutline
              color="white"
              className='hover:scale-125 transition-all duration-300'
            />
          </motion.button>
        )}
      </motion.li>
      {confirm && (
        <ConfirmDelete setconfirm={setconfirm} id={note.id} />
      )}
    </>
  );
}