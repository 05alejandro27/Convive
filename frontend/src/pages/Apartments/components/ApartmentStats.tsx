import type { ApartmentStatsResponse } from '../../../services/apartment.service';
import styles from '../ApartmentsPage.module.css';

export const ApartmentStats = ({ stats }: Props) => {
    return (
        <div className={styles.statsRow}>
            <div className={styles.statCard}>
                <span className={styles.statLabel}>TOTAL PISOS</span>
                <span className={styles.statValue}>{stats.total}</span>
            </div>
            <div className={styles.statCard}>
                <span className={styles.statLabel}>OCUPADOS</span>
                <span className={styles.statValue}>{stats.occupied}</span>
            </div>
            <div className={styles.statCard}>
                <span className={styles.statLabel}>VACÍOS</span>
                <span className={styles.statValue}>{stats.empty}</span>
            </div>
            <div className={styles.statCard}>
                <span className={styles.statLabel}>INACTIVOS</span>
                <span className={styles.statValue}>{stats.inactive}</span>
            </div>
        </div>
    );
};

interface Props {
    stats: ApartmentStatsResponse;
}