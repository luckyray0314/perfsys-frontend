import * as React from 'react';
import OrderTable from './OrdersTable';
import AddNew from './AddNew';
// material-ui
import { Grid,  } from '@mui/material';
import MainCard from 'components/MainCard';
import { useSelector } from 'react-redux';
import ShowSnackbar from 'layout/Component/alert';
// ==============================|| CUSTOMER PAGE ||============================== //
const DashboardDefault = () => {
  const alertInfo = useSelector((state) => state.alert);
  return (
    <>
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} md={12} lg={12}>
        <AddNew />
        <MainCard sx={{ mt: 2 }} content={false}>
          <OrderTable  />
        </MainCard>
      </Grid>
    </Grid>
    <ShowSnackbar open={alertInfo[0]?.open} content={alertInfo[0]?.msg} type={alertInfo[0]?.alertType} /> 
    </>
  );
};

export default DashboardDefault;
