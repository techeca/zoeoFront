import { useState, useEffect } from "react";
import DatosIdentificacion from "./DatosIdentificacion";
import DocumentosProcReval from "./DocumentosProcReval";
import EvaluacionApoyos from "./EvaluacionApoy";
import RevaluacionEspec from "./RevaluacionEspec";
import SintesisRevalDiag from "./SintesisRevalDiag";
import { useDocument } from "../../contexts/DocumentContext";

export default function TEA({ profesional }) {
    const [section, setSection] = useState(1);
    const { state, documentSelected } = useDocument();
    const [showScrollTopButton, setShowScrollTopButton] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    function changeSection(n) {
        setSection(n)
    }

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > document.documentElement.scrollHeight * 0.1) {
                //setShowScrollTopButton(true);  // Aparece el botón si el scroll está más del 30%
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [showScrollTopButton]); // Dependencia de `showScrollTopButton`

    return (
        <div className={`flex pb-6`}>
            <div className={`hidden md:block mr-3 bg-gray-3 p-3 h-[290px] rounded-md border-[0px] border-gray-50/10 sticky top-20`}>
                <div className="menu-section w-[200px]">
                    <ul className="menu-items">
                        <li className={`${section == 1 && `bg-gray-2`} hover:bg-gray-2 menu-item`} onClick={() => changeSection(1)}>Datos de Identificación</li>
                        <li className={`${section == 2 && `bg-gray-2`} hover:bg-gray-2 menu-item`} onClick={() => changeSection(2)}>Sintesis de la Revaluación Diagnóstica</li>
                        <li className={`${section == 3 && `bg-gray-2`} hover:bg-gray-2 menu-item`} onClick={() => changeSection(3)}>Documentos del Proceso de Revaluación</li>
                        <li className={`${section == 4 && `bg-gray-2`} hover:bg-gray-2 menu-item`} onClick={() => changeSection(4)}>Revaluación Específica o Especializada</li>
                        <li className={`${section == 5 && `bg-gray-2`} hover:bg-gray-2 menu-item`} onClick={() => changeSection(5)}>Evaluación de los Apoyos</li>
                    </ul>
                </div>
            </div>
            <div>
                {   /*<div className="hidden lg:w-[1024px] md:w-[720px] w-[480px]">
                        <div onClick={() => changeSection(1)} className={`${section == 1 ? `bg-gray-6` : `bg-gray-3`} px-2 truncate mb-[-1px] ml-[3px] border-[1px] border-gray-50/10 rounded-tl-md rounded-tr-md text-center text-lg font-bold cursor-pointer`}>
                            Datos de Identificación
                        </div>
                        <div onClick={() => changeSection(2)} className={`${section == 2 ? `bg-gray-6` : `bg-gray-3`} px-2 truncate mb-[-1px] ml-[3px] border-[1px] border-gray-50/10 rounded-tl-md rounded-tr-md text-center text-lg font-bold cursor-pointer`}>
                            Sintesis de la Revaluación Diagnóstica
                        </div>
                        <div onClick={() => changeSection(3)} className={`${section == 3 ? `bg-gray-6` : `bg-gray-3`} px-2 truncate mb-[-1px] ml-[3px] border-[1px] border-gray-50/10 rounded-tl-md rounded-tr-md text-center text-lg font-bold cursor-pointer`}>
                            Documentos del Proceso de Revaluación
                        </div>
                        <div onClick={() => changeSection(4)} className={`${section == 4 ? `bg-gray-6` : `bg-gray-3`} px-2 truncate mb-[-1px] ml-[3px] border-[1px] border-gray-50/10 rounded-tl-md rounded-tr-md text-center text-lg font-bold cursor-pointer`}>
                            Revaluación específica o especializada
                        </div>
                        <div onClick={() => changeSection(5)} className={`${section == 5 ? `bg-gray-6` : `bg-gray-3`} px-2 truncate mb-[-1px] ml-[3px] border-[1px] border-gray-50/10 rounded-tl-md rounded-tr-md text-center text-lg font-bold cursor-pointer`}>
                            Evaluación de los Apoyos
                        </div>
                    </div>*/    }
                <div className={`animate-fadeInDocument xl:w-[990px] lg:w-[750px] md:w-[490px] w-[480px] p-6 bg-gray-3 rounded-md border-[0px] border-gray-50/10`}>
                    <>
                        {section == 1 && <DatosIdentificacion profesional={profesional} />
                        }
                        {section == 2 && <SintesisRevalDiag />
                        }
                        {section == 3 && <DocumentosProcReval />
                        }
                        {section == 4 && <RevaluacionEspec />
                        }
                        {section == 5 && <EvaluacionApoyos />
                        }
                    </>
                </div>
            </div>
            <button
                onClick={scrollToTop}
                className={`fixed bottom-4 left-4 p-2 m-3 bg-gray-1 btn btn-circle transition-opacity duration-300 z-40
                ${isVisible ? 'opacity-100' : 'opacity-0'} `}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="size-6"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m19 12l-7-7l-7 7m7-7v14"></path></svg>
            </button>
        </div>
    )
}