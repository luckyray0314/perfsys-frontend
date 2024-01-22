import {
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  ACCOUNT_DELETED,
  GET_USERS,
  SET_LANGUAGE,
  FILTER_USERS,
  DELETE_USER
} from '../../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: [],
  users: [],
  language: 'English'
};
function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload.user
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        user: payload.user,
        isAuthenticated: true,
        loading: true
      };
    case SET_LANGUAGE:
      return {
        ...state,
        language: payload
      };
    case ACCOUNT_DELETED:
    case GET_USERS:
      return {
        ...state,
        users: payload,
        isAuthenticated: true,
        loading: false
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== payload),
        loading: false
      };
    case FILTER_USERS:
      return {
        ...state,
        users: state.users.filter((user) => {
          const lowerPayload = payload.toLowerCase();
          return user.email.toLowerCase().includes(lowerPayload);
        })
      };
    case AUTH_ERROR:
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: []
      };
    default:
      return state;
  }
}

export default authReducer;
