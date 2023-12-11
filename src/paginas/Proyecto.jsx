import { useParams, Link } from 'react-router-dom'
import useProyectos from '../hooks/useProyectos'
import useAdmin from '../hooks/useAdmin'
import { useEffect } from 'react'
import ModalFormularioTarea from '../components/ModalFormularioTarea'
import ModalEliminarTarea from '../components/ModalEliminarTarea'
import ModalEliminarColaborador from '../components/ModalEliminarColaborador'
import Tarea from '../components/Tarea'
import Alerta from '../components/Alerta'
import Cargando from '../components/Cargando'
import Colaborador from '../components/Colaborador'
import io from 'socket.io-client'
let socket

const Proyecto = () => {

  const params = useParams()
  const { obtenerProyecto, proyecto, cargando, handleModalTarea, modalFormularioTarea, alerta, submitTareasProyecto, eliminarTareaProyecto, actualizarTareaProyecto, cambiarEstadoTarea } = useProyectos()
 
  const admin = useAdmin()

  useEffect(() => {
    obtenerProyecto(params.id)
  }, [])

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
    socket.emit('abrir proyecto', params.id)
  }, [])

  useEffect(() => {
    socket.on('tarea agregada', tareaNueva => {
      if(tareaNueva.proyecto === proyecto._id) {
        submitTareasProyecto(tareaNueva)
      }
    })

    socket.on('tarea eliminada', tareaEliminada => {
      if(tareaEliminada.proyecto === proyecto._id) {
        eliminarTareaProyecto(tareaEliminada)
      }
    })

    socket.on('tarea actualizada', tareaActualizada => {
      if(tareaActualizada.proyecto._id === proyecto._id) {
        actualizarTareaProyecto(tareaActualizada)
      }
    })

    socket.on('nuevo estado', nuevoEstado => {
      if(nuevoEstado.proyecto._id === proyecto._id) {
        cambiarEstadoTarea(nuevoEstado)
      }
    })
  })
  
  const { nombre } = proyecto

  if(cargando) return (
    <Cargando />
  )

  const { msg } = alerta

  return (
    <>
      <div className='flex justify-between gap-5'>
        <h1 className='font-normal text-3xl text-slate-900'>{nombre}</h1>
        {admin && (
        <div className='flex items-center gap-1 text-slate-500 font-medium hover:text-slate-800'>
          <Link
            to={`/proyectos/editar/${params.id}`}
            className='text-sm font-semibold flex items-center gap-1'
          >Editar
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
            </svg>
          </Link>
        </div>
        )}
      </div>
      {admin && (
      <button
        type='button'
        className='text-sm px-5 py-3 w-full md:w-auto rounded mt-5 tracking-wide flex gap-1 items-center font-medium text-blue-600 bg-blue-100 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 justify-center'
        onClick={handleModalTarea}
      >Nueva tarea
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
      )}

      <div className='flex flex-col xl:flex-row'>
          <div className='w-full xl:w-3/5 xl:pr-5'>
            <div className='flex sm:gap-5 flex-col sm:flex-row'>
              <p className='text-xl text-slate-600 mt-10'>Tareas del Proyecto</p>
              <div className='flex-1 relative'>
                <div className='sm:absolute -my-5 sm:top-1/2 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 sm:my-0 sm:max-w-xs sm:w-full'>
                  { (msg && !modalFormularioTarea) && <Alerta alerta={alerta}/> }
                </div>
              </div>
            </div>
            

            <div className='bg-white rounded border my-5'>
              {proyecto.tareas?.length ?
                proyecto.tareas?.map(tarea => (
                  <Tarea
                    key={tarea._id}
                    tarea={tarea}
                  />
                )) :
                <p className='text-center my-5 p-5 text-slate-500'>No hay tareas en este proyecto.</p>}
            </div>
          </div>
          {admin && (
          <div className='w-full xl:w-2/5'>
            <div className='flex items-center justify-between mt-10'>
              <p className='text-xl text-slate-600'>Colaboradores</p>
              <div className='flex items-center gap-1 text-slate-500 font-medium hover:text-slate-800'>
                <Link
                  to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
                  className='text-sm font-semibold flex items-center gap-1'
                >Añadir
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                </svg>
                </Link>
              </div>
            </div>

            
            <div className='bg-white rounded border my-5'>
              {proyecto.colaboradores?.length ?
                proyecto.colaboradores?.map(colaborador => (
                  <Colaborador
                    key={colaborador._id}
                    colaborador={colaborador}
                  />
                )) :
                <p className='text-center my-5 p-5 text-slate-500'>No hay colaboradores en este proyecto.</p>}
            </div>
          </div>
          )}
      </div>

      <ModalFormularioTarea />
      <ModalEliminarTarea />
      <ModalEliminarColaborador />
    </>
  )
}

export default Proyecto