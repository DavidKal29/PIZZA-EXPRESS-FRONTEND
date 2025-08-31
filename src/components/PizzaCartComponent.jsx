import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function PizzaComponent({pizza}) {

   const navigate = useNavigate()
   const {setCart} = useAppContext()
   const {cart} = useAppContext()
   
    const fetchCart = ()=>{
        fetch('http://localhost:5000/cart',{credentials:'include'})
        .then(res=>res.json())
        .then(data=>setCart(data.cart))
        .catch(error=>{console.error('El error:',error);})
    }


   const addCart = ()=>{
        
        fetch(`http://localhost:5000/cart/addOne/${pizza.id_pizza}`,{
            method:'GET',
            credentials:'include'
        })
        .then(res=>res.json())
        .then(data=>{alert(data.message);fetchCart()})
        .catch(error=>{alert(error)})

    }
    


  return (
    <div
        className="flex relative flex-col xl:flex-row items-start border rounded-2xl p-4 shadow-md mt-[200px]"
    >
        <div className="flex flex-col">
            <h3 className="font-bold text-[22px]">{pizza.nombre.toUpperCase()}</h3>
            <p className="font-bold mt-2 text-[20px] absolute bottom-2">{pizza.precio_total}€</p>
            <button className='cursor-pointer' onClick={addCart}>+</button>
            <span>{pizza.cantidad}</span>
            <button>-</button>
        </div>
        
        <img
            src={pizza.imagen}
            alt={pizza.nombre}
            className="w-full lg:w-[50%] object-contain"
        />
    
    </div>
  )
}
