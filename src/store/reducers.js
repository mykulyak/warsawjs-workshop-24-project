import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import * as TYPES from './constants';

const INITIAL_RATES_STATE = {
};

function rates(state, { type, error, payload }) {
  switch (type) {
    case TYPES.READ_EXCHANGE_RATES_START:
      return {
        ...state,
        isLoading: true,
      };
    case TYPES.READ_EXCHANGE_RATES_END:
      return {
        ...state,
        isLoading: false,
        isError: error,
        result: payload,
      };
    default:
      return state || INITIAL_RATES_STATE;
  }
}

const INITIAL_STATISTICS_STATE = {
  isLoading: false,
  isError: false,
  result: null,
};

function statistics(state, { type, error, payload }) {
  switch (type) {
    case TYPES.READ_STATISTICS_START:
      return {
        ...state,
        isLoading: true,
      };
    case TYPES.READ_STATISTICS_END:
      return {
        ...state,
        isLoading: false,
        isError: error,
        result: payload,
      };
    default:
      return state || INITIAL_STATISTICS_STATE;
  }
}

const INITIAL_SETTINGS_STATE = {
  isLoading: false,
  isError: false,
  result: null,
};

function settings(state, { type, error, payload }) {
  switch (type) {
    case TYPES.READ_SETTINGS_START:
      return {
        ...state,
        isLoading: true,
      };
    case TYPES.READ_SETTINGS_END:
      return {
        ...state,
        isLoading: false,
        isError: error,
        result: payload,
      };
    default:
    return state || INITIAL_SETTINGS_STATE;
  }
}


export default combineReducers({
  form: formReducer,
  rates,
  statistics,
  settings,
});
