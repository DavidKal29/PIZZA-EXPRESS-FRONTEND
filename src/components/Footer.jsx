export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full bg-[#0f3d1c] text-white px-6 py-10 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo y descripción */}
        <div>
          <img
            src="/logo.png"
            alt=""
            className="h-14 mb-4"
          />
          <p className="text-sm text-orange-400">
            La mejor pizza artesanal con ingredientes frescos y una receta familiar que nunca falla.
          </p>
        </div>

        {/* Enlaces rápidos */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Enlaces</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-orange-400 transition">Inicio</a></li>
            <li><a href="/nuestraCarta" className="hover:text-orange-400 transition">Nuestra Carta</a></li>
            <li><a href="/crearPedido" className="hover:text-orange-400 transition">Crear Pedido</a></li>
            <li><a href="/Carrito" className="hover:text-orange-400 transition">Carrito</a></li>
            <li><a href="/login" className="hover:text-orange-400 transition">Login</a></li>
            <li><a href="/register" className="hover:text-orange-400 transition">Register</a></li>
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
