import configureStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

jest.mock('./api');

import * as TYPES from './constants';
import { readSettings as apiReadSettings } from './api';
import { readSettings } from './actions';
import reducer from './reducers';
import { getSettings } from './selectors';

describe('readSettings - mock store', () => {
  const mockStore = configureStore([thunkMiddleware]);
  let store;

  beforeEach(() => {
    store = mockStore({});
    store.replaceReducer(reducer);
  });

  afterEach(() => {
    store = null;
  });

  test('should log actions', async () => {
    expect(store.getActions()).toEqual([]);
    expect(apiReadSettings).not.toHaveBeenCalled();
    await store.dispatch(readSettings())
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: TYPES.READ_SETTINGS_START },
          { type: TYPES.READ_SETTINGS_END, payload: { status: 'ok' } },
        ]);
        expect(apiReadSettings).toHaveBeenCalled();
      });
  });
});

describe('readSettings - using real store', () => {
  let store;
  let actions = [];

  // Redux middleware that logs dispatched actions
  const actionLoggerMiddleware = store => next => action => {
    actions.push(action);
    return next(action);
  };

  beforeEach(() => {
    store = createStore(
      reducer,
      applyMiddleware(thunkMiddleware, actionLoggerMiddleware),
    );
    apiReadSettings.mockClear();
  });

  afterEach(() => {
    actions = [];
    store = null;
  });

  test('should log actions and state', async () => {
    expect(apiReadSettings).not.toHaveBeenCalled();
    await store.dispatch(readSettings())
      .then(() => {
        expect(actions).toEqual([
          { type: TYPES.READ_SETTINGS_START },
          { type: TYPES.READ_SETTINGS_END, payload: { status: 'ok' } },
        ]);
        expect(getSettings(store.getState())).toEqual({ status: 'ok' });
        expect(apiReadSettings).toHaveBeenCalled();
      });
  });
});
