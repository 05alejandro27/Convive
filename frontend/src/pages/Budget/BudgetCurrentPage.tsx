import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { budgetService } from '../../services/budget.service';
import type { BudgetResponse, BudgetStatsResponse } from '../../services/budget.service';
import { expenseService } from '../../services/expenses.service';
import type { ExpenseResponse } from '../../services/expenses.service';
import { BudgetStats } from './components/BudgetStats';
import { getRole } from '../../utils/getRole';
import styles from './BudgetPage.module.css';
import { formatDate, formatMoney, monthLabel } from '../../utils/formatters';

export const BudgetCurrentPage = () => {
    const { communityId } = useParams<{communityId: string}>();
    const navigate = useNavigate();

    const [budget, setBudget] = useState<BudgetResponse | null>(null);
    const [stats, setStats] = useState<BudgetStatsResponse | null>(null);
    const [expenses, setExpenses] = useState<ExpenseResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [noBudget, setNoBudget] = useState(false);

    const isPresident = getRole() === 'PRESIDENT';

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                setError(null);
                const id = Number(communityId);
                const budgetData = await budgetService.getCurrent(id);
                setBudget(budgetData);
                const statsData = await budgetService.getStats(id);
                setStats(statsData);
                const expensesData = await expenseService.findAll(budgetData.id);
                setExpenses(expensesData);
            } catch {
                setNoBudget(true);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [communityId]);

    const handleClose = async () => {
        if (!budget) {
            return;
        }

        try {
            await budgetService.close(Number(communityId), budget.id);
            const budgetData = await budgetService.getCurrent(Number(communityId));
            setBudget(budgetData);
        } catch {
            setNoBudget(true);
            setBudget(null);
        }
    };

    const handleEditFund = async () => {
        if (!budget) {
            return;
        }

        const input = prompt('Nuevo fondo de emergencia:', String(budget.emergencyFund));
        if (input === null) {
            return;
        }

        const value = parseFloat(input);
        if (isNaN(value) || value < 0) {
            setError('El fondo de emergencia debe ser un número positivo');
            return;
        }

        try {
            const updated = await budgetService.updateEmergencyFund(Number(communityId), budget.id, { emergencyFund: value });
            setBudget(updated);
        } catch {
            setError('Error al actualizar el fondo de emergencia');
        }
    };

    if (loading) {
        return <p className={styles.loading}>Cargando...</p>;
    }

    if (noBudget) {
        return (
            <div className={styles.container}>
                <div className={styles.emptyState}>
                    <h1 className={styles.title}>Presupuesto actual</h1>
                    <p>No hay ningún presupuesto activo en esta comunidad.</p>
                    {isPresident && (
                        <>
                            <p>Pulsa el botón para abrir uno nuevo.</p>
                            <button
                                className={styles.btnOpen}
                                onClick={() => navigate(`/budget/${communityId}/create`)}
                            >
                                Abrir presupuesto
                            </button>
                        </>
                    )}
                </div>
            </div>
        );
    }

    //Calculo los gastos recientes
    const recentExpenses = [...expenses].sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()).slice(0, 5);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.titleRow}>
                    <h1 className={styles.title}>{budget!.name || 'Presupuesto'}</h1>
                    <span className={`${styles.badge} ${styles.badgeOPEN}`}>Abierto</span>
                </div>
            </div>

            <p className={styles.subtitle}>
                Del {formatDate(budget!.startDate)} al {formatDate(budget!.endDate)}
            </p>

            <button
                className={styles.linkHistory}
                onClick={() => navigate(`/budget/${communityId}/history`)}
            >
                Ver presupuestos anteriores
            </button>

            {error && <p className={styles.error}>{error}</p>}

            {stats && (
                <div>
                    <BudgetStats stats={stats} annualAmount={budget!.annualAmount} />
                    <div className={styles.progressWrapper}>
                        <div className={styles.progressHeader}>
                            <span>Ejecución del presupuesto</span>
                            <span>{stats.spentPercentage}% ejecutado</span>
                        </div>
                        <div className={styles.progressBar}>
                            <div
                                className={styles.progressFill}
                                style={{ width: `${Math.min(stats.spentPercentage, 100)}%` }}
                            />
                        </div>
                    </div>
                </div>
            )}

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>CONCEPTO</th>
                        <th>TIPO</th>
                        <th>MES</th>
                        <th>COSTE</th>
                        {isPresident && <th>ACCIONES</th>}
                    </tr>
                </thead>
                <tbody>
                    {recentExpenses.slice(0, 5).map((expense) => (
                        <tr key={expense.id}>
                            <td>{expense.name}</td>
                            <td>
                                <span className={styles.badge}>{expense.expenseType === 'FIXED' ? 'Fijo' : 'Variable'}</span>   
                            </td>
                            <td>{monthLabel(expense.month)}</td>
                            <td>{formatMoney(expense.cost)}</td>
                            {isPresident && (
                                <td>
                                    <button
                                        className={styles.btnEdit}
                                        onClick={() => navigate(`/expenses/${communityId}/${budget!.id}/edit/${expense.id}`)}
                                    >
                                        Editar
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                    {recentExpenses.length === 0 && (
                        <tr>
                            <td colSpan={isPresident ? 5 : 4} className={styles.empty}>No hay gastos registrados.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {recentExpenses.length > 0 && (
                <button
                    className={styles.linkHistory}
                    onClick={() => navigate(`/expenses/${communityId}/${budget!.id}`)}
                >
                    Ver gastos
                </button>
            )}

            <div className={styles.emergencyCard}>
                <div className={styles.emergencyInfo}>
                    <span className={styles.emergencyLabel}>FONDO DE EMERGENCIA</span>
                    <span className={styles.emergencyValue}>{formatMoney(budget!.emergencyFund)}</span>
                    <span className={styles.emergencySub}>Reserva para la comunidad</span>
                </div>
                {isPresident && (
                    <button className={styles.btnEdit} onClick={handleEditFund}>
                        Editar fondo
                    </button>
                )}
            </div>

            {isPresident && (
                <div className={styles.closeSection}>
                    <div className={styles.closeInfo}>
                        <span className={styles.closeTitle}>Cerrar presupuesto</span>
                        <span className={styles.closeSub}>Una vez cerrado no podrá editarse.</span>
                    </div>
                    <button className={styles.btnClose} onClick={handleClose}>
                        Cerrar presupuesto
                    </button>
                </div>
            )}
        </div>
    );
};