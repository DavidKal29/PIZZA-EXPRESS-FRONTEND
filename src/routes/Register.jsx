import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register() {

  const navigate = useNavigate()

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

    const res = await fetch('http://localhost:5000/register',{
      body:JSON.stringify(form),
      method:'POST',
      headers:{'Content-Type':'application/json'},
      credentials:'include'
    })

    const data = await res.json()

    console.log('La respuesta:',JSON.stringify(data));

  }



  return (
    <form className='mt-[200px]' onSubmit={registerHandler}>
      <input type="text" name='email' value={form.email} onChange={handleChange} placeholder='Email' />
      <input type="text" name='username' value={form.username} onChange={handleChange} placeholder='Username' />
      <input type="text" name='password' value={form.password} onChange={handleChange} placeholder='Password' />
      <button type='submit'>Enviar</button>
    </form>
  )
}
