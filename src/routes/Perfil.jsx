import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'



export default function Perfil() {

    const navigate = useNavigate()

    useEffect(()=>{
        fetch('http://localhost:5000/me',{
            credentials:'include',
            method:'GET'
        })
        .then(res=>res.json())
        .then(data=>{
            if (!data.loggedIn) {
                navigate('/login')
            }
        })
        .catch(err=>{
            console.error(err);
            navigate('/login')
        })
    },[])
    
    return (
        <div>Perfil</div>
    )
}
