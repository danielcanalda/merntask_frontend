import { Link } from 'react-router-dom'
import useProyectos from '../hooks/useProyectos'
import useAuth from '../hooks/useAuth'
import Busqueda from './Busqueda'

const Header = () => {

    const { handleBuscador, cerrarSesion } = useProyectos()
    const { cerrarSesionAuth } = useAuth()

    const handleCerrarSesion = () => {
        cerrarSesionAuth()
        cerrarSesion()
        localStorage.removeItem('token')
    }

  return (
    <header className='px-4 py-5 bg-white border-b'>
        <div className='md:flex md:justify-between items-center'>
            <h2 className='text-4xl text-blue-600 font-normal text-center'>UpTask</h2>

            <div className='flex items-center justify-center sm:justify-end mt-5 md:mt-0 flex-wrap'>
                <button
                    type='button'
                    className='border rounded-full pl-6 text-slate-400 text-sm tracking-wide flex items-center gap-20 md:mr-3 sm:mr-auto sm:w-auto w-full justify-between'
                    onClick={handleBuscador}
                >Buscar Proyecto
                    <div className='bg-slate-100 p-3 rounded-r-full'>
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-4 h-4'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
                        </svg>
                    </div>
                </button>

                <Link
                    to={'/proyectos'}
                    className='p-3 text-blue-600 text-sm font-semibold'
                >Proyectos</Link>

                <button
                    type='button'
                    className='p-3 text-slate-500 text-sm font-semibold hover:text-slate-800'
                    onClick={handleCerrarSesion}
                >Cerrar Sesión</button>

                <Busqueda />
            </div>
        </div>
    </header>
  )
}

export default Header