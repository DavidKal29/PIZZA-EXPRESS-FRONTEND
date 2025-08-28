import React from 'react'

export default function PizzaComponent({pizza}) {
  return (
    <div
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
  )
}
