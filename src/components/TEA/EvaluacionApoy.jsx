import { useState, useEffect } from "react";
import { handleUpdateDocument } from "../../utils/requests";
import { useDocument } from "../../contexts/DocumentContext";
import { useAlert } from "../../contexts/AlertContext";

export default function EvaluacionApoyos() {
    const { document } = useDocument();
    const { showAlert } = useAlert()
    const [formValues, setFormValues] = useState({
        nuevosApoyos: "",
        comentarios: "",
        PERefectividad: "",
        PERcontinuidad: "",
        CURefectividad: "",
        CURcontinuidad: "",
        MRMefectividad: "",
        MRMcontinuidad: "",
        ORGefectividad: "",
        ORGcontinuidad: "",
        FAMefectividad: "",
        FAMcontinuidad: "",
        OAefectividad: "",
        OAcontinuidad: "",
        estrategias: "",
        efectividad: "",
        "127": false,
        "128": false,
        "131": false,
        "132": false,
        "135": false,
        "136": false,
        "139": false,
        "140": false,
        "143": false,
        "144": false,
        "147": false,
        "148": false,
    })

    const handleCheckboxChange = (e) => {
        setFormValues((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.checked, // actualiza el estado del checkbox
        }));
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    };

    useEffect(() => {
        if (document && document.evaluacionApoyos) {
            setFormValues({
                ...formValues,
                ...document.evaluacionApoyos
            });
        }
    }, [document]);

    async function updateDocument(e, key, values, title) {
        e.preventDefault();
        //console.log(document);
        try {
            const response = await handleUpdateDocument(key, document.nombreDocumento, values, document._id);
            showAlert(response.message, 'success', title)
        } catch (error) {
            showAlert(response.message, 'error', 'Error')
        }
    }

    const handleRadioChange = (key) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            "127": key === "127",
            "128": key === "128"
        }))
    }

    const handleRadioChange2 = (key) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            "131": key === "131",
            "132": key === "132"
        }))
    }

    const handleRadioChange3 = (key) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            "135": key === "135",
            "136": key === "136"
        }))
    }

    const handleRadioChange4 = (key) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            "139": key === "139",
            "140": key === "140"
        }))
    }

    const handleRadioChange5 = (key) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            "143": key === "143",
            "144": key === "144"
        }))
    }

    const handleRadioChange6 = (key) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            "147": key === "147",
            "148": key === "148",
        }))
    }

    return (
        <div className="min-h-0">

            <label className="text-lg font-bold">Efectividad de Apoyos</label>
            <form className="space-y-4 mt-2 mb-6 px-1" onSubmit={(e) => updateDocument(e, 'evaluacionApoyos', formValues, 'Efectividad de Apoyos, Personales')}>
                <div className="w-full">
                    <label className="" htmlFor="personales">Personales</label>
                    <textarea id="PERefectividad" value={formValues.PERefectividad || ""} onChange={handleInputChange} className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 textarea-solid max-w-full" maxLength={100} placeholder="Efectividad" rows="2" ></textarea>
                    <textarea id="PERcontinuidad" value={formValues.PERcontinuidad || ""} onChange={handleInputChange} className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 textarea-solid max-w-full" maxLength={100} placeholder="Observaciones" rows="2" ></textarea>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div id="group1" className="flex flex-col gap-3 items-center">
                        <label className="self-start" htmlFor="RUN">Continuidad:</label>
                        <div className='flex gap-3 w-full'>
                            <label className="flex cursor-pointer gap-2 text-sm">
                                <input type="radio" className="radio" name="group1" checked={formValues[127]} onChange={() => handleRadioChange("127")} />
                                <span>SI</span>
                            </label>
                            <label className="flex cursor-pointer gap-2">
                                <input type="radio" className="radio" name="group1" checked={formValues[128]} onChange={() => handleRadioChange("128")} />
                                <span>NO</span>
                            </label>
                        </div>
                    </div>
                </div>
                <button className='btn btn-solid-error' type="submit">Guardar</button>
            </form>

            <div className="divider"></div>

            <form className="space-y-4 mt-2 mb-6 px-1" onSubmit={(e) => updateDocument(e, 'evaluacionApoyos', formValues, 'Efectividad de Apoyos, Curriculares')}>
                <div className="w-full">
                    <label className="" htmlFor="curriculares">Curriculares</label>
                    <textarea id="CURefectividad" value={formValues.CURefectividad || ""} onChange={handleInputChange} className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 textarea-solid max-w-full" maxLength={100} placeholder="Efectividad" rows="2" ></textarea>
                    <textarea id="CURcontinuidad" value={formValues.CURcontinuidad || ""} onChange={handleInputChange} className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 textarea-solid max-w-full" maxLength={100} placeholder="Observaciones" rows="2" ></textarea>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div id="group1" className="flex flex-col gap-3 items-center">
                        <label className="self-start" htmlFor="RUN">Continuidad:</label>
                        <div className='flex gap-3 w-full'>
                            <label className="flex cursor-pointer gap-2">
                                <input type="radio" className="radio" name="group1" checked={formValues[131]} onChange={() => handleRadioChange2("131")} />
                                <span>SI</span>
                            </label>
                            <label className="flex cursor-pointer gap-2">
                                <input type="radio" className="radio" name="group1" checked={formValues[132]} onChange={() => handleRadioChange2("132")} />
                                <span>NO</span>
                            </label>
                        </div>
                    </div>
                </div>
                <button className='btn btn-solid-error' type="submit">Guardar</button>
            </form>

            <div className="divider"></div>

            <form className="space-y-4 mt-2 mb-6 px-1" onSubmit={(e) => updateDocument(e, 'evaluacionApoyos', formValues, 'Efectividad de Apoyos, Medios y Recursos Materiales')}>
                <div className="w-full">
                    <label className="" htmlFor="mediosRecursosMateriales">Medios y Recursos Materiales</label>
                    <textarea id="MRMefectividad" value={formValues.MRMefectividad || ""} onChange={handleInputChange} className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 textarea-solid max-w-full" maxLength={100} placeholder="Efectividad" rows="2" ></textarea>
                    <textarea id="MRMcontinuidad" value={formValues.MRMcontinuidad || ""} onChange={handleInputChange} className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 textarea-solid max-w-full" maxLength={100} placeholder="Observaciones" rows="2" ></textarea>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div id="group1" className="flex flex-col gap-3 items-center">
                        <label className="self-start" htmlFor="RUN">Continuidad:</label>
                        <div className='flex gap-3 w-full'>
                            <label className="flex cursor-pointer gap-2">
                                <input type="radio" className="radio" name="group1" checked={formValues[135]} onChange={() => handleRadioChange3("135")} />
                                <span>SI</span>
                            </label>
                            <label className="flex cursor-pointer gap-2">
                                <input type="radio" className="radio" name="group1" checked={formValues[136]} onChange={() => handleRadioChange3("136")} />
                                <span>NO</span>
                            </label>
                        </div>
                    </div>
                </div>
                <button className='btn btn-solid-error' type="submit">Guardar</button>
            </form>

            <div className="divider"></div>

            <form className="space-y-4 mt-2 mb-6 px-1" onSubmit={(e) => updateDocument(e, 'evaluacionApoyos', formValues, 'Efectividad de Apoyos, Organizativos')}>
                <div className="w-full">
                    <label className="" htmlFor="organizativos">Organizativos</label>
                    <textarea id="ORGefectividad" value={formValues.ORGefectividad || ""} onChange={handleInputChange} className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 textarea-solid max-w-full" maxLength={100} placeholder="Efectividad" rows="2" ></textarea>
                    <textarea id="ORGcontinuidad" value={formValues.ORGcontinuidad || ""} onChange={handleInputChange} className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 textarea-solid max-w-full" maxLength={100} placeholder="Observaciones" rows="2" ></textarea>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div id="group1" className="flex flex-col gap-3 items-center">
                        <label className="self-start" htmlFor="RUN">Continuidad:</label>
                        <div className='flex gap-3 w-full'>
                            <label className="flex cursor-pointer gap-2">
                                <input type="radio" className="radio" name="group1" checked={formValues[139]} onChange={() => handleRadioChange4("139")} />
                                <span>SI</span>
                            </label>
                            <label className="flex cursor-pointer gap-2">
                                <input type="radio" className="radio" name="group1" checked={formValues[140]} onChange={() => handleRadioChange4("140")} />
                                <span>NO</span>
                            </label>
                        </div>
                    </div>
                </div>
                <button className='btn btn-solid-error' type="submit">Guardar</button>
            </form>

            <div className="divider"></div>

            <form className="space-y-4 mt-2 mb-6 px-1" onSubmit={(e) => updateDocument(e, 'evaluacionApoyos', formValues, 'Efectividad de Apoyos, Familiares')}>
                <div className="w-full">
                    <label className="" htmlFor="familiares">Familiares</label>
                    <textarea id="FAMefectividad" value={formValues.FAMefectividad || ""} onChange={handleInputChange} className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 textarea-solid max-w-full" maxLength={100} placeholder="Efectividad" rows="2" ></textarea>
                    <textarea id="FAMcontinuidad" value={formValues.FAMcontinuidad || ""} onChange={handleInputChange} className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 textarea-solid max-w-full" maxLength={100} placeholder="Observaciones" rows="2" ></textarea>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div id="group1" className="flex flex-col gap-3 items-center">
                        <label className="self-start" htmlFor="RUN">Continuidad:</label>
                        <div className='flex gap-3 w-full'>
                            <label className="flex cursor-pointer gap-2">
                                <input type="radio" className="radio" name="group1" checked={formValues[143]} onChange={() => handleRadioChange5("143")} />
                                <span>SI</span>
                            </label>
                            <label className="flex cursor-pointer gap-2">
                                <input type="radio" className="radio" name="group1" checked={formValues[144]} onChange={() => handleRadioChange5("144")} />
                                <span>NO</span>
                            </label>
                        </div>
                    </div>
                </div>
                <button className='btn btn-solid-error' type="submit">Guardar</button>
            </form>

            <div className="divider"></div>

            <form className="space-y-4 mt-2 mb-6 px-1" onSubmit={(e) => updateDocument(e, 'evaluacionApoyos', formValues, 'Efectividad de Apoyos, Otros Apoyos')}>
                <div className="w-full">
                    <label className="" htmlFor="otrosApoyos">Otros Apoyos</label>
                    <textarea id="OAefectividad" value={formValues.OAefectividad || ""} onChange={handleInputChange} className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 textarea-solid max-w-full" maxLength={100} placeholder="Efectividad" rows="2" ></textarea>
                    <textarea id="OAcontinuidad" value={formValues.OAcontinuidad || ""} onChange={handleInputChange} className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 textarea-solid max-w-full" maxLength={100} placeholder="Observaciones" rows="2" ></textarea>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div id="group1" className="flex flex-col gap-3 items-center">
                        <label className="self-start" htmlFor="RUN">Continuidad:</label>
                        <div className='flex gap-3 w-full'>
                            <label className="flex cursor-pointer gap-2">
                                <input type="radio" className="radio" name="group1" checked={formValues[147]} onChange={() => handleRadioChange6("147")} />
                                <span>SI</span>
                            </label>
                            <label className="flex cursor-pointer gap-2">
                                <input type="radio" className="radio" name="group1" checked={formValues[148]} onChange={() => handleRadioChange6("148")} />
                                <span>NO</span>
                            </label>
                        </div>
                    </div>
                </div>
                <button className='btn btn-solid-error' type="submit">Guardar</button>
            </form>

            <div className="divider"></div>

            <label className="text-lg font-bold">Estrategias</label>
            <form className="space-y-4 mt-2 mb-6 px-1" onSubmit={(e) => updateDocument(e, 'evaluacionApoyos', formValues, 'Estrategias')}>

                <div className="w-full">
                    <label className="sr-only" htmlFor="estrategias">Estrategias NEE</label>

                    <textarea id="estrategias" value={formValues.estrategias || ""} onChange={handleInputChange} className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 textarea-solid max-w-full" maxLength={330} placeholder="Describa las estrategias de trabajo utilizadas entre los profesores y otros profesionales del establecimiento para abordar la respuesta educativa a las NEE de éste estudiante que han resultado ser efectivas." rows="8" ></textarea>
                </div>

                <div className="w-full">
                    <label className="sr-only" htmlFor="efectividad">Efectividad</label>

                    <textarea id="efectividad" value={formValues.efectividad || ""} onChange={handleInputChange} className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 textarea-solid max-w-full" maxLength={250} placeholder="Describa la efectividad de las estrategias de apoyo utilizadas con la familia y las recomendaciones para el período escolar siguiente." rows="8" ></textarea>
                </div>

                <div className="mt-4">
                    <button className="btn btn-solid-error" type="submit">Guardar</button>
                </div>
            </form>

            <div className="divider"></div>

            <label className="text-lg font-bold">Nuevos Apoyos y Comentarios</label>
            <form className="space-y-4 mt-2 mb-6 px-1" onSubmit={(e) => updateDocument(e, 'evaluacionApoyos', formValues, 'Nuevos Apoyos y Comentarios')}>

                <div className="w-full">
                    <label className="sr-only" htmlFor="nuevosApoyos">Nuevos Apoyos</label>

                    <textarea id="nuevosApoyos" value={formValues.nuevosApoyos || ""} onChange={handleInputChange} className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 textarea-solid max-w-full" maxLength={250} placeholder="Describa los nuevos apoyos que se deben incorporar, para favorecer el aprendizaje y la participación del estudiante en el contexto escolar." rows="8" ></textarea>
                </div>

                <div className="w-full">
                    <label className="sr-only" htmlFor="comentarios">Comentarios</label>

                    <textarea id="comentarios" value={formValues.comentarios || ""} onChange={handleInputChange} className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 textarea-solid max-w-full" maxLength={250} placeholder="COMENTARIOS, OBSERVACIONES Y SUGERENCIAS PARA EL PRÓXIMO PERÍODO (señalar si el estudiante será o no promovido, indicar el curso y las razones de la permanencia o promoción)" rows="8" ></textarea>
                </div>

                <div className="mt-4">
                    <button className="btn btn-solid-error" type="submit">Guardar</button>
                </div>
            </form>

        </div>
    )
}