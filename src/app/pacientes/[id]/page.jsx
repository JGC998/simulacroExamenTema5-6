import BackButton from '@/components/back-button'
import { obtenerPaciente } from '@/lib/data'
import { Suspense, use } from 'react'


async function PaginaPaciente({ params }) {
    const { id } = await params

    const promesaPaciente = obtenerPaciente(id) // Promesa, no usamos AWAIT

    return (
        <div>
            <BackButton className="cursor-pointer hover:text-blue-600 transition-colors mb-6 inline-flex items-center gap-2">
                <span className="text-4xl font-extrabold text-blue-950 dark:text-blue-50">Paciente</span>
            </BackButton>

            <Suspense fallback={<p className='text-2xl text-blue-400'>Cargando...</p>}>
                <Paciente promesaPaciente={promesaPaciente} />
            </Suspense>

        </div>
    )
}

export default PaginaPaciente





function Paciente({ promesaPaciente }) {
    const paciente = use(promesaPaciente)

    return (
        <div className="flex flex-col gap-8">
            <div className='p-8 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col md:flex-row gap-8 items-start'>
                <img
                    src={paciente.foto || '/images/foto_00.webp'}
                    alt={`Foto de ${paciente.nombre}`}
                    className='w-full md:w-48 h-48 object-cover rounded-2xl shadow-md border-4 border-white dark:border-slate-800'
                />
                <div className="flex-1 space-y-4">
                    <h2 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">{paciente.nombre}</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                            <p className="text-xs font-bold text-slate-400 uppercase mb-1">Tutor Legal</p>
                            <p className="font-medium text-slate-700 dark:text-slate-200">{paciente.tutor_legal || 'No asignado'}</p>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                            <p className="text-xs font-bold text-slate-400 uppercase mb-1">Fecha Nacimiento</p>
                            <p className="font-medium text-slate-700 dark:text-slate-200">{new Date(paciente.fecha_nacimiento).toLocaleDateString()}</p>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 sm:col-span-2">
                            <p className="text-xs font-bold text-slate-400 uppercase mb-1">Planta Asignada</p>
                            <p className="font-medium text-blue-600 dark:text-blue-400 text-lg">
                                {paciente?.planta?.nombre ? `🏥 ${paciente.planta.nombre}` : 'Sin asignar'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {paciente.medicinas && paciente.medicinas.length > 0 && (
                <div className='p-8 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-lg'>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                        💊 Medicinas Prescritas
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {paciente.medicinas.map(medicina => (
                            <span key={medicina.id} className="px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-medium text-sm flex items-center gap-2">
                                {medicina.nombre}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}