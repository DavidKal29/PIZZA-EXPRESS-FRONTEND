import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext.jsx'
import PizzaComponent from './PizzaComponent.jsx'

export default function Nuestracarta() {

  const {pizzas} = useAppContext()

  const {setPizzas} = useAppContext()

  const fetchPizzas = ()=>{
    fetch('http://localhost:5000/pizzas',{credentials:'include'})
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
      <div id='carta' className="mt-[100px] mb-[50px] scroll-mt-28 flex flex-col justify-center items-stretch mx-6 gap-12">

        <h1 className='font-bold text-center text-[40px]'>Nuestra Carta</h1>

        {/* PIZZAS */}
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {pizzas.map((pizza, i) => (
            <PizzaComponent key={i} pizza={pizza}></PizzaComponent>
          ))}
        </div>
      </div>
      
    </>
  )
}
