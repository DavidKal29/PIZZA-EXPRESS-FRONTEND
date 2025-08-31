import React, { use, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function PizzaComponent({pizza}) {

    const navigate = useNavigate()

    const {user,setUser} = useAppContext()

    const [counter,setCounter] = useState(JSON.parse(localStorage.getItem(`counter_${pizza.id}`))||0)

    const incrementar = ()=>{
        if (counter!=50) {
            const new_counter = counter + 1

            localStorage.setItem(`counter_${pizza.id}`,JSON.stringify(new_counter))
            setCounter(new_counter)
        }
    }

    const decrementar = ()=>{
        if (counter>0) {
            const new_counter = counter - 1

            localStorage.setItem(`counter_${pizza.id}`,JSON.stringify(new_counter))
            setCounter(new_counter)
        }
    }


  return (
    <div
        className="flex relative flex-col xl:flex-row items-start border rounded-2xl p-4 shadow-md"
    >
        <div className="flex flex-col">
            <h3 className="font-bold text-[22px]">{pizza.nombre.toUpperCase()}</h3>
                <p className="text-sm text-gray-700">
                    {pizza.ingredientes[0].toUpperCase()}{pizza.ingredientes.slice(1)}.
                </p>

                {user ? 
                    (
                        counter==0 ? 
                            (<button onClick={incrementar}>Añadir al carrito</button>) 
                            
                            : 
                            
                            (<div><button onClick={incrementar}>+</button>{counter}<button onClick={decrementar}>-</button></div>)
                    
                    ) 
                    
                    : 
                    
                    (<></>)
                    
                }

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
