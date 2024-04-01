import './App.css';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import Toastr from './components/Toastr';

function App() {

  return (
    <div className='app__container'>
      <Header />
      <Toastr />
      <Outlet />
    </div>
  )
}

export default App
