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
        if (documentFromID) {
            //console.log(documentFromID);
            setDocumentSelected(documentFromID)
        }
    }, [])

    return (
        <div className='pt-9'>
            {document ?
                <div className="flex flex-col gap-3 pt-3">
                    <div className='flex gap-3 items-center flex-row xl:ml-[237px] lg:ml-[237px] md:ml-[237px] ml-[200px]'>
                        <span className="badge badge-md badge-flat-primary rounded-md py-2 text-xs px-3 select-none">{document.nombreDocumento}</span>
                        <button className="btn btn-sm btn-solid-success" onClick={() => downloadDocument()}>
                            <svg xmlns="http://www.w3.org/2000/svg" className='size-4' width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m7 12l5 5m0 0l5-5m-5 5V4M6 20h12"></path></svg>
                            <span className={`ml-1 lg:block md:hidden sm:hidden hidden`}>
                                Descargar Documento
                            </span>
                        </button>
                        <div className="btn btn-sm btn-solid-error" htmlFor="modal-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className='size-4' width="1em" height="1em" viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M14 11v6m-4-6v6M6 7v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7M4 7h16M7 7l2-4h6l2 4"></path></svg>
                            <span className={`ml-1 lg:block md:hidden sm:hidden hidden`}>
                                Eliminar
                            </span>
                        </div>
                        <span className="tooltip tooltip-top ml-auto" data-tooltip="Volver">
                            <button className="btn btn-sm hover:bg-gray-4 bg-gray-1" onClick={handleBack}>
                                <svg xmlns="http://www.w3.org/2000/svg" className='size-5' width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m12 5l-7 7m0 0l7 7m-7-7h14"></path></svg>
                            </button>
                        </span>
                    </div>
                    <TEA profesional={data?.profesional} />
                    <ModalCode />
                </div>
                :
                <div className="flex flex-col gap-3 pt-3">
                    <div className='flex gap-3 items-center flex-row xl:ml-[237px] lg:ml-[237px] md:ml-[237px] ml-[200px]'>
                        <span className="badge badge-md badge-flat-primary rounded-md py-2 text-xs px-3 select-none w-52 skeleton h-8"
                            style={{'--gray-9': '16, 42, 76', '--gray-7': '38, 81, 123'}}></span>
                        <button className="btn btn-sm btn-solid-success skeleton lg:w-48 md:w-8 sm:w-8 w-8" style={{'--gray-9': '17, 49, 35', '--gray-7': '76, 195, 138'}}></button>
                        <div className="btn btn-sm btn-solid-error lg:w-36 md:w-8 sm:w-8 w-8 skeleton" style={{'--gray-9': '72, 26, 29', '--gray-7': '255, 99, 105'}}></div>
                        <span className="tooltip tooltip-top ml-auto" data-tooltip="Volver">
                            <button className="btn btn-sm hover:bg-gray-4 bg-gray-1" onClick={handleBack}>
                                <svg xmlns="http://www.w3.org/2000/svg" className='size-5' width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m12 5l-7 7m0 0l7 7m-7-7h14"></path></svg>
                            </button>
                        </span>
                    </div>
                    <div className={`flex pb-6`}>
                        <div className={`hidden md:block mr-3 bg-gray-3 p-3 h-[210px] rounded-md border-[0px] border-gray-50/10 sticky top-20`}>
                            <div className="menu-section w-[200px]">
                                <ul className="menu-items">
                                    <li className={`hover:bg-gray-2 menu-item skeleton h-8`}></li>
                                    <li className={`hover:bg-gray-2 menu-item skeleton h-8`}></li>
                                    <li className={`hover:bg-gray-2 menu-item skeleton h-8`}></li>
                                    <li className={`hover:bg-gray-2 menu-item skeleton h-8`}></li>
                                    <li className={`hover:bg-gray-2 menu-item skeleton h-8`}></li>
                                </ul>
                            </div>
                        </div>
                        <div className={`animate-fadeInDocument xl:w-[990px] lg:w-[750px] md:w-[490px] w-[480px] p-6 bg-gray-3 rounded-md border-[0px] border-gray-50/10`}>
                            <div className="min-h-0">
                                <div className="text-lg font-bold skeleton w-28 h-6"></div>
                                <div className="space-y-4 mt-2 mb-6 px-0">
                                    <div className="w-full">
                                        <div className="relative">
                                            {/*icono de usuario editando campo*/}
                                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-[-9px]"></div>
                                            <input className={`skeleton bg-gray-2 border-gray-3 border-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none pl-3 max-w-full placeholder:text-gray-9 uppercase transition-colors duration-300`} maxLength={28} type="text" id="nombreCompleto" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <input className="skeleton bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none pl-3 placeholder:text-gray-9" maxLength={10} type="text" id="fechaNacimiento" />
                                        </div>
                                        <div>
                                            <input className="skeleton bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none pl-3 placeholder:text-gray-9 uppercase" maxLength={8} type="text" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <input className="skeleton bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none pl-3 placeholder:text-gray-9" type="text" maxLength={9} />
                                        </div>
                                        <div>
                                            <input className="skeleton bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none pl-3 placeholder:text-gray-9 uppercase" maxLength={11} type="text" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div className="flex flex-col gap-3 items-center">
                                            <div className="self-start font-semibold skeleton w-28 h-6" htmlFor="group1"></div>
                                            <div className='flex gap-3 w-full'>
                                                <div className="flex text-sm cursor-pointer gap-2">
                                                    <span className="skeleton w-24 h-5"></span>
                                                </div>
                                                <div className="flex text-sm cursor-pointer gap-2">
                                                    <span className="skeleton w-10 h-5"></span>
                                                </div>
                                            </div>
                                            <div className='flex items-center gap-3 w-full'>
                                                <div className="flex text-sm cursor-pointer items-center gap-2">
                                                    <span className="skeleton w-10 h-8"></span>
                                                </div>
                                                <input className="skeleton bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 pl-3 uppercase" placeholder="" maxLength={11} type="text" />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-3 items-center">
                                            <div className="self-start font-semibold skeleton w-28 h-6"></div>
                                            <div className='flex gap-3 w-full'>
                                                <div className="flex text-sm cursor-pointer gap-2">
                                                    <span className="skeleton w-10 h-5"></span>
                                                </div>
                                                <div className="flex text-sm cursor-pointer gap-2">
                                                    <span className="skeleton w-24 h-5"></span>
                                                </div>
                                            </div>
                                            <div className='flex text-sm items-center gap-3 w-full'>
                                                <div className="flex cursor-pointer items-center gap-2">
                                                    <span className="skeleton w-10 h-8"></span>
                                                </div>
                                                <input className="skeleton bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 pl-3 uppercase" placeholder="" maxLength={11} type="text" />
                                            </div>

                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <input className="skeleton bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none pl-3 placeholder:text-gray-9 uppercase" maxLength={26} type="text" />
                                        </div>

                                        <div>
                                            <input className="skeleton bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none pl-3 capitalize placeholder:text-gray-9" type="text" maxLength={9} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <input className="skeleton bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none pl-3 uppercase placeholder:text-gray-9" type="text" maxLength={23} />
                                        </div>
                                    </div>
                                </div>

                                <div className="divider"></div>

                                <div className="text-lg font-bold skeleton w-28 h-6"></div>
                                <div className="space-y-4 mt-2">
                                    <div className="w-full">
                                        <input className="skeleton bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 max-w-full uppercase" maxLength={61} type="text" />
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <input className="skeleton bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9" maxLength={9} type="text" />
                                        </div>

                                        <div>
                                            <input className="skeleton bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 capitalize" maxLength={40} type="text" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>

                                            <input className="skeleton bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9 capitalize" type="text" maxLength={30} />
                                        </div>

                                        <div>

                                            <input className="skeleton bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9" maxLength={11} type="text" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>

                                            <input className="skeleton bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9" maxLength={60} type="text" />
                                        </div>

                                        <div>

                                            <input className="skeleton bg-gray-2 w-full text-sm rounded-md p-2 hover:bg-gray-1 focus:bg-gray-1 outline-none placeholder:text-gray-9" type="text" maxLength={10} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
        </div>
    )
}