import { useEffect } from 'react'
import FormularioColaborador from '../components/FormularioColaborador'
import useProyectos from '../hooks/useProyectos'
import { useParams } from 'react-router-dom'
import Cargando from '../components/Cargando'
import Alerta from '../components/Alerta'


const NuevoColaborador = () => {

  const params = useParams()
  
  const { obtenerProyecto, proyecto, cargando, colaborador, agregarColaborador, alerta } = useProyectos()

  useEffect(() => {
    obtenerProyecto(params.id)
  }, [])

  if(!proyecto?._id) return (
    <Alerta alerta={alerta} />
  )

  return (
    <>
        <h1 className='font-normal text-3xl text-slate-900'>Añadir Colaborador</h1>
        <p className='text-slate-400 mt-1'>Proyecto: {proyecto.nombre}</p>
        <div className='mt-10 flex justify-center'>
            <FormularioColaborador />
        </div>

        {/* cargando ? <p className='text-center text-slate-500 mt-10'>Cargando resultados...</p> :  */colaborador._id && (
          <div className='flex justify-center mt-10'>
            <div className='bg-white rounded 0 w-full sm:w-2/3 md:w-4/5 lg:w-2/3 xl:w-1/2 max-w-lg px-7 sm:px-12 py-3 sm:py-8 sm:flex sm:gap-5 sm:items-center'>
              <h2 className='mb-5 sm:mb-0 text-slate-600 font-semibold'>Resultado: <span className='font-normal'>{colaborador.nombre}</span></h2>
              <button
                  type='button'
                  className='text-sm px-5 py-3 w-full md:w-auto rounded tracking-wide font-medium text-blue-600 bg-blue-100 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 block ml-auto mr-0'
                  onClick={() => agregarColaborador({
                    email: colaborador.email
                  })}
              >Agregar al proyecto</button>
            </div>
          </div>
        )}
    </>
  )
}

export default NuevoColaborador