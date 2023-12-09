import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Note from './pages/Note'
import Signup from './pages/Signup';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Signup/>} />
        <Route exact path='/notes' element={ <Note/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
