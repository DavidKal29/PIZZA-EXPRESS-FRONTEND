import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


export default function CambiarPassword() {
  const navigate = useNavigate()

  const tokenParametro = useParams()


  useEffect(()=>{
      document.title = 'Change Password'
  
      fetch('http://localhost:5000/me',{
              credentials:'include',
              method:'GET'
          })
          .then(res=>res.json())
          .then(data=>{
              if (data.loggedIn) {
                  navigate('/perfil')
              }else{
                navigate(`/cambiarPassword/${tokenParametro.token}`)
              }
          })
          .catch(err=>{
              console.error(err);
              navigate(`/cambiarPassword/${tokenParametro.token}`)
          })
    },[])

  const [form,setForm] = useState({
    new_password:'',
    confirm_password:''
  })

  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }

  const changePasswordHandler = async(e)=>{
    e.preventDefault()

    await fetch(`http://localhost:5000/cambiarPassword/${tokenParametro.token}`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(form),
      credentials: 'include'
    })
    .then(res=>res.json())
    .then(data=>{
      alert(data.message)
    })
    .catch(err=>{console.error(err);})
    

  }

  return (
    <div className="flex justify-center items-center pt-[150px] pb-[50px] bg-gradient-to-r from-blue-600 to-blue-800 px-4">
      <form
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md flex flex-col gap-6"
        onSubmit={changePasswordHandler}
      >
        <h1 className="text-3xl font-extrabold text-center text-blue-800">
          Cambiar Contraseña
        </h1>

        {/* Password */}
        <div className="flex flex-col">
          <label
            htmlFor="new_password"
            className="text-sm font-semibold text-gray-600"
          >
            Contraseña
          </label>
          <input
            type="password"
            name="new_password"
            value={form.new_password}
            autoComplete='off'
            onChange={handleChange}
            placeholder="Introduce tu contraseña"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label
            htmlFor="confirm_password"
            className="text-sm font-semibold text-gray-600"
          >
            Contraseña
          </label>
          <input
            type="password"
            name="confirm_password"
            value={form.confirm_password}
            autoComplete='off'
            onChange={handleChange}
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
            Solicitar nuevo enlace
          </a>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="cursor-pointer bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          Enviar
        </button>

        {/* Cambiaste contraseña */}
        <div className="text-center">
          <p
            className="text-sm text-blue-600"
          >
            ¿Ya cambiaste la contraseña? <a href="/login" className='text-blue-800 font-bold'>Inicar Sesión</a>
          </p>
        </div>
      </form>
    </div>
 )

}