import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const ProtectedRoute = () => {
    //Datos del usuario
    const { user } = useAuth();
    //Datos de la comunidad de la URL
    const { communityId } = useParams<{ communityId: string }>();

    //Comprueba si el usuario no existe o no tiene clave
    if (!user || !user.token) {
        //Guarda el ID de la comunidad
        const savedCommunityId = localStorage.getItem('communityId') || communityId || '1';

        //Redirige al usuario a la página de login
        return <Navigate to={`/login/${savedCommunityId}`} replace />;
    }

    //Si el usuario existe o tiene clave se muestra el contenido de las rutas protegidas
    return <Outlet />;
};