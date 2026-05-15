import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { authService } from '../../services/auth.service';
import styles from './RegisterPage.module.css';

const schema = yup.object({
    code: yup
        .string()
        .min(8, 'El código de invitación debe tener 8 carácteres')
        .max(8, 'El código de invitación debe tener 8 carácteres')
        .required(),
    firstName: yup
        .string()
        .required('El nombre es obligatorio'),
    lastName1: yup
        .string()
        .required('El primer apellido es obligatorio'),
    lastName2: yup
        .string()
        .optional(),
    email: yup
        .string()
        .email('El formato del correo no es correcto')
        .required('El correo es obligatorio'),
    phone: yup
        .string()
        .required('El teléfono es obligatorio'),
    password: yup
        .string()
        .min(8, 'La contraseña debe tener mínimo 8 caracteres')
        .required('La contraseña es obligatoria'),
    confirmPassword: yup
        .string()
        .min(8, 'La contraseña debe tener mínimo 8 caracteres')
        .required('La confirmación de contraseña es obligatoria')
        .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
}).required();

type RegisterFormData = yup.InferType<typeof schema>;

export const RegisterPage = () => {
    const navigate = useNavigate();
    const { communityId } = useParams<{ communityId: string }>();
    const [globalError, setGlobalError] = useState<string | null>(null);
    
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onBlur'
    });

    const onSubmit = async (data: RegisterFormData) => {
        setGlobalError(null);

        try {
            const registerData = {
                code: data.code,
                firstName: data.firstName,
                lastName1: data.lastName1,
                lastName2: data.lastName2,
                email: data.email,
                phone: data.phone,
                password: data.password
            };
            await authService.register(Number(communityId), registerData);
            alert('Registro completado correctamente');
            navigate(`/login/${communityId}`);
        } catch {
            setGlobalError('Código incorrecto, ya utilizado o caducado');
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.card}>

                <p className={styles.logo}>convive</p>
                <p className={styles.subtitle}>Regístrate en tu comunidad</p>
                
                <form onSubmit={handleSubmit(onSubmit)} noValidate>

                    {globalError && (
                        <p className={styles.globalError}>{globalError}</p>
                    )}

                    <div className={styles.field}>
                        <label htmlFor="code">Código de invitación</label>
                        <input
                            id="code"
                            type="text"
                            placeholder="XXXXXXXX"
                            {...register('code')}
                            onChange={(e) => {
                                register('code').onChange(e);
                                setGlobalError(null);
                            }}
                        />
                        {errors.code && (
                            <span className={styles.fieldError}>{errors.code.message}</span>
                        )}
                    </div>

                    <div className={styles.row}>

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
                                <span className={styles.fieldError}>{errors.firstName.message}</span>
                            )}
                        </div>

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
                                <span className={styles.fieldError}>{errors.lastName1.message}</span>
                            )}
                        </div>

                    </div>

                    <div className={styles.field}>
                        <label htmlFor="lastName2">Segundo apellido</label>
                        <input
                            id="lastName2"
                            type="text"
                            placeholder="Apellido 2 (opcional)"
                            {...register('lastName2')}
                            onChange={(e) => {
                                register('lastName2').onChange(e);
                                setGlobalError(null);
                            }}
                        />
                        {errors.lastName2 && (
                            <span className={styles.fieldError}>{errors.lastName2.message}</span>
                        )}
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            id="email"
                            type="text"
                            placeholder="tu@correo.com"
                            {...register('email')}
                            onChange={(e) => {
                                register('email').onChange(e);
                                setGlobalError(null);
                            }}
                        />
                        {errors.email && (
                            <span className={styles.fieldError}>{errors.email.message}</span>
                        )}
                    </div>

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
                            <span className={styles.fieldError}>{errors.phone.message}</span>
                        )}
                    </div>

                    <div className={styles.row}>

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

                        <div className={styles.field}>
                            <label htmlFor="confirmPassword">Repetir contraseña</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="........"
                                {...register('confirmPassword')}
                                onChange={(e) => {
                                    register('confirmPassword').onChange(e);
                                    setGlobalError(null);
                                }}
                            />
                            {errors.confirmPassword && (
                                <span className={styles.fieldError}>{errors.confirmPassword.message}</span>
                            )}
                        </div>

                    </div>

                    <button type="submit" className={styles.button} disabled={isSubmitting}>
                        {isSubmitting ? 'Registrando...' : 'Registrarse'}
                    </button>

                </form>

                <div className={styles.loginLink}>
                    <span>¿Ya tienes cuenta?</span>
                    <button onClick={() => navigate(`/login/${communityId}`)}>
                        Iniciar sesión
                    </button>
                </div>

            </div>
        </div>
    );
};