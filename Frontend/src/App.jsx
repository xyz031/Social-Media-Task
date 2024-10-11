
import 'bootstrap/dist/css/bootstrap.min.css';
import Headers from './components/Headers';
import Home from './pages/Home';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';
import {Routes,Route} from "react-router-dom"

function App() {
  return (
   <>
    <Headers />
    <Routes>
      <Route path='/getuser' element={<Home />} />
      <Route path='/' element={<Register />} />
    </Routes>
    <Toaster />
   </>
  );
}

export default App;
