import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useProyectos from '../hooks/useProyectos'

const ModalEliminarTarea = () => {
 
    const { modalEliminarTarea, handleModalEliminarTarea, eliminarTarea } = useProyectos()

    return (
        <Transition.Root show={modalEliminarTarea} as={Fragment}>
            <Dialog as='div' className='fixed z-10 inset-0 overflow-y-auto' onClose={handleModalEliminarTarea}>
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
                                    className='bg-white rounded text-slate-400 hover:text-slate-500 focus:outline-none'
                                    onClick={handleModalEliminarTarea}
                                >
                                <span className='sr-only'>Cerrar</span>
                                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                                        <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                                    </svg>
                                </button>
                            </div>


                            <div className='sm:flex sm:items-start'>
                                <div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                                    <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 text-red-600' viewBox='0 0 20 20' fill='currentColor'>
                                        <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
                                    </svg>
                                </div>
                                <div className='mt-3 text-left sm:mt-0 w-full ml-4'>
                                    <Dialog.Title as='h3' className='text-2xl leading-6 font-normal text-slate-900'>
                                        Eliminar Tarea
                                    </Dialog.Title>
                                    <div className='my-5 text-slate-500'>
                                            ¿Seguro que quiere eliminar esta tarea? <br />Esta acción no podrá deshacerse.
                                    </div>
                                </div>
                            </div>
                            <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
                                <button
                                    type='button'
                                    className='w-full inline-flex justify-center rounded border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm tracking-wide'
                                    onClick={eliminarTarea}
                                >
                                    Eliminar
                                </button>
                                <button
                                    type='button'
                                    className='mt-3 w-full inline-flex justify-center rounded px-4 py-2 font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm tracking-wide'
                                    onClick={handleModalEliminarTarea}
                                > Cancelar</button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ModalEliminarTarea