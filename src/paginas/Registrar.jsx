import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'


const Registrar = () => {

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')

  const [alerta, setAlerta] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()

    if([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    if(password != repetirPassword) {
      setAlerta({
        msg: 'Los passwords deben ser iguales',
        error: true
      })
      return
    }

    if(password.length < 6) {
      setAlerta({
        msg: 'El password debe contener al menos 6 carácteres',
        error: true
      })
      return
    }

    setAlerta({})

    //Crear el usuario via API
    try {
      const { data } = await clienteAxios.post(`/usuarios`, {nombre, email, password})

      setAlerta({
        msg: data.msg,
        error: false
      })

      setNombre('')
      setEmail('')
      setPassword('')
      setRepetirPassword('')
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
        <h1 className='text-blue-600 font-normal text-5xl sm:text-6xl text-center'>Crea tu cuenta y administra tus <span className='text-slate-900'>Proyectos</span></h1>

        { msg && <Alerta alerta={alerta}/> }

        <form onSubmit={handleSubmit} className='my-10 bg-white rounded-xl shadow-2xl shadow-slate-200 px-7 py-3 sm:px-12 sm:py-8'>
            <div className='my-5'>
                <label
                    htmlFor='nombre'
                    className='block text-slate-600 font-semibold'
                >Nombre</label>
                <input
                    id='nombre'
                    type='text'
                    placeholder='John Doe'
                    className='w-full mt-2 p-3 border rounded bg-slate-50'
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>
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
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className='my-5'>
                <label
                    htmlFor='password'
                    className='block text-slate-600 font-semibold'
                >Password</label>
                <input
                    id='password'
                    type='password'
                    placeholder='****'
                    className='w-full mt-2 p-3 border rounded bg-slate-50'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <div className='my-5'>
                <label
                    htmlFor='password2'
                    className='block text-slate-600 font-semibold'
                >Repetir Password</label>
                <input
                    id='password2'
                    type='password'
                    placeholder='****'
                    className='w-full mt-2 p-3 border rounded bg-slate-50'
                    value={repetirPassword}
                    onChange={e => setRepetirPassword(e.target.value)}
                />
            </div>

            <input
                type='submit'
                value={'Crear cuenta'}
                className='bg-blue-600 w-full py-3 text-white rounded my-5 font-semibold tracking-wider uppercase hover:cursor-pointer hover:bg-blue-700 transition-colors'
            />
        </form>

        
        <nav className='lg:flex lg:justify-between'>
            <Link
                className='text-slate-500 block text-center mb-5'
                to={'/'}
            >¿Ya tienes una cuenta? <span className='font-semibold'>Inicia sesión</span></Link>

            <Link
                className='text-blue-600 font-semibold block text-center mb-5'
                to={'/forgot-password'}
            >Olvidé mi password</Link>
        </nav>
    </>
  )
}

export default Registrar