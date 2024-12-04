import { useAuth } from "../../contexts/AuthContext"

export default function Navigation() {
    const { user } = useAuth();

    return (
        <div className="navbar sticky top-0 z-50">
            <div className="navbar-start">
                {user &&
                    <label htmlFor="sidebar-mobile-fixed" className="btn btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="size-6"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M3 6.001h18m-18 6h18m-18 6h18"></path></svg>
                    </label>
                }
                <a className="navbar-item sidebar-title">Zoeo</a>
            </div>
        </div>
    )
}