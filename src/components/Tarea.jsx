import React, { useState, useEffect } from 'react'
import { formatearFecha } from '../helpers/formatearFecha'
import useProyectos from '../hooks/useProyectos'
import useAdmin from '../hooks/useAdmin'


const Tarea = ({tarea}) => {

    const { descripcion, nombre, prioridad, fechaEntrega, estado, _id } = tarea

    const [colorTarea, setColorTarea] = useState('')

    const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } = useProyectos()

    const admin = useAdmin()

    useEffect(() => {
        switch (prioridad) {
            case 'Baja':
                setColorTarea('text-green-600 bg-green-100')
                break
            case 'Media':
                setColorTarea('text-yellow-600 bg-yellow-100')
                break
            case 'Alta':
                setColorTarea('text-red-600 bg-red-100')
                break
            default:
                setColorTarea('text-slate-600')
            }
    }, [tarea])

    

  return (
    <div className='border-b last:border-b-0 p-5 flex gap-5 sm:flex-row flex-col'>
        <div className='flex flex-1 flex-col gap-2 border-b pb-5 sm:pr-2 sm:border-b-0 sm:pb-0 border-slate-200 border-dashed'>
            <p className='text-lg text-slate-600 font-medium'>{nombre}</p>
            <p className='grow mb-5 bg-slate-100 py-2 px-4 text-slate-600 rounded text-sm'>{descripcion}</p>
            <div className='flex gap-5 justify-between items-end'>
                <div>
                    {estado && <p className='text-sm'><span className='text-slate-400'>Completada por:</span> {tarea.completado.nombre}</p>}
                   <p className='text-slate-400 text-sm font-normal'>Prioridad: <span className={`font-semibold text-xs w-14 text-center inline-block px-3 rounded-full ${colorTarea}`}>{prioridad}</span></p> 
                </div>
                <p className='text-sm text-right'><span className='text-slate-400'>Fecha de entrega</span><br /> {formatearFecha(fechaEntrega)}</p>
            </div>
        </div>
        <div className='flex flex-col gap-2 justify-between sm:w-24'>
            {estado ? (
                <button
                type='button'
                className={`text-sm w-full rounded tracking-wide font-medium focus:outline-none justify-center text-green-500`}
                onClick={()=> completarTarea(_id)}
                >Completada</button>
            ) : (
                <button
                type='button'
                className={`text-sm w-full rounded tracking-wide font-medium focus:outline-none justify-center text-yellow-500`}
                onClick={()=> completarTarea(_id)}
                >Incompleta</button>
            )}
            {admin && (
            <div className='flex sm:flex-col gap-2 mt-5 flex-row'>
                <button
                    type='button'
                    className='text-sm py-2 w-full rounded tracking-wide font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none justify-center'
                    onClick={() => {handleModalEditarTarea(tarea)}}
                >Editar</button>
            
                <button
                    type='button'
                    className='text-sm py-2 w-full rounded tracking-wide font-medium text-red-600 bg-red-50 hover:bg-red-100 focus:outline-none justify-center'
                    onClick={() => {handleModalEliminarTarea(tarea)}}
                >Eliminar</button>
            </div>
            )}
        </div>
    </div>
  )
}

export default Tarea