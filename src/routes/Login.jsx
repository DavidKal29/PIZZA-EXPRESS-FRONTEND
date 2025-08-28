import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function Login() {
  const navigate = useNavigate()

  const {setUser} = useAppContext()

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
    email:'',
    username:'',
    password:''
  })

  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }

  const loginHandler = async(e)=>{
    e.preventDefault()

    const res = await fetch('http://localhost:5000/login',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(form),
      credentials: 'include'
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

    navigate('/perfil')
    

  }

  return (
    <form className='mt-[200px]' onSubmit={loginHandler}>
      <input type="text" name='email' value={form.email} onChange={handleChange} placeholder='Email' />
      <input type="text" name='password' value={form.password} onChange={handleChange} placeholder='Password' />
      <button type='submit'>Enviar</button>
    </form>
  )
}
