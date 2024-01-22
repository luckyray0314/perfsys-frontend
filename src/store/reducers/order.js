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
  GET_ORDERS_PERIOD_SAMPLE,
  GET_ORDERS_CATEGORY,
  GET_ORDERS_CATEGORY_SAMPLE
} from '../../actions/types';

const initialState = {
  orders: [],
  order: null,
  score_customer: [],
  score_factory: [],
  score_owner: [],
  factory_by_customer: [],
  factory_by_owner: [],
  orders_period: [],
  orders_category: [],
  loading: true,
  error: {}
};

function orderReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: payload,
        loading: false
      };
    case FILTER_ORDER:
      return {
        ...state,
        orders: state.orders.filter((order) => {
          return String(order.orderPO).includes(payload);
        })
      };
    case GET_ORDER:
      return {
        ...state,
        order: payload,
        loading: false
      };
    case GET_ORDERS_PERIOD:
      return {
        ...state,
        orders_period : payload.filter((item) => item.orderPO == 'sample'),
        loading: false
      }
    case GET_ORDERS_PERIOD_SAMPLE:
      return {
        ...state,
        orders_period : payload.filter((item) => item.orderPO !== 'sample'),
        loading: false
      }
    case GET_ORDERS_CATEGORY:
      return {
        ...state,
        orders_category : payload.filter((item) => item.orderPO == 'sample'),
        loading: false
      }
    case GET_ORDERS_CATEGORY_SAMPLE:
      return {
        ...state,
        orders_category : payload.filter((item) => item.orderPO !== 'sample'),
        loading: false
      }
    case GET_FACTORY_BY_CUSTOMER:
      return {
        ...state,
        factory_by_customer: payload
      };
    case GET_FACTORY_BY_OWNER:
      return {
        ...state,
        factory_by_owner: payload
      };
    case ADD_ORDER:
      return {
        ...state,
        orders: [payload, ...state.orders],
        loading: false
      };
    case GET_SCORE_CUSTOMER:
      return {
        ...state,
        score_customer: payload,
        loading: false
      };
    case GET_SCORE_FACTORY:
      return {
        ...state,
        score_factory: payload,
        loading: false
      };
    case GET_SCORE_OWNER:
      return {
        ...state,
        score_owner: payload,
        loading: false
      };
    case DELETE_ORDER:
      return {
        ...state,
        orders: state.orders.filter((order) => order._id !== payload),
        loading: false
      };
    case COMPLETE_ORDER:
      return {
        ...state,
        orders: payload,
        loading: false
      };
    case ORDER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_ORDER:
      return {
        ...state,
        orders: state.orders.map((order) => (order._id == payload._id ? payload : order)),
        // orders: payload,
        loading: false
      };

    default:
      return state;
  }
}

export default orderReducer;
