import { AuthContext, useAuthProvider } from '../hooks/useAuth';

export const AuthProvider = ({ children }: Props) => {

    const auth = useAuthProvider();

    return (
        //Expone los datos a todos los hijos de este provider
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
};

interface Props {
    children: React.ReactNode;
}