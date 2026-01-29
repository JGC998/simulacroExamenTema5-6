import BackButton from '@/components/back-button'
import { obtenerMedicina } from '@/lib/data'
import { Suspense, use } from 'react'


async function PaginaMedicina({ params }) {
    const { id } = await params

    const promesaMedicina = obtenerMedicina(id) // Promesa, no usamos AWAIT

    return (
        <div>
            <BackButton className="cursor-pointer hover:text-blue-600 transition-colors mb-6 inline-flex items-center gap-2">
                <span className="text-4xl font-extrabold text-blue-950 dark:text-blue-50">Medicina</span>
            </BackButton>

            <Suspense fallback={<p className='text-2xl text-blue-400'>Cargando...</p>}>
                <Medicina promesaMedicina={promesaMedicina} />
            </Suspense>

        </div>
    )
}

export default PaginaMedicina





function Medicina({ promesaMedicina }) {
    const medicina = use(promesaMedicina)

    return (
        <div className="flex flex-col gap-6">
            <div className='p-8 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-xl'>
                <h2 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mb-4">{medicina.nombre}</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Vía de Administración</p>
                        <p className="text-xl font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700 inline-block">
                            💊 {medicina.via || 'No especificada'}
                        </p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Observaciones</p>
                        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/30 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                            {medicina.observaciones || 'Sin observaciones.'}
                        </p>
                    </div>
                </div>
            </div>

            {medicina.pacientes && medicina.pacientes.length > 0 && (
                <div className='p-8 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-lg'>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                        👥 Pacientes Asignados
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {medicina.pacientes.map(paciente => (
                            <li key={paciente.id} className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                <span className="text-slate-700 dark:text-slate-200 font-medium">{paciente.nombre}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}