const express = require('express')
const bodyParser = require('body-parser')
const { trade } = require('./trader');
const path = require('path');

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const notifiers = require('./notifiers');
const objectStringify = (object) => Object.entries(object).map(key => key.join(': ')).join('\n')

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
})

app.post('/trade', async (req, res) => {
  try {
    const data = await trade(req.body)

    notifiers.telegram.send('Success on creating order');
    notifiers.telegram.send(objectStringify(data));
    res.sendStatus(200);
    res.send(data);
  } catch (e) {
    notifiers.telegram.send('Error when creating order');
    notifiers.telegram.send(objectStringify(e));

    return res.status(400).send(e);
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

