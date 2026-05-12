import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './NotFoundPage.module.css';

export const NotFoundPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    //Si el usuario está logueado, el botón lleva al home de su comunidad
    //Si no está logueado, lleva al login por defecto
    const handleGoHome = () => {
        if (user) {
            navigate(`/home/${user.communityId}`);
        } else {
            const savedCommunityId = localStorage.getItem('communityId') || '1';
            navigate(`/login/${savedCommunityId}`);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <p className={styles.brand}>Convive</p>
                <p className={styles.code}>404</p>
                <p className={styles.title}>Página no encontrada</p>
                <p className={styles.subtitle}>
                    La página que buscas no existe o no tienes permiso para verla.
                </p>
                <button className={styles.button} onClick={handleGoHome}>
                    Volver al inicio
                </button>
            </div>
        </div>
    );
};