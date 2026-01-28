import BackButton from '@/components/back-button'
import { obtenerMedicina } from '@/lib/data'
import { Suspense, use } from 'react'


async function PaginaMedicina({ params }) {
    const { id } = await params

    const promesaMedicina = obtenerMedicina(id) // Promesa, no usamos AWAIT

    return (
        <div>
            <BackButton className="cursor-pointer hover:text-blue-600">
                <h1 className='text-4xl'>Medicina</h1>
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
        <div className='p-4 md:p-8 border border-blue-400'>
            <p>{medicina.nombre}</p>
            <p>{medicina.profesor}</p>
            <p>{medicina.horas_semana}</p>
        </div>
    )
}