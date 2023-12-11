import { useState } from 'react'
import useProyectos from '../hooks/useProyectos'
import Alerta from './Alerta'

const FormularioColaborador = () => {

    const [email, setEmail] = useState('')

    const { mostrarAlerta, alerta, submitColaborador } = useProyectos()

    const handleSubmit = e => {
        e.preventDefault()

        if(email === '') {
            mostrarAlerta({
                msg: 'El email es obligatorio.',
                error: true
            })
            return
        }

        submitColaborador(email)
    }

    const { msg } = alerta

  return (

    <form onSubmit={handleSubmit} className={`bg-white rounded-xl shadow-2xl shadow-slate-200 w-full sm:w-2/3 md:w-4/5 lg:w-2/3 xl:w-1/2 max-w-lg px-7 sm:px-12 py-3 sm:py-8 ${msg && '!pt-0'}`}>

        {msg && <Alerta alerta={alerta}/>}

        <div className='my-5'>
            <label
                htmlFor='email'
                className='block text-slate-600 font-semibold'
            >Email</label>
            <input
                id='email'
                type='email'
                placeholder='johndoe@email.com'
                className='w-full mt-2 p-3 border rounded bg-slate-50'
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
        </div>
        

        <input
            type='submit'
            value={'Buscar Colaborador'}
            className='bg-blue-600 w-full py-3 text-white rounded my-5 font-semibold tracking-wider uppercase hover:cursor-pointer hover:bg-blue-700 transition-colors'
        />
    </form>
  )
}

export default FormularioColaborador