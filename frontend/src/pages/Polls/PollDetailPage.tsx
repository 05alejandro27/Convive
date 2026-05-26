import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { pollService } from '../../services/poll.service';
import type { PollResponse, VoteResponse } from '../../services/poll.service';
import styles from './PollDetailPage.module.css';
import { formatDeadline, voteLabel } from '../../utils/formatters';

export const PollDetailPage = () => {
    const { communityId, pollId } = useParams<{ communityId: string; pollId: string }>();
    const navigate = useNavigate();

    const [poll, setPoll] = useState<PollResponse | null>(null);
    const [votes, setVotes] = useState<VoteResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [voting, setVoting] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                setError(null);
                const pollData = await pollService.findById(Number(communityId), Number(pollId));
                setPoll(pollData);
                const votesData = await pollService.getVotes(Number(communityId), Number(pollId));
                setVotes(votesData);
            } catch {
                setError('Error al cargar la votación');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [communityId, pollId]);

    const handleVote = async (voteValue: 'IN_FAVOR' | 'AGAINST' | 'ABSTAIN') => {
        try {
            setVoting(true);
            setError(null);
            await pollService.vote(Number(communityId), Number(pollId), { voteValue });
            const pollData = await pollService.findById(Number(communityId), Number(pollId));
            setPoll(pollData);
            const votesData = await pollService.getVotes(Number(communityId), Number(pollId));
            setVotes(votesData);
        } catch {
            setError('No se ha podido registrar el voto');
        } finally {
            setVoting(false);
        }
    };

    if (loading) {
        return <p className={styles.loading}>Cargando...</p>;
    }

    if (!poll) {
        return <p className={styles.loading}>Votación no encontrada.</p>;
    }

    const inFavor = votes.filter((v) => v.voteValue === 'IN_FAVOR');
    const against = votes.filter((v) => v.voteValue === 'AGAINST');
    const abstain = votes.filter((v) => v.voteValue === 'ABSTAIN');

    const isOpen = poll.status === 'OPEN';

    return (
        <div className={styles.container}>
            <button className={styles.btnBack} onClick={() => navigate(`/polls/${communityId}`)}>
                Volver
            </button>

            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <h1 className={styles.title}>{poll.title}</h1>
                    <span className={`${styles.badge} ${isOpen ? styles.badgeOPEN : styles.badgeCLOSED}`}>
                        {isOpen ? 'Abierta' : 'Cerrada'}
                    </span>
                </div>

                <p className={styles.description}>{poll.description}</p>

                <div className={styles.meta}>
                    <span>Creada por: {poll.creatorName}</span>
                    <span>Fecha límite: {formatDeadline(poll.deadline)}</span>
                    <span>{poll.totalVotes} votos registrados</span>
                </div>

                {error && <p className={styles.error}>{error}</p>}

                {isOpen && !poll.userVoted && (
                    <div className={styles.voteSection}>
                        <p className={styles.voteTitle}>Emite tu voto</p>
                        <div className={styles.voteButtons}>
                            <button
                                className={`${styles.btnVote} ${styles.btnFavor}`}
                                onClick={() => handleVote('IN_FAVOR')}
                                disabled={voting}
                            >
                                A favor
                            </button>
                            <button
                                className={`${styles.btnVote} ${styles.btnContra}`}
                                onClick={() => handleVote('AGAINST')}
                                disabled={voting}
                            >
                                En contra
                            </button>
                            <button
                                className={`${styles.btnVote} ${styles.btnAbstain}`}
                                onClick={() => handleVote('ABSTAIN')}
                                disabled={voting}
                            >
                                Abstención
                            </button>
                        </div>
                    </div>
                )}

                {isOpen && poll.userVoted && (
                    <p className={styles.votedNotice}>Ya has emitido tu voto en esta votación.</p>
                )}
            </div>

            {votes.length > 0 && (
                <div className={styles.resultsCard}>
                    <h2 className={styles.resultsTitle}>Resultados</h2>

                    <div className={styles.resultsGrid}>
                        <div className={styles.resultGroup}>
                            <span className={styles.resultLabel}>A favor</span>
                            <span className={styles.resultCount}>{inFavor.length}</span>
                        </div>
                        <div className={styles.resultGroup}>
                            <span className={styles.resultLabel}>En contra</span>
                            <span className={styles.resultCount}>{against.length}</span>
                        </div>
                        <div className={styles.resultGroup}>
                            <span className={styles.resultLabel}>Abstención</span>
                            <span className={styles.resultCount}>{abstain.length}</span>
                        </div>
                    </div>

                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles.thLeft}>VECINO</th>
                                <th>PISO</th>
                                <th>VOTO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {votes.map((vote) => (
                                <tr key={vote.id}>
                                    <td className={styles.tdLeft}>{vote.voterName}</td>
                                    <td>{vote.apartment}</td>
                                    <td>
                                        <span className={`${styles.voteBadge} ${styles['voteBadge_' + vote.voteValue]}`}>
                                            {voteLabel(vote.voteValue)}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};