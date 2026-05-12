import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { budgetService } from '../../services/budget.service';
import type { BudgetResponse } from '../../services/budget.service';
import styles from './BudgetHistoryPage.module.css';
import { formatDate, formatMoney } from '../../utils/formatters';

export const BudgetHistoryPage = () => {
    const { communityId } = useParams<{ communityId: string }>();
    const navigate = useNavigate();

    const [budgets, setBudgets] = useState<BudgetResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                setError(null);
                const id = Number(communityId);
                const data = await budgetService.getHistory(id);
                setBudgets(data);
            } catch {
                setError('Error al cargar el historial');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [communityId]);

    if (loading) {
        return <p className={styles.loading}>Cargando...</p>;
    }

    return (
        <div className={styles.container}>
            <button
                className={styles.linkHistory}
                onClick={() => navigate(`/budget/${communityId}/current`)}
            >
                Volver al presupuesto actual
            </button>

            <h1 className={styles.title}>Historial de presupuestos</h1>

            {error && <p className={styles.error}>{error}</p>}

            {budgets.length === 0 ? (
                <p className={styles.empty}>No hay presupuestos registrados.</p>
            ) : (
                <div className={styles.historyList}>
                    {budgets.map((b) => (
                        <div key={b.id} className={styles.historyCard}>
                            <div className={styles.historyLeft}>
                                <span className={styles.historyName}>
                                    {b.name || `Presupuesto ${new Date(b.startDate).getFullYear()}`}
                                </span>
                                <span className={styles.historyDates}>
                                    {formatDate(b.startDate)} - {formatDate(b.endDate)}
                                </span>
                            </div>
                            <div className={styles.historyRight}>
                                <div className={styles.historyAmounts}>
                                    <span className={styles.historyAmount}>
                                        {formatMoney(b.annualAmount)}
                                    </span>
                                </div>
                                <span className={`${styles.badge} ${styles[`badge${b.status}`]}`}>
                                    {b.status === 'OPEN' ? 'Abierto' : 'Cerrado'}
                                </span>
                                <button
                                    className={styles.btnView}
                                    onClick={() => navigate(`/budget/${communityId}/${b.id}`)}
                                >
                                    Ver
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};