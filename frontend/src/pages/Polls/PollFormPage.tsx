import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { pollService } from '../../services/poll.service';
import styles from './PollFormPage.module.css';

const schema = yup.object({
    title: yup
        .string()
        .required('El título es obligatorio'),
    description: yup
        .string()
        .required('La descripción es obligatoria'),
    deadline: yup
        .string()
        .required('La fecha límite es obligatoria'),
}).required();

export const PollFormPage = () => {
    const { communityId } = useParams<{ communityId: string }>();
    const navigate = useNavigate();

    const [globalError, setGlobalError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<PollFormData>({
        resolver: yupResolver(schema),
        mode: 'onBlur',
    });

    const onSubmit = async (data: PollFormData) => {
        setGlobalError(null);
        try {
            await pollService.create(Number(communityId), {
                title: data.title,
                description: data.description,
                deadline: data.deadline + ':00',
            });
            navigate(`/polls/${communityId}`);
        } catch {
            setGlobalError('Ha ocurrido un error al crear la votación');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Nueva votación</h1>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    {globalError && (
                        <p className={styles.error}>{globalError}</p>
                    )}

                    <div className={styles.field}>
                        <label htmlFor="title">Título</label>
                        <input
                            id="title"
                            type="text"
                            placeholder="Renovación del ascensor"
                            {...register('title')}
                            onChange={(e) => {
                                register('title').onChange(e);
                                setGlobalError(null);
                            }}
                        />
                        {errors.title && (
                            <span className={styles.fieldError}>{errors.title.message}</span>
                        )}
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="description">Descripción</label>
                        <textarea
                            id="description"
                            rows={4}
                            placeholder="Describe el motivo de la votación..."
                            {...register('description')}
                            onChange={(e) => {
                                register('description').onChange(e);
                                setGlobalError(null);
                            }}
                        />
                        {errors.description && (
                            <span className={styles.fieldError}>{errors.description.message}</span>
                        )}
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="deadline">Fecha límite</label>
                        <input
                            id="deadline"
                            type="datetime-local"
                            {...register('deadline')}
                            onChange={(e) => {
                                register('deadline').onChange(e);
                                setGlobalError(null);
                            }}
                        />
                        {errors.deadline && (
                            <span className={styles.fieldError}>{errors.deadline.message}</span>
                        )}
                    </div>

                    <div className={styles.buttonRow}>
                        <button
                            type="button"
                            className={styles.btnCancel}
                            onClick={() => navigate(`/polls/${communityId}`)}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className={styles.btnSubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Creando...' : 'Crear votación'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

interface PollFormData {
    title: string;
    description: string;
    deadline: string;
}