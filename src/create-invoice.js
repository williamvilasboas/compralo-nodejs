module.exports = function (di) {
  const { api_key, request } = di;
  /**
   * Create invoice
   * @value Float
   * @store_name String
   * @description String
   * @postback_url String(Url)
   * @back_url String(Url)
   */
  return async function (value, store_name, description, postback_url, back_url=null) {
    const res = await request('seller/generateInvoice', {
      body: {
        api_key,
        value,
        store_name,
        description,
        postback_url,
        back_url
      },
      json: true,
      method: 'POST'
    });
    return res;
  };
};