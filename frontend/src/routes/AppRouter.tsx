import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
// import { CatalogPage } from '../pages/CatalogPage';
// import { PosPage } from '../pages/PosPage';
// import { PublisherDashboardPage } from '../pages/PublisherDashboardPage';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />


        {/* <Route path="/pos" element={<PosPage />} />


        <Route path="/publisher" element={<PublisherDashboardPage />} />


        <Route path="*" element={<h2>Página no encontrada</h2>} /> */}
      </Routes>
    </BrowserRouter>
  );
};