import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'

export default function PizzaComponent({ pizza }) {
    const { user } = useAppContext()
    const [counter, setCounter] = useState(
        JSON.parse(localStorage.getItem(`pizza_${pizza.nombre}`)) || 0
    )

    const incrementar = () => {
        if (counter < 5) {
            const newCounter = counter + 1
            localStorage.setItem(`pizza_${pizza.nombre}`, JSON.stringify(newCounter))
            setCounter(newCounter)
        }
    }

    const decrementar = () => {
        if (counter > 0) {
            const newCounter = counter - 1
            localStorage.setItem(`pizza_${pizza.nombre}`, JSON.stringify(newCounter))
            setCounter(newCounter)
        }
    }

    const formattedIngredientes =
        pizza.ingredientes[0].toUpperCase() + pizza.ingredientes.slice(1)

    return (
        <div className="border rounded-2xl p-4 flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow bg-white h-full">
            <div className="flex flex-col items-center gap-3">
                <img
                    src={pizza.imagen}
                    alt={pizza.nombre}
                    className="w-full"
                />
                <h3 className="font-bold text-[24px] text-center text-gray-800">
                    {pizza.nombre.toUpperCase()}
                </h3>
                <p className="text-gray-600 text-[14px] text-center">{formattedIngredientes}</p>
                <p className="font-bold text-lg text-gray-800">{pizza.precio}€</p>
            </div>

            {user && (
                <div className="mt-4 w-full flex flex-col items-center">
                    {counter === 0 ? (
                        <button
                            className="bg-[#1F3A93] cursor-pointer text-white rounded-lg p-2 w-full hover:bg-[#162d70] transition"
                            onClick={incrementar}
                        >
                            Añadir al carrito
                        </button>
                    ) : (
                        <div className="flex flex-col items-center gap-2 w-full">
                            <div className="flex justify-center items-center gap-4">
                                <button
                                    className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold hover:bg-gray-300 transition cursor-pointer"
                                    onClick={decrementar}
                                >
                                    -
                                </button>
                                <p className="font-bold text-lg">{counter}</p>
                                <button
                                    className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold hover:bg-gray-300 transition cursor-pointer"
                                    onClick={incrementar}
                                >
                                    +
                                </button>
                            </div>
                            <p className="font-bold text-gray-800">
                                Precio Total: {(pizza.precio * counter).toFixed(2)}€
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
