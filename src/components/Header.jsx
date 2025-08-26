import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {HashLink} from 'react-router-hash-link'

export default function Header() {

    const navigate = useNavigate()

    const [menu,setMenu] = useState(false)

    const [user,setUser] = useState(false)

    const logout = ()=>{
        fetch('http://localhost:5000/logout',{
            credentials:'include',
            method:'GET'
        })
        .then(res=>res.json())
        .then(data=>{console.log(data);})
        .catch(err=>{console.error(err);})

        navigate('/perfil')
    }

    useEffect(()=>{
        fetch('http://localhost:5000/me',{
            credentials:'include',
            method:'GET'
        })
        .then(res=>res.json())
        .then(data=>{
            if (data.loggedIn) {
                setUser(data.user)
            }
        })
        .catch(err=>{
            console.error(err);
        })
    },[])


  return (
    <header className="bg-[#0f3d1c] z-50 flex justify-between items-center py-3 px-4 sm:px-10 fixed top-0 w-full h-[80px] md:h-[100px] shadow-lg">
        {/* Logo */}
        <a href="/" className="w-[16%] min-[568px]:w-[10%] sm:w-[12%] lg:w-[7%] xl:w-[5%]">
            <img src="./logo.png" className='w-full' alt="" />
        </a>

        {/* Menú + botones + carrito */}
        <div className="flex items-center gap-6 lg:gap-10">
            {/* Menú links (desktop) */}
            <div className="hidden lg:flex items-center gap-6">
                <HashLink smooth to='/#carta' className="text-white text-[20px] hover:text-orange-400 duration-500 cursor-pointer">Nuestra carta</HashLink>
                
                <HashLink smooth to='/#ofertas' className="text-white text-[20px] hover:text-orange-400 duration-500 cursor-pointer">Ofertas</HashLink>

                <HashLink smooth to='/#ubicacion' className="text-white text-[20px] hover:text-orange-400 duration-500 cursor-pointer">Ubicación</HashLink>

                {user ? (
                    <>
                    <HashLink smooth to='/perfil' className="text-white text-[20px] hover:text-orange-400 duration-500 cursor-pointer">Perfil</HashLink>

                    <button onClick={logout} className="text-white text-[20px] hover:text-orange-400 duration-500 cursor-pointer">Cerrar Sesión</button>
                    </>):(<>
                    <HashLink smooth to='/login' className="text-white text-[20px] hover:text-orange-400 duration-500 cursor-pointer">Iniciar Sesión</HashLink>
                    
                    <HashLink smooth to='/register' className="text-white text-[20px] hover:text-orange-400 duration-500 cursor-pointer">Crear Cuenta</HashLink>
                    </>)}

                <HashLink smooth to='/carrito' className="text-white text-[20px] hover:text-orange-400 duration-500 cursor-pointer"><i className="fa-solid fa-cart-shopping"></i></HashLink>
            </div>

            
           

            

            {/* Botón hamburguesa (mobile) */}
            <button id="boton_hamburguesa" className="lg:hidden text-white text-2xl" onClick={()=>{setMenu(!menu)}}>
                <i id="icono_boton" className="fa-solid fa-bars"></i>
            </button>
        </div>

        {/* Menú Hamburguesa (mobile) */}
        <nav
            id="menu_hamburguesa"
            className={`fixed top-[80px] md:top-[100px] w-[60%] h-screen overflow-y-auto scrollbar-hide bg-[#0f3d1c] shadow-lg flex flex-col items-start pl-[20px] pt-[30px] gap-[40px] max-[320px]:gap-[20px] duration-300 lg:hidden overflow-y-scroll min-[568px]:flex-row min-[568px]:w-[100%] min-[568px]:justify-center min-[568px]:items-center min-[568px]:h-[80px] min-[568px]:gap-[20px] sm:h-[100px] sm:gap-[30px] md:h-[100px] md:gap-[35px] ${menu ? "right-[0%]" : "right-[-100%]"}`}
        >

            <HashLink smooth  to='/#carta' className="text-white text-[18px] font-bold transition duration-200 cursor-pointer">
             Nuestra Carta
            </HashLink>

            <HashLink smooth  to='/#ofertas' className="text-white text-[18px] font-bold transition duration-200 cursor-pointer">
                Ofertas
            </HashLink>

            <HashLink smooth  to='/#ubicacion' className="text-white text-[18px] font-bold transition duration-200 cursor-pointer">
                Ubicacion
            </HashLink>

            <HashLink smooth  to='/login' className="text-white text-[18px] font-bold transition duration-200 cursor-pointer">
                Iniciar Sesión
            </HashLink>

            <HashLink smooth  to='/register' className="text-white text-[18px] font-bold transition duration-200 cursor-pointer">
                Crear Cuenta
            </HashLink>

            <HashLink smooth  to='/carrito' className="text-white text-[18px] font-bold transition duration-200 cursor-pointer">
                <i className="fa-solid fa-cart-shopping"></i>
            </HashLink>

            
        </nav>
    </header>

  )
}
