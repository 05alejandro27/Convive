import styles from '../ApartmentsPage.module.css';

export const ApartmentFilters = ({filterStatus, filterFloor, uniqueFloors, onStatusChange, onFloorChange,}: Props) => {
    return (
        <div className={styles.filters}>
            <div className={styles.filterGroup}>
                <label htmlFor="filterStatus">Estado:</label>
                <select id="filterStatus" value={filterStatus} onChange={(e) => onStatusChange(e.target.value)}>
                    <option value="">Todos</option>
                    <option value="OCCUPIED">Ocupado</option>
                    <option value="EMPTY">Vacío</option>
                    <option value="INACTIVE">Inactivo</option>
                </select>
            </div>

            <div className={styles.filterGroup}>
                <label htmlFor="filterFloor">Planta:</label>
                <select id="filterFloor" value={filterFloor} onChange={(e) => onFloorChange(e.target.value)}>
                    <option value="">Todas</option>
                    {uniqueFloors.map((f) => (
                        <option key={f} value={f}>
                            {f}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

interface Props {
    filterStatus: string;
    filterFloor: string;
    uniqueFloors: number[];
    onStatusChange: (value: string) => void;
    onFloorChange: (value: string) => void;
}