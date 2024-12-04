import { useAlert } from "../../contexts/AlertContext";
import { getAllProfesional, handleCreateUser, handleDeleteUser } from "../../utils/requests";
import { useEffect, useState, useRef } from "react";

export default function Users() {
    const { showAlert } = useAlert();
    const [formValues, setFormValues] = useState({
        nombre: "",
        correo: "",
        contrasena: ""
    })
    const [profs, setProfs] = useState(false);
    const [generatedCode, setGeneratedCode] = useState('');
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);
    const [error, setError] = useState('');
    const modalRef = useRef(null);
    const [userSelected, setUserSelected] = useState();

    async function handleRegisterNewUser(e) {
        e.preventDefault();

        try {
            const response = await handleCreateUser(formValues.correo, formValues.contrasena, formValues.nombre);

            if (response.message === 'Usuario registrado exitosamente') {
                showAlert(response.message, 'success', 'Registrado');
            } else {
                showAlert(response.message, 'error', 'Error');
            }

        } catch (error) {
            //console.error(error);
            showAlert('Error inesperado al registrar usuario', 'error', 'Error');
        }
    }

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    };

    const handleInputChangeCode = (index, value) => {
        if (value.length <= 1) {
            const newCode = [...code]
            newCode[index] = value.toUpperCase()
            setCode(newCode)

            // Move focus to next input
            if (value !== '' && index < 5) {
                inputRefs.current[index + 1]?.focus()
            }
        }
    }

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && index > 0 && code[index] === '') {
            inputRefs.current[index - 1]?.focus()
        }
    }

    async function getPros() {
        const token = localStorage.getItem('token')
        const { pros } = await getAllProfesional(token)
        setProfs(pros);
    }

    const handleCloseModal = () => {
        //modalRef.current.checked = false
        setCode(['', '', '', '', '', '']);
        setGeneratedCode(Math.random().toString(36).substring(2, 8).toUpperCase());
    }

    const handleSubmit = async () => {
        console.log(userSelected);
        const enteredCode = code.join('')
        if (enteredCode === generatedCode) {
            try {
                const response = await handleDeleteUser(userSelected);
                //setDocumentData(null)
                setCode(['', '', '', '', '', ''])
                showAlert(response.message, 'success', 'Borrado')
            } catch (error) {
                showAlert('Error al borrar el usuario', 'error', 'Error');
            } finally {
                if (modalRef.current) {
                    modalRef.current.checked = false;
                }
                //resetDocument();
            }
        } else {
            setError('Código incorrecto. Por favor, inténtalo de nuevo.')
        }
    }

    useEffect(() => {
        getPros();
        setGeneratedCode(Math.random().toString(36).substring(2, 8).toUpperCase());
    }, [])

    return (
        <div className="flex justify-center p-6 flex-col gap-6 w-full items-center">
            <section className="p-6 bg-gray-2 rounded-xl w-[480px]">
                <label className="text-2xl font-semibold">Nuevo Usuario</label>
                <div className="mt-3 shadow-lg">
                    <form className="space-y-4" onSubmit={(e) => handleRegisterNewUser(e)}>
                        <div className="w-full">
                            <label className="sr-only" htmlFor="name">Nombre</label>
                            <input className="input input-solid max-w-full" placeholder="Nombre completo" type="text" id="nombre" value={formValues.nombre || ""} onChange={handleInputChange} />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="sr-only" htmlFor="email">Correo</label>
                                <input className="input input-solid" placeholder="Correo" type="email" id="correo" value={formValues.correo || ""} onChange={handleInputChange} />
                            </div>

                            <div>
                                <label className="sr-only" htmlFor="password">Contraseña</label>
                                <input className="input input-solid" placeholder="Contraseña" type="password" id="contrasena" value={formValues.contrasena || ""} onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className="mt-4">
                            <button type="submit" className="rounded-lg btn btn-primary btn-block">Registrar</button>
                        </div>
                    </form>
                </div>
            </section>
            <div className="w-full flex justify-center flex-wrap">
                {profs && profs.map((pro) => (
                    <div key={pro._id} className="card m-3 p-4 cursor-pointer hover:bg-gray-4 hover:opacity-100 opacity-80">
                        <div className="flex justify-between">
                            <div className={`bg-gray-2 w-20 h-20 rounded-md`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-20 opacity-10" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M7.39 16.539a8 8 0 1 1 9.221 0l2.083 4.76a.5.5 0 0 1-.459.701H5.765a.5.5 0 0 1-.459-.7zm6.735-.693l1.332-.941a6 6 0 1 0-6.913 0l1.331.941L8.058 20h7.884zM8.119 10.97l1.94-.485a2 2 0 0 0 3.882 0l1.94.485a4.002 4.002 0 0 1-7.762 0"></path></svg>
                            </div>
                            <div>
                                <div className="text-xs bg-gray-2 p-1 rounded-full px-2">
                                    {pro._id}
                                </div>
                                <div className="flex justify-end">
                                    {/*<span className="tooltip tooltip-bottom" data-tooltip="Cambiar contraseña">
                                        <button onClick={() => console.log('bloqueo de usuario')} className="text-right font-semibold text-sm mt-1 mr-1 bg-gray-2 opacity-80 rounded-full p-1 hover:opacity-100">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="size-6" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor"><path strokeLinecap="round" d="M8 10V7a4 4 0 1 1 8 0v3"></path><path strokeLinejoin="round" d="M5 10h14v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z"></path><path strokeLinejoin="round" strokeWidth={1.5} d="M14.5 15.5h.01v.01h-.01z"></path></g></svg>
                                        </button>
                                    </span>*/}
                                    <span className="tooltip tooltip-bottom" data-tooltip="Eliminar cuenta">
                                        <label onClick={(e) => setUserSelected(pro._id)} className="flex mt-[4px] cursor-pointer p-1 font-semibold text-sm bg-red-2 rounded-full opacity-80 hover:opacity-100" htmlFor="modal-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="size-6 text-red-500" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M14 11v6m-4-6v6M6 7v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7M4 7h16M7 7l2-4h6l2 4"></path></svg>
                                        </label>
                                    </span>

                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-2 p-3 rounded-xl mt-2 flex flex-col gap-2">
                            <p className=""><span className="font-semibold"></span><span className="w-full badge text-gray-100/70">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="size-4 mr-1"><g fill="none" stroke="currentColor"><path strokeLinejoin="round" d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"></path><circle cx={12} cy={7} r={3}></circle></g></svg>
                                Nombre: <span className="ml-1 font-normal">{pro.username}</span></span>
                            </p>
                            <p className=""><span className="font-semibold"></span><span className="w-full badge text-gray-100/70 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="size-4 mr-1"><g fill="none"><path fill="currentColor" d="M3 5v-.5a.5.5 0 0 0-.5.5zm18 0h.5a.5.5 0 0 0-.5-.5zM3 5.5h18v-1H3zM20.5 5v12h1V5zM19 18.5H5v1h14zM3.5 17V5h-1v12zM5 18.5A1.5 1.5 0 0 1 3.5 17h-1A2.5 2.5 0 0 0 5 19.5zM20.5 17a1.5 1.5 0 0 1-1.5 1.5v1a2.5 2.5 0 0 0 2.5-2.5z"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m3 5l9 9l9-9"></path></g></svg>
                                Correo: <span className="ml-1 font-normal">{pro.email}</span></span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <input className="modal-state" id="modal-3" type="checkbox" />
            <div className="modal">
                <label className="modal-overlay" htmlFor="modal-3"></label>
                <div className="modal-content flex flex-col gap-5 w-full">
                    <label htmlFor="modal-3" onClick={handleCloseModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                    <h1 className="text-lg mb-[-18px]">Ingrese el código para continuar</h1>
                    <h2 className="text-sm text-gray-11">Por favor, ingrese el código de acceso mostrado abajo.</h2>
                    <div className="flex flex-col items-center gap-4 py-4">
                        <div className="text-2xl font-bold tracking-wider bg-gray-3 p-3 rounded">
                            {generatedCode}
                        </div>
                        <div className="flex gap-2">
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleInputChangeCode(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    ref={(el) => inputRefs.current[index] = el}
                                    className="w-10 h-10 text-center text-lg rounded-md bg-gray-3"
                                />
                            ))}
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                    </div>
                    <button className={`w-full btn-error rounded-md py-2`} onClick={handleSubmit} >Continuar</button>
                </div>
            </div>
        </div>
    )
}