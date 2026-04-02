import { useNavigate } from 'react-router-dom';
import type { UserResponse } from '../../../services/user.service'
import styles from '../UsersPage.module.css';

const roleLabel = (role: string) => {
    switch (role) {
        case 'PRESIDENT':
            return 'Presidente/a';
        case 'RESIDENT':
            return 'Vecino/a';
        default:
            return role;
    }
};

//Traducir estado a español
const enabledLabel = (enabled: boolean) => {
    return enabled ? 'Habilitado' : 'Deshabilitado';
};

//Construir nombre completo
const fullName = (user: UserResponse) => {
    const parts = [user.firstName, user.lastName1];
    if (user.lastName2) {
        parts.push(user.lastName2);
    }
    return parts.join(' ');
};


export const UserTable = ({ users, communityId, onToggleEnable }: Props) => {
    const navigate = useNavigate();

    if (users.length === 0) {
        return (
            <p className={styles.empty}>
                No se encontraron usuarios.
            </p>
        );
    }

    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>NOMBRE</th>
                        <th>PISO</th>
                        <th>CORREO</th>
                        <th>TELÉFONO</th>
                        <th>ROL</th>
                        <th>ESTADO</th>
                        <th>ACCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((usr) => (
                        <tr
                            key={usr.id}
                            className={!usr.enabled ? styles.rowInactive : ''}
                        >
                            <td>{fullName(usr)}</td>
                            <td>{usr.apartment ? usr.apartment : '—'}</td>
                            <td>{usr.email}</td>
                            <td>{usr.phone}</td>
                            <td>
                                <span className={`${styles.badge} ${styles[`badge${usr.role}`]}`}>
                                    {roleLabel(usr.role)}
                                </span>
                            </td>
                            <td>
                                <span className={`${styles.badge} ${usr.enabled ? styles.badgeActive : styles.badgeInactive}`}>
                                    {enabledLabel(usr.enabled)}
                                </span>
                            </td>
                            <td className={styles.actions}>
                                <button
                                    className={styles.btnEdit}
                                    onClick={() => navigate(`/users/${communityId}/edit/${usr.id}`)}
                                >
                                    Editar
                                </button>

                                {usr.role !== 'PRESIDENT' && (
                                    <button
                                        className={usr.enabled ? styles.btnDeactivate : styles.btnActivate}
                                        onClick={() => onToggleEnable(usr.id)}
                                    >
                                        {usr.enabled ? 'Deshabilitar' : 'Habilitar'}
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

interface Props {
    users: UserResponse[];
    communityId: string;
    onToggleEnable: (userId: number) => void;
}