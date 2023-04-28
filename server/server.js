const express = require('express');
//const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const routes = require('./routes');

const app = express();
app.use(cors({
  origin: '*',
}));

// Routes here
app.get('/user/:user_id', routes.user);
app.get('/business/:business_id', routes.business);
app.get('/businesses', routes.businesses);

app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`)
  });
  
  module.exports = app;