import { useNavigate } from 'react-router-dom';
import type { ExpenseResponse } from '../../../services/expenses.service';
import styles from './ExpenseTable.module.css';
import { formatMoney, monthLabel } from '../../../utils/formatters';

export const ExpenseTable = ({ expenses, communityId, budgetId, isOpen, onDelete }: Props) => {
    const navigate = useNavigate();

    if (expenses.length === 0) {
        return (
            <p className={styles.empty}>
                No se encontraron gastos.
            </p>
        );
    }

    const total = expenses.reduce((sum, e) => sum + e.cost, 0);

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th className={styles.thLeft}>CONCEPTO</th>
                    <th>TIPO</th>
                    <th>MES</th>
                    <th>COSTE</th>
                    {isOpen && <th>ACCIONES</th>}
                </tr>
            </thead>
            <tbody>
                {expenses.map((expense) => (
                    <tr key={expense.id}>
                        <td>{expense.name}</td>
                        <td>
                            <span className={styles.badge}>
                                {expense.expenseType === 'FIXED' ? 'Fijo' : 'Variable'}
                            </span>
                        </td>
                        <td>{monthLabel(expense.month)}</td>
                        <td>{formatMoney(expense.cost)}</td>
                        {isOpen && (
                            <td className={styles.actions}>
                                <button
                                    className={styles.linkAction}
                                    onClick={() => navigate(`/expenses/${communityId}/${budgetId}/edit/${expense.id}`)}
                                >
                                    Editar
                                </button>
                                <button
                                    className={styles.linkActionDanger}
                                    onClick={() => onDelete(expense.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        )}
                    </tr>
                ))}
                <tr className={styles.totalRow}>
                    <td className={styles.tdLeft} colSpan={3}>Total gastado</td>
                    <td>{formatMoney(total)}</td>
                    {isOpen && <td></td>}
                </tr>
            </tbody>
        </table>
    );
};

interface Props {
    expenses: ExpenseResponse[];
    communityId: string;
    budgetId: string;
    isOpen: boolean;
    onDelete: (expenseId: number) => void;
}