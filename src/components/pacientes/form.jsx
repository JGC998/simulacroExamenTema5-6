
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
        <form id={formId} action={faction} className="flex flex-col gap-2 border p-4 border-blue-400" >
            <input type="hidden" name="id" value={paciente?.id} />
            <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                defaultValue={paciente?.nombre}
                disabled={disabled}
            />
            <input
                type="text"
                name="foto"
                placeholder="Foto"
                defaultValue={paciente?.foto}
                disabled={disabled}
            />
            <input
                type="text"
                name="tutor_legal"
                placeholder="Tutor legal"
                defaultValue={paciente?.tutor_legal}
                disabled={disabled}
            />
            <input
                type="date"
                name="fecha_nacimiento"
                placeholder="Fecha de nacimiento"
                defaultValue={paciente?.fecha_nacimiento?.toISOString().split('T')[0] || '2000-01-01'}
                disabled={disabled}
            />


            {/* Select */}
            {disabled
                ? <p>Planta: {paciente?.planta?.nombre}</p>
                : <details>
                    <summary>Planta ({paciente?.planta?.nombre})</summary>
                    <select className="w-full p-2 border border-blue-400 rounded-md"
                        name="plantaId"
                        key={paciente?.plantaId}
                        defaultValue={paciente?.plantaId}
                        size={4}
                        disabled={disabled}
                    >
                        <option value="">Seleccionar planta</option>
                        {plantasIdNombre.map((planta) => (
                            <option value={planta.id} key={planta.id}>
                                {planta.nombre}
                            </option>
                        ))}
                    </select>
                </details>
            }


            {/* Radio */}
            {/* {disabled
                ? <p>Planta: {paciente?.planta?.nombre}</p>
                : <details>
                    <summary>Planta ({paciente?.planta?.nombre})</summary>
                    {plantasIdNombre?.map((planta) => <div key={planta.id}>
                        {paciente?.planta?.id == planta.id
                            ? <input key={`radio-${planta.id}`} type='radio' name='plantaId' value={planta.id} defaultChecked />
                            : <input type='radio' name='plantaId' value={planta.id} />
                        }
                        {planta.nombre}
                    </div>)}
                </details>
            } */}


            {/* Checkbox */}
            {disabled
                ? <p>Medicinas: {paciente?.medicinas?.map(a => a.nombre).join(', ')}</p>
                : <details>
                    <summary>Medicinas ({paciente?.medicinas?.map(a => a.nombre).join(', ')})</summary>

                    {medicinasIdNombre?.map((medicina) => (
                        <label key={medicina.id} className='block'>
                            <input
                                type='checkbox'
                                name={medicina.id}
                                value={medicina.id}
                                defaultChecked={paciente?.medicinas?.some(a => a.id == medicina.id)}
                            />

                            {medicina.nombre}
                        </label>
                    ))}
                </details>
            }


            <button
                type="submit"
                className="flex justify-center items-center bg-blue-500 text-white p-2 rounded-md hover:cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed"
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



