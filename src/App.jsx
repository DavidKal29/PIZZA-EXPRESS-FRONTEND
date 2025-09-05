import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Toaster, toast } from "sonner";


//Las rutas
import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import Perfil from './routes/Perfil';
import ForgotPassword from './routes/ForgotPassword';
import CambiarPassword from './routes/cambiarPassword';
import NotFound404 from './routes/NotFound404';

//Header y footer
import Header from './components/Header';
import Footer from './components/Footer';


function App() {
  return (
    <Router>
      <Header></Header>

      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/perfil' element={<Perfil></Perfil>}></Route>
        <Route path='/forgotpassword' element={<ForgotPassword></ForgotPassword>}></Route>
        <Route path='/cambiarPassword/:token' element={<CambiarPassword></CambiarPassword>}></Route>
        <Route path='*' element={<NotFound404></NotFound404>}></Route>
      </Routes>


      <Footer></Footer>

      <Toaster position="top-right" richColors duration={4000} />
    </Router>



    
  );
}

export default App;
