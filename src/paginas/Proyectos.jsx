import Alerta from '../components/Alerta'
import PreviewProyecto from '../components/PreviewProyecto'
import useProyectos from '../hooks/useProyectos'


const Proyectos = () => {

  const { proyectos, alerta } = useProyectos()

  const { msg } = alerta

  return (
    <>
      <div className='flex sm:gap-5 flex-col sm:flex-row'>
        <h1 className='font-normal text-3xl text-slate-900'>Proyectos</h1>
        <div className='flex-1 relative'>
          <div className='sm:absolute -my-5 sm:top-1/2 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 sm:my-0 sm:max-w-xs sm:w-full'>
            { msg && <Alerta alerta={alerta}/> }
          </div>
        </div>
      </div>

      <div className='bg-white rounded-xl shadow-2xl shadow-slate-200 mt-10'>
        {proyectos.length ?
          proyectos.map(proyecto => (
            <PreviewProyecto
              key={proyecto._id}
              proyecto={proyecto}
            />
          ))
        : <p className='mt-5 text-center text-slate-600 p-5'>No hay proyectos aún</p>}
      </div>
    </>
  )
}

export default Proyectos