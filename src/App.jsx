import './App.css'; //Importamos los estilos generales
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom' //Para manejar rutas en la app
import { Toaster, toast } from "sonner"; //Para notificaciones tipo toast

//Importamos las rutas de la aplicación
import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import Perfil from './routes/Perfil';
import ForgotPassword from './routes/ForgotPassword';
import CambiarPassword from './routes/cambiarPassword';
import NotFound404 from './routes/NotFound404';

//Importamos componentes de la UI
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router> {/* Envolvemos todo en Router para manejar navegación */}
      <Header></Header> {/* Componente de cabecera */}

      <Routes> {/* Definimos todas las rutas de la app */}
        <Route path='/' element={<Home></Home>}></Route> {/* Página principal */}
        <Route path='/login' element={<Login></Login>}></Route> {/* Ruta de login */}
        <Route path='/register' element={<Register></Register>}></Route> {/* Ruta de registro */}
        <Route path='/perfil' element={<Perfil></Perfil>}></Route> {/* Perfil de usuario */}
        <Route path='/forgotpassword' element={<ForgotPassword></ForgotPassword>}></Route> {/* Recuperar contraseña */}
        <Route path='/cambiarPassword/:token' element={<CambiarPassword></CambiarPassword>}></Route> {/* Cambiar contraseña con token */}
        <Route path='*' element={<NotFound404></NotFound404>}></Route> {/* Página 404 para rutas no encontradas */}
      </Routes>

      <Footer></Footer> {/* Componente de pie de página */}

      <Toaster position="top-right" richColors duration={4000} /> {/* Notificaciones globales */}
    </Router>
  );
}

export default App; //Exportamos la app principal
