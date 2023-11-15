import { createBrowserRouter} from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Dashboard from '../pages/Dashboard'
import Note from '../pages/Note'
import Create from '../pages/Create'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <section>Ocurrio un error</section>,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/dashboard/create',
        element: <Create />
      },
      {
        path: '/note/:id',
        element: <Note />
      },
      {
        path: '/sign-in',
        element: <SignIn />
      },
      {
        path: '/sign-up',
        element: <SignUp />,
        loader: () => <section>Cargando...</section>
      }
    ]
  }
])