import React, { useState } from 'react'

export default function UbicacionDomicilio() {
  const [form, setForm] = useState({
    nombreDestinatario: '',
    domicilio: '',
    localidad: '',
    codigoPostal: '',
    puerta: ''
  })

  const obtenerPizzas = () => {
    const pizzas = []
    for (let i = 0; i < localStorage.length; i++) {
      const clave = localStorage.key(i)
      const valor = JSON.parse(localStorage.getItem(clave))
      if (clave.startsWith('pizza_') && Number(valor) > 0) {
        pizzas.push({ nombre: clave.slice(6), cantidad: valor })
      }
    }
    return pizzas
  }

  const handleForm = (e) => {
    e.preventDefault()
    const cartData = obtenerPizzas()
    localStorage.clear()

    const cleanedForm = {
      nombreDestinatario: form.nombreDestinatario
        .trim()
        .replace(/\s+/g, ' ')
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      domicilio: form.domicilio
        .trim()
        .replace(/\s+/g, ' ')
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      localidad: form.localidad
        .trim()
        .replace(/\s+/g, ' ')
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      codigoPostal: form.codigoPostal.trim().replace(/\s+/g, ''),
      puerta: form.puerta.trim().replace(/\s+/g, '')
    }

    if (cartData.length > 0) {
      const body = { ...cleanedForm, cart: cartData }
      fetch('http://localhost:5000/finalizarCompra', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.message)
        })
        .catch((error) => {
          alert(error)
        })
    } else {
      alert('Tu carrito está vacío')
    }
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div
      id="ubicacion"
      className="scroll-mt-28 bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white flex flex-col-reverse lg:flex-row justify-center items-center lg:items-stretch p-8 gap-12 lg:gap-[80px] shadow-2xl"
    >
      {/* Ubicación */}
      <div className="flex flex-col justify-center items-center text-center gap-6 lg:w-[35%]">
        <h2 className="text-[28px] font-extrabold text-blue-400 tracking-wide">
          UBICACIÓN Y HORARIOS
        </h2>
        <p className="text-lg text-gray-200">
          Encuéntranos en <span className="font-semibold">Calle Manzaneda 123</span>
        </p>
        <div className="w-full h-[300px] sm:h-[400px] lg:h-[350px] overflow-hidden rounded-xl shadow-lg border border-blue-500/40">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2992.022695919759!2d2.154007815424928!3d41.3902059792635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a2f5d5f0b8f7%3A0x1c7891c0c9d6a9e4!2sBarcelona!5e0!3m2!1ses!2ses!4v1691433350000!5m2!1ses!2ses"
            className="w-full h-full"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <p className="text-gray-300">📅 Lunes a Domingo</p>
        <p className="text-lg font-semibold text-blue-300">
          ⏰ 8:00 AM - 11:00 PM
        </p>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-6 lg:w-[30%]">
        <div className="flex flex-col gap-2 bg-white/5 rounded-xl p-4 shadow-md hover:shadow-blue-500/20 transition">
          <h3 className="font-bold text-[22px] text-blue-300">PIZZAS CLÁSICAS</h3>
          <p className="text-gray-300">
            Disfruta de las pizzas tradicionales desde la Margarita hasta la
            Cuatro Quesos, elaboradas con ingredientes de la más alta calidad.
          </p>
        </div>

        <div className="flex flex-col gap-2 bg-white/5 rounded-xl p-4 shadow-md hover:shadow-blue-500/20 transition">
          <h3 className="font-bold text-[22px] text-blue-300">
            ESPECIALIDADES DE LA CASA
          </h3>
          <p className="text-gray-300">
            Explora nuestras pizzas únicas creadas con combinaciones originales de
            sabores que deleitarán tu paladar.
          </p>
        </div>

        <div className="flex flex-col gap-2 bg-white/5 rounded-xl p-4 shadow-md hover:shadow-blue-500/20 transition">
          <h3 className="font-bold text-[22px] text-blue-300">OPCIONES VEGANAS</h3>
          <p className="text-gray-300">
            También ofrecemos opciones especiales para los amantes de lo vegetal,
            para que disfrutes de un platillo único.
          </p>
        </div>
      </div>

      {/* Formulario */}
      <form
        onSubmit={handleForm}
        className="flex flex-col md:w-2/3 gap-4 lg:w-[30%] bg-white/5 p-6 rounded-2xl shadow-md hover:shadow-blue-500/20 transition"
      >
        <h3 className="font-bold text-[22px] text-blue-300">
          INTRODUCE TU DOMICILIO
        </h3>
        <input
          value={form.nombreDestinatario}
          onChange={handleChange}
          required
          className="bg-white text-black rounded px-4 py-2 placeholder:text-gray-500 font-semibold shadow-inner"
          type="text"
          name="nombreDestinatario"
          placeholder="Nombre de destinatario"
        />
        <input
          value={form.domicilio}
          onChange={handleChange}
          required
          className="bg-white text-black rounded px-4 py-2 placeholder:text-gray-500 font-semibold shadow-inner"
          type="text"
          name="domicilio"
          placeholder="Domicilio"
        />
        <input
          value={form.localidad}
          onChange={handleChange}
          required
          className="bg-white text-black rounded px-4 py-2 placeholder:text-gray-500 font-semibold shadow-inner"
          type="text"
          name="localidad"
          placeholder="Localidad"
        />
        <input
          value={form.codigoPostal}
          onChange={handleChange}
          required
          className="bg-white text-black rounded px-4 py-2 placeholder:text-gray-500 font-semibold shadow-inner"
          type="number"
          name="codigoPostal"
          placeholder="Código postal"
        />
        <input
          value={form.puerta}
          onChange={handleChange}
          required
          className="bg-white text-black rounded px-4 py-2 placeholder:text-gray-500 font-semibold shadow-inner"
          type="text"
          name="puerta"
          placeholder="Puerta"
        />
        <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl cursor-pointer">
          Enviar
        </button>
      </form>
    </div>
  )
}
