import { createContext, useEffect, useState } from 'react'

interface MyContextType {
  // Define las propiedades que deseas compartir en el contexto
  user: {
    token: string | boolean
    expiresIn: number | boolean
  }
  setuser: (user: { token: string | boolean, expiresIn: number | boolean }) => void
  // ...
}
export const AuthContext = createContext<MyContextType | undefined>(undefined)

interface AuthContextProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children}: AuthContextProps) => {
  const [user, setuser] = useState<{ token: string | boolean, expiresIn: number | boolean }>({
    token: false,
    expiresIn: false
  })

  console.log(user)

  async function refreshToken() {
    try {
      console.log('se refresco el token')
      // Lógica para refrescar el token
      const newToken = await fetch('http://localhost:4000/api/auth/refresh', {
        credentials: 'include'
      });
      const data = await newToken.json();
      setuser({ token: data.refresh!, expiresIn: data.expiresIn! });
  } catch (error) {
    console.log(error)
  }
    }

useEffect(() => {
    console.log('el token se refrescara en 30 segundos')
        const timeoutId = setTimeout(refreshToken, Number(user.expiresIn)*1000/2); // Programa la renovación del token 1 segundo antes de que expire

        return () => clearTimeout(timeoutId); // Limpia el temporizador si el componente se desmonta

}, [user.token, user.expiresIn]); // Este efecto se ejecutará cada vez que cambie el token
  return (
    <AuthContext.Provider value={{ user, setuser }}>
      {children}
    </AuthContext.Provider>
  )
}