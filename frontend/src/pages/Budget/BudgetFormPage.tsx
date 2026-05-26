import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { budgetService } from '../../services/budget.service';
import styles from './BudgetFormPage.module.css';

const schema = yup.object({
    name: yup
        .string()
        .max(100, 'El nombre no puede superar los 100 caracteres')
        .default(''),
    endDate: yup
        .string()
        .required('La fecha de fin es obligatoria'),
    annualAmount: yup
        .number()
        .typeError('El importe debe ser un número')
        .positive('El importe debe ser mayor que 0')
        .max(99999999.99, 'El importe no puede superar 99.999.999,99 €')
        .required('El importe anual es obligatorio'),
    emergencyFund: yup
        .number()
        .typeError('El fondo debe ser un número')
        .min(0, 'El fondo no puede ser negativo')
        .max(99999999.99, 'El fondo no puede superar 99.999.999,99 €')
        .required('El fondo de emergencia es obligatorio')
}).required();

export const BudgetFormPage = () => {
    const { communityId } = useParams<{communityId: string}>();
    const navigate = useNavigate();

    const [globalError, setGlobalError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<BudgetFormData>({
        resolver: yupResolver(schema),
        mode: 'onBlur',
    });

    const onSubmit = async (data: BudgetFormData) => {
        setGlobalError(null);

        try {
            await budgetService.create(Number(communityId), {
                name: data.name || null,
                endDate: data.endDate,
                annualAmount: data.annualAmount,
                emergencyFund: data.emergencyFund,
            });
            navigate(`/budget/${communityId}/current`);
        } catch {
            setGlobalError('Ha ocurrido un error al crear el presupuesto');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Abrir presupuesto</h1>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    {globalError && (
                        <p className={styles.error}>{globalError}</p>
                    )}

                    <div className={styles.field}>
                        <label htmlFor="name">Nombre (opcional)</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Presupuesto 2026"
                            {...register('name')}
                        />
                        {errors.name && (
                            <span className={styles.fieldError}>
                                {errors.name.message}
                            </span>
                        )}
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="endDate">Fecha de fin</label>
                        <input
                            id="endDate"
                            type="date"
                            {...register('endDate')}
                            onChange={(e) => {
                                register('endDate').onChange(e);
                                setGlobalError(null);
                            }}
                        />
                        {errors.endDate && (
                            <span className={styles.fieldError}>
                                {errors.endDate.message}
                            </span>
                        )}
                    </div>

                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label htmlFor="annualAmount">Importe anual</label>
                            <input
                                id="annualAmount"
                                type="number"
                                step="0.01"
                                placeholder="24000€"
                                {...register('annualAmount')}
                                onChange={(e) => {
                                    register('annualAmount').onChange(e);
                                    setGlobalError(null);
                                }}
                            />
                            {errors.annualAmount && (
                                <span className={styles.fieldError}>
                                    {errors.annualAmount.message}
                                </span>
                            )}
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="emergencyFund">Fondo de emergencia</label>
                            <input
                                id="emergencyFund"
                                type="number"
                                step="0.01"
                                placeholder="3200€"
                                {...register('emergencyFund')}
                                onChange={(e) => {
                                    register('emergencyFund').onChange(e);
                                    setGlobalError(null);
                                }}
                            />
                            {errors.emergencyFund && (
                                <span className={styles.fieldError}>
                                    {errors.emergencyFund.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className={styles.buttonRow}>
                        <button
                            type="button"
                            className={styles.btnCancel}
                            onClick={() => navigate(`/budget/${communityId}/current`)}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className={styles.btnSubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Creando...' : 'Crear presupuesto'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

interface BudgetFormData {
    name: string;
    endDate: string;
    annualAmount: number;
    emergencyFund: number;
}