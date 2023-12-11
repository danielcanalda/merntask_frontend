import useProyectos from '../hooks/useProyectos'

const Colaborador = ({colaborador}) => {

    const {handleModalEliminarColaborador} = useProyectos()

  return (
    <div className='border-b last:border-b-0 p-5 flex gap-5 sm:flex-row flex-col sm:items-center'>
        <div className='flex flex-1 flex-col border-b pb-5 sm:pr-2 sm:border-b-0 sm:pb-0 border-slate-200 border-dashed'>
            <p className='text-lg text-slate-600 font-medium'>{colaborador.nombre}</p>
            <p className='grow text-slate-600 rounded text-sm'><span className='text-slate-400'>Email: </span>{colaborador.email}</p>
        </div>
        <div className='flex flex-col gap-2 justify-between sm:w-24'>
            <button
                type='button'
                className='text-sm py-2 w-full rounded tracking-wide font-medium text-red-600 bg-red-50 hover:bg-red-100 focus:outline-none'
                onClick={() => handleModalEliminarColaborador(colaborador)}
            >Eliminar</button>
        </div>
    </div>
  )
}

export default Colaborador