import { useNavigate } from 'react-router-dom';
import type { ApartmentResponse } from '../../../services/apartment.service';
import styles from '../ApartmentsPage.module.css';

//Traducir status a español
const statusLabel = (status: string) => {
    switch (status) {
        case 'OCCUPIED':
            return 'Ocupado';
        case 'EMPTY':
            return 'Vacío';
        case 'INACTIVE':
            return 'Inactivo';
        default:
            return status;
    }
};

export const ApartmentTable = ({ apartments, communityId, onToggleActive }: Props) => {
    const navigate = useNavigate();

    if (apartments.length === 0) {
        return (
            <p className={styles.empty}>
                No se encontraron pisos con los filtros seleccionados.
            </p>
        );
    }

    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>PLANTA</th>
                        <th>PUERTA</th>
                        <th>VECINO ASIGNADO</th>
                        <th>ESTADO</th>
                        <th>ACCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    {apartments.map((apt) => (
                        <tr
                            key={apt.id}
                            className={apt.status === 'INACTIVE' ? styles.rowInactive : ''}
                        >
                            <td>{apt.floor}</td>
                            <td>{apt.door}</td>
                            <td>
                                {apt.residentFullName ? apt.residentFullName : '—'}
                            </td>
                            <td>
                                <span className={`${styles.badge} ${styles[`badge${apt.status}`]}`}>
                                    {statusLabel(apt.status)}
                                </span>
                            </td>
                            <td className={styles.actions}>
                                <button
                                    className={styles.btnEdit}
                                    onClick={() => navigate(`/apartments/${communityId}/edit/${apt.id}`)}
                                >
                                    Editar
                                </button>

                                <button
                                    className={apt.active ? styles.btnDeactivate : styles.btnActivate}
                                    onClick={() => onToggleActive(apt.id)}
                                >
                                    {apt.active ? 'Desactivar' : 'Activar'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

interface Props {
    apartments: ApartmentResponse[];
    communityId: string;
    onToggleActive: (apartmentId: number) => void;
}