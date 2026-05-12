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

    //Estado de datos
    const [allApartments, setAllApartments] = useState<ApartmentResponse[]>([]);
    const [apartments, setApartments] = useState<ApartmentResponse[]>([]);
    const [stats, setStats] = useState<ApartmentStatsResponse | null>(null);
    const [uniqueFloors, setUniqueFloors] = useState<number[]>([]);
    const [uniqueDoors, setUniqueDoors] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    //Estado de filtros
    const [filterFloor, setFilterFloor] = useState('');
    const [filterDoor, setFilterDoor] = useState('');
    const [filterTenant, setFilterTenant] = useState('');
    const [filterStatus, setFilterStatus] = useState('');


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
                
                setStats(statsData);

                //Extraer plantas únicas ordenadas
                const floors = [...new Set(apartmentsData.map((a) => a.floor))].sort((a, b) => a - b);
                setUniqueFloors(floors);

                //Extraer puertas únicas ordenadas
                const doors = [...new Set(apartmentsData.map((a) => a.door))].sort();
                setUniqueDoors(doors);

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

        if (filterFloor) {
            filtered = filtered.filter((a) => a.floor === Number(filterFloor));
        }

        if (filterDoor) {
            filtered = filtered.filter((a) => a.door === filterDoor);
        }

        if (filterTenant) {
            const tenant = filterTenant.toLowerCase();
            filtered = filtered.filter((a) =>
                a.residentFullName?.toLowerCase().includes(tenant)
            );
        }

        if (filterStatus) {
            filtered = filtered.filter((a) => a.status === filterStatus);
        }

        setApartments(filtered);
    }, [filterFloor, filterDoor, filterTenant, filterStatus, allApartments]);


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
                filterFloor={filterFloor}
                filterDoor={filterDoor}
                filterTenant={filterTenant}
                filterStatus={filterStatus}
                uniqueFloors={uniqueFloors}
                uniqueDoors={uniqueDoors}
                onFloorChange={setFilterFloor}
                onDoorChange={setFilterDoor}
                onTenantChange={setFilterTenant}
                onStatusChange={setFilterStatus}
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