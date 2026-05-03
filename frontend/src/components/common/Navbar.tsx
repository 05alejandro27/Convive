import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './Navbar.module.css';

const getRole = (token: string) => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.role as string;
    } catch {
        return null;
    }
};

const getCommunityId = (token: string) => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.communityId as number;
    } catch {
        return null;
    }
};

export const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    if (!user || !user.token) return null;

    const role = getRole(user.token);
    const communityId = getCommunityId(user.token);

    if (!role || !communityId) return null;

    const isPresident = role === 'PRESIDENT';

    const isActive = (path: string) => location.pathname.startsWith(path);

    const handleExpenses = async () => {
        try {
            const { budgetService } = await import('../../services/budget.service');
            const budget = await budgetService.getCurrent(communityId);
            navigate(`/expenses/${communityId}/${budget.id}`);
        } catch {
            navigate(`/budget/${communityId}/current`);
        }
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.inner}>
                <button className={styles.brand} onClick={() => navigate(`/home/${communityId}`)}>
                    Convive
                </button>

                <div className={styles.links}>
                    <button
                        className={`${styles.link} ${isActive(`/home/${communityId}`) ? styles.active : ''}`}
                        onClick={() => navigate(`/home/${communityId}`)}
                    >
                        Inicio
                    </button>
                    <button
                        className={`${styles.link} ${isActive(`/polls/${communityId}`) ? styles.active : ''}`}
                        onClick={() => navigate(`/polls/${communityId}`)}
                    >
                        Votaciones
                    </button>
                    <button
                        className={`${styles.link} ${isActive(`/budget/${communityId}`) ? styles.active : ''}`}
                        onClick={() => navigate(`/budget/${communityId}/current`)}
                    >
                        Presupuesto
                    </button>
                    <button
                        className={`${styles.link} ${isActive(`/expenses/${communityId}`) ? styles.active : ''}`}
                        onClick={handleExpenses}
                    >
                        Gastos
                    </button>
                    {isPresident && (
                        <button
                            className={`${styles.link} ${isActive(`/users/${communityId}`) ? styles.active : ''}`}
                            onClick={() => navigate(`/users/${communityId}`)}
                        >
                            Usuarios
                        </button>
                    )}
                    {isPresident && (
                        <button
                            className={`${styles.link} ${isActive(`/apartments/${communityId}`) ? styles.active : ''}`}
                            onClick={() => navigate(`/apartments/${communityId}`)}
                        >
                            Pisos
                        </button>
                    )}
                </div>

                <div className={styles.right}>
                    <span className={`${styles.roleBadge} ${isPresident ? styles.rolePresident : styles.roleResident}`}>
                        {isPresident ? 'Presidente' : 'Residente'}
                    </span>
                    <button className={styles.btnLogout} onClick={logout}>
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </nav>
    );
};