import React, { useEffect } from 'react' //Importamos React y hook useEffect
import Nuestracarta from '../components/Nuestracarta' //Componente de la carta de pizzas
import Ofertas from '../components/Ofertas' //Componente de ofertas
import UbicacionDomicilio from '../components/UbicacionDomicilio' //Componente con ubicación y domicilio

export default function Home() {
  
  useEffect(()=>{
    document.title = 'Home' //Cambiamos el título de la página
  })

  return (
    <div className="mt-[80px] lg:mt-[100px]">
      {/* BANNER */}
      <div className="w-full flex justify-center items-center">
        <img
          src="./banner.png" //Imagen principal
          alt="Banner"
          className="w-full xl:h-[45rem]"
        />
      </div>

      {/* Sección de ofertas */}
      <Ofertas></Ofertas>

      {/* Sección de nuestra carta */}
      <Nuestracarta></Nuestracarta>

      {/* Sección de ubicación y domicilio */}
      <UbicacionDomicilio></UbicacionDomicilio>
    </div>
  )
}
