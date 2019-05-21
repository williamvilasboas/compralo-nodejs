module.exports = function (di) {
  const { request } = di;
  /**
   * @checkout_token String
   */
  return async function (checkout_token) {
    try {
      const res = await request(`seller/checkStatus/${checkout_token}`);
      if (res.status === 1) {
        return 'complete';
      } else if (res.status === 3) {
        return 'expired';
      }
      return 'pending';
    } catch (e) {
      console.log(e.toString());
    }
  };
};