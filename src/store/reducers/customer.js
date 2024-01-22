import { GET_CUSTOMERS, ADD_CUSTOMER, DELETE_CUSTOMER, CUSTOMER_ERROR, FILTER_CUSTOMER } from 'actions/types';
const initialState = {
  customers: [''],
  error: {},
  loading: true
};

function customerReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CUSTOMERS:
      return {
        ...state,
        customers: payload,
        loading: false
      };
    case FILTER_CUSTOMER:
      return {
        ...state,
        customers: state.customers.filter((customer) => {
          const lowerPayload = payload.toLowerCase();
          return customer.customer.toLowerCase().includes(lowerPayload);
        })
      };
    case ADD_CUSTOMER:
      return {
        ...state,
        customers: [payload, ...state.customers],
        loading: false
      };
    case DELETE_CUSTOMER:
      return {
        ...state,
        customers: state.customers.filter((customer) => customer._id !== payload),
        loading: false
      };
    case CUSTOMER_ERROR: {
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
export default customerReducer;
