import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function ForgotPassword() {
  const navigate = useNavigate()

  useEffect(()=>{
    document.title = 'Login'

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
    email:''
  })

  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }

  const forgotPasswordHandler = async(e)=>{
    e.preventDefault()

    const res = await fetch('http://localhost:5000/recuperarPassword',{
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
    <form className='mt-[200px]' onSubmit={forgotPasswordHandler}>
      <input type="text" name='email' value={form.email} onChange={handleChange} placeholder='Email' />
      <button type='submit'>Enviar</button>
    </form>
  )
}