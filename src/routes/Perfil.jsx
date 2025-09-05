import React, { useEffect, useState } from 'react' //Importamos React y hooks
import { useNavigate } from 'react-router-dom' //Para navegar entre rutas
import { useAppContext } from '../context/AppContext' //Contexto global para usuario y pedidos

export default function Perfil() {
  const navigate = useNavigate() //Hook para redireccionar
  const { pedidos, setPedidos } = useAppContext() //Pedidos del usuario y función para actualizar
  const [loading, setLoading] = useState(true) //Estado de carga
  const {user,setUser} = useAppContext() //Usuario logueado y función para actualizar

  //Función para obtener pedidos del usuario
  const fetchPedidos = () => {
    fetch('http://localhost:5000/obtenerPedidos', {
      credentials: 'include',
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        console.log('la data:', data.message)
        setPedidos(data.message || []) //Guardamos los pedidos o array vacío
      })
      .catch(err => {
        console.error(err)
      })
      .finally(() => setLoading(false)) //Indicamos que terminó la carga
  }

  useEffect(() => {
    //Verificamos si el usuario está logueado
    fetch('http://localhost:5000/me', {
      credentials: 'include',
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        if (!data.loggedIn) {
          navigate('/login') //Si no está logueado, redirigimos a login
        }
      })
      .catch(err => {
        console.error(err)
        navigate('/login') //Si hay error, redirigimos a login
      })

    fetchPedidos() //Obtenemos los pedidos del usuario
  }, [])

  if (loading) {
    return <div className="mt-[100px] p-6">Cargando tus pedidos...</div> //Mostrar mensaje de carga
  }

  return (
    <div className="mt-[100px] p-6">
       {/* Información del usuario */}
       <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-2xl shadow-lg mb-12">
        <h1 className="text-3xl font-extrabold mb-2">
          {user ? `Bienvenido, ${user.username}! 👋` : 'Sesión cerrada'}
        </h1>
        {user && (
          <p className="text-lg text-blue-100">
            Email: <span className="font-semibold">{user.email}</span>
          </p>
        )}
      </div>

      {/* Título de pedidos */}
      <h1 className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#1F3A93] via-[#3B82F6] to-[#7C3AED] animate-pulse mb-4">Mis Pedidos</h1>

      {/* Si no hay pedidos */}
      {pedidos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32">
        <h2 className="text-5xl lg:text-6xl font-extrabold text-blue-800 mb-4 animate-pulse">
          😢 No tienes pedidos aún
        </h2>
        <p className="text-xl text-blue-600 mb-6">
          Cuando hagas tu primer pedido, aparecerá aquí.
        </p>
        <button
          onClick={() => navigate('/')} //Volver al inicio
          className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
        >
          Volver al inicio 🍕
        </button>
      </div>
      ) : (
        // Si hay pedidos, los mostramos
        pedidos.map((data, index) => (
          <div
            key={index}
            className="border p-4 mb-6 rounded-xl shadow-md bg-white"
          >
            <h2 className="font-extrabold text-2xl lg:text-3xl text-blue-900 mt-2 mb-2">
              Pedido N-{data.pedido.numero_pedido.replace('undefined','90')} - {data.pedido.fecha_compra.split('T')[0]}
            </h2>
            
            <p className="font-bold text-xl text-blue-800 mb-2">Total: {data.pedido.precio_total}€</p>

            {/* Dirección de envío */}
            <div className="mb-4">
              <h3 className="font-extrabold text-2xl lg:text-3xl text-blue-900 mt-2 mb-2">Dirección de envío:</h3>
              <p>Nombre del destinatario: {data.pedido.nombre_destinatario}</p>
              <p>Domicilio: {data.pedido.domicilio}, {data.pedido.puerta}</p>
              <p>Localidad: {data.pedido.localidad} - Código Postal: {data.pedido.codigo_postal}</p>
            </div>

            {/* Detalles de cada pizza */}
            <h3 className="font-semibold">Detalles:</h3>
            <ul className="space-y-2 mt-2">
              {data.detalles_pedido.map((detalle, i) => (
                <li
                  key={i}
                  className="flex items-center space-x-4 border-b pb-2"
                >
                  <img
                    src={detalle.imagen} //Imagen de la pizza
                    alt={detalle.nombre}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-extrabold text-blue-900">{detalle.nombre}</p>
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
