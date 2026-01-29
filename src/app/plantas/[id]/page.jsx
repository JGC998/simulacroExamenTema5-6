import BackButton from '@/components/back-button'
import { obtenerPlanta } from '@/lib/data'
import { Suspense, use } from 'react'


async function PaginaPlanta({ params }) {
    const { id } = await params

    const promesaPlanta = obtenerPlanta(id) // Promesa, no usamos AWAIT

    return (
        <div>
            <BackButton className="cursor-pointer hover:text-blue-600">
                <h1 className='text-4xl'>Planta</h1>
            </BackButton>

            <Suspense fallback={<p className='text-2xl text-blue-400'>Cargando...</p>}>
                <Planta promesaPlanta={promesaPlanta} />
            </Suspense>

        </div>
    )
}

export default PaginaPlanta





function Planta({ promesaPlanta }) {
    const planta = use(promesaPlanta)

    return (
        <div className="flex flex-col gap-6">
            <div className='p-8 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-xl'>
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mb-2">{planta.nombre}</h2>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Información de la planta</p>
                    </div>
                    <div className="text-right">
                         <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-medium text-sm border border-green-200 dark:border-green-800">
                            🛏️ {planta.numero_camas} Camas
                        </span>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50">
                        <p className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-1">Jefe de Planta</p>
                        <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{planta.jefe_planta}</p>
                    </div>
                </div>
            </div>

             {planta.pacientes && planta.pacientes.length > 0 && (
                <div className='p-8 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-lg'>
                     <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                         👥 Pacientes Ingresados
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {planta.pacientes.map(paciente => (
                            <div key={paciente.id} className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xl">
                                    👤
                                </div>
                                <span className="font-semibold text-slate-700 dark:text-slate-200">{paciente.nombre}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}