import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../states/useAuthStore";
import { IoExitOutline } from 'react-icons/io5'
import { useQueryClient } from "@tanstack/react-query";

export default function Navbar () {
  const location = useLocation()
  const queryClient = useQueryClient()

  const { token, setUser } = useAuthStore()
  return (
    <nav className='h-16 flex items-center justify-center'>
        <ul className='w-3/4 flex gap-x-5 justify-end'>
          <Link className={`font-bold text-center text-slate-500 py-1 ${location.pathname === '/' ? 'link' : ''}  `} to="/">Home</Link>
          {token && 
          <>
            <Link className={`font-bold text-center text-slate-500 py-1 ${location.pathname === '/dashboard' ? 'link' : ''}`} to="/dashboard">Dashboard</Link>
            <button className="text-red-500 flex gap-x-2 items-center" onClick={async () => {
              const res = await fetch('http://localhost:4000/api/auth/sign-out', {
                credentials: 'include'
              })
              const data = await res.json()
              console.log(data)
              setUser({ token: false, expiresIn: false })
              queryClient.clear()
            }}>Logout <IoExitOutline className='text-red-500' /></button>
          </>
          }
          {!token &&
            <>
              <Link className={`font-bold text-center text-slate-500 py-1 ${location.pathname === '/sign-in' ? 'link' : ''}`} to="/sign-in">Sign In</Link>
              <Link className={`font-bold text-center text-slate-500 py-1 ${location.pathname === '/sign-up' ? 'link' : ''}`} to="/sign-up">Sign Up</Link>
            </>
          }
        </ul>
      </nav>
  )
}