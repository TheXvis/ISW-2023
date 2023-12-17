import CreateAsistenteSocial from "../components/as/crearAS";
import React from 'react';
import withAuth from '../components/withAuth';
import BackToHomeButton from "../components/home";
import { useState } from 'react';
import DeleteAsistenteSocial from "../components/as/borrarAS";
import EditAsistenteSocial from "../components/as/editarAS";
import VerAsistenteSocial from "../components/as/verAS";
import { Dropdown } from 'react-bootstrap';

//10100100-1
//contrasenaAdmin

function AdminPage() {
  const [action, setAction] = useState('');

  const handleSelect = (action) => {
    setAction(action);
  };

return (
  <div>
    <BackToHomeButton/>
    <h1>Página de administrador</h1>
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Menú
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleSelect('buscar')}>Buscar asistente social</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSelect('crear')}>Crear asistente social</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSelect('editar')}>Editar asistente social</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSelect('eliminar')}>Eliminar asistente social</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    {action === 'buscar' && <VerAsistenteSocial/>}
    {action === 'crear' && <CreateAsistenteSocial/>}
    {action === 'editar' && <EditAsistenteSocial/>}
    {action === 'eliminar' && <DeleteAsistenteSocial/>}
  </div>
);
}
  
export default withAuth(AdminPage, 'admin');