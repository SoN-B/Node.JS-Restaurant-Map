"use strict";

// 모듈
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
    
// 라우팅
const home = require('./src/routes/home');

// 웹세팅
app.use(express.static('./public'));
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", home);

// 연결
app.listen(3000, () => {
    console.log(`Server Running on 3000 Port!`);
});

module.exports = app;
