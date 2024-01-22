import api from '../utils/api';
import { setAlert } from './alert';
import { GET_FACTORIES, ADD_FACTORY, DELETE_FACTORY, FACTORY_ERROR, FILTER_FACTORY} from './types';
export const getFactories = () => async (dispatch) => {
    try {
      const res = await api.get('factory/all');
      dispatch({
        type: GET_FACTORIES,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: FACTORY_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
  export const deleteFactory = (id) => async (dispatch) => {
    try {
      await api.delete(`/factory/delete/${id}`);
  
      dispatch({
        type: DELETE_FACTORY,
        payload: id
      });
  
      dispatch(setAlert('Factory is removed', 'success', true));
    } catch (err) {
      dispatch({
        type: FACTORY_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
  export const filterFactory = (filterFactory) => async (dispatch) => {
    try {
      if (filterFactory !== '') {
        dispatch({
          type: FILTER_FACTORY,
          payload: filterFactory
        })
      } else {
        const res = await api.get('factory/all');
        dispatch({
          type: GET_FACTORIES,
          payload: res.data
        });
      }
    } catch {

    }
  }
  export const addFactory = (factoryData) => async (dispatch) => {
    try {
      const res = await api.post('/factory/add', factoryData);
      
      dispatch({
        type: ADD_FACTORY,
        payload: res.data
      });
  
      dispatch(setAlert('Factory name is added successfully', 'success', true));
    } catch (err) {
      dispatch(setAlert('Factory already exists or is required', 'warning', true));
    }
  };