import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { apartmentService } from '../../services/apartment.service';
import type { ApartmentResponse } from '../../services/apartment.service';
import styles from './ApartmentFormPage.module.css';

//Esquema de validación
const schema = yup.object({
    floor: yup
        .number()
        .typeError('La planta debe ser un número')
        .integer('La planta debe ser un número entero')
        .required('La planta es obligatoria'),
    door: yup
        .string()
        .required('La puerta es obligatoria'),
}).required();

export const ApartmentFormPage = () => {
    const { communityId, id } = useParams<{ communityId: string; id: string }>();
    const navigate = useNavigate();

    //Si hay id en la URL, estamos editando, si no, creando
    const isEditing = Boolean(id);

    const [globalError, setGlobalError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ApartmentFormData>({
        resolver: yupResolver(schema),
        mode: 'onBlur',
    });

    //Si estamos editando, cargar los datos del piso
    useEffect(() => {
        if (isEditing && id) {
            setLoading(true);
            apartmentService
                .findAll(Number(communityId))
                .then((apartments: ApartmentResponse[]) => {
                    const apartment = apartments.find(
                        (a: ApartmentResponse) => a.id === Number(id)
                    );
                    if (apartment) {
                        reset({
                            floor: apartment.floor,
                            door: apartment.door,
                        });
                    } else {
                        setGlobalError('Piso no encontrado');
                    }
                })
                .catch(() => setGlobalError('Error al cargar el piso'))
                .finally(() => setLoading(false));
        }
    }, [communityId, id, isEditing, reset]);

    //Submit
    const onSubmit = async (data: ApartmentFormData) => {
        setGlobalError(null);

        try {
            if (isEditing) {
                await apartmentService.edit(Number(communityId), Number(id), data);
            } else {
                await apartmentService.create(Number(communityId), data);
            }
            navigate(`/apartments/${communityId}`);
        } catch {
            setGlobalError('Ha ocurrido un error');
        }
    };

    if (loading) {
        return <p className={styles.loading}>Cargando...</p>
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                {/*Cabecera*/}
                <h1 className={styles.title}>
                    {isEditing ? 'Editar piso' : 'Añadir piso'}
                </h1>

                {/*Formulario*/}
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    {/*Error global del servidor*/}
                    {globalError && (
                        <p className={styles.error}>{globalError}</p>
                    )}

                    {/*Planta y puerta en la misma fila*/}
                    <div className={styles.row}>
                        {/*Campo planta*/}
                        <div className={styles.field}>
                            <label htmlFor="floor" className={styles.label}>
                                Planta
                            </label>
                            <input
                                id="floor"
                                type="number"
                                placeholder="1"
                                className={styles.input}
                                {...register('floor')}
                                onChange={(e) => {
                                    register('floor').onChange(e);
                                    setGlobalError(null);
                                }}
                            />
                            {errors.floor && (
                                <span className={styles.fieldError}>
                                    {errors.floor.message}
                                </span>
                            )}
                        </div>

                        {/*Campo puerta*/}
                        <div className={styles.field}>
                            <label htmlFor="door" className={styles.label}>
                                Puerta
                            </label>
                            <input
                                id="door"
                                type="text"
                                placeholder="A"
                                className={styles.input}
                                {...register('door')}
                                onChange={(e) => {
                                    register('door').onChange(e);
                                    setGlobalError(null);
                                }}
                            />
                            {errors.door && (
                                <span className={styles.fieldError}>
                                    {errors.door.message}
                                </span>
                            )}
                        </div>
                    </div>

                    {/*Botones*/}
                    <div className={styles.buttonRow}>
                        <button
                            type="button"
                            className={styles.btnCancel}
                            onClick={() =>
                                navigate(`/apartments/${communityId}`)
                            }
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className={styles.btnSubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? 'Guardando...'
                                : isEditing
                                ? 'Guardar cambios'
                                : 'Crear piso'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

//Tipos
interface ApartmentFormData {
    floor: number;
    door: string;
}