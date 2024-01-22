// material-ui
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
// project import
import NavGroup from './NavGroup';
import { useSelector } from 'react-redux';
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  LineChartOutlined
} from '@ant-design/icons'; 
// icons
const icons = {
  UserOutlined,
  ShoppingCartOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LineChartOutlined,
  AppstoreAddOutlined
};
// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {
  const { t } = useTranslation();
  const utilities = {
    id: 'management_a',
    title: t('AdminPage'),
    type: 'admin',
    children: [
      {
        id: 'util-admin',
        title : t('Admin'),
        type: 'item',
        url: '/adminManage',
        icon: icons.UserOutlined
      },
      {
        id: 'util-customer',
        title: t('OrderInput'),
        type: 'item',
        url: '/customerManage',
        icon: icons.ShoppingCartOutlined
      },
      {
        id: 'util-chart',
        title: t('ChartAnalysis'),
        type: 'item',
        url: '/chart',
        icon: icons.LineChartOutlined,
        breadcrumbs: false
      }
    ]
  };
  const support = {
    id: 'management_c',
    title: t('CustomerPage'),
    type: 'customer',
    children: [
      {
        id: 'util-customer_c',
        title:  t('Customer'),
        type: 'item',
        url: '/customerManage',
        icon: icons.ShoppingCartOutlined
      },
      {
        id: 'util-chart_c',
        title: t('ChartAnalysis'),
        type: 'item',
        url: '/chart',
        icon: icons.LineChartOutlined,
        breadcrumbs: false
      }
    ]
  };
  const menuItems = {
    items: [utilities, support]
  };
  const role_state = useSelector((state) => state.auth.user);
  const navGroups = menuItems.items.map((item) => {
    switch (item.type) {
      case 'admin':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">

          </Typography>
        );
    }
  });
  const navGroups1 = menuItems.items.map((item) => {
    switch (item.type) {
      case 'customer':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            
          </Typography>
        );
    }
  });
  return <Box sx={{ pt: 2 }}>{role_state?.role == 'admin' ? navGroups : navGroups1}</Box>;
};

export default Navigation;
