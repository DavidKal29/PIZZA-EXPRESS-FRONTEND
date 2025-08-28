import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'

export default function Nuestracarta() {

  const {pizzas} = useAppContext()

  const {setPizzas} = useAppContext()

  const fetchPizzas = ()=>{
    fetch('http://localhost:5000/pizzas')
    .then(res=>res.json())
    .then(data=>setPizzas(data))
    .catch(error=>{console.error('El error:',error);})
  }


  useEffect(() => {
    document.title = 'Nuestra Carta'

    fetchPizzas()
  },[])

  console.log('Las pizzas:',pizzas);

  return (
    <>
      {/* Nuestra Carta */}
      <div id='carta' className="scroll-mt-28 flex flex-col lg:flex-row justify-center items-stretch mx-6 my-12 gap-12">
        {/* TEXTOS DE INTRODUCCIÓN */}
        <div className="flex flex-col gap-6 lg:w-1/2">
          <h1 className="font-bold text-[30px]">
            NUESTRO MENÚ: UN VIAJE A TRAVÉS DE LOS SABORES MÁS EXQUISITOS
          </h1>

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

        {/* PIZZAS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {pizzas.map((pizza, i) => (
            <div
              key={i}
              className="flex relative flex-col xl:flex-row items-start border rounded-2xl p-4 shadow-md"
            >
              <div className="flex flex-col">
                <h3 className="font-bold text-[22px]">{pizza.nombre.toUpperCase()}</h3>
                <p className="text-sm text-gray-700">
                  {pizza.ingredientes[0].toUpperCase()}{pizza.ingredientes.slice(1)}.
                </p>
                <p className="font-bold mt-2 text-[20px] absolute bottom-2">{pizza.precio}€</p>
              </div>
              <img
                src={pizza.imagen}
                alt={pizza.nombre}
                className="w-full lg:w-[50%] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
      
    </>
  )
}
