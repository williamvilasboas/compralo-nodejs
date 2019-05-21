const express = require('express');
const rp = require('request-promise');

const compralo = require('../index');

const app = express();

app.get('/create/:api_key/:price', async function (req, res) {
  const { api_key, price: priceText } = req.params;
  const price = Number(priceText);
  const integration = compralo(api_key);

  const response = await integration.createInvoice(
    price,
    'Testing Compralo',
    'Testing Description',
    'http://localhost:9006',
    'http://localhost:9006'
  );
  
  const index = await rp(response.checkout_url);

  res.send(index);
});

app.get('/status/:checkout_token', async (req, res) => {
  const { checkout_url } = req.params;
  const response = await compralo().statusCheck(checkout_url);
  
  res.send(`Status: ${response}`);
});

app.get('/withdrawal/:api_key/:coin/:value/:destination', async (req, res) => {
  const { api_key, coin, value: valueCoin, destination } = req.params;
  
  const value = Number(valueCoin);

  const response = await compralo(api_key).withdrawal(
    coin,
    value,
    destination
  );

  res.send(response);
});


app.all('/', async function (req, res) {
  res.send('Testing Compralo!');
});

app.listen(9006);