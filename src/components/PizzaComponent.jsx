import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function PizzaComponent({pizza}) {

    const navigate = useNavigate()

    const logginCheck = ()=>{
        fetch('http://localhost:5000/me',{
            method:'GET',
            credentials:'include'
        })
        .then(res=>res.json())
        .then(data=>{
            if (!data.loggedIn) {
                navigate('/login')
            }
        }).catch(error=>{alert(error)})
    }

    const addCart = ()=>{
        logginCheck()
        
        fetch(`http://localhost:5000/cart/addOne/${pizza.id}`,{
            method:'GET',
            credentials:'include'
        })
        .then(res=>res.json())
        .then(data=>{alert(data.message);})
        .catch(error=>{alert(error)})

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

                <button onClick={addCart} className='cursor-pointer bg-[#0f3d1c] hover:bg-red-700 text-white font-bold px-6 py-3 rounded-full shadow-lg 
                  transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl'>Añadir al carrito <i className="fa-solid fa-cart-shopping"></i></button>

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
