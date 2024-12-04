import { io } from "socket.io-client";
const API_URL = import.meta.env.VITE_API_URL

export const apiFetch = async (url, options = {}) => {
    let accessToken = localStorage.getItem('token');
    options.headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
    };

    //console.log(API_URL);

    let response = await fetch(url, options);
    //console.log(accessToken);

    // Si el token expiró, intenta renovarlo
    if (response.status === 401) {
        const refreshResponse = await fetch(`${API_URL}/api/auth/token`, { method: 'POST', credentials: 'include' });
        if (refreshResponse.ok) {
            const { accessToken: newAccessToken } = await refreshResponse.json();
            localStorage.setItem('token', newAccessToken);

            // Reintentar la solicitud original
            options.headers.Authorization = `Bearer ${newAccessToken}`;
            response = await fetch(url, options);
        }
    }

    return response;
};

export const prepareSocketConnection = async (socketRef, documentSelected, onSocketSetup) => {
    {/*let token = localStorage.getItem("token");

    // Intentar renovar el token si es necesario
    const renewTokenIfNeeded = async () => {
        const refreshResponse = await fetch(`${API_URL}/api/auth/token`, {
            method: "POST",
            credentials: "include",
        });

        if (refreshResponse.ok) {
            const { accessToken: newAccessToken } = await refreshResponse.json();
            localStorage.setItem("token", newAccessToken);
            return newAccessToken;
        } else {
            throw new Error("No se pudo renovar el token");
        }
    };*/}

    try {
        // Configurar el socket con el token
        if (!socketRef.current) {
            // Si el token inicial falla, intentamos renovarlo
            socketRef.current = io(import.meta.env.VITE_API_URL
                //, {auth: { token },}
            );

            // Manejar errores de autenticación
            socketRef.current.on("connect_error", async (err) => {
                if (err.message === "Token no válido" || err.message === "Token expirado") {
                    console.warn("Token expirado o inválido. Renovando...");

                    try {
                        token = await renewTokenIfNeeded();

                        // Reconectar con el token renovado
                        socketRef.current = io(import.meta.env.VITE_API_URL, {
                            auth: { token },
                        });

                        // Reintentar unirse al documento
                        socketRef.current.emit("join", documentSelected);

                        if (onSocketSetup) {
                            onSocketSetup(socketRef.current);
                        }
                    } catch (renewError) {
                        console.error("Error al renovar el token:", renewError);
                    }
                } else {
                    console.error("Error de conexión al socket:", err.message);
                }
            });

            // Emitir la unión al documento
            socketRef.current.emit("join", documentSelected);

            if (onSocketSetup) {
                onSocketSetup(socketRef.current);
            }
        }
    } catch (error) {
        console.error("Error preparando la conexión del socket:", error);
    }
};

