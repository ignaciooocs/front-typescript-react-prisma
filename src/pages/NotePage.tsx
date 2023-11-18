// import { Navigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import Note from '../components/Note'
import { useAuthStore } from '../states/useAuthStore'

export default function NotePage() {

  const { token } = useAuthStore()

  if (token === null) return null

  if (token === false) return <Navigate to="/dashboard/1" />

  return (
    <Note />
  )
}