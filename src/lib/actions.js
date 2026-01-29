'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"





// ------------------------------ PLANTAS ------------------------------

export async function insertarPlanta(prevState, formData) {
    const nombre = formData.get('nombre')
    const jefe_planta = formData.get('jefe_planta')
    const numero_camas = Number(formData.get('numero_camas'))


    try {
        await prisma.planta.create({
            data: {
                nombre,
                jefe_planta,
                numero_camas
            }
        })
        revalidatePath('/plantas')
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        // return { error: error.message }
        return { error: error.message.split('\n').pop() }
    }
}



export async function modificarPlanta(prevState, formData) {
    const id = Number(formData.get('id'))
    const nombre = formData.get('nombre')
    const jefe_planta = formData.get('jefe_planta')
    const numero_camas = Number(formData.get('numero_camas'))

    try {
        await prisma.planta.update({
            where: { id },
            data: {
                nombre,
                jefe_planta,
                numero_camas
            }
        })
        revalidatePath('/plantas')
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}



export async function eliminarPlanta(prevState, formData) {
    const id = Number(formData.get('id'))

    try {
        await prisma.planta.delete({
            where: { id },
        })
        revalidatePath('/plantas')
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}




// ------------------------------ MEDICINAS ------------------------------

export async function insertarMedicina(prevState, formData) {
    const nombre = formData.get('nombre')
    const via = formData.get('via')
    const observaciones = formData.get('observaciones')

    try {
        await prisma.medicina.create({
            data: {
                nombre,
                via,
                observaciones
            }
        })
        revalidatePath('/medicinas')
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}



export async function modificarMedicina(prevState, formData) {
    const id = Number(formData.get('id'))
    const nombre = formData.get('nombre')
    const via = formData.get('via')
    const observaciones = formData.get('observaciones')

    try {
        await prisma.medicina.update({
            where: { id },
            data: {
                nombre,
                via,
                observaciones
            }
        })
        revalidatePath('/medicinas')
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}



export async function eliminarMedicina(prevState, formData) {
    const id = Number(formData.get('id'))

    try {
        await prisma.medicina.delete({
            where: { id },
        })
        revalidatePath('/medicinas')
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}





// ------------------------------ PACIENTES ------------------------------

export async function insertarPaciente(prevState, formData) {
    const nombre = formData.get('nombre')
    const tutor_legal = formData.get('tutor_legal')
    const fecha_nacimiento = new Date(formData.get('fecha_nacimiento'))
    const foto = formData.get('foto')


    // PLANTA - PACIENTE (1:N)
    const plantaId = formData.get('plantaId') ? Number(formData.get('plantaId')) : null  // Este valor puede ser nulo


    // PACIENTE - MEDICINAS (N:M)
    // Array con IDs de todas las medicinas. Formato: [ {id: 1}, {id: 2}, ...]
    const medicinasIDs = await prisma.medicina.findMany({
        select: { id: true }
    })

    const connect = medicinasIDs.filter(medicina => formData.get(medicina.id) !== null)
    const medicinas = { connect }


    try {
        await prisma.paciente.create({
            data: {
                nombre,
                tutor_legal,
                fecha_nacimiento,
                foto,
                plantaId,
                medicinas
            }
        })
        revalidatePath('/pacientes')
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}



export async function modificarPaciente(prevState, formData) {
    const id = Number(formData.get('id'))
    const nombre = formData.get('nombre')
    const tutor_legal = formData.get('tutor_legal')
    const fecha_nacimiento = new Date(formData.get('fecha_nacimiento'))
    const foto = formData.get('foto')

    // PLANTA - PACIENTE (1:N)
    const plantaId = formData.get('plantaId') ? Number(formData.get('plantaId')) : null  // Este valor puede ser nulo


    // PACIENTE - MEDICINAS  (N:M)
    // Array con IDs de todas las medicinas. Formato: [ {id: 1}, {id: 2}, ...]
    const medicinasIDs = await prisma.medicina.findMany({
        select: { id: true }
    })

    const connect = medicinasIDs.filter(medicina => formData.get(medicina.id) !== null)
    const disconnect = medicinasIDs.filter(medicina => formData.get(medicina.id) === null)
    const medicinas = { connect, disconnect }


    try {
        await prisma.paciente.update({
            where: { id },
            data: {
                nombre,
                tutor_legal,
                fecha_nacimiento,
                foto,
                plantaId,
                medicinas
            }
        })
        revalidatePath('/pacientes')
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}



export async function eliminarPaciente(prevState, formData) {
    const id = Number(formData.get('id'))

    try {
        await prisma.paciente.delete({
            where: { id },
        })
        revalidatePath('/pacientes')
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}



