import { useState, useEffect } from "react";
import { useDocument } from "../../contexts/DocumentContext";
import { getAllDocuments } from "../../utils/requests";
import DocumentDrawer from "../../components/DocumentDrawer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Panel() {
    const [allDocuments, setAllDocuments] = useState(false);
    const { user } = useAuth();
    const { document, setDocumentSelected } = useDocument();
    const navigate = useNavigate();

    async function getDocuments() {
        const response = await getAllDocuments();
        setAllDocuments(response);
    }

    async function handleDocumentClick(documentId) {
        setDocumentSelected(documentId);
        navigate(`/document/${documentId}`);
    };

    useEffect(() => {
        user && getDocuments();
    }, [document, user])


    return (
        <div className="w-full">
            <div className={`opacity-100 flex flex-wrap w-full justify-center select-none pt-6 transition-all duration-300 ease-in-out`}>
                <label htmlFor="drawer-right" className="hover:scale-[102%] self-start border-dashed flex justify-center h-[215px] items-center border-4 border-border card rounded-md m-3 p-4 cursor-pointer bg-gray-2 hover:opacity-100 opacity-80 transition-all duration-300 ease-in-out">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="size-12 mb-3"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-6-6h12"></path></svg>
                </label>
                {allDocuments ? allDocuments.map((document) => (
                    <div key={document._id}
                        onClick={() => handleDocumentClick(document._id)}
                        className="opacity-80 animate-fadeInCard card rounded-md m-3 p-4 cursor-pointer hover:bg-gray-4">
                        <div className="flex justify-between">
                            <div className={`bg-gray-2 w-20 h-20 rounded-md`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-20 opacity-10" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M7.39 16.539a8 8 0 1 1 9.221 0l2.083 4.76a.5.5 0 0 1-.459.701H5.765a.5.5 0 0 1-.459-.7zm6.735-.693l1.332-.941a6 6 0 1 0-6.913 0l1.331.941L8.058 20h7.884zM8.119 10.97l1.94-.485a2 2 0 0 0 3.882 0l1.94.485a4.002 4.002 0 0 1-7.762 0"></path></svg>
                            </div>
                            <div>
                                <div className="text-xs bg-gray-2 p-1 rounded-md px-2 font-mono">
                                    {document._id}
                                </div>
                                <p className="text-right font-mono text-sm mt-1 mr-1">
                                    {document.datosIdentificacion?.edad && <span className="bg-gray-2 p-1 text-xs rounded-md">{document.datosIdentificacion.edad}</span>}
                                </p>
                            </div>
                        </div>
                        <div className="bg-gray-2 p-3 rounded-md mt-2 flex flex-col gap-2">
                            <p className="">
                                <span className="w-full badge badge-flat-primary font-semibold rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 mr-1" width="1em" height="1em" viewBox="0 0 24 24" strokeWidth={2}><g fill="none" stroke="currentColor" strokeLinejoin="round"><path strokeLinecap="round" d="M7 21a2 2 0 0 1-2-2V3h9l5 5v11a2 2 0 0 1-2 2z"></path><path d="M13 3v6h6"></path><path strokeLinecap="round" d="M9 13h6m-6 4h6"></path></g></svg>
                                    Documento: <span className="ml-1 font-normal">{document.nombreDocumento}</span>
                                </span>
                            </p>
                            <p className="">
                                <span className="w-full badge text-gray-100/70 font-semibold rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="size-4 mr-1" strokeWidth={2}><g fill="none" stroke="currentColor"><path strokeLinejoin="round" d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"></path><circle cx={12} cy={7} r={3}></circle></g></svg>
                                    Nombre: {document.datosIdentificacion.nombreCompleto ? <i className="ml-1 font-normal capitalize">{document.datosIdentificacion.nombreCompleto}</i> : <i className="ml-1 font-normal">Sin nombre</i>}
                                </span>
                            </p>
                        </div>
                    </div>
                ))
                    :
                    Array(3).fill().map((_, index) => (
                        <div key={index} className="opacity-80 animate-fadeInCard card rounded-md m-3 p-4 cursor-pointer hover:bg-gray-4">
                          <div className="flex justify-between">
                            <div className={`bg-gray-2 w-20 h-20 rounded-md`}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="size-20 opacity-10" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M7.39 16.539a8 8 0 1 1 9.221 0l2.083 4.76a.5.5 0 0 1-.459.701H5.765a.5.5 0 0 1-.459-.7zm6.735-.693l1.332-.941a6 6 0 1 0-6.913 0l1.331.941L8.058 20h7.884zM8.119 10.97l1.94-.485a2 2 0 0 0 3.882 0l1.94.485a4.002 4.002 0 0 1-7.762 0"></path>
                              </svg>
                            </div>
                            <div>
                              <div className="skeleton h-6 w-52 text-xs bg-gray-2 p-1 rounded-md px-2 font-mono"></div>
                              <p className="skeleton mt-1 w-6 ml-[184px] h-6 rounded-md"></p>
                            </div>
                          </div>
                          <div className="bg-gray-2 p-3 rounded-md mt-2 flex flex-col gap-2">
                            <p className="skeleton w-full badge text-gray-100/70 font-semibold rounded-md h-7"></p>
                            <p className="skeleton w-full badge text-gray-100/70 font-semibold rounded-md h-7"></p>
                          </div>
                        </div>
                      ))

            }
            </div>
            <DocumentDrawer />
        </div>
    )
}