import React, { createContext, useState, useContext } from "react";
import { v4 as uuidv4 } from 'uuid';
const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [alerts, setAlerts] = useState([]); // Cambiamos el estado para almacenar múltiples alertas

    const showAlert = (message, type = "info", title = "Titulo") => {
        // Agregar la nueva alerta al arreglo
        const newAlert = { message, type, id: uuidv4(), title: title };
        setAlerts(prevAlerts => [...prevAlerts, newAlert]);

        // Ocultar la alerta automáticamente después de 5 segundos
        setTimeout(() => closeAlert(newAlert.id), 5000);
    };

    const closeAlert = (id) => {
        setAlerts(prevAlerts =>
            prevAlerts.map(alert =>
                alert.id === id ? { ...alert, exiting: true } : alert
            )
        );
        setTimeout(() => {
            setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id));
        }, 300); // 300ms coincide con la duración de la animación de salida
    };

    return (
        <AlertContext.Provider value={{ alerts, showAlert, closeAlert }}>
            {children}
        </AlertContext.Provider>
    );
};

export const useAlert = () => useContext(AlertContext);