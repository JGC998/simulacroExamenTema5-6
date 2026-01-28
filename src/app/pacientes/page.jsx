import ListaPacientes from '@/components/pacientes/lista'
import { obtenerMedicinasIdNombre, obtenerPacientes, obtenerPlantasIdNombre } from '@/lib/data'
import { Suspense } from 'react'
import Link from 'next/link'




export default function PaginaPacientes() {

    const promesaPacientes = obtenerPacientes()  // Promesa, no usamos AWAIT
    const promesaPlantasIdNombre = obtenerPlantasIdNombre()
    const promesaMedicinasIdNombre = obtenerMedicinasIdNombre()


    return (
        <div className='p-4'>

            <div className='flex justify-center items-center gap-4 pb-4'>
                <h1 className='text-4xl'>
                    <Link href="/" className="cursor-pointer hover:text-blue-600">
                        Pacientes
                    </Link>
                </h1>
            </div>

            <Suspense fallback={<p className='text-2xl text-blue-400'>Cargando...</p>}>
                <ListaPacientes
                    promesaPacientes={promesaPacientes}
                    promesaPlantasIdNombre={promesaPlantasIdNombre}
                    promesaMedicinasIdNombre={promesaMedicinasIdNombre}
                />
            </Suspense>
        </div>
    )
}




