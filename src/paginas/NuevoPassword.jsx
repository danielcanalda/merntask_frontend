import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'

const NuevoPassword = () => {

    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [tokenValido, setTokenValido] = useState(false)
    const [passwordModificado, setPasswordModificado] = useState(false)

    const params = useParams()
    const { token } = params

    const [alerta, setAlerta] = useState({})

    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios.get(`/usuarios/forgot-password/${token}`)
                setTokenValido(true)
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }
        }
        comprobarToken()
    }, [])

    const handleSubmit = async e => {
        e.preventDefault()

        if(password != password2) {
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

        try {
            const url = `/usuarios/forgot-password/${token}`
            const { data } = await clienteAxios.post(url, { password })
            setAlerta({
                msg: data.msg,
                error: false
            })^
            setPasswordModificado(true)
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
        <h1 className='text-blue-600 font-normal text-5xl sm:text-6xl text-center'>
            { tokenValido ? 'Escribe un nuevo password' : 'No es posible restablecer el password' }
        </h1>

        {msg && <Alerta alerta={alerta}/>}

        { tokenValido && (
            <form onSubmit={handleSubmit} className={`${passwordModificado ? 'hidden' : 'my-10 bg-white rounded-xl shadow-2xl shadow-slate-200 px-7 py-3 sm:px-12 sm:py-8'}`}>
                <div className='my-5'>
                    <label
                        htmlFor='password'
                        className='block text-slate-600 font-semibold'
                    >Nuevo password</label>
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
                        value={password2}
                        onChange={e => setPassword2(e.target.value)}
                    />
                </div>

                <input
                    type='submit'
                    value={'Guardar'}
                    className='bg-blue-600 w-full py-3 text-white rounded my-5 font-semibold tracking-wider uppercase hover:cursor-pointer hover:bg-blue-700 transition-colors'
                />
            </form>
        )}

        {passwordModificado && (
              <Link
              className='text-slate-500 block text-center my-14'
              to={'/'}
              ><span className='font-semibold'>Inicia sesión</span></Link>
        )}
    </>
  )
}

export default NuevoPassword