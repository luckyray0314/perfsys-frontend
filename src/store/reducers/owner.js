import { GET_ONWERS, ADD_OWNER, DELETE_ONWER, OWNER_ERR, FILTER_OWNER } from 'actions/types';
const initialState = {
  owners: [''],
  error: {},
  loading: true
};

function ownerReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ONWERS:
      return {
        ...state,
        owners: payload,
        loading: false
      };
    case FILTER_OWNER:
      return {
        ...state,
        owners: state.owners.filter((owner) => {
          const lowerPayload = payload.toLowerCase();
          return owner.owner.toLowerCase().includes(lowerPayload);
        })
      };
    case ADD_OWNER:
      return {
        ...state,
        owners: [payload, ...state.owners],
        loading: false
      };
    case DELETE_ONWER:
      return {
        ...state,
        owners: state.owners.filter((owner) => owner._id !== payload),
        loading: false
      };
    case OWNER_ERR: {
      return {
        ...state,
        error: payload,
        loading: false
      };
    }
    default:
      return state;
  }
}
export default ownerReducer;
