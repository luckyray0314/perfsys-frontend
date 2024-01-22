import api from '../utils/api';
import { setAlert } from './alert';
import { GET_SAMPLES, ADD_SAMPLE, DELETE_SAMPLE, FILTER_SAMPLE, SAMPLE_ERR } from './types';
export const getSamples = () => async (dispatch) => {
  try {
    const res = await api.get('sample/all');
    dispatch({
      type: GET_SAMPLES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SAMPLE_ERR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
export const deleteSample = (id) => async (dispatch) => {
  try {
    await api.delete(`/sample/delete/${id}`);
    dispatch({
      type: DELETE_SAMPLE,
      payload: id
    });
    dispatch(setAlert('Sample is deleted successfully', 'success', true));
  } catch (err) {
    dispatch({
        type: SAMPLE_ERR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
  }
};
export const filterSamples = (filterValue) => async (dispatch) => {
  try {
    if(filterValue !== ''){
      dispatch({
        type: FILTER_SAMPLE,
        payload: filterValue
      })
    }else {
      const res = await api.get('sample/all');
      dispatch({
        type: GET_SAMPLES,
        payload: res.data
      })
    }

  }catch (err) {

  }
}
export const addSample = (sampleData) => async (dispatch) => {
    try {
      console.log("ssssssssssssssss",sampleData)
      const res = await api.post('/sample/add', sampleData);
      
      dispatch({
        type: ADD_SAMPLE,
        payload: res.data
      });
  
      dispatch(setAlert('Sample is added successfully', 'success', true));
    } catch (err) {
      dispatch(setAlert('Sample already exists or is required', 'warning', true));
    }
  };