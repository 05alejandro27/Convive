import { useNavigate } from 'react-router-dom';
import styles from './LegalPage.module.css';

export const PrivacyPolicyPage = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>

            <button className={styles.backLink} onClick={() => navigate(-1)}>
                ← Volver
            </button>

            <h1 className={styles.title}>Política de privacidad</h1>
            <p className={styles.updated}>Última actualización: mayo 2026</p>

            <div className={styles.content}>

                <h2 className={styles.heading}>1. Responsable del tratamiento</h2>
                <p className={styles.text}>
                    El responsable del tratamiento de los datos personales recogidos a través de Convive
                    es Alejandro Peña Fernández, con correo electrónico de contacto: contacto@convive.es.
                </p>

                <h2 className={styles.heading}>2. Datos que recogemos</h2>
                <p className={styles.text}>
                    Para el funcionamiento de la plataforma, recogemos los siguientes datos personales: nombre
                    y apellidos, dirección de correo electrónico, número de teléfono, planta y puerta del
                    domicilio dentro de la comunidad, y la contraseña de acceso (almacenada de forma cifrada
                    mediante BCrypt).
                </p>

                <h2 className={styles.heading}>3. Finalidad del tratamiento</h2>
                <p className={styles.text}>
                    Los datos recogidos se utilizan exclusivamente para gestionar el acceso a la plataforma,
                    identificar a los vecinos dentro de su comunidad, permitir la participación en votaciones
                    y consultar la información de presupuestos y gastos comunitarios.
                </p>

                <h2 className={styles.heading}>4. Base legal</h2>
                <p className={styles.text}>
                    El tratamiento de los datos se basa en el consentimiento del usuario al registrarse en
                    la plataforma y en la ejecución del servicio solicitado, conforme al artículo 6.1.a) y
                    6.1.b) del Reglamento General de Protección de Datos (RGPD).
                </p>

                <h2 className={styles.heading}>5. Conservación de los datos</h2>
                <p className={styles.text}>
                    Los datos personales se conservarán mientras la cuenta del usuario esté activa. Cuando
                    un usuario sea deshabilitado por el presidente de la comunidad, sus datos se mantendrán
                    en el sistema de forma inactiva. El usuario puede solicitar la eliminación definitiva de
                    sus datos contactando con el responsable del tratamiento.
                </p>

                <h2 className={styles.heading}>6. Derechos del usuario</h2>
                <p className={styles.text}>
                    El usuario tiene derecho a acceder, rectificar, suprimir y oponerse al tratamiento de
                    sus datos personales, así como a solicitar la limitación del tratamiento y la portabilidad
                    de los datos, conforme a los artículos 15 a 22 del RGPD. Para ejercer estos derechos,
                    puede contactar con el responsable a través del correo electrónico indicado anteriormente.
                </p>

                <h2 className={styles.heading}>7. Seguridad</h2>
                <p className={styles.text}>
                    Convive implementa medidas técnicas y organizativas para proteger los datos personales:
                    las contraseñas se almacenan cifradas con BCrypt, la comunicación entre cliente y servidor
                    se realiza mediante HTTPS, y el acceso a la API está protegido mediante tokens JWT con
                    expiración de 24 horas.
                </p>

                <h2 className={styles.heading}>8. Cesión de datos a terceros</h2>
                <p className={styles.text}>
                    Convive no cede datos personales a terceros. Los datos de los vecinos solo son accesibles
                    por el presidente de su comunidad dentro de la plataforma, en el ejercicio de sus funciones
                    de gestión comunitaria.
                </p>

                <h2 className={styles.heading}>9. Votaciones públicas</h2>
                <p className={styles.text}>
                    De acuerdo con la Ley de Propiedad Horizontal (artículo 17) y la jurisprudencia del
                    Tribunal Supremo (sentencia de 17 de diciembre de 2001), las votaciones en Convive son
                    públicas. Los votos emitidos son visibles para todos los miembros de la comunidad, incluyendo
                    la identificación del votante por su piso.
                </p>

            </div>

        </div>
    );
};