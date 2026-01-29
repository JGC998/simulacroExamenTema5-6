'use client'
import { useRef } from 'react'
// https://medium.com/@bomber.marek/how-to-use-dialog-in-react-easy-modals-tooltips-81e44d570c8a



const Modal = ({ children, openElement }) => {
    const dialogRef = useRef(null);

    const openDialog = () => dialogRef.current?.showModal()

    const closeDialog = () => dialogRef.current?.close()

    const handleClickOutside = (e) => {
        if (dialogRef.current) {
            const rect = dialogRef.current.getBoundingClientRect();
            const isInDialog = (rect.top <= e.clientY
                && e.clientY <= rect.top + rect.height
                && rect.left <= e.clientX
                && e.clientX <= rect.left + rect.width);
            if (!isInDialog) {
                dialogRef.current.close();
            }
        }
    }


    return (
        <>
            <div onClick={openDialog} className='w-fit inline-block'>
                {openElement}
            </div>

            <dialog
                ref={dialogRef}
                onMouseDown={handleClickOutside}
                className="m-auto backdrop:bg-slate-900/60 backdrop:backdrop-blur-sm w-[95%] md:w-[60%] lg:w-[40%] p-0 rounded-2xl shadow-2xl bg-transparent text-slate-800 dark:text-slate-100 open:animate-in open:fade-in open:zoom-in-95 open:duration-300 relative"
            >
                <div className="bg-white/95 dark:bg-slate-900/95 p-8 w-full h-full rounded-2xl border border-slate-200 dark:border-slate-800">
                    <button
                        onClick={closeDialog}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 hover:text-red-500"
                        title="Cerrar"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>
                    {children}
                </div>
            </dialog>


        </>
    );
};

export default Modal;