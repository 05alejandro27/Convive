import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { UserResponse } from "../../services/user.service";
import { userService } from "../../services/user.service";
import { UserTable } from './components/UserTable';
import styles from './UsersPage.module.css';
import { invitationService, type InvitationListResponse } from "../../services/invitation.service";
import { InvitationList } from "./components/InvitationList";


export const UsersPage = () => {
    const navigate = useNavigate();
    const {communityId} = useParams<{communityId: string}>();

    //Estado
    const [users, setUsers] = useState<UserResponse[]>([]);
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [allUsers, setAllUsers] = useState<UserResponse[]>([]);
    const [invitations, setInvitations] = useState<InvitationListResponse[]>([]);
    //Poner filtros para usuario
    //const [filterStatus, setFilterStatus] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    //Carga al montar y cuando cambian los filtros
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                setError(null);
                const id = Number(communityId);
                const usersData = await userService.findAll(id);
                setUsers(usersData);
                setAllUsers(usersData);
                const invitationCodes = await invitationService.findAll(id);
                setInvitations(invitationCodes);
            } catch {
                setError('Error al cargar los usuarios')
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [communityId]);

    //Filtros para el usuario

    const handleToggleEnable = async (userId: number) => {
        try {
            await userService.toggleEnable(Number(communityId), userId);

            const id = Number(communityId);
            const usersData = await userService.findAll(id);
            
            setAllUsers(usersData);
            setUsers(usersData);
        } catch {
            setError('Error al cambiar el estado del usuario');
        }
    }

    if (loading) {
        return <p className={styles.loading}>Cargando...</p>
    }


    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Gestión de usuarios</h1>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <UserTable
                users={users}
                communityId={communityId!}
                onToggleEnable={handleToggleEnable}
            />

            <div className={`${styles.header} ${styles.invitationHeader}`}>
                <h1 className={styles.title}>Invitaciones</h1>
                <button
                    className={styles.btnCreate}
                    onClick={() => navigate(`/users/${communityId}/invite`)}
                >
                    Generar código
                </button>
            </div>

            <InvitationList
                invitations={invitations}
            />
        </div>
    );
};
