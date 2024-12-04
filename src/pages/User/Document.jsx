import useDocumentAction from "../../hooks/useDocumentAction";
import { useDocument } from "../../contexts/DocumentContext";
import { useEffect, useState } from "react";
import TEA from "../../components/TEA";
import ModalCode from "../../components/ModalCode";
import { useLoaderData, useNavigate } from "react-router-dom";

export default function Document() {
    const { document, resetDocument, setDocumentSelected } = useDocument();
    const { downloadDocument } = useDocumentAction();
    const navigate = useNavigate();
    const [data, setData] = useState({
        otros: []
    });
    const documentFromID = useLoaderData();

    const handleBack = () => {
        resetDocument();
        navigate('/panel');
    }

    useEffect(() => {
        if(documentFromID){
            //console.log(documentFromID);
            setDocumentSelected(documentFromID)
        }
    }, [])

    return (
        document && <div className='pt-9'>
            {/* Document Display Section */}
            {<div className="flex flex-col gap-3 pt-3">
                <div className='flex gap-3 items-center flex-row xl:ml-[237px] lg:ml-[237px] md:ml-[237px] ml-[200px]'>
                    <span className="badge badge-md badge-flat-primary rounded-md py-2 text-xs px-3 select-none">{document.nombreDocumento}</span>
                    <button className="btn btn-sm btn-solid-success" onClick={() => downloadDocument()}>
                        <svg xmlns="http://www.w3.org/2000/svg" className='size-4' width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m7 12l5 5m0 0l5-5m-5 5V4M6 20h12"></path></svg>
                        <span className={`ml-1 lg:block md:hidden sm:hidden hidden`}>
                            Descargar Documento
                        </span>
                    </button>
                    <label className="btn btn-sm btn-solid-error" htmlFor="modal-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className='size-4' width="1em" height="1em" viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M14 11v6m-4-6v6M6 7v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7M4 7h16M7 7l2-4h6l2 4"></path></svg>
                        <span className={`ml-1 lg:block md:hidden sm:hidden hidden`}>
                            Eliminar
                        </span>
                    </label>
                    <span className="tooltip tooltip-top ml-auto" data-tooltip="Volver">
                        <button className="btn btn-sm hover:bg-gray-4 bg-gray-1" onClick={handleBack}>
                            <svg xmlns="http://www.w3.org/2000/svg" className='size-5' width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m12 5l-7 7m0 0l7 7m-7-7h14"></path></svg>
                        </button>
                    </span>
                </div>

                <TEA profesional={data?.profesional} />

                <ModalCode />
            </div>}
        </div>
    )
}