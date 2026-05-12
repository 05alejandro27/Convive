import { useNavigate } from 'react-router-dom';
import styles from './LegalPage.module.css';

export const TermsOfUsePage = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>

            <button className={styles.backLink} onClick={() => navigate(-1)}>
                ← Volver
            </button>

            <h1 className={styles.title}>Condiciones de uso</h1>
            <p className={styles.updated}>Última actualización: mayo 2026</p>

            <div className={styles.content}>

                <h2 className={styles.heading}>1. Objeto</h2>
                <p className={styles.text}>
                    Las presentes condiciones regulan el uso de la plataforma Convive, una herramienta web
                    de gestión para comunidades de vecinos que permite administrar presupuestos, gastos,
                    votaciones y el registro de vecinos.
                </p>

                <h2 className={styles.heading}>2. Acceso y registro</h2>
                <p className={styles.text}>
                    El acceso a Convive requiere un código de invitación generado por el presidente de la
                    comunidad. Este código está vinculado a un piso concreto y solo puede utilizarse una vez.
                    Al registrarse, el usuario acepta estas condiciones de uso y la política de privacidad.
                </p>

                <h2 className={styles.heading}>3. Roles y permisos</h2>
                <p className={styles.text}>
                    Convive contempla dos roles: presidente y vecino. El presidente tiene permisos para gestionar
                    pisos, usuarios, presupuestos, gastos y votaciones. El vecino puede consultar la información
                    de su comunidad y participar en las votaciones abiertas. Cada usuario accede únicamente a la
                    comunidad a la que pertenece.
                </p>

                <h2 className={styles.heading}>4. Votaciones</h2>
                <p className={styles.text}>
                    Las votaciones realizadas a través de Convive son herramientas de consulta y participación
                    interna. No sustituyen ni tienen la validez jurídica de los acuerdos adoptados en Junta de
                    Propietarios conforme a la Ley de Propiedad Horizontal. Las votaciones son públicas por
                    mandato legal: los votos emitidos son visibles para todos los miembros de la comunidad.
                </p>

                <h2 className={styles.heading}>5. Presupuestos y gastos</h2>
                <p className={styles.text}>
                    La información de presupuestos y gastos registrada en Convive tiene carácter informativo
                    y de gestión interna. Convive no gestiona cobros reales, pasarelas de pago ni recibos
                    individuales. Los importes mostrados reflejan números introducidos por el presidente y no
                    implican movimientos de dinero.
                </p>

                <h2 className={styles.heading}>6. Responsabilidades del usuario</h2>
                <p className={styles.text}>
                    El usuario se compromete a facilitar datos veraces durante el registro, a no compartir
                    sus credenciales de acceso con terceros, y a utilizar la plataforma de forma responsable
                    y conforme a su finalidad. El presidente es responsable de la veracidad de los datos
                    económicos introducidos en la plataforma.
                </p>

                <h2 className={styles.heading}>7. Disponibilidad del servicio</h2>
                <p className={styles.text}>
                    Convive es un proyecto académico desarrollado como Trabajo de Fin de Grado. No se
                    garantiza la disponibilidad ininterrumpida del servicio ni la permanencia de los datos
                    a largo plazo. El servicio puede experimentar interrupciones por mantenimiento o por
                    las limitaciones de la infraestructura de alojamiento.
                </p>

                <h2 className={styles.heading}>8. Propiedad intelectual</h2>
                <p className={styles.text}>
                    El código fuente de Convive está publicado bajo licencia MIT. El diseño, la marca y los
                    contenidos textuales de la plataforma son propiedad de Alejandro Peña Fernández.
                </p>

                <h2 className={styles.heading}>9. Modificaciones</h2>
                <p className={styles.text}>
                    El responsable de Convive se reserva el derecho de modificar estas condiciones de uso
                    en cualquier momento. Los cambios serán efectivos desde su publicación en la plataforma.
                    El uso continuado del servicio tras la publicación de los cambios implica la aceptación
                    de las nuevas condiciones.
                </p>

                <h2 className={styles.heading}>10. Legislación aplicable</h2>
                <p className={styles.text}>
                    Estas condiciones se rigen por la legislación española. Para cualquier controversia
                    derivada del uso de Convive serán competentes los juzgados y tribunales del domicilio
                    del usuario.
                </p>

            </div>

        </div>
    );
};