import { useAlert } from "../contexts/AlertContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { handleInputChange } from "../utils/formsFunctions";
import { lock, user as userIcon } from '../utils/icons'

export default function Login() {
    const navigate = useNavigate()
    const { login, user } = useAuth();
    const { showAlert } = useAlert();
    const [formValues, setFormValues] = useState({
        correo: "",
        contrasena: ""
    })

    async function handleLogin(e) {
        e.preventDefault();

        if (formValues.correo.length < 6 || formValues.contrasena.length < 6) {
            if (formValues.contrasena.length < 6) {
                showAlert(`La Contraseña debe tener una longitud de 6 letras y números.`, 'warning', 'Error en la Contraseña')
                throw new Error('El Correo o la Contraseña no cumplen los requisitos.')
            }
            showAlert(`Requisitos incompletos en Correo o Contraseña`, 'warning', 'Requisitos incompletos')
            throw new Error('El Correo o la Contraseña no cumplen los requisitos.')
        }

        try {
            const response = await login(formValues.correo, formValues.contrasena);
            if (response.user) {
                showAlert(response.message, 'success', 'Bienvenido/a');
                navigate('/panel');
            } else {
                showAlert(response.message, 'error', 'Error');
            }
        } catch (error) {
            showAlert(`Error al iniciar la cuenta`, 'error', 'Error');
        }
    }

    return (
        !user &&
        <div className="shadow-lg border-[1px] rounded-md border-gray-5 bg-gray-3 p-4 mt-28 w-[330px] xl:w-[480px] md:w-[400px]">
            <h1 className="text-3xl font-semibold text-center">Ingreso</h1>
            <form onSubmit={(e) => handleLogin(e)} className="form-group flex gap-6">
                <div className="form-field">
                    <label htmlFor="correo" className="form-label text-lg font-semibold">Correo</label>
                    <div className="form-control relative flex items-center w-full">
                        {userIcon}
                        <input id='correo'
                            type="email"
                            placeholder="correo@email.com"
                            className="bg-gray-2 w-full rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none pl-10 placeholder:text-gray-10"
                            value={formValues.correo || ""}
                            onChange={(e) => handleInputChange(e, setFormValues)}
                        />
                    </div>
                </div>
                <div className="form-field">
                    <label htmlFor="contrasena" className="form-label text-lg font-semibold self-start">Contraseña</label>
                    <div className="form-control relative flex items-center w-full">
                        {lock}
                        <input id="contrasena"
                            type="password"
                            placeholder="******"
                            className="bg-gray-2 w-full rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none pl-10 placeholder:text-gray-10"
                            value={formValues.contrasena || ""}
                            onChange={(e) => handleInputChange(e, setFormValues)}
                        />
                    </div>
                </div>
                <div className="form-field">
                    <div className="form-control justify-between">
                        <button
                            type="submit"
                            className="btn btn-primary w-full rounded-md opacity-80 hover:opacity-100 transition-opacity duration-200 ease-in">
                            Enviar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}