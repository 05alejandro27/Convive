export const formatMoney = (amount: number) => {
    return amount.toLocaleString('es-ES', { minimumFractionDigits: 2 }) + ' €';
};

export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
};

export const formatDateLong = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
};

export const formatDeadline = (deadline: string) => {
    return new Date(deadline).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

//Función para decodificar el payload del JWT sin librerías externas
export const decodeToken = (token: string) => {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
};

export const monthLabel = (month: number) => {
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return months[month - 1] || '';
};

export const voteLabel = (value: string) => {
    if (value === 'IN_FAVOR') return 'A favor';
    if (value === 'AGAINST') return 'En contra';
    return 'Abstención';
};