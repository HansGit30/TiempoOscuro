import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import StudioNPage from '../pages/Inicio';
import Login from '../pages/Login';
import { LayoutDashboard } from '../layouts/LayoutDashboard';
import DashboardPage from '../pages/dashboard';
import { CatalogPage } from '../pages/CatalogPage';
import MyBooks from '../components/dashboard/MyBooks';
import UsersManagement from '../components/dashboard/admin/UsersManagement';
// import { CatalogPage } from '../pages/CatalogPage';
// import { PosPage } from '../pages/PosPage';
// import { PublisherDashboardPage } from '../pages/PublisherDashboardPage';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<StudioNPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/libros" element={<CatalogPage />} />





        <Route path="/dashboard" element={<LayoutDashboard />}>
          
          {/* Esta es la vista por defecto al entrar a /dashboard */}
          <Route index element={<DashboardPage  />} />

          {/* Sub-rutas exclusivas para Proveedor */}
          <Route path="my-books" element={<MyBooks />} />
          <Route path="consignments" element={<h2>Ventas y Liquidaciones</h2>} />
          <Route path="sales" element={<h2>Ventas y Liquidaciones</h2>} />

          {/* Sub-rutas exclusivas para Administrador */}
          <Route path="users" element={<UsersManagement />} />
          <Route path="approvals" element={<h2>Aprobación de Solicitudes</h2>} />
          <Route path="reports" element={<h2>Reportes Generales</h2>} />
          
        </Route>

        {/* Redirección por defecto si entran a cualquier otra ruta */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};