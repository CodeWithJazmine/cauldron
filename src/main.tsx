import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { RequireAuth } from './components/RequireAuth.tsx'
import App from './App.tsx'
import ErrorPage from './pages/error-page.tsx'
import SignIn from './pages/SignIn.tsx'
import SignUp from './pages/SignUp.tsx'
import RecipesPage from './pages/RecipesPage.tsx'
import HomePage from './pages/HomePage.tsx'
import { ROUTES } from './constants/constants.ts'

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: ROUTES.RECIPES,
        element: (
          <RequireAuth>
            <RecipesPage />
          </RequireAuth>
        )
      }
    ]
  },
  {
    path: ROUTES.SIGNIN,
    element: <SignIn />,
    errorElement: <ErrorPage />
  },
  {
    path: ROUTES.SIGNUP,
    element: <SignUp />,
    errorElement: <ErrorPage />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
