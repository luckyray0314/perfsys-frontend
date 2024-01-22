import api from '../utils/api';
import { setAlert } from './alert';
import { GET_ONWERS, ADD_OWNER, DELETE_ONWER, OWNER_ERR, FILTER_OWNER } from './types';
export const getOwners = () => async (dispatch) => {
  try {
    const res = await api.get('owner/all');
    dispatch({
      type: GET_ONWERS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: OWNER_ERR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
export const deleteOwner = (id) => async (dispatch) => {
  try {
    await api.delete(`/owner/delete/${id}`);

    dispatch({
      type: DELETE_ONWER,
      payload: id
    });

    dispatch(setAlert('Owner is removed successfully!', 'success', true));
  } catch (err) {
    dispatch({
      type: OWNER_ERR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
export const filterOwner = (filterOwner) => async (dispatch) => {
  try {
    if (filterOwner !== '') {
      dispatch({
        type: FILTER_OWNER,
        payload: filterOwner
      });
    } else {
      const res = await api.get('owner/all');
      dispatch({
        type: GET_ONWERS,
        payload: res.data
      });
    }
  } catch {}
};
export const addOwner = (ownerData) => async (dispatch) => {
  try { 
    const res = await api.post('/owner/add', ownerData);
    dispatch({
      type: ADD_OWNER,
      payload: res.data
    });

    dispatch(setAlert('Owner is added successfully', 'success', true));
  } catch (err) {
    dispatch(setAlert('Owner already exists or is required', 'warning', true));
  }
};
