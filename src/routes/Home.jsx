import React, { useEffect } from 'react'
import Nuestracarta from '../components/Nuestracarta'
import Ofertas from '../components/Ofertas'
import UbicacionDomicilio from '../components/UbicacionDomicilio'

export default function Home() {
  
  useEffect(()=>{
    document.title = 'Home'
  })


  return (
    <div className="mt-[80px] lg:mt-[100px]">
      {/* BANNER */}
      <div className="w-full flex justify-center items-center">
        <img
          src="./banner.png"
          alt="Banner"
          className="w-full lg:h-[45rem] "
        />
      </div>

      {/* Ofertas */}
      <Ofertas></Ofertas>

      {/* Nuestra Carta */}
      <Nuestracarta></Nuestracarta>

      

      {/* Ubicacion y domicilio */}
      <UbicacionDomicilio></UbicacionDomicilio>

      
      

      

    </div>
  )
}
