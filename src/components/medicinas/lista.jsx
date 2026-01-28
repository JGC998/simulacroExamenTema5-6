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

                    <h2 className='text-2xl font-bold'>INSERTAR ASIGNATURA</h2>
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
        <div className='p-4 rounded-lg bg-blue-200'>
            <Link href={`/medicinas/${medicina.id}`} >
                <p>Nombre: {medicina.nombre} </p>
                <p>Profesor: {medicina.profesor}</p>
                <p>Horas semanales: {medicina.horas_semana}</p>
            </Link>
            <div className='flex gap-2 justify-end'>
                <Modal openElement={<IconoModificar />}>

                    <h2 className='text-2xl font-bold'>ACTUALIZAR ASIGNATURA</h2>
                    <Form action={modificarMedicina} medicina={medicina} textSubmit="Actualizar" />

                </Modal>

                <Modal openElement={<IconoEliminar />}>

                    <h2 className='text-2xl font-bold'>ELIMINAR ASIGNATURA</h2>
                    <Form action={eliminarMedicina} medicina={medicina} disabled={true} textSubmit="Eliminar" />

                </Modal>
            </div>
        </div>
    )
}