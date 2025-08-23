import React, { useEffect } from 'react'
import Nuestracarta from './Nuestracarta'

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


      {/* Nuestra Carta */}
      <Nuestracarta></Nuestracarta>

    </div>
  )
}
