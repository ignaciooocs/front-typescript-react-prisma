// import { Navigate } from 'react-router-dom'
import Notes from '../components/Notes'
import { useAuthStore } from '../states/useAuthStore'

export default function Note () {

  const { token } = useAuthStore()
  if (!token) return null

  return (
    <Notes />
  )
}