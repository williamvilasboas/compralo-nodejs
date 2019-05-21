const rp = require('request-promise');
const createInvoice = require('./src/create-invoice');
const statusCheck = require('./src/status-check');
const withdrawal = require('./src/withdrawal');

module.exports = function (api_key=null) {
  const di = {
    api_key,
    
    version: 'v1',
  
    schema: 'https',
  
    endpoint: 'app.compralo.io/api',
  
    uri: function (urn) {
      return `${this.schema}://${this.endpoint}/${this.version}/${urn}`
    },
    
    request: async function (urn, options={}) {

      const requestOptions = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      try {
        return await rp(di.uri(urn), Object.assign(requestOptions, options || {}))
      } catch (e) {
        if (e.name) {
          console.log(`Error: ${e.name} ${e.toString()}`)
        }
      }
    }
  };

  di.createInvoice = createInvoice(di);
  di.statusCheck = statusCheck(di);
  di.withdrawal = withdrawal(di);

  return di;
}