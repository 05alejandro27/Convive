import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { invitationService } from '../../services/invitation.service';
import { apartmentService } from '../../services/apartment.service';
import type { ApartmentResponse } from '../../services/apartment.service';
import styles from './InvitationFormPage.module.css';

const schema = yup.object({
    floor: yup
        .number()
        .typeError('La planta debe ser un número')
        .integer('La planta debe ser un número entero')
        .required('La planta es obligatoria'),
    door: yup
        .string()
        .required('La puerta es obligatoria')
}).required();

export const InvitationFormPage = () => {
    const navigate = useNavigate();
    const { communityId } = useParams<{communityId: string}>();
    const [globalError, setGlobalError] = useState<string | null>(null);
    const [apartments, setApartments] = useState<ApartmentResponse[]>([]);
    const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
    
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm<InvitationFormData>({
        resolver: yupResolver(schema) as never,
        mode: 'onBlur'
    });

    //Cargar los pisos vacíos de la comunidad
    useEffect(() => {
        Promise.all([
            apartmentService.findAll(Number(communityId)),
            invitationService.findAll(Number(communityId))
        ])
            //Solo pisos activos y vacíos
            .then(([apartmentsData, invitationsData]) => {
                const empty = apartmentsData.filter(a => a.status === 'EMPTY');

                //Filtrar pisos que ya tienen invitación activa
                const withoutInvitation = empty.filter(a =>
                    !invitationsData.some(inv => inv.floor === a.floor && inv.door === a.door)
                );

                setApartments(withoutInvitation);
            })
            .catch(() => setGlobalError('Error al cargar los pisos'));
    }, [communityId]);

    //Plantas únicas disponibles
    const floors = [...new Set(apartments.map(a => a.floor))].sort((a, b) => a - b);

    //Puertas disponibles según la planta seleccionada
    const doors = apartments
        .filter(a => a.floor === selectedFloor)
        .map(a => a.door)
        .sort();

    const onSubmit = async (data: InvitationFormData) => {
        setGlobalError(null);

        try {
            await invitationService.createCode(Number(communityId), data);
            alert('Invitación creada correctamente');
            navigate(`/users/${communityId}`);
        } catch {
            setGlobalError('Planta o puerta incorrectas');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>

                <h1 className={styles.title}>Generar invitación</h1>

                {apartments.length === 0 && !globalError && (
                    <p className={styles.empty}>No hay pisos vacíos disponibles para invitar.</p>
                )}

                <form onSubmit={handleSubmit(onSubmit)} noValidate>

                    {globalError && (
                        <p className={styles.error}>{globalError}</p>
                    )}

                    <div className={styles.row}>

                        <div className={styles.field}>
                            <label htmlFor="floor">Planta</label>
                            <select
                                id="floor"
                                value={selectedFloor ?? ''}
                                onChange={(e) => {
                                    const floor = Number(e.target.value);
                                    setSelectedFloor(floor);
                                    setValue('floor', floor);
                                    setValue('door', '');
                                    setGlobalError(null);
                                }}
                            >
                                <option value="">Selecciona planta</option>
                                {floors.map(f => (
                                    <option key={f} value={f}>{f}</option>
                                ))}
                            </select>
                            {errors.floor && (
                                <span className={styles.fieldError}>{errors.floor.message}</span>
                            )}
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="door">Puerta</label>
                            <select
                                id="door"
                                {...register('door')}
                                disabled={!selectedFloor}
                                onChange={(e) => {
                                    register('door').onChange(e);
                                    setGlobalError(null);
                                }}
                            >
                                <option value="">Selecciona puerta</option>
                                {doors.map(d => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                            {errors.door && (
                                <span className={styles.fieldError}>{errors.door.message}</span>
                            )}
                        </div>

                    </div>

                    <div className={styles.buttonRow}>
                        <button
                            type="button"
                            className={styles.btnCancel}
                            onClick={() => navigate(`/users/${communityId}`)}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className={styles.btnSubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Generando...' : 'Generar código'}
                        </button>
                    </div>
                    
                </form>
            </div>
        </div>
    );
};

interface InvitationFormData {
    floor: number;
    door: string;
}