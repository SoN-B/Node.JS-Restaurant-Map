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
/* compression
nodejs 웹서버에서 특정 방식으로 압축을 진행한 뒤, 
데이터를 웹 브라우저에 전송할 때 압축된 데이터와 함께 어떤 방식으로 압축했는지를 같이 보낸다. 
그러면 웹 브라우저는 해당 방식으로 압축을 해제한 뒤 사용
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("/home/ubuntu/Node.JS-Restaurant-Map/FrontEnd"));
/* express.static
이 프로젝트의 nginx는 도메인으로 접속하면 모든 요청을 reverse proxy를 사용해 3000번 포트로 요청을 넘김
즉, 하나의 도메인에 모든 요청을 express로 넘겨서 nginx는 라우터 역할만 시키고 있는 것
때문에 express에서 직접 정적파일을 제공할 수 있게 해줘야 한다.
*/
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
