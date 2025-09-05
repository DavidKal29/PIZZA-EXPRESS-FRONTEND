import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function Register() {

  const navigate = useNavigate()

  const {setUser} = useAppContext()

  useEffect(()=>{
    document.title = 'Register'

    fetch('http://localhost:5000/me',{
            credentials:'include',
            method:'GET'
        })
        .then(res=>res.json())
        .then(data=>{
            if (data.loggedIn) {
                navigate('/perfil')
            }
        })
        .catch(err=>{
            console.error(err);
            navigate('/login')
        })
  })

  const [form,setForm] = useState({
    email:"",
    username:"",
    password:""
  })

  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const registerHandler = async(e)=>{
    e.preventDefault()

    const cleanedForm = {
      email: form.email.trim().toLowerCase().replace(/\s+/g, ""),
      username: form.username.trim().replace(/\s+/g, ""), 
      password: form.password.trim()
    }

    const res = await fetch('http://localhost:5000/register',{
      body:JSON.stringify(cleanedForm),
      method:'POST',
      headers:{'Content-Type':'application/json'},
      credentials:'include'
    })
    .then(res=>res.json())
    .then(data=>{
      if (data.user) {
        setUser(data.user)
      }else{
        alert(data.message)
      }
    })
    .catch(err=>{console.error(err);})


  }



  return (
   <div className="flex justify-center items-center pt-[150px] pb-[50px] bg-gradient-to-r from-blue-600 to-blue-800 px-4">
      <form
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md flex flex-col gap-6"
        onSubmit={registerHandler}
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
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Introduce tu email"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Username */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-semibold text-gray-600">
            Username
          </label>
          <input
            type="text"
            name="email"
            value={form.username}
            onChange={handleChange}
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
            onChange={handleChange}
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
