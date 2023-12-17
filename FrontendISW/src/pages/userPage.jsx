import BackToHomeButton from "../components/home";
import SolicitarAsistencia from "../components/solAsistencia";
import withAuth from '../components/withAuth';
// 100200300
//  
function UserPage() {
    return (
        <div>
            <BackToHomeButton/>
            <h1>Página de usuario</h1>
            <SolicitarAsistencia/>
        </div>
    );
}

export default withAuth(UserPage, 'user');
