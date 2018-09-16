describe('api.readSettings', () => {
  // jest.mock('./api', () => {
  //   return {
  //     readSettings: jest
  //       .fn()
  //       .mockReturnValue(Promise.resolve())
  //       .mockReturnValueOnce(Promise.resolve({ status: 'ok' }))
  //   };
  // });

  jest.mock('./api');

  test('should work', async () => {
    const api = require('./api');
    const readSettings = api.readSettings;
    readSettings.mockClear();

    expect(readSettings).not.toHaveBeenCalled();
    const result = await readSettings();
    expect(result).toEqual({ status: 'ok' });
    expect(readSettings).toHaveBeenCalled();
    const result2 = await readSettings();
    expect(result2).toEqual(undefined);
    expect(readSettings).toHaveBeenCalled();
  });

  test('should work 2', done => {
    const api = require('./api');
    const readSettings = api.readSettings;
    readSettings.mockClear();

    expect(readSettings).not.toHaveBeenCalled();
    readSettings().then(() => {
      expect(readSettings).toHaveBeenCalled();
      done();
    });
  });
});
