import { useAlert } from "../../contexts/AlertContext";
import { useDocument } from "../../contexts/DocumentContext";
import { handleUpdateDocument } from "../../utils/requests";
import { useState, useEffect } from "react";

export default function DatosIdentificacion({ profesional }) {
    const [listaPro, setListaPro] = useState([]);
    const { document, documentSelected, sendChanges, otherUsers } = useDocument();
    const { showAlert } = useAlert();
    const [inputSelected, setInputSelected] = useState();
    const [formValues, setFormValues] = useState({
        nombreCompleto: "",
        fechaNacimiento: "",
        edad: "",
        RUN: "",
        curso: "",
        opcionEducativa: "",
        viaComunicacion: "",
        establecimiento: "",
        RBD: "",
        nombreDirector: "",
        "4": false,
        "5": false,
        "8": false,
        "9": false,
        "10": false,
        OEotra: "",
        VCotra: ""
    });
    const [formValuesPro, setFormValuesPro] = useState({
        nombreProfesional: "",
        RUT: "",
        profesionpro: "",
        cargo: "",
        fono: "",
        email: "",
        fecha: ""
    })
    const [newUser, setNewUser] = useState({
        nombreCompleto: '',
        profesion: '',
        fonoEmail: '',
        registroProfesional: ''
    })

    // Configurar el estado inicial con los valores de `document`
    useEffect(() => {
        if (document && document.datosIdentificacion) {
            setFormValues({
                ...formValues,
                ...document.datosIdentificacion
            });
        }
        if (document && document.profesional) {
            setFormValuesPro({
                ...formValuesPro,
                ...document.profesional
            });
        }
    }, [document]);

    // Maneja los cambios en los inputs
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));

        sendChanges('datosIdentificacion', { [id]: value }, id)
    };

    const handleInputChange2 = (e) => {
        const { id, value } = e.target;
        setFormValuesPro((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    };

    function updateNewProfesional(e) {
        e.preventDefault()
        setNewUser(prevData => ({
            ...prevData,
            [e.target.id]: e.target.value
        }))
    }

    function addOtro() {
        setListaPro((prevLista) => [...prevLista, newUser]);
        setNewUser({
            nombreCompleto: '',
            profesion: '',
            fonoEmail: '',
            registroProfesional: ''
        });
    }

    function removeOtro(index) {
        setListaPro((prevLista) => prevLista.filter((_, i) => i !== index));
    }

    async function updateDocument(e, key, values, title) {
        e.preventDefault();
        try {
            //const response = await handleUpdateDocument(key, document.nombreDocumento, values, document._id); 
            sendChanges(key, values, inputSelected)
            showAlert('Datos Guardados', 'success', title)
            //console.log(otherUsers);
        } catch (error) {
            //showAlert(error.message, 'error', 'Error')
        }
    }

    const handleCheckboxChange = (e) => {
        setFormValues((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.checked, // actualiza el estado del checkbox
        }));
    };

    return (
        <div className="min-h-0">

            <label className="text-lg font-bold">Estudiante</label>
            <form /*onChange={(e) => updateDocument(e, 'datosIdentificacion', formValues, 'Datos de Estudiante')}*/ className="space-y-4 mt-2 mb-6 px-0">
                <div className="w-full">
                    <label className="sr-only" htmlFor="nombreCompleto">Nombre Completo</label>
                    <div className="relative">
                        {/*icono de usuario editando campo*/}
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-[-9px]">
                            {otherUsers.length > 0 && otherUsers.filter(ou => ou.key === 'nombreCompleto').map(u =>
                                <span key={u.username} className="tooltip tooltip-top" data-tooltip={u.username}>
                                    <div className={` avatar avatar-sm bg-gray-5 rounded-full p-1 text-xs transition-all duration-300 ease-in-out`}> {/*`${otherUsers?.[`nombreCompleto`] ? 'opacity-100 scale-100' : 'opacity-0 scale-75'*/}
                                        <img src="https://i.pravatar.cc/150" alt="avatar" />
                                    </div>
                                </span>
                            )}
                        </div>

                        <input onClick={(e) => setInputSelected(e.target.id)} className={`bg-gray-2 ${otherUsers.length > 0 && otherUsers.filter(u => u.key === 'nombreCompleto').length > 0 > 0 ? `border-red-5` : `border-gray-3`} border-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none pl-3 max-w-full placeholder:text-gray-9 uppercase transition-colors duration-300`} placeholder="Nombre Completo" maxLength={28} type="text" id="nombreCompleto" value={formValues.nombreCompleto || ""} onChange={handleInputChange} />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="sr-only" htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                        <input onClick={(e) => setInputSelected(e.target.id)} className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none pl-3 placeholder:text-gray-9" placeholder="FECHA DE NACIMIENTO (dd/mm/aaaa)" maxLength={10} type="text" id="fechaNacimiento" value={formValues.fechaNacimiento || ""} onChange={handleInputChange} />
                    </div>

                    <div>
                        <label className="sr-only" htmlFor="edad">Edad</label>
                        <input className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none pl-3 placeholder:text-gray-9 uppercase" placeholder="Edad" maxLength={8} type="text" id="edad" value={formValues.edad || ""} onChange={handleInputChange} />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="sr-only" htmlFor="RUN">RUN</label>
                        <input className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none pl-3 placeholder:text-gray-9" placeholder="RUN" type="text" maxLength={9} id="RUN" value={formValues.RUN || ""} onChange={handleInputChange} />
                    </div>

                    <div>
                        <label className="sr-only" htmlFor="curso">Curso</label>
                        <input className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none pl-3 placeholder:text-gray-9 uppercase" placeholder="CURSO" maxLength={11} type="text" id="curso" value={formValues.curso || ""} onChange={handleInputChange} />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-3 items-center">
                        <label className="self-start font-semibold" htmlFor="group1">Opción Educativa:</label>
                        <div className='flex gap-3 w-full'>
                            <label className="flex text-sm cursor-pointer gap-2">
                                <input type="checkbox" className="checkbox" name="4" id="4" checked={formValues[4]} onChange={handleCheckboxChange} />
                                <span>Escuela Especial</span>
                            </label>
                            <label className="flex text-sm cursor-pointer gap-2">
                                <input type="checkbox" className="checkbox" name="5" id="5" checked={formValues[5]} onChange={handleCheckboxChange} />
                                <span>PIE</span>
                            </label>
                        </div>
                        <div className='flex items-center gap-3 w-full'>
                            <label className="flex text-sm cursor-pointer items-center gap-2">
                                <span className="">Otra</span>
                            </label>
                            <input className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 pl-3 uppercase" placeholder="" maxLength={11} type="text" id="OEotra" value={formValues.OEotra || ""} onChange={handleInputChange} />
                        </div>

                    </div>

                    <div className="flex flex-col gap-3 items-center">
                        <label className="self-start font-semibold" htmlFor="RUN">Vía Comunicación:</label>
                        <div className='flex gap-3 w-full'>
                            <label className="flex text-sm cursor-pointer gap-2">
                                <input type="checkbox" className="checkbox" name="8" id="8" checked={formValues[8]} onChange={handleCheckboxChange} />
                                <span>Oral</span>
                            </label>
                            <label className="flex text-sm cursor-pointer gap-2">
                                <input type="checkbox" className="checkbox" name="9" id="9" checked={formValues[9]} onChange={handleCheckboxChange} />
                                <span>Lengua señas</span>
                            </label>
                        </div>
                        <div className='flex text-sm items-center gap-3 w-full'>
                            <label className="flex cursor-pointer items-center gap-2">
                                <input type="checkbox" className="checkbox" name="10" id="10" checked={formValues[10]} onChange={handleCheckboxChange} />
                                <span>Otra</span>
                            </label>
                            <input disabled={formValues[10]} className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 pl-3 uppercase" placeholder="" maxLength={11} type="text" id="VCotra" value={formValues.VCotra || ""} onChange={handleInputChange} />
                        </div>

                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="sr-only" htmlFor="establecimiento">Establecimiento</label>
                        <input className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none pl-3 placeholder:text-gray-9 uppercase" placeholder="ESTABLECIMIENTO" maxLength={26} type="text" id="establecimiento" value={formValues.establecimiento || ""} onChange={handleInputChange} />
                    </div>

                    <div>
                        <label className="sr-only" htmlFor="RBD">RBD</label>
                        <input className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none pl-3 capitalize placeholder:text-gray-9" placeholder="RBD" type="text" id="RBD" maxLength={9} value={formValues.RBD || ""} onChange={handleInputChange} />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="sr-only" htmlFor="nombreDirector">Nombre de Director</label>
                        <input className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none pl-3 uppercase placeholder:text-gray-9" placeholder="Nombre de Director/a" type="text" maxLength={23} id="nombreDirector" value={formValues.nombreDirector || ""} onChange={handleInputChange} />
                    </div>
                </div>

                <div className="mt-4">
                    <button className="btn btn-solid-error hidden" type='submit' disabled={false}>Guardar</button>
                </div>
            </form>

            <div className="divider"></div>

            <label className="text-lg font-bold">Profesional Responsable</label>
            <form onSubmit={(e) => updateDocument(e, 'profesional', formValuesPro, 'Profesional')} className="space-y-4 mt-2">
                <div className="w-full">
                    <label className="sr-only" htmlFor="nombreProfesional">Nombre Completo</label>
                    <input className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 max-w-full uppercase" placeholder="Nombre Completo" maxLength={61} type="text" id="nombreProfesional" value={formValuesPro.nombreProfesional || ""} onChange={handleInputChange2} />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="sr-only" htmlFor="RUT">RUT</label>
                        <input className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9" placeholder="RUT" maxLength={9} type="text" id="RUT" value={formValuesPro.RUT} onChange={handleInputChange2} />
                    </div>

                    <div>
                        <label className="sr-only" htmlFor="profesionpro">Profesión o Especialidad</label>
                        <input className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 capitalize" placeholder="Profesión o Especialidad" maxLength={40} type="text" id="profesionpro" value={formValuesPro.profesionpro} onChange={handleInputChange2} />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="sr-only" htmlFor="cargo">CARGO</label>
                        <input className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 capitalize" placeholder="CARGO" type="text" maxLength={30} id="cargo" value={formValuesPro.cargo} onChange={handleInputChange2} />
                    </div>

                    <div>
                        <label className="sr-only" htmlFor="fono">Fono de Contacto</label>
                        <input className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9" placeholder="Fono Contacto" maxLength={11} type="text" id="fono" value={formValuesPro.fono} onChange={handleInputChange2} />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="sr-only" htmlFor="email">Email de Contacto</label>
                        <input className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9" placeholder="Email de Contacto" maxLength={60} type="text" id="email" value={formValuesPro.email} onChange={handleInputChange2} />
                    </div>

                    <div>
                        <label className="sr-only" htmlFor="fecha">Fecha</label>
                        <input className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9" placeholder="FECHA" type="text" maxLength={10} id="fecha" value={formValuesPro.fecha} onChange={handleInputChange2} />
                    </div>
                </div>


                {listaPro && listaPro.length > 0 ?

                    listaPro.map((item, index) =>
                        <div key={index} className='flex items-center gap-3'>
                            <p>{item.nombreCompleto}</p>
                            <p>{item.profesion}</p>
                            <p>{item.fonoEmail}</p>
                            <p>{item.registroProfesional}</p>
                            <button type='button' onClick={() => removeOtro(index)} className="w-12 btn btn-solid-error">X</button>
                        </div>
                    )
                    :
                    <p>No hay otros profesionales ingresados.</p>
                }

                <div className="mt-4 flex gap-3">
                    <button className="btn btn-solid-error hidden" type='submit' disabled={false}>Guardar</button>
                    <label className="btn btn-solid-secondary" htmlFor="modal-1">Agregar otro Profesional</label>
                    <input className="modal-state" id="modal-1" type="checkbox" />

                    <div className="modal">
                        <label className="modal-overlay" htmlFor="modal-1"></label>
                        <div className="modal-content flex flex-col gap-5">
                            <label htmlFor="modal-1" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                            <h2 className="text-xl">Datos de Profesional</h2>
                            <div className="">
                                <div className="space-y-4 py-8">
                                    <div className="w-full">
                                        <label className="sr-only" htmlFor="nombreCompleto">Nombre Completo</label>
                                        <input className="input input-solid max-w-full" value={newUser.nombreCompleto} onChange={updateNewProfesional} placeholder="Nombre Completo" type="text" maxLength={30} id="nombreCompleto" />
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <label className="sr-only" htmlFor="profesion">Profesión</label>
                                            <input className="input input-solid" value={newUser.profesion} onChange={updateNewProfesional} placeholder="Profesión" type="text" maxLength={20} id="profesion" />
                                        </div>

                                        <div>
                                            <label className="sr-only" htmlFor="fonoEmail">Fono / Email</label>
                                            <input className="input input-solid" value={newUser.fonoEmail} onChange={updateNewProfesional} placeholder="Fono / Email" type="text" maxLength={25} id="fonoEmail" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <label className="sr-only" htmlFor="registroProfesional">Registro Profesional</label>
                                            <input className="input input-solid" value={newUser.registroProfesional} onChange={updateNewProfesional} placeholder="Registro Profesional" type="text" maxLength={10} id="registroProfesional" />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button type='button' onClick={addOtro} className="btn btn-error btn-block">Guardar</button>
                                <label className="btn btn-block" htmlFor="modal-1">Cerrar</label>
                            </div>
                        </div>
                    </div>
                </div>

            </form>

        </div>
    )
}