import { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const PreviewProyecto = ({proyecto}) => {

    const { auth } = useAuth()
    const { nombre, _id, cliente, creador } = proyecto

    const [size, setSize] = useState('w-0 h-0')

  return (
    <div className='border-b last:border-b-0 p-5 flex items-center'>
        <p className='flex-1 flex items-center gap-2'>
            {nombre}

            <span className='text-xs text-slate-500 uppercase'>
                {''} {cliente}
            </span>

            {auth._id !== creador && (
            <span className='text-violet-600 text-xs font-semibold ml-auto bg-violet-100 px-3 py-0.5 rounded-full'>Colaborador</span>
            )}
        </p>

        <Link
            to={`${_id}`}
            className='text-slate-500 hover:text-slate-800 text-sm font-semibold flex items-center gap-1 w-28 justify-end'
            onMouseEnter={() => {
                setSize('w-4 h-4')
            }}
            onMouseLeave={() => {
                setSize('w-0 h-0')
            }}
        >Ver Proyecto
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${size} transition-all`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
        </svg>
        </Link>
    </div>
  )
}

export default PreviewProyecto