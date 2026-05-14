import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { budgetService } from '../../services/budget.service';
import type { BudgetResponse, BudgetStatsResponse } from '../../services/budget.service';
import { expenseService } from '../../services/expenses.service';
import type { ExpenseResponse } from '../../services/expenses.service';
import { pollService } from '../../services/poll.service';
import type { PollResponse } from '../../services/poll.service';
import styles from './HomePage.module.css';
import { decodeToken, formatMoney, formatDate, monthLabel } from '../../utils/formatters';

export const HomePage = () => {
    const { communityId } = useParams<{ communityId: string }>();
    const { user } = useAuth();
    const navigate = useNavigate();

    //Estado del presupuesto
    const [budget, setBudget] = useState<BudgetResponse | null>(null);
    const [budgetStats, setBudgetStats] = useState<BudgetStatsResponse | null>(null);

    //Estado de los gastos
    const [recentExpenses, setRecentExpenses] = useState<ExpenseResponse[]>([]);

    //Estado de las votaciones
    const [polls, setPolls] = useState<PollResponse[]>([]);

    //Estado general
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const id = Number(communityId);

                //Cargo el presupuesto actual
                try {
                    const budgetData = await budgetService.getCurrent(id);
                    setBudget(budgetData);

                    const statsData = await budgetService.getStats(id);
                    setBudgetStats(statsData);

                    //Cargo los últimos gastos del presupuesto activo
                    const expensesData = await expenseService.findAll(budgetData.id);
                    setRecentExpenses(expensesData.slice(0, 3));
                } catch {
                    //No hay presupuesto activo, no es un error
                }

                //Cargo las votaciones
                try {
                    const pollsData = await pollService.findAll(id);
                    setPolls(pollsData.slice(0, 3));
                } catch {
                    //No hay votaciones, no es un error
                }

            } catch {
                //Error general al cargar datos
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [communityId, user]);

    if (loading) {
        return <p className={styles.loading}>Cargando...</p>;
    }

    //Decodifico el rol del JWT
    const tokenData = decodeToken(user!.token);
    const firstName = tokenData?.firstName ?? 'vecino';

    //Calculo las votaciones abiertas y pendientes de voto
    const openPolls = polls.filter((p) => p.status === 'OPEN');
    const pendingVotes = openPolls.filter((p) => !p.userVoted).length;

    //Calculo los gastos del mes actual
    const currentMonth = new Date().getMonth() + 1;
    const monthExpenses = recentExpenses.filter((e) => e.month === currentMonth);
    const monthTotal = monthExpenses.reduce((sum, e) => sum + e.cost, 0);

    return (
        <div className={styles.container}>

            {/*Cabecera de bienvenida*/}
            <div className={styles.welcome}>
                Hola, {firstName}
            </div>

            {/*Tarjetas de resumen*/}
            <div className={styles.statsRow}>
                <div className={styles.statCard} onClick={() => navigate(`/budget/${communityId}/current`)}>
                    <span className={styles.statLabel}>PRESUPUESTO</span>
                    <span className={styles.statValue}>
                        {budget ? formatMoney(budget.annualAmount) : '—'}
                    </span>
                    <span className={styles.statSub}>
                        {budgetStats ? `${budgetStats.spentPercentage}% ejecutado` : 'Sin presupuesto activo'}
                    </span>
                    <span className={styles.statLink}>Ver presupuesto →</span>
                </div>

                <div className={styles.statCard} onClick={() => budget && navigate(`/expenses/${communityId}/${budget.id}`)}>
                    <span className={styles.statLabel}>GASTOS ESTE MES</span>
                    <span className={styles.statValue}>
                        {budget ? formatMoney(monthTotal) : '—'}
                    </span>
                    <span className={styles.statSub}>
                        {budget ? `${monthExpenses.length} gastos registrados` : 'Sin presupuesto activo'}
                    </span>
                    <span className={styles.statLink}>Ver gastos →</span>
                </div>

                <div className={styles.statCard} onClick={() => navigate(`/polls/${communityId}`)}>
                    <span className={styles.statLabel}>VOTACIONES ABIERTAS</span>
                    <span className={styles.statValue}>{openPolls.length}</span>
                    <span className={styles.statSub}>
                        {pendingVotes > 0 ? `${pendingVotes} pendiente tu voto` : 'Todo votado'}
                    </span>
                    <span className={styles.statLink}>Ver votaciones →</span>
                </div>
            </div>

            {/*Votaciones recientes*/}
            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Votaciones recientes</h2>
                    <button className={styles.sectionLink} onClick={() => navigate(`/polls/${communityId}`)}>
                        Ver todas →
                    </button>
                </div>

                {polls.length === 0 ? (
                    <p className={styles.empty}>No hay votaciones registradas.</p>
                ) : (
                    polls.map((poll) => (
                        <div key={poll.id} className={styles.listItem} onClick={() => navigate(`/polls/${communityId}/${poll.id}`)}>
                            <div className={styles.listItemInfo}>
                                <span className={styles.listItemTitle}>{poll.title}</span>
                                <span className={styles.listItemSub}>
                                    {poll.status === 'OPEN' ? 'Cierra' : 'Cerrada'}: {formatDate(poll.deadline)} · {poll.totalVotes} votos
                                </span>
                            </div>
                            <div className={styles.listItemRight}>
                                {poll.status === 'OPEN' && !poll.userVoted && (
                                    <span className={styles.badgePending}>Voto pendiente</span>
                                )}
                                {poll.status === 'OPEN' && poll.userVoted && (
                                    <span className={styles.badgeOpen}>Abierta</span>
                                )}
                                {poll.status === 'CLOSED' && (
                                    <span className={styles.badgeClosed}>Cerrada</span>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/*Últimos gastos*/}
            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Últimos gastos</h2>
                    {budget && (
                        <button className={styles.sectionLink} onClick={() => navigate(`/expenses/${communityId}/${budget.id}`)}>
                            Ver todos →
                        </button>
                    )}
                </div>

                {recentExpenses.length === 0 ? (
                    <p className={styles.empty}>No hay gastos registrados.</p>
                ) : (
                    recentExpenses.map((expense) => (
                        <div key={expense.id} className={styles.listItem}>
                            <div className={styles.listItemInfo}>
                                <span className={styles.listItemTitle}>{expense.name}</span>
                                <span className={styles.listItemSub}>
                                    {monthLabel(expense.month)} · {expense.expenseType === 'FIXED' ? 'FIJO' : 'VARIABLE'}
                                </span>
                            </div>
                            <div className={styles.listItemRight}>
                                <span className={styles.expenseCost}>{formatMoney(expense.cost)}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
};