// import { Navigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import Note from '../components/Note'
import { useAuthStore } from '../states/useAuthStore'

export default function NotePage () {

  const { token } = useAuthStore()

  if (!token) return <Navigate to="/dashboard"/>

  return (
    <Note />
  )
}