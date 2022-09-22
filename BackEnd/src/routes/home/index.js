"use strict";

const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/index");

router.get("/restaurants", ctrl.readRestaurants);

// 회원가입
router.post("/sign-up", ctrl.createUsers);

module.exports = router;
