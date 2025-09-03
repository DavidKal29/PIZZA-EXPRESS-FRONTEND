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
    <form className='mt-[200px]' onSubmit={changePasswordHandler}>
    <input type="text" name='new_password' value={form.new_password} onChange={handleChange} placeholder='New Password' />
    <input type="text" name='confirm_password' value={form.confirm_password} onChange={handleChange} placeholder='Confirm Password' />
    <button type='submit'>Enviar</button>
    </form>
 )

}