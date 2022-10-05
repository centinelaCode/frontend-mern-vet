import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthLayout from './layout/AuthLayout';
import RutaProtegida from './layout/RutaProtegida';

import Login from './paginas/Login';
import Registrar from './paginas/Registrar';
import OlvidePassword from './paginas/OlvidePassword';
import ConfirmarCuenta from './paginas/ConfirmarCuenta';
import NuevoPassword from './paginas/NuevoPassword';
import AdministrarPacientes from './paginas/AdministrarPacientes';
import EditarPerfil from './paginas/EditarPerfil';
import CambiarPassword from './paginas/CambiarPassword';


import { AuthProvider } from './context/AuthProvider';
import { PacientesProvider } from './context/PacientesProvider';

function App() {

  // test variables de entorno con entorno de react creado con VITE
  // console.log(import.meta.env.VITE_BACKEND_URL, 'VITE_BACKEND_URL')

  return (
    <BrowserRouter>

      <AuthProvider>

        <PacientesProvider>
            {/* Public Area */}
            <Routes>
              <Route path="/" element={ <AuthLayout /> }>
                <Route index element={<Login />} />
                <Route path='registrar' element={<Registrar />} />
                <Route path='olvide-password' element={<OlvidePassword />} />
                <Route path='olvide-password/:token' element={<NuevoPassword />} />
                <Route path='confirmar/:token' element={<ConfirmarCuenta />} />
              </Route>  

              {/* Protect Area */}
              <Route path="/admin" element={<RutaProtegida />}>
                <Route index element={<AdministrarPacientes />} />
                <Route path="perfil" element={<EditarPerfil />} />
                <Route path="cambiar-password" element={<CambiarPassword />} />
              </Route>


            </Routes>
        </PacientesProvider>
        
      </AuthProvider>

    </BrowserRouter>
  )
}

export default App
