import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const ProtectedRoute = () => {
    //Datos del usuario
    const { user } = useAuth();
    //Datos de la comunidad de la URL
    const { communityId } = useParams<{communityId: string}>();

    //Comprueba si el usuario no existe o no tiene clave
    if (!user || !user.token) {
        //Guarda el ID de la comunidad
        const savedCommunityId = localStorage.getItem('communityId') || communityId || '1';

        //Redirige al usuario a la página de login
        return <Navigate to={`/login/${savedCommunityId}`} replace />;
    }

    //Layout completo: navbar arriba, contenido en el centro y footer abajo
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};