// material-ui
import {
  Grid,
  Typography
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import TotalSatistics from './TotalSatistics';
import { useTranslation } from 'react-i18next';
// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const { t } = useTranslation();
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{marginTop: '30px'}}>
      {/* row 2 */}
      <Grid item xs={12} md={12} lg={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">{t("SatisticsOverview")}</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <TotalSatistics/>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
