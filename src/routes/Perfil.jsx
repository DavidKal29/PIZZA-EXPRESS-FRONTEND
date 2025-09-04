import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'



export default function Perfil() {
  const navigate = useNavigate()
  const { pedidos, setPedidos } = useAppContext()
  const [loading, setLoading] = useState(true)
  const {user,setUser} = useAppContext()

  const fetchPedidos = () => {
    fetch('http://localhost:5000/obtenerPedidos', {
      credentials: 'include',
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        console.log('la data:', data.message)
        setPedidos(data.message || [])
      })
      .catch(err => {
        console.error(err)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetch('http://localhost:5000/me', {
      credentials: 'include',
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        if (!data.loggedIn) {
          navigate('/login')
        }
      })
      .catch(err => {
        console.error(err)
        navigate('/login')
      })

    fetchPedidos()
  }, [])

  if (loading) {
    return <div className="mt-[100px] p-6">Cargando tus pedidos...</div>
  }

  return (
    <div className="mt-[100px] p-6">
      <h1>{user ? `BIENVENIDO ${user.username}` : "Sesión cerrada"}</h1>


      <h1 className="text-3xl font-bold mb-6">Mis Pedidos</h1>

      {pedidos.length === 0 ? (
        <p>No tienes pedidos aún.</p>
      ) : (
        pedidos.map((data, index) => (
          <div
            key={index}
            className="border p-4 mb-6 rounded-xl shadow-md bg-white"
          >
            <h2 className="font-bold text-xl mb-2">
              Pedido N-{data.pedido.numero_pedido.replace('undefined','90')} - {data.pedido.fecha_compra.split('T')[0]}
            </h2>
            <p className="mb-2">Total: {data.pedido.precio_total}€</p>

            <h3 className="font-semibold">Detalles:</h3>
            <ul className="space-y-2 mt-2">
              {data.detalles_pedido.map((detalle, i) => (
                <li
                  key={i}
                  className="flex items-center space-x-4 border-b pb-2"
                >
                  <img
                    src={detalle.imagen}
                    alt={detalle.nombre}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-bold">{detalle.nombre}</p>
                    <p>
                      {detalle.cantidad} x {detalle.precio_unitario}€ = {detalle.precio}€
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  )
}
