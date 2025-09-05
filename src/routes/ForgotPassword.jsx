import React, { useEffect, useState } from 'react' //Importamos React y hooks
import { useNavigate } from 'react-router-dom' //Para navegar entre rutas
import { toast } from 'sonner' //Para mostrar notificaciones

export default function ForgotPassword() {
  const navigate = useNavigate() //Hook para redireccionar

  useEffect(()=>{
    document.title = 'Forgot Password' //Cambiamos título de la página

    //Verificamos si el usuario ya está logueado
    fetch('https://pizzaexpressbackend.onrender.com/me',{
            credentials:'include',
            method:'GET'
        })
        .then(res=>res.json())
        .then(data=>{
            if (data.loggedIn) {
                navigate('/perfil') //Si está logueado, redirigimos al perfil
            }
        })
        .catch(err=>{
            console.error(err);
            navigate('/forgotpassword') //Si hay error, permanecemos en la página
        })
  },[])

  //Estado del formulario
  const [form,setForm] = useState({
    email:''
  })

  //Manejador de cambios en input
  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }

  //Manejador de envío del formulario
  const forgotPasswordHandler = async(e)=>{
    e.preventDefault() //Prevenimos recarga de página

    //Enviamos petición al backend
    await fetch('https://pizzaexpressbackend.onrender.com/recuperarPassword',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(form),
      credentials: 'include'
    })
    .then(res=>res.json())
    .then(data=>{
      if (data.token) {
        console.log('EL token existe:',data.token); //Mostramos token en consola
      }

      if (data.message=='El usuario no existe') {
        toast.error(data.message) //Mostramos error si no existe usuario
      }else{
        toast.success(data.message) //Mostramos mensaje de éxito
      }
      
    })
    .catch(err=>{console.error(err);})
  }

  return (
    <div className="flex justify-center items-center pt-[150px] pb-[50px] bg-gradient-to-r from-blue-600 to-blue-800 px-4">
      <form
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md flex flex-col gap-6"
        onSubmit={forgotPasswordHandler} //Asignamos el submit
      >
        <h1 className="text-3xl font-extrabold text-center text-blue-800">
          Recuperar Contraseña
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

        {/* Button */}
        <button
          type="submit"
          className="cursor-pointer bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          Enviar
        </button>

        {/* Recordaste contraseña */}
        <div className="text-center">
          <p className="text-sm text-blue-600">
            ¿Recordaste la contraseña? <a href="/login" className='text-blue-800 font-bold'>Inicar Sesión</a>
          </p>
        </div>
      </form>
    </div>
  )
}
