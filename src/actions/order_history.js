import api from '../utils/api';
import { setAlert } from './alert';
import { ORDER_ERROR, GET_ORDERS_HISTORY,ADD_ORDER_HISTORY } from './types';

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

export const getOrdersHistory = (id) => async (dispatch) => {
  try {
    console.log('----ddddd', id);

    const res = await api.get(`/order/history/${id}`);

    dispatch({
      type: GET_ORDERS_HISTORY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
export const addOrderHistory = (id, formData) => async (dispatch) => {
  try {
    const res = await api.post(`/order/addhistory/${id}`, formData);
    console.log("----------------addorder_history-------------", res.data);
    // dispatch({
    //   type: ADD_ORDER_HISTORY,
    //   payload: res.data
    // });

    dispatch(setAlert('Order Created', 'success'));
  } catch (err) {
    // dispatch({
    //   type: ORDER_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status }
    // });
  }
};
