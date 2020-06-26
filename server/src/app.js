const express = require("express");

const getTop3Sellers = require('./functions/getTop3Sellers');

const app = express();

app.use(express.json());

app.listen(3333);

setInterval(() => {
   getTop3Sellers.getTopSellers(); 
}, 1000 * 60 * 60 * 24 * 2); // 1000 * 60 * 60 * 24 run every 24 hours


module.exports = app;