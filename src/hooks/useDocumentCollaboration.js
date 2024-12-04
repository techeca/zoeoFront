import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useDocument } from '../contexts/DocumentContext';

export default function useDocumentCollaboration() {
    const [socket, setSocket] = useState(null);
    //const [content, setContent] = useState('');
    const { documentSelected, setDocumentData } = useDocument()

    // Enviar cambios al servidor
    const sendChanges = (changes) => {
        if (socket) {
            socket.emit('edit', { documentSelected, changes });
        }
    };

    useEffect(() => {
        // Conectar al servidor WebSocket
        const newSocket = io('http://localhost:3000'); // Cambia por la URL de tu servidor
        setSocket(newSocket);

        // Unirse al documento
        newSocket.emit('join', documentSelected);

        // Recibir contenido inicial
        newSocket.on('init', (initialContent) => {
            setDocumentData(initialContent);
        });

        // Actualizar contenido al recibir cambios
        newSocket.on('update', (changes) => {
            //setDocumentData((prevContent) =>  + changes);
            console.log('actualizacion :P');
        });

        // Desconectar al desmontar el componente
        return () => {
            newSocket.disconnect();
        };
    }, [documentSelected]);

    return { sendChanges }
    
}