import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.left}>
                    <span className={styles.brand}>Convive</span>
                    <span className={styles.copy}>© 2026 Convive. Todos los derechos reservados.</span>
                </div>
                <div className={styles.right}>
                    <Link to="/politica-de-privacidad" className={styles.link}>Política de privacidad</Link>
                    <Link to="/condiciones-de-uso" className={styles.link}>Condiciones de uso</Link>
                </div>
            </div>
        </footer>
    );
};