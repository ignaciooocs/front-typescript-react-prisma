import { ChangeEvent, FormEvent, useState } from "react"
import { useAuthStore} from '../states/useAuthStore'
import { Navigate } from 'react-router-dom'
export default function SignIn () {
  const { token, setUser, setError, error } = useAuthStore()

  
  const [input, setinput] = useState<{email: string, password: string}>({
    email: '',
    password: ''
  })
  if (token) return <Navigate to="/dashboard"/>

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setError(false)
    const { value, name } = e.target
    setinput({
      ...input, [name]: value
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:4000/api/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(input),
        credentials: 'include'
      })
      const data = await res.json()
      console.log(res)
      if (res.status === 200) {
        console.log(data)
        setUser({ token: data.token!, expiresIn: data.expiresIn! })
      } else {
        setError(data.error)
        throw data
      }
    } catch (error) {
        console.log(error)
        console.log('Ocurrio un error en el sign in')
    }
  }

  return (
    <section className="flex flex-col items-center gap-y-4">
      <h3 className="font-bold text-gray-500 space-x-1 my-5">Iniciar sesión</h3>
      <form onSubmit={handleSubmit} className="flex w-3/5 flex-col gap-6">
        <section className="flex flex-col gap-10">
          <section className="flex flex-col gap-2 relative bg-gray-200">
            <input className="border p-4 bg-transparent" type="email" name="email" value={input.email} onChange={handleChange} />
            <label className={`label ${input.email !== '' ? 'label-focus' : ''}`}>Ingresar email</label>
          </section>
          <section className="flex flex-col gap-2 relative bg-gray-200">
            <input className="border-none p-4 bg-transparent" type="password" name="password" value={input.password} onChange={handleChange} />
            <label className={`label ${input.password !== '' ? 'label-focus' : ''}`}>Ingresar contraseña</label>
          </section>
        </section>
        {error && <p className="error text-red-500">{error}</p>}
        <section>
          <button className="bg-blue-500 text-white rounded-md px-3 py-2" type="submit">Sign In</button>
        </section>
      </form>
    </section>
  )
}