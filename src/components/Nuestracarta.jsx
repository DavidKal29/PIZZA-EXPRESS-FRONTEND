import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext.jsx' //Contexto global para pizzas
import PizzaComponent from './PizzaComponent.jsx' //Componente para mostrar cada pizza

export default function Nuestracarta() {
  const { pizzas, setPizzas } = useAppContext() //Estado global de pizzas

  //Función para traer las pizzas del backend
  const fetchPizzas = () => {
    fetch('https://pizzaexpressbackend.onrender.com/pizzas', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setPizzas(data)) //Guardamos las pizzas en el estado global
      .catch(error => console.error('El error:', error)) //Errores en consola
  }

  useEffect(() => {
    document.title = 'Nuestra Carta' //Cambiar título de la página
    fetchPizzas() //Traer las pizzas al cargar el componente
  }, [])

  return (
    <div id='carta' className="scroll-mt-28 mt-24 mb-12 flex flex-col items-center gap-12 px-6 lg:px-12">
      
      {/* Título */}
      <h1 className='text-4xl lg:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#1F3A93] via-[#3B82F6] to-[#7C3AED] animate-pulse'>
        Nuestra Carta
      </h1>

      {/* Grid de pizzas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-stretch w-full">
        {pizzas.map((pizza, i) => (
          <PizzaComponent key={i} pizza={pizza} /> //Renderizamos cada pizza
        ))}
      </div>
    </div>
  )
}
