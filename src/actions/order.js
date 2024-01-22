import { sample } from 'lodash';
import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_ORDERS,
  ORDER_ERROR,
  UPDATE_ORDER,
  DELETE_ORDER,
  ADD_ORDER,
  GET_ORDER,
  GET_SCORE_CUSTOMER,
  GET_SCORE_FACTORY,
  GET_SCORE_OWNER,
  COMPLETE_ORDER,
  GET_FACTORY_BY_CUSTOMER,
  GET_FACTORY_BY_OWNER,
  FILTER_ORDER,
  GET_ORDERS_PERIOD,
  GET_ORDERS_CATEGORY,
  GET_ORDERS_CATEGORY_SAMPLE,
  GET_ORDERS_PERIOD_SAMPLE
} from './types';

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Get posts
export const getOrders = (id) => async (dispatch) => {
  try {
    const res = await api.get(`order/${id}`);
    dispatch({
      type: GET_ORDERS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
export const getOrdersByPeriod = (sampleState, formData, category) => async (dispatch) => {
  try {
    if (category == 'factory') {
      const res = await api.post('order/getFactoryOrdersByPeriod', formData);
      if (sampleState) {
        dispatch({
          type: GET_ORDERS_PERIOD,
          payload: res.data
        });
      } else {
        dispatch({
          type: GET_ORDERS_PERIOD_SAMPLE,
          payload: res.data
        });
      }
    } else if (category == 'customer') {
      const res = await api.post('order/getCustomerOrdersByPeriod', formData);
      if (sampleState) {
        dispatch({
          type: GET_ORDERS_PERIOD,
          payload: res.data
        });
      } else {
        dispatch({
          type: GET_ORDERS_PERIOD_SAMPLE,
          payload: res.data
        });
      }
    } else if (category == 'owner') {
      const res = await api.post('order/getOwnerOrdersByPeriod', formData);
      if (sampleState) {
        dispatch({
          type: GET_ORDERS_PERIOD,
          payload: res.data
        });
      } else {
        dispatch({
          type: GET_ORDERS_PERIOD_SAMPLE,
          payload: res.data
        });
      }
    }
  } catch (err) {
    dispatch(setAlert('Input is not enough', 'warning', true));
  }
};
export const getOrdersByCategory = (sampleState, formData, category) => async (dispatch) => {
  try {
    if (category == 'factory') {
      const res = await api.post('order/getOrdersByFactory', formData);
      if (sampleState) {
        dispatch({
          type: GET_ORDERS_CATEGORY,
          payload: res.data
        });
      } else {
        dispatch({
          type: GET_ORDERS_CATEGORY_SAMPLE,
          payload: res.data
        });
      }
    } else if (category == 'customer') {
      const res = await api.post('order/getOrdersByCustomer', formData);
      if (sampleState) {
        dispatch({
          type: GET_ORDERS_CATEGORY,
          payload: res.data
        });
      } else {
        dispatch({
          type: GET_ORDERS_CATEGORY_SAMPLE,
          payload: res.data
        });
      }
    } else if (category == 'owner') {
      const res = await api.post('order/getOrdersByOwner', formData);
      if (sampleState) {
        dispatch({
          type: GET_ORDERS_CATEGORY,
          payload: res.data
        });
      } else {
        dispatch({
          type: GET_ORDERS_CATEGORY_SAMPLE,
          payload: res.data
        });
      }
    }
  } catch (err) {
    dispatch(setAlert('Input is not enough', 'warning', true));
  }
};

export const filterOrder = (filterOrder, id) => async (dispatch) => {
  try {
    if (filterOrder) {
      dispatch({
        type: FILTER_ORDER,
        payload: filterOrder
      });
    } else {
      const res = await api.get(`order/${id}`);
      dispatch({
        type: GET_ORDERS,
        payload: res.data
      });
    }
  } catch {}
};
//Get factory by customer
export const getFactoryByCustomer = (customer) => async (dispatch) => {
  try {
    const res = await api.get(`/order/getFactoryByCustomer/${customer}`);
    dispatch({
      type: GET_FACTORY_BY_CUSTOMER,
      payload: res.data
    });
  } catch (err) {
    dispatch(setAlert('Customer field is required', 'warning', true));
  }
};
export const getFactoryByOwner = (owner) => async (dispatch) => {
  try {
    const res = await api.get(`/order/getFactoryByOwner/${owner}`);
    dispatch({
      type: GET_FACTORY_BY_OWNER,
      payload: res.data
    });
  } catch (err) {
    dispatch(setAlert('Owner field is required', 'warning', true));
  }
};

export const getScoreByCustomer = (customer, sample) => async (dispatch) => {
  try {
    if(sample == true){
      const res = await api.get(`order/getScoreCustomerSample/${customer}`);
      dispatch({
        type: GET_SCORE_CUSTOMER,
        payload: res.data
      });
    } else{
      const res = await api.get(`order/getScoreCustomer/${customer}`);
      dispatch({
        type: GET_SCORE_CUSTOMER,
        payload: res.data
      });
    }
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
export const getScoreByFactory = (factory, sample) => async (dispatch) => {
  console.log("---------sample-----", sample);
  try {
    if(sample == true){
      const res = await api.get(`order/getScoreFactorySample/${factory}`);
      dispatch({
        type: GET_SCORE_FACTORY,
        payload: res.data
      });
    } else {
      const res = await api.get(`order/getScoreFactory/${factory}`);
      dispatch({
        type: GET_SCORE_FACTORY,
        payload: res.data
      });
    }
  } catch (err) {
    dispatch(setAlert('Order score is not available', 'warning', true));
  }
};
export const getScoreByOwner = (owner, sample) => async (dispatch) => {
  try {
    if(sample == true){
      const res = await api.get(`order/getScoreOwnerSample/${owner}`);
      dispatch({
        type: GET_SCORE_OWNER,
        payload: res.data
      });
    } else{
      const res = await api.get(`order/getScoreOwner/${owner}`);
      dispatch({
        type: GET_SCORE_OWNER,
        payload: res.data
      });
    }
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// update order
export const updateOrder = (id, formData) => async (dispatch) => {
  try {
    const res = await api.put(`/order/${id}`, formData);
    dispatch({
      type: UPDATE_ORDER,
      payload: res.data
    });
    dispatch(setAlert('Update successfully', 'success', true));
  } catch (err) {
    dispatch(setAlert('Update is error', 'warning', true));
  }
};
//update score
export const updateScore = (id, userId, formData) => async (dispatch) => {
  try {
    const res = await api.put(`/order/complete/${id}/${userId}`, formData);
    dispatch({
      type: COMPLETE_ORDER,
      payload: res.data
    });
    dispatch(setAlert('Order is completed successfully', 'success', true));
  } catch (err) {
    dispatch(setAlert('Score already exists or is not enough', 'warning', true));
  }
};

// Delete post
export const deleteOrder = (id) => async (dispatch) => {
  try {
    await api.delete(`/order/${id}`);

    dispatch({
      type: DELETE_ORDER,
      payload: id
    });
    dispatch(setAlert('Order is removed successfully', 'success', true));
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add post
export const addOrder = (formData) => async (dispatch) => {
  try {
    console.log('-------formData-------', formData);
    const res = await api.post('/order/create', formData);
    dispatch({
      type: ADD_ORDER,
      payload: res.data
    });

    dispatch(setAlert('Order is created successfully', 'success', true));
  } catch (err) {
    dispatch(setAlert('Order information is not enough', 'warning', true));
  }
};

// Get post
export const getOrder = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/order/${id}`);

    dispatch({
      type: GET_ORDER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
