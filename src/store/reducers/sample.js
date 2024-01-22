import { GET_SAMPLES, ADD_SAMPLE, DELETE_SAMPLE, FILTER_SAMPLE, SAMPLE_ERR } from "actions/types";
const initialState = {
    samples: [''],
    error: {},
    loading: true
  };
  
  function sampleReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case GET_SAMPLES:
        return {
          ...state,
          samples: payload,
          loading: false
        };
      case FILTER_SAMPLE:
        return {
          ...state,
          samples: state.samples.filter((sample) => {
            const lowerPayload = payload.toLowerCase();
            return sample.sample.toLowerCase().includes(lowerPayload);
          })
        }
      case ADD_SAMPLE:
        return {
          ...state,
          samples: [payload, ...state.samples],
          loading: false
        };
      case DELETE_SAMPLE:
        return {
          ...state,
          samples: state.samples.filter((sample) => sample._id !== payload),
          loading: false
        };
        case SAMPLE_ERR: {
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
  export default sampleReducer