import { useRef } from "react";

export default function Profile() {
    const fileInputRef = useRef(null);

    function handlSelectPic() {
        fileInputRef.current.click();
    }

    return (
        <div className="h-full justify-center items-center">
            <div className="card p-4 mt-6 ">
                <div className="card-header mx-auto">Foto de Perfil</div>
                <div className="card-body">
                    <div>
                        <input type="file" className="hidden" ref={fileInputRef} onChange={(e) => e.target.files[0]} />
                        <div onClick={handlSelectPic} className="h-24 w-24 flex items-center justify-center bg-gray-2 opacity-70 rounded-lg cursor-pointer hover:bg-gray-2 hover:opacity-100 transition-opacity duration-150 ease-in">
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-14 opacity-80" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinejoin="round"><path d="M3 5h18v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><circle cx={12} cy={12} r={3} strokeLinecap="round"></circle><path strokeLinecap="round" d="M17 2h2"></path></g></svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card p-4 mt-6 ">
                <div className="card-header mx-auto">Preview</div>
                <div className="card-body">
                    <div>
                        <div className="h-24 w-24 rounded-full flex items-center justify-center bg-gray-2 opacity-70 cursor-pointer hover:bg-gray-2 hover:opacity-100 transition-opacity duration-150 ease-in">
                            <img src="https://i.pravatar.cc/150?img=30" className="rounded-full" alt="avatar" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}