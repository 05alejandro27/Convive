import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/Login/LoginPage';
import { HomePage } from './pages/Home/HomePage';
import { ProtectedRoute } from './components/common/ProtectedRoute';

function App() {
    return (
        <Routes>
            {/**Redirijo al login de la comunidad 1 por defecto PRUEBA*/}
            <Route path="/" element={<Navigate to="/login/1" replace />} />
            {/**Redirijo al login de la comunidad seleccionada*/}
            <Route path="/login/:communityId" element={<LoginPage />} />

            {/**Envuelve todas las rutas hijas con la protección*/}
            <Route element={<ProtectedRoute />}>
                {/**Ruta para el home*/}
                <Route path="/home/:communityId" element={<HomePage />} />
            </Route>

            <Route path="*" element={<Navigate to="/login/1" replace />} />
        </Routes>
    );
}

export default App;