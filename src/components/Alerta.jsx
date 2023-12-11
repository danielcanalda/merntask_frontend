
const Alerta = ({alerta}) => {
  return (
    <div className={`${alerta.error ? 'bg-red-100 text-red-500 border-red-200' : 'bg-green-100 border-green-200 text-green-600'} border text-center py-3 px-5 rounded font-normal mt-10 mb-5`}>{alerta.msg}</div>
  )
}

export default Alerta