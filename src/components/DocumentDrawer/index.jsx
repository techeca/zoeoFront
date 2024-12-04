import { useAlert } from "../../contexts/AlertContext";
import useDocumentAction from "../../hooks/useDocumentAction";
import { useState } from "react";

export default function DocumentDrawer() {
    const [documentName, setDocumentName] = useState('');
    const { generateDocument } = useDocumentAction();
    const { showAlert } = useAlert();

    const handleGenerate = async () => {
        try {
            const { message, id } = await generateDocument(documentName);
            showAlert(message, 'success', id);
        } catch (error) {
            showAlert('Error al crear el documento', 'error', 'Error')
        }
    }

    const handleClose = () => {
        setDocumentName('');
    }

    return (
        <>
            <input type="checkbox" id="drawer-right" className="drawer-toggle" />
            <label className="overlay" htmlFor="drawer-right"></label>
            <div className="drawer drawer-right">
                <div className="drawer-content pt-10 flex flex-col h-full">
                    <label onClick={handleClose} htmlFor="drawer-right" className="btn btn-sm rounded-md btn-ghost absolute right-2 top-2">✕</label>
                    <div>
                        <h2 className="text-xl font-medium">Seleccionar Documento</h2>
                        {/* Document Dropdown */}             
                        <div className='flex gap-3 mt-2'>
                            <select
                                id="documentSelect"
                                value={documentName}
                                onChange={(e) => setDocumentName(e.target.value)}
                                className='select w-full placeholder:text-white/30 bg-gray-2 border-0 text-sm text-white/50 py-2 px-2 rounded-md'
                            >
                                <option value="" hidden disabled>Seleccionar</option>
                                <option value="TEA">Trastorno del Espectro Autista</option>
                            </select>
                        </div>
                    </div>
                    <div className="h-full flex flex-row justify-end items-end gap-2">
                        <label onClick={handleClose} htmlFor="drawer-right" className="btn btn-ghost">Cancelar</label>
                        <label disabled={true} onClick={handleGenerate} htmlFor="drawer-right" className="btn btn-primary">Crear</label>
                    </div>
                </div>
            </div>
        </>
    )
}