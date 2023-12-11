import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'



const ConfirmarCuenta = () => {

  const [alerta, setAlerta] = useState({})
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)

  const params = useParams()
  const { id } = params

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/usuarios/confirmar/${id}`
        const { data } = await clienteAxios.get(url)

        setAlerta({
          msg: data.msg,
          error: false
        })
        setCuentaConfirmada(true)
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    confirmarCuenta()
  }, [])

  const { msg } = alerta

  return (
    <>
        <h1 className='text-blue-600 font-normal text-5xl sm:text-6xl text-center'>Confirmación de la cuenta</h1>

        <div>
          {msg && <Alerta alerta={alerta}/>}
        
          {cuentaConfirmada && (
              <Link
              className='text-slate-500 block text-center my-14'
              to={'/'}
              ><span className='font-semibold'>Inicia sesión</span></Link>
          )}
        </div>
    </>
  )
}

export default ConfirmarCuenta