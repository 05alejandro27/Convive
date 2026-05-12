import styles from '../UsersPage.module.css';

export const UserFilters = ({
    filterName,
    filterEmail,
    filterPhone,
    filterApartment,
    filterRole,
    filterEnabled,
    uniqueApartments,
    onNameChange,
    onEmailChange,
    onPhoneChange,
    onApartmentChange,
    onRoleChange,
    onEnabledChange,
}: Props) => {
    return (
        <div className={styles.filters}>
            <div className={styles.filterGroup}>
                <label htmlFor="filterName">Nombre:</label>
                <input
                    id="filterName"
                    type="text"
                    className={styles.filterInput}
                    placeholder="Buscar por nombre..."
                    value={filterName}
                    onChange={(e) => onNameChange(e.target.value)}
                />
            </div>

            <div className={styles.filterGroup}>
                <label htmlFor="filterEmail">Correo:</label>
                <input
                    id="filterEmail"
                    type="text"
                    className={styles.filterInput}
                    placeholder="Buscar por correo..."
                    value={filterEmail}
                    onChange={(e) => onEmailChange(e.target.value)}
                />
            </div>

            <div className={styles.filterGroup}>
                <label htmlFor="filterPhone">Teléfono:</label>
                <input
                    id="filterPhone"
                    type="text"
                    className={styles.filterInput}
                    placeholder="Buscar por teléfono..."
                    value={filterPhone}
                    onChange={(e) => onPhoneChange(e.target.value)}
                />
            </div>

            <div className={styles.filterGroup}>
                <label htmlFor="filterApartment">Piso:</label>
                <select
                    id="filterApartment"
                    value={filterApartment}
                    onChange={(e) => onApartmentChange(e.target.value)}
                >
                    <option value="">Todos</option>
                    {uniqueApartments.map((apt) => (
                        <option key={apt} value={apt}>
                            {apt}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.filterGroup}>
                <label htmlFor="filterRole">Rol:</label>
                <select
                    id="filterRole"
                    value={filterRole}
                    onChange={(e) => onRoleChange(e.target.value)}
                >
                    <option value="">Todos</option>
                    <option value="PRESIDENT">Presidente/a</option>
                    <option value="RESIDENT">Vecino/a</option>
                </select>
            </div>

            <div className={styles.filterGroup}>
                <label htmlFor="filterEnabled">Estado:</label>
                <select
                    id="filterEnabled"
                    value={filterEnabled}
                    onChange={(e) => onEnabledChange(e.target.value)}
                >
                    <option value="">Todos</option>
                    <option value="true">Habilitado</option>
                    <option value="false">Deshabilitado</option>
                </select>
            </div>
        </div>
    );
};

interface Props {
    filterName: string;
    filterEmail: string;
    filterPhone: string;
    filterApartment: string;
    filterRole: string;
    filterEnabled: string;
    uniqueApartments: string[];
    onNameChange: (value: string) => void;
    onEmailChange: (value: string) => void;
    onPhoneChange: (value: string) => void;
    onApartmentChange: (value: string) => void;
    onRoleChange: (value: string) => void;
    onEnabledChange: (value: string) => void;
}