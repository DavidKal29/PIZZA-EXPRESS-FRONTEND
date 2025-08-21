import React, { useState } from 'react'

export default function Header() {

    const [menu,setMenu] = useState(false)


  return (
    <header className="bg-[#0f3d1c] z-50 flex justify-between items-center py-3 px-4 sm:px-10 fixed top-0 w-full h-[80px] md:h-[100px] backdrop-blur-md shadow-lg">
        {/* Logo */}
        <a href="/" className="w-[16%] min-[568px]:w-[10%] sm:w-[12%] lg:w-[7%] xl:w-[5%]">
            <img src="./logo.png" className='w-full' alt="" />
        </a>

        {/* Menú + botones + carrito */}
        <div className="flex items-center gap-6 lg:gap-10">
            {/* Menú links (desktop) */}
            <div className="hidden lg:flex items-center gap-6">
                <a href='nuestraCarta' className="text-white text-[20px] hover:text-orange-400 duration-500 cursor-pointer">Nuestra carta</a>
                <a href='crearPedido' className="text-white text-[20px] hover:text-orange-400 duration-500 cursor-pointer">Crear Pedido</a>
            </div>

            {/* Botones */}
            <div className="hidden lg:flex items-center gap-6">
                <a href='nuestraCarta' className="text-white text-[20px] hover:text-orange-400 duration-500 cursor-pointer">Iniciar Sesión</a>
                <a href='crearPedido' className="text-white text-[20px] hover:text-orange-400 duration-500 cursor-pointer">Crear Cuenta</a>
            </div>

            {/* Icono Carrito */}
            <div className="hidden lg:flex text-white text-[25px] hover:text-[#00ff88] duration-500 cursor-pointer">
                <i className="fa-solid fa-cart-shopping"></i>
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

            <a href='/nuestraCarta' className="text-white text-[18px] font-bold transition duration-200 cursor-pointer">
                <i className="fa-solid fa-pizza-slice"></i> Nuestra Carta
            </a>

            <a href='/crearPedido' className="text-white text-[18px] font-bold transition duration-200 cursor-pointer">
                <i class="fa-solid fa-pen-to-square"></i> Crear Pedido
            </a>

            <a href='/login' className="text-white text-[18px] font-bold transition duration-200 cursor-pointer">
                <i className="fa-solid fa-user"></i> Iniciar Sesión
            </a>

            <a href='/register' className="text-white text-[18px] font-bold transition duration-200 cursor-pointer">
                <i className="fa-solid fa-user-plus"></i> Crear Cuenta
            </a>

            <a href='/carrito' className="text-white text-[18px] font-bold transition duration-200 cursor-pointer">
                <i className="fa-solid fa-cart-shopping"></i> Carrito
            </a>
        </nav>
    </header>

  )
}
