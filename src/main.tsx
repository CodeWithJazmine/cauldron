import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import ErrorPage from './error-page'
import Auth from './pages/Auth'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { RequireAuth } from './components/RequireAuth.tsx'
import RecipeDisplay from './components/RecipeDisplay.tsx'

// Home page component (for now)
function HomePage() {
  return <p>Welcome to Cauldron! Your recipe management app.</p>
}

// Protected recipes page (for now)
function RecipesPage() {
  return (
    <div>
      <h3>Your Recipes (Protected Page)</h3>
      <RecipeDisplay />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "recipes",
        element: (
          <RequireAuth>
            <RecipesPage />
          </RequireAuth>
        )
      }
    ]
  },
  {
    path: "/auth",
    element: <Auth />,
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
