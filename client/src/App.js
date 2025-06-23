import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './RootLayout'
import Open from './components/Open'
import Login from './components/Login'
import Register from './components/Register'
import Otp from './components/Otp'
import Analytics from './components/Analytics'
import Sample from './components/Sample'
import Cards from './components/Cards'
import Content from './components/Content'
import QuizPage from './components/QuizPage'

function App() {

  const router = createBrowserRouter([
    {
      path:'/',
      element:<RootLayout/>,
      children: [
        {
          path: "/",
          element: <Open />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "/otp",
          element: <Otp />
        },
        {
          path:'/sample',
          element:<Sample/>
        },
        {
          path: "/chapters",
          element: <Cards />,
        },
        {
          path:'/chapter/:chapterNumber',
          element:<Content/>
        },
        {
          path:'/quiz',
          element:<QuizPage/>
        },
        {
          
          path:'/analysis',
          element:<Analytics />
        }
      ]
    }
  ])

  return (
    <div className="">
      <RouterProvider router={router}>

      </RouterProvider>
    </div>
  )
}

export default App