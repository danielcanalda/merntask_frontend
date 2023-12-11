import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'


const ForgotPassword = () => {

    const [email, setEmail] = useState('')
    const [alerta, setAlerta] = useState({})

    const handleSubmit = async e => {
        e.preventDefault()

        if(email === '' || email.length < 6) {
            setAlerta({
                msg: 'El email es obligatorio',
                error: true
            })
            return
        }

        try {
            const { data } = await clienteAxios.post(`/usuarios/forgot-password`, { email })

            setAlerta({
                msg: data.msg,
                error: false
            })
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const { msg } = alerta

  return (
    <>
        <h1 className='text-blue-600 font-normal text-5xl sm:text-6xl text-center'>Restablecer password</h1>

        { msg && <Alerta alerta={alerta}/> }

        <form onSubmit={handleSubmit} className='my-10 bg-white rounded-xl shadow-2xl shadow-slate-200 px-7 py-3 sm:px-12 sm:py-8'>
            <div className='my-5'>
                <label
                    htmlFor='email'
                    className='block text-slate-600 font-semibold'
                >Email</label>
                <input
                    id='email'
                    type='email'
                    placeholder='johndoe@email.com'
                    className='w-full mt-2 p-3 border rounded bg-slate-50'
                    value={email}
                    onChange={ e => setEmail(e.target.value)}
                />
            </div>

            <input
                type='submit'
                value={'Enviar instrucciones'}
                className='bg-blue-600 w-full py-3 text-white rounded my-5 font-semibold tracking-wider uppercase hover:cursor-pointer hover:bg-blue-700 transition-colors'
            />
        </form>

        
        <nav className='lg:flex lg:justify-between'>
            <Link
                className='text-slate-500 block text-center mb-5'
                to={'/'}
            >¿Ya tienes una cuenta? <span className='font-semibold'>Inicia sesión</span></Link>

            <Link
                className='text-slate-500 block text-center mb-5'
                to={'/registrar'}
            ><span className='font-semibold text-blue-600'>Nueva cuenta</span></Link>
        </nav>
    </>
  )
}

export default ForgotPassword