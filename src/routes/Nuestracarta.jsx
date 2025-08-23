import React, { useEffect } from 'react'

export default function Nuestracarta() {

  useEffect(() => {
    document.title = 'Nuestra Carta'
  })

  return (
    <>
      {/* Nuestra Carta */}
      <div className="flex flex-col lg:flex-row justify-center items-stretch mx-6 my-12 gap-12">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col lg:flex-row items-start gap-4 border rounded-2xl p-4 shadow-md"
            >
              <div className="flex flex-col">
                <h3 className="font-bold text-[22px]">PIZZA PEPPERONI</h3>
                <p className="text-sm text-gray-700">
                  Pepperoni, queso, tomate.
                </p>
                <p className="font-bold mt-2">14.99€</p>
              </div>
              <img
                src="https://www.dominospizza.es/images/Burger_B5250609_0_ES.png"
                alt="Pizza Pepperoni"
                className="w-full lg:w-1/3 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
