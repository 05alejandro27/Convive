export const getRole = (): string | null => {
    const token = localStorage.getItem('token');
    if (!token) {
        return null;
    }
    
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.role as string;
    } catch {
        //El token puede estar malformado por lo que se ignora queriendo
        return null;
    }

}; 