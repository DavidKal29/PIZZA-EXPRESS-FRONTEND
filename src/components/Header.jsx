import React, { useEffect, useState } from 'react' //Importamos React y hooks
import { useNavigate } from 'react-router-dom' //Para navegar entre rutas
import {HashLink} from 'react-router-hash-link' //Para links con scroll suave a secciones
import { useAppContext } from '../context/AppContext' //Contexto global para usuario

export default function Header() {

    const navigate = useNavigate() //Hook para redireccionar
    const [menu,setMenu] = useState(false) //Estado para menú hamburguesa
    const {user,setUser} = useAppContext() //Usuario logueado y función para actualizar

    console.log('El user:',user);

    //Función para cerrar sesión
    const logout = ()=>{
        fetch(`${process.env.REACT_APP_API_URL}/logout`,{
            credentials:'include',
            method:'GET'
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            setUser(null) //Limpiamos usuario del contexto
            navigate('/login') //Redirigimos a login
        })
        .catch(err=>{
            console.error(err)
        })
    }

  return (
    <header className="bg-[#1F3A93] z-50 flex justify-between items-center py-3 px-4 sm:px-10 fixed top-0 w-full h-[80px] md:h-[100px] shadow-lg">
        {/* Logo */}
      <a href="/" className="w-[16%] min-[568px]:w-[10%] sm:w-[12%] lg:w-[7%] xl:w-[5%]">
        <img src="/logo.png" className="w-full" alt="Logo" />
      </a>

        {/* Menú + botones */}
        <div className="flex items-center gap-6 lg:gap-10">
            {/* Menú links (desktop) */}
            <div className="hidden lg:flex items-center gap-6">
                <HashLink smooth to='/#carta' className="text-[#FFF3E2] text-[20px] hover:text-orange-400 duration-500 cursor-pointer">Nuestra carta</HashLink>
                <HashLink smooth to='/#ofertas' className="text-[#FFF3E2] text-[20px] hover:text-orange-400 duration-500 cursor-pointer">Ofertas</HashLink>
                <HashLink smooth to='/#ubicacion' className="text-[#FFF3E2] text-[20px] hover:text-orange-400 duration-500 cursor-pointer">Realizar Pedido</HashLink>

                {user ? (
                    <>
                    <HashLink smooth to='/perfil' className="text-[#FFF3E2] text-[20px] hover:text-orange-400 duration-500 cursor-pointer">Perfil</HashLink>
                    <button onClick={logout} className="text-[#FFF3E2] text-[20px] hover:text-orange-400 duration-500 cursor-pointer">Cerrar Sesión</button>
                    </>)
                    :
                    (<>
                    <HashLink smooth to='/login' className="text-[#FFF3E2] text-[20px] hover:text-orange-400 duration-500 cursor-pointer">Iniciar Sesión</HashLink>
                    <HashLink smooth to='/register' className="text-[#FFF3E2] text-[20px] hover:text-orange-400 duration-500 cursor-pointer">Crear Cuenta</HashLink>
                    </>)}
            </div>

            {/* Botón hamburguesa (mobile) */}
            <button id="boton_hamburguesa" className="lg:hidden text-[#FFF3E2] text-2xl" onClick={()=>{setMenu(!menu)}}>
                <i id="icono_boton" className="fa-solid fa-bars"></i>
            </button>
        </div>

        {/* Menú Hamburguesa (mobile) */}
        <nav
            id="menu_hamburguesa"
            className={`fixed top-[80px] md:top-[100px] w-[60%] h-screen overflow-y-auto scrollbar-hide bg-[#1F3A93] shadow-lg flex flex-col items-start pl-[20px] pt-[30px] gap-[40px] max-[320px]:gap-[20px] duration-300 lg:hidden overflow-y-scroll min-[568px]:flex-row min-[568px]:w-[100%] min-[568px]:justify-center min-[568px]:items-center min-[568px]:h-[80px] min-[568px]:gap-[20px] sm:h-[100px] sm:gap-[30px] md:h-[100px] md:gap-[35px] ${menu ? "right-[0%]" : "right-[-100%]"}`}
        >
            {/* Links menú mobile */}
            <HashLink smooth  to='/#carta' className="text-[#FFF3E2] text-[18px] font-bold transition duration-200 cursor-pointer">Nuestra Carta</HashLink>
            <HashLink smooth  to='/#ofertas' className="text-[#FFF3E2] text-[18px] font-bold transition duration-200 cursor-pointer">Ofertas</HashLink>
            <HashLink smooth  to='/#ubicacion' className="text-[#FFF3E2] text-[18px] font-bold transition duration-200 cursor-pointer">Realizar Pedido</HashLink>

            {user ? (
                    <>
                    <HashLink smooth to='/perfil' className="text-[#FFF3E2] text-[18px] font-bold transition duration-200 cursor-pointer">Perfil</HashLink>
                    <button onClick={logout} className="text-[#FFF3E2] text-[18px] font-bold transition duration-200 cursor-pointer">Cerrar Sesión</button>
                    </>)
                    :
                    (<>
                    <HashLink smooth to='/login' className="text-[#FFF3E2] text-[18px] font-bold transition duration-200 cursor-pointer">Iniciar Sesión</HashLink>
                    <HashLink smooth to='/register' className="text-[#FFF3E2] text-[18px] font-bold transition duration-200 cursor-pointer">Crear Cuenta</HashLink>
                    </>)}
        </nav>
    </header>
  )
}
