import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';
import useAuth from '../hooks/useAuth';


const Login = () => {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})
  
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validación: todos son obligatorios
    if([email, password].includes('')){
      setAlerta({msg: 'Email y Password son obligatorios', error: true});
      return;
    }

    setAlerta({});

    // Se hace el login con la solicitu a la API
    try {

      // hacemos la peticion al backend
      const url = `/veterinarios/login`
      const { data } = await clienteAxios.post(url, { email, password })
      // console.log(data)

      // almacenamos el en localStorage el token(jwt)
      localStorage.setItem('token', data.token);

      // seteamos la data al context
      setAuth(data)

      // loguin success hacem,os redirect a /admin
      navigate('/admin')
      
    } catch (error) {
      // console.log(error)
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
      // console.log(error.response.data.msg)
    }

    
  }

  const { msg } = alerta;

  return (
    <>      
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Inicia Sesión y Administra tus {""}  
          <span className="text-black">Pacientes</span> 
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 roudend-xl bg-white">

        { 
          msg && <Alerta 
                    alerta={alerta}
                  />
        }

        <form
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold">Email</label>
            <input 
              type="email"
              placeholder="Email de Registro"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={ e => setEmail(e.target.value) }
            />
          </div>

          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">Password</label>
            <input 
              type="password"
              placeholder="Tu Password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={ e => setPassword(e.target.value) }
            />
          </div>

          <input 
            type="submit"
            value="Iniciar Sesión"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-4 hover:cursor-pointer hover:bg-indigo-800 md:w-auto "
          />          
        </form>

        <nav className="mt-5 lg:flex lg:justify-between">
          <Link 
            className="block text-center my-5 text-gray-500"
            to="/registrar">¿No tienes una cuenta? Regístrate
          </Link>
          <Link 
            className="block text-center my-5 text-gray-500"
            to="/olvide-password">Olvide mi Password
          </Link>
        </nav>
      </div>
    </>
  )
}

export default Login