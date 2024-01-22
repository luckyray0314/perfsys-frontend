import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
// import { element } from 'prop-types';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
// render - utilities
const CustomerPage = Loadable(lazy(() => import('pages/customer-page')));
const AdminPage = Loadable(lazy(() => import('pages/admin-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/chart',
      element: <DashboardDefault />
    },
    {
      path: 'adminManage',
      element: <AdminPage />
    },
    {
      path: 'customerManage',
      element: <CustomerPage />
    }
  ]
};

export default MainRoutes;
