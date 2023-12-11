import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useProyectos from '../hooks/useProyectos'
import Alerta from './Alerta'
import { useParams } from 'react-router-dom'

const PRIORIDAD = ['Baja', 'Media', 'Alta']

const ModalFormularioTarea = () => {

    const [id, setId] = useState('')
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [prioridad, setPrioridad] = useState('')

    const params = useParams()

    const { modalFormularioTarea, handleModalTarea, mostrarAlerta, alerta, submitTarea, tarea } = useProyectos()

    useEffect(() => {
        if(tarea?._id) {
            setId(tarea._id)
            setNombre(tarea.nombre)
            setDescripcion(tarea.descripcion)
            setFechaEntrega(tarea.fechaEntrega?.split('T')[0])
            setPrioridad(tarea.prioridad)
            return
        }
        setId('')
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setPrioridad('')

    }, [tarea])

    const handleSubmit = async e => {
        e.preventDefault()

        if([nombre, descripcion, fechaEntrega, prioridad].includes('')) {
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        await submitTarea({ id, nombre, descripcion, fechaEntrega, prioridad, proyecto: params.id })
        
        setId('')
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setPrioridad('')

    }
 
    const { msg } = alerta

    return (
        <Transition.Root show={ modalFormularioTarea } as={Fragment}>
            <Dialog as='div' className='fixed z-10 inset-0 overflow-y-auto' onClose={handleModalTarea}>
                <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <Dialog.Overlay 
                            className='fixed inset-0 bg-slate-500 bg-opacity-75 transition-opacity' 
                        />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        enterTo='opacity-100 translate-y-0 sm:scale-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                        leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                    >
                            <div className='inline-block align-bottom bg-white rounded-xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle max-w-md w-full sm:p-6'>


                            <div className='hidden sm:block absolute top-0 right-0 pt-4 pr-4'>
                                <button
                                    type='button'
                                    className='bg-white rounded-md text-slate-400 hover:text-slate-500 focus:outline-none'
                                    onClick={handleModalTarea}
                                >
                                <span className='sr-only'>Cerrar</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                </button>
                            </div>


                            <div className='sm:flex sm:items-start'>
                                <div className='mt-3 text-left sm:mt-0 w-full'>
                                    <Dialog.Title as='h3' className='text-2xl leading-6 font-normal text-slate-900'>
                                        {id ? 'Editar Tarea' : 'Crear Tarea'}
                                    </Dialog.Title>
                                    
                                    {msg && <Alerta alerta={alerta}/>}

                                    <form onSubmit={handleSubmit} className={msg ? 'mt-0' : 'mt-10'}>
                                        <div className='mb-5'>
                                            <label
                                                htmlFor='nombre'
                                                className='block text-slate-600 font-semibold'
                                            >Nombre de la tarea</label>
                                            <input
                                                id='nombre'
                                                type='text'
                                                placeholder='Especifica un nombre'
                                                className='w-full mt-2 p-3 border rounded bg-slate-50'
                                                value={nombre}
                                                onChange={e => setNombre(e.target.value)}
                                            />
                                        </div>

                                        <div className='mb-5'>
                                            <label
                                                htmlFor='descripcion'
                                                className='block text-slate-600 font-semibold'
                                            >Descripción</label>
                                            <textarea
                                                id='descripcion'
                                                placeholder='Descripción de la tarea'
                                                className='w-full mt-2 p-3 border rounded bg-slate-50'
                                                value={descripcion}
                                                onChange={e => setDescripcion(e.target.value)}
                                            />
                                        </div>

                                        <div className='mb-5'>
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

                                        <div className='mb-5'>
                                            <label
                                                htmlFor='prioridad'
                                                className='block text-slate-600 font-semibold'
                                            >Prioridad</label>
                                            <select
                                                id='prioridad'
                                                className='w-full mt-2 p-3 border rounded bg-slate-50'
                                                value={prioridad}
                                                onChange={e => setPrioridad(e.target.value)}
                                            >
                                                <option value=''>-- Seleccionar --</option>
                                               {PRIORIDAD.map(opcion => (
                                                    <option key={opcion}>{opcion}</option>
                                               ))}
                                            </select>
                                        </div>

                                        <input
                                            type='submit'
                                            value={id ? 'Guardar' : 'Crear Tarea'}
                                            className='bg-blue-600 w-full py-3 text-white rounded my-5 font-semibold tracking-wider uppercase hover:cursor-pointer hover:bg-blue-700 transition-colors'
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ModalFormularioTarea