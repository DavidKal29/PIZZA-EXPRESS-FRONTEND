import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import PizzaCartComponent from '../components/PizzaCartComponent.jsx'
import PizzaComponent from '../components/PizzaComponent.jsx'

export default function Carrito() {

    const {setUser} = useAppContext()
    const {setCart} = useAppContext()
    const {cart} = useAppContext()
    const navigate = useNavigate()

    const fetchCart = ()=>{
      fetch('http://localhost:5000/cart',{credentials:'include'})
      .then(res=>res.json())
      .then(data=>setCart(data.cart))
      .catch(error=>{console.error('El error:',error);setCart([])})
    }



    useEffect(()=>{
        document.title = 'Carrito'

        //Proteger ruta
        fetch("http://localhost:5000/me",{
          credentials:'include',
          method:'GET'
        }).then(res=>res.json()).then(data=>{
          if (data.user) {
            setUser(data.user)
          }else{
            navigate('/login')
          }
        })

        //Obtener los productos del carrito
        fetchCart()     
    },[])


    

  return (
    <div className=''>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
        {cart.map((pizza, i) => (
          <PizzaCartComponent key={i} pizza={pizza}></PizzaCartComponent>
        ))}
      </div>
    </div>
  )
}
