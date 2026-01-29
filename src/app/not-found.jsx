

import Link from "next/link"

function PaginaNoEncontrada() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
            <h1 className="text-9xl font-extrabold text-blue-100 dark:text-slate-800 tracking-widest relative">
                404
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-blue-600 dark:text-blue-400">
                    Hospital
                </span>
            </h1>
            <div className="mt-4 flex flex-col items-center">
                <p className="text-2xl font-semibold text-slate-700 dark:text-slate-300 md:text-3xl">
                    Página no encontrada
                </p>
                <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-md">
                    Lo sentimos, la página que buscas no existe o ha sido movida.
                </p>
                <Link
                    href="/"
                    className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all font-medium hover:shadow-lg active:scale-95"
                >
                    Volver al Inicio
                </Link>
            </div>
        </div>
    )
}

export default PaginaNoEncontrada