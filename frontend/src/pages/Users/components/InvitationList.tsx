import type { InvitationListResponse } from "../../../services/invitation.service";
import styles from '../UsersPage.module.css';
import { formatDateLong } from '../../../utils/formatters';

//Construir el piso
const formatApartment = (floor: number, door: string) => {
    return `Planta: ${floor} Puerta: ${door}`;
};

export const InvitationList = ({invitations}: Props) => {

    if (invitations.length === 0) {
        return (
            <div>
                <p className={styles.empty}>
                    No hay ningún código de invitación.
                </p>
            </div>
        )
    }

    return (
        <ul className={styles.invitationList}>
            {invitations.map((inv) => (
                <li key={inv.code} className={styles.invitationCard}>
                    <span className={styles.invitationCode}>{inv.code}</span>
                    <div className={styles.invitationInfo}>
                        <span>{formatApartment(inv.floor, inv.door)}</span>
                        <span>Expira: {formatDateLong(inv.expiresDate)}</span>
                    </div>
                </li>
            ))}
        </ul>
    )
}

interface Props {
    invitations: InvitationListResponse[];
}