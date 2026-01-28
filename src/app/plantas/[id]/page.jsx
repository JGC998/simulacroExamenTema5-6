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
        <div className='p-4 md:p-8 border border-blue-400'>
            <p>{planta.nombre}</p>
            <p>{planta.tutor}</p>
            <p>{planta.aula}</p>
        </div>
    )
}