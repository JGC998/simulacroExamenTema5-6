'use client'
import Link from 'next/link'
import { use, useState } from 'react'
import Modal from '@/components/modal'
import Form from '@/components/plantas/form'
import { eliminarPlanta, insertarPlanta, modificarPlanta } from '@/lib/actions'
import { IconoInsertar, IconoModificar, IconoEliminar } from '@/components/icons'


export default function Lista({ promesaPlantas }) {

    const dataPlantas = use(promesaPlantas)
    const [propiedad, setPropiedad] = useState('nombre')
    const [orden, setOrden] = useState('')
    const [buscar, setBuscar] = useState('')

    let plantas = dataPlantas
    if (orden === 'asc') plantas = dataPlantas.toSorted((a, b) => a[propiedad].localeCompare(b[propiedad]))
    if (orden === 'desc') plantas = dataPlantas.toSorted((a, b) => b[propiedad].localeCompare(a[propiedad]))

    if (buscar) plantas = plantas.filter((planta) =>
        planta.nombre.toLowerCase().includes(buscar.toLowerCase())
        || planta.tutor.toLowerCase().includes(buscar.toLowerCase())
        || planta.aula.toLowerCase().includes(buscar.toLowerCase())
    )

    return (
        <div className="flex flex-col gap-4">

            <div className="flex flex-wrap gap-2 mb-2">

                <fieldset className="flex flex-wrap gap-2 mb-2">
                    <legend className='font-bold'>Filtrar</legend>
                    <input type="search" placeholder="Buscar"
                        value={buscar}
                        onChange={(e) => setBuscar(e.target.value)}
                        className="p-2 border rounded-md w-fit"
                    />
                </fieldset>
                <fieldset className="flex flex-wrap gap-2 mb-2">
                    <legend className='font-bold'>Ordenar</legend>
                    <select
                        value={orden}
                        onChange={(e) => setOrden(e.target.value)}
                        className="p-2 border rounded-md w-fit"
                    >
                        <option value="">Orden por defecto</option>
                        <option value="asc">Ascendente</option>
                        <option value="desc">Descendente</option>
                    </select>
                    <select
                        value={propiedad}
                        onChange={(e) => setPropiedad(e.target.value)}
                        className="p-2 border rounded-md w-fit"
                    >
                        <option value="nombre">Nombre</option>
                        <option value="tutor">Tutor</option>
                        <option value="aula">Aula</option>
                    </select>
                </fieldset>

            </div>

            <div className='flex justify-end items-center gap-4 pb-4'>

                <Modal openElement={<IconoInsertar />}>

                    <h2 className='text-2xl font-bold'>INSERTAR PLANTA</h2>
                    <Form action={insertarPlanta} textSubmit="Insertar" />

                </Modal>
            </div>


            {/* <div className='flex flex-wrap gap-10'> */}
            <div className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-10'>
                {plantas.map((planta) => <Item planta={planta} key={planta.id} />)}
            </div>
        </div >
    )
}


function Item({ planta }) {

    return (
        <div className='p-4 rounded-lg bg-blue-200'>
            <Link href={`/plantas/${planta.id}`} >
                <p>Nombre de planta: {planta.nombre} </p>
                <p>Tutor del planta: {planta.tutor}</p>
                <p>Aula {planta.aula}</p>
            </Link>

            <div className='flex gap-2 justify-end'>
                <Modal openElement={<IconoModificar />}>

                    <h2 className='text-2xl font-bold'>ACTUALIZAR PLANTA</h2>
                    <Form action={modificarPlanta} planta={planta} textSubmit="Actualizar" />

                </Modal>

                <Modal openElement={<IconoEliminar />}           >

                    <h2 className='text-2xl font-bold'>ELIMINAR PLANTA</h2>
                    <Form action={eliminarPlanta} planta={planta} disabled={true} textSubmit="Eliminar" />

                </Modal>
            </div>
        </div>
    )
}