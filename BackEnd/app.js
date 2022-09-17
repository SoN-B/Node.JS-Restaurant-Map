"use strict";

// 모듈
const methodOverride = require("method-override");
const compression = require("compression");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const { logger } = require("./config/winston");

// 라우팅
const home = require("./src/routes/home");

// 웹세팅
app.use(methodOverride());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// 로컬에서 프런트 서버와 백엔드 서버의 포트를 다르게 사용할 때 발생하는 문제인 CORS 해결
// CORS : 도메인 및 포트가 다른 서버로 클라이언트가 요청했을 때 브라우저가 보안상의 이유로 API를 차단하는 문제

app.use("/", home);

// 연결
app.listen(3000, () => {
    console.log(`Server Running on 3000 Port!`);
});
logger.info("API Server Start At Port 3000");

module.exports = app;
