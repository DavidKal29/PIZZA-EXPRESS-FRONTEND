import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


//Las rutas
import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Bienvenido a mi sitio web</h1>
      </div>
      
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
      </Routes>
    </Router>



    
  );
}

export default App;
