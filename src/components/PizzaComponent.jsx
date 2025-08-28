import React, { useState } from 'react'





export default function PizzaComponent({pizza}) {
  
  const [counter,setCounter] = useState(1)

  const decrementar = ()=>{
    if (counter==1) {
        setCounter(1)
    }else{
        setCounter(counter-1)
    }
  }

  const incrementar = ()=>{
    setCounter(counter+1)
  }
  
  return (
    <div className="flex flex-col xl:flex-row items-start border rounded-2xl p-4 shadow-md relative bg-white">
      {/* Información de la pizza */}
      <div className="flex flex-col flex-1 mb-4 xl:mb-0 xl:mr-4 relative">
        <h3 className="font-bold text-[22px]">{pizza.nombre.toUpperCase()}</h3>
        <p className="text-sm text-gray-700 mb-8">
          {pizza.ingredientes[0].toUpperCase() + pizza.ingredientes.slice(1)}.
        </p>

        <div className="absolute bottom-2 flex items-center justify-between w-full">
          <p className="font-bold text-[20px]">{pizza.precio}€</p>

          <div className="flex items-center space-x-2">
            <button
              onClick={()=>{decrementar()}}
              className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              -
            </button>
            <span className="px-2">{counter}</span>
            <button
              onClick={()=>{incrementar()}}
              className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              +
            </button>
            <button
              className="ml-2 px-4 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Añadir
            </button>
          </div>
        </div>
      </div>

      {/* Imagen de la pizza */}
      <img
        src={pizza.imagen}
        alt={pizza.nombre}
        className="w-full lg:w-[50%] object-contain"
      />
    </div>
  )
}
