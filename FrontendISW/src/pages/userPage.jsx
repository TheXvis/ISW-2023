import BackToHomeButton from "../components/home";
import SolicitarAsistencia from "../components/solAsistencia";
import FileList from "../components/ListaArchivos";
import FileUpload from "../components/FileUpload";
import FileManagement from "../components/FileManagement";
import { Link, useNavigate } from 'react-router-dom';



function UserPage() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    navigate('/');
  };
    return (
        <div style={{ backgroundColor: '#333333', color: '#fff', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
          <div style={{ backgroundColor: '#ff6f00', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ margin: '0', fontSize: '24px' }}>Asistencia Social UBB</h1>
            <h3 style={{ margin: '0', fontSize: '24px' }}>Panel de Usuario</h3>
            <Link to="/" style={{ textDecoration: 'none', color: '#fff' }} onClick={handleClick}>
              <button style={{ backgroundColor: '#2e7d32', color: '#fff', borderRadius: '5px', cursor: 'pointer' }}>
                Cerrar Sesión
             </button>
            </Link>
          </div>
          <div style={{ margin: '20px 0' }}>
            <h2 style={{ fontSize: '20px' }}>Solicitar Asistencia Social</h2>
            <div style={{ border: '1px solid #ccc', borderRadius: '5px' }}>
              <SolicitarAsistencia />
            </div>
          </div>
          <div style={{ margin: '20px 0' }}>
            <h2 style={{ fontSize: '18px' }}>Documentos</h2>
            <div style={{ border: '1px solid #ccc', borderRadius: '5px' }}>
              
              <FileManagement/>

            </div>
          </div>
        </div>
      );
}

export default UserPage;
