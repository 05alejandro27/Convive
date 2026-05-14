import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';

//Creo el contexto
export const AuthContext = createContext<AuthContextType | null>(null);

//Es el hook que usaran los componentes para acedder a la lógica
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth debe usarse dentro de AuthProvider');
    }

    return context;
};

//Contiene toda la lógica para hablar con el backend, navegar...
export const useAuthProvider = () => {
    //Para redirigir al usuario
    const navigate = useNavigate();

    //Guarda quien esta logueado
    const token = localStorage.getItem('token');
    const communityId = localStorage.getItem('communityId');
    const initialUser: AuthUser | null = token && communityId
        ? { token, communityId: Number(communityId) }
        : null;

    const [user, setUser] = useState<AuthUser | null>(initialUser);

    //Esta función permite iniciar sesión
    const login = async (communityId: number, data: LoginData): Promise<void> => {
        const response = await authService.login(communityId, data);
        localStorage.setItem('token', response.token);
        localStorage.setItem('communityId', String(communityId));
        setUser({ token: response.token, communityId });
        navigate(`/home/${communityId}`);
    };

    //Esta función permite cerrar sesión
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('communityId');
        const communityId = user?.communityId;
        setUser(null);
        navigate(`/login/${communityId}`);
    };

    //Devuelve un objeto con toda la lógica creada
    return { user, login, logout };
};

interface AuthUser {
    token: string;
    communityId: number;
}

interface LoginData {
    floor: number;
    door: string;
    password: string;
}

interface AuthContextType {
    user: AuthUser | null;
    login: (communityId: number, data: LoginData) => Promise<void>;
    logout: () => void;
}