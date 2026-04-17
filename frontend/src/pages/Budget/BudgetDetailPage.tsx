import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { budgetService } from '../../services/budget.service';
import type { BudgetResponse } from '../../services/budget.service';
import { expenseService } from '../../services/expenses.service';
import type { ExpenseResponse } from '../../services/expenses.service';
import { ExpenseFilters } from './components/ExpenseFilters';
import { ExpenseTable } from '../Expenses/components/ExpenseTable';
import { StatCard } from './components/StatCard';
import styles from './BudgetPage.module.css';

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
};

const formatMoney = (amount: number) => {
    return amount.toLocaleString('es-ES', { minimumFractionDigits: 2 }) + ' €';
};

export const BudgetDetailPage = () => {
    const { communityId, budgetId } = useParams<{ communityId: string; budgetId: string }>();
    const navigate = useNavigate();

    const [budget, setBudget] = useState<BudgetResponse | null>(null);
    const [expenses, setExpenses] = useState<ExpenseResponse[]>([]);
    const [allExpenses, setAllExpenses] = useState<ExpenseResponse[]>([]);
    const [filterMonth, setFilterMonth] = useState<string>('');
    const [filterType, setFilterType] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                setError(null);
                const budgetData = await budgetService.getByBudgetId(Number(communityId), Number(budgetId));
                setBudget(budgetData);
                const expensesData = await expenseService.findAll(Number(budgetId));
                setAllExpenses(expensesData);
                setExpenses(expensesData);
            } catch {
                setError('Error al cargar el presupuesto');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [communityId, budgetId]);

    useEffect(() => {
        let filtered = allExpenses;
        if (filterMonth) {
            filtered = filtered.filter((e) => e.month === Number(filterMonth));
        }
        if (filterType) {
            filtered = filtered.filter((e) => e.expenseType === filterType);
        }
        setExpenses(filtered);
    }, [filterMonth, filterType, allExpenses]);

    if (loading) {
        return <p className={styles.loading}>Cargando...</p>;
    }

    if (!budget) {
        return <p className={styles.empty}>Presupuesto no encontrado.</p>;
    }

    const totalSpent = allExpenses.reduce((sum, e) => sum + e.cost, 0);

    return (
        <div className={styles.container}>
            <button
                className={styles.linkHistory}
                onClick={() => navigate(`/budget/${communityId}/history`)}
            >
                Volver al historial
            </button>

            <div className={styles.header}>
                <div className={styles.titleRow}>
                    <h1 className={styles.title}>
                        {budget.name || `Presupuesto ${new Date(budget.startDate).getFullYear()}`}
                    </h1>
                    <span className={`${styles.badge} ${styles[`badge${budget.status}`]}`}>
                        {budget.status === 'OPEN' ? 'Abierto' : 'Cerrado'}
                    </span>
                </div>
            </div>

            <p className={styles.subtitle}>
                {formatDate(budget.startDate)} - {formatDate(budget.endDate)}
            </p>

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.statsRow}>
                <StatCard
                    label="IMPORTE TOTAL"
                    value={formatMoney(budget.annualAmount)}
                />
                <StatCard
                    label="TOTAL GASTADO"
                    value={formatMoney(totalSpent)}
                />
                <StatCard
                    label="FONDO EMERGENCIA"
                    value={formatMoney(budget.emergencyFund)}
                />
            </div>

            <ExpenseFilters
                filterMonth={filterMonth}
                filterType={filterType}
                onMonthChange={setFilterMonth}
                onTypeChange={setFilterType}
            />

            <ExpenseTable
                expenses={expenses}
                communityId={communityId!}
                budgetId={budgetId!}
                isOpen={false}
                onDelete={() => {}}
            />
        </div>
    );
};