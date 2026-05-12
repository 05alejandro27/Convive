import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { UserResponse } from "../../services/user.service";
import { userService } from "../../services/user.service";
import { UserTable } from './components/UserTable';
import { UserFilters } from './components/UserFilters';
import styles from './UsersPage.module.css';
import { invitationService } from '../../services/invitation.service';
import type { InvitationListResponse } from '../../services/invitation.service';
import { InvitationList } from "./components/InvitationList";


export const UsersPage = () => {
    const navigate = useNavigate();
    const {communityId} = useParams<{communityId: string}>();

    //Estado
    const [allUsers, setAllUsers] = useState<UserResponse[]>([]);
    const [users, setUsers] = useState<UserResponse[]>([]);
    const [invitations, setInvitations] = useState<InvitationListResponse[]>([]);
    const [uniqueApartments, setUniqueApartments] = useState<string[]>([]);
    const [filterName, setFilterName] = useState('');
    const [filterEmail, setFilterEmail] = useState('');
    const [filterPhone, setFilterPhone] = useState('');
    const [filterApartment, setFilterApartment] = useState('');
    const [filterRole, setFilterRole] = useState('');
    const [filterEnabled, setFilterEnabled] = useState('');
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

                //Extraer pisos únicos de los usuarios
                const apartments = usersData
                    .map((u) => u.apartment)
                    .filter((apt) => apt && apt !== '—')
                    .filter((apt, index, self) => self.indexOf(apt) === index)
                    .sort();
                setUniqueApartments(apartments);
                
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

    // Filtrado en memoria
    useEffect(() => {
        let filtered = allUsers;

        if (filterName) {
            const name = filterName.toLowerCase();
            filtered = filtered.filter((u) => {
                const full = `${u.firstName} ${u.lastName1} ${u.lastName2 ?? ''}`.toLowerCase();
                return full.includes(name);
            });
        }

        if (filterEmail) {
            filtered = filtered.filter((u) =>
                u.email.toLowerCase().includes(filterEmail.toLowerCase())
            );
        }

        if (filterPhone) {
            filtered = filtered.filter((u) =>
                u.phone.includes(filterPhone)
            );
        }

        if (filterApartment) {
            filtered = filtered.filter((u) => u.apartment === filterApartment);
        }

        if (filterRole) {
            filtered = filtered.filter((u) => u.role === filterRole);
        }

        if (filterEnabled) {
            filtered = filtered.filter((u) => String(u.enabled) === filterEnabled);
        }

        setUsers(filtered);
    }, [filterName, filterEmail, filterPhone, filterApartment, filterRole, filterEnabled, allUsers]);

    const handleToggleEnable = async (userId: number) => {
        try {
            await userService.toggleEnable(Number(communityId), userId);

            const usersData = await userService.findAll(Number(communityId));

            setAllUsers(usersData);
        } catch {
            setError('Error al cambiar el estado del usuario');
        }
    };

    if (loading) {
        return <p className={styles.loading}>Cargando...</p>
    }


    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Gestión de usuarios</h1>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <UserFilters
                filterName={filterName}
                filterEmail={filterEmail}
                filterPhone={filterPhone}
                filterApartment={filterApartment}
                filterRole={filterRole}
                filterEnabled={filterEnabled}
                uniqueApartments={uniqueApartments}
                onNameChange={setFilterName}
                onEmailChange={setFilterEmail}
                onPhoneChange={setFilterPhone}
                onApartmentChange={setFilterApartment}
                onRoleChange={setFilterRole}
                onEnabledChange={setFilterEnabled}
            />


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
