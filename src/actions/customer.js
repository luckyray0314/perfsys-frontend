import api from '../utils/api';
import { setAlert } from './alert';
import { GET_CUSTOMERS, ADD_CUSTOMER, DELETE_CUSTOMER, CUSTOMER_ERROR, FILTER_CUSTOMER} from './types';
export const getCustomers = () => async (dispatch) => {
    try {
      const res = await api.get('/customer/all');
      console.log('----------------response get', res.data);
      dispatch({
        type: GET_CUSTOMERS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: CUSTOMER_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
  export const deleteCustomer = (id) => async (dispatch) => {
    try {
      await api.delete(`/customer/delete/${id}`);
  
      dispatch({
        type: DELETE_CUSTOMER,
        payload: id
      });
  
      dispatch(setAlert('Customer is removed', 'success', true));
    } catch (err) {
      dispatch({
        type: CUSTOMER_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
  export const filterCustomer = (filterCustomer) => async (dispatch) => {
    try {
      if (filterCustomer !== '') {
        dispatch({
          type: FILTER_CUSTOMER,
          payload: filterCustomer
        })
      } else {
        const res = await api.get('/customer/all');
        dispatch({
          type: GET_CUSTOMERS,
          payload: res.data
        });
      }
    } catch {

    }
  }
  export const addCustomer = (customerData) => async (dispatch) => {
    try {
      const res = await api.post('/customer/add', customerData);
      
      dispatch({
        type: ADD_CUSTOMER,
        payload: res.data
      });
  
      dispatch(setAlert('Customer is added successfully', 'success', true));
    } catch (err) {
      dispatch(setAlert('Customer already exists or is required', 'warning', true));
    }
  };