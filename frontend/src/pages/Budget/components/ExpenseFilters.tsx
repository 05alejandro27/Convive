import styles from './ExpenseFilters.module.css';

const MONTHS = [
    { value: 1, label: 'Enero' },
    { value: 2, label: 'Febrero' },
    { value: 3, label: 'Marzo' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Mayo' },
    { value: 6, label: 'Junio' },
    { value: 7, label: 'Julio' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Septiembre' },
    { value: 10, label: 'Octubre' },
    { value: 11, label: 'Noviembre' },
    { value: 12, label: 'Diciembre' },
];

export const ExpenseFilters = ({ filterMonth, filterType, onMonthChange, onTypeChange }: Props) => {
    return (
        <div className={styles.filters}>
            <div className={styles.filterGroup}>
                <label htmlFor="filterMonth">Mes:</label>
                <select id="filterMonth" value={filterMonth} onChange={(e) => onMonthChange(e.target.value)}>
                    <option value="">Todos</option>
                    {MONTHS.map((m) => (
                        <option key={m.value} value={m.value}>
                            {m.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className={styles.filterGroup}>
                <label htmlFor="filterType">Tipo:</label>
                <select id="filterType" value={filterType} onChange={(e) => onTypeChange(e.target.value)}>
                    <option value="">Todos</option>
                    <option value="FIXED">Fijo</option>
                    <option value="VARIABLE">Variable</option>
                </select>
            </div>
        </div>
    );
};

interface Props {
    filterMonth: string;
    filterType: string;
    onMonthChange: (value: string) => void;
    onTypeChange: (value: string) => void;
}