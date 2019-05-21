module.exports = function (di) {
  const { api_key, request } = di;
  /**
   * @coin Float
   * @value 
   */
  return async function (coin, value, destination) {
    const res = await request('withdrawal/create', {
      body: {
        api_key,
        coin,
        value,
        destination
      },
      json: true,
      method: 'POST'
    });
    return res;
  };
};