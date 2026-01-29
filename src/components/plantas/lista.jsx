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
    if (orden === 'asc') {
        plantas = dataPlantas.toSorted((a, b) => {
            if (typeof a[propiedad] === 'number') {
                return a[propiedad] - b[propiedad]
            }
            return String(a[propiedad]).localeCompare(String(b[propiedad]))
        })
    }
    if (orden === 'desc') {
        plantas = dataPlantas.toSorted((a, b) => {
            if (typeof a[propiedad] === 'number') {
                return b[propiedad] - a[propiedad]
            }
            return String(b[propiedad]).localeCompare(String(a[propiedad]))
        })
    }

    if (buscar) plantas = plantas.filter((planta) =>
        planta.nombre.toLowerCase().includes(buscar.toLowerCase())
        || planta.jefe_planta.toLowerCase().includes(buscar.toLowerCase())
    )

    return (
        <div className="flex flex-col gap-6">

            <div className="flex flex-wrap gap-4 items-end bg-white/50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800 backdrop-blur-sm">

                <fieldset className="flex flex-col gap-1">
                    <legend className='font-bold text-sm text-slate-700 dark:text-slate-200'>Filtrar</legend>
                    <input type="search" placeholder="Buscar..."
                        value={buscar}
                        onChange={(e) => setBuscar(e.target.value)}
                        className="p-2 border border-slate-300 dark:border-slate-600 rounded-lg w-full md:w-64 bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </fieldset>

                <fieldset className="flex flex-col gap-1">
                    <legend className='font-bold text-sm text-slate-700 dark:text-slate-200'>Ordenar</legend>
                    <div className="flex gap-2">
                        <select
                            value={orden}
                            onChange={(e) => setOrden(e.target.value)}
                            className="p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                        >
                            <option value="">Defecto</option>
                            <option value="asc">Ascendente</option>
                            <option value="desc">Descendente</option>
                        </select>
                        <select
                            value={propiedad}
                            onChange={(e) => setPropiedad(e.target.value)}
                            className="p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                        >
                            <option value="nombre">Nombre</option>
                            <option value="jefe_planta">Jefe de Planta</option>
                            <option value="numero_camas">Nº Camas</option>
                        </select>
                    </div>
                </fieldset>
            </div>

            <div className='flex justify-end items-center gap-4'>

                <Modal openElement={<IconoInsertar />}>
                    <h2 className='text-2xl font-bold mb-4 text-slate-800 dark:text-white'>INSERTAR PLANTA</h2>
                    <Form action={insertarPlanta} textSubmit="Insertar" />
                </Modal>
            </div>


            <div className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6'>
                {plantas.map((planta) => <Item planta={planta} key={planta.id} />)}
            </div>
        </div >
    )
}


function Item({ planta }) {

    return (
        <div className='p-6 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all duration-300'>
            <Link href={`/plantas/${planta.id}`} className="block mb-4 group">
                <p className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {planta.nombre}
                </p>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                    👨‍⚕️ Jefe: {planta.jefe_planta}
                </p>
                <p className="text-slate-500 dark:text-slate-500 text-sm mt-1 flex items-center gap-2">
                    🛏️ {planta.numero_camas} camas
                </p>
            </Link>

            <div className='flex gap-3 justify-end pt-4 border-t border-slate-100 dark:border-slate-800'>
                <Modal openElement={<IconoModificar />}>
                    <h2 className='text-2xl font-bold mb-4 text-slate-800 dark:text-white'>ACTUALIZAR PLANTA</h2>
                    <Form action={modificarPlanta} planta={planta} textSubmit="Actualizar" />
                </Modal>

                <Modal openElement={<IconoEliminar />}           >
                    <h2 className='text-2xl font-bold mb-4 text-slate-800 dark:text-white'>ELIMINAR PLANTA</h2>
                    <Form action={eliminarPlanta} planta={planta} disabled={true} textSubmit="Eliminar" />
                </Modal>
            </div>
        </div>
    )
}