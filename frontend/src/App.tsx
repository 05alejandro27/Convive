import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/Login/LoginPage';
import { HomePage } from './pages/Home/HomePage';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { ApartmentsPage } from './pages/Apartments/ApartmentsPage';
import { ApartmentFormPage } from './pages/Apartments/ApartmentFormPage';
import { UsersPage } from './pages/Users/UsersPage';
import { UserFormPage } from './pages/Users/UserFormPage';
import { RegisterPage } from './pages/Register/RegisterPage';
import { InvitationFormPage } from './pages/Users/InvitationFormPage';
import { BudgetCurrentPage } from './pages/Budget/BudgetCurrentPage';
import { BudgetHistoryPage } from './pages/Budget/BudgetHistoryPage';
import { BudgetFormPage } from './pages/Budget/BudgetFormPage';
import { BudgetDetailPage } from './pages/Budget/BudgetDetailPage';
import { ExpensesPage } from './pages/Expenses/ExpensePage';
import { ExpenseFormPage } from './pages/Expenses/ExpenseFormPage';

function App() {
    return (
        <Routes>
            {/**Redirijo al login de la comunidad 1 por defecto PRUEBA*/}
            <Route path="/" element={<Navigate to="/login/1" replace />}/>
            {/**Redirijo al login de la comunidad seleccionada*/}
            <Route path="/login/:communityId" element={<LoginPage/>}/>
            <Route path="/register/:communityId" element={<RegisterPage/>}/>

            {/**Envuelve todas las rutas hijas con la protección*/}
            <Route element={<ProtectedRoute />}>
                {/**Ruta para el home*/}
                <Route path="/home/:communityId" element={<HomePage/>}/>
                <Route path="/apartments/:communityId" element={<ApartmentsPage/>}/>
                <Route path="/apartments/:communityId/create" element={<ApartmentFormPage/>}/>
                <Route path="/apartments/:communityId/edit/:id" element={<ApartmentFormPage/>}/>
                <Route path="/users/:communityId" element={<UsersPage/>}/>
                <Route path="/users/:communityId/edit/:id" element={<UserFormPage/>}/>
                <Route path="/users/:communityId/invite" element={<InvitationFormPage/>}/>
                <Route path="/budget/:communityId/current" element={<BudgetCurrentPage/>}/>
                <Route path="/budget/:communityId/history" element={<BudgetHistoryPage/>}/>
                <Route path="/budget/:communityId/create" element={<BudgetFormPage/>}/>
                <Route path="/budget/:communityId/:budgetId" element={<BudgetDetailPage/>}/>
                <Route path="/expenses/:communityId/:budgetId" element={<ExpensesPage/>}/>
                <Route path="/expenses/:communityId/:budgetId/create" element={<ExpenseFormPage/>}/>
                <Route path="/expenses/:communityId/:budgetId/edit/:id" element={<ExpenseFormPage/>}/>
            </Route>

            <Route path="*" element={<Navigate to="/login/1" replace />} />
        </Routes>
    );
}

export default App;