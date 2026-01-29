'use client'
import { useActionState, useEffect, useId } from "react"
import { toast } from "sonner"

export default function Form({ action, medicina, disabled = false, textSubmit = "Enviar" }) {
    const formId = useId()
    const [state, faction, isPending] = useActionState(action, {})

    useEffect(() => {
        if (state.success) {
            toast.success(state.success)
            document.getElementById(formId).closest('dialog').close()
        }
        if (state.error) {
            toast.error(state.error)
        }
    }, [state])

    return (
        <form id={formId} action={faction} className="flex flex-col gap-4 bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
            <input type="hidden" name="id" value={medicina?.id} />
            <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre de la medicina"
                    defaultValue={medicina?.nombre}
                    disabled={disabled}
                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-50"
                />
            </div>
            <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Vía de administración</label>
                <input
                    type="text"
                    name="via"
                    placeholder="Ej: Oral, Intravenosa"
                    defaultValue={medicina?.via}
                    disabled={disabled}
                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-50"
                />
            </div>
            <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Observaciones</label>
                <input
                    type="text"
                    name="observaciones"
                    placeholder="Efectos secundarios, dosis..."
                    defaultValue={medicina?.observaciones}
                    disabled={disabled}
                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-50"
                />
            </div>
            <button
                type="submit"
                className="mt-4 bg-blue-600 text-white font-medium p-2.5 rounded-lg hover:bg-blue-700 hover:shadow-md active:scale-95 transition-all disabled:bg-blue-400 disabled:cursor-not-allowed flex justify-center"
                disabled={isPending}
            >
                {isPending ? 'Procesando...' : textSubmit}
            </button>
        </form>
    )
}



