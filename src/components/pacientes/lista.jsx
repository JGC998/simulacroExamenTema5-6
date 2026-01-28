'use client'
import Link from 'next/link'
import { use } from 'react'
import Modal from '@/components/modal'
import Form from '@/components/pacientes/form'
import { eliminarPaciente, insertarPaciente, modificarPaciente } from '@/lib/actions'
import { IconoInsertar, IconoModificar, IconoEliminar } from '@/components/icons'



export default function Lista({ promesaPacientes, promesaPlantasIdNombre, promesaMedicinasIdNombre }) {

    const pacientes = use(promesaPacientes)
    const plantasIdNombre = use(promesaPlantasIdNombre)
    const medicinasIdNombre = use(promesaMedicinasIdNombre)

    return (

        <div className="flex flex-col gap-4">
            <div className='flex justify-end items-center gap-4 pb-4'>
                <Modal openElement={<IconoInsertar />}>

                    <h2 className='text-2xl font-bold'>INSERTAR PACIENTE</h2>
                    <Form action={insertarPaciente} plantasIdNombre={plantasIdNombre} medicinasIdNombre={medicinasIdNombre} textSubmit='Insertar' />

                </Modal>
            </div>

            <div className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-10'>
                {pacientes.map((paciente) =>
                    <Item
                        paciente={paciente}
                        plantasIdNombre={plantasIdNombre}
                        medicinasIdNombre={medicinasIdNombre}
                        key={paciente.id} />)}
            </div>
        </div>
    )
}




function Item({ paciente, plantasIdNombre, medicinasIdNombre }) {

    return (
        <div className='p-4 rounded-lg bg-blue-200'>
            <Link href={`/pacientes/${paciente.id}`} >
                <p>Nombre: {paciente.nombre} </p>
                <p>Tutor legal: {paciente.tutor_legal}</p>
                <p>Fecha de nacimiento: {paciente.fecha_nacimiento.toLocaleDateString()}</p>
                <p>Planta: {paciente.planta ? paciente.planta.nombre : 'Sin planta'}</p>
            </Link>
            <div className='flex gap-2 justify-end'>
                <Modal openElement={<IconoModificar />}>

                    <h2 className='text-2xl font-bold'>ACTUALIZAR PACIENTE</h2>
                    <Form action={modificarPaciente} paciente={paciente} plantasIdNombre={plantasIdNombre} medicinasIdNombre={medicinasIdNombre} textSubmit="Actualizar" />

                </Modal>

                <Modal openElement={<IconoEliminar />} >

                    <h2 className='text-2xl font-bold'>ELIMINAR PACIENTE</h2>
                    <Form action={eliminarPaciente} paciente={paciente} plantasIdNombre={plantasIdNombre} medicinasIdNombre={medicinasIdNombre} disabled={true} textSubmit="Eliminar" />

                </Modal>
            </div>
        </div>
    )
}