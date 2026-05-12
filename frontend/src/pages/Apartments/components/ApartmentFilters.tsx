import styles from '../ApartmentsPage.module.css';

export const ApartmentFilters = ({
    filterFloor,
    filterDoor,
    filterTenant,
    filterStatus,
    uniqueFloors,
    uniqueDoors,
    onFloorChange,
    onDoorChange,
    onTenantChange,
    onStatusChange,
}: Props) => {
    return (
        <div className={styles.filters}>
            <div className={styles.filterGroup}>
                <label htmlFor="filterFloor">Planta:</label>
                <select
                    id="filterFloor"
                    value={filterFloor}
                    onChange={(e) => onFloorChange(e.target.value)}
                >
                    <option value="">Todas</option>
                    {uniqueFloors.map((f) => (
                        <option key={f} value={f}>
                            {f}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.filterGroup}>
                <label htmlFor="filterDoor">Puerta:</label>
                <select
                    id="filterDoor"
                    value={filterDoor}
                    onChange={(e) => onDoorChange(e.target.value)}
                >
                    <option value="">Todas</option>
                    {uniqueDoors.map((d) => (
                        <option key={d} value={d}>
                            {d}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.filterGroup}>
                <label htmlFor="filterTenant">Vecino:</label>
                <input
                    id="filterTenant"
                    type="text"
                    className={styles.filterInput}
                    placeholder="Buscar por vecino..."
                    value={filterTenant}
                    onChange={(e) => onTenantChange(e.target.value)}
                />
            </div>

            <div className={styles.filterGroup}>
                <label htmlFor="filterStatus">Estado:</label>
                <select
                    id="filterStatus"
                    value={filterStatus}
                    onChange={(e) => onStatusChange(e.target.value)}
                >
                    <option value="">Todos</option>
                    <option value="OCCUPIED">Ocupado</option>
                    <option value="EMPTY">Vacío</option>
                    <option value="INACTIVE">Inactivo</option>
                </select>
            </div>
        </div>
    );
};

interface Props {
    filterFloor: string;
    filterDoor: string;
    filterTenant: string;
    filterStatus: string;
    uniqueFloors: number[];
    uniqueDoors: string[];
    onFloorChange: (value: string) => void;
    onDoorChange: (value: string) => void;
    onTenantChange: (value: string) => void;
    onStatusChange: (value: string) => void;
}