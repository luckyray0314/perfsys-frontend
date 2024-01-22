import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import { Grid } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useTranslation } from 'react-i18next';
import moment from 'moment-timezone';

const ShowUpdateDialog = (props) => {
  const { t } = useTranslation();
  console.log("---------update-------",props.order.factory, props.order.customer, props.order.owner);
  const [formData, setFormData] = React.useState({
    orderPO: props.order.orderPO,
    factory: props.order.factory,
    customer: props.order.customer,
    owner: props.order.owner,
    completionDate: moment(props.order.completionDate),
    readyDate: moment(props.order.readyDate)
  });
  const { orderPO, factory, customer, owner, completionDate, readyDate } = formData;
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleChange_C = (newValue) => setFormData({ ...formData, completionDate: newValue });
  const handleChange_R = (newValue) => setFormData({ ...formData, readyDate: newValue });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await props.updateOrder(props.id, formData);
    await props.addOrderHistory(props.id, formData);
    props.handleClose();
  };

  React.useEffect(() => {
    setFormData({
      orderPO: props.order.orderPO,
      factory: props.order.factory,
      customer: props.order.customer,
      owner: props.order.owner,
      completionDate: moment(props.order.completionDate),
      readyDate: moment(props.order.readyDate)
    });
  }, [props.order]);

 return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title" sx={{fontSize: "20px"}}>{t('UpdateOrder')} PO# {orderPO}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Stack spacing={5}>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl fullWidth sx={{marginTop: "10px"}}>
                <InputLabel id="demo-simple-select-label" >{t('SelectFactory')}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="factory"
                  defaultValue={props.order.factory}
                  value={factory}
                  label="Select Factory"
                  onChange={handleChange}
                >
                  {props.factories.map((factory_it) => {
                    return (
                      <MenuItem id={factory_it._id} value={factory_it.factory}>
                        {factory_it.factory}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{t('SelectCustomer')}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="customer"
                  defaultValue={props.order.customer}
                  value={customer}
                  label="Select Customer"
                  onChange={handleChange}
                >
                  {props.customers.map((customer_it) => {
                    return (
                      <MenuItem id={customer_it._id} value={customer_it.customer}>
                        {customer_it.customer}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{t('SelectOwner')}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="owner"
                  defaultValue={props.order.owner}
                  value={owner}
                  label="Select owner"
                  onChange={handleChange}
                >
                  {props.owners.map((owner_it) => {
                    return (
                      <MenuItem id={owner_it._id} value={owner_it.owner}>
                        {owner_it.owner}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid container item xs={12} md={12} lg={12} alignItems="center" justifyContent="space-between">
              <Grid item xs={12} md={12} lg={4}>
                <div>{t('ReadyDate')}</div>
              </Grid>
              <Grid item xs={12} md={12} lg={8}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DesktopDatePicker
                    label={t('ReadyDate')}
                    inputFormat="MM/dd/yyyy"
                    value={readyDate}
                    onChange={handleChange_R}
                  ></DesktopDatePicker>
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Grid container item xs={12} md={12} lg={12} alignItems="center" justifyContent="space-between">
              <Grid item xs={12} md={12} lg={4}>
                <div>{t('CompletionDate')}</div>
              </Grid>
              <Grid item xs={12} md={12} lg={8}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DesktopDatePicker
                    label={t('CompletionDate')}
                    inputFormat="MM/dd/yyyy"
                    value={completionDate}
                    onChange={handleChange_C}
                  ></DesktopDatePicker>
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Grid container item xs={12} md={12} lg={12} justifyContent="flex-end">
              <Button variant="contained" color="primary" startIcon={<ShoppingBasketIcon />} onClick={handleSubmit}>
                {t('Update')}
              </Button>
              <Button onClick={props.handleClose} sx={{ ml: 2 }}>
                {t('Cancel')}
              </Button>
            </Grid>
          </Stack>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={props.handleOk} autoFocus>
          OK
        </Button> */}
      </DialogActions>
    </Dialog>
  );
};
// ShowUpdateDialog.propTypes = {
//   updateOrder: PropTypes.func.isRequired
// };
export default ShowUpdateDialog;
