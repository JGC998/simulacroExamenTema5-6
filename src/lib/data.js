'use server'

import prisma from '@/lib/prisma'


// ------------------------- PLANTAS ------------------------- 

export async function obtenerPlantas() {
    try {
        const plantas = await prisma.planta.findMany({
            include: {
                pacientes: {
                    select: {
                        id: true,
                        nombre: true
                    }
                }
            }
        })
        return plantas
    } catch (error) {
        console.log(error)
        return []
    }
}


export async function obtenerPlanta(id) {
    try {
        const planta = await prisma.planta.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                pacientes: true
            }
        })
        return planta
    } catch (error) {
        console.log(error)
        return []
    }
}


export async function obtenerPlantasIdNombre() {
    try {
        const plantas = await prisma.planta.findMany({
            select: {
                id: true,
                nombre: true
            }
        })
        return plantas
    } catch (error) {
        console.log(error)
        return []
    }
}



// ------------------------- MEDICINAS ------------------------- 

export async function obtenerMedicinas() {
    try {
        const medicinas = await prisma.medicina.findMany({
            include: {
                pacientes: {
                    select: {
                        id: true,
                        nombre: true
                    }
                }
            }
        })
        console.log("Medicinas encontradas:", medicinas); // DEBUG
        return medicinas
    } catch (error) {
        console.error("Error al obtener medicinas:", error); // DEBUG
        return []
    }
}


export async function obtenerMedicina(id) {
    try {
        const medicina = await prisma.medicina.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                pacientes: true
            }
        })
        return medicina
    } catch (error) {
        console.log(error)
        return []
    }
}


export async function obtenerMedicinasIdNombre() {
    try {
        const medicinas = await prisma.medicina.findMany({
            select: {
                id: true,
                nombre: true
            }
        })
        return medicinas
    } catch (error) {
        console.log(error)
        return []
    }
}



// ------------------------- PACIENTES ------------------------- 

export async function obtenerPacientes() {
    try {
        const pacientes = await prisma.paciente.findMany({
            select: {
                id: true,
                nombre: true,
                tutor_legal: true,
                fecha_nacimiento: true,
                foto: true,
                plantaId: true,
                planta: {
                    select: {
                        id: true,
                        nombre: true,
                        jefe_planta: true,
                        numero_camas: true
                    }
                },
                medicinas: {
                    select: {
                        id: true,
                        nombre: true,
                        via: true
                    }
                }
            }
        })
        return pacientes
    } catch (error) {
        console.log(error)
        return []
    }
}


export async function obtenerPaciente(id) {

    try {
        const paciente = await prisma.paciente.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                planta: true,
                medicinas: true
            }
        })
        return paciente
    } catch (error) {
        console.log(error)
        return []
    }
}


export async function obtenerPacientesIdNombre() {

    try {
        const pacientes = await prisma.paciente.findMany({
            select: {
                id: true,
                nombre: true
            }
        })
        return pacientes
    } catch (error) {
        console.log(error)
        return null
    }
}