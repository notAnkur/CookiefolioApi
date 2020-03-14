const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('./web/db/index.js');

const app = express();

const port = process.env.PORT || 8006;

const indexRoute = require('./web/routes/index.route');
const orderRoute = require('./web/routes/order.route');
const deliveryRoute = require('./web/routes/delivery.route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/web/views'));

app.use(cors());

// routes
app.use('/', indexRoute);
app.use('/order', orderRoute);
app.use('/delivery', deliveryRoute);

// connect to db
db.connect()
  .then(() => console.log('Connected to db'));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});