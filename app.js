const express = require('express');
const apps = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const route = require('./Route/route');
require('dotenv/config');

apps.use(
    bodyParser.urlencoded({
        extended:true,
    })
);

apps.use(bodyParser.json());
route(apps);

apps.listen(port)

console.log(`http://localhost/${port}`);


