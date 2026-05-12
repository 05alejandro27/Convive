import styles from './StatCard.module.css';

export const StatCard = ({ label, value, sub }: Props) => {
    return (
        <div className={styles.statCard}>
            <span className={styles.statLabel}>{label}</span>
            <span className={styles.statValue}>{value}</span>
            {sub && <span className={styles.statSub}>{sub}</span>}
        </div>
    );
};

interface Props {
    label: string;
    value: string;
    sub?: string;
}