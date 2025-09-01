import React, { useState } from 'react'


export default function UbicacionDomicilio() {

  const [form,setForm] = useState({
    nombreDestinatario: '',
    domicilio: '',
    localidad: '',
    codigoPostal: '',
    puerta:''
  })

  const obtenerPizzas =()=>{
    const pizzas = []

    for (let i = 0; i < localStorage.length; i++) {
      const clave = localStorage.key(i)

      const valor = JSON.parse(localStorage.getItem(clave))

      if (clave.startsWith('pizza_')) {
        pizzas.push({nombre:clave.slice(6), cantidad:valor})
      }
    }

    return pizzas
  }


  const handleForm = (e)=>{

    e.preventDefault()

    const cartData = obtenerPizzas()

    if (cartData.length>0) {
      const body = {
        ...form,
        cart: cartData
      }

      fetch('http://localhost:5000/finalizarCompra',{
        method:'POST',
        credentials:'include',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      })
      .then(res=>res.json())
      .then(data=>{alert(data.message)})
      .catch(error=>{alert(error)})
    }else{
      alert('Tu carrito está vacío')
    }


  }

  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }


  
    



  return (
    <div id='ubicacion' className='scroll-mt-28 bg-black text-white flex justify-center items-center flex-col lg:flex-row lg:items-stretch p-6 gap-12 lg:gap-[100px]'>

        <div className='flex flex-col justify-center items-center gap-4'>
          <h2 className='text-[25px] font-bold'>UBICACIÓN Y HORARIOS</h2>
          <p className=''>Encuéntranos en Calle Manzaneda 123</p>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509!2d144.953735315904!3d-37.81627974202174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ5JzAwLjYiUyAxNDTCsDU3JzEzLjQiRQ!5e0!3m2!1ses!2s!4v1618365925675!5m2!1ses!2s" 
            className='w-full h-full sm:w-[40rem] lg:w-full sm:h-[40rem] lg:h-full'
            allowfullscreen="" 
            loading="lazy">
          </iframe>
          <p>Abierto Lunes a Domingo: 12:00 PM - 11:00 PM</p>
        </div>

        <div className="flex flex-col gap-6 lg:w-[30%]">

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-[25px]">PIZZAS CLÁSICAS</h3>
            <p>
              Disfruta de las pizzas tradicionales desde la Margarita hasta la
              Cuatro Quesos, elaboradas con ingredientes de la más alta calidad.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-[25px]">ESPECIALIDADES DE LA CASA</h3>
            <p>
              Explora nuestras pizzas únicas creadas con combinaciones originales
              de sabores que deleitarán tu paladar.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-[25px]">OPCIONES VEGANAS</h3>
            <p>
              También ofrecemos opciones especiales para los amantes de lo
              vegetal, para que disfrutes de un platillo único.
            </p>
          </div>
        </div>



        <form onSubmit={handleForm} className='flex flex-col gap-4 lg:w-[30%]'>
          <h3 className='font-bold text-[22px]'>INTRODUCE TU DOMICILIO PARA QUE PODAMOS ACUDIR Y ENTREGARTE EL PEDIDO</h3>
          <input value={form.nombreDestinatario} onChange={handleChange} required className='bg-white text-black rounded px-8 py-2 placeholder:text-black font-bold' type="text" name="nombreDestinatario" id="" placeholder='Nombre de destinatario'/>
          <input value={form.domicilio} onChange={handleChange} required className='bg-white text-black rounded px-8 py-2 placeholder:text-black font-bold' type="text" name="domicilio" id="" placeholder='Domicilio'/>
          <input value={form.localidad} onChange={handleChange} required className='bg-white text-black rounded px-8 py-2 placeholder:text-black font-bold' type="text" name="localidad" id="" placeholder='Localidad'/>
          <input value={form.codigoPostal} onChange={handleChange} required className='bg-white text-black rounded px-8 py-2 placeholder:text-black font-bold' type="number" name="codigoPostal" id="" placeholder='Código postal'/>
          <input value={form.puerta} onChange={handleChange} required className='bg-white text-black rounded px-8 py-2 placeholder:text-black font-bold' type="text" name="puerta" id="" placeholder='Puerta'/>
          <button className='bg-[#0f3d1c] hover:bg-red-700 text-white font-bold px-6 py-3 rounded-full shadow-lg 
                  transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl'>Enviar</button>
        </form>


      </div>

  )
}
