import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

export default function Sidebar() {
  let location = useLocation()
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout()
  }

  return (
    user && <div className="">
      <input type="checkbox" id="sidebar-mobile-fixed" className="sidebar-state" />
      <label htmlFor="sidebar-mobile-fixed" className="sidebar-overlay"></label>
      <aside className="sidebar sidebar-fixed-left sidebar-mobile h-full justify-start fixed -translate-x-full">
        <section className="sidebar-title items-center p-4">
          <svg fill="none" height="42" viewBox="0 0 32 32" width="42" xmlns="http://www.w3.org/2000/svg">
            <rect height="100%" rx="16" width="100%"></rect>
            <path clipRule="evenodd" d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z" fill="currentColor" fillRule="evenodd"></path>
          </svg>
          <div className="flex flex-col">
            <span>Zoeo</span>
          </div>
        </section>
        <section className="sidebar-content">
          <nav className="menu rounded-md">
            <section className="menu-section px-4">
              <span className="menu-title">Menu Principal</span>
              <ul className="menu-items">
                <Link to={"/panel"} className="">
                  <li className={`menu-item ${location.pathname == '/panel' && `menu-active`}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-75" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path d="M3 4v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8h-4"></path><path d="M3 4h14v14a2 2 0 0 0 2 2v0M13 8H7m6 4H9"></path></g></svg>
                    <span>Escritorio</span>
                  </li>
                </Link>

                <Link to={"/team"}>
                  <li className={`menu-item ${location.pathname == '/team' && `menu-active`}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Equipo</span>
                  </li>
                </Link>
                <li>
                  <input type="checkbox" id="menu-1" className="menu-toggle" />
                  <label className="menu-item justify-between" htmlFor="menu-1">
                    <div className="flex gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>Cuenta</span>
                    </div>

                    <span className="menu-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </label>

                  <div className="menu-item-collapse mt-2">
                    <div className="min-h-0">
                      <Link to={"/profile"}>
                        <span className={`menu-item ml-6 ${location.pathname == '/profile' && `menu-active`}`}>Perfil</span>
                      </Link>
                      <span className="menu-item menu-item-disabled ml-6">Cambiar Email</span>
                      <span className="menu-item menu-item-disabled ml-6">Cambiar Password</span>
                    </div>
                  </div>
                </li>
              </ul>
            </section>
            {user.role === 'Administrador' &&
              <div>
                <div className="divider my-0"></div>
                <section className="menu-section px-4">
                  <span className="menu-title">Administración</span>
                  <ul className="menu-items">
                    <li className="menu-item">
                      <svg xmlns="http://www.w3.org/2000/svg" className="opacity-75" width="22" height="22" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
                        <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path>
                      </svg>
                      <Link to={"/Admin/accounts"} className={`menu-item ml-6 p-0 ${location.pathname == '/admin/accounts' && `menu-active`}`}>
                        Cuentas de Usuario
                      </Link>
                    </li>
                  </ul>
                </section>
              </div>}
          </nav>
        </section>
        <section className="sidebar-footer justify-end bg-gray-2 pt-2">
          <div className="divider my-0"></div>
          <div className="dropdown z-50 flex h-fit w-full cursor-pointer hover:bg-gray-4">
            <button className="whites mx-2 flex h-fit w-full cursor-pointer p-0 hover:bg-gray-4" tabIndex="0">
              <div className="flex flex-row gap-4 p-4">
                <div className="avatar-square avatar avatar-md">
                  <img src="https://i.pravatar.cc/150?img=30" alt="avatar" />
                </div>
                <div className="flex flex-col">
                  <span>Elizabeth Cortes</span>
                </div>
              </div>
            </button>
            <div className="dropdown-menu-right-top dropdown-menu ml-2 m-2">
              <Link to={"/profile"} className="dropdown-item text-sm">Perfil</Link>
              <a tabIndex="-1" className="dropdown-item menu-item-disabled text-sm">Cambiar email</a>
              <a tabIndex="-1" className="dropdown-item menu-item-disabled text-sm">Cambiar password</a>
              <a onClick={() => handleLogout()} tabIndex="-1" className="dropdown-item text-sm flex flex-row items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-6" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M15 4.001H5v14a2 2 0 0 0 2 2h8m1-5l3-3m0 0l-3-3m3 3H9"></path></svg>
                <span className="ml-1">
                  Desconectar
                </span>
              </a>
            </div>
          </div>
        </section>
      </aside>
    </div>
  )
}