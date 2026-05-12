import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

//Función para decodificar el payload del JWT sin librerías externas
const decodeToken = (token: string) => {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
};

export const PresidentRoute = () => {
    //Datos del usuario
    const { user } = useAuth();

    //Si no hay usuario se redirige al login (esto ya lo cubre ProtectedRoute, pero por seguridad)
    if (!user || !user.token) {
        return <Navigate to={`/login/${user?.communityId || '1'}`} replace />;
    }

    //Decodifico el JWT para obtener el rol
    const tokenData = decodeToken(user.token);

    //Si no es presidente, redirige a not-found
    if (tokenData.role !== 'PRESIDENT') {
        return <Navigate to="/not-found" replace />;
    }

    //Si es presidente, muestra el contenido
    return <Outlet />;
};