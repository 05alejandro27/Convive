import { useEffect, useState } from "react";
//useNavigate,
import { useParams } from "react-router-dom";
import type { UserResponse } from "../../services/user.service";
import { userService } from "../../services/user.service";
import { UserTable } from './components/UserTable';
import styles from './UsersPage.module.css';


export const UsersPage = () => {
    const {communityId} = useParams<{communityId: string}>();
    //const navigate = useNavigate();

    //Estado
    const [users, setUsers] = useState<UserResponse[]>([]);
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [allUsers, setAllUsers] = useState<UserResponse[]>([]);
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
                setAllUsers(usersData);
                setUsers(usersData);
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
        </div>
    );
};
