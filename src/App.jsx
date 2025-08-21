import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


//Las rutas
import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import Carrito from './routes/Carrito';
import Nuestracarta from './routes/Nuestracarta';
import Crearpedido from './routes/Crearpedido';

//Header y footer
import Header from './components/Header';


function App() {
  return (
    <Router>
      <Header></Header>

      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/carrito' element={<Carrito></Carrito>}></Route>
        <Route path='/nuestraCarta' element={<Nuestracarta></Nuestracarta>}></Route>
        <Route path='/crearPedido' element={<Crearpedido></Crearpedido>}></Route>
      </Routes>
    </Router>



    
  );
}

export default App;
