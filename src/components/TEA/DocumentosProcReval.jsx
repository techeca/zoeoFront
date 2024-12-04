import { useState, useEffect } from "react";
import { useDocument } from "../../contexts/DocumentContext";
import { handleUpdateDocument } from "../../utils/requests";
import { useAlert } from "../../contexts/AlertContext";

export default function DocumentosProcReval() {
    const { document, documentSelected } = useDocument();
    const { showAlert } = useAlert();
    const [formValues, setFormValues] = useState({
        otrosEspecificar: "",
        numeroDocumento: "",
        progresoComportamiento: "",
        aspectosEnfasis: "",
        EMEsp: "",
        "51": false, //Pauta de observacion
        "52": false, //Observacion en el contexto...
        "53": false, //Escolar
        "54": false, //Social
        "55": false, //Neurologico
        "56": false, //Psicologico
        "57": false, //Fonoaudiologico
        "58": false, //Evaluación pedagogica
        "59": false, //Psicopedagogica
        "60": false, //Valoracion de salud
        "61": false, //Examen medico especialista
        "63": false //Otros
    });

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
        if (document && document.documentos) {
            setFormValues({
                ...formValues,
                ...document.documentos
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

    return (
        <div className="min-h-0">
            <form className="space-y-4 mt-2 mb-6 px-1" onSubmit={(e) => updateDocument(e, 'documentos', formValues, 'Documentos')}>

                <label className="text-xl font-bold">Documentos</label>
                <div className="w-full flex flex-col items-start pb-3">
                    <div>
                        <label className="flex items-end cursor-pointer gap-2 text-sm">
                            <input type="checkbox" className="checkbox" id="51" checked={formValues[51]} onChange={handleCheckboxChange} />
                            <span>Pauta de observación</span>
                        </label>
                    </div>
                    <div>
                        <label className="flex items-end cursor-pointer gap-2 mt-1">
                            <input type="checkbox" className="checkbox" id="52" checked={formValues[52]} onChange={handleCheckboxChange} />
                            <span className='text-sm'>Observación en el contexto escolar (aula, patio, otras dependencias del establecimiento)</span>
                        </label>
                    </div>
                </div>

                <label className="font-bold">Certificados/Protocolos/Informes:</label>

                <div className="w-full flex flex-wrap items-start mb-3 gap-1">
                    <div>
                        <label className="flex items-end cursor-pointer gap-2 text-sm">
                            <input type="checkbox" className="checkbox" id="53" checked={formValues[53]} onChange={handleCheckboxChange} />
                            <span>Escolar</span>
                        </label>
                    </div>
                    <div>
                        <label className="flex items-end cursor-pointer gap-2 text-sm">
                            <input type="checkbox" className="checkbox" id="54" checked={formValues[54]} onChange={handleCheckboxChange} />
                            <span>Social</span>
                        </label>
                    </div>
                    <div>
                        <label className="flex items-end cursor-pointer gap-2 text-sm">
                            <input type="checkbox" className="checkbox" id="55" checked={formValues[55]} onChange={handleCheckboxChange} />
                            <span>Neurológico</span>
                        </label>
                    </div>
                    <div>
                        <label className="flex items-end cursor-pointer gap-2 text-sm">
                            <input type="checkbox" className="checkbox" id="56" checked={formValues[56]} onChange={handleCheckboxChange} />
                            <span>Psicológico</span>
                        </label>
                    </div>
                    <div>
                        <label className="flex items-end cursor-pointer gap-2 text-sm">
                            <input type="checkbox" className="checkbox" id="57" checked={formValues[57]} onChange={handleCheckboxChange} />
                            <span>Fonoaudiológico</span>
                        </label>
                    </div>
                    <div>
                        <label className="flex items-end cursor-pointer gap-2 text-sm">
                            <input type="checkbox" className="checkbox" id="58" checked={formValues[58]} onChange={handleCheckboxChange} />
                            <span>Evaluación pedagógica</span>
                        </label>
                    </div>
                    <div>
                        <label className="flex items-end cursor-pointer gap-2 text-sm">
                            <input type="checkbox" className="checkbox" id="59" checked={formValues[59]} onChange={handleCheckboxChange} />
                            <span>Psicopedagógica</span>
                        </label>
                    </div>
                    <div>
                        <label className="flex items-end cursor-pointer gap-2 text-sm">
                            <input type="checkbox" className="checkbox" id="60" checked={formValues[60]} onChange={handleCheckboxChange} />
                            <span>Valoración de salud</span>
                        </label>
                    </div>
                    <div className='w-full flex gap-3 items-center'>
                        <label className="flex items-end cursor-pointer gap-2 text-sm">
                            <input type="checkbox" className="checkbox" id="61" checked={formValues[61]} onChange={handleCheckboxChange} />
                            <span>Examen médico especialista (señale cuál)</span>
                        </label>
                        <input className="bg-gray-2 text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none pl-3 placeholder:text-gray-9 capitalize" placeholder="" maxLength={16} type="text"
                            id="EMEsp" value={formValues.EMEsp || ""} onChange={handleInputChange} />
                    </div>
                    <div className='w-full flex gap-3 items-center'>
                        <label className="flex items-end cursor-pointer gap-2 text-sm">
                            <input type="checkbox" className="checkbox" id="63" checked={formValues[63]} onChange={handleCheckboxChange} />
                            <span>Otro(s) (especificar):</span>
                        </label>
                        <input className="bg-gray-2 text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none pl-3 placeholder:text-gray-9 capitalize" placeholder="" maxLength={16} type="text"
                            id="otrosEspecificar" value={formValues.otrosEspecificar || ""} onChange={handleInputChange} />
                    </div>
                    <div className='w-full flex gap-3 items-center'>
                        <label className="flex items-center w-full cursor-pointer gap-2 text-sm">
                            <span>Señale el número de documentos que se adjuntan:</span>
                            <input className="bg-gray-2 text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none pl-3 uppercase placeholder:text-gray-9" placeholder="" maxLength={16} type="text"
                                id="numeroDocumento" value={formValues.numeroDocumento || ""} onChange={handleInputChange} />
                        </label>
                    </div>
                </div>

                <div className="mt-4">
                    <button className="btn btn-solid-error" type="submit">Guardar</button>
                </div>
            </form>
        </div>
    )
}