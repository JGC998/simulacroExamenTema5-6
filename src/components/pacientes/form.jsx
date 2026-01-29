
'use client'
import { RefreshCwIcon } from "lucide-react"
import { useActionState, useId, useEffect } from "react"
import { toast } from "sonner"



export default function Form({ action, paciente, plantasIdNombre, medicinasIdNombre, disabled = false, textSubmit = "Enviar" }) {
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
        <form id={formId} action={faction} className="flex flex-col gap-4 bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800" >
            <input type="hidden" name="id" value={paciente?.id} />

            <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre completo"
                    defaultValue={paciente?.nombre}
                    disabled={disabled}
                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-50"
                />
            </div>

            <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Foto (URL)</label>
                <input
                    type="text"
                    name="foto"
                    placeholder="https://..."
                    defaultValue={paciente?.foto}
                    disabled={disabled}
                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-50"
                />
            </div>

            <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Tutor Legal</label>
                <input
                    type="text"
                    name="tutor_legal"
                    placeholder="Nombre del tutor"
                    defaultValue={paciente?.tutor_legal}
                    disabled={disabled}
                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-50"
                />
            </div>

            <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Fecha de Nacimiento</label>
                <input
                    type="date"
                    name="fecha_nacimiento"
                    defaultValue={paciente?.fecha_nacimiento?.toISOString().split('T')[0] || '2000-01-01'}
                    disabled={disabled}
                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-50"
                />
            </div>


            {/* Select */}
            <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Planta</label>
                {disabled
                    ? <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">{paciente?.planta?.nombre || 'Sin asignar'}</div>
                    : <select className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        name="plantaId"
                        key={paciente?.plantaId}
                        defaultValue={paciente?.plantaId}
                        disabled={disabled}
                    >
                        <option value="">Seleccionar planta</option>
                        {plantasIdNombre.map((planta) => (
                            <option value={planta.id} key={planta.id}>
                                {planta.nombre}
                            </option>
                        ))}
                    </select>
                }
            </div>

            {/* Checkbox */}
            <div className="space-y-2 pt-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block">Medicinas</label>
                {disabled
                    ? <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm">{paciente?.medicinas?.length > 0 ? paciente?.medicinas?.map(a => a.nombre).join(', ') : 'Ninguna'}</div>
                    : <div className="p-4 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 max-h-40 overflow-y-auto space-y-2">
                        {medicinasIdNombre?.map((medicina) => (
                            <label key={medicina.id} className='flex items-center gap-3 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 p-1 rounded transition-colors'>
                                <input
                                    type='checkbox'
                                    name={medicina.id}
                                    value={medicina.id}
                                    defaultChecked={paciente?.medicinas?.some(a => a.id == medicina.id)}
                                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                />
                                <span className="text-sm">{medicina.nombre}</span>
                            </label>
                        ))}
                    </div>
                }
            </div>


            <button
                type="submit"
                className="mt-4 flex justify-center items-center bg-blue-600 text-white font-medium p-2.5 rounded-lg hover:bg-blue-700 hover:shadow-md active:scale-95 transition-all disabled:bg-blue-400 disabled:cursor-not-allowed"
                disabled={isPending}
            >
                {isPending
                    ? <RefreshCwIcon size={20} className="animate-spin" />
                    : textSubmit
                }
            </button>
        </form >
    )
}



