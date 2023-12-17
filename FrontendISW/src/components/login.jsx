
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

function Login() {

    const navigate = useNavigate();
    const [_id, set_id] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
      
        try {
          const response = await fetch(`http://localhost:80/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _id, password }),
          });
      
          if (!response.ok) {
            throw new Error('Error en la autenticación');
          }
      
          const data = await response.json();
          localStorage.removeItem('token');
          localStorage.removeItem('userType'); 
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', _id); 
          localStorage.setItem('userType', data.userType);
          navigate(`/${data.userType}`);
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Crendenciales incorrectas',
          });
        }
      };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
      };
    
      const toggleShowPassword = () => {
        setShowPassword(!showPassword);
      };
      
      return (
        <div className="container" style={{marginTop:"20px"}}>
          <div className="row justify-content-center">
            <div className="col-md-3">
              <div className="card" style={{ backgroundColor: '#eee' }}>

                <div className="card-body">
                  <form className="form-group" onSubmit={handleSubmit}>
                    <input id="rut" className="form-control" value={_id} onChange={e => set_id(e.target.value)} placeholder="Ingrese su rut" />
                    <input id="password" className="form-control" type={showPassword ? 'text' : 'password'} value={password} onChange={handlePasswordChange} placeholder="Ingrese su contraseña" style={{marginTop:"10px"}} />
                    <button type="button" className="btn btn-link" onClick={toggleShowPassword}>{showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}</button>
                    <input type="submit" style={{marginLeft:"20px", marginTop:"20px"}}className="btn btn-primary mt" value="Login" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Login;