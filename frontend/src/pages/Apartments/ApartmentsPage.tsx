import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apartmentService } from '../../services/apartment.service';
import type { ApartmentResponse, ApartmentStatsResponse } from '../../services/apartment.service';
import { ApartmentStats } from './components/ApartmentStats';
import { ApartmentFilters } from './components/ApartmentFilters';
import { ApartmentTable } from './components/ApartmentTable';
import styles from './ApartmentsPage.module.css';

export const ApartmentsPage = () => {
    const {communityId} = useParams<{communityId: string}>();
    const navigate = useNavigate();

    //Estado
    const [apartments, setApartments] = useState<ApartmentResponse[]>([]);
    const [allApartments, setAllApartments] = useState<ApartmentResponse[]>([]);
    const [stats, setStats] = useState<ApartmentStatsResponse | null>(null);
    const [filterStatus, setFilterStatus] = useState<string>('');
    const [filterFloor, setFilterFloor] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [allFloors, setAllFloors] = useState<number[]>([]);

    //Cargar al montar y cuando cambian los filtros
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                setError(null);
                const id = Number(communityId);
                const apartmentsData = await apartmentService.findAll(id); //Sin filtros
                const statsData = await apartmentService.getStats(id);
                setAllApartments(apartmentsData); //Guardo el array completo
                setApartments(apartmentsData);    //También el que se muestra
                const floors = [...new Set(apartmentsData.map((a) => a.floor))].sort((a, b) => a - b);
                setAllFloors(floors);
                setStats(statsData);
            } catch {
                setError('Error al cargar los pisos');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [communityId]);

    //Filtrado en memoria, sin llamar al backend
    useEffect(() => {
        let filtered = allApartments;
        if (filterStatus) {
            filtered = filtered.filter((a) => a.status === filterStatus);
        }
        if (filterFloor) {
            filtered = filtered.filter((a) => a.floor === Number(filterFloor));
        }
        setApartments(filtered);
    }, [filterStatus, filterFloor, allApartments]);

    //Toggle activar/desactivar
    const handleToggleActive = async (apartmentId: number) => {
        try {
            await apartmentService.toggleActive(Number(communityId), apartmentId);

            //Recargamos los datos
            const id = Number(communityId);

            const apartmentsData = await apartmentService.findAll(id);
            const statsData = await apartmentService.getStats(id);

            setAllApartments(apartmentsData);
            setStats(statsData);
        } catch {
            setError('Error al cambiar el estado del piso');
        }
    };

    if (loading) {
        return <p className={styles.loading}>Cargando...</p>
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Gestión de pisos</h1>
                <button className={styles.btnCreate} onClick={() => navigate(`/apartments/${communityId}/create`)}>
                    Añadir piso
                </button>
            </div>

            {stats && <ApartmentStats stats={stats} />}

            <ApartmentFilters
                filterStatus={filterStatus}
                filterFloor={filterFloor}
                uniqueFloors={allFloors}
                onStatusChange={setFilterStatus}
                onFloorChange={setFilterFloor}
            />

            {error && <p className={styles.error}>{error}</p>}

            <ApartmentTable
                apartments={apartments}
                communityId={communityId!}
                onToggleActive={handleToggleActive}
            />
        </div>
    );
};