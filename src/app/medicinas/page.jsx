import ListaMedicinas from '@/components/medicinas/lista'
import { obtenerMedicinas } from '@/lib/data'
import { Suspense } from 'react'
import Link from 'next/link'



export default function PaginaMedicinas() {

    const promesaMedicinas = obtenerMedicinas()  // Promesa, no usamos AWAIT

    return (
        <div className='p-4'>

            <div className='flex justify-center items-center gap-4 pb-4'>
                <h1 className='text-4xl'>
                    <Link href="/" className="cursor-pointer hover:text-blue-600">
                        Medicinas
                    </Link>
                </h1>
            </div>

            <Suspense fallback={<p className='text-2xl text-blue-400'>Cargando...</p>}>
                <ListaMedicinas
                    promesaMedicinas={promesaMedicinas}
                />
            </Suspense>
        </div>
    )
}


