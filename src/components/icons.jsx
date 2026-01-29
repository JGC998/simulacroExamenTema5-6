import { FilePenLineIcon, PlusIcon, TrashIcon } from "lucide-react"

export const IconoInsertar = () => <PlusIcon size={24}
    className='text-white bg-green-600 rounded-full p-1 cursor-pointer hover:bg-green-700 hover:scale-110 transition-all shadow-md'
/>

export const IconoModificar = () => <FilePenLineIcon size={24}
    className='text-blue-600 bg-blue-100 rounded-lg p-1 cursor-pointer hover:bg-blue-200 hover:scale-110 transition-all dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50'
/>

export const IconoEliminar = () => <TrashIcon size={24}
    className='text-red-600 bg-red-100 rounded-lg p-1 cursor-pointer hover:bg-red-200 hover:scale-110 transition-all dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50'
/>
