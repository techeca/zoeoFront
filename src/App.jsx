import { useEffect, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { DocumentProvider } from "./contexts/DocumentContext"
import { AlertProvider } from "./contexts/AlertContext"
import Sidebar from "./components/Sidebar"
import { AuthProvider, useAuth } from "./contexts/AuthContext"
import Alert from "./components/Alert"
import Navigation from "./components/Navigation"

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  //const { user } = useAuth();

  useEffect(() => {
    {/*if (!user) {
      navigate('/login')
    } else {
      navigate('/panel')
    }
    if (!user) {
      navigate('/login')
    } else {
      if (location.pathname === '/') {
        navigate('/panel')
      }
    }*/}
  }, [])

  return (
    <AuthProvider>
      <div className='w-full h-screen items-center flex flex-col'>
        {/*<div className="navbar sticky top-0 z-50">
          <div className="navbar-start">
            {user &&
              <label htmlFor="sidebar-mobile-fixed" className="btn btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="size-6"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M3 6.001h18m-18 6h18m-18 6h18"></path></svg>
              </label>
            }
            <a className="navbar-item sidebar-title">Zoeo</a>
          </div>
          </div>*/}
        <Navigation />

        <div className='fixed -z-10 min-h-screen left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#121212] to-[#1d1e20]'></div>

        {<DocumentProvider>
        <Sidebar />
        <AlertProvider>
          <Alert />
          <Outlet />
        </AlertProvider>
      </DocumentProvider>}
      </div>
    </AuthProvider>
  )
}

export default App