import { apiFetch } from "./apiFetch";

const API_URL = import.meta.env.VITE_API_URL

export const handleGenerateDocument = async (documento) => {
    //Solicitud para descargar documento
    try {
        //const token = localStorage.getItem('token')
        const response = await apiFetch(`${API_URL}/api/process-document`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ documento: documento._id })
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `TEA-${documento._id}.docx`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } else {
            console.error('Failed to download the document');
        }
    } catch (error) {
        console.error('Error al generar el documento:', error);
    }
};

export const handleUpdateDocument = async (key, documento, texto, docId) => {
    try {
        //const token = localStorage.getItem('token')
        const response = await apiFetch(`${API_URL}/api/update-document`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ key: key, documento: documento, texto: texto, docId: docId })
        });

        if (response.ok) {
            //console.log('Document updated');
            const data = await response.json();
            return { message: data.message }
        } else {
            console.log(response);
            console.error('Error al actualizar el documento desde la API');
        }
    } catch (error) {
        console.error('Error al enviar la actualización del documento:', error);
    }
};

export const handleCreateDocument = async (documentName) => {
    try {
        //const token = localStorage.getItem('token')
        const response = await apiFetch(`${API_URL}/api/create-document`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ document: documentName })
        })
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error('Error al crear el documento:', error);
        return { message: 'Error al crear el documento' }
    }
}

export const getAllDocuments = async () => {
    try {
        const response = await apiFetch(`${API_URL}/api/list-documents`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': `Bearer ${token}`
            }
        })
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error('Error al obtener los documentos:', error);
        //return { message: 'Error al obtener los documentos.' }
    }
}

export const getDocument = async (documentId) => {
    try {
        const response = await apiFetch(`${API_URL}/api/document/${documentId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const jsonData = await response.json();
        return { document: jsonData, message: 'Documento encontrado' };
    } catch (error) {
        console.error('Error al buscar el documento:', error);
        return { message: 'Error al buscar el documento' }
    }
}

export const deleteDocument = async (documentId) => {
    try {
        //const token = localStorage.getItem('token')
        const response = await apiFetch(`${API_URL}/api/delete-document`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ id: documentId })
        });

        if (response.status === 401) {
            throw new Error('No tiene permisos')
        }

        const jsonData = await response.json();
        return { document: jsonData, message: 'Documento eliminado' };
    } catch (error) {
        return { message: 'Error al eliminar el documento' }
    }
}

export const handleDeleteUser = async (id) => {
    try {
        const token = localStorage.getItem('token')
        const response = await apiFetch(`${API_URL}/api/admin/deleteProfesional`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ id: id })
        });

        if (response.ok) {
            const data = await response.json();
            return { message: data.message };
        } else {
            const errorData = await response.json();
            return { message: errorData.error || 'Error al eliminar el usuario' };
        }
    } catch (error) {
        return { message: 'Error al eliminar el usuario' }
    }
}

export const handleCreateUser = async (email, password, username) => {
    try {
        const token = localStorage.getItem('token')
        const response = await apiFetch(`${API_URL}/api/admin/registerProfesional`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ email, password, username })
        });
        if (response.ok) {
            const data = await response.json();
            return { message: data.message };
        } else {
            const errorData = await response.json();
            return { message: errorData.error || 'Error al crear el usuario' };
        }
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        return { message: 'Error al conectar con el servidor' };
    }
};

export const getAllProfesional = async () => {
    try {
        //const token = localStorage.getItem('token')
        const response = await apiFetch(`${API_URL}/api/auth/allProfesional`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': `Bearer ${token}`
            }

        })
        if (response.ok) {
            const data = await response.json();
            return { message: data.message, pros: data.pros };
        } else {
            const errorData = await response.json();
            return { message: errorData.error || 'Error al obtener los profesionales' };
        }
    } catch (error) {
        //console.error('Error al obtener los profesionales:', error);
        return { message: 'Error al conectar con el servidor' };
    }
}

export const handleUserLogin = async (email, password) => {
    try {
        const response = await apiFetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();

        if (response.status === 200) {
            // Inicio de sesión exitoso
            return { message: data.message, user: data.user, token: data.token };
        } else if (response.status === 401) {
            // Credenciales inválidas
            return { message: data.message };
        } else if (response.status === 500) {
            // Error interno del servidor
            return { message: 'Error en el servidor. Intente nuevamente más tarde.' };
        } else {
            // Otro tipo de error
            return { message: data.message || 'Ocurrió un error inesperado.' };
        }
    } catch (error) {
        console.error("Error en el inicio de sesión:", error);
        return { message: 'Error de conexión al servidor' };
    }
}