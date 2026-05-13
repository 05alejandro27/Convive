import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../../hooks/useAuth';
import styles from './LoginPage.module.css';

const schema = yup.object({
    floor: yup
        .number()
        .typeError('La planta debe ser un número')
        .integer('La planta debe ser un número entero')
        .required('La planta es obligatoria'),
    door: yup
        .string()
        .required('La puerta es obligatoria'),
    password: yup
        .string()
        .min(8, 'La contraseña debe tener mínimo 8 caracteres')
        .required('La contraseña es obligatoria'),
}).required();

export const LoginPage = () => {
    const navigate = useNavigate();
    const { communityId } = useParams<{communityId: string}>();
    const { login } = useAuth();
    const [globalError, setGlobalError] = useState<string | null>(null);
    
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginFormData>({
        resolver: yupResolver(schema),
        mode: 'onBlur'
    });

    const onSubmit = async (data: LoginFormData) => {
        setGlobalError(null);

        try {
            await login(Number(communityId), data);
        } catch {
            setGlobalError('Piso o contraseña incorrectos');
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.card}>

                <p className={styles.logo}>convive</p>
                <p className={styles.subtitle}>Accede a tu comunidad</p>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>

                    {globalError && (
                        <p className={styles.globalError}>{globalError}</p>
                    )}

                    <div className={styles.row}>

                        <div className={styles.field}>
                            <label htmlFor="floor">Planta</label>
                            <input
                                id="floor"
                                type="number"
                                placeholder="1"
                                {...register('floor')}
                                onChange={(e) => {
                                    register('floor').onChange(e);
                                    setGlobalError(null);
                                }}
                            />
                            {errors.floor && (
                                <span className={styles.fieldError}>{errors.floor.message}</span>
                            )}
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="door">Puerta</label>
                            <input
                                id="door"
                                type="text"
                                placeholder="A"
                                {...register('door')}
                                onChange={(e) => {
                                    register('door').onChange(e);
                                    setGlobalError(null);
                                }}
                            />
                            {errors.door && (
                                <span className={styles.fieldError}>{errors.door.message}</span>
                            )}
                        </div>

                    </div>

                    <div className={styles.field}>
                        <label htmlFor="password">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="........"
                            {...register('password')}
                            onChange={(e) => {
                                register('password').onChange(e);
                                setGlobalError(null);
                            }}
                        />
                        {errors.password && (
                            <span className={styles.fieldError}>{errors.password.message}</span>
                        )}
                    </div>

                    <button type="submit" className={styles.button} disabled={isSubmitting}>
                        Entrar
                    </button>
                    
                </form>

                <div className={styles.registerLink}>
                    <span>¿No tienes cuenta?</span>
                    <button onClick={() => navigate(`/register/${communityId}`)}>
                        Registrarse
                    </button>
                </div>
            </div>
        </div>
    );
};

interface LoginFormData {
    floor: number;
    door: string;
    password: string;
}