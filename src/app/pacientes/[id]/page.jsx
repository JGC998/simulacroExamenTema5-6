import BackButton from '@/components/back-button'
import { obtenerPaciente } from '@/lib/data'
import { Suspense, use } from 'react'


async function PaginaPaciente({ params }) {
    const { id } = await params

    const promesaPaciente = obtenerPaciente(id) // Promesa, no usamos AWAIT

    return (
        <div>
            <BackButton className="cursor-pointer hover:text-blue-600">
                <h1 className='text-4xl'>Paciente</h1>
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
        <div className='p-4 md:p-8 border border-blue-400'>
            <img
                src={paciente.foto || '/images/foto_00.webp'}
                alt="foto"
                className='size-48 rounded-lg'
            />
            <p>Nombre: {paciente.nombre}</p>
            <p>Tutor Legal: {paciente.tutor_legal}</p>
            <p>Fecha Nacimiento: {paciente.fecha_nacimiento.toLocaleDateString()}</p>
            <p>Planta: {paciente?.planta?.nombre}</p>
            <p>Medicinas: {paciente?.medicinas?.map(a => a.nombre).join(', ')}</p>
        </div>
    )
}