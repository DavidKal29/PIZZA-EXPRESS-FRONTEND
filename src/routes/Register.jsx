import React, { useEffect, useState } from 'react' //Importamos React y hooks
import { useNavigate } from 'react-router-dom' //Hook para navegar entre rutas
import { useAppContext } from '../context/AppContext' //Contexto global de la app
import { toast } from 'sonner' //Para mostrar notificaciones

export default function Register() {

  const navigate = useNavigate() //Hook para redireccionar
  const {setUser} = useAppContext() //Función para guardar usuario en contexto

  useEffect(()=>{
    document.title = 'Register' //Cambiamos el título de la página

    //Comprobamos si ya hay usuario logueado
    fetch(`${process.env.REACT_APP_API_URL}/me`,{
            credentials:'include',
            method:'GET'
        })
        .then(res=>res.json())
        .then(data=>{
            if (data.loggedIn) {
                navigate('/perfil') //Si ya está logueado, vamos al perfil
            }
        })
        .catch(err=>{
            console.error(err);
            navigate('/login') //Si hay error, redirigimos a login
        })
  })

  //Estado del formulario
  const [form,setForm] = useState({
    email:"",
    username:"",
    password:""
  })

  //Manejador de cambios en inputs
  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  //Manejador de envío del formulario
  const registerHandler = async(e)=>{
    e.preventDefault() //Prevenimos el refresh de la página

    //Limpiamos y normalizamos datos
    const cleanedForm = {
      email: form.email.trim().toLowerCase().replace(/\s+/g, ""),
      username: form.username.trim().replace(/\s+/g, ""), 
      password: form.password.trim()
    }

    //Enviamos datos al backend
    fetch(`${process.env.REACT_APP_API_URL}/register`,{
      body:JSON.stringify(cleanedForm),
      method:'POST',
      headers:{'Content-Type':'application/json'},
      credentials:'include'
    })
    .then(res=>res.json())
    .then(data=>{
      if (data.user) {
        console.log('Usuario obtenido');
        setUser(data.user) //Guardamos usuario en contexto
      }else{
        console.log('Usuario no registrado, mostrando errores');
        
        //Mostramos error si existe
        if (data.error) {
          console.log('Errores de validación');
          
          toast.error(data.error.msg) 
        }else{
          console.log('Errores de base de datos');
          
          toast.error(data.message) 
        }
      }
    })
    .catch(err=>{console.error(err);})
  }

  return (
   <div className="flex justify-center items-center pt-[150px] pb-[50px] bg-gradient-to-r from-blue-600 to-blue-800 px-4">
      <form
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md flex flex-col gap-6"
        onSubmit={registerHandler} //Asignamos el submit del formulario
      >
        <h1 className="text-3xl font-extrabold text-center text-blue-800">
          Crear Cuenta
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

        {/* Username */}
        <div className="flex flex-col">
          <label htmlFor="username" className="text-sm font-semibold text-gray-600">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange} //Actualiza estado al escribir
            placeholder="Introduce tu username"
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

        {/* Button */}
        <button
          type="submit"
          className="cursor-pointer bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          Enviar
        </button>

        {/* Ya tienes cuenta */}
        <div className="text-center">
          <p
            className="text-sm text-blue-600"
          >
            ¿Ya tienes cuenta? <a href="/login" className='text-blue-800 font-bold'>Iniciar Sesión</a>
          </p>
        </div>
      </form>
    </div>
  )
}