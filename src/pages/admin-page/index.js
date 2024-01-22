import * as React from 'react';
import AdminTable from './AdminTable';
import FactoryTable from './FactoryTable';
import GroupIcon from '@mui/icons-material/Group';
import FactoryIcon from '@mui/icons-material/Factory';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
// material-ui
import { Grid, Typography, Box, TextField } from '@mui/material';
import MainCard from 'components/MainCard';
import CustomerTable from './CustomerTable';
import OwnerTable from './OwnerTable';
import InviteModal from './InviteModal';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { filterUsers } from 'actions/auth';
import { filterFactory } from 'actions/factory';
import { filterCustomer } from 'actions/customer';
import { filterOwner } from 'actions/owner';
import PropTypes from 'prop-types';
import ShowSnackbar from 'layout/Component/alert';
import './admin-back.css';

// ==============================|| CUSTOMER PAGE ||============================== //

const DashboardDefault = ({ filterUsers, filterFactory, filterCustomer, filterOwner }) => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const alertInfo = useSelector((state) => state.alert);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = async (e) => {
    await filterUsers(e.target.value);
  };
  // --------------factory item table filter--------//
  const handleChange_f = async (e) => {
    await filterFactory(e.target.value);
  };
  // --------------customer item table filter--------//
  const handleChange_c = async (e) => {
    await filterCustomer(e.target.value);
  };
  // --------------owner item table filter--------//
  const handleChange_o = async (e) => {
    await filterOwner(e.target.value);
  };
  // --------------sample item table filter--------//
  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{}}>
          <Grid item xs={12} md={12} lg={12}>
            <MainCard sx={{ mt: 2 }} content={false}>
              <Typography variant="h4" color="textSecondary" style={{ marginLeft: '10px' }}>
                <div
                  style={{
                    margin: '2% 0 2% 2%',
                    color: 'rgb(170,170,170)',
                    fontFamily: 'serif',
                    fontSize: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <GroupIcon sx={{ mr: 1, my: 0.5 }} />
                    <TextField
                      id="standard-search"
                      label={t('SearchUser')}
                      type="search"
                      onChange={handleChange}
                      variant="standard"
                    ></TextField>
                  </Box>
                  <div style={{ borderBottom: '1px solid grey', paddingRight: '2%' }}>{t('InvitedUsers')}</div>
                  <InviteModal open={open} handleClose={handleClose} handleOk={handleClickOpen} />
                </div>
              </Typography>
              <AdminTable />
            </MainCard>
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            <MainCard sx={{ mt: 2 }} content={false}>
              <Typography variant="h4" color="textSecondary" style={{}}>
                <div
                  style={{
                    margin: '10px 0 10px 10px',
                    color: 'rgb(150 150 150)',
                    fontFamily: 'serif',
                    fontSize: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <FactoryIcon sx={{ mr: 1, my: 0.5 }} />
                    <TextField
                      id="standard-search"
                      label={t('SearchFactory')}
                      type="search"
                      onChange={handleChange_f}
                      variant="standard"
                    ></TextField>
                  </Box>
                  <div style={{ borderBottom: '1px solid grey', paddingRight: '2%' }}>{t('Factory')}</div>
                </div>
              </Typography>
              <FactoryTable />
            </MainCard>
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            <MainCard sx={{ mt: 2 }} content={false}>
              <Typography variant="h4" color="textSecondary" style={{}}>
                <div
                  style={{
                    margin: '10px 0 10px 10px',
                    color: 'rgb(150 150 150)',
                    fontFamily: 'serif',
                    fontSize: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <SentimentVerySatisfiedIcon sx={{ mr: 1, my: 0.5 }} />
                    <TextField
                      id="standard-search"
                      label={t('SearchCustomer')}
                      type="search"
                      onChange={handleChange_c}
                      variant="standard"
                    ></TextField>
                  </Box>
                  <div style={{ borderBottom: '1px solid grey', paddingRight: '2%' }}>{t('Customer')}</div>
                </div>
              </Typography>
              <CustomerTable />
            </MainCard>
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            <MainCard sx={{ mt: 2 }} content={false}>
              <Typography variant="h4" color="textSecondary" style={{}}>
                <div
                  style={{
                    margin: '10px 0 10px 10px',
                    color: 'rgb(150 150 150)',
                    fontFamily: 'serif',
                    fontSize: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <DirectionsWalkIcon sx={{ mr: 1, my: 0.5 }} />
                    <TextField
                      id="standard-search"
                      label={t('SearchOwner')}
                      type="search"
                      onChange={handleChange_o}
                      variant="standard"
                    ></TextField>
                  </Box>
                  <div style={{ borderBottom: '1px solid grey', paddingRight: '2%' }}>{t('Owner')}</div>
                </div>
              </Typography>
              <OwnerTable />
            </MainCard>
          </Grid>
          {/* <Grid item xs={12} md={12} lg={3}>
            <MainCard sx={{ mt: 2 }} content={false}>
              <Typography variant="h4" color="textSecondary" style={{}}>
                <div
                  style={{
                    margin: '10px 0 10px 10px',
                    color: 'rgb(150 150 150)',
                    fontFamily: 'serif',
                    fontSize: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <DirectionsWalkIcon sx={{ mr: 1, my: 0.5 }} />
                    <TextField
                      id="standard-search"
                      label={t('SearchSample')}
                      type="search"
                      onChange={handleChange_s}
                      variant="standard"
                    ></TextField>
                  </Box>
                  <div style={{ borderBottom: '1px solid grey', paddingRight: '2%' }}>{t('Sample')}</div>
                </div>
              </Typography>
              <SampleTable />
            </MainCard>
          </Grid> */}
        </Grid>
      <ShowSnackbar open={alertInfo[0]?.open} content={alertInfo[0]?.msg} type={alertInfo[0]?.alertType} />
    </>
  );
};
DashboardDefault.propTypes = {
  filterUsers: PropTypes.func.isRequired,
  filterFactory: PropTypes.func.isRequired,
  filterCustomer: PropTypes.func.isRequired,
  filterOwner: PropTypes.func.isRequired,
};
export default connect(null, { filterUsers, filterFactory, filterCustomer, filterOwner })(DashboardDefault);
