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
        <div className='p-6 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all duration-300'>
            <Link href={`/pacientes/${paciente.id}`} className="block mb-4 group">
                <p className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {paciente.nombre}
                </p>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                    👤 {paciente.tutor_legal}
                </p>
                <p className="text-slate-500 dark:text-slate-500 text-sm mt-1 flex items-center gap-2">
                    🎂 {paciente.fecha_nacimiento.toLocaleDateString()}
                </p>
                <span className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    🏥 {paciente.planta ? paciente.planta.nombre : 'Sin planta'}
                </span>
            </Link>
            <div className='flex gap-3 justify-end pt-4 border-t border-slate-100 dark:border-slate-800'>
                <Modal openElement={<IconoModificar />}>
                    <h2 className='text-2xl font-bold mb-4 text-slate-800 dark:text-white'>ACTUALIZAR PACIENTE</h2>
                    <Form action={modificarPaciente} paciente={paciente} plantasIdNombre={plantasIdNombre} medicinasIdNombre={medicinasIdNombre} textSubmit="Actualizar" />
                </Modal>

                <Modal openElement={<IconoEliminar />} >
                    <h2 className='text-2xl font-bold mb-4 text-slate-800 dark:text-white'>ELIMINAR PACIENTE</h2>
                    <Form action={eliminarPaciente} paciente={paciente} plantasIdNombre={plantasIdNombre} medicinasIdNombre={medicinasIdNombre} disabled={true} textSubmit="Eliminar" />
                </Modal>
            </div>
        </div>
    )
}