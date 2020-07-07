const express = require("express");
const routes = require('./routes')
const getTop3Sellers = require('./functions/getTop3Sellers');

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333);

setInterval(() => {
   getTop3Sellers.getTopSellers(); 
}, 1000 * 60 * 60 * 24 * 2); // 1000 * 60 * 60 * 24 run every 24 hours


module.exports = app;