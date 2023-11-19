import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../states/useAuthStore";
import { IoCreateOutline, IoMenuOutline } from 'react-icons/io5'
import { useState } from "react"
import Menu from "./Menu";

export default function Navbar() {
  const location = useLocation()
  const [menu, setmenu] = useState(false)
  const { token } = useAuthStore()

  return (
    <nav className='nav h-20 flex items-center justify-center sticky top-0 z-50'>
      <ul className='w-3/4 flex justify-between relative'>
        <Link className={`font-bold text-center text-slate-500 py-1 ${location.pathname === '/' ? 'link' : ''} `} to="/">
          <span className="flex gap-x-2 items-center">SpaceNotes <IoCreateOutline /></span>
        </Link>
        <section className='flex gap-x-8 items-center'>
          {token
            ? (
              <>
                <Link className={`font-bold text-center text-slate-500 py-1 ${location.pathname.includes("/dashboard") ? 'link' : ''}`} to="/dashboard/1">Mis notas</Link>
                <button className="text-red-500 flex gap-x-2 items-center" onClick={() => setmenu(!menu)} ><IoMenuOutline className='text-gray-500 text-2xl' /></button>
              </>
            ) : (
              <>
                <Link className={`font-bold text-center text-slate-500 py-1 ${location.pathname === '/sign-in' ? 'link' : ''}`} to="/sign-in">Sign In</Link>
                <Link className={`font-bold text-center text-slate-500 py-1 ${location.pathname === '/sign-up' ? 'link' : ''}`} to="/sign-up">Sign Up</Link>
              </>
            )}
        </section>
      </ul>
      {menu && <Menu menu={menu} setmenu={setmenu} />}
    </nav>
  )
}