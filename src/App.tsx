import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { useAuthStore } from './states/useAuthStore'
import { useEffect } from 'react';
function App() {
  const { token, expiresIn, refreshToken } = useAuthStore()

  useEffect(() => {
    const timeoutId = setTimeout(refreshToken, Number(expiresIn) * 1000 / 2); // Programa la renovación del token 1 segundo antes de que expire

    return () => clearTimeout(timeoutId); // Limpia el temporizador si el componente se desmonta
  }, [token, refreshToken, expiresIn]); // Este efecto se ejecutará cada vez que cambie el token

  return (
    <section>
      <Navbar />
      <Outlet />
    </section>
  )
}

export default App
