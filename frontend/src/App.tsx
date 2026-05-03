import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
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
import { PollsPage } from './pages/Polls/PollsPage';
import { PollDetailPage } from './pages/Polls/PollDetailPage';
import { PollFormPage } from './pages/Polls/PollFormPage';
import { Navbar } from './components/common/Navbar';
import styles from './App.module.css';

const AppLayout = () => (
    <div className={styles.layout}>
        <Navbar />
        <main className={styles.main}>
            <Outlet />
        </main>
    </div>
);

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login/1" replace />}/>
            <Route path="/login/:communityId" element={<LoginPage/>}/>
            <Route path="/register/:communityId" element={<RegisterPage/>}/>

            <Route element={<ProtectedRoute />}>
                <Route element={<AppLayout />}>
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
                    <Route path="/polls/:communityId" element={<PollsPage/>}/>
                    <Route path="/polls/:communityId/create" element={<PollFormPage/>}/>
                    <Route path="/polls/:communityId/:pollId" element={<PollDetailPage/>}/>
                </Route>
            </Route>

            <Route path="*" element={<Navigate to="/login/1" replace />} />
        </Routes>
    );
}

export default App;