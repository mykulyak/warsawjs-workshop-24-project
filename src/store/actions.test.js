import configureStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

jest.mock('./api');

import * as TYPES from './constants';
import { readSettings as apiReadSettings } from './api';
import { readSettings } from './actions';
import reducer from './reducers';

describe.only('actions', () => {
  const mockStore = configureStore([thunkMiddleware]);
  let store;

  beforeEach(() => {
    store = mockStore({});
    store.replaceReducer(reducer);
  });

  afterEach(() => {
    store = null;
  });

  test('readSettings', async () => {
    expect(store.getActions()).toEqual([]);
    expect(apiReadSettings).not.toHaveBeenCalled();
    await store.dispatch(readSettings())
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: TYPES.READ_SETTINGS_START },
          { type: TYPES.READ_SETTINGS_END, payload: { status: 'ok' } },
        ]);
        expect(apiReadSettings).toHaveBeenCalled();
        global.console.warn(apiReadSettings.mock);
      });
  });
});
