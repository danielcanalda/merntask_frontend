import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Sidebar = () => {

    const { auth } = useAuth()
    return (
        <aside className='md:w-80 lg:w-96 px-5 py-10'>
            <p className='text-xl text-slate-600 font-medium'>Hola {auth.nombre}</p>

            <Link
                to={'crear-proyecto'}
                className='p-3 text-white bg-blue-600 hover:bg-blue-700 rounded font-medium block mt-5 text-center uppercase tracking-wider'
            >Nuevo Proyecto</Link>
        </aside>
    )
}

export default Sidebar