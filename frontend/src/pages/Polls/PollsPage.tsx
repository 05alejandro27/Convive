import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { pollService } from '../../services/poll.service';
import type { PollResponse } from '../../services/poll.service';
import styles from './PollsPage.module.css';
import { formatDeadline } from '../../utils/formatters';
import { getRole } from '../../utils/getRole';

export const PollsPage = () => {
    const { communityId } = useParams<{ communityId: string }>();
    const navigate = useNavigate();

    const [polls, setPolls] = useState<PollResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const role = getRole();
    const isPresident = role === 'PRESIDENT';

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await pollService.findAll(Number(communityId));
                setPolls(data);
            } catch {
                setError('Error al cargar las votaciones');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [communityId]);

    if (loading) {
        return <p className={styles.loading}>Cargando...</p>;
    }

    const openPolls = polls.filter((p) => p.status === 'OPEN');
    const closedPolls = polls.filter((p) => p.status === 'CLOSED');

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Votaciones</h1>
                {isPresident && (
                    <button
                        className={styles.btnCreate}
                        onClick={() => navigate(`/polls/${communityId}/create`)}
                    >
                        Nueva votación
                    </button>
                )}
            </div>

            {error && <p className={styles.error}>{error}</p>}

            {polls.length === 0 && (
                <p className={styles.empty}>No hay votaciones en esta comunidad.</p>
            )}

            {openPolls.length > 0 && (
                <div className={styles.section}>
                    {openPolls.map((poll) => (
                        <div key={poll.id} className={styles.pollCard}>
                            <div className={styles.pollInfo}>
                                <span className={styles.pollTitle}>{poll.title}</span>
                                <div className={styles.pollMeta}>
                                    <span>Cierra: {formatDeadline(poll.deadline)}</span>
                                    <span>{poll.totalVotes} votos</span>
                                    <span>{poll.userVoted ? 'Ya votaste' : 'Pendiente tu voto'}</span>
                                </div>
                            </div>
                            <div className={styles.pollActions}>
                                <span className={`${styles.badge} ${styles.badgeOPEN}`}>Abierta</span>
                                <button
                                    className={styles.btnDetail}
                                    onClick={() => navigate(`/polls/${communityId}/${poll.id}`)}
                                >
                                    Ver detalle
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {closedPolls.length > 0 && (
                <div className={styles.section}>
                    {closedPolls.map((poll) => (
                        <div key={poll.id} className={`${styles.pollCard} ${styles.pollCardClosed}`}>
                            <div className={styles.pollInfo}>
                                <span className={styles.pollTitle}>{poll.title}</span>
                                <div className={styles.pollMeta}>
                                    <span>Cerrada: {formatDeadline(poll.deadline)}</span>
                                    <span>{poll.totalVotes} votos</span>
                                </div>
                            </div>
                            <div className={styles.pollActions}>
                                <span className={`${styles.badge} ${styles.badgeCLOSED}`}>Cerrada</span>
                                <button
                                    className={styles.btnDetail}
                                    onClick={() => navigate(`/polls/${communityId}/${poll.id}`)}
                                >
                                    Ver detalle
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};