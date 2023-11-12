import { Navigate } from "react-router-dom"
import { useAuthStore } from "../states/useAuthStore"

export default function SignUp () {
  const { token } = useAuthStore()

  if (token) return <Navigate to="/dashboard"/>
  return (
    <section>Pagina del SignUp</section>
  )
}