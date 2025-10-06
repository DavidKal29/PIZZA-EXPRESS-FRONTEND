import React, { useEffect, useState } from 'react' //Importamos React y hooks
import { useNavigate } from 'react-router-dom' //Para redireccionar entre rutas
import { useAppContext } from '../context/AppContext' //Contexto global de la app
import { toast } from 'sonner' //Para mostrar notificaciones

export default function Login() {
  const navigate = useNavigate() //Hook para navegar
  const { setUser } = useAppContext() //Función para guardar usuario en contexto

  useEffect(() => {
    document.title = 'Login' //Cambiamos título de la página

    //Verificamos si el usuario ya está logueado
    fetch(`${process.env.REACT_APP_API_URL}/me`, {
      credentials: 'include',
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        if (data.loggedIn) {
          navigate('/perfil') //Si está logueado, vamos al perfil
        }
      })
      .catch(err => {
        console.error(err)
        navigate('/login') //Si hay error, redirigimos a login
      })
  },[])

  //Estado del formulario
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
  })

  //Manejador de cambios en inputs
  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  //Manejador de envío del formulario
  const loginHandler = async e => {
    e.preventDefault() //Prevenimos recarga de página

    //Limpiamos y normalizamos datos
    const cleanedForm = {
      email: form.email.trim().toLowerCase().replace(/\s+/g, ''),
      username: form.username.trim().replace(/\s+/g, ''),
      password: form.password.trim(),
    }

    //Enviamos datos al backend
    const res = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cleanedForm),
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user) //Guardamos usuario en contexto
          navigate('/perfil') //Redirigimos al perfil después de login
        } else {
          toast.error(data.message) //Mostramos error si existe
          setUser(null)
        }
      })
      .catch(err => {
        console.error(err)
      })

    
  }

  return (
    <div className="flex justify-center items-center pt-[150px] pb-[50px] bg-gradient-to-r from-blue-600 to-blue-800 px-4">
      <form
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md flex flex-col gap-6"
        onSubmit={loginHandler} //Asignamos submit del formulario
      >
        <h1 className="text-3xl font-extrabold text-center text-blue-800">
          Iniciar Sesión
        </h1>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-semibold text-gray-600">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange} //Actualiza estado al escribir
            placeholder="Introduce tu email"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="text-sm font-semibold text-gray-600"
          >
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            autoComplete='off'
            value={form.password}
            onChange={handleChange} //Actualiza estado al escribir
            placeholder="Introduce tu contraseña"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Forgot password */}
        <div className="text-right">
          <a
            href="/forgotpassword"
            className="text-sm text-blue-600 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="cursor-pointer bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          Enviar
        </button>

        {/* No tienes cuenta */}
        <div className="text-center">
          <p className="text-sm text-blue-600">
            ¿No tienes cuenta? <a href="/register" className='text-blue-800 font-bold'>Crear Cuenta</a>
          </p>
        </div>
      </form>
    </div>
  )
}
