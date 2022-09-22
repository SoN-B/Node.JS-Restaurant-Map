"use strict";

const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/index");
const jwtMiddleware = require("../../../config/jwtMiddleware");

router.get("/restaurants", ctrl.readRestaurants);

// 회원가입
router.post("/sign-up", ctrl.createUsers);
// 로그인
router.post("/sign-in", ctrl.createJwt);
// 로그인 유지, 토큰 검증
router.get("/jwt", jwtMiddleware, ctrl.readJwt);

module.exports = router;
