import React, { useEffect, useState } from 'react'

export default function Login() {

  useEffect(()=>{
    document.title = 'Login'
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
      header:{'Content-Type':'application/json'},
      body:JSON.stringify(form)
    })

    const data = await res.json()

    const respuesta = JSON.stringify(data)

    console.log('La repsuesta del backend',respuesta);
    

  }

  return (
    <form className='mt-[200px]' onSubmit={loginHandler}>
      <input type="text" name='email' value={form.email} onChange={handleChange} placeholder='Email' />
      <input type="text" name='username' value={form.username} onChange={handleChange} placeholder='Username' />
      <input type="text" name='password' value={form.password} onChange={handleChange} placeholder='Password' />
      <button type='submit'>Enviar</button>
    </form>
  )
}
