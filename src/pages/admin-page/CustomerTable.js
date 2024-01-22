import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModal from './DeleteModal';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import { Grid, Button, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { addCustomer, getCustomers, deleteCustomer } from 'actions/customer';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
const CustomerTable = ({ getCustomers, addCustomer, deleteCustomer }) => {
  const { t } = useTranslation();
  const customers_state = useSelector((state) => state.customer.customers);
  const [customers, setCustomers] = React.useState(['']);
  const [checked, setChecked] = React.useState([0]);
  const [open, setOpen] = React.useState(false);
  const [customer_id, setCustomer_Id] = React.useState();
  const [customerData, setCustomerData] = React.useState({
    customer: '',
    location: ''
  });
  const { customer, location } = customerData;
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  const handleChange = (e) => setCustomerData({ ...customerData, [e.target.name]: e.target.value.trimEnd() });
  const handleClick = () => {
    addCustomer(customerData);
  };
  const handleDelete = (id) => {
    setCustomer_Id(id);
    setOpen(true);
  };
  React.useEffect(() => {
    getCustomers();
  }, [getCustomers]);
  React.useEffect(() => {
    setCustomers(customers_state);
  }, [customers_state]);
  const handleEnter = (event) => {
    if (event?.key !== 'Enter') {
      return;
    }
    addCustomer(customerData);
    setCustomerData({customer: ''});
  };
  const handleOk = () => {
    deleteCustomer(customer_id);
    setOpen(false)
  }
  const handleClose = () => {
    setOpen(false);
  }
  return (
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid item xs={12} md={12} lg={12}>
        <List sx={{ width: '100%', bgcolor: 'background.paper', maxHeight: '160px', overflow: 'auto' }}>
          {customers.map((customer_item) => {
            const labelId = `checkbox-list-label-${customer_item._id}`;
            return (
              <ListItem
                key={customer_item}
                secondaryAction={
                  <IconButton edge="end" aria-label="comments" onClick={(e) => handleDelete(customer_item._id)}>
                    <DeleteIcon />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton role={undefined} onClick={handleToggle(customer_item)} dense>
                  <ListItemText id={labelId} primary={customer_item.customer} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Grid>
      <Grid item xs={12} md={8} lg={8}>
        <TextField
          id="standard-basic"
          label={t('AddCustomer')}
          type="search"
          variant="standard"
          sx={{ margin: '0 5vw 10px 50px' }}
          name="customer"
          onKeyPress={handleEnter}
          value={customer}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
        <Button variant="contained" color="success" sx={{backgroundColor : "rgb(170,170,170)"}} onClick={handleClick} startIcon={<PlaylistAddCircleIcon />}>
          {t('AddNew')}
        </Button>
      </Grid>
      <DeleteModal
        open = {open}
        handleOk = {handleOk}
        handleClose = {handleClose}
        content = {t('DeleteCustomer')}
      />
    </Grid>
  );
};
CustomerTable.propTypes = {
  getCustomers: PropTypes.func.isRequired,
  addCustomer: PropTypes.func.isRequired,
  deleteCustomer: PropTypes.func.isRequired
};
export default connect(null, { getCustomers, addCustomer, deleteCustomer })(CustomerTable);
