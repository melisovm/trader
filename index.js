const express = require('express')
const bodyParser = require('body-parser')
const { trade } = require('./trader');
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/trade', async (req, res) => {
  const data = await trade(req.body)

  res.sendStatus(200);
  res.send(data);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

