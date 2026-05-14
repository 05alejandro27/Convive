import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { budgetService } from '../../services/budget.service';
import type { BudgetResponse, BudgetStatsResponse } from '../../services/budget.service';
import { expenseService } from '../../services/expenses.service';
import type { ExpenseResponse } from '../../services/expenses.service';
import { ExpenseFilters } from '../Budget/components/ExpenseFilters';
import { ExpenseTable } from './components/ExpenseTable';
import { BudgetStats } from '../Budget/components/BudgetStats';
import { getRole } from '../../utils/getRole';
import styles from './ExpensesPage.module.css';
import { formatMoney } from '../../utils/formatters';

const MONTH_NAMES = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

export const ExpensesPage = () => {
    const { communityId, budgetId } = useParams<{ communityId: string; budgetId: string }>();
    const navigate = useNavigate();

    const [budget, setBudget] = useState<BudgetResponse | null>(null);
    const [expenses, setExpenses] = useState<ExpenseResponse[]>([]);
    const [allExpenses, setAllExpenses] = useState<ExpenseResponse[]>([]);
    const [stats, setStats] = useState<BudgetStatsResponse | null>(null);
    const [filterMonth, setFilterMonth] = useState<string>(String(new Date().getMonth() + 1));
    const [filterType, setFilterType] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const isPresident = getRole() === 'PRESIDENT';

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                setError(null);
                const id = Number(communityId);
                const budgetData = await budgetService.getByBudgetId(id, Number(budgetId));
                setBudget(budgetData);
                const expensesData = await expenseService.findAll(Number(budgetId));
                setAllExpenses(expensesData);
                setExpenses(expensesData);
                const statsData = await budgetService.getStats(id);
                setStats(statsData);
            } catch {
                setError('Error al cargar los gastos');
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

    const handleDelete = async (expenseId: number) => {
        try {
            await expenseService.delete(Number(budgetId), expenseId);
            const expensesData = await expenseService.findAll(Number(budgetId));
            setAllExpenses(expensesData);
        } catch {
            setError('Error al eliminar el gasto');
        }
    };

    const isOpen = budget?.status === 'OPEN';
    const currentMonth = new Date().getMonth() + 1;
    const selectedMonth = filterMonth ? Number(filterMonth) : currentMonth;
    const monthExpenses = allExpenses
        .filter((e) => e.month === selectedMonth)
        .reduce((sum, e) => sum + e.cost, 0);

    if (loading) {
        return <p className={styles.loading}>Cargando...</p>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Gastos</h1>
                {isPresident && isOpen && (
                    <button
                        className={styles.btnCreate}
                        onClick={() => navigate(`/expenses/${communityId}/${budgetId}/create`)}
                    >
                        Añadir gasto
                    </button>
                )}
            </div>

            {error && <p className={styles.error}>{error}</p>}

            {stats && (
                <BudgetStats
                    stats={stats}
                    annualAmount={budget!.annualAmount}
                    extra={{
                        label: 'ESTE MES',
                        value: formatMoney(monthExpenses),
                        sub: `${MONTH_NAMES[selectedMonth]} ${new Date().getFullYear()}`,
                    }}
                />
            )}

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
                isOpen={isOpen && isPresident}
                onDelete={handleDelete}
            />
        </div>
    );
};