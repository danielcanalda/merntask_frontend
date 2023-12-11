import FormularioProyecto from "../components/FormularioProyecto"


const NuevoProyecto = () => {
    return (
        <>
          <h1 className='font-normal text-3xl text-slate-900'>Crear Proyecto</h1>
    
          <div className='mt-10 flex justify-center'>
            <FormularioProyecto />
          </div>
        </>
    )
}

export default NuevoProyecto