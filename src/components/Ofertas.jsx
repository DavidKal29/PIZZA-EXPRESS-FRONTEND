import React from 'react'
import { useAppContext } from '../context/AppContext' //Contexto global para obtener el usuario

export default function Ofertas() {

  const {user} = useAppContext() //Obtenemos si hay usuario logueado

  return (
    <div 
      id='ofertas' 
      className="scroll-mt-28 w-full flex flex-col justify-center items-center gap-8
                 bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 p-6 shadow-xl"
    >
      {/* Título de la sección */}
      <h1 className='font-extrabold text-4xl lg:text-5xl text-center text-gradient bg-clip-text text-transparent 
                     bg-gradient-to-r from-[#1F3A93] via-[#3B82F6] to-[#7C3AED] animate-pulse'>
        OFERTAS ESPECIALES: ¡APROVECHA NUESTRAS PROMOCIONES!
      </h1>

      {/* Subtítulo con descuento */}
      <p className='text-xl lg:text-2xl text-center text-gray-800'>
        OBTÉN UN <strong className='text-blue-700'>20% DE DESCUENTO</strong> EN TU PRIMERA VISITA
      </p>

      {/* Grid de imágenes de las ofertas */}
      <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {["foto1.avif","foto2.jpeg","foto3.avif","foto4.png"].map((src, index) => (
          <div key={index} className="overflow-hidden rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500">
            <img 
              src={`./fotos/${src}`} 
              alt={`oferta ${index+1}`} 
              className="w-full h-60 sm:h-64 lg:h-56 object-cover"
            />
          </div>
        ))}
      </div>

      {/* Botón principal según si hay usuario logueado */}
      {user ? (
        <>
          <a 
            href="/#carta" 
            className="bg-gradient-to-r from-[#1F3A93] to-[#3B82F6] hover:from-[#2563EB] hover:to-[#7C3AED] 
                       text-white font-extrabold text-lg lg:text-xl px-8 py-4 rounded-full shadow-2xl 
                       transition-all duration-300 ease-in-out transform hover:scale-110 hover:rotate-1 hover:shadow-3xl"
          >
            🍕 Empezar a pedir
          </a>
        </>
      ) : (
        <>
          <a 
            href="/register" 
            className="bg-gradient-to-r from-[#1F3A93] to-[#3B82F6] hover:from-[#2563EB] hover:to-[#7C3AED] 
                       text-white font-extrabold text-lg lg:text-xl px-8 py-4 rounded-full shadow-2xl 
                       transition-all duration-300 ease-in-out transform hover:scale-110 hover:rotate-1 hover:shadow-3xl"
          >
            🍕 Regístrate
          </a>
        </>
      )}
    </div>
  )
}
