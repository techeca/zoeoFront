import { useDocument } from "../contexts/DocumentContext";
import { deleteDocument, handleCreateDocument, handleGenerateDocument } from "../utils/requests";

export default function useDocumentAction() {
    const { documentSelected, setDocumentData, resetDocument, setState, document } = useDocument();

    const generateDocument = async (documentName) => {
        try {
            //const token = localStorage.getItem('token')
            const { document, message } = await handleCreateDocument(documentName);
            setDocumentData(document);
            setState('p2')
            return { message, id: document._id }
        } catch (error) {
            console.error('Error al generar el documento:', error);
        }
    };

    const downloadDocument = () => {
        if (document) {
            const token = localStorage.getItem('token')
            handleGenerateDocument(document, token);
        }
    };

    const delDocument = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await deleteDocument(document._id, token);
            const { message } = response.json();
            return { message }
        } catch (error) {
            return { message: error }
        }
    };

    return { generateDocument, downloadDocument, resetDocument, delDocument };
}