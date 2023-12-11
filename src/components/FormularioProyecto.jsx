import { useState, useEffect } from 'react'
import useProyectos from '../hooks/useProyectos'
import Alerta from './Alerta'
import { useParams } from 'react-router-dom'


const FormularioProyecto = () => {

    const [id, setId] = useState(null)
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [cliente, setCliente] = useState('')

    const params = useParams()
    const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos()

    useEffect(() => {
        if(params.id) {
            setId(proyecto._id)
            setNombre(proyecto.nombre)
            setDescripcion(proyecto.descripcion)
            setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
            setCliente(proyecto.cliente)
        }
    }, [params])
    

    

    const handleSubmit = async e => {
        e.preventDefault()

        if([nombre, descripcion, fechaEntrega, cliente].includes('')) {
            mostrarAlerta({
                msg: 'Todos los campos obligatorios',
                error: true
            })

            return
        }

        //Pasar los datos hacia el provider
        await submitProyecto({ id, nombre, descripcion, fechaEntrega, cliente })

        setId(null)
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setCliente('')
    }

    const { msg } = alerta

  return (
    <form onSubmit={handleSubmit} className={`bg-white rounded-xl shadow-2xl shadow-slate-200 w-full sm:w-2/3 md:w-4/5 lg:w-2/3 xl:w-1/2 max-w-lg px-7 sm:px-12 py-3 sm:py-8 ${msg && '!pt-0'}`}>

        {msg && <Alerta alerta={alerta}/>}

        <div className='my-5'>
            <label
                htmlFor='nombre'
                className='block text-slate-600 font-semibold'
            >Nombre del Poyecto</label>

            <input
                id='nombre'
                type='text'
                placeholder='Define un nombre'
                className='w-full mt-2 p-3 border rounded bg-slate-50'
                value={nombre}
                onChange={e => setNombre(e.target.value)}
            />
        </div>

        <div className='my-5'>
            <label
                htmlFor='descripcion'
                className='block text-slate-600 font-semibold'
            >Descripción</label>

            <textarea
                id='descripcion'
                placeholder='Añade una descripción del proyecto'
                className='w-full mt-2 p-3 border rounded bg-slate-50'
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
            />
        </div>

        <div className='my-5'>
            <label
                htmlFor='fecha-entrega'
                className='block text-slate-600 font-semibold'
            >Fecha de entrega</label>

            <input
                id='fecha-entrega'
                type='date'
                className='w-full mt-2 p-3 border rounded bg-slate-50'
                value={fechaEntrega}
                onChange={e => setFechaEntrega(e.target.value)}
            />
        </div>

        <div className='my-5'>
            <label
                htmlFor='cliente'
                className='block text-slate-600 font-semibold'
            >Cliente</label>

            <input
                id='cliente'
                type='text'
                placeholder='Nombre del cliente'
                className='w-full mt-2 p-3 border rounded bg-slate-50'
                value={cliente}
                onChange={e => setCliente(e.target.value)}
            />
        </div>

        <input
            type='submit'
            value={id ? 'Actualizar Proyecto' : 'Crear Proyecto'}
            className='bg-blue-600 w-full py-3 text-white rounded my-5 font-semibold tracking-wider uppercase hover:cursor-pointer hover:bg-blue-700 transition-colors'
        />
    </form>
  )
}

export default FormularioProyecto