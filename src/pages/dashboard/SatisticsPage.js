import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

import { getFactories } from 'actions/factory';
import { getCustomers } from 'actions/customer';
import { getOwners } from 'actions/owner';
import { getScoreByCustomer } from 'actions/order';
import { getScoreByFactory } from 'actions/order';
import { getScoreByOwner } from 'actions/order';
import { getFactoryByCustomer } from 'actions/order';
import { getFactoryByOwner } from 'actions/order';
import { Grid, Button, InputLabel, MenuItem, FormControl, Select, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MonthlyBarChart from './MonthlyBarChart';
import { useSelector } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OrderTable from './OrderTable';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      maxwidth: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
};
const SatisticsPage = ({
  getFactories,
  getCustomers,
  getOwners,
  getScoreByCustomer,
  getScoreByFactory,
  getScoreByOwner,
  getFactoryByCustomer,
  getFactoryByOwner
}) => {
  //----------------------Search key-------------------------//
  const [formData, setFormData] = useState({
    factory: '',
    customer: '',
    owner: '',
    customer_f: '',
    owner_f: ''
  });
  const { factory, customer, owner, customer_f, owner_f } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //------------------factory, customer and owner list for select component--------------------//
  const { t } = useTranslation();
  const customers_state = useSelector((state) => state.customer.customers);
  const factories_state = useSelector((state) => state.factory.factories);
  const owners_state = useSelector((state) => state.owner.owners);
  const [customers, setCustomers] = React.useState(['']);
  const [customers_f, setCustomers_f] = React.useState(['']);
  const [factories, setFactories] = React.useState(['']);
  const [owners, setOwners] = React.useState(['']);
  const [owners_f, setOwners_f] = React.useState(['']);
  React.useEffect(() => {
    getCustomers();
  }, [getCustomers]);
  React.useEffect(() => {
    setCustomers(customers_state);
    setCustomers_f(customers_state);
  }, [customers_state]);
  React.useEffect(() => {
    getFactories();
  }, [getFactories]);
  React.useEffect(() => {
    setFactories(factories_state);
  }, [factories_state]);
  React.useEffect(() => {
    getOwners();
  }, [getOwners]);
  React.useEffect(() => {
    setOwners(owners_state);
    setOwners_f(owners_state);
  }, [owners_state]);
  //----------------------- customer analysis function------------------------//
  const score_customer_state = useSelector((state) => state.order.score_customer);
  const [average_qScore, setAverage_QScore] = useState(0);
  const [average_cScore, setAverage_CScore] = useState(0);
  const [average_pScore, setAverage_PScore] = useState(0);
  const handleClickCustomer = async (c,c_sample) => {
    if (c !== '') {
      await getScoreByCustomer(c, c_sample);
    }
  };

  React.useEffect(() => {
    let sum_Q = 0,
      sum_C = 0,
      sum_P = 0,
      num = 0;
    Array.isArray(score_customer_state) &&
      score_customer_state.length > 0 &&
      score_customer_state?.map((score_customer_it) => {
        if (score_customer_it.qScore !== '') {
          sum_Q += Number(score_customer_it.qScore?.split('Q')[0]);
          sum_C += Number(score_customer_it.cScore?.split('C')[0]);
          sum_P += Number(score_customer_it.pScore?.split('P')[0]);
          num++;
        }
      });
    let caculateQScore = sum_Q == 0 ? 0 : (sum_Q / num).toExponential(2);
    let caculateCScore = sum_C == 0 ? 0 : (sum_C / num).toExponential(2);
    let caculatePScore = sum_P == 0 ? 0 : (sum_P / num).toExponential(2);
    setAverage_QScore(caculateQScore);
    setAverage_CScore(caculateCScore);
    setAverage_PScore(caculatePScore);
  }, [getScoreByCustomer, score_customer_state]);
  console.log("--------customer score-----------", score_customer_state)
  //----------------------- factory analysis function------------------------//
  const score_factory_state = useSelector((state) => state.order.score_factory);
  const [average_qScore_f, setAverage_QScore_f] = useState(0);
  const [average_cScore_f, setAverage_CScore_f] = useState(0);
  const [average_pScore_f, setAverage_PScore_f] = useState(0);
  const handleClickFactory = async (f, f_sample) => {
    if (f !== '') {
      await getScoreByFactory(f, f_sample);
    }
  };
  React.useEffect(() => {
    let sum_Q_f = 0,
      sum_C_f = 0,
      sum_P_f = 0,
      num_f = 0;
    Array.isArray(score_factory_state) &&
      score_factory_state.length > 0 &&
      score_factory_state?.map((score_factory_it) => {
        if (score_factory_it.qScore !== '') {
          sum_Q_f += Number(score_factory_it.qScore?.split('Q')[0]);
          sum_C_f += Number(score_factory_it.cScore?.split('C')[0]);
          sum_P_f += Number(score_factory_it.pScore?.split('P')[0]);
          num_f++;
        }
      });
    let caculateQScore_f = sum_Q_f == 0 ? 0 : (sum_Q_f / num_f).toExponential(2);
    let caculateCScore_f = sum_C_f == 0 ? 0 : (sum_C_f / num_f).toExponential(2);
    let caculatePScore_f = sum_P_f == 0 ? 0 : (sum_P_f / num_f).toExponential(2);
    setAverage_QScore_f(caculateQScore_f);
    setAverage_CScore_f(caculateCScore_f);
    setAverage_PScore_f(caculatePScore_f);
  }, [getScoreByFactory, score_factory_state]);
  //----------------------- onwer analysis function------------------------//
  const score_owner_state = useSelector((state) => state.order.score_owner);
  const [average_qScore_o, setAverage_QScore_o] = useState(0);
  const [average_cScore_o, setAverage_CScore_o] = useState(0);
  const [average_pScore_o, setAverage_PScore_o] = useState(0);
  const handleClickOwner = async (o, o_sample) => {
    if (o !== '') {
      await getScoreByOwner(o, o_sample);
    }
  };
  React.useEffect(() => {
    let sum_Q_o = 0,
      sum_C_o = 0,
      sum_P_o = 0,
      num_o = 0;
    Array.isArray(score_owner_state) &&
      score_owner_state.length > 0 &&
      score_owner_state?.map((score_owner_it) => {
        if (score_owner_it.qScore !== '') {
          sum_Q_o += Number(score_owner_it.qScore?.split('Q')[0]);
          sum_C_o += Number(score_owner_it.cScore?.split('C')[0]);
          sum_P_o += Number(score_owner_it.pScore?.split('P')[0]);
          num_o++;
        }
      });
    let caculateQScore_o = sum_Q_o == 0 ? 0 : (sum_Q_o / num_o).toExponential(2);
    let caculateCScore_o = sum_C_o == 0 ? 0 : (sum_C_o / num_o).toExponential(2);
    let caculatePScore_o = sum_P_o == 0 ? 0 : (sum_P_o / num_o).toExponential(2);
    setAverage_QScore_o(caculateQScore_o);
    setAverage_CScore_o(caculateCScore_o);
    setAverage_PScore_o(caculatePScore_o);
  }, [getScoreByOwner, score_owner_state]);
  //----------------------- analysis factory by customer------------------------//
  const factory_by_customer_state = useSelector((state) => state.order.factory_by_customer);
  const [factory_by_customer, setFactory_By_Customer] = React.useState(factory_by_customer_state);
  const handleClickFactoryByCustomer = async (c_f) => {
    if (c_f !== '') {
      setFactory_By_Customer('');
      await getFactoryByCustomer(c_f);
    }
  };
  React.useEffect(() => {
    setFactory_By_Customer(factory_by_customer_state);
  }, [factory_by_customer_state, getFactoryByCustomer]);
  //----------------------- analysis factory by owner------------------------//
  const factory_by_owner_state = useSelector((state) => state.order.factory_by_owner);
  const [factory_by_owner, setFactory_By_Owner] = React.useState(factory_by_owner_state);
  const handleClickFactoryByOwner = async (o_f) => {
    if (o_f !== '') {
      setFactory_By_Owner('');
      await getFactoryByOwner(o_f);
    }
  };
  React.useEffect(() => {
    setFactory_By_Owner(factory_by_owner_state);
  }, [factory_by_owner_state, getFactoryByOwner]);
  //----------sample-state----------------//
  const [sampleState, setSampleState] = useState({
    factory_sample: false,
    customer_sample: false,
    owner_sample: false
  });
  const { factory_sample, customer_sample, owner_sample } = sampleState;
  const handleChangeCheck = (e) => {
    setSampleState({ ...sampleState, [e.target.name]: e.target.checked });
  };
  return (
    <Grid container rowSpacing={7.5} columnSpacing={2.75} marginTop="5px" marginBottom="20px">
      <Grid item xs={12} md={12} lg={12}>
        <Grid container alignItems="center" justifyContent="space-around" rowSpacing={4.5}>
          <Typography variant="h3" color="rgb(150,150,150)" fontFamily="serif" align="center" width="85%">
            {t('ScoreSatisticsDesc')}
          </Typography>
        </Grid>   
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Grid container alignItems="center" justifyContent="space-around" rowSpacing={4.5}>
          <Grid item xs={12} md={6} lg={2}>
            <FormControlLabel
              control={<Checkbox checked={factory_sample} onChange={handleChangeCheck} name="factory_sample" />}
              label={t('OnlySample')}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" sx={{ fontSize: '15px' }}>
                {t('SelectFactory')}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="factory"
                value={factory}
                MenuProps={MenuProps}
                label="Select Factory"
                onChange={handleChange}
              >
                {factories?.map((factory_it) => {
                  return (
                    <MenuItem id={factory_it._id} value={factory_it.factory}>
                      {factory_it.factory}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={1}>
            <Button
              variant="contained"
              sx={{ backgroundColor: 'rgb(200,200,200)' }}
              startIcon={<VisibilityIcon />}
              onClick={() => handleClickFactory(factory, factory_sample)}
              style={{marginTop: '35px'}}
            >
              {t('ANALYSIS')}
            </Button>
          </Grid>
          <Grid item xs={12} md={6} lg={2}>
            <FormControlLabel
              control={<Checkbox checked={customer_sample} onChange={handleChangeCheck} name="customer_sample" />}
              label={t('OnlySample')}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" sx={{ fontSize: '15px' }}>
                {t('SelectCustomer')}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="customer"
                value={customer}
                MenuProps={MenuProps}
                label="Select Customer"
                onChange={handleChange}
              >
                {customers?.map((customer_it) => {
                  return (
                    <MenuItem id={customer_it._id} value={customer_it.customer}>
                      {customer_it.customer}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={1}>
            <Button
              variant="contained"
              sx={{ backgroundColor: 'rgb(200,200,200)' }}
              startIcon={<VisibilityIcon />}
              onClick={() => handleClickCustomer(customer, customer_sample)}
              style={{marginTop: '35px'}}
            >
              {t('ANALYSIS')}
            </Button>
          </Grid>
          <Grid item xs={12} md={6} lg={2}>
            <FormControlLabel
              control={<Checkbox checked={owner_sample} onChange={handleChangeCheck} name="owner_sample" />}
              label={t('OnlySample')}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" sx={{ fontSize: '15px' }}>
                {t('SelectOwner')}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="owner"
                value={owner}
                MenuProps={MenuProps}
                label="Select Customer"
                onChange={handleChange}
              >
                {owners?.map((owner_it) => {
                  return (
                    <MenuItem id={owner_it._id} value={owner_it.owner}>
                      {owner_it.owner}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={1}>
            <Button
              variant="contained"
              sx={{ backgroundColor: 'rgb(200,200,200)' }}
              startIcon={<VisibilityIcon />}
              onClick={() => handleClickOwner(owner, owner_sample)}
              style={{marginTop: '35px'}}
            >
              {t('ANALYSIS')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Grid container alignItems="center" justifyContent="space-around" rowSpacing={4.5}>
          <Grid item xs={12} md={12} lg={3}>
            <MonthlyBarChart qScore={average_qScore_f} cScore={average_cScore_f} pScore={average_pScore_f} />
          </Grid>
          <Grid item xs={12} md={12} lg={3}>
            <MonthlyBarChart qScore={average_qScore} cScore={average_cScore} pScore={average_pScore} />
          </Grid>
          <Grid item xs={12} md={12} lg={3}>
            <MonthlyBarChart qScore={average_qScore_o} cScore={average_cScore_o} pScore={average_pScore_o} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Grid container alignItems="center" justifyContent="space-around" rowSpacing={4.5}>
          <Typography variant="h3" color="rgb(150,150,150)" fontFamily="serif" align="center" width="85%">
            {t('RatioDesc')}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Grid container alignItems="center" justifyContent="space-around" rowSpacing={4.5}>
          <Grid item xs={12} md={12} lg={5}>
            <Grid container alignItems="center" justifyContent="space-around" rowSpacing={4.5}>
              <Grid item xs={12} md={12} lg={5}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" sx={{ fontSize: '15px' }}>
                    {t('SelectCustomer')}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="customer_f"
                    value={customer_f}
                    MenuProps={MenuProps}
                    label="Select Customer"
                    onChange={handleChange}
                  >
                    {customers_f?.map((customer_f_it) => {
                      return (
                        <MenuItem id={customer_f_it._id} value={customer_f_it.customer}>
                          {customer_f_it.customer}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12} lg={5}>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: 'rgb(200,200,200)' }}
                  startIcon={<VisibilityIcon />}
                  onClick={() => handleClickFactoryByCustomer(customer_f)}
                >
                  {t('ANALYSIS')}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12} lg={5}>
            <Grid container alignItems="center" justifyContent="space-around" rowSpacing={4.5}>
              <Grid item xs={12} md={12} lg={5}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" sx={{ fontSize: '15px' }}>
                    {t('SelectOwner')}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="owner_f"
                    value={owner_f}
                    MenuProps={MenuProps}
                    label="Select Customer"
                    onChange={handleChange}
                  >
                    {owners_f?.map((owner_f_it) => {
                      return (
                        <MenuItem id={owner_f_it._id} value={owner_f_it.owner}>
                          {owner_f_it.owner}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12} lg={5}>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: 'rgb(200,200,200)' }}
                  startIcon={<VisibilityIcon />}
                  onClick={() => handleClickFactoryByOwner(owner_f)}
                >
                  {t('ANALYSIS')}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Grid container alignItems="center" justifyContent="space-around" rowSpacing={4.5}>
          <Grid item xs={12} md={12} lg={5}>
            <OrderTable data={factory_by_customer} />
          </Grid>
          <Grid item xs={12} md={12} lg={5}>
            <OrderTable data={factory_by_owner} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
SatisticsPage.propTypes = {
  addOrder: PropTypes.func.isRequired,
  getFactories: PropTypes.func.isRequired,
  getCustomers: PropTypes.func.isRequired,
  getOwners: PropTypes.func.isRequired,
  getScoreByCustomer: PropTypes.func.isRequired,
  getScoreByFactory: PropTypes.func.isRequired,
  getScoreByOwner: PropTypes.func.isRequired,
  getFactoryByCustomer: PropTypes.func.isRequired,
  getFactoryByOwner: PropTypes.func.isRequired
};
export default connect(null, {
  getFactories,
  getCustomers,
  getOwners,
  getScoreByCustomer,
  getScoreByFactory,
  getScoreByOwner,
  getFactoryByCustomer,
  getFactoryByOwner
})(SatisticsPage);
