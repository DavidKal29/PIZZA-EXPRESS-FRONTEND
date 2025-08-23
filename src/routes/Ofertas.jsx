import React from 'react'

export default function Ofertas() {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-6 my-6 lg:my-24">
        <h1 className='font-bold mx-6 text-[30px]'>OFERTAS ESPECIALES: ¡APROVECHA NUESTRAS PROMOCIONES!</h1>
        <p className='mx-6 text-[20px]'>OBTÉN UN <strong>20% DE DESCUENTO</strong> EN TU PRIMERA VISITA</p>
        
        <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-6'>
          <img src="./fotos/foto1.avif" alt="" className='rounded sm:w-[25rem] sm:h-[20rem] lg:w-[20rem] lg:h-[15rem]' />
          <img src="./fotos/foto2.jpeg" alt="" className='rounded sm:w-[25rem] sm:h-[20rem] lg:w-[20rem] lg:h-[15rem]' />
          <img src="./fotos/foto3.avif" alt="" className='rounded sm:w-[25rem] sm:h-[20rem] lg:w-[20rem] lg:h-[15rem]' />
          <img src="./fotos/foto4.png" alt="" className='rounded sm:w-[25rem] sm:h-[20rem] lg:w-[20rem] lg:h-[15rem]' />
        </div>

        <a href="/register" 
          class="bg-[#0f3d1c] hover:bg-red-700 text-white font-bold px-6 py-3 rounded-full shadow-lg 
                  transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
          🍕 Regístrate
        </a>


    </div>
  )
}
