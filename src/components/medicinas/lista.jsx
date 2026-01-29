'use client'
import Link from 'next/link'
import { use } from 'react'
import Modal from '@/components/modal'
import Form from '@/components/medicinas/form'
import { eliminarMedicina, insertarMedicina, modificarMedicina } from '@/lib/actions'
import { IconoInsertar, IconoModificar, IconoEliminar } from '@/components/icons'



export default function Lista({ promesaMedicinas }) {

    const medicinas = use(promesaMedicinas)

    return (
        <div className="flex flex-col gap-4">
            <div className='flex justify-end items-center gap-4 pb-4'>
                <Modal openElement={<IconoInsertar />}>

                    <h2 className='text-2xl font-bold'>INSERTAR MEDICINA</h2>
                    <Form action={insertarMedicina} textSubmit="Insertar" />

                </Modal>
            </div>

            <div className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-10'>
                {medicinas.map((medicina) => <Item medicina={medicina} key={medicina.id} />)}
            </div>
        </div>
    )
}




function Item({ medicina }) {
    return (
        <div className='p-6 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all duration-300'>
            <Link href={`/medicinas/${medicina.id}`} className="block mb-4 group">
                <p className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {medicina.nombre}
                </p>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                    💉 Vía: {medicina.via}
                </p>
                <p className="text-slate-500 dark:text-slate-500 text-sm mt-1">
                    📝 {medicina.observaciones}
                </p>
            </Link>
            <div className='flex gap-3 justify-end pt-4 border-t border-slate-100 dark:border-slate-800'>
                <Modal openElement={<IconoModificar />}>
                    <h2 className='text-2xl font-bold mb-4 text-slate-800 dark:text-white'>ACTUALIZAR MEDICINA</h2>
                    <Form action={modificarMedicina} medicina={medicina} textSubmit="Actualizar" />
                </Modal>

                <Modal openElement={<IconoEliminar />}>
                    <h2 className='text-2xl font-bold mb-4 text-slate-800 dark:text-white'>ELIMINAR MEDICINA</h2>
                    <Form action={eliminarMedicina} medicina={medicina} disabled={true} textSubmit="Eliminar" />
                </Modal>
            </div>
        </div>
    )
}