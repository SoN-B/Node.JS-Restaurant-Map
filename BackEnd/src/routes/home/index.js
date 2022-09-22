"use strict";

const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/index");

router.get("/restaurants", ctrl.readRestaurants);

// 회원가입
router.post("/sign-up", ctrl.createUsers);
// 로그인
router.post("/sign-in", ctrl.createJwt);

module.exports = router;
