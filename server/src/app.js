const express = require("express");
const routes = require('./routes')
const path = require('path')

const getTop3Sellers = require('./functions/getTop3Sellers');

const app = express();

app.use(express.json());
app.use(routes);
app.use("/images", express.static(path.resolve(__dirname, "..", "images")));

// setInterval(() => {
//    getTop3Sellers.getTopSellers(); 
// }, 1000 * 60 * 60 * 24 * 5); 

// 1000 * 60 * 60 * 24 run every 24 hours

// getTop3Sellers.getTopSellers();

module.exports = app;