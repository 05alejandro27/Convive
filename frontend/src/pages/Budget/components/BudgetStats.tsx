import type { BudgetStatsResponse } from '../../../services/budget.service';
import { StatCard } from './StatCard';
import styles from './BudgetStats.module.css';
import { formatMoney } from '../../../utils/formatters';

export const BudgetStats = ({ stats, annualAmount, extra }: Props) => {
    return (
        <div className={styles.statsRow}>
            <StatCard
                label="IMPORTE TOTAL"
                value={formatMoney(annualAmount)}
            />
            <StatCard
                label="GASTADO"
                value={formatMoney(stats.spent)}
                sub={`${stats.spentPercentage}% del total`}
            />
            <StatCard
                label="DISPONIBLE"
                value={formatMoney(stats.available)}
            />
            {extra && (
                <StatCard
                    label={extra.label}
                    value={extra.value}
                    sub={extra.sub}
                />
            )}
        </div>
    );
};

interface ExtraStat {
    label: string;
    value: string;
    sub?: string;
}

interface Props {
    stats: BudgetStatsResponse;
    annualAmount: number;
    extra?: ExtraStat;
}