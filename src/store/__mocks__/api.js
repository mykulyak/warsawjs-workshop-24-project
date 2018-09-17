
export const readSettings = jest.fn()
  .mockReturnValue(Promise.resolve())
  .mockReturnValueOnce(Promise.resolve({ status: 'ok' }))
  .mockReturnValueOnce(Promise.resolve({ status: 'ok' }));
