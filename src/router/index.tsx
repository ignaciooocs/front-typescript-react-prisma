import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/HomePage'
import SignInPage from '../pages/SignInPage'
import SignUpPage from '../pages/SignUpPage'
import DashboardPage from '../pages/DashboardPage'
import NotePage from '../pages/NotePage'
import CreatePage from '../pages/CreatePage'

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
        path: '/dashboard/:page',
        element: <DashboardPage />
      },
      {
        path: '/create',
        element: <CreatePage />
      },
      {
        path: '/note/:id',
        element: <NotePage />
      },
      {
        path: '/sign-in',
        element: <SignInPage />
      },
      {
        path: '/sign-up',
        element: <SignUpPage />
      }
    ]
  }
])