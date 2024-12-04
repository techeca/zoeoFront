import { useEffect, useState } from "react"
import { getAllProfesional } from "../../utils/requests"

export default function Team() {
    const [profs, setProfs] = useState(false)

    async function getPros() {
        const { pros } = await getAllProfesional()
        setProfs(pros);
    }

    useEffect(() => {
        getPros();
    }, [])

    return (
        <div className="w-full p-6">
            <div className="text-2xl font-semibold">Team</div>
            <div className="flex justify-center flex-wrap gap-3">
                {profs && profs.map((pro) => (
                    <div key={pro._id} className="card rounded-md w-[480px] cursor-pointer hover:opacity-100 opacity-80 transition-opacity duration-300 ease-in-out">
                        <div className="m-3 p-1">
                            <div className="flex justify-between">
                                <div className={`bg-gray-2 w-20 h-20 rounded-md`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-20 opacity-10" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M7.39 16.539a8 8 0 1 1 9.221 0l2.083 4.76a.5.5 0 0 1-.459.701H5.765a.5.5 0 0 1-.459-.7zm6.735-.693l1.332-.941a6 6 0 1 0-6.913 0l1.331.941L8.058 20h7.884zM8.119 10.97l1.94-.485a2 2 0 0 0 3.882 0l1.94.485a4.002 4.002 0 0 1-7.762 0"></path></svg>
                                </div>
                                <div>
                                    <div className="text-xs bg-gray-2 p-1 rounded-md px-2">
                                        {pro._id}
                                    </div>
                                    <p className="text-right font-semibold text-sm mt-1 mr-1">

                                    </p>
                                </div>
                            </div>
                            <div className="bg-gray-2 p-3 rounded-md mt-2.5 flex flex-col gap-3">
                                <p className=""><span className="font-semibold"></span><span className="w-full badge rounded-md text-gray-100/70">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="size-4 mr-1"><g fill="none" stroke="currentColor"><path strokeLinejoin="round" d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"></path><circle cx={12} cy={7} r={3}></circle></g></svg>
                                    Nombre: <span className="ml-1 font-normal">{pro.username}</span></span></p>
                                <p className=""><span className="font-semibold"></span><span className="w-full badge rounded-md text-gray-100/70 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="size-4 mr-1"><g fill="none"><path fill="currentColor" d="M3 5v-.5a.5.5 0 0 0-.5.5zm18 0h.5a.5.5 0 0 0-.5-.5zM3 5.5h18v-1H3zM20.5 5v12h1V5zM19 18.5H5v1h14zM3.5 17V5h-1v12zM5 18.5A1.5 1.5 0 0 1 3.5 17h-1A2.5 2.5 0 0 0 5 19.5zM20.5 17a1.5 1.5 0 0 1-1.5 1.5v1a2.5 2.5 0 0 0 2.5-2.5z"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m3 5l9 9l9-9"></path></g></svg>
                                    Correo: <span className="ml-1 font-normal">{pro.email}</span></span>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}