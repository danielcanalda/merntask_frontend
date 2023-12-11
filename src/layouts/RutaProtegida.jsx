import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Cargando from '../components/Cargando'

const RutaProtegida = () => {

    const { auth, cargando } = useAuth()

    if(cargando) return <Cargando />

    return (
        <>
            {auth._id ? 
            (
                <div className='bg-slate-100'>
                    <Header />

                    <div className='md:flex'>
                        <Sidebar/>

                        <main className='flex-1 p-5 md:py-10'>
                            <Outlet />
                        </main>
                    </div>
                </div>
            ) : <Navigate to={'/'} />}
        </>
    )
}

export default RutaProtegida