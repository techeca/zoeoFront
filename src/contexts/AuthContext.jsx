import { createContext, useContext, useState, useEffect } from 'react';
import { handleUserLogin } from '../utils/requests';
import { useLocation, useNavigate } from 'react-router-dom';

// Crear el contexto
const AuthContext = createContext();

// Crear el proveedor
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Estado para almacenar los datos del usuario
    const navigate = useNavigate();
    const location = useLocation();

    // Función de inicio de sesión
    const login = async (email, password) => {
        try {
            const { message, user, token } = await handleUserLogin(email, password);
            if (user && token) {
                setUser(user);
                localStorage.setItem('user', JSON.stringify(user)); // Guardar el usuario en localStorage
                localStorage.setItem('token', token); // Guardar el token en localStorage
                return { message, user };
            }
        } catch (error) {
            console.log(`error: ${error}`);
            return error
        }
    };

    // Función de cierre de sesión
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user'); // Eliminar el usuario de localStorage
        localStorage.removeItem('token');
    };

    // Verificar el usuario guardado en localStorage al cargar
    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        // Cargar el usuario desde localStorage si no está definido
        if (!user && storedUser) {
            setUser(JSON.parse(storedUser));
            return; // Esperar a que se actualice el estado del usuario
        }

        // Redirección lógica
        if (!user) {
            if (location.pathname !== "/login") {
                navigate("/login");
            }
        } else {
            // Redirigir a /panel solo si estamos en / o /login
            if (location.pathname === "/" || location.pathname === "/login") {
                navigate("/panel");
            }
            // No redirigir en otras rutas válidas
        }
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => useContext(AuthContext);