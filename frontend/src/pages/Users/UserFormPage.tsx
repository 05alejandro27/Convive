import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { userService } from '../../services/user.service';
import type { UserResponse } from '../../services/user.service';
import styles from './UserFormPage.module.css';

//Esquema de validación
const schema = yup.object({
    firstName: yup
        .string()
        .required('El nombre es obligatorio'),
    lastName1: yup
        .string()
        .required('El primer apellido es obligatorio'),
    lastName2: yup
        .string()
        .default(''),
    email: yup
        .string()
        .email('El email no tiene un formato válido')
        .required('El email es obligatorio'),
    phone: yup
        .string()
        .min(9, 'El teléfono debe tener al menos 9 caracteres')
        .required('El teléfono es obligatorio'),
}).required();

export const UserFormPage = () => {
    const { communityId, id } = useParams<{ communityId: string; id: string }>();
    const navigate = useNavigate();

    //Por ahora solo podemos editar, pero en un futuro pondremos la opción de crear
    const isEditing = Boolean(id);

    const [globalError, setGlobalError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<UserFormData>({
        resolver: yupResolver(schema),
        mode: 'onBlur',
    });

    //Si estamos editando, cargar los datos del usuario
    useEffect(() => {
        if (isEditing && id) {
            setLoading(true);
            userService
                .findAll(Number(communityId))
                .then((users: UserResponse[]) => {
                    const user = users.find(
                        (u: UserResponse) => u.id === Number(id)
                    );
                    if (user) {
                        reset({
                            firstName: user.firstName,
                            lastName1: user.lastName1,
                            lastName2: user.lastName2 || '',
                            email: user.email,
                            phone: user.phone,
                        });
                    } else {
                        setGlobalError('Usuario no encontrado');
                    }
                })
                .catch(() => setGlobalError('Error al cargar el usuario'))
                .finally(() => setLoading(false));
        }
    }, [communityId, id, isEditing, reset]);

    //Submit
    const onSubmit = async (data: UserFormData) => {
        setGlobalError(null);

        try {
            if (isEditing) {
                await userService.edit(Number(communityId), Number(id), data);
            }
            navigate(`/users/${communityId}`);
        } catch {
            setGlobalError('Ha ocurrido un error');
        }
    };

    if (loading) {
        return <p className={styles.loading}>Cargando...</p>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                {/*Cabecera*/}
                <h1 className={styles.title}>
                    {/*Dejamos preparado la página para cuando se puedan crear usuarios*/}
                    {isEditing ? 'Editar usuario' : 'Añadir usuario'}
                </h1>

                {/*Formulario*/}
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    {globalError && (
                        <p className={styles.error}>{globalError}</p>
                    )}

                    {/*Nombre y Primer apellido en la misma fila*/}
                    <div className={styles.row}>
                        {/*Campo nombre*/}
                        <div className={styles.field}>
                            <label htmlFor="firstName">Nombre</label>
                            <input
                                id="firstName"
                                type="text"
                                placeholder="Tu nombre"
                                {...register('firstName')}
                                onChange={(e) => {
                                    register('firstName').onChange(e);
                                    setGlobalError(null);
                                }}
                            />
                            {errors.firstName && (
                                <span className={styles.fieldError}>
                                    {errors.firstName.message}
                                </span>
                            )}
                        </div>

                        {/*Campo primer apellido*/}
                        <div className={styles.field}>
                            <label htmlFor="lastName1">Primer apellido</label>
                            <input
                                id="lastName1"
                                type="text"
                                placeholder="Apellido 1"
                                {...register('lastName1')}
                                onChange={(e) => {
                                    register('lastName1').onChange(e);
                                    setGlobalError(null);
                                }}
                            />
                            {errors.lastName1 && (
                                <span className={styles.fieldError}>
                                    {errors.lastName1.message}
                                </span>
                            )}
                        </div>
                    </div>

                    {/*Segundo apellido*/}
                    <div className={styles.field}>
                        <label htmlFor="lastName2">Segundo apellido (opcional)</label>
                        <input
                            id="lastName2"
                            type="text"
                            placeholder="Apellido 2"
                            {...register('lastName2')}
                        />
                    </div>

                    {/*Email*/}
                    <div className={styles.field}>
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="tu@correo.com"
                            {...register('email')}
                            onChange={(e) => {
                                register('email').onChange(e);
                                setGlobalError(null);
                            }}
                        />
                        {errors.email && (
                            <span className={styles.fieldError}>
                                {errors.email.message}
                            </span>
                        )}
                    </div>

                    {/*Teléfono*/}
                    <div className={styles.field}>
                        <label htmlFor="phone">Teléfono</label>
                        <input
                            id="phone"
                            type="text"
                            placeholder="600 000 000"
                            {...register('phone')}
                            onChange={(e) => {
                                register('phone').onChange(e);
                                setGlobalError(null);
                            }}
                        />
                        {errors.phone && (
                            <span className={styles.fieldError}>
                                {errors.phone.message}
                            </span>
                        )}
                    </div>

                    {/*Botones*/}
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
                            {isSubmitting ? 'Guardando...' :
                                isEditing ? 'Guardar cambios' : 'Crear usuario'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

//Tipos
interface UserFormData {
    firstName: string;
    lastName1: string;
    lastName2: string;
    email: string;
    phone: string;
}