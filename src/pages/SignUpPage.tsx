import { Navigate } from "react-router-dom"
import { useAuthStore } from "../states/useAuthStore"

export default function SignUpPage() {
  const { token } = useAuthStore()

  if (token) return <Navigate to="/dashboard/1" />
  return (
    <section>Pagina del SignUp</section>
  )
}