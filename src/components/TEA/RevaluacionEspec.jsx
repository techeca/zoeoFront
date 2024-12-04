import { useState, useEffect } from "react"
import { useDocument } from "../../contexts/DocumentContext";
import { handleUpdateDocument } from "../../utils/requests";
import { useAlert } from "../../contexts/AlertContext";

export default function RevaluacionEspec() {
    const { document } = useDocument()
    const { showAlert } = useAlert()
    const [formValues, setFormValues] = useState({
        "IStxtObsContextoEscolar": "",
        "IStxtAplicacionInstrumento": "",
        "67": false,
        "68": false,
        "70": false,
        "ISprogresos": "",
        "ISaspectosEnfasis": "",
        "LCprogresos": "",
        "LCaspectosEnfasis": "",
        "74": false,
        "75": false,
        "77": false,
        "LCtxtObsContextoEscolar": "",
        "LCtxtAplicacionInstrumento": "",
        "Cprogresos": "",
        "CaspectosEnfasis": "",
        "81": false,
        "82": false,
        "84": false,
        "CtxtObsContextoEscolar": "",
        "CtxtAplicacionInstrumento": "",
        "PSprogresos": "",
        "PSaspectosEnfasis": "",
        "88": false,
        "89": false,
        "91": false,
        "PStxtObsContextoEscolar": "",
        "PStxtAplicacionInstrumento": "",
        "Mprogresos": "",
        "MaspectosEnfasis": "",
        "96": false,
        "97": false,
        "99": false,
        "MtxtObsContextoEscolar": "",
        "MtxtAplicacionInstrumento": "",
        "AFaprendizajeLogrado": "",
        "AFaprendizajeNoLogrado": "",
        "AFlogrosRelevantes": "",
        "103": false,
        "104": false,
        "106": false,
        "AFtxtObsContextoEscolar": "",
        "AFtxtAplicacionInstrumento": "",
        "DPSprogresos": "",
        "DPSaspectosEnfasis": "",
        "111": false,
        "112": false,
        "114": false,
        "DPStxtObsContextoEscolar": "",
        "DPStxtAplicacionInstrumento": "",
        "CFSprogresos": "",
        "CFSaspectosEnfasis": "",
        "118": false,
        "119": false,
        "121": false,
        "CFStxtObsContextoEscolar": "",
        "CFStxtAplicacionInstrumento": ""
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
        if (document && document.revaluacion) {
            setFormValues({
                ...formValues,
                ...document.revaluacion
            });
        }
    }, [document]);

    function updateDocument(e, key, values) {
        e.preventDefault();
        console.log(document);
        handleUpdateDocument(key, document.nombreDocumento, values, document._id);
    }

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

    return (
        <div className="">
            <label className="text-lg font-bold">Área Interacción Social</label>
            <form className="space-y-4 mt-2 mb-6 px-1" onSubmit={(e) => updateDocument(e, 'revaluacion', formValues, 'Área Interacción Social')}>
                <label className="text-lg font-semibold">Señale fuentes de información e instrumentos de evaluación utilizados:</label>

                <div className="w-full flex flex-wrap items-start mb-3 gap-1">
                    <div>
                        <label className="flex items-end cursor-pointer gap-2 text-sm">
                            <input type="checkbox" className="checkbox" id="67" checked={formValues[67]} onChange={handleCheckboxChange} />
                            <span>Entrevista a la familia</span>
                        </label>
                    </div>
                    <div className='w-full flex flex-col gap-3 items-start'>
                        <label className="flex items-end cursor-pointer gap-2 text-sm">
                            <input type="checkbox" className="checkbox" id="68" checked={formValues[68]} onChange={handleCheckboxChange} />
                            <span>Observación en el contexto escolar (especificar):</span>
                        </label>
                        <input className="bg-gray-2 text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none pl-3 placeholder:text-gray-9 capitalize" placeholder="" maxLength={16} type="text" id="IStxtObsContextoEscolar" value={formValues.IStxtObsContextoEscolar} onChange={handleInputChange} />
                    </div>
                    <div className='w-full flex flex-col gap-3 items-start'>
                        <label className="flex items-end cursor-pointer gap-2 text-sm">
                            <input type="checkbox" className="checkbox" id="70" checked={formValues[70]} onChange={handleCheckboxChange} />
                            <span>Aplicación de instrumento (cuáles):</span>
                        </label>
                        <input className="bg-gray-2 text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none pl-3 placeholder:text-gray-9 capitalize" placeholder="" maxLength={16} type="text" id="IStxtAplicacionInstrumento" value={formValues.IStxtAplicacionInstrumento} onChange={handleInputChange} />
                    </div>
                </div>
                <div className="w-full">
                    <label className="sr-only" htmlFor="progresos">Progresos</label>

                    <textarea id="ISprogresos" value={formValues.ISprogresos || ""} onChange={handleInputChange} className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 textarea-solid max-w-full" maxLength={330} placeholder="Describa los progresos en el comportamiento del o la estudiante en esta área" rows="8" ></textarea>
                </div>

                <div className="w-full">
                    <label className="sr-only" htmlFor="enfasis">Énfasis</label>

                    <textarea id="ISaspectosEnfasis" value={formValues.ISaspectosEnfasis || ""} onChange={handleInputChange} className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 textarea-solid max-w-full" maxLength={250} placeholder="Describa aquellos aspectos de esta área a los cuales darle énfasis durante el próximo periodo académico" rows="8" ></textarea>
                </div>

                <div className="mt-4">
                    <button className="btn btn-solid-error" type="submit">Guardar</button>
                </div>
            </form>

            <div className="divider"></div>

            <label className="text-lg font-bold">Área Lenguaje y Comunicación</label>
            <form className="space-y-4 mt-2 mb-6 px-1" onSubmit={(e) => updateDocument(e, 'revaluacion', formValues, 'Área Lenguaje y Comunicación')}>

                <label className="text-lg font-semibold">Señale fuentes de información e instrumentos de evaluación utilizados:</label>

                <div className="w-full flex flex-wrap items-start mb-3 gap-1">
                    <div>
                        <label className="flex items-end cursor-pointer gap-2 text-sm">
                            <input type="checkbox" className="checkbox" id="74" checked={formValues[74]} onChange={handleCheckboxChange} />
                            <span>Entrevista a la familia</span>
                        </label>
                    </div>
                    <div className='w-full flex flex-col gap-3 items-start'>
                        <label className="flex items-end cursor-pointer gap-2 text-sm">
                            <input type="checkbox" className="checkbox" id="75" checked={formValues[75]} onChange={handleCheckboxChange} />
                            <span>Observación en el contexto escolar (indicar):</span>
                        </label>
                        <input className="bg-gray-2 text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none pl-3 placeholder:text-gray-9 capitalize" placeholder="" maxLength={16} type="text" id="LCtxtObsContextoEscolar" value={formValues.LCtxtObsContextoEscolar} onChange={handleInputChange} />
                    </div>
                    <div className='w-full flex flex-col gap-3 items-start'>
                        <label className="flex items-end cursor-pointer gap-2 text-sm">
                            <input type="checkbox" className="checkbox" id="77" checked={formValues[77]} onChange={handleCheckboxChange} />
                            <span>Aplicación de instrumento (cuáles):</span>
                        </label>
                        <input className="bg-gray-2 text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none pl-3 placeholder:text-gray-9 capitalize" placeholder="" maxLength={16} type="text" id="LCtxtAplicacionInstrumento" value={formValues.LCtxtAplicacionInstrumento} onChange={handleInputChange} />
                    </div>
                </div>

                <div className="w-full">
                    <label className="sr-only" htmlFor="progresos">Progresos</label>

                    <textarea id="LCprogresos" value={formValues.LCprogresos || ""} onChange={handleInputChange} className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 textarea-solid max-w-full" maxLength={330} placeholder="Describa los progresos del o la estudiante en esta área (ej: comunicación verbal y no verbal, nivel semántico y pragmático, desempeño comunicativo, entre otros)" rows="8" ></textarea>
                </div>

                <div className="w-full">
                    <label className="sr-only" htmlFor="progresos">Enfasis</label>

                    <textarea id="LCaspectosEnfasis" value={formValues.LCaspectosEnfasis || ""} onChange={handleInputChange} className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 textarea-solid max-w-full" maxLength={250} placeholder="Describa aquellos aspectos de esta área a los cuales darle énfasis durante el próximo periodo académico" rows="8" ></textarea>
                </div>

                <div className="mt-4">
                    <button className="btn btn-solid-error" type="submit">Guardar</button>
                </div>
            </form>

            <div className="divider"></div>

            <label className="text-lg font-bold">Área Cognitiva</label>
            <form className="space-y-4 mt-2 mb-6 px-1" onSubmit={(e) => updateDocument(e, 'revaluacion', formValues, 'Área Cognitiva')}>

                <label className="text-lg font-semibold">Señale fuentes de información e instrumentos de evaluación utilizados:</label>

                <div className="w-full flex flex-wrap items-start mb-3 gap-1">
                    <div>
                        <label className="flex items-end cursor-pointer gap-2 text-sm">
                            <input type="checkbox" className="checkbox" id="81" checked={formValues[81]} onChange={handleCheckboxChange} />
                            <span>Entrevista a la familia</span>
                        </label>
                    </div>
                    <div className='w-full flex flex-col gap-3 items-start'>
                        <label className="flex items-end cursor-pointer gap-2 text-sm">
                            <input type="checkbox" className="checkbox" id="82" checked={formValues[82]} onChange={handleInputChange} />
                            <span>Observación en el contexto escolar (especificar):</span>
                        </label>
                        <input className="bg-gray-2 text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none pl-3 placeholder:text-gray-9 capitalize" placeholder="" maxLength={16} type="text" id="CtxtObsContextoEscolar" value={formValues.CtxtObsContextoEscolar || ""} onChange={handleInputChange} />
                    </div>
                    <div className='w-full flex flex-col gap-3 items-start'>
                        <label className="flex items-end cursor-pointer gap-2 text-sm">
                            <input type="checkbox" className="checkbox" id="84" checked={formValues[84]} onChange={handleInputChange} />
                            <span>Aplicación de instrumento (cuáles):</span>
                        </label>
                        <input className="bg-gray-2 text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none pl-3 placeholder:text-gray-9 capitalize" placeholder="" maxLength={16} type="text" id="CtxtAplicacionInstrumento" value={formValues.CtxtAplicacionInstrumento || ""} onChange={handleInputChange} />
                    </div>
                </div>

                <div className="w-full">
                    <label className="sr-only" htmlFor="progresos">Progresos</label>

                    <textarea id="Cprogresos" value={formValues.Cprogresos || ""} onChange={handleInputChange} className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 textarea-solid max-w-full" maxLength={330} placeholder="Describa los progresos del o la estudiante en esta área (ej: estilo de aprendizaje, habilidades cognitivasm entre otros)" rows="8" ></textarea>
                </div>

                <div className="w-full">
                    <label className="sr-only" htmlFor="aspectosEnfasis">enfasis</label>

                    <textarea id="CaspectosEnfasis" value={formValues.CaspectosEnfasis || ""} onChange={handleInputChange} className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 textarea-solid max-w-full" maxLength={250} placeholder="Describa aquellos aspectos de esta área a los cuales darle énfasis durante el próximo periodo académico" rows="8" ></textarea>
                </div>

                <div className="mt-4">
                    <button className="btn btn-solid-error" type="submit">Guardar</button>
                </div>
            </form>

            <div className="divider"></div>

            <label className="text-lg font-bold">Procesamiento Sensorial</label>
            <form className="space-y-4 mt-2 mb-6 px-1" onSubmit={(e) => updateDocument(e, 'revaluacion', formValues, 'Procesamiento Sensorial')}>

                <label className="text-lg font-semibold">Señale fuentes de información e instrumentos de evaluación utilizados:</label>

                <div className="w-full flex flex-wrap items-start mb-3 gap-1">
                    <div>
                        <label className="flex items-end cursor-pointer gap-2 text-sm">
                            <input type="checkbox" className="checkbox" id="88" checked={formValues[88]} onChange={handleCheckboxChange} />
                            <span>Entrevista a la familia</span>
                        </label>
                    </div>
                    <div className='w-full flex flex-col gap-3 items-start'>
                        <label className="flex items-end cursor-pointer gap-2 text-sm">
                            <input type="checkbox" className="checkbox" id="89" checked={formValues[89]} onChange={handleCheckboxChange} />
                            <span>Observación en el contexto escolar (especificar):</span>
                        </label>
                        <input className="bg-gray-2 text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none pl-3 placeholder:text-gray-9 capitalize" placeholder="" maxLength={16} type="text" id="PStxtObsContextoEscolar" value={formValues.PStxtObsContextoEscolar || ""} onChange={handleInputChange} />
                    </div>
                    <div className='w-full flex flex-col gap-3 items-start'>
                        <label className="flex items-end cursor-pointer gap-2 text-sm">
                            <input type="checkbox" className="checkbox" id="91" checked={formValues[91]} onChange={handleCheckboxChange} />
                            <span>Aplicación de instrumento (cuáles):</span>
                        </label>
                        <input className="bg-gray-2 text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none pl-3 placeholder:text-gray-9 capitalize" placeholder="" maxLength={16} type="text" id="PStxtAplicacionInstrumento" value={formValues.PStxtAplicacionInstrumento || ""} onChange={handleInputChange} />
                    </div>
                </div>

                <div className="w-full">
                    <label className="sr-only" htmlFor="progresos">Progresos</label>

                    <textarea id="PSprogresos" value={formValues.PSprogresos || ""} onChange={handleInputChange} className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 textarea-solid max-w-full" maxLength={330} placeholder="Describa los progresos del o la estudiante en esta área (ej: táctil, auditiva, visual, vestibular, entre otros)" rows="8" ></textarea>
                </div>

                <div className="w-full">
                    <label className="sr-only" htmlFor="aspectosEnfasis">enfasis</label>

                    <textarea id="PSaspectosEnfasis" value={formValues.PSaspectosEnfasis || ""} onChange={handleInputChange} className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 textarea-solid max-w-full" maxLength={250} placeholder="Describa aquellos aspectos de esta área a los cuales darle énfasis durante el próximo periodo académico" rows="8" ></textarea>
                </div>

                <div className="mt-4">
                    <button className="btn btn-solid-error" type="submit">Guardar</button>
                </div>
            </form>

            <div className="divider"></div>

            <label className="text-lg font-bold">Área Motora</label>
            <form className="space-y-4 mt-2 mb-6 px-1" onSubmit={(e) => updateDocument(e, 'revaluacion', formValues, 'Área Motora')}>

                <label className="text-lg font-bold">Señale fuentes de información e instrumentos de evaluación utilizados:</label>

                <div className="w-full flex flex-wrap items-start mb-3 gap-1">
                    <div>
                        <label className="flex items-end cursor-pointer gap-2 text-sm">
                            <input type="checkbox" className="checkbox" id="96" checked={formValues[96]} onChange={handleCheckboxChange} />
                            <span>Entrevista a la familia</span>
                        </label>
                    </div>
                    <div className='w-full flex flex-col gap-3 items-start'>
                        <label className="flex items-end cursor-pointer gap-2 text-sm">
                            <input type="checkbox" className="checkbox" id="97" checked={formValues[97]} onChange={handleCheckboxChange} />
                            <span>Observación en el contexto escolar (especificar):</span>
                        </label>
                        <input className="bg-gray-2 text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none pl-3 placeholder:text-gray-9 capitalize" placeholder="" maxLength={16} type="text" id="MtxtObsContextoEscolar" value={formValues.MtxtObsContextoEscolar || ""} onChange={handleInputChange} />
                    </div>
                    <div className='w-full flex flex-col gap-3 items-start'>
                        <label className="flex items-end cursor-pointer gap-2 text-sm">
                            <input type="checkbox" className="checkbox" id="99" checked={formValues[99]} onChange={handleCheckboxChange} />
                            <span>Aplicación de instrumento (cuáles):</span>
                        </label>
                        <input className="bg-gray-2 text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none pl-3 placeholder:text-gray-9 capitalize" placeholder="" maxLength={16} type="text" id="MtxtAplicacionInstrumento" value={formValues.MtxtAplicacionInstrumento || ""} onChange={handleInputChange} />
                    </div>
                </div>

                <div className="w-full">
                    <label className="sr-only" htmlFor="progresos">Progresos</label>

                    <textarea id="Mprogresos" value={formValues.Mprogresos || ""} onChange={handleInputChange} className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 textarea-solid max-w-full" maxLength={330} placeholder="Describa los progresos del o la estudiante en esta área" rows="8" ></textarea>
                </div>

                <div className="w-full">
                    <label className="sr-only" htmlFor="aspectosEnfasis">enfasis</label>

                    <textarea id="MaspectosEnfasis" value={formValues.MaspectosEnfasis || ""} onChange={handleInputChange} className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 textarea-solid max-w-full" maxLength={250} placeholder="Describa aquellos aspectos de esta área a los cuales darle énfasis durante el próximo periodo académico" rows="8" ></textarea>
                </div>

                <div className="mt-4">
                    <button className="btn btn-solid-error" type="submit">Guardar</button>
                </div>
            </form>

            <div className="divider"></div>

            <label className="text-lg font-bold">Área Académica Funcional</label>
            <form className="space-y-4 mt-2 mb-6 px-1" onSubmit={(e) => updateDocument(e, 'revaluacion', formValues, 'Área Académica Funcional')}>

                <label className="text-lg font-bold">Señale fuentes de información e instrumentos de evaluación utilizados:</label>

                <div className="w-full flex flex-wrap items-start mb-3 gap-1">
                    <div>
                        <label className="flex items-end cursor-pointer gap-2 text-sm">
                            <input type="checkbox" className="checkbox" id="103" checked={formValues[103]} onChange={handleCheckboxChange} />
                            <span>Entrevista a la familia</span>
                        </label>
                    </div>
                    <div className='w-full flex flex-col gap-3 items-start'>
                        <label className="flex items-end cursor-pointer gap-2 text-sm">
                            <input type="checkbox" className="checkbox" id="104" checked={formValues[104]} onChange={handleCheckboxChange} />
                            <span>Observación en el contexto escolar (especificar):</span>
                        </label>
                        <input className="bg-gray-2 text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none pl-3 placeholder:text-gray-9 capitalize" placeholder="" maxLength={16} type="text" id="AFtxtObsContextoEscolar" value={formValues.AFtxtObsContextoEscolar || ""} onChange={handleInputChange} />
                    </div>
                    <div className='w-full flex flex-col gap-3 items-start'>
                        <label className="flex items-end cursor-pointer gap-2 text-sm">
                            <input type="checkbox" className="checkbox" id="106" checked={formValues[106]} onChange={handleCheckboxChange} />
                            <span>Aplicación de instrumento (cuáles):</span>
                        </label>
                        <input className="bg-gray-2 text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none pl-3 placeholder:text-gray-9 capitalize" placeholder="" maxLength={16} type="text" id="AFtxtAplicacionInstrumento" value={formValues.AFtxtAplicacionInstrumento || ""} onChange={handleInputChange} />
                    </div>
                </div>

                <div className="w-full">
                    <label className="sr-only" htmlFor="aprendizajeLogrado">Aprendizajes Logrados</label>

                    <textarea id="AFaprendizajeLogrado" value={formValues.AFaprendizajeLogrado || ""} onChange={handleInputChange} className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 textarea-solid max-w-full" maxLength={250} placeholder="Refiérase a los principales aprendizajes (curriculares y/o de desarrollo) logrados por el/la estudiante (lenguaje y comunicación, matemáticas, ciencias)" rows="8" ></textarea>
                </div>

                <div className="w-full">
                    <label className="sr-only" htmlFor="aprendizajeNoLogrado">Aprendizajes No Logrados</label>

                    <textarea id="AFaprendizajeNoLogrado" value={formValues.AFaprendizajeNoLogrado || ""} onChange={handleInputChange} className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 textarea-solid max-w-full" maxLength={250} placeholder="Señale aprendizajes (curriculares y/o de desarrollo) no logrados y principales asignaturas en las que el estudiante mantiene dificultades." rows="8" ></textarea>
                </div>

                <div className="w-full">
                    <label className="sr-only" htmlFor="logrosRelevantes">Logros Relevantes</label>

                    <textarea id="AFlogrosRelevantes" value={formValues.AFlogrosRelevantes || ""} onChange={handleInputChange} className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 textarea-solid max-w-full" maxLength={250} placeholder="Señale logros relevantes o destacados que presenta para paarticipar en el contexto escolar y familiar." rows="8" ></textarea>
                </div>

                <div className="mt-4">
                    <button className="btn btn-solid-error" type="submit">Guardar</button>
                </div>
            </form>

            <div className="divider"></div>

            <label className="text-lg font-bold">Área de Desempeño Personal y Social</label>
            <form className="space-y-4 mt-2 mb-6 px-1" onSubmit={(e) => updateDocument(e, 'revaluacion', formValues, 'Área de Desempeño Personal y Social')}>

                <label className="text-lg font-bold">Señale fuentes de información e instrumentos de evaluación utilizados:</label>

                <div className="w-full flex flex-wrap items-start mb-3 gap-1">
                    <div>
                        <label className="flex items-end cursor-pointer gap-2 text-sm">
                            <input type="checkbox" className="checkbox" id="111" checked={formValues[111]} onChange={handleCheckboxChange} />
                            <span>Entrevista a la familia</span>
                        </label>
                    </div>
                    <div className='w-full flex flex-col gap-3 items-start'>
                        <label className="flex items-end cursor-pointer gap-2 text-sm">
                            <input type="checkbox" className="checkbox" id="112" checked={formValues[112]} onChange={handleCheckboxChange} />
                            <span>Observación en el contexto escolar (especificar):</span>
                        </label>
                        <input className="bg-gray-2 text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none pl-3 placeholder:text-gray-9 capitalize" placeholder="" maxLength={16} type="text" id="DPStxtObsContextoEscolar" value={formValues.DPStxtObsContextoEscolar || ""} onChange={handleInputChange} />
                    </div>
                    <div className='w-full flex flex-col gap-3 items-start'>
                        <label className="flex items-end cursor-pointer gap-2 text-sm">
                            <input type="checkbox" className="checkbox" id="114" checked={formValues[114]} onChange={handleCheckboxChange} />
                            <span>Aplicación de instrumento (cuáles):</span>
                        </label>
                        <input className="bg-gray-2 text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none pl-3 placeholder:text-gray-9 capitalize" placeholder="" maxLength={16} type="text" id="DPStxtAplicacionInstrumento" value={formValues.DPStxtAplicacionInstrumento || ""} onChange={handleInputChange} />
                    </div>
                </div>

                <div className="w-full">
                    <label className="sr-only" htmlFor="progresos">Progresos</label>

                    <textarea id="DPSprogresos" value={formValues.DPSprogresos || ""} onChange={handleInputChange} className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 textarea-solid max-w-full" maxLength={330} placeholder="Describa los progresos del o la estudiante en esta área" rows="8" ></textarea>
                </div>

                <div className="w-full">
                    <label className="sr-only" htmlFor="aspectosEnfasis">enfasis</label>

                    <textarea id="DPSaspectosEnfasis" value={formValues.DPSaspectosEnfasis || ""} onChange={handleInputChange} className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 textarea-solid max-w-full" maxLength={250} placeholder="Describa aquellos aspectos de esta área a los cuales darle énfasis durante el próximo periodo académico" rows="8" ></textarea>
                </div>

                <div className="mt-4">
                    <button className="btn btn-solid-error" type="submit">Guardar</button>
                </div>
            </form>

            <div className="divider"></div>

            <label className="text-lg font-bold">Contexto Familiar y Social del Estudiante</label>
            <form className="space-y-4 mt-2 mb-6 px-1" onSubmit={(e) => updateDocument(e, 'revaluacion', formValues, 'Contexto Familiar y Social del Estudiante')}>

                <label className="text-lg font-bold">Señale fuentes de información e instrumentos de evaluación utilizados:</label>

                <div className="w-full flex flex-wrap items-start mb-3 gap-1">
                    <div>
                        <label className="flex items-end cursor-pointer gap-2 text-sm">
                            <input type="checkbox" className="checkbox" id="118" checked={formValues[118]} onChange={handleCheckboxChange} />
                            <span>Entrevista a la familia</span>
                        </label>
                    </div>
                    <div className='w-full flex flex-col gap-3 items-start'>
                        <label className="flex items-end cursor-pointer gap-2 text-sm">
                            <input type="checkbox" className="checkbox" id="119" checked={formValues[119]} onChange={handleCheckboxChange} />
                            <span>Observación en el contexto escolar (especificar):</span>
                        </label>
                        <input className="bg-gray-2 text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none pl-3 placeholder:text-gray-9 capitalize" placeholder="" maxLength={16} type="text" id="CFStxtObsContextoEscolar" value={formValues.CFStxtObsContextoEscolar || ""} onChange={handleInputChange} />
                    </div>
                    <div className='w-full flex flex-col gap-3 items-start'>
                        <label className="flex items-end cursor-pointer gap-2 text-sm">
                            <input type="checkbox" className="checkbox" id="121" checked={formValues[121]} onChange={handleCheckboxChange} />
                            <span>Aplicación de instrumento (cuáles):</span>
                        </label>
                        <input className="bg-gray-2 text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none pl-3 placeholder:text-gray-9 capitalize" placeholder="" maxLength={16} type="text" id="CFStxtAplicacionInstrumento" value={formValues.CFStxtAplicacionInstrumento || ""} onChange={handleInputChange} />
                    </div>
                </div>

                <div className="w-full">
                    <label className="sr-only" htmlFor="CFSprogresos">Progresos</label>

                    <textarea id="CFSprogresos" value={formValues.CFSprogresos || ""} onChange={handleInputChange} className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 textarea-solid max-w-full" maxLength={330} placeholder="Describa aquellos aspectos destacados respecto a la participación de la familia en los progresos del o la estudiante." rows="8" ></textarea>
                </div>

                <div className="w-full">
                    <label className="sr-only" htmlFor="CFSaspectosEnfasis">enfasis</label>

                    <textarea id="CFSaspectosEnfasis" value={formValues.CFSaspectosEnfasis || ""} onChange={handleInputChange} className="bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 textarea-solid max-w-full" maxLength={250} placeholder="Describa aquellos aspectos de esta área a los cuales darle énfasis durante el próximo periodo académico" rows="8" ></textarea>
                </div>

                <div className="mt-4">
                    <button className="btn btn-solid-error" type="submit">Guardar</button>
                </div>
            </form>

        </div>
    )
}