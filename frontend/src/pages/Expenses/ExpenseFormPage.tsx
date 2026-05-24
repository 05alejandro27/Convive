import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { expenseService } from '../../services/expenses.service';
import type { ExpenseResponse } from '../../services/expenses.service';
import styles from './ExpenseFormPage.module.css';

const schema = yup.object({
    name: yup
        .string()
        .required('El nombre es obligatorio'),
    description: yup
        .string()
        .default(''),
    expenseType: yup
        .string()
        .oneOf(['FIXED', 'VARIABLE'], 'Selecciona un tipo válido')
        .required('El tipo es obligatorio'),
    cost: yup
        .number()
        .typeError('El coste debe ser un número')
        .positive('El coste debe ser mayor que 0')
        .max(99999999.99, 'El coste no puede superar 99.999.999,99 €')
        .required('El coste es obligatorio'),
    month: yup
        .number()
        .typeError('Selecciona un mes')
        .min(1, 'Selecciona un mes válido')
        .max(12, 'Selecciona un mes válido')
        .required('El mes es obligatorio'),
}).required();

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

export const ExpenseFormPage = () => {
    const { communityId, budgetId, id } = useParams<{ communityId: string; budgetId: string; id: string }>();
    const navigate = useNavigate();

    const isEditing = Boolean(id);

    const [globalError, setGlobalError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ExpenseFormData>({
        resolver: yupResolver(schema),
        mode: 'onBlur',
    });

    useEffect(() => {
        if (isEditing && id) {
            setLoading(true);
            expenseService
                .findAll(Number(budgetId))
                .then((expenses: ExpenseResponse[]) => {
                    const expense = expenses.find(
                        (e: ExpenseResponse) => e.id === Number(id)
                    );
                    if (expense) {
                        reset({
                            name: expense.name,
                            description: expense.description || '',
                            expenseType: expense.expenseType,
                            cost: expense.cost,
                            month: expense.month,
                        });
                    } else {
                        setGlobalError('Gasto no encontrado');
                    }
                })
                .catch(() => setGlobalError('Error al cargar el gasto'))
                .finally(() => setLoading(false));
        }
    }, [budgetId, id, isEditing, reset]);

    const onSubmit = async (data: ExpenseFormData) => {
        setGlobalError(null);

        try {
            const request = {
                name: data.name,
                description: data.description || null,
                expenseType: data.expenseType,
                cost: data.cost,
                month: data.month,
            };

            if (isEditing) {
                await expenseService.edit(Number(budgetId), Number(id), request);
            } else {
                await expenseService.create(Number(budgetId), request);
            }
            navigate(`/expenses/${communityId}/${budgetId}`);
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
                <h1 className={styles.title}>
                    {isEditing ? 'Editar gasto' : 'Añadir gasto'}
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    {globalError && (
                        <p className={styles.error}>{globalError}</p>
                    )}

                    <div className={styles.field}>
                        <label htmlFor="name">Concepto</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Seguro del edificio"
                            {...register('name')}
                            onChange={(e) => {
                                register('name').onChange(e);
                                setGlobalError(null);
                            }}
                        />
                        {errors.name && (
                            <span className={styles.fieldError}>
                                {errors.name.message}
                            </span>
                        )}
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="description">Descripción (opcional)</label>
                        <input
                            id="description"
                            type="text"
                            placeholder="Descripción del gasto"
                            {...register('description')}
                        />
                    </div>

                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label htmlFor="expenseType">Tipo</label>
                            <select
                                id="expenseType"
                                {...register('expenseType')}
                                onChange={(e) => {
                                    register('expenseType').onChange(e);
                                    setGlobalError(null);
                                }}
                            >
                                <option value="">Selecciona tipo</option>
                                <option value="FIXED">Fijo</option>
                                <option value="VARIABLE">Variable</option>
                            </select>
                            {errors.expenseType && (
                                <span className={styles.fieldError}>
                                    {errors.expenseType.message}
                                </span>
                            )}
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="month">Mes</label>
                            <select
                                id="month"
                                {...register('month')}
                                onChange={(e) => {
                                    register('month').onChange(e);
                                    setGlobalError(null);
                                }}
                            >
                                <option value="">Selecciona mes</option>
                                {MONTHS.map((m) => (
                                    <option key={m.value} value={m.value}>
                                        {m.label}
                                    </option>
                                ))}
                            </select>
                            {errors.month && (
                                <span className={styles.fieldError}>
                                    {errors.month.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="cost">Coste</label>
                        <input
                            id="cost"
                            type="number"
                            step="0.01"
                            placeholder="450.00€"
                            {...register('cost')}
                            onChange={(e) => {
                                register('cost').onChange(e);
                                setGlobalError(null);
                            }}
                        />
                        {errors.cost && (
                            <span className={styles.fieldError}>
                                {errors.cost.message}
                            </span>
                        )}
                    </div>

                    <div className={styles.buttonRow}>
                        <button
                            type="button"
                            className={styles.btnCancel}
                            onClick={() => navigate(`/expenses/${communityId}/${budgetId}`)}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className={styles.btnSubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Guardando...' : 
                                isEditing ? 'Guardar cambios': 'Crear gasto'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

interface ExpenseFormData {
    name: string;
    description: string;
    expenseType: 'FIXED' | 'VARIABLE';
    cost: number;
    month: number;
}