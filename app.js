"use strict";

// 모듈
const methodOverride = require("method-override");
const compression = require("compression");

const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const { logger } = require("./config/winston");
var cors = require("cors");

// 라우팅
const home = require("./src/routes/home");

// 웹세팅
app.use(methodOverride());
app.use(compression());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(cors());

app.use("/", home);

// 연결
app.listen(3000, () => {
    console.log(`Server Running on 3000 Port!`);
});
logger.info("API Server Start At Port 3000");

module.exports = app;
