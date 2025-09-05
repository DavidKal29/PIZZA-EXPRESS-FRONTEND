import { HashLink } from "react-router-hash-link"; //Para enlaces con scroll suave
import { useAppContext } from "../context/AppContext"; //Contexto global de usuario
import { useNavigate } from "react-router-dom"; //Para redirecciones

export default function Footer() {

  const {user,setUser} = useAppContext() //Usuario logueado y función para actualizar
  const navigate = useNavigate() //Hook para redireccionar

  //Función para cerrar sesión
  const logout = ()=>{
        fetch('http://localhost:5000/logout',{
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
    <footer id="footer" className="bottom-0 mb-0 w-full bg-[#1F3A93] text-white px-6 py-10 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo y descripción */}
        <div>
          <img src="/logo.png" alt="" className="h-14 mb-4" />
          <p className="text-sm text-blue-300">
            La mejor pizza artesanal con ingredientes frescos y una receta familiar que nunca falla.
          </p>
        </div>

        {/* Enlaces rápidos */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Enlaces</h3>
          <ul className="space-y-2 text-sm">
            <li><HashLink smooth to="/" className="hover:text-orange-400 transition">Inicio</HashLink></li>
            <li><HashLink smooth to="/#carta" className="hover:text-orange-400 transition">Nuestra Carta</HashLink></li>
            <li><HashLink smooth to="/#ofertas" className="hover:text-orange-400 transition">Ofertas</HashLink></li>
            <li><HashLink smooth to="/#ubicacion" className="hover:text-orange-400 transition">Ubicación</HashLink></li>

            {/* Mostrar links según si el usuario está logueado */}
            {user ? 
            (
              <>
              <li><HashLink smooth to="/perfil" className="hover:text-orange-400 transition">Perfil</HashLink></li>
              <li><button onClick={logout} className="hover:text-orange-400 transition">Cerrar Sesión</button></li>
              </>
            ) 
            :
            (
              <>
              <li><HashLink smooth to="/login" className="hover:text-orange-400 transition">Login</HashLink></li>
              <li><HashLink smooth to="/register" className="hover:text-orange-400 transition">Register</HashLink></li>
              </>
            )}
          </ul>
        </div>

        {/* Información de contacto */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contáctanos</h3>
          <ul className="text-sm space-y-2">
            <li>📍 Av. España 123, Ciudad Ficticia</li>
            <li>📞 +99 999 999 999</li>
            <li>✉️ contacto@express.com</li>
          </ul>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="border-t border-white mt-10 pt-6 text-center text-sm text-white">
        © {new Date().getFullYear()} DavidKal29. Todos los derechos reservados.
      </div>
    </footer>
  );
}
