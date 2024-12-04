
import Panel from "./pages/User/Panel"
import Login from "./pages/Login"
import Document from "./pages/User/Document"
import Profile from "./pages/User/Profile"
import Team from "./pages/User/Team"
import App from "./App"
//import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary"
import Admin from "./pages/Admin"
import Users from "./pages/Admin/Users"
import { getDocument } from "./utils/requests"
import ProtectedRoute from "./components/ProtectedRoute"

const router = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: 'login',
                element: <Login />,
                //errorElement: <ErrorBoundary />
            },
            {
                path: 'panel',
                element: <Panel />
            },
            {
                path: 'document',
                element: <Document />
            },
            {
                path: 'document/:documentId',
                element: <Document />,
                loader: async ({ params }) => {
                    return params.documentId
                }
            },
            {
                path: 'profile',
                element: <Profile />
            },
            {
                path: 'team',
                element: <Team />
            },
            {
                path: 'Admin',
                element: <Admin />,
                children: [
                    {
                        path: 'accounts',
                        element: <Users />
                    }
                ]
            }
        ]
    }
]

export default router