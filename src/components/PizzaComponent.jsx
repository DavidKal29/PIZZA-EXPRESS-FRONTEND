import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'

export default function PizzaComponent({ pizza }) {
    const { user } = useAppContext() //Obtenemos si hay usuario logueado para mostrar controles de carrito
    const [counter, setCounter] = useState(
        JSON.parse(localStorage.getItem(`pizza_${pizza.nombre}`)) || 0 //Estado inicial del contador guardado en localStorage
    )

    // Función para incrementar la cantidad de la pizza (máximo 5)
    const incrementar = () => {
        if (counter < 5) {
            const newCounter = counter + 1
            localStorage.setItem(`pizza_${pizza.nombre}`, JSON.stringify(newCounter))
            setCounter(newCounter)
        }
    }

    // Función para decrementar la cantidad de la pizza (mínimo 0)
    const decrementar = () => {
        if (counter > 0) {
            const newCounter = counter - 1
            localStorage.setItem(`pizza_${pizza.nombre}`, JSON.stringify(newCounter))
            setCounter(newCounter)
        }
    }

    // Formatea la cadena de ingredientes para que la primera letra esté en mayúscula
    const formattedIngredientes =
        pizza.ingredientes[0].toUpperCase() + pizza.ingredientes.slice(1)

    return (
        <div className="flex flex-col justify-between h-full bg-gradient-to-b from-blue-50 via-blue-100 to-indigo-50 
                        border-2 border-blue-300 rounded-3xl p-4 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-105">
            
            {/* Información de la pizza */}
            <div className="flex flex-col items-center gap-3">
                <img
                    src={pizza.imagen}
                    alt={pizza.nombre}
                    className="w-full"
                />
                <h3 className="font-extrabold text-2xl lg:text-3xl text-center text-blue-900 mt-2">
                    {pizza.nombre.toUpperCase()}
                </h3>
                <p className="text-center text-gray-700 text-sm lg:text-base italic">{formattedIngredientes}</p>
                <p className="font-bold text-xl text-blue-800">{pizza.precio}€</p>
            </div>

            {/* Controles de carrito solo si el usuario está logueado */}
            {user && (
                <div className="mt-4 w-full flex flex-col items-center">
                    {counter === 0 ? (
                        <button
                            className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white font-bold 
                                       rounded-full px-6 py-3 shadow-xl hover:scale-105 hover:shadow-2xl 
                                       transition-all duration-300 cursor-pointer"
                            onClick={incrementar}
                        >
                            Añadir al carrito
                        </button>
                    ) : (
                        <div className="flex flex-col items-center gap-3 w-full">
                            <div className="flex justify-center items-center gap-4">
                                {/* Botón para decrementar */}
                                <button
                                    className="bg-blue-200 rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold cursor-pointer hover:bg-blue-300 shadow-md hover:shadow-lg transition-all duration-300"
                                    onClick={decrementar}
                                >
                                    -
                                </button>
                                <p className="font-bold text-xl text-blue-900">{counter}</p>
                                {/* Botón para incrementar */}
                                <button
                                    className="bg-blue-200 rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold cursor-pointer hover:bg-blue-300 shadow-md hover:shadow-lg transition-all duration-300"
                                    onClick={incrementar}
                                >
                                    +
                                </button>
                            </div>
                            {/* Precio total según la cantidad */}
                            <p className="font-bold text-blue-800 text-lg">
                                Precio Total: {(pizza.precio * counter).toFixed(2)}€
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
