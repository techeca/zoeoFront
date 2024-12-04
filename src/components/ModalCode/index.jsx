import { useRef, useState, useEffect } from "react";
import { deleteDocument } from "../../utils/requests";
import { useDocument } from "../../contexts/DocumentContext";
import { useAlert } from "../../contexts/AlertContext";
import { useNavigate } from "react-router-dom";

export default function ModalCode() {
    const { document, resetDocument, setDocumentData } = useDocument();
    const [generatedCode, setGeneratedCode] = useState('');
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);
    const [error, setError] = useState('');
    const modalRef = useRef(null);
    const { showAlert } = useAlert();
    const navigate = useNavigate();

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && index > 0 && code[index] === '') {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handleInputChange = (index, value) => {
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

    const handleSubmit = async () => {
        const enteredCode = code.join('')
        if (enteredCode === generatedCode) {
            try {
                const { message } = await deleteDocument(document._id)
                showAlert(message, 'success', 'Borrado');
                setDocumentData(null)
                setCode(['', '', '', '', '', ''])
                navigate('/panel')
            } catch (error) {
                showAlert('Error al borrar el documento', 'error', 'Error');
            } finally {
                if (modalRef.current) {
                    modalRef.current.checked = false;
                }
                resetDocument();
            }
        } else {
            setError('Código incorrecto. Por favor, inténtalo de nuevo.')
        }
    }

    const handleCloseModal = () => {
        //modalRef.current.checked = false
        setCode(['', '', '', '', '', '']);
        setGeneratedCode(Math.random().toString(36).substring(2, 8).toUpperCase());
    }

    useEffect(() => {
        setGeneratedCode(Math.random().toString(36).substring(2, 8).toUpperCase());
    }, [])

    return (
        <>
            <input className="modal-state" id="modal-2" type="checkbox" />
            <div className="modal">
                <label className="modal-overlay" htmlFor="modal-2"></label>
                <div className="modal-content flex flex-col gap-5 w-full">
                    <label htmlFor="modal-2" onClick={handleCloseModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
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
                                    onChange={(e) => handleInputChange(index, e.target.value)}
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
        </>
    )
}